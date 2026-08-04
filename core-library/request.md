---
layout: function
title: Request
parent: Core Library
parent_url: /core-library/
permalink: /core-library/request/
redirect_from:
  - /global-functions/request/
description: Core Library object for reading incoming request values (URL, method, page path, application context) via six zero-arg methods, plus the value getters GetQueryStringParameter and GetFormField. A distinct object from Platform.Request, not an alias.
availability:
  email: false
  cloudpage: true
  automation: false
  triggered_send: false
requires_core_load: true
verification: verified
differs_from_docs: false
test_scripts: complete
syntax: "Request.URL()"
return_type: string
min_args: 0
max_args: 0
---

## Description

The global `Request` object exposes values about the current request via Core Library utility methods. It requires `Platform.Load("core", ...)` before use. It exposes six zero-argument context methods (`URL`, `PagePath`, `Method`, `ApplicationID`, `PackageID`, `ApplicationBaseURL`) plus the single-argument value getters `GetQueryStringParameter(name)` and `GetFormField(name)`.

{% include callout.html type="info" content="**`Request` (Core) and [`Platform.Request`](/platform-objects/platform-request/) are two different objects — not aliases.** They are named alike and overlap in purpose, but their member sets and access styles differ. Core `Request` is a small, method-based set — six zero-arg utility methods (`Request.URL()`, `Request.Method()`, …) plus the single-argument value getters `Request.GetQueryStringParameter(name)` and `Request.GetFormField(name)` — and **requires `Platform.Load(\"core\", ...)`**. `Platform.Request` is a larger HTTP-properties object that works **without** `Platform.Load`, mixing **properties** (`Platform.Request.RequestURL`, `.Method`, `.ClientIP`, …) with **getter methods** (`GetQueryStringParameter()`, `GetCookieValue()`, `GetRequestHeader()`, …). The `Platform.Request`-only members are **not** available on Core `Request`, and Core `Request`'s method style (e.g. `Request.URL()`) has no property equivalent — on `Platform.Request` the closest is the `RequestURL` property. Choose based on what you need; don't assume one mirrors the other." %}

Runtime-verified on a published CloudPage GET: `Request.URL()` returns the full request URL (JavaScript string), `Request.Method()` returns the HTTP verb (`GET`), and `Request.PagePath()`, `Request.ApplicationID()`, `Request.PackageID()`, and `Request.ApplicationBaseURL()` invoke cleanly and return empty strings outside their populating context (`typeof` reports `clr` for those five return values). The value getters `Request.GetQueryStringParameter` and `Request.GetFormField` are Jint functions: the query-string getter returns the parameter value for a present key (e.g. `"hello"`) and `null` for an absent key; `GetFormField` returns `null` on a plain GET even when the same key is present in the query string (it does not read GET query parameters — use `GetQueryStringParameter` for those). Unlike the CLR-backed `Platform.Request` getters, zero-argument or surplus-argument calls on these Core getters return `null` / ignore the extra argument rather than throwing.

{% include test-script.html bundle="core-library--request" chapter="description" %}

## Members

| Member | Returns | Description |
|--------|---------|-------------|
| `Request.URL()` | string | Full request URL. |
| `Request.PagePath()` | string | Path portion of the request. |
| `Request.Method()` | string | HTTP method of the request (`GET`, `POST`). |
| `Request.ApplicationID()` | string | ID of the application handling the request. |
| `Request.PackageID()` | string | ID of the installed package. |
| `Request.ApplicationBaseURL()` | string | Base URL of the application. |
| `Request.GetQueryStringParameter(name)` | string | Value of a named URL query string parameter, or `null` when absent. |
| `Request.GetFormField(name)` | string | Value of a named POST form field, or `null` when absent (does not read GET query parameters). |

{% include test-script.html bundle="core-library--request" chapter="members" %}

## Example

```javascript
Platform.Load("core", "1.1.5");

var requestURL = Request.URL();
var requestMethod = Request.Method();
Write(requestMethod + " " + requestURL);
```

{% include test-script.html bundle="core-library--request" chapter="example" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
</ul>
</div>
