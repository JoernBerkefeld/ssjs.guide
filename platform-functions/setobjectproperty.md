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
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `object` | object | Yes | SOAP object created via `CreateObject` |
| `propertyName` | string | Yes | Property name as defined in the SFMC SOAP API |
| `value` | any | Yes | Value to set |

`object` must be an API object created with
[`CreateObject`](/platform-functions/createobject/) (`typeof` is `"clr"`); a plain
JavaScript object, a string, a number, `null` and `undefined` all throw.

`propertyName` must match a property on that object's SOAP schema **exactly** — the
match is **case sensitive**, so `"emailaddress"` and `"EMAILADDRESS"` both throw where
`"EmailAddress"` succeeds. An unknown name, an empty string, `null`, `undefined` and a
non-string name all throw as well. Array properties cannot be assigned this way — use
[`AddObjectArrayItem`](/platform-functions/addobjectarrayitem/) instead.

`value` is permissive on scalar properties: strings, numbers, numeric strings, booleans,
boolean-like strings, `null`, `undefined`, arrays and `Date` objects are all accepted,
and a number is coerced onto a string-typed property rather than rejected. Object-typed
properties stay schema-constrained — a CLR object of the wrong type throws, while a
matching one (e.g. a `SimpleFilterPart` on `RetrieveRequest.Filter`) is accepted.
Setting the same property twice simply overwrites it.

The `Platform.Function.` prefix is required — the bare name `SetObjectProperty(...)`
throws `Object expected: SetObjectProperty` even after `Platform.Load("core", "1.1.5")`.

{% include test-script.html bundle="platform-functions--setobjectproperty" chapter="parameters" %}

{% include differs-from-docs.html note="The official docs type the return as void, but at runtime the function returns a genuine JavaScript null on success. It validates the property name against the object's SOAP schema, throwing when the property is unknown or the value is invalid for it." %}

## Return Value

Returns a genuine JavaScript `null` on success (`result === null` is `true`,
`result === undefined` is `false`) — including when an already-set property is
overwritten.

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

There is therefore no supported way to confirm the assigned value from SSJS — you must
pass the populated object straight into the SOAP call (e.g. `InvokeCreate`) that consumes
it. Being unreadable is **not** the same as being unset: the round-trip proof in the
Examples test script below shows the assigned values really do reach the SOAP call.

{% include test-script.html bundle="platform-functions--setobjectproperty" chapter="return-value" label="Show test script — return value is null, not void" %}

## Examples

```javascript
var sub = Platform.Function.CreateObject("Subscriber");
Platform.Function.SetObjectProperty(sub, "EmailAddress", "new@example.com");
Platform.Function.SetObjectProperty(sub, "SubscriberKey", "sub_456");
```

{% include test-script.html bundle="platform-functions--setobjectproperty" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/invokecreate/">InvokeCreate</a></li>
</ul>
</div>
