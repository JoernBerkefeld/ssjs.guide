---
layout: function
title: UpsertData
parent: Platform Functions
parent_url: /platform-functions/
description: Inserts a new row or updates an existing one in a Data Extension. The most commonly used write operation when you don't know whether the row exists.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.UpsertData(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)"
return_type: number
min_args: 5
max_args: 5
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

`UpsertData` takes exactly these five array-based arguments:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string[] | Yes | Nonempty array of column names used to find existing rows; multiple columns use positional AND logic |
| `whereFieldValues` | array | Yes | Nonempty array of values positionally aligned to `whereFieldNames` |
| `fieldNames` | string[] | Yes | Array of column names to insert or update |
| `fieldValues` | array | Yes | Array of values aligned to `fieldNames` |

> **Arrays are required.** Scalar strings are rejected even for a single filter or field. The name/value arrays must be nonempty and have matching lengths.

{% include test-script.html bundle="platform-functions--upsertdata" chapter="parameters" %}

## Description

`UpsertData` checks for rows matching all supplied filter pairs:
- If there are **no matches**, it inserts one row using both the filter pairs and field pairs.
- If there is **one match**, it updates that row in place.
- If there are **multiple matches**, it updates all of them.

The return value is a number: `1` for a new insert, `1` for one updated match, or the affected-row count for multiple matches.

{% include differs-from-docs.html note="The official reference permits scalar strings for one `whereFieldNames` / `whereFieldValues` pair, and also shows a flat/variadic form. Neither works: runtime calls require nonempty, positionally aligned arrays in all four name/value positions, and every scalar form throws. The DE is also resolved by **Name** only, not the external key / CustomerKey." %}

{% include test-script.html bundle="platform-functions--upsertdata" chapter="array-arguments-required" label="Show test script — array-only signature" %}

This is the most robust write operation for Data Extensions — use it instead of `InsertData` when you're not sure if the row already exists.

{% include test-script.html bundle="platform-functions--upsertdata" chapter="description" %}

## Examples

### Standard array syntax (preferred)

```javascript
var rowsAffected = Platform.Function.UpsertData(
    "Subscribers",
    ["SubscriberKey"],              // whereFieldNames (filter/identity)
    [subscriberKey],                // whereFieldValues
    ["Email", "FirstName", "City"], // fieldNames (data columns)
    [email, firstName, city]        // fieldValues
);
```

### Multiple primary keys

```javascript
Platform.Function.UpsertData(
    "OrderItems",
    ["OrderID", "ProductSKU"],   // whereFieldNames: composite key
    [orderId, sku],              // whereFieldValues
    ["Quantity", "Price"],       // fieldNames
    [qty, price]                 // fieldValues
);
```

### Single column upsert

```javascript
// Even a single column/key must be passed as arrays
Platform.Function.UpsertData(
    "PageViews",
    ["PageID"], [pageId],     // whereFieldNames / whereFieldValues (key)
    ["Count"],  [viewCount]   // fieldNames / fieldValues (column to set)
);
```

### Track login with upsert

```javascript
Platform.Function.UpsertData(
    "UserActivity",
    ["SubscriberKey"],
    [sk],
    ["LastLogin", "LoginCount", "Status"],
    [Platform.Function.Now(), loginCount, "active"]
);
```

### Error handling

```javascript
try {
    Platform.Function.UpsertData(
        "Registrations",
        ["Email"],
        [email],
        ["Name", "RegisteredAt"],
        [name,   Platform.Function.Now()]
    );
    Platform.Response.Redirect("/confirmation", false);
} catch (e) {
    Write("Save failed: " + e.message);
}
```

{% include test-script.html bundle="platform-functions--upsertdata" chapter="examples" %}

## Notes

- Resolves the DE by **Name**, not external key / CustomerKey.
- All four filter and field name/value parameters require nonempty, equal-length arrays.
- The filter columns do not have to be primary-key columns. If they match several rows, every match is updated; if they match none, their values become part of the inserted row.
- Missing required insert fields and primary-key conflicts throw.
- Number, Boolean, Date, and array values coerce when written to Text fields. Explicit `""`, `null`, and `undefined` persist as ordinary empty strings in nullable Text.
- DE names, column names, and Text filter values matched case-insensitively in the tested business unit.
- `Platform.Function.UpsertData` works without Core; `Platform.Load("core", ...)` does not create a bare `UpsertData` global.
- `UpsertDE` performs the same upsert but returns `null` instead of a row count. Its insert and update branches should be verified independently rather than inferred from this function.
- For large batch upserts, consider WSProxy's `updateBatch` for better performance.

{% include test-script.html bundle="platform-functions--upsertdata" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/insertdata/">InsertData</a></li>
  <li><a href="/platform-functions/updatedata/">UpdateData</a></li>
  <li><a href="/platform-functions/deletedata/">DeleteData</a></li>
  <li><a href="/platform-functions/upsertde/">UpsertDE</a></li>
  <li><a href="/wsproxy/updatebatch/">WSProxy.updateBatch</a></li>
  <li><a href="/recipes/de-crud-patterns/">DE CRUD Patterns</a></li>
</ul>
</div>
