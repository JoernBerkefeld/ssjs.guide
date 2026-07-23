---
layout: function
title: InvokeConfigure
parent: Platform Functions
parent_url: /platform-functions/
description: Invokes the SOAP API Configure method on a fully configured API object. Used for configuration-type operations on SOAP objects.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokeConfigure(apiObject, action, status, options)"
return_type: string
min_args: 4
max_args: 4
verification: verified
differs_from_docs: true
---

{% include differs-from-docs.html note="The official docs type the return value as an object, but at runtime the call returns the OverallStatus message as a string (`\"OK\"` / `\"Error\"`); `status[0]` receives the status message and `status[1]` a numeric error code. The valid signature is 4 arguments `(apiObject, action, status, options)`." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP API object built with `CreateObject` and configured with `SetObjectProperty` |
| `action` | string | Yes | Configure action to perform on the object |
| `status` | array | Yes | Array that receives the status and request ID of the API call (e.g. `[0, 0]`) |
| `options` | object | Yes | Additional API options to include in the call. Can contain a `null` value. |

## Examples

```javascript
var configObj = Platform.Function.CreateObject("DataRetentionPolicyConfiguration");
Platform.Function.SetObjectProperty(configObj, "CustomerKey", "MyDE");
Platform.Function.SetObjectProperty(configObj, "DataRetentionPeriod", "6");
Platform.Function.SetObjectProperty(configObj, "DataRetentionPeriodLength", "Months");

var StatusAndRequestID = [0, 0];
var result = Platform.Function.InvokeConfigure(configObj, "create", StatusAndRequestID, null);
var status = StatusAndRequestID[0];
var requestID = StatusAndRequestID[1];
```

{% include callout.html type="note" content="WSProxy is the recommended approach for most SOAP API interactions. Use InvokeConfigure only when the Configure SOAP verb is specifically required." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokeexecute/">InvokeExecute</a></li>
  <li><a href="/platform-functions/invokeperform/">InvokePerform</a></li>
  <li><a href="/platform-functions/invokeextract/">InvokeExtract</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
