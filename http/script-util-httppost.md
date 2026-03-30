---
layout: page
title: Script.Util.HttpPost
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/script-util-httppost/
description: Convenience function for simple HTTP POST requests — sends a body payload and returns the response body as a string.
---

`Script.Util.HttpPost` is a lightweight wrapper for HTTP POST requests. It sends a POST with the given body to the specified URL and returns the response body as a string. No `Platform.Load` is required.

{% include callout.html type="note" content="For full control over headers, timeouts, HTTP method, and status code inspection, use [`Script.Util.HttpRequest`](/http/script-util-httprequest/) instead." %}

## Syntax

```javascript
var body = Script.Util.HttpPost(url, contentType, payload);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body (e.g. `"application/json"`) |
| `payload` | string | Yes | Request body |

## Return Value

Returns the response body as a string. Throws on connection failure. Does not expose the HTTP status code.

## Examples

### POST JSON data

```javascript
var payload = Stringify({ event: "click", page: "/home" });
var body = Script.Util.HttpPost(
    "https://api.example.com/events",
    "application/json",
    payload
);
var result = Platform.Function.ParseJSON(body + "");
```

### POST form-encoded data

```javascript
var payload = "email=jane%40example.com&first=Jane&last=Doe";
var body = Script.Util.HttpPost(
    "https://forms.example.com/register",
    "application/x-www-form-urlencoded",
    payload
);
```

## Notes

- Does not support custom request headers. Use [`Script.Util.HttpRequest`](/http/script-util-httprequest/) if you need to set `Authorization` or other headers.
- Does not expose the HTTP status code. A non-2xx response returns the error body as a string with no way to detect the failure.
- Available in all SSJS execution contexts without `Platform.Load`.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/script-util-httpget/">Script.Util.HttpGet</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/http/http-post/">HTTP.Post</a></li>
  <li><a href="/http/platform-httppost/">Platform.Function.HTTPPost</a></li>
</ul>
</div>
