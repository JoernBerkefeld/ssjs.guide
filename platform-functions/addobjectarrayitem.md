---
layout: function
title: AddObjectArrayItem
parent: Platform Functions
parent_url: /platform-functions/
description: Appends an item to an array property on a SOAP API object. Used together with CreateObject and SetObjectProperty to build complex SOAP request payloads.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.AddObjectArrayItem(apiObject, propertyName, value)"
return_type: void
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP API object instance created with `CreateObject` |
| `propertyName` | string | Yes | Name of the array property to append to |
| `value` | any | Yes | Item to append to the array property |

## Examples

```javascript
// Build a TriggeredSend request with multiple subscribers
var sendDef = Platform.Function.CreateObject("TriggeredSend");
Platform.Function.SetObjectProperty(sendDef, "TriggeredSendDefinition", tsd);

var sub = Platform.Function.CreateObject("Subscriber");
Platform.Function.SetObjectProperty(sub, "EmailAddress", "jane@example.com");
Platform.Function.SetObjectProperty(sub, "SubscriberKey", "sub_jane");

Platform.Function.AddObjectArrayItem(sendDef, "Subscribers", sub);

var status = "";
var code = "";
var msg = "";
Platform.Function.InvokeCreate(sendDef, status, code, msg);
```

{% include callout.html type="note" content="For most SOAP-based operations, WSProxy is significantly simpler. Prefer WSProxy over the CreateObject/AddObjectArrayItem/Invoke pattern for new code." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
