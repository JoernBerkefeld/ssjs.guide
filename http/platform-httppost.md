---
layout: page
title: Platform.Function.HTTPPost
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/platform-httppost/
description: AMPscript-compatible HTTP POST function available in SSJS — sends a POST request with a body payload and returns the response.
---

`Platform.Function.HTTPPost` is an AMPscript-compatible function available in SSJS. It sends an HTTP POST request with a body payload and returns the response body as a string. No `Platform.Load` is required.

## Syntax

```javascript
var body = Platform.Function.HTTPPost(url, contentType, payload [, headerNames, headerValues [, returnCodeAndResponse]]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body (e.g. `"application/json"`) |
| `payload` | string | Yes | Request body |
| `headerNames` | string[] | No | Array of additional header names |
| `headerValues` | string[] | No | Array of corresponding header values |
| `returnCodeAndResponse` | boolean | No | When `true`, returns `[statusCode, body]` instead of just the body |

## Return Value

By default, returns the response body as a string. When `returnCodeAndResponse` is `true`, returns a two-element array: `[httpStatusCode, responseBody]`.

## Examples

### Simple JSON POST

```javascript
var payload = Stringify({ event: "signup", email: "jane@example.com" });
var body = Platform.Function.HTTPPost(
    "https://api.example.com/events",
    "application/json",
    payload
);
var result = Platform.Function.ParseJSON(body + "");
```

### POST with auth header and status code

```javascript
var payload = Stringify({ subscriberKey: "sub_jane", status: "Active" });
var headerNames = ["Authorization"];
var headerValues = ["Bearer " + accessToken];
var res = Platform.Function.HTTPPost(
    "https://api.example.com/subscribers",
    "application/json",
    payload,
    headerNames,
    headerValues,
    true
);
var statusCode = res[0];
var responseBody = res[1];

if (statusCode !== 200) {
    Write("Error: " + statusCode + " — " + responseBody);
}
```

### POST form data

```javascript
var payload = "firstName=Jane&lastName=Doe&email=jane%40example.com";
var body = Platform.Function.HTTPPost(
    "https://forms.example.com/submit",
    "application/x-www-form-urlencoded",
    payload
);
```

## Notes

{% include callout.html type="note" content="Use `returnCodeAndResponse: true` whenever you need to check whether the request succeeded. Without it, a non-2xx response silently returns the error body with no way to distinguish it from a success." %}

Available in all SSJS execution contexts — no `Platform.Load` required.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/httppost/">Platform.Function.HTTPPost (full API reference)</a></li>
  <li><a href="/http/platform-httpget/">Platform.Function.HTTPGet</a></li>
  <li><a href="/http/http-post/">HTTP.Post</a></li>
  <li><a href="/http/http-postrequest/">HTTP.PostRequest</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
