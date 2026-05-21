---
layout: page
title: proxy.updateItem
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/updateitem/
redirect_from:
  - /wsproxy/update-item/
description: Update an existing SFMC object via the SOAP API. Can be used with SaveOption for upsert behavior.
---

## Syntax

```javascript
var result = proxy.updateItem(objectType, properties);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Properties to update (must include identifier) |

## Return Value

```javascript
{
    Status: "OK",
    RequestID: "...",
    Results: [{ StatusCode: "OK", StatusMessage: "...", Object: {...} }]
}
```

## Examples

### Update subscriber status

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.updateItem("Subscriber", {
    SubscriberKey: "sub_jane",
    Status: "Unsubscribed"
});
```

### Update DE row

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.updateItem(
    "DataExtensionObject[MyDE_Key]",
    {
        Properties: {
            Property: [
                { Name: "SubscriberKey", Value: "sub_jane" },
                { Name: "Score", Value: "95" },
                { Name: "UpdatedAt", Value: Platform.Function.Now() }
            ]
        }
    }
);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/updatebatch/">proxy.updateBatch</a></li>
  <li><a href="/wsproxy/createitem/">proxy.createItem</a></li>
</ul>
</div>
