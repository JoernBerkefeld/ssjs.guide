---
layout: function
title: HTTPGet
parent: Platform Functions
parent_url: /platform-functions/
description: Sends an HTTP GET request to the specified URL and returns the response body as a string.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.HTTPGet(url, continueOnError, emptyContentHandling, headerNames, headerValues, statusVariable)"
return_type: string
min_args: 1
max_args: 6
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | URL to request |
| `continueOnError` | boolean | 6-arg form only | When `true`, the request terminates if an error occurs. When `false`, the request continues on error. Part of the all-or-nothing trailing group. |
| `emptyContentHandling` | number | 6-arg form only | How to handle a URL that returns empty content: `0` = allow empty, `1` = return error, `2` = skip subscriber. Part of the all-or-nothing trailing group. |
| `headerNames` | string[] | 6-arg form only | Array of header names to include in the GET request (pass `null` when none). Part of the all-or-nothing trailing group. |
| `headerValues` | string[] | 6-arg form only | Array of header values corresponding to `headerNames` (pass `null` when none). Part of the all-or-nothing trailing group. |
| `statusVariable` | number[] | 6-arg form only | Array intended to receive the HTTP status code, but observed empty at runtime even on success — do not rely on it. Part of the all-or-nothing trailing group. |

Only two call forms are valid: a **single-argument** call `HTTPGet(url)`, or the **full 6-argument** call. The trailing five arguments (`continueOnError` through `statusVariable`) are an all-or-nothing group — supply all five together or none. Passing 2–5 arguments throws the generic unknown-member/wrong-arity error.

{% include differs-from-docs.html note="The argument count is a discontinuous overload, not a simple range. Only a 1-argument call (`HTTPGet(url)`, which succeeds and returns the response body as a string) or the full 6-argument call are valid; passing 2, 3, 4, or 5 arguments throws \"Unable to retrieve security descriptor for this frame\". This contradicts both the docs listing arguments 3–6 as independently optional and the older claim that all six arguments are required." %}

## Examples

```javascript
// Valid form 1 - single argument, returns the response body as a string
var body = Platform.Function.HTTPGet("https://api.example.com/data");
var obj = Platform.Function.ParseJSON(body);

// Valid form 2 - full 6-argument form (the trailing five are all-or-nothing)
var status = [];
var content = Platform.Function.HTTPGet(
    "https://api.example.com/data",
    false,
    0,
    null,
    null,
    status
);
// status[0] is unreliable (observed empty even on success) - read the body from `content`
var parsed = Platform.Function.ParseJSON(content);

// 6-argument form with custom headers
var status2 = [];
var content2 = Platform.Function.HTTPGet(
    "https://api.example.com/secure",
    false,
    0,
    ["x-request-id"],
    ["sampleValue"],
    status2
);
```

{% include callout.html type="note" content="For full transport control, use `HTTP.Get` (Core) or `Script.Util.HttpRequest`." %}

## Return Value

Returns the response body as a string. In the 6-argument form the `statusVariable` array is intended to receive the HTTP status code as `statusVariable[0]`, but at runtime it was observed empty (`statusVariable.length === 0`, `statusVariable[0] === undefined`) even on a successful call — so do not depend on it.

{% include differs-from-docs.html note="The official Salesforce docs describe the return value as a numeric status, but the runtime returns the response body as a string. The `statusVariable[0]` out-parameter that was meant to carry the numeric status was observed empty at runtime even on success, so it is unreliable in a CloudPage context." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/get/">HTTP.Get</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
