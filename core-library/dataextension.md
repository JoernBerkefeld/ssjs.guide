---
layout: page
title: DataExtension
parent: Core Library
parent_url: /core-library/
description: Initialize a Data Extension object for row-level CRUD operations. The starting point for all Core library DE operations.
---

`DataExtension` is a Core library object that provides object-oriented access to Data Extensions. Initialize it with `DataExtension.Init()`, then use the `.Rows` and `.Fields` properties.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use. Core Library DataExtension methods do not support enterprise-level data extensions." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`DataExtension.Init(key)`](#init) | DataExtensionInstance | Initialize a DataExtension object by external key |
| [`DataExtension.Add(properties)`](#add) | DataExtensionInstance | Create a new data extension |
| [`DataExtension.Retrieve(filter, [queryAllAccounts])`](#retrieve) | object[] | Retrieve data extensions matching a filter |

---

## DataExtension.Init

### Syntax

```javascript
DataExtension.Init(key)
```

Initializes a DataExtension instance bound to the specified external key. Required before invoking any `Fields` or `Rows` sub-namespace method on the returned instance.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | The External Key of the Data Extension |

### Return value

`DataExtensionInstance` — access rows via `.Rows`, fields via `.Fields`.

### Examples

#### Initialize and retrieve all rows

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("MyDE_ExternalKey");
var rows = de.Rows.Retrieve();
// rows is an array of objects
for (var i = 0; i < rows.length; i++) {
    Write(rows[i].Email + "<br>");
}
```

#### Initialize and retrieve with filter

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("Orders");
var filter = {
    Property: "Status",
    SimpleOperator: "equals",
    Value: "pending"
};
var pendingOrders = de.Rows.Retrieve(filter);
```

#### Insert a row

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("EventLog");
de.Rows.Add([{
    EventType: "pageview",
    Page: "/home",
    Timestamp: Platform.Function.Now(),
    SubscriberKey: subscriberKey
}]);
```

#### Update a row

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("Contacts");
de.Rows.Update(
    { Status: "active", LastSeen: Platform.Function.Now() }, // columns to set
    ["SubscriberKey"],                                       // key columns
    [subscriberKey]                                          // key values
);
```

#### Remove rows

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("TempData");
de.Rows.Remove(["SubscriberKey"], [subscriberKey]);
```

---

## DataExtension.Add

### Syntax

```javascript
DataExtension.Add(properties)
```

Creates a new data extension from the supplied properties and returns an initialized DataExtension instance. Unlike most static `Add` methods, this returns a `DataExtensionInstance`, not `"OK"`.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, `Fields[]`, optional `SendableInfo` |

### Return value

`DataExtensionInstance`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var deObj = {
    CustomerKey: "SendableDE",
    Name: "Sendable Data Extension",
    Fields: [
        { Name: "SubKey", FieldType: "Text", IsPrimaryKey: true, MaxLength: 50, IsRequired: true },
        { Name: "SecondField", FieldType: "Text", MaxLength: 50 }
    ],
    SendableInfo: {
        Field: { Name: "SubKey", FieldType: "Text" },
        RelatesOn: "Subscriber Key"
    }
};
var de = DataExtension.Add(deObj);
```

---

## DataExtension.Retrieve

### Syntax

```javascript
DataExtension.Retrieve(filter, [queryAllAccounts])
```

Returns an array of data extensions matching the specified filter. Pass `queryAllAccounts: true` to search all accounts accessible to the authenticated user.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | PascalCase WSProxy-style filter object: `{Property, SimpleOperator, Value}` |
| `queryAllAccounts` | boolean | No | When `true`, search across all accessible accounts. Defaults to `false`. |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = DataExtension.Retrieve({ Property: "CustomerKey", SimpleOperator: "equals", Value: "myDEKey" });
```

## Notes

### External Key vs Name

`DataExtension.Init()` requires the **External Key**, not the display name. Find it in:
- Email Studio → Data Extensions → Edit → External Key
- Contact Builder → Data Extensions → (click DE name) → Properties

### CloudPage Retrieve Bug

{% include callout.html type="bug" content="`de.Rows.Retrieve()` does not work reliably on CloudPages without a filter argument. Always pass a filter, or use `Platform.Function.LookupRows()` as a workaround. See [Known Bugs](/engine-limitations/known-bugs/) for details." %}

```javascript
// On CloudPages, this may return empty results:
var rows = de.Rows.Retrieve();

// Use a filter instead:
var rows = de.Rows.Retrieve({ Property: "Active", SimpleOperator: "equals", Value: "1" });

// Or use Platform.Function:
var rows = Platform.Function.LookupRows("MyDE", ["Active"], ["1"]);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/dataextension-rows/">DataExtension.Rows</a></li>
  <li><a href="/platform-functions/lookup/">Platform.Function.Lookup</a></li>
  <li><a href="/platform-functions/lookuprows/">Platform.Function.LookupRows</a></li>
  <li><a href="/engine-limitations/known-bugs/">Known Bugs</a></li>
</ul>
</div>
