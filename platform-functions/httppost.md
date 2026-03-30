---
layout: function
title: HTTPPost
parent: Platform Functions
parent_url: /platform-functions/
description: Sends an HTTP POST request to the specified URL with a body payload and returns the response body.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.HTTPPost(url, contentType, payload [, headerNames, headerValues [, returnCodeAndResponse]])"
return_type: string
min_args: 3
max_args: 6
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body, e.g. `"application/json"` |
| `payload` | string | Yes | Request body |
| `headerNames` | string[] | No | Array of additional header names |
| `headerValues` | string[] | No | Array of corresponding header values |
| `returnCodeAndResponse` | boolean | No | When `true`, returns an array `[statusCode, body]` instead of just the body |

## Examples

```javascript
// Simple JSON POST
var payload = Stringify({ event: "pageview", page: "/home" });
var response = Platform.Function.HTTPPost(
    "https://api.example.com/events",
    "application/json",
    payload
);
var result = Platform.Function.ParseJSON(response + "");

// POST with auth header and status code
var headers = ["Authorization"];
var vals = ["Bearer " + token];
var res = Platform.Function.HTTPPost(
    "https://api.example.com/track",
    "application/json",
    payload,
    headers,
    vals,
    true // [statusCode, body]
);
var statusCode = res[0];
var body = res[1];
```

## Return Value

By default, returns the response body as a string. When `returnCodeAndResponse` is `true`, returns a two-element array: `[httpStatusCode, responseBody]`.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/httpget/">HTTPGet</a></li>
  <li><a href="/http/http-post/">HTTP.Post</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
