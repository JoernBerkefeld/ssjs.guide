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
min_args: 6
max_args: 6
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | URL to request |
| `continueOnError` | boolean | Yes | When `true`, the request terminates if an error occurs. When `false`, the request continues on error. |
| `emptyContentHandling` | number | Yes | How to handle a URL that returns empty content: `0` = allow empty, `1` = return error, `2` = skip subscriber |
| `headerNames` | string[] | Yes | Array of header names to include in the GET request (pass `null` when none) |
| `headerValues` | string[] | Yes | Array of header values corresponding to `headerNames` (pass `null` when none) |
| `statusVariable` | number[] | Yes | Array that receives the HTTP status code: `0` = success, `-1` = URL not found, `-2` = HTTP error, `-3` = success but no content |

{% include differs-from-docs.html note="The official docs list `emptyContentHandling`, `headerNames`, `headerValues`, and `statusVariable` as optional, but runtime testing shows all six arguments are required — the call throws a \"Unable to retrieve security descriptor for this frame\" error otherwise. Pass `null` for any unused header arrays." %}

## Examples

```javascript
// Simple GET with error handling
var status = [0];
var content = Platform.Function.HTTPGet(
    "https://api.example.com/data",
    false,
    0,
    null,
    null,
    status
);
if (status[0] === 0) {
    var obj = Platform.Function.ParseJSON(content);
}

// GET with custom headers
var status2 = [0];
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

Returns the response body as a string. The HTTP status code is written into the `statusVariable` array argument (if provided) as `statusVariable[0]`.

{% include differs-from-docs.html note="The official Salesforce docs describe the return value as a numeric status, but the runtime returns the response body as a string; the numeric status is written to `statusVariable[0]` instead." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/get/">HTTP.Get</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
