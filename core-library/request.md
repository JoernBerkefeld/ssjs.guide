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
syntax: "Request.URL()"
return_type: string
min_args: 0
max_args: 0
---

## Description

The global `Request` object exposes values about the current request via Core Library utility methods. It requires `Platform.Load("core", ...)` before use. It exposes six zero-argument context methods (`URL`, `PagePath`, `Method`, `ApplicationID`, `PackageID`, `ApplicationBaseURL`) plus the single-argument value getters `GetQueryStringParameter(name)` and `GetFormField(name)`.

{% include callout.html type="info" content="**`Request` (Core) and [`Platform.Request`](/platform-objects/platform-request/) are two different objects — not aliases.** They are named alike and overlap in purpose, but their member sets and access styles differ. Core `Request` is a small, method-based set — six zero-arg utility methods (`Request.URL()`, `Request.Method()`, …) plus the single-argument value getters `Request.GetQueryStringParameter(name)` and `Request.GetFormField(name)` — and **requires `Platform.Load(\"core\", ...)`**. `Platform.Request` is a larger HTTP-properties object that works **without** `Platform.Load`, mixing **properties** (`Platform.Request.RequestURL`, `.Method`, `.ClientIP`, …) with **getter methods** (`GetQueryStringParameter()`, `GetCookieValue()`, `GetRequestHeader()`, …). The `Platform.Request`-only members are **not** available on Core `Request`, and Core `Request`'s method style (e.g. `Request.URL()`) has no property equivalent — on `Platform.Request` the closest is the `RequestURL` property. Choose based on what you need; don't assume one mirrors the other." %}

Runtime-verified on a published CloudPage GET: `Request.URL()` returns the full request URL, `Request.Method()` returns the HTTP verb (`GET`), and `Request.PagePath()`, `Request.ApplicationID()`, `Request.PackageID()`, and `Request.ApplicationBaseURL()` invoke cleanly and return empty strings outside their populating context. The value getters `Request.GetQueryStringParameter("probeParam")` and `Request.GetFormField("probeParam")` also invoke cleanly: the query-string getter returned the parameter value for a present key (`"hello"`) and `null` for an absent key. Unlike the CLR-backed `Platform.Request` getters, these bare-name Core methods are Jint functions — a zero-argument or surplus-argument call returns `null` / ignores the extra argument rather than throwing.

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
| `Request.GetFormField(name)` | string | Value of a named form field (POST, or GET query value), or `null` when absent. |

## Example

```javascript
Platform.Load("core", "1.1.5");

var requestURL = Request.URL();
var requestMethod = Request.Method();
Write(requestMethod + " " + requestURL);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
</ul>
</div>
