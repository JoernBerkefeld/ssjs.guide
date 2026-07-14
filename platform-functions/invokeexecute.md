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
syntax: "Platform.Function.InvokeExecute(apiObject, status)"
return_type: object[]
min_args: 2
max_args: 2
verification: verified
differs_from_docs: true
---

{% include differs-from-docs.html note="The official docs list an optional third `options` argument and type the return value as an object, but at runtime the call takes exactly two arguments and returns an array of result objects — passing a third argument throws an \"Unable to retrieve security descriptor for this frame\" error." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP object built with `CreateObject` and configured with `SetObjectProperty` |
| `status` | array | Yes | Array that receives the status and request ID of the API call (e.g. `[0, 0]`) |

## Examples

```javascript
var execObj = Platform.Function.CreateObject("ExecuteRequest");
Platform.Function.SetObjectProperty(execObj, "Name", "LogUnsubEvent");

var StatusAndRequestID = [0, 0];
var result = Platform.Function.InvokeExecute(execObj, StatusAndRequestID);
var status = StatusAndRequestID[0];
var requestID = StatusAndRequestID[1];
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
