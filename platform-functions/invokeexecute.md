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
test_scripts: complete
differs_from_docs: true
---

{% include differs-from-docs.html note="The official docs list an optional third `options` argument and type the return value as an object, but at runtime the call takes exactly two arguments and returns an array of result objects — each element carries its own `StatusCode` / `StatusMessage` / `ErrorCode`. `status` is a genuine out parameter, but the engine only writes into slots the array **already has**: pass `[0, 0]` and `status[0]` receives the OverallStatus string (`\"OK\"` / `\"Error\"`) while `status[1]` receives a RequestID **GUID string** (not a number). An empty array (`[]`) is never grown — it stays at length `0` with both slots `undefined`, which is why the status out parameter looks inert unless it is pre-sized." %}

{% include test-script.html bundle="platform-functions--invokeexecute" chapter="differs-from-docs" label="Show test script — array return value, 2-argument arity and the pre-sized status array" %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP object built with `CreateObject` and configured with `SetObjectProperty` |
| `status` | array | Yes | Out parameter. Pass a **pre-sized** array (e.g. `[0, 0]`): `status[0]` receives the OverallStatus string and `status[1]` a RequestID GUID string. An empty array `[]` is left untouched at length `0`. Read the returned array for the per-item results (`StatusCode` / `StatusMessage` / `ErrorCode`). |

Unlike the documented signature, the third `options` argument is not accepted. A `null`
`apiObject` makes no SOAP call, returns `null`, and leaves `status` untouched.

{% include test-script.html bundle="platform-functions--invokeexecute" chapter="parameters" %}

## Examples

```javascript
var execObj = Platform.Function.CreateObject("ExecuteRequest");
Platform.Function.SetObjectProperty(execObj, "Name", "LogUnsubEvent");

var param = Platform.Function.CreateObject("APIProperty");
Platform.Function.SetObjectProperty(param, "Name", "SubscriberKey");
Platform.Function.SetObjectProperty(param, "Value", "some-subscriber-key");
Platform.Function.AddObjectArrayItem(execObj, "Parameters", param);

var StatusAndRequestID = [0, 0];
var result = Platform.Function.InvokeExecute(execObj, StatusAndRequestID);
var firstResult = result[0];
// firstResult.StatusCode === "OK", firstResult.StatusMessage === "Event posted", firstResult.ErrorCode === 0
// StatusAndRequestID[0] === "OK", StatusAndRequestID[1] === a RequestID GUID string
if (firstResult.StatusCode !== "OK") {
    Write("Error — " + firstResult.StatusMessage + " — code " + firstResult.ErrorCode);
}
```

An `ExecuteRequest` without `Parameters` is rejected by the API itself with
`"No Parameters were provided"` and `ErrorCode` `402`, and an unknown verb name answers
`"Unable to find a handler for the <name> method."` — so the per-item `StatusCode` on the
returned array, not the `status` out parameter, is what a caller should branch on.

{% include callout.html type="note" content="WSProxy is recommended over InvokeExecute for most use cases — it is simpler, uses native JS objects, and handles serialization automatically." %}

{% include test-script.html bundle="platform-functions--invokeexecute" chapter="examples" %}

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
