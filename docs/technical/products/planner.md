---
layout: technical
title: Brightdesk Planner technical reference
description: Planner's plan, bucket and task model, task filters and bucket deletion behaviour.
permalink: /technical/products/planner.html
---

# Planner technical reference

Planner organises local work into plans, buckets and tasks.

## Data model

A plan contains buckets. Each bucket contains tasks. A new plan starts with a **To do** bucket.

Tasks can include:

- Task name and description.
- Bucket assignment.
- Priority: Low, Normal or High.
- Progress: Not started, In progress or Completed.
- Due date.
- Assigned to value.
- Labels.

## Search and filters

The task view can be filtered by bucket, progress and priority. Text search checks the task name, description, assigned-to value and labels.

## Bucket safeguards

- The final bucket in a plan cannot be deleted.
- When a bucket is deleted, its tasks move to the first remaining bucket in that plan.

## Task-card behaviour

The task card exposes title editing and a progress selector. Other task details are set when the task is created.

## Data boundary

Plans, buckets and tasks are saved locally. Shared plans, connected user directories and cloud synchronisation are outside the current product scope.

## Related information

- [Data and privacy](../data-and-privacy.html)
- [Everyday Help: Planner](../../products/planner.html)
