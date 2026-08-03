---
layout: function
title: UpdateDE
parent: Platform Functions
parent_url: /platform-functions/
description: Modifies matching Data Extension rows and returns null. Requires aligned arrays and runs on CloudPages despite the official email-only restriction.
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
test_scripts: complete
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name**; the external key / CustomerKey is not accepted |
| `whereFieldNames` | string[] | Yes | Nonempty array of column names used to identify rows; multiple columns use positional AND logic |
| `whereFieldValues` | array | Yes | Nonempty array of values aligned to `whereFieldNames`; must have the same length |
| `fieldNames` | string[] | Yes | Nonempty array of column names to update |
| `fieldValues` | array | Yes | Nonempty array of new values aligned to `fieldNames`; must have the same length |

{% include differs-from-docs.html note="The official docs allow scalar strings for a single filter column and value, but the runtime requires arrays for all four filter and update name/value arguments; scalar forms throw." %}

{% include test-script.html bundle="platform-functions--updatede" chapter="parameters" %}

## Description

`UpdateDE` modifies every existing row that matches the filter. The mutation persists on a CloudPage, but the function returns genuine JavaScript `null` for one match, multiple matches, and no matches, so it cannot report how many rows changed.

{% include differs-from-docs.html note="The official docs report an affected-row count, but the runtime returns `null` for one match, multiple matches, and no matches." %}

{% include differs-from-docs.html note="The official docs restrict `UpdateDE` to email contexts, but the function executes and commits its update on a CloudPage." %}

Use [UpdateData](/platform-functions/updatedata/) when you need the numeric affected-row count. Both functions otherwise showed the same tested update semantics: array-only arguments, Name-based DE resolution, positional AND filters, aligned update columns, field coercion, and persisted writes.

{% include test-script.html bundle="platform-functions--updatede" chapter="description" %}

## Notes

- The Data Extension identifier resolves by **Name**, not external key / CustomerKey.
- Empty arrays and unequal name/value array lengths throw.
- Unknown Data Extension or column names throw.
- A primary-key column can be updated when the resulting value remains valid.
- Text, Number, Decimal, Boolean, and Date fields accept valid updates.
- Number, Boolean, Date, and array values can coerce into Text fields.
- Explicit `""`, `null`, and `undefined` writes to nullable Text persist as ordinary empty strings.
- DE names, column identifiers, and Text filter values were case-insensitive in the tested business unit; collation can vary by tenant.
- `Platform.Function.UpdateDE` works before and after `Platform.Load("core", "1.1.5")`. Core loading does not create a callable bare `UpdateDE` global.
- Identical Data Extension queries can be request-cached. Use a different query shape or read each verification target only once after a write.
- Email, automation, and triggered-send behavior was not exercised by the CloudPage harness.

{% include test-script.html bundle="platform-functions--updatede" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/updatedata/">UpdateData</a></li>
  <li><a href="/platform-functions/upsertde/">UpsertDE</a></li>
  <li><a href="/platform-functions/upsertdata/">UpsertData</a></li>
</ul>
</div>
