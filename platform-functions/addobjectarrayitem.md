---
layout: function
title: AddObjectArrayItem
parent: Platform Functions
parent_url: /platform-functions/
description: Appends an item to an array property on a SOAP API object. Used together with CreateObject and SetObjectProperty to build complex SOAP request payloads.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.AddObjectArrayItem(apiObject, propertyName, value)"
return_type: "null"
min_args: 3
max_args: 3
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP API object instance created with `CreateObject` |
| `propertyName` | string | Yes | Name of the array property to append to |
| `value` | any | Yes | Item to append to the array property |

`apiObject` must be an API object created with
[`CreateObject`](/platform-functions/createobject/) (`typeof` is `"clr"`).
`propertyName` must name a real **array** property on that object's SOAP schema;
use [`SetObjectProperty`](/platform-functions/setobjectproperty/) for scalar properties.

{% include test-script.html bundle="platform-functions--addobjectarrayitem" chapter="parameters" %}

## Return Value

Returns a genuine JavaScript `null` on success (`result === null` is `true`,
`result === undefined` is `false`). The item is appended to the passed object **in
place** — use the mutated `apiObject`, not the return value.

The appended array cannot be read back from SSJS: the object returned by
`CreateObject` is a .NET CLR host object and the engine blocks introspection of it
(see [`SetObjectProperty`](/platform-functions/setobjectproperty/)). Pass the
populated object straight into the SOAP call that consumes it.

{% include differs-from-docs.html note="The official docs type the return as an `object[]` response object, but at runtime the call returns a genuine JavaScript `null` — it mutates the passed object in place instead." %}

{% include test-script.html bundle="platform-functions--addobjectarrayitem" chapter="return-value" label="Show test script — return value is null, not object[]" %}

## Examples

```javascript
// Build a TriggeredSend request with multiple subscribers
var sendDef = Platform.Function.CreateObject("TriggeredSend");
Platform.Function.SetObjectProperty(sendDef, "TriggeredSendDefinition", tsd);

var sub = Platform.Function.CreateObject("Subscriber");
Platform.Function.SetObjectProperty(sub, "EmailAddress", "jane@example.com");
Platform.Function.SetObjectProperty(sub, "SubscriberKey", "sub_jane");

Platform.Function.AddObjectArrayItem(sendDef, "Subscribers", sub);

var status = "";
var code = "";
var msg = "";
Platform.Function.InvokeCreate(sendDef, status, code, msg);
```

{% include callout.html type="note" content="For most SOAP-based operations, WSProxy is significantly simpler. Prefer WSProxy over the CreateObject/AddObjectArrayItem/Invoke pattern for new code." %}

{% include test-script.html bundle="platform-functions--addobjectarrayitem" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
