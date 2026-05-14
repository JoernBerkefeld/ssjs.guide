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
req.emptyContentHandling = false;           // throw if no content returned
req.retries = 2;                            // Number of retries on failure
req.continueOnError = true;                 // If true, don't throw on HTTP error status
var resp = req.send();
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Destination URL |

## HttpRequestInstance Properties

The `req` object returned by `Script.Util.HttpRequest(url)` has these properties you can set to configure the request:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `method` | `"GET"`,`"POST"`,`"PUT"`,`"PATCH"`,`"DELETE"` | `"GET"` | HTTP method |
| `contentType` | string | `""` | Content-Type header for body, e.g. `"application/json"` |
| `encoding` | string | `"UTF-8"` | Character encoding |
| `timeout` | number | `30000` | Timeout in milliseconds |
| `postData` | string | `""` | Request body (for POST/PUT/PATCH) |
| `emptyContentHandling` | boolean | `false` | If `false`, throws an exception when no content is returned; if `true`, continues without throwing |
| `retries` | number | `1` | The number of times to retry the request before throwing an exception |
| `continueOnError` | boolean | `false` | If `true`, continues after receiving a non-fatal error; if `false`, throws an exception |

{% include callout.html type="warning" content="`emptyContentHandling` is defined differently for `HttpGet` compared to `HttpRequest`." %}

## HttpRequestInstance Methods

The `req` object returned by `Script.Util.HttpRequest(url)` has these methods you can call to configure the request:

| Method | Returns | Description |
|--------|---------|-------------|
| `clearHeaders()` | void | Remove all custom headers |
| `removeHeader(name)` | void | Remove a specific header by name |
| `send()` | `HttpResponseInstance` | Send the request |
| `setHeader(name, value)` | void | Set a custom request header |

## HttpResponseInstance Properties

{% include callout.html type="info" content="`resp.content` is equal for `HttpGet` and `HttpRequest`." %}

The `resp` object returned by `req.send()` has these properties:

| Property | Type | Description |
|----------|------|-------------|
| `content` | CLR string | Response body (must use `String()` to convert) |
| `contentType` | string | The content type returned in the response |
| `encoding` | string | The encoding type returned in the response |
| `headers` | object | Response headers |
| `returnStatus` | number | A status value: `0` = OK, `1` = Empty URL, `2` = Call failed, `3` = Call succeeded with empty content |
| `statusCode` | number | HTTP status code |

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

### clearHeaders

Removes all custom headers previously set on the request.

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + token);
req.clearHeaders(); // removes Authorization and all other custom headers
var resp = req.send();
```

### removeHeader

Removes a specific header from the request by name.

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + token);
req.setHeader("X-Debug", "1");
req.removeHeader("X-Debug");
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
  <li><a href="/http/script-util-httpget/">Script.Util.HttpGet</a></li>
  <li><a href="/http/http-get/">HTTP.Get</a></li>
  <li><a href="/http/http-post/">HTTP.Post</a></li>
  <li><a href="/platform-functions/httpget/">Platform.Function.HTTPGet</a></li>
  <li><a href="/platform-functions/httppost/">Platform.Function.HTTPPost</a></li>
  <li><a href="/best-practices/security/">Security Best Practices</a></li>
</ul>
</div>
