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
syntax: "Platform.Function.InvokePerform(apiObject, method, status, options)"
return_type: string
min_args: 4
max_args: 4
verification: verified
differs_from_docs: true
---

{% include differs-from-docs.html note="The official docs type the return value as an object, but at runtime the call returns the OverallStatus message as a string (`\"OK\"` / `\"Error: ...\"`); the request details are written into the status array." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP object built with `CreateObject` and configured with `SetObjectProperty` |
| `method` | string | Yes | Method to perform on the object |
| `status` | array | Yes | Array that receives the status, error code, and perform response of the API call (e.g. `[0, 0, 0]`) |
| `options` | object | Yes | API configure options to include in the call. Can contain a `null` value. |

## Examples

```javascript
var sendDef = Platform.Function.CreateObject("TriggeredSendDefinition");
Platform.Function.SetObjectProperty(sendDef, "CustomerKey", "WelcomeEmail_TSD");

var StatusAndRequestID = [0, 0, 0];
var result = Platform.Function.InvokePerform(sendDef, "start", StatusAndRequestID, null);
var statusMessage = StatusAndRequestID[0];
var errorCode = StatusAndRequestID[1];
var performResponse = StatusAndRequestID[2];
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
  <li><a href="/wsproxy/performitem/"><WSProxyInstance>.performItem</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
