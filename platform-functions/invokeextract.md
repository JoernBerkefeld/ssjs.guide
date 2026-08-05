---
layout: function
title: InvokeExtract
parent: Platform Functions
parent_url: /platform-functions/
description: Invokes the SOAP API Extract method on a configured API object. Used for data extract operations such as generating export files.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokeExtract(apiObject, statusArray)"
return_type: string
min_args: 2
max_args: 2
verification: verified
test_scripts: complete
differs_from_docs: true
---

{% include differs-from-docs.html note="The official docs list an optional third `options` argument and type the return value as an object; at runtime the call takes exactly two arguments (a third throws). The `statusArray` is inert — it is never populated, so do not read a RequestID from it. The documented OverallStatus *string* return could not be reproduced from a CloudPage: every two-argument call throws a catchable exception carrying only the generic wrapper message *&quot;An error occurred when attempting to evaluate an InvokeExtract function call.  See inner exception for details.&quot;* — including calls that name the BU's real, saved Data Extract definitions. The inner exception is not surfaced to SSJS, so the runtime shows *what* fails but not *why*. The `string` return type is therefore per-docs and unproven at runtime here." %}

{% include test-script.html bundle="platform-functions--invokeextract" chapter="differs-from-docs" label="Show test script — 2-argument arity, the untouched statusArray and the unreproducible string return" %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | `ExtractRequest` built with `CreateObject`. Only `Parameters` (an `ExtractParameter[]` of `{Name, Value}`) and `Options` (an `ExtractOptions`) are writable; `Name`/`CustomerKey`/`RequestID`/`Fields`/`ExtractType` throw *"Invalid property name"* on `SetObjectProperty` |
| `statusArray` | array | Yes | Status out-parameter required by the signature, but inert at runtime — it is never populated (stays unchanged). Pass an array (e.g. `[0, 0]`) |

A **pre-sized** `[0, 0]` array is left unchanged too, so this is not the
[`InvokeExecute`](/platform-functions/invokeexecute/) slot-growing behaviour: the call throws
before any SOAP response exists to write back.

{% include test-script.html bundle="platform-functions--invokeextract" chapter="parameters" %}

## Examples

```javascript
var req = Platform.Function.CreateObject("ExtractRequest");
var param = Platform.Function.CreateObject("ExtractParameter");
Platform.Function.SetObjectProperty(param, "Name", "CustomerKey");
Platform.Function.SetObjectProperty(param, "Value", "MyExtractDef");
Platform.Function.AddObjectArrayItem(req, "Parameters", param);

// Inert out-parameter; do not read a RequestID from it.
var statusArr = [0, 0];
var result = Platform.Function.InvokeExtract(req, statusArr);
Write("Result: " + result);
```

{% include callout.html type="note" content="WSProxy is the recommended approach for most SOAP API interactions. Use InvokeExtract only when the Extract SOAP verb is specifically required for your operation." %}

{% include test-script.html bundle="platform-functions--invokeextract" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokeconfigure/">InvokeConfigure</a></li>
  <li><a href="/platform-functions/invokeschedule/">InvokeSchedule</a></li>
  <li><a href="/platform-functions/invokeperform/">InvokePerform</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
