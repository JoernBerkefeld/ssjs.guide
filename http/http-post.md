---
layout: page
title: HTTP.Post
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/post/
redirect_from:
  - /http/http-post/
description: Core library HTTP POST — posts a payload and returns an object with StatusCode and Response. Requires Platform.Load.
---

`HTTP.Post` sends a POST with the given content type and body. It returns an **object** with two fields: `StatusCode` (the HTTP status as a string) and `Response` (the response body as a string).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
var response = HTTP.Post(url, contentType, payload, headerNames, headerValues);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body |
| `payload` | string | Yes | Request body string |
| `headerNames` | string[] | Yes | Header names (pass an empty array if none are needed) |
| `headerValues` | string[] | Yes | Values paired with `headerNames` (pass an empty array if none are needed) |

## Return value

Returns an **object** (not a bare string) with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `StatusCode` | string | HTTP status code of the response |
| `Response` | string | Response body |

Note that `HTTP.Post` uses different field names than [`HTTP.Get`](/http/get/), which returns `{ Status, Content }`.

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

if (response.StatusCode == "200") {
    var result = Platform.Function.ParseJSON(String(response.Response));
}
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
