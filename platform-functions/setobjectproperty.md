---
layout: function
title: SetObjectProperty
parent: Platform Functions
parent_url: /platform-functions/
description: Sets a property on a SOAP API object created with CreateObject.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.SetObjectProperty(object, propertyName, value)"
return_type: void
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `object` | object | Yes | SOAP object created via `CreateObject` |
| `propertyName` | string | Yes | Property name as defined in the SFMC SOAP API |
| `value` | any | Yes | Value to set |

## Examples

```javascript
var sub = Platform.Function.CreateObject("Subscriber");
Platform.Function.SetObjectProperty(sub, "EmailAddress", "new@example.com");
Platform.Function.SetObjectProperty(sub, "SubscriberKey", "sub_456");
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
</ul>
</div>
