---
layout: function
title: Lookup
parent: Platform Functions
parent_url: /platform-functions/
description: Returns a single field value from a Data Extension row matching the specified filter criteria. The most commonly used DE read function.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Lookup(deName, returnField, whereFieldNames, whereFieldValues)"
return_type: string|number|boolean|Date|null
min_args: 4
max_args: 4
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `returnField` | string | Yes | Column name whose value to return |
| `whereFieldNames` | string\|string[] | Yes | Filter field name, or an array of field names connected with AND logic |
| `whereFieldValues` | string\|array | Yes | Filter field value matching `whereFieldNames`; must be an array of equal length when `whereFieldNames` is an array |

## Description

`Lookup` searches a Data Extension for the **first** row where all filter conditions match, and returns the value of the specified `returnField`. When no row matches, it returns `null` (runtime-verified — **not** an empty string `""`, despite what the official docs imply).

The returned value keeps the column's **native runtime type**: Text/EmailAddress columns return a `string`, Number/Decimal columns return a `number`, Boolean columns return a `boolean`, and Date columns return a real `Date` object (not a formatted string — `getFullYear()`, `getMonth()`, etc. work). This contrasts with [`DataExtension.Rows.Retrieve()`](/core-library/dataextension-rows/), which returns every field as a `string`.

When multiple rows match, `Lookup` returns the value from the **first** row found (ordering is not guaranteed — use `LookupOrderedRows` if order matters).

### Field type → returned JavaScript type (runtime-verified)

Result of probing a Data Extension containing one column of each valid [field type](https://developer.salesforce.com/docs/marketing/marketing-cloud/references/mc_getting_started/dataextensionfieldtype.html) via `Platform.Function.Lookup`:

| DE field type | Returned type | Notes |
|---|---|---|
| Text | `string` | |
| EmailAddress | `string` | |
| Locale | `string` | e.g. `"en-US"` |
| Phone | `string` | |
| Number | `number` | |
| Decimal | `number` | |
| Boolean | `boolean` | `true` / `false` |
| Date | `Date` | a real `Date` object (`getFullYear()` etc. work) |

Only `Lookup` returns Date columns as a real `Date`; the multi-row lookups and `Retrieve` return Date columns as strings.

### Three distinct empty-ish returns (runtime-verified)

`Lookup` has three different "no value" outcomes, and a strict `=== null` check only catches one of them:

| Situation | Value | `typeof` | `=== null` | `String()` |
|---|---|---|---|---|
| No matching row | genuine JS `null` | `object` | `true` | `"null"` |
| Row exists, field is empty/NULL | CLR null | `"clr"` | **`false`** | `""` |
| Field is populated | native value | native | `false` | value |

The empty/NULL-field case is a trap: it is **not** `=== null` and its `typeof` is the SFMC-only `"clr"`. Guard empty fields with a loose `== null` (true for both null forms) or a truthiness / `String()` coercion — never a strict `=== null`.

## Examples

### Basic lookup

```javascript
var email = Platform.Function.Lookup(
    "Subscribers",      // DE name
    "EmailAddress",     // field to return
    "SubscriberKey",    // filter field
    subscriberKey       // filter value
);

if (email) {
    Write("<p>Email: " + email + "</p>");
} else {
    Write("<p>Subscriber not found.</p>");
}
```

### Multi-filter lookup (AND logic)

```javascript
var phone = Platform.Function.Lookup(
    "CustomerData",
    "Phone",
    ["FirstName", "LastName"],       // array of filter fields
    ["Carolyn", "Baumgartner"]       // matching array of values
);
```

### Null-safe pattern

`Lookup` returns `null` when no match is found (runtime-verified):

```javascript
var status = Platform.Function.Lookup("Users", "Status", "Email", email);

// A simple truthiness check covers null (and any empty value)
if (!status) {
    Write("Not found");
} else {
    Write("Status: " + status);
}
```

### In email context

```javascript
// In email: use personalization variables for subscriber data
var loyaltyTier = Platform.Function.Lookup(
    "LoyaltyProgram",
    "Tier",
    "SubscriberKey",
    _subscriberKey  // built-in personalization variable
);
Variable.SetValue("@tier", loyaltyTier || "Standard");
```

### Data Extension Name (not external key)

`Lookup` resolves the Data Extension by its **Name**, not its external key / CustomerKey. Passing the CustomerKey throws *"A Data Extension of this name does not exist."* (runtime-verified). This applies to every `Platform.Function` DE function.

```javascript
// ✅ Use the DE Name
var val = Platform.Function.Lookup("My Data Extension Name", "FieldName", "ID", "123");
```

## Common Mistakes

**Expecting an empty string instead of null:**

```javascript
// ❌ This won't work — Lookup returns null on no-match, not ""
if (result === "") { ... }

// ✅ Correct check
if (!result) { ... }
```

**Passing the external key instead of the Name:**

```javascript
// ❌ Throws — the CustomerKey / external key is not accepted
var val = Platform.Function.Lookup("my-de-external-key", "FieldName", "ID", "123");
```

**Using Lookup for multiple rows:** `Lookup` returns only one row's value. Use `LookupRows` for multiple rows.

**Case sensitivity:** DE names and field names may or may not be case-sensitive depending on SFMC configuration.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/lookuprows/">LookupRows</a></li>
  <li><a href="/platform-functions/lookuporderedrows/">LookupOrderedRows</a></li>
  <li><a href="/platform-functions/insertdata/">InsertData</a></li>
  <li><a href="/platform-functions/upsertdata/">UpsertData</a></li>
  <li><a href="/core-library/dataextension-rows/">DataExtension.Rows (Core library)</a></li>
</ul>
</div>
