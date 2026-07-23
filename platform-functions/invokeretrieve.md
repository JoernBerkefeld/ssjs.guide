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
syntax: "Platform.Function.InvokeRetrieve(apiObject, status)"
return_type: object[]|null
min_args: 2
max_args: 2
verification: verified
differs_from_docs: true
---

{% include differs-from-docs.html note="The official docs type the return value as an object, but at runtime the call returns an array of result objects — or `null` when the retrieve errors or matches no rows. The `status` array is never populated: even on the success path `status.length` stays `0` and `status[0]` / `status[1]` are `undefined`, so read the returned array itself for results rather than the status out-parameter." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | Configured Retrieve request object |
| `status` | array | Yes | Status out-parameter required by the signature, but inert at runtime — it is never populated (stays empty even on success). Pass an array (e.g. `[0, 0]`); read the returned array for results. |

## Examples

```javascript
var RetrieveRequest = Platform.Function.CreateObject("RetrieveRequest");
Platform.Function.SetObjectProperty(RetrieveRequest, "ObjectType", "Email");
Platform.Function.AddObjectArrayItem(RetrieveRequest, "Properties", "Email.Name");

var filter = Platform.Function.CreateObject("SimpleFilterPart");
Platform.Function.SetObjectProperty(filter, "Property", "Status");
Platform.Function.SetObjectProperty(filter, "SimpleOperator", "equals");
Platform.Function.SetObjectProperty(filter, "Value", "Active");
Platform.Function.SetObjectProperty(RetrieveRequest, "Filter", filter);

var StatusAndRequestID = [0, 0];
var Emails = Platform.Function.InvokeRetrieve(RetrieveRequest, StatusAndRequestID);
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
