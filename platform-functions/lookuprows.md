---
layout: function
title: LookupRows
parent: Platform Functions
parent_url: /platform-functions/
description: Returns all rows from a Data Extension matching the filter criteria as an array of objects.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.LookupRows(deName, filterField, filterValue [, filterField2, filterValue2, ...])"
return_type: "object[]"
min_args: 3
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `filterField` | string | Yes | Column name to filter on |
| `filterValue` | string | Yes | Value to match in the filter column |
| `filterField2` | string | No | Additional filter column (AND logic) |
| `filterValue2` | string | No | Additional filter value |

## Description

`LookupRows` returns an array of row objects from the specified Data Extension. Each element in the array is an object where property names are the column names and values are the cell values.

Returns an **empty array** `[]` when no rows match (not null).

Unlike `DataExtension.Rows.Retrieve()`, `LookupRows` works correctly on **CloudPages**.

> **Row limit:** `LookupRows` may return up to 2,000 rows by default. Use `LookupOrderedRows` with a `sortCount` limit for larger datasets.

## Examples

### Basic multi-row lookup

```javascript
var rows = Platform.Function.LookupRows("ActiveSubscribers", "Status", "active");

Write("<p>Found " + rows.length + " subscribers</p>");
Write("<ul>");
for (var i = 0, len = rows.length; i < len; i++) {
    var row = rows[i];
    Write("<li>" + row["Email"] + " — " + row["FirstName"] + "</li>");
}
Write("</ul>");
```

### Multi-column filter

```javascript
var rows = Platform.Function.LookupRows(
    "Orders",
    "Status",  "pending",
    "Country", "US"
);

for (var i = 0; i < rows.length; i++) {
    var order = rows[i];
    Write(order["OrderID"] + ": " + order["Total"] + "<br>");
}
```

### Check if empty

```javascript
var results = Platform.Function.LookupRows("Products", "Category", selectedCategory);

if (results.length === 0) {
    Write('<p class="empty">No products found in this category.</p>');
} else {
    // render products...
}
```

### Build a select dropdown

```javascript
var options = Platform.Function.LookupRows("Countries", "Active", "1");

Write('<select name="country">');
for (var i = 0, len = options.length; i < len; i++) {
    Write('<option value="' + options[i]["Code"] + '">' + options[i]["Name"] + '</option>');
}
Write('</select>');
```

### Accessing row fields

Row fields are accessed by column name (case-sensitive to the DE column names):

```javascript
var row = rows[0];
var id    = row["ID"];          // or row.ID if no spaces
var email = row["Email"];
var date  = row["CreatedDate"];
```

## Notes

- Works on CloudPages (unlike `DataExtension.Rows.Retrieve()`)
- Returns all matching rows up to SFMC's row limit
- Results are not guaranteed to be in any particular order — use `LookupOrderedRows` for sorted results
- Accessing a non-existent column returns `undefined`

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/lookup/">Lookup</a></li>
  <li><a href="/platform-functions/lookuporderedrows/">LookupOrderedRows</a></li>
  <li><a href="/core-library/dataextension-rows/">DataExtension.Rows.Retrieve</a></li>
  <li><a href="/recipes/de-crud-patterns/">DE CRUD Patterns</a></li>
</ul>
</div>
