---
layout: page
title: DataExtension
parent: Core Library
parent_url: /core-library/
description: Initialize a Data Extension object for row-level CRUD operations. The starting point for all Core library DE operations.
verification: verified
differs_from_docs: true
requires_core_load: true
type_mapping:
  ssjs: "DataExtension"
  soap: "DataExtension"
  mcdev: "dataExtension"
  gui: "Data Extension"
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

### DataExtension.Init {#init}

Initializes a DataExtension instance bound to the specified Data Extension. Required before invoking any `Fields` or `Rows` sub-namespace method on the returned instance. At runtime the argument may be **either** the External Key **or** the Name of the Data Extension — both resolve to the same DE. Binding is lazy: `Init` never throws for a missing DE; the error surfaces on the first `Rows`/`Fields` operation.

#### Syntax

```javascript
DataExtension.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | The External Key **or** Name of the Data Extension (either resolves) |

#### Return value

`DataExtensionInstance` — access rows via `.Rows`, fields via `.Fields`.

#### Examples

**Initialize and retrieve all rows**

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("MyDE_ExternalKey");
var rows = de.Rows.Retrieve();
// rows is an array of objects
for (var i = 0; i < rows.length; i++) {
    Write(rows[i].Email + "<br>");
}
```

**Initialize and retrieve with filter**

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

**Insert a row**

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

**Update a row**

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("Contacts");
de.Rows.Update(
    { Status: "active", LastSeen: Platform.Function.Now() }, // columns to set
    ["SubscriberKey"],                                       // key columns
    [subscriberKey]                                          // key values
);
```

**Remove rows**

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("TempData");
de.Rows.Remove(["SubscriberKey"], [subscriberKey]);
```

---

### DataExtension.Add {#add}

Creates a new data extension from the supplied properties and returns an initialized DataExtension instance. Unlike most static `Add` methods, this returns a `DataExtensionInstance`, not `"OK"`.

#### Syntax

```javascript
DataExtension.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, `Fields[]`, optional `SendableInfo` |

#### Return value

`DataExtensionInstance`

#### Examples

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

### DataExtension.Retrieve {#retrieve}

Returns an array of data extensions matching the specified filter. Pass `queryAllAccounts: true` to search all accounts accessible to the authenticated user.

{% include differs-from-docs.html note="The official docs document `filter` as required, but at runtime it is optional: `DataExtension.Retrieve()` with no arguments does not throw and returns the full list of data extensions. A filter matching nothing returns a real empty array (`length: 0`)." %}

#### Syntax

```javascript
DataExtension.Retrieve(filter, [queryAllAccounts])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No* | PascalCase WSProxy-style filter object: `{Property, SimpleOperator, Value}`. *Documented as required, but optional at runtime — omitting it returns all data extensions. |
| `queryAllAccounts` | boolean | No | When `true`, search across all accessible accounts. Defaults to `false`. |

#### Return value

`object[]` — a real array (`length: 0` when nothing matches).

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = DataExtension.Retrieve({ Property: "CustomerKey", SimpleOperator: "equals", Value: "myDEKey" });
```

## Notes

### External Key vs Name

At runtime `DataExtension.Init()` resolves **either** the **External Key** or the **Name** of the Data Extension to the same DE. Prefer the External Key for stability (the display name can change). Find the External Key in:
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
