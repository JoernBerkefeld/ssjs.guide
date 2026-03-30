---
layout: page
title: proxy.execute
parent: WSProxy
parent_url: /wsproxy/
description: Execute an SFMC SOAP operation — used for actions like sending a triggered send or running a query.
---

## Syntax

```javascript
var result = proxy.execute(objectType, properties);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Execution parameters |

## Examples

### Execute a triggered send

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.execute("TriggeredSend", {
    TriggeredSendDefinition: {
        CustomerKey: "WelcomeEmail_TSD"
    },
    Subscribers: [{
        EmailAddress: "jane@example.com",
        SubscriberKey: "sub_jane",
        Attributes: [
            { Name: "FirstName", Value: "Jane" }
        ]
    }]
});
```

## Notes

For most triggered send use cases, the `TriggeredSend` Core library object (`ts.Send()`) is simpler and more readable.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/perform/">proxy.perform</a></li>
  <li><a href="/core-library/triggeredsend/">TriggeredSend (Core)</a></li>
</ul>
</div>
