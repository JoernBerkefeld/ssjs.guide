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
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body, e.g. `"application/json"` |
| `payload` | string | Yes | Request body |
| `headerNames` | string[] | No | Array of additional header names |
| `headerValues` | string[] | No | Array of corresponding header values |
| `response` | array | No | Array intended to receive the response body. **Unreliable** — observed empty even on successful (200) responses (see below) |

{% include callout.html type="warning" content="The `response` out-parameter is unreliable: in runtime tests it stayed empty (`response[0]` was `undefined`) even for successful `200` requests. Read the HTTP status from the return value, and use [`HTTP.Post`](/http/post/) or [`Script.Util.HttpRequest`](/http/script-util-httprequest/) when you need the response body." %}

## Examples

```javascript
// Simple JSON POST — read the status code from the return value
var payload = Stringify({ event: "pageview", page: "/home" });
var statusCode = Platform.Function.HTTPPost(
    "https://api.example.com/events",
    "application/json",
    payload
);
if (statusCode == 200) {
    Write("posted");
}

// POST with auth header
var headers = ["Authorization"];
var vals = ["Bearer " + token];
var code = Platform.Function.HTTPPost(
    "https://api.example.com/track",
    "application/json",
    payload,
    headers,
    vals
);
// code is the HTTP status code (number). To read the body, use HTTP.Post or Script.Util.HttpRequest.
```

## Return Value

Returns the HTTP status code as a number. The `response` array out-parameter is documented to receive the body as `response[0]`, but is unreliable at runtime (see the warning above) — do not depend on it.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/httpget/">HTTPGet</a></li>
  <li><a href="/http/post/">HTTP.Post</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
