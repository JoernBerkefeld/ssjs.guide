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
syntax: "Platform.Function.DeleteData(deName, whereFieldNames, whereFieldValues)"
return_type: number
min_args: 3
max_args: 3
verification: verified
differs_from_docs: true
---

{% include differs-from-docs.html note="`DeleteData` resolves the Data Extension by its **Name** only — passing the external key / CustomerKey throws \"A Data Extension of this name does not exist.\" (runtime-verified)." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string[] | Yes | Array of column names to match for deletion |
| `whereFieldValues` | array | Yes | Array of values aligned to `whereFieldNames` that identify rows to delete |

## Examples

### Basic delete

```javascript
var deleted = Platform.Function.DeleteData(
    "TempSessions",
    ["SessionToken"], [token]
);
Write("Deleted " + deleted + " session(s).");
```

### Multi-filter delete

```javascript
// Delete expired AND inactive records
Platform.Function.DeleteData(
    "TempData",
    ["Status", "Active"],
    ["expired", "0"]
);
```

### Safe delete pattern

```javascript
// Verify the record exists before deleting
var exists = Platform.Function.Lookup("Orders", "OrderID", "OrderID", orderId);
if (exists) {
    var count = Platform.Function.DeleteData("Orders", ["OrderID"], [orderId]);
    Write("Deleted " + count + " order(s).");
} else {
    Write("Order not found.");
}
```

## Notes

- Returns `0` when no rows match (not an error)
- Resolves the DE by **Name**, not external key / CustomerKey
- `DeleteDE` performs the same delete but returns `null` instead of a row count. The official docs describe `DeleteDE` as email-only, yet it was runtime-verified to run and commit on a CloudPage too — prefer `DeleteData` outside email for the affected-row count.
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
