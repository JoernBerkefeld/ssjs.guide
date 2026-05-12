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
syntax: "Platform.Function.HTTPPost(url, contentType, payload[, headerNames, headerValues, response])"
return_type: number
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
| `response` | array | No | Array that receives the response body from the POST request |

## Examples

```javascript
// Simple JSON POST
var payload = Stringify({ event: "pageview", page: "/home" });
var response = [];
var statusCode = Platform.Function.HTTPPost(
    "https://api.example.com/events",
    "application/json",
    payload,
    null,
    null,
    response
);
var body = response[0];
var result = Platform.Function.ParseJSON(body + "");

// POST with auth header
var headers = ["Authorization"];
var vals = ["Bearer " + token];
var res = [];
var code = Platform.Function.HTTPPost(
    "https://api.example.com/track",
    "application/json",
    payload,
    headers,
    vals,
    res
);
var statusCode = code; // HTTP status code (number)
var body = res[0];    // response body string
```

## Return Value

Returns the HTTP status code as a number. The response body is written into the `response` array argument (if provided) as `response[0]`.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/httpget/">HTTPGet</a></li>
  <li><a href="/http/http-post/">HTTP.Post</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
