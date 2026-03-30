---
layout: page
title: HTTP.Post
parent: HTTP & REST APIs
parent_url: /http/
description: Core library simple HTTP POST — sends a POST request with a body and returns the response.
---

`HTTP.Post` is a simple HTTP POST method from the Core library.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
var body = HTTP.Post(url, contentType, payload [, headerNames, headerValues]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body |
| `payload` | string | Yes | Request body string |
| `headerNames` | string[] | No | Additional header names |
| `headerValues` | string[] | No | Corresponding header values |

## Return Value

Returns the response body as a string. Does not expose status code — use `HTTP.PostRequest` if needed.

## Examples

```javascript
Platform.Load("core", "1.1.5");

var payload = Stringify({
    event: "form_submit",
    email: submitterEmail,
    timestamp: Platform.Function.Now()
});

var response = HTTP.Post(
    "https://api.example.com/events",
    "application/json",
    payload,
    ["X-API-Key"],
    ["mysecretkey"]
);
var result = Platform.Function.ParseJSON(response + "");
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/http-postrequest/">HTTP.PostRequest</a></li>
  <li><a href="/http/http-get/">HTTP.Get</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/platform-functions/httppost/">Platform.Function.HTTPPost</a></li>
</ul>
</div>
