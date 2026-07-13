---
layout: page
title: HTTP.Get
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/get/
redirect_from:
  - /http/http-get/
description: Core library HTTP GET — returns status and response body as an object. Requires Platform.Load.
verification: verified
---

`HTTP.Get` performs a GET request and returns a **single object** with numeric status information and the response payload (see official SOAP/Core HTTP documentation for the exact shape in your stack).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
var response = HTTP.Get(url[, headerNames, headerValues]);
```

When you omit `headerNames` and `headerValues`, pass **nothing** after `url`. When you include them, both arrays must have the same length and parallel ordering.

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Destination URL |
| `headerNames` | string[] | No | Header names to send |
| `headerValues` | string[] | No | Values paired with `headerNames` |

## Return value

Returns an **object** (not a bare string) with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `Status` | number | Numeric status of the request |
| `Content` | string | Response body |

Note that `HTTP.Get` uses different field names than [`HTTP.Post`](/http/post/), which returns `{ StatusCode, Response }`. Inspect `Stringify(response)` when integrating a new endpoint.

## Example

```javascript
Platform.Load("core", "1.1.5");

var response = HTTP.Get("https://api.example.com/data");
Write(Stringify(response));

var parsed = Platform.Function.ParseJSON(String(response.Content));
```

To inspect HTTP status codes with full control, prefer [`Script.Util.HttpRequest`](/http/script-util-httprequest/).

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/post/">HTTP.Post</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/platform-functions/httpget/">Platform.Function.HTTPGet</a></li>
</ul>
</div>
