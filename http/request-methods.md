---
layout: page
title: Request Instance Methods
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/request-methods/
description: Reference for the instance methods and response object properties of Script.Util.HttpRequest and Script.Util.HttpGet — setHeader, clearHeaders, removeHeader, send, and the response object.
verification: verified
differs_from_docs: true
---

This page is a quick reference for the `Script.Util.HttpRequest` instance API: the methods you call on the request object before sending, and the properties available on the response object returned by `send()`.

For full documentation including examples, see [`Script.Util.HttpRequest`](/http/script-util-httprequest/).

---

## Request Object — Properties

Set these on the request object before calling `send()`.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `req.method` | string | `"GET"` | HTTP method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| `req.contentType` | string | `""` | `Content-Type` header value for the request body |
| `req.encoding` | string | `"UTF-8"` | Character encoding |
| `req.timeout` | number | `30000` | Request timeout in milliseconds |
| `req.postData` | string | `""` | Request body — used for `POST`, `PUT`, `PATCH` |

{% include differs-from-docs.html note="`timeout` is not listed as a configuration property in the official docs (which only note that `send()` times out after 30 seconds), but the property exists and is applied at runtime." %}

## Request Object — Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `<HttpRequestInstance>.clearHeaders()` | void | Remove all custom headers |
| `<HttpRequestInstance>.removeHeader(name)` | void | Remove a specific header by name |
| `<HttpRequestInstance>.send()` | `HttpResponseInstance` | Send the request |
| `<HttpRequestInstance>.setHeader(name, value)` | void | Set a custom request header |

### `<HttpRequestInstance>.setHeader(name, value)`

Adds or replaces a header on the outgoing request. Call it once per header.

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + token);
req.setHeader("Accept", "application/json");
req.setHeader("X-Custom-Header", "my-value");
var resp = req.send();
```

### `<HttpRequestInstance>.clearHeaders()`

Removes all custom headers previously set on the request.

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.setHeader("Authorization", "Bearer " + token);
req.setHeader("Accept", "application/json");
req.clearHeaders(); // all custom headers removed
var resp = req.send();
```

### `<HttpRequestInstance>.removeHeader(name)`

Removes a specific header from the request by name.

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.setHeader("Authorization", "Bearer " + token);
req.setHeader("X-Debug", "1");
req.removeHeader("X-Debug");
var resp = req.send();
```

### `<HttpRequestInstance>.send()`

Sends the request and returns a response object. May throw on connection failure or timeout — wrap in `try/catch` for production code.

```javascript
try {
    var resp = req.send();
} catch (e) {
    Write("Request failed: " + e.message);
}
```

---

## Response Object — Properties

`req.send()` returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `content` | CLR string | Response body (must use `String()` to convert) |
| `contentType` | string | The content type returned in the response |
| `encoding` | string | The encoding type returned in the response |
| `headers` | object | Response headers as a CLR object — not directly indexable; read via the `for..in` pattern below |
| `returnStatus` | number | A status value: `0` = OK, `1` = Empty URL, `2` = Call failed, `3` = Call succeeded with empty content |
| `statusCode` | number | HTTP status code |

{% include callout.html type="warning" content="`resp.content` is a CLR string object, not a native JavaScript string. Always convert it with `String(resp.content)` before passing to `ParseJSON()` or any string method." %}

### Reading the response body

```javascript
var resp = req.send();
var rawBody = String(resp.content);              // Convert CLR string
var data = Platform.Function.ParseJSON(rawBody); // Then parse JSON
```

### Checking the status code

```javascript
var resp = req.send();
if (resp.statusCode === 200) {
    var data = Platform.Function.ParseJSON(String(resp.content));
} else if (resp.statusCode === 404) {
    Write("Not found.");
} else {
    Write("Error: " + resp.statusCode);
}
```

### Reading a response header

{% include differs-from-docs.html note="The official docs example reads a single header via `resp.headers[\"...\"]`, but that access throws **\"Use of Common Language Runtime (CLR) is not allowed\"** at runtime. Individual headers are only readable by enumerating with `for..in` (see below)." %}

A `for..in` loop over `resp.headers` yields keys shaped `"[Name, Value]"` — the value is embedded in the key string. Strip the `[ ]` wrapper and split on the first `", "` to build a plain header map without reading any CLR value:

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
var contentType = headers["content-type"]; // case-insensitive; undefined if missing
```

---

## Full Example

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/v1/data");
req.method = "POST";
req.contentType = "application/json";
req.timeout = 15000;
req.setHeader("Authorization", "Bearer " + accessToken);
req.setHeader("Accept", "application/json");
req.postData = Stringify({ key: "value" });

try {
    var resp = req.send();
    var body = Platform.Function.ParseJSON(String(resp.content));
    if (resp.statusCode === 200 || resp.statusCode === 201) {
        Write("Success: " + body.id);
    } else {
        Write("Unexpected status: " + resp.statusCode);
    }
} catch (e) {
    Write("Request error: " + e.message);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest (full docs)</a></li>
  <li><a href="/http/script-util-httpget/">Script.Util.HttpGet</a></li>
</ul>
</div>
