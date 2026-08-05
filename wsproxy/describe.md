---
layout: function
title: <WSProxyInstance>.describe
parent: WSProxy
parent_url: /wsproxy/
description: Retrieve structural metadata for one or more SOAP API object types — useful for exploring available fields and relationships on an API object.
syntax: "<WSProxyInstance>.describe(objectType)"
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
| `objectType` | string \| string[] | Yes | SOAP API object type name, or an array of type names |

{% include test-script.html bundle="wsproxy--describe" chapter="parameters" %}

## Return Value

An object with two properties:

| Property | Type | Description |
|----------|------|-------------|
| `RequestID` | string | The SOAP request ID for the call |
| `Results` | object[] | Array of `ObjectDefinition` items — one per requested type |

Each `Results` element **is** the `ObjectDefinition` itself. Its fields (`ObjectType`, `Name`, `IsCreatable`, `IsUpdatable`, `IsRetrievable`, `IsQueryable`, the `Properties` field-definition array, `ExtendedProperties`, `ChildObjects`, …) sit **directly** on `Results[i]` — there is no nested `Results[i].ObjectDefinition` wrapper. The available fields for the object type are in `Results[i].Properties`.

{% include differs-from-docs.html note="The official docs place field details at Results[0].ObjectDefinition.Properties and reference a Status property, but at runtime each Results element is directly the ObjectDefinition (field details are at Results[0].Properties) and the return object exposes RequestID rather than Status." %}

{% include test-script.html bundle="wsproxy--describe" chapter="objectdefinition-shape" label="Show test script — no ObjectDefinition wrapper, no Status" %}

{% include test-script.html bundle="wsproxy--describe" chapter="return-value" %}

## Examples

### Describe a single object type

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.describe("DataExtension");
Write(Stringify(result.Results[0].Properties));
```

### Describe multiple object types

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.describe(["DataExtension", "Subscriber"]);
for (var i = 0; i < result.Results.length; i++) {
    Write(result.Results[i].ObjectType + "<br>");
}
```

{% include test-script.html bundle="wsproxy--describe" chapter="examples" %}

## Notes

Use `describe` to discover what properties are available on a SOAP API object before building a `retrieve` or `create` call. This is especially useful when working with unfamiliar object types.

Describing an unknown object type does not throw — the call still returns a `RequestID` and a single-element `Results` array whose element is `null`.

{% include test-script.html bundle="wsproxy--describe" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
  <li><a href="/wsproxy/execute/">proxy.execute</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
