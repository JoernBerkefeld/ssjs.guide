---
layout: page
title: Request Instance Methods
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/request-methods/
description: Reference for the instance methods and response object properties of Script.Util.HttpRequest — setHeader, send, and the response object.
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

## Request Object — Methods

| Method | Description |
|--------|-------------|
| `req.setHeader(name, value)` | Set a single request header |
| `req.send()` | Send the request; returns a response object |

### `req.setHeader(name, value)`

Adds or replaces a header on the outgoing request. Call it once per header.

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + token);
req.setHeader("Accept", "application/json");
req.setHeader("X-Custom-Header", "my-value");
var resp = req.send();
```

### `req.send()`

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
| `resp.statusCode` | number | HTTP status code (e.g. `200`, `404`, `500`) |
| `resp.content` | CLR string | Response body — **must be converted** with `String()` before use |
| `resp.headers` | object | Response headers |

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

```javascript
var resp = req.send();
var contentType = resp.headers["Content-Type"];
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
  <li><a href="/http/script-util-httppost/">Script.Util.HttpPost</a></li>
  <li><a href="/http/http-getrequest/">HTTP.GetRequest</a></li>
</ul>
</div>
