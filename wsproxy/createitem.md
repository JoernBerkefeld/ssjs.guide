---
layout: function
title: <WSProxyInstance>.createItem
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/createitem/
redirect_from:
  - /wsproxy/create-item/
description: Create a new SFMC object via the SOAP API — subscribers, data extensions, triggered send definitions, and more. Returns an object with Status, RequestID, and Results.
syntax: "<WSProxyInstance>.createItem(objectType, properties[, createOptions])"
return_type: object
min_args: 2
max_args: 3
verification: verified
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Object properties to set |
| `createOptions` | object | No | Optional SOAP `CreateOptions` (e.g. `RequestType`, `QueuePriority`) |

{% include test-script.html bundle="wsproxy--createitem" chapter="parameters" %}

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

{% include test-script.html bundle="wsproxy--createitem" chapter="return-value" %}

## Examples

### Add subscriber to All Subscribers

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.createItem("Subscriber", {
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
var result = proxy.createItem("DataExtension", {
    Name: "NewDE_Name",
    CustomerKey: "NewDE_Key",
    Fields: [
        { Name: "SubscriberKey", FieldType: "Text", IsPrimaryKey: true, IsRequired: true, MaxLength: 254 },
        { Name: "Email", FieldType: "EmailAddress", IsRequired: true },
        { Name: "Score", FieldType: "Number" },
        { Name: "CreatedAt", FieldType: "Date" }
    ]
});
```

{% include callout.html type="warning" content="`Fields` must be a flat array. Wrapping it as `Fields: { Field: [ ... ] }` throws `Error executing create call.` and can abort the whole CloudPage with HTTP 422." %}

A sendable data extension additionally takes `CategoryID` (the folder), `IsSendable`, `IsTestable`, `SendableDataExtensionField` and `SendableSubscriberField`. Adding the `DataRetentionPeriod*` / `RowBasedRetention` / `ResetRetentionPeriodOnImport` / `DeleteAtEndOfRetentionPeriod` block to that same config returned `Status: "Error"` and created no data extension on our test BU, while the identical config without those properties succeeded. Salesforce's `DataExtension` object reference notes that the retention properties additionally depend on account-level retention setup and a dedicated retention permission.

### Insert DE row

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.createItem("DataExtensionObject", {
    CustomerKey: "MyDE_Key",
    Properties: [
        { Name: "Email", Value: "jane@example.com" },
        { Name: "Score", Value: "95" },
        { Name: "Timestamp", Value: Platform.Function.Now() }
    ]
});
```

{% include callout.html type="warning" content="Unlike `retrieve`, `createItem` does not accept the bracketed `DataExtensionObject[MyDE_Key]` form — it throws `Error executing create call.` Name the data extension through the `CustomerKey` property instead, and pass a flat `Properties` array of `{ Name, Value }` pairs." %}

{% include test-script.html bundle="wsproxy--createitem" chapter="examples" %}

## Notes

`createItem` is not an upsert: submitting a primary key that already exists returns `Status: "Error"` and leaves the stored row unchanged.

For **upsert** (create or update) on Data Extension rows, pass the save option `SaveOptions: [{ PropertyName: "*", SaveAction: "UpdateAdd" }]` to `proxy.updateItem` or `proxy.updateBatch`, or use the Core library's `de.Rows.Add()` / `de.Rows.Update()`.

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.updateItem("DataExtensionObject", {
    CustomerKey: "MyDE_Key",
    Properties: [
        { Name: "SubscriberKey", Value: "sub_jane" },
        { Name: "Email", Value: "jane@example.com" }
    ]
}, { SaveOptions: [{ PropertyName: "*", SaveAction: "UpdateAdd" }] });
```

{% include test-script.html bundle="wsproxy--createitem" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/createbatch/">proxy.createBatch</a></li>
  <li><a href="/wsproxy/updateitem/">proxy.updateItem</a></li>
  <li><a href="/wsproxy/deleteitem/">proxy.deleteItem</a></li>
</ul>
</div>
