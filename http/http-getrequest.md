---
layout: page
title: HTTP.GetRequest
parent: HTTP & REST APIs
parent_url: /http/
description: Core library HTTP GET that returns both status code and body — use when you need to handle different HTTP response codes.
---

`HTTP.GetRequest` returns both the HTTP status code and the response body, unlike `HTTP.Get` which returns only the body.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
var statusCode = [0];
var body = HTTP.GetRequest(url, statusCode [, headerNames, headerValues]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `statusCode` | number[] | Yes | Single-element array — receives the HTTP status code |
| `headerNames` | string[] | No | Additional header names |
| `headerValues` | string[] | No | Corresponding header values |

## Return Value

Returns the response body as a string. The `statusCode` array's first element is updated with the HTTP status code.

## Examples

```javascript
Platform.Load("core", "1.1.5");

var statusCode = [0];
var body = HTTP.GetRequest(
    "https://api.example.com/user/123",
    statusCode,
    ["Authorization"],
    ["Bearer " + accessToken]
);

if (statusCode[0] === 200) {
    var user = Platform.Function.ParseJSON(body + "");
    Write("Found: " + user.name);
} else if (statusCode[0] === 404) {
    Write("User not found.");
} else {
    Write("Error: " + statusCode[0]);
}
```

## Notes

The `statusCode` parameter uses an array so it can be passed by reference — JavaScript does not support true pass-by-reference for primitives.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/http-get/">HTTP.Get</a></li>
  <li><a href="/http/http-postrequest/">HTTP.PostRequest</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
