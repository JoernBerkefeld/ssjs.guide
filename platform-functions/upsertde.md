---
layout: function
title: UpsertDE
parent: Platform Functions
parent_url: /platform-functions/
description: Inserts a new row or updates an existing one in a Data Extension. Returns null (no value). Runs on CloudPages too, despite the official email-only note.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.UpsertDE(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)"
return_type: "null"
min_args: 5
max_args: 5
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string\|string[] | Yes | Column name(s) to identify whether the row exists; use an array for composite keys |
| `whereFieldValues` | string\|array | Yes | Value(s) matching `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |
| `fieldNames` | string[] | Yes | Array of column names to insert or update |
| `fieldValues` | array | Yes | Array of values aligned to `fieldNames` |

## Description

`UpsertDE` inserts a new row or updates an existing one in a Data Extension. It performs the same upsert as [UpsertData](/platform-functions/upsertdata/), but **returns `null`** (no row count).

{% include differs-from-docs.html note="The docs restrict `UpsertDE` to email contexts, but at runtime it also executes and commits its upsert on a CloudPage, returning `null` (not the affected-row count). It takes the where/field pairs as arrays (no flat/variadic form) and resolves the DE by **Name** only." %}

[UpsertData](/platform-functions/upsertdata/) is still preferred outside email because it returns the number of affected rows.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/upsertdata/">UpsertData</a></li>
</ul>
</div>
