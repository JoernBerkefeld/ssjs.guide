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
| [`Retrieve([filter])`](#retrieve) | object[] | Retrieve rows, optionally filtered |
| [`Add(columnValues)`](#add) | number | Insert a new row |
| [`Update(columnValues, keyColumns, keyValues)`](#update) | number | Update existing rows |
| [`Remove(filterColumn, filterValue)`](#remove) | number | Delete rows matching filter |

---

## Method: Retrieve

```javascript
de.Rows.Retrieve([filter])
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
de.Rows.Add(columnValues)
```

Inserts a new row into the Data Extension. Returns 1 on success.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `columnValues` | object | Yes | Plain object mapping column names to values |

### Examples

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("Submissions");

var rowCount = de.Rows.Add({
    Email: "jane@example.com",
    FirstName: "Jane",
    Score: 95,
    SubmittedAt: Platform.Function.Now()
});
// rowCount === 1 on success
```

---

## Method: Update

```javascript
de.Rows.Update(columnValues, keyColumnNames, keyValues)
```

Updates existing rows that match the key. Returns the number of rows updated.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `columnValues` | object | Yes | Columns to update with new values |
| `keyColumnNames` | string[] | Yes | Array of key column names to match |
| `keyValues` | string[] | Yes | Array of corresponding key values |

### Examples

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("Contacts");

var updated = de.Rows.Update(
    { Status: "converted", UpdatedAt: Platform.Function.Now() },
    ["SubscriberKey"],
    ["sub_12345"]
);
// updated === 1 if found
```

---

## Method: Remove

```javascript
de.Rows.Remove(filterColumn, filterValue)
```

Deletes all rows where `filterColumn` equals `filterValue`. Returns the number of rows deleted.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filterColumn` | string | Yes | Column name to filter by |
| `filterValue` | string | Yes | Value to match for deletion |

### Examples

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("ExpiredSessions");

var removed = de.Rows.Remove("SessionToken", expiredToken);
// removed === number of deleted rows
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
