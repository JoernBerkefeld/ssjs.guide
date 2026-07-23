---
layout: function
title: UpdateDE
parent: Platform Functions
parent_url: /platform-functions/
description: Modifies existing rows in a Data Extension. Returns null (no value). Runs on CloudPages too, despite the official email-only note.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.UpdateDE(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)"
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
| `whereFieldNames` | string\|string[] | Yes | Column name(s) to identify the rows to update; use an array for multiple columns (AND logic) |
| `whereFieldValues` | string\|array | Yes | Value(s) to match in `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |
| `fieldNames` | string[] | Yes | Array of column names to update |
| `fieldValues` | array | Yes | Array of new values aligned to `fieldNames` |

## Description

`UpdateDE` modifies existing rows in a Data Extension. It performs the same update as [UpdateData](/platform-functions/updatedata/), but **returns `null`** (no row count).

{% include differs-from-docs.html note="The docs restrict `UpdateDE` to email contexts, but at runtime it also executes and commits its update on a CloudPage, returning `null` (not the affected-row count). It also resolves the DE by **Name** only, not the external key / CustomerKey." %}

[UpdateData](/platform-functions/updatedata/) is still preferred outside email because it returns the number of affected rows.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/updatedata/">UpdateData</a></li>
</ul>
</div>
