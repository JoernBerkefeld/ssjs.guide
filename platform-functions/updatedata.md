---
layout: function
title: UpdateData
parent: Platform Functions
parent_url: /platform-functions/
description: Modifies existing rows in a Data Extension that match the filter criteria. Returns the number of rows updated.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.UpdateData(deName, updateField, updateValue, filterField, filterValue [, ...])"
return_type: number
min_args: 5
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `updateField` | string | Yes | Column to update |
| `updateValue` | string | Yes | New value for the column |
| `filterField` | string | Yes | Column to filter on (identifies which rows to update) |
| `filterValue` | string | Yes | Filter value |

Additional `updateField`/`updateValue` pairs can be appended before the filter pair for updating multiple columns.

## Examples

### Update a single column

```javascript
var affected = Platform.Function.UpdateData(
    "Subscribers",
    "Status",         "unsubscribed",   // column to update
    "SubscriberKey",  subscriberKey     // filter
);
Write(affected + " row(s) updated.");
```

### Update multiple columns

```javascript
Platform.Function.UpdateData(
    "Subscribers",
    "LastLogin",  Platform.Function.Now(),
    "LoginCount", loginCount + 1,
    "Status",     "active",
    "Email",      email   // filter: update rows where Email = email
);
```

### Update with error handling

```javascript
try {
    var updated = Platform.Function.UpdateData(
        "Orders",
        "ShippedDate", Platform.Function.Now(),
        "OrderID",     orderId
    );
    if (updated === 0) {
        Write("No order found with ID: " + orderId);
    }
} catch (e) {
    Write("Update failed: " + e.message);
}
```

## Notes

- If no rows match the filter, returns `0` (not an error)
- `UpdateDE` is an alias for `UpdateData`
- For insert-or-update logic, use `UpsertData`

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/upsertdata/">UpsertData</a></li>
  <li><a href="/platform-functions/insertdata/">InsertData</a></li>
  <li><a href="/platform-functions/deletedata/">DeleteData</a></li>
  <li><a href="/platform-functions/updatede/">UpdateDE</a></li>
</ul>
</div>
