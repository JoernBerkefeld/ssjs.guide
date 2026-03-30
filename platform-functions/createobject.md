---
layout: function
title: CreateObject
parent: Platform Functions
parent_url: /platform-functions/
description: Creates an SFMC SOAP API object by its API type name. Used in conjunction with SetObjectProperty and InvokeCreate/Retrieve/Update/Delete for low-level SOAP operations.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.CreateObject(objectType)"
return_type: object
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SFMC SOAP API type name (e.g., `"DataExtensionObject"`, `"Subscriber"`) |

## Examples

```javascript
// Create a DataExtensionObject for upsert
var deObject = Platform.Function.CreateObject("DataExtensionObject");
Platform.Function.SetObjectProperty(deObject, "CustomerKey", "MyDE_Key");

var fieldProps = Platform.Function.CreateObject("APIProperty");
Platform.Function.SetObjectProperty(fieldProps, "Name", "Email");
Platform.Function.SetObjectProperty(fieldProps, "Value", "test@example.com");

var status = "";
var code = "";
var message = "";
var result = Platform.Function.InvokeCreate(deObject, status, code, message);
```

{% include callout.html type="note" content="For most SOAP-based operations, WSProxy is significantly simpler to use. Prefer WSProxy over CreateObject/Invoke patterns for new code." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
