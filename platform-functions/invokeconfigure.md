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
syntax: "Platform.Function.InvokeConfigure(apiObject, action[, statusArray, options])"
return_type: string
min_args: 2
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP API object built with `CreateObject` and configured with `SetObjectProperty` |
| `action` | string | Yes | Configure action to perform on the object |
| `statusArray` | array | No | Array that receives the status and RequestID of the API call |
| `options` | object | No | Additional API options; may be null |

## Examples

```javascript
var configObj = Platform.Function.CreateObject("DataRetentionPolicyConfiguration");
Platform.Function.SetObjectProperty(configObj, "CustomerKey", "MyDE");
Platform.Function.SetObjectProperty(configObj, "DataRetentionPeriod", "6");
Platform.Function.SetObjectProperty(configObj, "DataRetentionPeriodLength", "Months");

var status = [];
var result = Platform.Function.InvokeConfigure(configObj, "set", status, null);
Write("Status: " + result);
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
