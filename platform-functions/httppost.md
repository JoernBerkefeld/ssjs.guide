---
layout: function
title: HTTPPost
parent: Platform Functions
parent_url: /platform-functions/
description: Sends an HTTP POST request to the specified URL with a body payload and returns the HTTP status code of a successful response.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.HTTPPost(url, contentType, payload[, headerNames, headerValues, response])"
return_type: number
min_args: 3
max_args: 6
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |
| `contentType` | string | Yes | MIME type of the request body, e.g. `"application/json"` |
| `payload` | string | Yes | Request body |
| `headerNames` | string[] | 6-arg form only | Array of additional header names (pass `null` when none). Part of the all-or-nothing trailing group. |
| `headerValues` | string[] | 6-arg form only | Array of corresponding header values (pass `null` when none). Part of the all-or-nothing trailing group. |
| `response` | array | 6-arg form only | Array intended to receive the response body. **Unreliable** — observed empty even on successful (200) responses (see below). Part of the all-or-nothing trailing group. |

Only two call forms are valid: the **3-argument** call `HTTPPost(url, contentType, payload)`, or the **full 6-argument** call. The trailing three arguments (`headerNames`, `headerValues`, `response`) are an all-or-nothing group — supply all three together or none.

{% include differs-from-docs.html note="The argument count is a discontinuous overload, not a simple range. The docs list `headerNames`, `headerValues` and `response` as independently optional, but at runtime only the 3-argument or full 6-argument form works." %}

{% include test-script.html bundle="platform-functions--httppost" chapter="arity-overload" label="Show test script — only 3 and 6 arguments are valid" %}

{% include callout.html type="warning" content="The `response` out-parameter is unreliable: in runtime tests it stayed empty (`response.length` was `0` and `response[0]` was `undefined`) even for successful `200` requests. Read the HTTP status from the return value, and use [`HTTP.Post`](/http/post/) or [`Script.Util.HttpRequest`](/http/script-util-httprequest/) when you need the response body." %}

{% include test-script.html bundle="platform-functions--httppost" chapter="parameters" %}

## Examples

```javascript
// Valid form 1 - the 3-argument call. Read the status code from the return value.
var payload = Stringify({ event: "pageview", page: "/home" });
try {
    var statusCode = Platform.Function.HTTPPost(
        "https://api.example.com/events",
        "application/json",
        payload
    );
    if (statusCode == 200) {
        Write("posted");
    }
} catch (ex) {
    // an HTTP error response (4xx / 5xx) throws instead of returning its status code
    Write("failed");
}

// Valid form 2 - the full 6-argument call with an auth header (the trailing three are all-or-nothing)
var response = [];
var code = Platform.Function.HTTPPost(
    "https://api.example.com/track",
    "application/json",
    payload,
    ["Authorization"],
    ["Bearer " + token],
    response
);
// code is the HTTP status code (number). response[0] is unreliable (observed empty) -
// use HTTP.Post or Script.Util.HttpRequest to read the body.
```

{% include test-script.html bundle="platform-functions--httppost" chapter="examples" %}

## Return Value

Returns the HTTP status code as a number — but only for a **successful** response. An HTTP error response (4xx or 5xx) does not return its status code: the call throws instead, so failures must be caught rather than inspected. Redirects are followed, so a redirecting URL reports the status of the final response.

The `response` array out-parameter is documented to receive the body as `response[0]`, but is unreliable at runtime (see the warning above) — do not depend on it.

{% include differs-from-docs.html note="The official docs present the return value as the HTTP status code of whatever the server answered, and their own example branches on `statusCode == 200`. At runtime only a successful status is ever returned — a 4xx or 5xx response throws \"An error occurred when attempting to evaluate a HTTPPost function call.\" instead, so a failing status code can never be observed from the return value. The docs example also reads the body from `response[0]`, which stays empty even on success; `HTTP.Post` delivers the body under `Response[0]`." %}

{% include test-script.html bundle="platform-functions--httppost" chapter="errors-throw-not-return" label="Show test script — error statuses throw instead of being returned" %}

{% include test-script.html bundle="platform-functions--httppost" chapter="return-value" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/httpget/">HTTPGet</a></li>
  <li><a href="/http/post/">HTTP.Post</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
