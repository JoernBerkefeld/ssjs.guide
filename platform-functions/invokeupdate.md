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
syntax: "Platform.Function.InvokeUpdate(object, statusMsg, errorCode, errorMsg)"
return_type: object
min_args: 4
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `object` | object | Yes | SOAP object built with CreateObject/SetObjectProperty |
| `statusMsg` | string | Yes | Receives status |
| `errorCode` | string | Yes | Receives error code |
| `errorMsg` | string | Yes | Receives error message |

## Examples

```javascript
var sub = Platform.Function.CreateObject("Subscriber");
Platform.Function.SetObjectProperty(sub, "EmailAddress", "updated@example.com");
Platform.Function.SetObjectProperty(sub, "SubscriberKey", "sub_123");

var status = "";
var code = "";
var msg = "";
Platform.Function.InvokeUpdate(sub, status, code, msg);
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
