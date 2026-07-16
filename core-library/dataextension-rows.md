---
layout: page
title: DataExtension.Rows
parent: Core Library
parent_url: /core-library/
description: Row-level CRUD methods on a DataExtension object. Retrieve, Add, Update, and Remove rows using object-oriented syntax.
verification: verified
requires_core_load: true
differs_from_docs: "Runtime-verified on a live CloudPage: Add and Update return a number (rows affected), not the string \"OK\"; Update returns 0 (does not throw) on no match. Retrieve() without a filter DOES work on CloudPages (the \"returns empty\" bug could not be reproduced) and returns every field as a string, whereas Lookup returns typed values. Retrieve returns an empty array on no match; Lookup returns null on no match. Retrieve/Lookup results are host arrays (instanceof Array is false, but .length and index access work)."
---

`DataExtension.Rows` is the primary interface for reading and writing Data Extension rows via the Core library. Access it through a `DataExtension.Init()` object.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` and `DataExtension.Init()` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`<DataExtensionInstance>.Rows.Retrieve([filter])`](#instance-rows-retrieve) | object[] | Retrieve rows, optionally filtered |
| [`<DataExtensionInstance>.Rows.Add(rowData)`](#instance-rows-add) | number | Insert new row(s) |
| [`<DataExtensionInstance>.Rows.Lookup(searchFieldNames, searchValues[, limit[, orderByFieldName]])`](#instance-rows-lookup) | object[] | Look up rows by column values |
| [`<DataExtensionInstance>.Rows.Update(rowData, whereFieldNames, whereValues)`](#instance-rows-update) | number | Update existing rows |
| [`<DataExtensionInstance>.Rows.Remove(columnNames, columnValues)`](#instance-rows-remove) | number | Delete rows matching column values |

---

### &lt;DataExtensionInstance&gt;.Rows.Retrieve {#instance-rows-retrieve}

Returns an array of row objects. Each object has properties matching the DE column names.

#### Syntax

```javascript
<DataExtensionInstance>.Rows.Retrieve([filter])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No | SimpleFilterPart or ComplexFilterPart object |

#### Filter Object

```javascript
// SimpleFilterPart
var filter = {
    Property: "columnName",
    SimpleOperator: "equals",    // equals, notEquals, greaterThan, lessThan, etc.
    Value: "filterValue"
};

// ComplexFilterPart (AND/OR)
var filter = {
    LeftOperand: {
        Property: "Status",
        SimpleOperator: "equals",
        Value: "active"
    },
    LogicalOperator: "AND",
    RightOperand: {
        Property: "Score",
        SimpleOperator: "greaterThan",
        Value: "50"
    }
};
```

#### Return value

`object[]` — row objects with properties matching DE column names. **All field values are returned as strings** (even Number/Boolean/Date columns) — unlike `Lookup`, which returns typed values. On no match, returns an empty array (`length === 0`), not `null` — an ergonomic advantage: you can iterate the result directly without a null-guard. If you need typed/native values instead of strings, use [`Platform.Function.LookupRows`](/platform-functions/lookuprows/) or [`Platform.Function.LookupOrderedRows`](/platform-functions/lookuporderedrows/).

##### Field type → returned JavaScript type (runtime-verified)

