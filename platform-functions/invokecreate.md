---
layout: function
title: InvokeCreate
parent: Platform Functions
parent_url: /platform-functions/
description: Executes a SOAP Create operation on a fully configured SOAP API object. Use with CreateObject and SetObjectProperty.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokeCreate(apiObject, status, options)"
return_type: string
min_args: 3
max_args: 3
verification: verified
test_scripts: complete
differs_from_docs: true
---

{% include differs-from-docs.html note="The official docs type the return value as an object, but at runtime the call returns the OverallStatus message as a string (`\"OK\"` / `\"Error\"`); `status[0]` receives the status message and `status[1]` a numeric request-id / error code (there are no separate `statusMsgVar` / `errorCodeVar` out-parameters). The valid signature is 3 arguments `(apiObject, status, options)`." %}

{% include test-script.html bundle="platform-functions--invokecreate" chapter="differs-from-docs" label="Show test script — string return value, status array and 3-argument arity" %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP object built with `CreateObject`/`SetObjectProperty` |
| `status` | array | Yes | Array that receives the status and request ID of the API call (e.g. `[0, 0]`) |
| `options` | object | Yes | API configure options to include in the call. Can contain a `null` value. |

`options` may be `null`. `status` is an **out parameter**: the call writes the status
message into `status[0]` and a
numeric error code into `status[1]`. A `null` `apiObject` makes no SOAP call, returns
`null`, and leaves `status` untouched.

{% include test-script.html bundle="platform-functions--invokecreate" chapter="parameters" %}

## Examples

```javascript
var StatusAndRequestID = [0, 0];
var result = Platform.Function.InvokeCreate(deObject, StatusAndRequestID, null);
// result === "OK", StatusAndRequestID[0] === "Data Extension created.", StatusAndRequestID[1] === 0
var status = StatusAndRequestID[0];
var requestID = StatusAndRequestID[1];
if (result !== "OK") {
    Write("Error — " + status + " — RequestID: " + requestID);
}
```

Test the **return value** against `"OK"`, not `status[0]` — `status[0]` carries the status
*message* (`"Data Extension created."`), so a guard on it fires even when the call succeeded.

{% include callout.html type="note" content="WSProxy is recommended over InvokeCreate for most use cases — it is simpler, uses native JS objects, and handles serialization automatically." %}

{% include test-script.html bundle="platform-functions--invokecreate" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/invokeretrieve/">InvokeRetrieve</a></li>
  <li><a href="/platform-functions/invokeupdate/">InvokeUpdate</a></li>
  <li><a href="/platform-functions/invokedelete/">InvokeDelete</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
