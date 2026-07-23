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
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `fieldNames` | string[] | Yes | Array of column names to populate |
| `fieldValues` | array | Yes | Array of values aligned to `fieldNames` |

## Description

`InsertDE` adds a new row to a Data Extension. It performs the same insert as [InsertData](/platform-functions/insertdata/), but **returns `null`** (no row count).

The official Salesforce docs describe `InsertDE` as an email-context function, but it was **runtime-verified** to run and commit its insert on a CloudPage as well. [InsertData](/platform-functions/insertdata/) is still preferred outside email because it returns the number of affected rows.

The Data Extension is resolved by its **Name**, not the external key / CustomerKey.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/insertdata/">InsertData</a></li>
</ul>
</div>
