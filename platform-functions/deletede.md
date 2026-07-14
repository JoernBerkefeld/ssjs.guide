---
layout: function
title: DeleteDE
parent: Platform Functions
parent_url: /platform-functions/
description: Removes rows from a Data Extension matching filter criteria. Returns null (no value). Runs on CloudPages too, despite the official email-only note.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.DeleteDE(deName, whereFieldNames, whereFieldValues)"
return_type: void
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string[] | Yes | Array of column names to match for deletion |
| `whereFieldValues` | array | Yes | Array of values aligned to `whereFieldNames` that identify rows to delete |

## Description

`DeleteDE` removes rows from a Data Extension matching the filter criteria. It performs the same delete as [DeleteData](/platform-functions/deletedata/), but **returns `null`** (no row count).

The official Salesforce docs describe `DeleteDE` as an email-context function, but it was **runtime-verified** to run and commit its delete on a CloudPage as well. [DeleteData](/platform-functions/deletedata/) is still preferred outside email because it returns the number of affected rows.

The Data Extension is resolved by its **Name**, not the external key / CustomerKey.

**Irreversible** — SFMC DEs have no built-in undo. Always verify the filter before deleting.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/deletedata/">DeleteData</a></li>
</ul>
</div>
