---
layout: function
title: Script.Util.HttpGet
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/script-util-httpget/
description: HTTP GET request constructor — creates an HttpRequestInstance that caches content for mail sends and supports custom headers.
verification: verified
test_scripts: complete
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

{% include test-script.html bundle="http--script-util-httpget" chapter="return-value" %}

## HttpGetInstance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `retries` | number | `1` | Number of retry attempts on failure |
| `continueOnError` | boolean | `false` | If `true`, does not throw on HTTP error status |
| `emptyContentHandling` | number | `0` | Indicates what to do if the GET request doesn’t return any content. `0` = continue, `1` = stop the request, `2` = continue to the next subscriber (only works in email sends) |
| `timeout` | number | `30` | Request timeout in **seconds** |

{% include differs-from-docs.html note="`timeout` is not listed in the official docs, but the property exists and is applied end-to-end at runtime (same behaviour as on `Script.Util.HttpRequest`). Its default value is `30`, matching the 30-second `send()` timeout the docs describe — so the unit is seconds, not milliseconds." %}

{% include test-script.html bundle="http--script-util-httpget" chapter="httpgetinstance-properties" %}

## HttpGetInstance Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `clearHeaders()` | void | Remove all custom headers |
| `removeHeader(name)` | void | Remove a specific header by name |
| `send()` | `HttpResponseInstance` | Send the request |
| `setHeader(name, value)` | void | Set a custom request header |

{% include callout.html type="warning" content="Calling `setHeader()` disables content caching for `HttpGet`." %}

{% include test-script.html bundle="http--script-util-httpget" chapter="httpgetinstance-methods" %}

## HttpResponseInstance Object

{% include callout.html type="bug" content="`HttpGet` returns a response object of the same shape as `HttpRequest`, but its **response metadata is never populated**: `contentType` and `encoding` come back empty and a `for..in` over `headers` yields no real headers. The identical request through [`Script.Util.HttpRequest`](/http/script-util-httprequest/) returns all of them. Use `Script.Util.HttpRequest` whenever you need response headers or the content type." %}

The `resp` object returned by `req.send()` has these properties:

| Property | Type | Description |
|----------|------|-------------|
| `content` | CLR string | Response body (must use `String()` to convert) |
| `contentType` | string | The content type returned in the response — always empty on `HttpGet` (see bug callout above) |
| `encoding` | string | The encoding type returned in the response — always empty on `HttpGet` (see bug callout above) |
| `headers` | object | Response headers as a CLR object — not directly indexable, and on `HttpGet` the enumeration is always empty (see bug callout above) |
| `returnStatus` | number | A status value: `0` = OK, `1` = Empty URL, `2` = Call failed, `3` = Call succeeded with empty content |
| `statusCode` | number | HTTP status code — a CLR value: convert with `Number()` before `===` or `switch` (relational operators like `>= 400` work on it directly) |

{% include callout.html type="warning" content="`resp.content` is a CLR string, not a JavaScript string. Always wrap it with `String(resp.content)` before calling `ParseJSON()` or string methods." %}

{% include callout.html type="warning" content="`resp.statusCode` and `resp.returnStatus` are CLR values, not JavaScript numbers — `resp.statusCode === 200` is always false and `switch (resp.statusCode)` silently falls through to `default`. Convert once with `Number(resp.statusCode)`. **Do not use `==`**: loose equality against a CLR value backed by a .NET null throws `Value cannot be null.`, which is exactly how `resp.contentType` and `resp.encoding` behave on this handler. Relational operators (`>= 400`, `< 300`) are the exception and are correct on the raw value. See [`Script.Util.HttpRequest`](/http/script-util-httprequest/#checking-the-status-code) for the full pattern." %}

{% include callout.html type="bug" content="`resp.content.length` returns **`-1`** regardless of the real body length, while `typeof` already reports `number` — so the usual CLR tell is missing and the wrong answer is invisible on inspection. Use `String(resp.content).length`. Measured on the same response object type via [`Script.Util.HttpRequest`](/http/script-util-httprequest/); not yet re-measured through `HttpGet`." %}

{% include differs-from-docs.html note="The official docs example reads a single header via `resp.headers[\"...\"]`, but that access throws **\"Use of Common Language Runtime (CLR) is not allowed\"** at runtime. On `Script.Util.HttpRequest` headers are still readable by enumerating with `for..in` (see below); on `HttpGet` that enumeration is empty, so headers cannot be read at all." %}

### Reading response headers

Direct access — `resp.headers["Content-Type"]`, `.Get()`, `.Item()`, or `String(resp.headers[key])` — throws **"Use of Common Language Runtime (CLR) is not allowed"**. On `Script.Util.HttpRequest` a `for..in` loop over `resp.headers` yields keys shaped `"[Name, Value]"` — the value is embedded in the key string itself — so the map below can be built without ever reading a CLR value. **On `Script.Util.HttpGet` the same loop yields nothing**, so the helper always returns an empty map; switch to [`Script.Util.HttpRequest`](/http/script-util-httprequest/) when you need headers.

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

{% include test-script.html bundle="http--script-util-httpget" chapter="httpresponseinstance-object" %}

## Examples

### Basic GET request

```javascript
var req = new Script.Util.HttpGet("https://api.example.com/data");
var resp = req.send();
if (Number(resp.statusCode) === 200) {
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
if (Number(resp.statusCode) === 200) {
    var items = Platform.Function.ParseJSON(String(resp.content));
    for (var i = 0; i < items.length; i++) {
        Write(items[i].name + "<br>");
    }
}
```

{% include test-script.html bundle="http--script-util-httpget" chapter="examples" %}

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
