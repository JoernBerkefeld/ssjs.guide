---
layout: page
title: proxy.describe
parent: WSProxy
parent_url: /wsproxy/
description: Retrieve structural metadata for one or more SOAP API object types — useful for exploring available fields and relationships on an API object.
---

## Syntax

```javascript
var result = proxy.describe(objectType);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string \| string[] | Yes | SOAP API object type name, or an array of type names |

## Return Value

An object with two properties:

| Property | Type | Description |
|----------|------|-------------|
| `RequestID` | string | The SOAP request ID for the call |
| `Results` | object[] | Array of `ObjectDefinition` items describing the requested types |

## Examples

### Describe a single object type

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.describe("DataExtension");
Write(Stringify(result.Results));
```

### Describe multiple object types

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.describe(["DataExtension", "Subscriber"]);
for (var i = 0; i < result.Results.length; i++) {
    Write(result.Results[i].ObjectType + "<br>");
}
```

## Notes

Use `describe` to discover what properties are available on a SOAP API object before building a `retrieve` or `create` call. This is especially useful when working with unfamiliar object types.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
  <li><a href="/wsproxy/execute/">proxy.execute</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
