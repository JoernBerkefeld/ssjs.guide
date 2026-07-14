---
layout: function
title: Request (Global Object)
parent: Global Functions
parent_url: /global-functions/
description: Global object for reading incoming request values (URL, method, page path, application context). Behaves like Platform.Request.
availability:
  email: false
  cloudpage: true
  automation: false
  triggered_send: false
requires_core_load: true
verification: verified
differs_from_docs: "Runtime-verified: the bare-name Request global is more reliable than Platform.Request for .URL() — Request.URL() returns the full request URL, whereas Platform.Request.URL() throws \"Unable to retrieve security descriptor for this frame.\" in CloudPages. Other members return CLR values (empty on a plain GET, Method=\"GET\")."
syntax: "Request.URL()"
return_type: string
min_args: 0
max_args: 0
---

{% include callout.html type="info" content="Runtime-verified: prefer the bare-name <code>Request</code> in CloudPages. <code>Request.URL()</code> returns the full request URL, while <code>Platform.Request.URL()</code> throws <em>\"Unable to retrieve security descriptor for this frame.\"</em> The other members return CLR values (empty on a plain CloudPage GET, with <code>Method()</code> = <code>\"GET\"</code>)." %}

## Description

The global `Request` object exposes values about the current request. It behaves like its sibling [`Platform.Request`](/platform-objects/platform-request/) and requires `Platform.Load("core", ...)` before use. Each member is called as a method.

## Members

| Member | Returns | Description |
|--------|---------|-------------|
| `Request.URL()` | string | Full request URL. |
| `Request.PagePath()` | string | Path portion of the request. |
| `Request.Method()` | string | HTTP method of the request (`GET`, `POST`). |
| `Request.ApplicationID()` | string | ID of the application handling the request. |
| `Request.PackageID()` | string | ID of the installed package. |
| `Request.ApplicationBaseURL()` | string | Base URL of the application. |

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
