function normaliseSearchText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

const SEARCH_STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'can', 'could', 'do', 'does',
  'for', 'from', 'have', 'help', 'how', 'i', 'in', 'is', 'it', 'me', 'my',
  'need', 'of', 'on', 'or', 'please', 'the', 'this', 'to', 'want', 'what',
  'use', 'using', 'when', 'where', 'which', 'who', 'why', 'with', 'would', 'you', 'your'
]);

export function searchTopics(topics, query, limit = 6) {
  const normalisedQuery = normaliseSearchText(query);
  const rawTerms = normalisedQuery.split(/\s+/).filter(Boolean);
  // Keep "to do" together because it is the exact name of an approved product.
  const asksForToDo = /\bto\s+do\b/.test(normalisedQuery);
  const usefulTerms = rawTerms.filter(term =>
    !SEARCH_STOP_WORDS.has(term) || (asksForToDo && (term === 'to' || term === 'do'))
  );
  // Preserve short product-name searches such as "Help" or "To Do".
  const terms = usefulTerms.length ? usefulTerms : rawTerms;
  const maximum = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 6;
  if (terms.length === 0 || maximum === 0) return [];
  return topics
    .map((topic, index) => {
      const title = normaliseSearchText(topic.title);
      const searchable = normaliseSearchText([topic.title, topic.searchText].join(' '));
      if (!terms.every(term => searchable.includes(term))) return null;
      const titleScore = terms.reduce((score, term) => score + (title.includes(term) ? 3 : 0), 0);
      return { topic, index, score: titleScore };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, maximum)
    .map(result => result.topic);
}

function initialiseHelpSearch() {
  const input = document.querySelector('#help-search');
  const index = document.querySelector('.search-index');
  const results = document.querySelector('.search-results');
  const status = document.querySelector('#help-search-status');
  if (!input || !index || !results || !status) return;
  const topics = Array.from(index.querySelectorAll('a')).map(link => ({
    title: link.textContent.trim(),
    href: link.getAttribute('href'),
    searchText: link.getAttribute('data-search-text') || ''
  }));
  function updateResults() {
    const query = input.value;
    results.replaceChildren();
    if (!normaliseSearchText(query)) {
      results.hidden = true;
      status.textContent = 'Type a word or task to find a guide.';
      return;
    }
    const matches = searchTopics(topics, query);
    if (matches.length === 0) {
      results.hidden = true;
      status.textContent = 'No matching guide found. Try a product name or a simpler word.';
      return;
    }
    for (const topic of matches) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = topic.href;
      link.textContent = topic.title;
      item.append(link);
      results.append(item);
    }
    results.hidden = false;
    status.textContent = matches.length + (matches.length === 1 ? ' guide found.' : ' guides found.');
  }
  input.addEventListener('input', updateResults);
}

if (typeof document !== 'undefined') initialiseHelpSearch();
