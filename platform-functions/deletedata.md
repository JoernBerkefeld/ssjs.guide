---
layout: function
title: DeleteData
parent: Platform Functions
parent_url: /platform-functions/
description: Removes rows from a Data Extension matching the specified filter criteria. Returns the number of rows deleted.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.DeleteData(deName, filterField, filterValue [, filterField2, filterValue2, ...])"
return_type: number
min_args: 3
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `filterField` | string | Yes | Column name to filter on |
| `filterValue` | string | Yes | Value to match for deletion |
| `filterField2` | string | No | Additional filter column (AND) |
| `filterValue2` | string | No | Additional filter value |

## Examples

### Basic delete

```javascript
var deleted = Platform.Function.DeleteData(
    "TempSessions",
    "SessionToken", token
);
Write("Deleted " + deleted + " session(s).");
```

### Multi-filter delete

```javascript
// Delete expired AND inactive records
Platform.Function.DeleteData(
    "TempData",
    "Status",     "expired",
    "Active",     "0"
);
```

### Safe delete pattern

```javascript
// Verify the record exists before deleting
var exists = Platform.Function.Lookup("Orders", "OrderID", "OrderID", orderId);
if (exists) {
    var count = Platform.Function.DeleteData("Orders", "OrderID", orderId);
    Write("Deleted " + count + " order(s).");
} else {
    Write("Order not found.");
}
```

## Notes

- Returns `0` when no rows match (not an error)
- `DeleteDE` is an alias with identical behavior — however it is limited to emails.
- **Irreversible** — SFMC DEs have no built-in undo. Always verify the filter before deleting.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/insertdata/">InsertData</a></li>
  <li><a href="/platform-functions/updatedata/">UpdateData</a></li>
  <li><a href="/platform-functions/deletede/">DeleteDE</a></li>
</ul>
</div>
