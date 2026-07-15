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
---

## Parameters

`UpsertData` takes exactly these five array-based arguments:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string\|string[] | Yes | Column name(s) to identify whether the row exists; use an array for composite keys |
| `whereFieldValues` | string\|array | Yes | Value(s) matching `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |
| `fieldNames` | string[] | Yes | Array of column names to insert or update |
| `fieldValues` | array | Yes | Array of values aligned to `fieldNames` |

> **No flat/variadic form.** A flat argument list such as `UpsertData(deName, field1, value1, filterField, filterValue)` is **not supported** — it throws at runtime (verified). Always pass the `fieldNames` / `fieldValues` and `whereFieldNames` / `whereFieldValues` pairs as arrays.

## Description

`UpsertData` checks whether a row with the specified key(s) exists:
- If it **exists**: updates the specified columns
- If it **doesn't exist**: inserts a new row

Returns the number of rows affected.

This is the most robust write operation for Data Extensions — use it instead of `InsertData` when you're not sure if the row already exists.

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

## Notes

- Resolves the DE by **Name**, not external key / CustomerKey
- The flat/variadic argument form is not supported and throws — always use arrays for the where and field pairs
- `UpsertDE` performs the same upsert but returns `null` instead of a row count. The official docs describe `UpsertDE` as email-only, yet it was runtime-verified to run and commit on a CloudPage too — prefer `UpsertData` outside email for the affected-row count.
- The key columns must match the DE's primary key or sendable field to avoid creating duplicates
- For large batch upserts, consider WSProxy's `updateBatch` for better performance

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
