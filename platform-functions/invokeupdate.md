---
layout: function
title: InvokeUpdate
parent: Platform Functions
parent_url: /platform-functions/
description: Executes a SOAP Update operation on a configured SOAP API object.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokeUpdate(apiObject, status, options)"
return_type: object
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP object built with `CreateObject`/`SetObjectProperty` |
| `status` | array | Yes | Array that receives the status and request ID of the API call (e.g. `[0, 0]`) |
| `options` | object | Yes | API configure options to include in the call. Can contain a `null` value. |

## Examples

```javascript
var sub = Platform.Function.CreateObject("Subscriber");
Platform.Function.SetObjectProperty(sub, "EmailAddress", "updated@example.com");
Platform.Function.SetObjectProperty(sub, "SubscriberKey", "sub_123");

var StatusAndRequestID = [0, 0];
var result = Platform.Function.InvokeUpdate(sub, StatusAndRequestID, null);
var status = StatusAndRequestID[0];
var requestID = StatusAndRequestID[1];
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
  <li><a href="/platform-functions/invokedelete/">InvokeDelete</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
