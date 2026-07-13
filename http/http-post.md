---
layout: page
title: HTTP.Post
parent: HTTP & REST APIs
parent_url: /http/
permalink: /http/post/
redirect_from:
  - /http/http-post/
description: Core library HTTP POST — posts a payload and returns an object with StatusCode and Response. Requires Platform.Load.
verification: verified
differs_from_docs: true
---

`HTTP.Post` sends a POST with the given content type and body. It returns an **object** with two fields: `StatusCode` (the HTTP status as a **number**) and `Response` (an array whose first element `Response[0]` is the response body string).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
var response = HTTP.Post(url, contentType, payload[, headerNames, headerValues]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body |
| `payload` | string | Yes | Request body string |
| `headerNames` | string[] | No | Header names (co-required with `headerValues`) |
| `headerValues` | string[] | No | Values paired with `headerNames` (co-required) |

{% include differs-from-docs.html note="The official docs list `headerNames` and `headerValues` as required, but the runtime accepts a 3-argument call (`url`, `contentType`, `payload`); the two header arrays are optional and only need to be paired when supplied." %}

## Return value

Returns an **object** (not a bare string) with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `StatusCode` | number | HTTP status code of the response |
| `Response` | string[] | Array whose first element `Response[0]` is the response body |

{% include differs-from-docs.html note="The official docs type `StatusCode` as a string and `Response` as a single string, but the runtime returns `StatusCode` as a number and `Response` as an array whose first element (`Response[0]`) holds the body." %}

Note that `HTTP.Post` uses different field names than [`HTTP.Get`](/http/get/), which returns `{ Status, Content }`.

## Example

```javascript
Platform.Load("core", "1.1.5");

var payload = Stringify({
    event: "form_submit",
    email: submitterEmail,
    timestamp: Platform.Function.Now()
});

var response = HTTP.Post(
    "https://api.example.com/events",
    "application/json",
    payload,
    ["X-API-Key"],
    ["mysecretkey"]
);

if (response.StatusCode == 200) {
    var result = Platform.Function.ParseJSON(String(response.Response[0]));
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/get/">HTTP.Get</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/platform-functions/httppost/">Platform.Function.HTTPPost</a></li>
</ul>
</div>
