---
layout: function
title: <WSProxyInstance>.updateItem
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/updateitem/
redirect_from:
  - /wsproxy/update-item/
verification: verified
description: Update a single existing SFMC object via the SOAP API. Accepts an optional UpdateOptions argument (e.g. SaveOptions for upsert behavior).
syntax: "<WSProxyInstance>.updateItem(objectType, properties[, updateOptions])"
return_type: object
min_args: 2
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Single object to update (must include identifier) |
| `updateOptions` | object | No | SOAP `UpdateOptions` object (e.g. `{ SaveOptions: [...] }`) |

## Return Value

```javascript
{
    Status: "OK",
    RequestID: "...",
    Results: [
        {
            StatusCode: "OK",
            StatusMessage: "Updated DataExtensionObject",
            OrdinalID: 0,
            ErrorCode: 0,
            Object: { /* the updated object */ }
        }
    ]
}
```

`updateItem` updates a single object, so `Results` always contains exactly one entry. There is no top-level `StatusMessage` — the per-item status text lives on the `Results` entry.

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
    "DataExtensionObject",
    {
        CustomerKey: "MyDE_Key",
        Keys: [
            { Name: "SubscriberKey", Value: "sub_jane" }
        ],
        Properties: [
            { Name: "Score", Value: "95" },
            { Name: "UpdatedAt", Value: Platform.Function.Now() }
        ]
    }
);
```

### Upsert with SaveOptions

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.updateItem(
    "DataExtensionObject",
    {
        CustomerKey: "MyDE_Key",
        Keys: [{ Name: "SubscriberKey", Value: "sub_jane" }],
        Properties: [{ Name: "Score", Value: "95" }]
    },
    { SaveOptions: [{ PropertyName: "*", SaveAction: "UpdateAdd" }] }
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
