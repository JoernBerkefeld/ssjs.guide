---
layout: function
title: InvokeRetrieve
parent: Platform Functions
parent_url: /platform-functions/
description: Executes a SOAP Retrieve operation to retrieve SFMC objects. Typically used with CreateObject and filter configuration.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokeRetrieve(object)"
return_type: object[]
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `object` | object | Yes | Configured Retrieve request object |

## Examples

```javascript
var req = Platform.Function.CreateObject("RetrieveRequest");
Platform.Function.SetObjectProperty(req, "ObjectType", "DataExtensionObject[MyDE]");
Platform.Function.SetObjectProperty(req, "Properties", ["Email", "FirstName"]);

var filter = Platform.Function.CreateObject("SimpleFilterPart");
Platform.Function.SetObjectProperty(filter, "Property", "Status");
Platform.Function.SetObjectProperty(filter, "SimpleOperator", "equals");
Platform.Function.SetObjectProperty(filter, "Value", "Active");
Platform.Function.SetObjectProperty(req, "Filter", filter);

var results = Platform.Function.InvokeRetrieve(req);
```

{% include callout.html type="note" content="WSProxy.retrieve() is simpler and preferred for new code." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">WSProxy.retrieve</a></li>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
</ul>
</div>
