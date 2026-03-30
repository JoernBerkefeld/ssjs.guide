---
layout: page
title: proxy.create
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/create-item/
description: Create a new SFMC object via the SOAP API — subscribers, data extensions, triggered send definitions, and more.
---

## Syntax

```javascript
var result = proxy.create(objectType, properties [, options]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Object properties to set |
| `options` | object | No | Additional SOAP create options |

## Return Value

```javascript
{
    Status: "OK",      // "OK" or "Error"
    RequestID: "...",
    Results: [
        {
            StatusCode: "OK",
            StatusMessage: "Created successfully",
            Object: { ... }  // the created object
        }
    ]
}
```

## Examples

### Add subscriber to All Subscribers

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.create("Subscriber", {
    EmailAddress: "jane@example.com",
    SubscriberKey: "sub_jane",
    Status: "Active",
    Lists: [
        { ID: 12345, Status: "Active" }
    ]
});
if (result.Status !== "OK") {
    Write("Error creating subscriber: " + result.Results[0].StatusMessage);
}
```

### Create a Data Extension

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.create("DataExtension", {
    Name: "NewDE_Name",
    CustomerKey: "NewDE_Key",
    Fields: {
        Field: [
            { Name: "SubscriberKey", FieldType: "Text", IsPrimaryKey: true, IsRequired: true, MaxLength: 254 },
            { Name: "Email", FieldType: "EmailAddress", IsRequired: true },
            { Name: "Score", FieldType: "Number" },
            { Name: "CreatedAt", FieldType: "Date" }
        ]
    }
});
```

### Insert DE row

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.create("DataExtensionObject[MyDE_Key]", {
    Properties: {
        Property: [
            { Name: "Email", Value: "jane@example.com" },
            { Name: "Score", Value: "95" },
            { Name: "Timestamp", Value: Platform.Function.Now() }
        ]
    }
});
```

## Notes

For **upsert** (create or update) on Data Extension rows, use `proxy.update` with `SaveOption` or use the Core library's `de.Rows.Add()` / `de.Rows.Update()`.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/create-batch/">proxy.createBatch</a></li>
  <li><a href="/wsproxy/update-item/">proxy.update</a></li>
  <li><a href="/wsproxy/delete-item/">proxy.delete</a></li>
</ul>
</div>
