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
syntax: "Platform.Function.UpdateData(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)"
return_type: number
min_args: 5
max_args: 5
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `whereFieldNames` | string\|string[] | Yes | Column name(s) to identify the rows to update; use an array for multiple columns (AND logic) |
| `whereFieldValues` | string\|array | Yes | Value(s) to match in `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |
| `fieldNames` | string[] | Yes | Array of column names to update |
| `fieldValues` | array | Yes | Array of new values aligned to `fieldNames` |

## Examples

### Update a single column

```javascript
var affected = Platform.Function.UpdateData(
    "Subscribers",
    ["SubscriberKey"],  [subscriberKey],     // filter: rows where SubscriberKey = subscriberKey
    ["Status"],         ["unsubscribed"]      // column to update
);
Write(affected + " row(s) updated.");
```

### Update multiple columns

```javascript
Platform.Function.UpdateData(
    "Subscribers",
    ["Email"],      [email],  // filter: update rows where Email = email
    ["LastLogin", "LoginCount", "Status"],
    [Now(), loginCount + 1, "active"]
);
```

### Update with error handling

```javascript
try {
    var updated = Platform.Function.UpdateData(
        "Orders",
        ["OrderID"],     [orderId],   // filter
        ["ShippedDate"], [Now()]      // data to update
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
