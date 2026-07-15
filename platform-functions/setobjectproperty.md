---
layout: function
title: SetObjectProperty
parent: Platform Functions
parent_url: /platform-functions/
description: Sets a property on a SOAP API object created with CreateObject.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.SetObjectProperty(object, propertyName, value)"
return_type: "null"
min_args: 3
max_args: 3
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `object` | object | Yes | SOAP object created via `CreateObject` |
| `propertyName` | string | Yes | Property name as defined in the SFMC SOAP API |
| `value` | any | Yes | Value to set |

{% include differs-from-docs.html note="The official docs type the return as void, but at runtime the function returns a genuine JavaScript null on success. It validates the property name against the object's SOAP schema, throwing when the property is unknown or the value is invalid for it." %}

## Return Value

Returns a genuine JavaScript `null` on success (`result === null` is `true`).

The assigned property **cannot be read back from SSJS**. The object returned by
`CreateObject` is a .NET **CLR host object** (`typeof` is `"clr"`), and the engine blocks
all introspection of it. This was proven at runtime against every available read
workaround:

| Read attempt | Result |
|---|---|
| `object.propertyName` (dot access) | throws `Use of Common Language Runtime (CLR) is not allowed` |
| `object["propertyName"]` (bracket access) | throws `Use of Common Language Runtime (CLR) is not allowed` |
| `for (var k in object)` enumeration | yields **0 keys** |
| `Platform.Function.Stringify(object)` | returns only the type name string `"ExactTarget.Integration.WSDL.Subscriber"`, not the values |
| `String(object)` | coerces to the same type-name string, not the values |
| `Platform.Function.GetObjectProperty` | does not exist in the engine |

There is therefore no supported way to confirm the assigned value from SSJS — you must
pass the populated object straight into the SOAP call (e.g. `InvokeCreate`) that consumes
it.

## Examples

```javascript
var sub = Platform.Function.CreateObject("Subscriber");
Platform.Function.SetObjectProperty(sub, "EmailAddress", "new@example.com");
Platform.Function.SetObjectProperty(sub, "SubscriberKey", "sub_456");
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
</ul>
</div>
