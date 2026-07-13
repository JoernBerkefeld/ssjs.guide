---
layout: function
title: Script.Util.HttpGet
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/script-util-httpget/
description: HTTP GET request constructor — creates an HttpRequestInstance that caches content for mail sends and supports custom headers.
verification: verified
differs_from_docs: true
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "new Script.Util.HttpGet(url)"
return_type: HttpGetInstance
min_args: 1
max_args: 1
---

`Script.Util.HttpGet` creates an HTTP GET request handler. Unlike `Platform.Function.HTTPGet`, it caches content for use in mail sends and supports custom headers via `setHeader()`. Only works with HTTP on port 80 and HTTPS on port 443.

{% include callout.html type="note" content="For full control over HTTP method, timeouts, and all status codes, use [`Script.Util.HttpRequest`](/http/script-util-httprequest/) instead." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL (HTTP port 80 or HTTPS port 443 only) |

## Return Value

Returns an `HttpGetInstance`. Call `send()` to execute the request.

## HttpGetInstance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `retries` | number | `1` | Number of retry attempts on failure |
| `continueOnError` | boolean | `false` | If `true`, does not throw on HTTP error status |
| `emptyContentHandling` | number | `0` | Indicates what to do if the GET request doesn’t return any content. `0` = continue, `1` = stop the request, `2` = continue to the next subscriber (only works in email sends) |
| `timeout` | number | `30000` | Request timeout in milliseconds |

{% include differs-from-docs.html note="`timeout` is not listed in the official docs, but the property exists and is applied end-to-end at runtime (same behaviour as on `Script.Util.HttpRequest`)." %}


## HttpGetInstance Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `clearHeaders()` | void | Remove all custom headers |
| `removeHeader(name)` | void | Remove a specific header by name |
| `send()` | `HttpResponseInstance` | Send the request |
| `setHeader(name, value)` | void | Set a custom request header |

{% include callout.html type="warning" content="Calling `setHeader()` disables content caching for `HttpGet`." %}

## HttpResponseInstance Object

{% include callout.html type="info" content="`HttpResponseInstance` is equal for `HttpGet` and `HttpRequest`." %}

The `resp` object returned by `req.send()` has these properties:

| Property | Type | Description |
|----------|------|-------------|
| `content` | CLR string | Response body (must use `String()` to convert) |
| `contentType` | string | The content type returned in the response |
| `encoding` | string | The encoding type returned in the response |
| `headers` | object | Response headers as a CLR object — not directly indexable; read via the `for..in` pattern below |
| `returnStatus` | number | A status value: `0` = OK, `1` = Empty URL, `2` = Call failed, `3` = Call succeeded with empty content |
| `statusCode` | number | HTTP status code |

{% include callout.html type="warning" content="`resp.content` is a CLR string, not a JavaScript string. Always wrap it with `String(resp.content)` before calling `ParseJSON()` or string methods." %}

{% include differs-from-docs.html note="The official docs example reads a single header via `resp.headers[\"...\"]`, but that access throws **\"Use of Common Language Runtime (CLR) is not allowed\"** at runtime. Individual headers are only readable by enumerating with `for..in` (see below)." %}

### Reading response headers

Direct access — `resp.headers["Content-Type"]`, `.Get()`, `.Item()`, or `String(resp.headers[key])` — throws **"Use of Common Language Runtime (CLR) is not allowed"**. However, a `for..in` loop over `resp.headers` yields keys shaped `"[Name, Value]"` — the value is embedded in the key string itself. Strip the `[ ]` wrapper and split on the first `", "` to build a plain header map without ever reading a CLR value:

```javascript
/**
 * Build a plain { name: value } header map from an HttpResponse.
 * Reads only the for..in enumeration keys (shaped "[Name, Value]") so it never
 * touches a CLR value — avoiding "Use of CLR is not allowed".
 * @param {object} resp - the response returned by req.send()
 * @returns {object} map of lowercased header name => value string
 */
function getHeaderMap(resp) {
    var map = {};
    for (var k in resp.headers) {
        var pair = String(k);
        // Enumeration keys are wrapped in [ ] — strip them.
        if (pair.charAt(0) === "[") { pair = pair.substring(1); }
        if (pair.charAt(pair.length - 1) === "]") { pair = pair.substring(0, pair.length - 1); }
        var idx = pair.indexOf(", ");
        if (idx > -1) {
            map[pair.substring(0, idx).toLowerCase()] = pair.substring(idx + 2);
        }
    }
    return map;
}

var resp = req.send();
var headers = getHeaderMap(resp);
var contentType = headers["content-type"]; // "application/json; charset=utf-8"
```

Header names are lowercased in the map above so lookups are case-insensitive. A missing header returns `undefined`.

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
  <li><a href="/http/get/">HTTP.Get</a></li>
  <li><a href="/platform-functions/httpget/">Platform.Function.HTTPGet</a></li>
</ul>
</div>
