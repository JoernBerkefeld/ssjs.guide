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
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SFMC SOAP API type name (e.g., `"DataExtensionObject"`, `"Subscriber"`) |

The type name must match a real SOAP API type.

The returned value is a .NET **CLR host object** (`typeof` is `"clr"`), not a plain
JavaScript object. Its properties cannot be read back from SSJS — see
[SetObjectProperty](/platform-functions/setobjectproperty/). Every call returns a new,
independent instance.

{% include differs-from-docs.html note="The docs type the return value as a plain object, but the instance is a .NET CLR host object — `typeof` reports `\"clr\"` for `DataExtensionObject`, `Subscriber` and `APIProperty` alike. Properties assigned with `SetObjectProperty()` or `AddObjectArrayItem()` therefore cannot be read back from SSJS. Unreadable is not unset: the only way to prove a value landed is to submit the object through an `Invoke*` call and read the result back from the API." %}

{% include test-script.html bundle="platform-functions--createobject" chapter="parameters" %}

## Examples

```javascript
// Create a DataExtensionObject and add a row to a data extension
var deObject = Platform.Function.CreateObject("DataExtensionObject");
Platform.Function.SetObjectProperty(deObject, "CustomerKey", "MyDE_Key");

var fieldProps = Platform.Function.CreateObject("APIProperty");
Platform.Function.SetObjectProperty(fieldProps, "Name", "Email");
Platform.Function.SetObjectProperty(fieldProps, "Value", "test@example.com");
Platform.Function.AddObjectArrayItem(deObject, "Properties", fieldProps);

var StatusAndRequestID = [0, 0];
var result = Platform.Function.InvokeCreate(deObject, StatusAndRequestID, null);
// result === "OK", StatusAndRequestID[0] === "Created DataExtensionObject"
```

{% include callout.html type="note" content="For most SOAP-based operations, WSProxy is significantly simpler to use. Prefer WSProxy over CreateObject/Invoke patterns for new code." %}

{% include test-script.html bundle="platform-functions--createobject" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
