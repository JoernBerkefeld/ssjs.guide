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
differs_from_docs: true
---

{% include differs-from-docs.html note="The official docs list an optional third `options` argument and type the return value as an object, but at runtime the call takes exactly two arguments and returns the OverallStatus message as a string — passing a third argument throws an \"Unable to retrieve security descriptor for this frame\" error." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP API object built with `CreateObject` and configured with `SetObjectProperty` |
| `statusArray` | array | Yes | Array that receives the status and RequestID of the API call |

## Examples

```javascript
var extractDef = Platform.Function.CreateObject("DataExtractDefinition");
Platform.Function.SetObjectProperty(extractDef, "CustomerKey", "MyExtractDef");

var statusArr = [];
var result = Platform.Function.InvokeExtract(extractDef, statusArr);
Write("Result: " + result);
Write("Request ID: " + statusArr[1]);
```

{% include callout.html type="note" content="WSProxy is the recommended approach for most SOAP API interactions. Use InvokeExtract only when the Extract SOAP verb is specifically required for your operation." %}

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
