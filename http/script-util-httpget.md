---
layout: page
title: Script.Util.HttpGet
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/script-util-httpget/
description: HTTP GET request constructor — creates an HttpRequestInstance that caches content for mail sends and supports custom headers.
---

`Script.Util.HttpGet` creates an HTTP GET request handler. Unlike `Platform.Function.HTTPGet`, it caches content for use in mail sends and supports custom headers via `setHeader()`. Only works with HTTP on port 80 and HTTPS on port 443.

{% include callout.html type="note" content="For full control over HTTP method, timeouts, and all status codes, use [`Script.Util.HttpRequest`](/http/script-util-httprequest/) instead." %}

## Syntax

```javascript
new Script.Util.HttpGet(url)
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL (HTTP port 80 or HTTPS port 443 only) |

## Return Value

Returns an `HttpRequestInstance`. Call `send()` to execute the request.

## Instance Properties

| Property | Type | Description |
|----------|------|-------------|
| `<HttpRequestInstance>.retries` | number | Number of retry attempts on failure |
| `<HttpRequestInstance>.continueOnError` | boolean | If `true`, does not throw on HTTP error status |

## Instance Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `<HttpRequestInstance>.send()` | object | Execute the request; returns response object |
| `<HttpRequestInstance>.setHeader(name, value)` | void | Set a custom request header |
| `<HttpRequestInstance>.clearHeaders()` | void | Remove all custom headers |
| `<HttpRequestInstance>.removeHeader(name)` | void | Remove a specific header by name |

{% include callout.html type="warning" content="Calling `setHeader()` disables content caching for `HttpGet`." %}

## Response Object

The `resp` object returned by `send()` has:

| Property | Type | Description |
|----------|------|-------------|
| `resp.statusCode` | number | HTTP status code |
| `resp.content` | CLR string | Response body — convert with `String()` before use |

## Examples

### Basic GET request

```javascript
var req = new Script.Util.HttpGet("https://api.example.com/data");
var resp = req.send();
if (resp.statusCode == 200) {
    var result = Platform.Function.ParseJSON(String(resp.content));
    Write(Stringify(result));
}
```

### GET with auth header

```javascript
var req = new Script.Util.HttpGet("https://api.example.com/items");
req.setHeader("Authorization", "Bearer " + accessToken);
req.retries = 2;
req.continueOnError = true;
var resp = req.send();
if (resp.statusCode == 200) {
    var items = Platform.Function.ParseJSON(String(resp.content));
    for (var i = 0; i < items.length; i++) {
        Write(items[i].name + "<br>");
    }
}
```

## Notes

- Only works with HTTP on **port 80** and HTTPS on **port 443**. Other ports require `Script.Util.HttpRequest`.
- Caches the response content for use in mail send personalisation — unless `setHeader()` is called (which disables caching).
- Does not require `Platform.Load`.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/http/request-methods/">Request Instance Methods</a></li>
  <li><a href="/http/http-get/">HTTP.Get</a></li>
  <li><a href="/http/platform-httpget/">Platform.Function.HTTPGet</a></li>
</ul>
</div>
