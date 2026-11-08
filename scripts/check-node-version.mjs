const expected = 'v24.22.2';
if (process.version !== expected) {
  console.error(`Brightdesk Wiki requires Node.js ${expected}; found ${process.version}.`);
  process.exitCode = 1;
} else {
  console.log(`Node.js ${process.version} verified.`);
}
