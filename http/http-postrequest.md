---
layout: page
title: HTTP.PostRequest
parent: HTTP & REST APIs
parent_url: /http/
description: Core library HTTP POST with status code — sends a POST request and captures both the HTTP response code and body.
---

`HTTP.PostRequest` sends a POST request and returns both the HTTP status code and the response body.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
var statusCode = [0];
var body = HTTP.PostRequest(url, contentType, payload, statusCode [, headerNames, headerValues]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body |
| `payload` | string | Yes | Request body string |
| `statusCode` | number[] | Yes | Single-element array — receives the HTTP status code |
| `headerNames` | string[] | No | Additional header names |
| `headerValues` | string[] | No | Corresponding header values |

## Return Value

Returns the response body as a string. Updates `statusCode[0]` with the HTTP status.

## Examples

```javascript
Platform.Load("core", "1.1.5");

var payload = Stringify({ action: "subscribe", email: email });
var statusCode = [0];
var response = HTTP.PostRequest(
    "https://api.example.com/preferences",
    "application/json",
    payload,
    statusCode,
    ["Authorization"],
    ["Bearer " + accessToken]
);

if (statusCode[0] >= 200 && statusCode[0] < 300) {
    var result = Platform.Function.ParseJSON(response + "");
    Write(Stringify({ status: "ok", id: result.id }));
} else {
    Write(Stringify({ status: statusCode[0], statusMessage: "Upstream Error", error: "Upstream returned " + statusCode[0] }));
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/http-getrequest/">HTTP.GetRequest</a></li>
  <li><a href="/http/http-post/">HTTP.Post</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
