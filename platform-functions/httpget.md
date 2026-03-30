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
syntax: "Platform.Function.HTTPGet(url [, encoding [, followRedirects [, headerNames, headerValues]]])"
return_type: string
min_args: 1
max_args: 5
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `encoding` | string | No | Response encoding (default: `"UTF-8"`) |
| `followRedirects` | boolean | No | Follow HTTP redirects (default: true) |
| `headerNames` | string[] | No | Array of header names to send |
| `headerValues` | string[] | No | Array of header values (parallel to headerNames) |

## Examples

```javascript
// Simple GET
var response = Platform.Function.HTTPGet("https://api.example.com/data");
var data = Platform.Function.ParseJSON(response + "");

// GET with custom headers
var headers = ["Authorization", "Content-Type"];
var values = ["Bearer mytoken", "application/json"];
var response2 = Platform.Function.HTTPGet(
    "https://api.example.com/secure",
    "UTF-8",
    true,
    headers,
    values
);
```

{% include callout.html type="note" content="For more control over request options, use `Script.Util.HttpRequest` or `HTTP.Get()`/`HTTP.GetRequest()` from the Core library." %}

## Return Value

Returns the response body as a string. Throws on connection failure. Does not expose status code — use `HTTP.GetRequest()` for status codes.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/httppost/">HTTPPost</a></li>
  <li><a href="/http/http-get/">HTTP.Get</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
