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
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string\|string[] | Yes | Filter field name, or an array of field names connected with AND logic |
| `whereFieldValues` | string\|array | Yes | Filter field value matching `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |

{% include test-script.html bundle="platform-functions--lookuprows" chapter="parameters" %}

## Description

`LookupRows` returns an array of row objects from the specified Data Extension. Each element in the array is an object where property names are the column names and values are the cell values. Each row object also carries two **system fields**: `_CustomObjectKey` (a `number`) and `_CreatedDate` (a `string`) — runtime-verified.

{% include differs-from-docs.html note="At runtime `LookupRows` returns `null` (not an empty array `[]`) when no row matches — guard before reading `.length`. Each matched row also carries undocumented system fields `_CustomObjectKey` (number) and `_CreatedDate` (string), the DE is resolved by **Name** only, and a NULL Text field is normalized to an ordinary empty string rather than scalar `Lookup`'s hazardous CLR null." %}

`LookupRows` returns most fields as their **typed/native JS value** (Number and Decimal columns come back as `number`, Boolean columns as `boolean`), so you can use them without manual casting. **Date columns are the exception:** they are returned as an ISO-8601 `string` (e.g. `"2024-01-15T00:00:00.000"`), **not** as a `Date` object — this differs from [`Lookup`](/platform-functions/lookup/), which returns a real `Date` for Date columns (runtime-verified). Text and EmailAddress columns are `string` in both. An omitted/NULL Text field is also normalized to an ordinary empty `string`: strict and loose null comparisons are false, a truthiness test is safely falsy, and `String()` yields `""`. This matches `LookupOrderedRows` and sharply contrasts with scalar `Lookup`, whose omitted field is a CLR null that throws on loose equality and truthiness. This still contrasts with `DataExtension.Rows.Retrieve()`, which stringifies **every** field (including Number/Boolean). In return, `Retrieve` gives you an empty array (`[]`) rather than `null` on no match — see [DataExtension.Rows](/core-library/dataextension-rows/) for that trade-off.

### Field type → returned JavaScript type (runtime-verified)

Result of probing a Data Extension containing one column of each valid [field type](https://developer.salesforce.com/docs/marketing/marketing-cloud/references/mc_getting_started/dataextensionfieldtype.html) via `Platform.Function.LookupRows`:

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

Unlike [`Lookup`](/platform-functions/lookup/) (which returns a real `Date` for Date columns), the multi-row lookups stringify Date columns. All other types match `Lookup`.

> **Row limit:** `LookupRows` has no count argument and returns matching rows up to the 2,000-row platform ceiling. Use `LookupOrderedRows` when you need a smaller explicit count or deterministic sorting.

{% include test-script.html bundle="platform-functions--lookuprows" chapter="description" label="Show test script — row shape, field types, nulls, and query caching" %}

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

{% include test-script.html bundle="platform-functions--lookuprows" chapter="examples" %}

## Notes

- Returns Number/Decimal columns as `number` and Boolean columns as `boolean`; **Date columns come back as an ISO-8601 `string`** (unlike `Lookup`, which returns a real `Date`). By contrast, `DataExtension.Rows.Retrieve()` stringifies every field, including numbers and booleans
- Returns `null` (not `[]`) when no rows match — always guard before reading `.length`
- Each row object includes the system fields `_CustomObjectKey` (number) and `_CreatedDate` (string)
- Resolves the DE by **Name**, not external key / CustomerKey
- Returns all matching rows up to SFMC's row limit
- Results are not guaranteed to be in any particular order — use `LookupOrderedRows` for sorted results
- Accessing a non-existent column returns `undefined`; returned row property names preserve the DE column's case and property access is case-sensitive
- DE/filter identifiers and Text filter values were case-insensitive on the verification BU, but collation can vary by configuration — do not rely on that behavior

{% include test-script.html bundle="platform-functions--lookuprows" chapter="notes" %}

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
