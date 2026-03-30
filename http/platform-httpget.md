---
layout: page
title: Platform.Function.HTTPGet
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/platform-httpget/
description: AMPscript-compatible HTTP GET function available in SSJS — sends a GET request and returns the response body as a string.
---

`Platform.Function.HTTPGet` is an AMPscript-compatible function available in SSJS. It sends an HTTP GET request and returns the response body as a string. Unlike the Core library's [`HTTP.Get`](/http/http-get/), it does not require `Platform.Load`.

## Syntax

```javascript
var body = Platform.Function.HTTPGet(url [, encoding [, followRedirects [, headerNames, headerValues]]]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `encoding` | string | No | Response character encoding (default: `"UTF-8"`) |
| `followRedirects` | boolean | No | Follow HTTP redirects (default: `true`) |
| `headerNames` | string[] | No | Array of request header names |
| `headerValues` | string[] | No | Array of corresponding header values |

## Return Value

Returns the response body as a string. Throws on connection failure. Does not expose the HTTP status code — use [`HTTP.GetRequest`](/http/http-getrequest/) or [`Script.Util.HttpRequest`](/http/script-util-httprequest/) if you need status code inspection.

## Examples

### Simple GET

```javascript
var body = Platform.Function.HTTPGet("https://api.example.com/data");
var data = Platform.Function.ParseJSON(body + "");
```

### GET with authorization header

```javascript
var headerNames = ["Authorization"];
var headerValues = ["Bearer " + accessToken];
var body = Platform.Function.HTTPGet(
    "https://api.example.com/secure",
    "UTF-8",
    true,
    headerNames,
    headerValues
);
var result = Platform.Function.ParseJSON(body + "");
```

## Notes

{% include callout.html type="note" content="`Platform.Function.HTTPGet` does not expose the HTTP status code. Use `Script.Util.HttpRequest` or `HTTP.GetRequest` when you need to inspect the response code." %}

Available in all SSJS execution contexts — no `Platform.Load` required.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/httpget/">Platform.Function.HTTPGet (full API reference)</a></li>
  <li><a href="/http/platform-httppost/">Platform.Function.HTTPPost</a></li>
  <li><a href="/http/http-get/">HTTP.Get</a></li>
  <li><a href="/http/http-getrequest/">HTTP.GetRequest</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
