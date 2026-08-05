---
layout: function
title: <WSProxyInstance>.deleteItem
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/deleteitem/
redirect_from:
  - /wsproxy/delete-item/
description: Delete an SFMC object via the SOAP API.
syntax: "<WSProxyInstance>.deleteItem(objectType, properties[, deleteOptions])"
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
| `properties` | object | Yes | Object properties identifying the record to delete |
| `deleteOptions` | object | No | Optional SOAP DeleteOptions object (e.g. `RequestType`, `QueuePriority`) |

{% include test-script.html bundle="wsproxy--deleteitem" chapter="parameters" %}

## Return Value

The top-level object exposes `Status`, `RequestID`, and a `Results` array of per-item results. Each entry in `Results` carries `StatusCode`, `StatusMessage`, and `ErrorCode`. The top-level object has no `StatusMessage`.

```javascript
{
    Status: "OK",
    RequestID: "...",
    Results: [{ StatusCode: "OK", StatusMessage: "...", ErrorCode: "0" }]
}
```

{% include test-script.html bundle="wsproxy--deleteitem" chapter="return-value" %}

## Examples

### Delete a Data Extension

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.deleteItem("DataExtension", {
    CustomerKey: "TempDE_Key"
});
if (result.Status === "OK") {
    Write("Deleted successfully.");
}
```

### Delete a subscriber from All Subscribers

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.deleteItem("Subscriber", {
    SubscriberKey: "sub_jane"
});
```

### Delete a DE row

Identify the Data Extension with a `CustomerKey` property and the row with a flat `Keys` array of `{ Name, Value }` pairs.

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.deleteItem("DataExtensionObject", {
    CustomerKey: "MyDE_Key",
    Keys: [
        { Name: "SubscriberKey", Value: "sub_jane" }
    ]
});
```

{% include callout.html type="warning" content="The nested <code>Keys: { Key: [...] }</code> form and the bracketed <code>DataExtensionObject[MyDE_Key]</code> objectType both throw <code>Error executing delete call.</code> — use the flat <code>Keys</code> array together with a <code>CustomerKey</code> property instead." %}

{% include callout.html type="warning" content="Deletions are permanent and cannot be undone. Test delete logic in a sandbox before running in production." %}

{% include test-script.html bundle="wsproxy--deleteitem" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/createitem/">proxy.createItem</a></li>
  <li><a href="/wsproxy/updateitem/">proxy.updateItem</a></li>
</ul>
</div>
