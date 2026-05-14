---
layout: function
title: Script.Util.HttpGet
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/script-util-httpget/
description: HTTP GET request constructor — creates an HttpRequestInstance that caches content for mail sends and supports custom headers.
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

## Syntax

```javascript
new Script.Util.HttpGet(url)
```

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

{% include callout.html type="warning" content="`emptyContentHandling` is defined differently for `HttpGet` compared to `HttpRequest`." %}


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
| `headers` | object | Response headers |
| `returnStatus` | number | A status value: `0` = OK, `1` = Empty URL, `2` = Call failed, `3` = Call succeeded with empty content |
| `statusCode` | number | HTTP status code |

{% include callout.html type="warning" content="`resp.content` is a CLR string, not a JavaScript string. Always wrap it with `String(resp.content)` before calling `ParseJSON()` or string methods." %}
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
  <li><a href="/platform-functions/httpget/">Platform.Function.HTTPGet</a></li>
</ul>
</div>
