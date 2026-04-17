---
layout: page
title: Script.Util.HttpRequest
parent: HTTP & REST APIs
parent_url: /http/
description: Full-featured HTTP request object supporting all methods, custom headers, timeouts, and full response inspection. The most powerful HTTP option in SSJS.
---

`Script.Util.HttpRequest` is the most flexible HTTP client available in SSJS. It supports all HTTP methods, custom headers, timeouts, and gives you full access to response status codes, headers, and body.

{% include callout.html type="note" content="`Script.Util.HttpRequest` does **not** require `Platform.Load`. It is available in all SSJS contexts." %}

## Syntax

```javascript
var req = new Script.Util.HttpRequest(url);
req.method = "GET";                         // HTTP method
req.contentType = "application/json";       // Content-Type for body
req.encoding = "UTF-8";                     // Encoding (default UTF-8)
req.timeout = 30000;                        // Timeout in ms
req.setHeader(name, value);                 // Set a request header
req.postData = body;                        // Request body (POST/PUT/PATCH)
var resp = req.send();
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `method` | string | `"GET"` | HTTP method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| `contentType` | string | `""` | Content-Type header for body |
| `encoding` | string | `"UTF-8"` | Character encoding |
| `timeout` | number | `30000` | Timeout in milliseconds |
| `postData` | string | `""` | Request body (for POST/PUT/PATCH) |

## Methods

| Method | Description |
|--------|-------------|
| `req.setHeader(name, value)` | Add/set a request header |
| `req.send()` | Send the request; returns response object |

## Response Object

The `resp` object returned by `req.send()` has:

| Property | Type | Description |
|----------|------|-------------|
| `resp.statusCode` | number | HTTP status code |
| `resp.content` | CLR string | Response body (must use `String()` to convert) |
| `resp.headers` | object | Response headers |

{% include callout.html type="warning" content="`resp.content` is a CLR string, not a JavaScript string. Always wrap it with `String(resp.content)` before calling `ParseJSON()` or string methods." %}

## Examples

### GET request with auth

```javascript
var token = Platform.Function.Lookup("Config", "accessToken", "key", "sfmcRest");
var req = new Script.Util.HttpRequest("https://mc.rest.example.com/v2/contacts");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + token);
req.setHeader("Accept", "application/json");

try {
    var resp = req.send();
    if (resp.statusCode === 200) {
        var data = Platform.Function.ParseJSON(String(resp.content));
        Platform.Response.SetContentType("application/json");
        Write(Stringify(data));
    } else {
        Write(Stringify({ status: resp.statusCode, statusMessage: "Upstream Error", error: resp.statusCode }));
    }
} catch(e) {
    Write(Stringify({ status: 500, statusMessage: "Internal Server Error", error: e.message }));
}
```

### POST JSON body

```javascript
var payload = Stringify({
    DefinitionKey: "SomeJourneyKey",
    ContactKey: subscriberKey,
    EventDefinitionKey: "APIEvent-...",
    Data: { FirstName: firstName, Plan: planType }
});

var req = new Script.Util.HttpRequest("https://mc.rest.example.com/interaction/v1/events");
req.method = "POST";
req.contentType = "application/json";
req.setHeader("Authorization", "Bearer " + token);
req.postData = payload;

var resp = req.send();
var result = Platform.Function.ParseJSON(String(resp.content));
```

### PUT request (update)

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/items/42");
req.method = "PUT";
req.contentType = "application/json";
req.setHeader("Authorization", "Bearer " + token);
req.postData = Stringify({ name: "Updated Name", active: true });
var resp = req.send();
```

### DELETE request

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/items/42");
req.method = "DELETE";
req.setHeader("Authorization", "Bearer " + token);
var resp = req.send();
```

### With timeout

```javascript
var req = new Script.Util.HttpRequest("https://slow.api.example.com/data");
req.method = "GET";
req.timeout = 10000; // 10 second timeout
req.setHeader("Authorization", "Bearer " + token);
var resp = req.send();
```

## Complete REST API Helper Pattern

```javascript
function callRestApi(method, url, token, body) {
    var req = new Script.Util.HttpRequest(url);
    req.method = method;
    req.setHeader("Authorization", "Bearer " + token);
    req.setHeader("Accept", "application/json");

    if (body) {
        req.contentType = "application/json";
        req.postData = Stringify(body);
    }

    var resp = req.send();
    var parsed = Platform.Function.ParseJSON(String(resp.content) + "");
    return { status: resp.statusCode, data: parsed };
}

var result = callRestApi("GET", "https://api.example.com/v1/users", accessToken, null);
if (result.status === 200) {
    Write("Users: " + result.data.count);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/http-getrequest/">HTTP.GetRequest</a></li>
  <li><a href="/http/http-postrequest/">HTTP.PostRequest</a></li>
  <li><a href="/platform-functions/httpget/">Platform.Function.HTTPGet</a></li>
  <li><a href="/platform-functions/httppost/">Platform.Function.HTTPPost</a></li>
  <li><a href="/best-practices/security/">Security Best Practices</a></li>
</ul>
</div>
