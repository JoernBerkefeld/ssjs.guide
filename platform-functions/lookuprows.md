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
syntax: "Platform.Function.LookupRows(deName, whereFieldNames, whereFieldValues)"
return_type: "object[]"
min_args: 3
max_args: 3
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string\|string[] | Yes | Filter field name, or an array of field names connected with AND logic |
| `whereFieldValues` | string\|array | Yes | Filter field value matching `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |

## Description

`LookupRows` returns an array of row objects from the specified Data Extension. Each element in the array is an object where property names are the column names and values are the cell values. Each row object also carries two **system fields**: `_CustomObjectKey` (a `number`) and `_CreatedDate` (a `string`) — runtime-verified.

Returns `null` when no rows match (runtime-verified — **not** an empty array `[]`, despite what the examples elsewhere might suggest). Guard your `.length` access accordingly.

The Data Extension is resolved by its **Name**; the external key / CustomerKey is not accepted.

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
    "CustomerData",
    ["PreferredLanguage", "RewardsTier"],    // array of filter fields
    ["English", "Gold"]                      // matching array of values
);

for (var i = 0; i < rows.length; i++) {
    var order = rows[i];
    Write(order["OrderID"] + ": " + order["Total"] + "<br>");
}
```

### Check if empty (null-safe)

`LookupRows` returns `null` — not an empty array — when nothing matches, so guard before reading `.length`:

```javascript
var results = Platform.Function.LookupRows("Products", "Category", selectedCategory);

if (!results || results.length === 0) {
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
- Returns `null` (not `[]`) when no rows match — always guard before reading `.length`
- Each row object includes the system fields `_CustomObjectKey` (number) and `_CreatedDate` (string)
- Resolves the DE by **Name**, not external key / CustomerKey
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
