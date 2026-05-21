---
layout: page
title: HTTP.Post
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/post/
redirect_from:
  - /http/http-post/
description: Core library HTTP POST — posts a payload and returns status and body as an object. Requires Platform.Load.
---

`HTTP.Post` sends a POST with the given content type and body. It returns an **object** that includes status information and the response body (see Core HTTP documentation for the exact shape).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
var response = HTTP.Post(url, contentType, payload[, headerNames, headerValues]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body |
| `payload` | string | Yes | Request body string |
| `headerNames` | string[] | No | Additional header names |
| `headerValues` | string[] | No | Values paired with `headerNames` |

## Return value

Returns an **object** (not a bare string). Parse `Content` or equivalent field after coercing with `String(...)`.

## Example

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

var result = Platform.Function.ParseJSON(String(response.Content));
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/get/">HTTP.Get</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/platform-functions/httppost/">Platform.Function.HTTPPost</a></li>
</ul>
</div>
