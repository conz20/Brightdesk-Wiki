---
layout: technical
title: Brightdesk Planner technical reference
description: Planner's plan, bucket and task model, status fields and bucket deletion behaviour.
permalink: /technical/products/planner.html
---

# Planner technical reference

Planner organises local work into plans, buckets and tasks.

## Data model

A plan contains buckets. Each bucket contains tasks.

Tasks can include:

- Task name and description.
- Bucket assignment.
- Priority: Low, Normal or High.
- Progress: Not started, In progress or Completed.
- Due date.
- Assigned to value.

## Bucket safeguards

- A plan starts with a **To do** bucket.
- The final bucket in a plan cannot be deleted.
- When another bucket is deleted, its tasks are moved to a remaining bucket.

## Task-card behaviour

The task card exposes title editing and a progress selector. Other task details are set when the task is created.

## Data boundary

Plans, buckets and tasks are saved locally. Shared plans, connected user directories and cloud synchronisation are outside the current product scope.

## Related information

- [Data and privacy](/technical/data-and-privacy.html)
- [Everyday Help: Planner](/products/planner.html)
