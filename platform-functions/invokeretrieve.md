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
test_scripts: complete
---

{% include differs-from-docs.html note="The official docs type the return value as an object array only. At runtime the call returns an array of result objects when rows match, but `null` both when the retrieve errors **and** when it matches no rows — so the return value alone cannot tell those two apart. Read `status[0]` to distinguish them: it is `\"OK\"` on both success paths and starts with `\"Error: \"` when the retrieve failed." %}

{% include test-script.html bundle="platform-functions--invokeretrieve" chapter="differs-from-docs" label="Show test script — array vs null return, the error/no-match distinction and the pre-sized-vs-empty status control" %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | Configured Retrieve request object |
| `status` | array | Yes | Out-parameter that receives the overall status (`status[0]`) and the RequestID GUID (`status[1]`). Pass a pre-sized array — `[0, 0]` |

The `status` array is a true out parameter, but it is never grown: only the slots it already has are written. Pass `[0, 0]` — an empty `[]` stays empty and reads back `undefined`. Only two slots are ever filled, so a `[0, 0, 0]` leaves `status[2]` at its initial value.

A `null` `apiObject` does not throw: the call returns `null` and leaves the `status` array untouched, because no SOAP call is made. A plain JavaScript object or a string as `apiObject` throws, and so does a non-array `status`.

{% include test-script.html bundle="platform-functions--invokeretrieve" chapter="parameters" %}

## Examples

```javascript
var RetrieveRequest = Platform.Function.CreateObject("RetrieveRequest");
Platform.Function.SetObjectProperty(RetrieveRequest, "ObjectType", "Email");
Platform.Function.AddObjectArrayItem(RetrieveRequest, "Properties", "Email.Name");

var filter = Platform.Function.CreateObject("SimpleFilterPart");
Platform.Function.SetObjectProperty(filter, "Property", "Status");
Platform.Function.SetObjectProperty(filter, "SimpleOperator", "equals");
Platform.Function.AddObjectArrayItem(filter, "Value", "Active");
Platform.Function.SetObjectProperty(RetrieveRequest, "Filter", filter);

var StatusAndRequestID = [0, 0];
var Emails = Platform.Function.InvokeRetrieve(RetrieveRequest, StatusAndRequestID);

if (StatusAndRequestID[0] !== "OK") {
    // the retrieve failed - StatusAndRequestID[0] carries the reason
} else if (Emails === null) {
    // the retrieve succeeded but matched no rows
}
```

A `SimpleFilterPart`'s `Value` is a collection: set it with `AddObjectArrayItem`, not with `SetObjectProperty` — the latter throws.

Guard on `status[0]`, not on the return value: `null` means *either* "no rows" *or* "the retrieve failed", and only `status[0]` separates the two.

{% include callout.html type="note" content="WSProxy.retrieve() is simpler and preferred for new code." %}

{% include test-script.html bundle="platform-functions--invokeretrieve" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">WSProxy.retrieve</a></li>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
</ul>
</div>
