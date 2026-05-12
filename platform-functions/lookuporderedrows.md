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
syntax: "Platform.Function.LookupOrderedRows(deName, count, orderBy, whereFieldNames, whereFieldValues)"
return_type: "object[]"
min_args: 5
max_args: 5
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `count` | number | Yes | Maximum number of rows to return; values below 1 return up to 2,000 |
| `orderBy` | string | Yes | Sort expression using `"ColumnName ASC"` or `"ColumnName DESC"` syntax (e.g. `"LastName ASC, FirstName ASC"`) |
| `whereFieldNames` | string\|string[] | Yes | Filter field name, or an array of field names connected with AND logic |
| `whereFieldValues` | string\|array | Yes | Filter field value matching `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |

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
    10,                 // max rows
    "OrderDate DESC",  // sort expression
    "Status",          // filter field
    "complete"         // filter value
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
    "Price DESC",
    "Active", "1"
);
```

### All rows sorted (no effective limit)

Use `0` for `count` to retrieve all matching rows in order:

```javascript
var allRows = Platform.Function.LookupOrderedRows(
    "Customers",
    0,               // returns up to 2,000
    "LastName ASC",
    "Active", "1"
);
```

### Multiple filters (AND logic)

```javascript
var rows = Platform.Function.LookupOrderedRows(
    "CustomerData",
    0,
    "LastName ASC",
    ["PreferredLanguage", "RewardsTier"],
    ["English", "Silver"]
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
