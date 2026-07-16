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
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `count` | number | Yes | Maximum number of rows to return; values below 1 return up to 2,000 |
| `orderBy` | string | Yes | Sort expression using `"ColumnName ASC"` or `"ColumnName DESC"` syntax (e.g. `"LastName ASC, FirstName ASC"`) |
| `whereFieldNames` | string\|string[] | Yes | Filter field name, or an array of field names connected with AND logic |
| `whereFieldValues` | string\|array | Yes | Filter field value matching `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |

## Description

`LookupOrderedRows` is the sorted, count-limited version of `LookupRows`. Use it when you need:
- Results in a specific order
- Only the top N rows (e.g., most recent 10 orders)
- Pagination patterns

Like `LookupRows`, each returned row object also carries the system fields `_CustomObjectKey` (a `number`) and `_CreatedDate` (a `string`), and the DE is resolved by its **Name** (not the external key / CustomerKey) — both runtime-verified. It returns `null` when no rows match, so guard before reading `.length`.

Also like `LookupRows`, most fields are returned as their **typed/native JS value** (Number and Decimal columns come back as `number`, Boolean columns as `boolean`) — useful when you need those types without manual casting. **Date columns are the exception:** they come back as an ISO-8601 `string` (e.g. `"2024-01-15T00:00:00.000"`), **not** a `Date` object — unlike [`Lookup`](/platform-functions/lookup/), which returns a real `Date` (runtime-verified). This still contrasts with `DataExtension.Rows.Retrieve()`, which stringifies **every** field, including Number/Boolean (but gives you an empty array `[]` instead of `null` on no match).

### Field type → returned JavaScript type (runtime-verified)

Result of probing a Data Extension containing one column of each valid [field type](https://developer.salesforce.com/docs/marketing/marketing-cloud/references/mc_getting_started/dataextensionfieldtype.html) via `Platform.Function.LookupOrderedRows`:

| DE field type | Returned type | Notes |
|---|---|---|
| Text | `string` | |
| EmailAddress | `string` | |
| Locale | `string` | e.g. `"en-US"` |
| Phone | `string` | |
| Number | `number` | |
| Decimal | `number` | |
| Boolean | `boolean` | `true` / `false` |
| Date | `string` | ISO-8601 string (e.g. `"2024-01-15T00:00:00.000"`) — **not** a `Date` |

Identical to [`LookupRows`](/platform-functions/lookuprows/): Date columns are stringified, unlike [`Lookup`](/platform-functions/lookup/) which returns a real `Date`.

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
