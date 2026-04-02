---
layout: function
title: InvokeExecute
parent: Platform Functions
parent_url: /platform-functions/
description: Executes a SOAP Execute call on a fully configured SOAP API object. Use with CreateObject and SetObjectProperty to perform execute-type actions such as sending triggered emails or running queries.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokeExecute(apiObject, method[, statusMessage, errorCode])"
return_type: string
min_args: 2
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP object built with `CreateObject` and configured with `SetObjectProperty` |
| `method` | string | Yes | Execute method name to invoke |
| `statusMessage` | string | No | Variable (passed by reference) that receives the status message |
| `errorCode` | string | No | Variable (passed by reference) that receives the error code |

## Examples

```javascript
var execObj = Platform.Function.CreateObject("ExecuteRequest");
Platform.Function.SetObjectProperty(execObj, "Name", "LogUnsubEvent");

var status = "";
var code = "";
var result = Platform.Function.InvokeExecute(execObj, "LogUnsubEvent", status, code);
if (code !== "0") {
    Write("Error " + code + ": " + status);
}
```

{% include callout.html type="note" content="WSProxy is recommended over InvokeExecute for most use cases — it is simpler, uses native JS objects, and handles serialization automatically." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokeperform/">InvokePerform</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
  <li><a href="/wsproxy/execute/">proxy.execute</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
