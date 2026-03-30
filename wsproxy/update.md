---
layout: page
title: proxy.update
parent: WSProxy
parent_url: /wsproxy/
description: Update an existing SFMC object via the SOAP API. Can be used with SaveOption for upsert behavior.
---

## Syntax

```javascript
var result = proxy.update(objectType, properties [, saveOptions]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Properties to update (must include identifier) |
| `saveOptions` | object | No | SOAP save options (e.g., for upsert) |

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
var result = proxy.update("Subscriber", {
    SubscriberKey: "sub_jane",
    Status: "Unsubscribed"
});
```

### Upsert DE row (update or create)

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.update(
    "DataExtensionObject[MyDE_Key]",
    {
        Properties: {
            Property: [
                { Name: "SubscriberKey", Value: "sub_jane" },
                { Name: "Score", Value: "95" },
                { Name: "UpdatedAt", Value: Platform.Function.Now() }
            ]
        }
    },
    [{ SaveAction: "UpdateAdd" }]  // SaveAction: UpdateOnly, AddOnly, UpdateAdd (upsert)
);
```

## Notes

### SaveAction Options

| SaveAction | Behavior |
|------------|----------|
| `UpdateOnly` | Update existing; fail if not found |
| `AddOnly` | Insert new; fail if already exists |
| `UpdateAdd` | Upsert — update if found, insert if not |

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/updatebatch/">proxy.updateBatch</a></li>
  <li><a href="/wsproxy/create/">proxy.create</a></li>
</ul>
</div>
