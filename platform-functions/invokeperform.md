---
layout: function
title: InvokePerform
parent: Platform Functions
parent_url: /platform-functions/
description: Executes a SOAP Perform action on a fully configured SOAP API object. Use with CreateObject and SetObjectProperty to start, pause, or stop objects such as automations and triggered send definitions.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokePerform(apiObject, action[, statusMessage, errorCode])"
return_type: string
min_args: 2
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP object built with `CreateObject` and configured with `SetObjectProperty` |
| `action` | string | Yes | Action to perform (e.g. `"start"`, `"pause"`, `"stop"`) |
| `statusMessage` | string | No | Variable (passed by reference) that receives the status message |
| `errorCode` | string | No | Variable (passed by reference) that receives the error code |

## Examples

```javascript
var sendDef = Platform.Function.CreateObject("TriggeredSendDefinition");
Platform.Function.SetObjectProperty(sendDef, "CustomerKey", "WelcomeEmail_TSD");

var status = "";
var code = "";
var result = Platform.Function.InvokePerform(sendDef, "start", status, code);
if (code !== "0") {
    Write("Error " + code + ": " + status);
} else {
    Write("Triggered send definition started.");
}
```

{% include callout.html type="note" content="WSProxy is recommended over InvokePerform for most use cases — it is simpler, uses native JS objects, and handles serialization automatically." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokeexecute/">InvokeExecute</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
  <li><a href="/wsproxy/perform/">proxy.perform</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
