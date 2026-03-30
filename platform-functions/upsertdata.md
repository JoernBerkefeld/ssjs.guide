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
syntax: "Platform.Function.UpsertData(deName, keyFields, keyValues, dataFields, dataValues)"
return_type: number
min_args: 5
max_args: Infinity
---

## Parameters

The standard `UpsertData` signature accepts:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `keyFields` | array | Yes | Array of primary key column names |
| `keyValues` | array | Yes | Array of primary key values |
| `dataFields` | array | Yes | Array of column names to set |
| `dataValues` | array | Yes | Array of values for those columns |

Alternatively, use the flat variadic signature:

```javascript
Platform.Function.UpsertData(deName, field1, value1, ..., filterField, filterValue)
```

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
    ["SubscriberKey"],              // key columns (array)
    [subscriberKey],                // key values (array)
    ["Email", "FirstName", "City"], // data columns (array)
    [email, firstName, city]        // data values (array)
);
```

### Multiple primary keys

```javascript
Platform.Function.UpsertData(
    "OrderItems",
    ["OrderID", "ProductSKU"],   // composite key
    [orderId, sku],
    ["Quantity", "Price"],
    [qty, price]
);
```

### Single column upsert (variadic)

```javascript
// Variadic form: field-value pairs, last pair is the filter
Platform.Function.UpsertData(
    "PageViews",
    "Count",    viewCount,  // column to set
    "PageID",   pageId      // filter (key)
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
    Platform.Response.Redirect("/confirmation");
} catch (e) {
    Write("Save failed: " + e.message);
}
```

## Notes

- `UpsertDE` is an alias for `UpsertData`
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
  <li><a href="/wsproxy/update-batch/">WSProxy.updateBatch</a></li>
  <li><a href="/recipes/de-crud-patterns/">DE CRUD Patterns</a></li>
</ul>
</div>
