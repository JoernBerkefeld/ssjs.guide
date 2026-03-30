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
syntax: "Platform.Function.Lookup(deName, returnField, filterField, filterValue [, filterField2, filterValue2, ...])"
return_type: string
min_args: 4
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `returnField` | string | Yes | Column name whose value to return |
| `filterField` | string | Yes | Column name to filter on |
| `filterValue` | string | Yes | Value to match in the filter column |
| `filterField2` | string | No | Additional filter column (AND logic) |
| `filterValue2` | string | No | Additional filter value |

Additional field/value pairs can be appended for multi-column AND filters.

## Description

`Lookup` searches a Data Extension for the **first** row where all filter conditions match, and returns the value of the specified `returnField`. When no row matches, it returns an empty string `""`.

When multiple rows match, `Lookup` returns the value from the **first** row found (ordering is not guaranteed — use `LookupOrderedRows` if order matters).

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
var price = Platform.Function.Lookup(
    "Products",
    "Price",
    "SKU",    "ABC123",   // filter 1
    "Active", "1"         // filter 2 (AND)
);
```

### Null-safe pattern

`Lookup` returns `""` (empty string) when no match is found — not `null`:

```javascript
var status = Platform.Function.Lookup("Users", "Status", "Email", email);

// Check with either !status or === ""
if (!status || status === "") {
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

### Lookup with external key

If your DE name contains spaces or special characters, use the external key:

```javascript
var val = Platform.Function.Lookup("my-de-external-key", "FieldName", "ID", "123");
```

## Common Mistakes

**Expecting null instead of empty string:**

```javascript
// ❌ This won't work — Lookup returns "" not null
if (result === null) { ... }

// ✅ Correct check
if (!result) { ... }
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
