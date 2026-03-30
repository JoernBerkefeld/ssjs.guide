---
layout: page
title: Script.Util.HttpGet
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/script-util-httpget/
description: Convenience function for simple HTTP GET requests — returns the response body as a string without requiring an HttpRequest object.
---

`Script.Util.HttpGet` is a lightweight wrapper for HTTP GET requests. It sends a GET to the specified URL and returns the response body as a string. No `Platform.Load` is required.

{% include callout.html type="note" content="For full control over headers, timeouts, and status code inspection, use [`Script.Util.HttpRequest`](/http/script-util-httprequest/) instead." %}

## Syntax

```javascript
var body = Script.Util.HttpGet(url);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |

## Return Value

Returns the response body as a string. Throws on connection failure. Does not expose the HTTP status code.

## Examples

### Fetch JSON data

```javascript
var body = Script.Util.HttpGet("https://api.example.com/items");
var items = Platform.Function.ParseJSON(body + "");
for (var i = 0; i < items.length; i++) {
    Write(items[i].name + "<br>");
}
```

### Fetch and render a remote snippet

```javascript
var content = Script.Util.HttpGet("https://cdn.example.com/snippets/footer.html");
Write(content);
```

## Notes

- Does not support custom request headers. Use [`Script.Util.HttpRequest`](/http/script-util-httprequest/) if you need to set `Authorization` or other headers.
- Does not expose the HTTP status code. If the server returns a non-2xx response, the error body is returned as the string — with no indication of failure.
- Available in all SSJS execution contexts without `Platform.Load`.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/script-util-httppost/">Script.Util.HttpPost</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/http/http-get/">HTTP.Get</a></li>
  <li><a href="/http/platform-httpget/">Platform.Function.HTTPGet</a></li>
</ul>
</div>
