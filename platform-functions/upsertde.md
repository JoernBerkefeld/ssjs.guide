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
return_type: void
min_args: 5
max_args: 5
verification: verified
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

The official Salesforce docs describe `UpsertDE` as an email-context function, but it was **runtime-verified** to run and commit its upsert on a CloudPage as well. [UpsertData](/platform-functions/upsertdata/) is still preferred outside email because it returns the number of affected rows.

The Data Extension is resolved by its **Name**, not the external key / CustomerKey. Like `UpsertData`, it takes the where and field pairs as arrays — there is no flat/variadic form.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/upsertdata/">UpsertData</a></li>
</ul>
</div>
