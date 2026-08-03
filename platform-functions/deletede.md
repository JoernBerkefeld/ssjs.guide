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
return_type: "null"
min_args: 3
max_args: 3
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string[] | Yes | Array of column names to match for deletion |
| `whereFieldValues` | array | Yes | Array of values aligned to `whereFieldNames` that identify rows to delete |

{% include test-script.html bundle="platform-functions--deletede" chapter="parameters" %}

## Description

`DeleteDE` removes rows from a Data Extension matching the filter criteria. It performs the same delete as [DeleteData](/platform-functions/deletedata/), but **returns `null`** (no row count).

{% include differs-from-docs.html note="The docs restrict `DeleteDE` to email contexts, but at runtime it also executes and commits its delete on a CloudPage, returning `null` (not the affected-row count). It also resolves the DE by **Name** only, not the external key / CustomerKey." %}

{% include test-script.html bundle="platform-functions--deletede" chapter="runs-on-cloudpages" label="Show test script — DeleteDE runs and commits on a CloudPage, returns null, and resolves by Name only" %}

[DeleteData](/platform-functions/deletedata/) is still preferred outside email because it returns the number of affected rows.

**Irreversible** — SFMC DEs have no built-in undo. Always verify the filter before deleting.

{% include test-script.html bundle="platform-functions--deletede" chapter="description" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/deletedata/">DeleteData</a></li>
</ul>
</div>
