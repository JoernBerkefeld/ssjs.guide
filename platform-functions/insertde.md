---
layout: function
title: InsertDE
parent: Platform Functions
parent_url: /platform-functions/
description: Adds a new row to a Data Extension. Returns null (no value). Runs on CloudPages too, despite the official email-only note.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.InsertDE(deName, fieldNames, fieldValues)"
return_type: "null"
min_args: 3
max_args: 3
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `fieldNames` | string[] | Yes | Array of column names to populate |
| `fieldValues` | array | Yes | Array of values aligned to `fieldNames` |

## Description

`InsertDE` adds a new row to a Data Extension. It performs the same insert as [InsertData](/platform-functions/insertdata/), but **returns `null`** (no row count).

{% include differs-from-docs.html note="The docs restrict `InsertDE` to email contexts, but at runtime it also executes and commits its insert on a CloudPage, returning `null` (not the affected-row count). It also resolves the DE by **Name** only, not the external key / CustomerKey." %}

[InsertData](/platform-functions/insertdata/) is still preferred outside email because it returns the number of affected rows.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/insertdata/">InsertData</a></li>
</ul>
</div>
