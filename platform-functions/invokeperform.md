---
layout: function
title: InvokePerform
parent: Platform Functions
parent_url: /platform-functions/
description: Executes a SOAP Perform action on a fully configured SOAP API object. Use with CreateObject and SetObjectProperty to start, pause, or stop objects such as query definitions and automations.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokePerform(apiObject, method, status[, options])"
return_type: string
min_args: 3
max_args: 4
verification: verified
differs_from_docs: true
test_scripts: complete
---

{% include differs-from-docs.html note="The official docs type the return value as an object, but at runtime the call returns the OverallStatus message as a string (`\"OK\"` / `\"Error\"`); `status[0]` receives the status message, `status[1]` a numeric error code, and `status[2]` the serialized perform-response object. The `options` argument is optional (the call accepts 3 or 4 arguments)." %}

{% include test-script.html bundle="platform-functions--invokeperform" chapter="differs-from-docs" label="Show test script — string return value, the three status slots, optional options and the pre-sized-vs-empty status control" %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP object built with `CreateObject` and configured with `SetObjectProperty` |
| `method` | string | Yes | Method to perform on the object |
| `status` | array | Yes | Array that receives the status message (`status[0]`), numeric error code (`status[1]`), and serialized perform-response object (`status[2]`) of the API call (e.g. `[0, 0, 0]`) |
| `options` | object | No | API configure options to include in the call. Can be omitted or `null`. |

The `status` array is a true out parameter, but it is never grown: only the slots it already has are written. Pass `[0, 0, 0]` — an empty `[]` stays empty, and a `[0, 0]` never receives the perform response. A `null` `apiObject` does not throw; the call returns `null` and leaves the `status` array untouched, because no SOAP call is made. `method` is case-insensitive.

Not every SOAP type accepts the Perform verb. A `TriggeredSendDefinition` is rejected with `Cannot perform Perform on objects of type TriggeredSendDefinition` and error code `5`.

{% include test-script.html bundle="platform-functions--invokeperform" chapter="parameters" %}

## Examples

```javascript
// objectId is the ObjectID GUID of an existing, active QueryDefinition
var queryDef = Platform.Function.CreateObject("QueryDefinition");
Platform.Function.SetObjectProperty(queryDef, "ObjectID", objectId);

var StatusAndRequestID = [0, 0, 0];
var result = Platform.Function.InvokePerform(queryDef, "start", StatusAndRequestID, null);
var statusMessage = StatusAndRequestID[0];
var errorCode = StatusAndRequestID[1];
var performResponse = StatusAndRequestID[2];

if (result !== "OK") {
    // handle the failure - statusMessage and errorCode explain it
}
```

Guard on the **return value**, not on `status[0]`: the return value is what equals `"OK"`, while `status[0]` holds the status *message* (`"QueryDefinition perform called successfully"` on success). A `status[0] !== "OK"` guard would therefore fire on every successful call.

Address the object by `ObjectID`. Addressing the same query definition by `CustomerKey` answers `"Error"` with error code `2`.

{% include callout.html type="note" content="WSProxy is recommended over InvokePerform for most use cases — it is simpler, uses native JS objects, and handles serialization automatically." %}

{% include test-script.html bundle="platform-functions--invokeperform" chapter="examples" %}

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
