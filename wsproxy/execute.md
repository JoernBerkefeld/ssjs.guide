---
layout: function
title: <WSProxyInstance>.execute
parent: WSProxy
parent_url: /wsproxy/
description: Run a SOAP Execute request (such as LogUnsubEvent) by passing an array of Name/Value parameters and the request name.
syntax: "<WSProxyInstance>.execute(parameters, requestName)"
return_type: object
min_args: 2
max_args: 2
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `parameters` | object[] | Yes | Array of `{ Name, Value }` parameter objects to include in the Execute call |
| `requestName` | string | Yes | The name of the Execute request to run (e.g. `"LogUnsubEvent"`) |

## Return Value

An object with three properties:

| Property | Type | Description |
|----------|------|-------------|
| `Status` | string | Overall request status (e.g. `"OK"` or `"Error"`) |
| `RequestID` | string | The SOAP request identifier (GUID) |
| `Results` | object[] | Array of per-item `ExecuteResponse` results |

Each item in `Results` contains `StatusCode`, `StatusMessage`, `OrdinalID`, `Results`, and `ErrorCode`.

## Examples

### Log an unsubscribe event

```javascript
var prox = new Script.Util.WSProxy();
var props = [
    { Name: "SubscriberKey", Value: "sample@sample.com" },
    { Name: "EmailAddress", Value: "sample@sample.com" },
    { Name: "JobID", Value: 0 },
    { Name: "ListID", Value: 0 },
    { Name: "BatchID", Value: 0 }
];
var result = prox.execute(props, "LogUnsubEvent");
Write(result.Status);
```

## Notes

The first argument is an **array of Name/Value objects**, not an object-type string — passing a plain string as the first argument raises a runtime error. The Execute call is validated server-side, so an unknown `requestName` returns a result with `Status: "Error"` rather than throwing.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/performitem/"><WSProxyInstance>.performItem</a></li>
  <li><a href="/core-library/triggeredsend/">TriggeredSend (Core)</a></li>
</ul>
</div>
