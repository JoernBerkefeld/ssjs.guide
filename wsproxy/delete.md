---
layout: page
title: proxy.deleteItem
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/deleteitem/
redirect_from:
  - /wsproxy/delete-item/
description: Delete an SFMC object via the SOAP API.
---

## Syntax

```javascript
var result = proxy.deleteItem(objectType, properties);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Object properties identifying the record to delete |

## Return Value

```javascript
{
    Status: "OK",
    RequestID: "...",
    Results: [{ StatusCode: "OK", StatusMessage: "..." }]
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