Result of probing a Data Extension containing one column of each valid [field type](https://developer.salesforce.com/docs/marketing/marketing-cloud/references/mc_getting_started/dataextensionfieldtype.html) via `<DataExtensionInstance>.Rows.Retrieve()`:

| DE field type | Returned type | Notes |
|---|---|---|
| Text | `string` | |
| EmailAddress | `string` | |
| Locale | `string` | e.g. `"en-US"` |
| Phone | `string` | |
| Number | `string` | stringified number (e.g. `"42"`) |
| Decimal | `string` | stringified number (e.g. `"3.14"`) |
| Boolean | `string` | stringified boolean (`"True"` / `"False"`, capitalized) |
| Date | `string` | .NET-formatted date string (e.g. `"1/15/2024 12:00:00 AM"`) |

**Every** field comes back as a `string` — including Number, Decimal, Boolean, and Date. This is the key difference from the `Platform.Function.Lookup*` family, which returns typed values. Note the Boolean stringifies to the capitalized `"True"`/`"False"` and the Date to a locale-style `M/D/YYYY h:mm:ss AM/PM` string (not ISO-8601).

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: `de.Rows.Retrieve()` without a filter DOES work on CloudPages and returns all rows — the widely-repeated \"returns empty on CloudPages\" bug could not be reproduced. Every field value is returned as a string (Number/Decimal as stringified numbers, Boolean as capitalized \"True\"/\"False\", Date as a locale-formatted string, not ISO-8601). The result is a host array (`instanceof Array` is `false`, but `.length` and index access work)." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("Products");

// Retrieve all rows
var all = de.Rows.Retrieve();

// Retrieve with single filter
var active = de.Rows.Retrieve({
    Property: "IsActive",
    SimpleOperator: "equals",
    Value: "true"
});

// Iterate
for (var i = 0; i < active.length; i++) {
    var row = active[i];
    Write(row.ProductName + ": " + row.Price + "<br>");
}
```

---

### &lt;DataExtensionInstance&gt;.Rows.Add {#instance-rows-add}

Adds one or more rows to the previously initialized data extension.

#### Syntax

```javascript
<DataExtensionInstance>.Rows.Add(rowData)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rowData` | array | Yes | Array of row objects (or a single row object). Each object's keys must match data extension field names. |

#### Return value

`number` — the count of rows that were added.

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: `Add()` returns a number (the count of rows added), not the string `\"OK\"`. It also accepts a single row object in addition to an array of objects." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var arrContacts = [
    { Email: "jdoe@example.com", FirstName: "John", LastName: "Doe" },
    { Email: "aruiz@example.com", FirstName: "Angel", LastName: "Ruiz" }
];
var birthdayDE = DataExtension.Init("birthdayDE");
birthdayDE.Rows.Add(arrContacts);
```

---

### &lt;DataExtensionInstance&gt;.Rows.Lookup {#instance-rows-lookup}

Returns rows where the specified columns equal the specified values (AND-joined). Optionally limits results and orders by a field.

{% include callout.html type="note" content="When initializing a data extension for `Lookup()` from an email message, you must use the data extension Name; on landing pages, either Name or external key works — make them identical to be safe." %}

#### Syntax

```javascript
<DataExtensionInstance>.Rows.Lookup(searchFieldNames, searchValues[, limit[, orderByFieldName]])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `searchFieldNames` | array | Yes | Array of column names to match against |
| `searchValues` | array | Yes | Array of values to match (one per column, in order) |
| `limit` | number | No | Maximum number of rows to return |
| `orderByFieldName` | string | No | Field to order results by |

#### Return value

`object[]` — rows with **typed values** (Number/Boolean/Date columns come back as their native types). On no match, returns `null` (not an empty array).

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: `Lookup()` returns typed values (unlike `Retrieve`, which returns every field as a string) and returns `null` on no match. The result is a host array (`instanceof Array` is `false`, but `.length` and index access work)." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var testDE = DataExtension.Init("testDE");
var data = testDE.Rows.Lookup(["Age"], [25], 2, "LastName");
```

---

### &lt;DataExtensionInstance&gt;.Rows.Update {#instance-rows-update}

Updates the columns of rows where `whereFieldNames` equal `whereValues` (AND-joined).

#### Syntax

```javascript
<DataExtensionInstance>.Rows.Update(rowData, whereFieldNames, whereValues)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rowData` | object | Yes | Object whose keys are columns to update and values are the new values |
| `whereFieldNames` | array | Yes | Array of column names to match against |
| `whereValues` | array | Yes | Array of values to match (one per column, in order) |

#### Return value

`number` — the count of rows that were updated. Returns `0` (does not throw) when no row matches.

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: `Update()` returns a number (the count of rows updated), not the string `\"OK\"`. When no row matches the WHERE clause it returns `0` and does NOT throw." %}

#### Examples

```javascript
Platform.Load("Core", "1");
var dataExt = DataExtension.Init("NTO Customer List");
var fieldsToUpdate = { StateProvince: "QC", PreferredActivity: "Sailing" };
var result = dataExt.Rows.Update(fieldsToUpdate, ["MemberId", "Country"], [9868600, "CA"]);
```

---

### &lt;DataExtensionInstance&gt;.Rows.Remove {#instance-rows-remove}

Deletes rows from the previously initialized data extension where the specified columns equal the specified values (AND-joined). For large deletion requests, batch the work — this method times out on long-running deletes.

#### Syntax

```javascript
<DataExtensionInstance>.Rows.Remove(columnNames, columnValues)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `columnNames` | array | Yes | Array of column names to match against |
| `columnValues` | array | Yes | Array of values to match (one per column, in order) |

#### Return value

`number` — count of deleted rows.

#### Examples

```javascript
Platform.Load("Core", "1.1.5");
var memberDE = DataExtension.Init("MembershipRewards");
var result = memberDE.Rows.Remove(["Area"], ["Kensington"]);
```

## Complete CRUD Pattern

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("UserPreferences");
var subscriberKey = Platform.Variable.GetValue("@subscriberKey");

// Read
var existing = de.Rows.Retrieve({
    Property: "SubscriberKey",
    SimpleOperator: "equals",
    Value: subscriberKey
});

if (existing.length === 0) {
    // Create
    de.Rows.Add({
        SubscriberKey: subscriberKey,
        Theme: "light",
        Language: "en",
        CreatedAt: Platform.Function.Now()
    });
} else {
    // Update
    de.Rows.Update(
        { Theme: newTheme, UpdatedAt: Platform.Function.Now() },
        ["SubscriberKey"],
        [subscriberKey]
    );
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/dataextension/">DataExtension.Init</a></li>
  <li><a href="/platform-functions/lookuprows/">Platform.Function.LookupRows</a></li>
  <li><a href="/engine-limitations/differs-from-docs/">Differs from Docs — Rows return types</a></li>
</ul>
</div>
