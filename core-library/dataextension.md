---
layout: page
title: DataExtension
parent: Core Library
parent_url: /core-library/
description: Initialize a Data Extension object for row-level CRUD operations. The starting point for all Core library DE operations.
---

`DataExtension` is a Core library object that provides object-oriented access to Data Extensions. Initialize it with `DataExtension.Init()`, then use the `.Rows` property to retrieve, insert, update, or remove rows.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init(externalKey);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalKey` | string | Yes | The External Key of the Data Extension |

## Return Value

Returns a `DataExtension` object. Access rows via `de.Rows`.

## Examples

### Initialize and retrieve all rows

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("MyDE_ExternalKey");
var rows = de.Rows.Retrieve();
// rows is an array of objects
for (var i = 0; i < rows.length; i++) {
    Write(rows[i].Email + "<br>");
}
```

### Initialize and retrieve with filter

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

### Insert a row

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("EventLog");
de.Rows.Add({
    EventType: "pageview",
    Page: "/home",
    Timestamp: Platform.Function.Now(),
    SubscriberKey: subscriberKey
});
```

### Update a row

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("Contacts");
de.Rows.Update(
    { Status: "active", LastSeen: Platform.Function.Now() }, // columns to set
    ["SubscriberKey"],                                       // key columns
    [subscriberKey]                                          // key values
);
```

### Remove rows

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("TempData");
de.Rows.Remove("SubscriberKey", subscriberKey);
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
var rows = Platform.Function.LookupRows("MyDE", "Active", "1");
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
