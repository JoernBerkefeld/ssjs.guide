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
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Object properties identifying the record to delete |
| `deleteOptions` | object | No | Optional SOAP DeleteOptions object (e.g. `RequestType`, `QueuePriority`) |

## Return Value

The top-level object exposes `Status`, `RequestID`, and a `Results` array of per-item results. Each entry in `Results` carries `StatusCode`, `StatusMessage`, and `ErrorCode`. The top-level object has no `StatusMessage`.

```javascript
{
    Status: "OK",
    RequestID: "...",
    Results: [{ StatusCode: "OK", StatusMessage: "...", ErrorCode: "0" }]
}
```

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

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.deleteItem("DataExtensionObject[MyDE_Key]", {
    Keys: {
        Key: [
            { Name: "SubscriberKey", Value: "sub_jane" }
        ]
    }
});
```

{% include callout.html type="warning" content="Deletions are permanent and cannot be undone. Test delete logic in a sandbox before running in production." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/createitem/">proxy.createItem</a></li>
  <li><a href="/wsproxy/updateitem/">proxy.updateItem</a></li>
</ul>
</div>
