---
layout: page
title: DataExtension.Rows
parent: Core Library
parent_url: /core-library/
description: Row-level CRUD methods on a DataExtension object. Retrieve, Add, Update, and Remove rows using object-oriented syntax.
---

`DataExtension.Rows` is the primary interface for reading and writing Data Extension rows via the Core library. Access it through a `DataExtension.Init()` object.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` and `DataExtension.Init()` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`<DataExtensionInstance>.Rows.Retrieve([filter])`](#retrieve) | object[] | Retrieve rows, optionally filtered |
| [`<DataExtensionInstance>.Rows.Add(rowData)`](#add) | string | Insert new row(s) |
| [`<DataExtensionInstance>.Rows.Lookup(searchFieldNames, searchValues, [limit], [orderByFieldName])`](#lookup) | object[] | Look up rows by column values |
| [`<DataExtensionInstance>.Rows.Update(rowData, whereFieldNames, whereValues)`](#update) | string | Update existing rows |
| [`<DataExtensionInstance>.Rows.Remove(columnNames, columnValues)`](#remove) | number | Delete rows matching column values |

---

## Method: Retrieve

```javascript
<DataExtensionInstance>.Rows.Retrieve([filter])
```

Returns an array of row objects. Each object has properties matching the DE column names.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No | SimpleFilterPart or ComplexFilterPart object |

### Filter Object

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

### Retrieve Examples

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

{% include callout.html type="bug" content="On CloudPages, `de.Rows.Retrieve()` without a filter may return empty. Always pass a filter on CloudPages or use `Platform.Function.LookupRows()` instead. See [Known Bugs](/engine-limitations/known-bugs/)." %}

---

## Method: Add

```javascript
<DataExtensionInstance>.Rows.Add(rowData)
```

Adds one or more rows to the previously initialized data extension. Returns `"OK"` on success.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rowData` | array | Yes | Array of objects, one per row to add. Each object's keys must match data extension field names. |

### Examples

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

## Method: Lookup

```javascript
<DataExtensionInstance>.Rows.Lookup(searchFieldNames, searchValues, [limit], [orderByFieldName])
```

Returns rows where the specified columns equal the specified values (AND-joined). Optionally limits results and orders by a field.

{% include callout.html type="note" content="When initializing a data extension for `Lookup()` from an email message, you must use the data extension Name; on landing pages, either Name or external key works — make them identical to be safe." %}

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `searchFieldNames` | array | Yes | Array of column names to match against |
| `searchValues` | array | Yes | Array of values to match (one per column, in order) |
| `limit` | number | No | Maximum number of rows to return |
| `orderByFieldName` | string | No | Field to order results by |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var testDE = DataExtension.Init("testDE");
var data = testDE.Rows.Lookup(["Age"], [25], 2, "LastName");
```

---

## Method: Update

```javascript
<DataExtensionInstance>.Rows.Update(rowData, whereFieldNames, whereValues)
```

Updates the columns of rows where `whereFieldNames` equal `whereValues` (AND-joined). Returns `"OK"` on success.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rowData` | object | Yes | Object whose keys are columns to update and values are the new values |
| `whereFieldNames` | array | Yes | Array of column names to match against |
| `whereValues` | array | Yes | Array of values to match (one per column, in order) |

### Examples

```javascript
Platform.Load("Core", "1");
var dataExt = DataExtension.Init("NTO Customer List");
var fieldsToUpdate = { StateProvince: "QC", PreferredActivity: "Sailing" };
var result = dataExt.Rows.Update(fieldsToUpdate, ["MemberId", "Country"], [9868600, "CA"]);
```

---

## Method: Remove

```javascript
<DataExtensionInstance>.Rows.Remove(columnNames, columnValues)
```

Deletes rows from the previously initialized data extension where the specified columns equal the specified values (AND-joined). For large deletion requests, batch the work — this method times out on long-running deletes.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `columnNames` | array | Yes | Array of column names to match against |
| `columnValues` | array | Yes | Array of values to match (one per column, in order) |

### Examples

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
  <li><a href="/engine-limitations/known-bugs/">Known Bugs — Retrieve on CloudPages</a></li>
</ul>
</div>
