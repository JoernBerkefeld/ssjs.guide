---
layout: function
title: UpsertDE
parent: Platform Functions
parent_url: /platform-functions/
description: Inserts a new row or updates every matching one in a Data Extension. Requires aligned arrays, returns null instead of a row count, and runs on CloudPages despite the official sendable-context note.
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
test_scripts: complete
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string[] | Yes | Nonempty array of column names used to find existing rows; multiple columns use positional AND logic |
| `whereFieldValues` | array | Yes | Nonempty array of values positionally aligned to `whereFieldNames` |
| `fieldNames` | string[] | Yes | Nonempty array of column names to insert or update |
| `fieldValues` | array | Yes | Nonempty array of values positionally aligned to `fieldNames` |

> **Arrays are required.** Scalar strings are rejected even for a single filter or field. The name/value arrays must be nonempty and have matching lengths.

{% include differs-from-docs.html note="The official reference types `whereFieldNames` as `string or string[]` and `whereFieldValues` as `string or array`, but scalar forms are not accepted. All four filter and field name/value arguments must be nonempty, positionally aligned arrays. The Data Extension is also resolved by **Name** only, not external key / CustomerKey." %}

{% include test-script.html bundle="platform-functions--upsertde" chapter="array-arguments-required" label="Show test script — array-only signature" %}

{% include test-script.html bundle="platform-functions--upsertde" chapter="parameters" %}

## Description

`UpsertDE` checks for rows matching all supplied filter pairs:
- If there are **no matches**, it inserts one row using both the filter pairs and field pairs.
- If there is **one match**, it updates that row in place.
- If there are **multiple matches**, it updates all of them.

It performs the same upsert as [UpsertData](/platform-functions/upsertdata/), but **returns `null`** in every branch, so it cannot report how many rows changed.

{% include differs-from-docs.html note="The official reference documents a numeric count of upserted rows, but the runtime returns genuine JavaScript `null` for an insert, a single-row update, and a multiple-row update alike." %}

{% include differs-from-docs.html note="The docs describe `UpsertDE` as a sendable-context (email) function, but at runtime it also executes and commits its upsert on a CloudPage." %}

[UpsertData](/platform-functions/upsertdata/) is still preferred outside email because it returns the number of affected rows.

{% include test-script.html bundle="platform-functions--upsertde" chapter="description" %}

## Notes

- Resolves the DE by **Name**, not external key / CustomerKey.
- All four filter and field name/value parameters require nonempty, equal-length arrays.
- The filter columns do not have to be primary-key columns. If they match several rows, every match is updated; if they match none, their values become part of the inserted row.
- Missing required insert fields and primary-key conflicts throw.
- Number, Boolean, Date, and array values coerce when written to Text fields. Explicit `""`, `null`, and `undefined` persist as ordinary empty strings in nullable Text.
- DE names, column names, and Text filter values matched case-insensitively in the tested business unit; collation can vary by tenant.
- `Platform.Function.UpsertDE` works before and after `Platform.Load("core", "1.1.5")`. Core loading does not create a callable bare `UpsertDE` global.
- Identical Data Extension queries can be request-cached. Use a different query shape or read each verification target only once after a write.
- Email, automation, and triggered-send behaviour was not exercised by the CloudPage harness.

{% include test-script.html bundle="platform-functions--upsertde" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/upsertdata/">UpsertData</a></li>
  <li><a href="/platform-functions/updatede/">UpdateDE</a></li>
  <li><a href="/platform-functions/insertde/">InsertDE</a></li>
  <li><a href="/platform-functions/deletede/">DeleteDE</a></li>
</ul>
</div>
