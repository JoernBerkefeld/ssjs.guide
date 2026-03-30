---
layout: function
title: LookupOrderedRows
parent: Platform Functions
parent_url: /platform-functions/
description: Returns sorted rows from a Data Extension with a maximum count limit and filter criteria.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.LookupOrderedRows(deName, sortCount, sortField, sortOrder, filterField, filterValue [, filterField2, filterValue2, ...])"
return_type: "object[]"
min_args: 6
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `sortCount` | number | Yes | Maximum number of rows to return |
| `sortField` | string | Yes | Column name to sort by |
| `sortOrder` | string | Yes | `"ASC"` for ascending, `"DESC"` for descending |
| `filterField` | string | Yes | Column name to filter on |
| `filterValue` | string | Yes | Value to match in the filter column |
| `filterField2` | string | No | Additional filter column |
| `filterValue2` | string | No | Additional filter value |

## Description

`LookupOrderedRows` is the sorted, count-limited version of `LookupRows`. Use it when you need:
- Results in a specific order
- Only the top N rows (e.g., most recent 10 orders)
- Pagination patterns

## Examples

### Get most recent 10 orders

```javascript
var recentOrders = Platform.Function.LookupOrderedRows(
    "Orders",
    10,             // max rows
    "OrderDate",    // sort by
    "DESC",         // newest first
    "Status",       // filter field
    "complete"      // filter value
);

for (var i = 0, len = recentOrders.length; i < len; i++) {
    Write(recentOrders[i]["OrderID"] + " — " + recentOrders[i]["Total"] + "<br>");
}
```

### Top 5 products by price

```javascript
var topProducts = Platform.Function.LookupOrderedRows(
    "Products",
    5,
    "Price",
    "DESC",
    "Active", "1"
);
```

### All rows sorted (no effective limit)

Use a large `sortCount` to retrieve all matching rows in order:

```javascript
var allRows = Platform.Function.LookupOrderedRows(
    "Customers",
    2000,         // effectively all
    "LastName",
    "ASC",
    "Active", "1"
);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/lookup/">Lookup</a></li>
  <li><a href="/platform-functions/lookuprows/">LookupRows</a></li>
</ul>
</div>
