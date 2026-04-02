---
layout: category
title: Platform Objects
description: Global Platform namespace objects for loading libraries, bridging AMPscript variables, managing HTTP responses, reading requests, and detecting client environments.
nav_order: 5
has_children: true
---

The `Platform` namespace exposes a set of objects beyond `Platform.Function.*` that give you direct control over the execution environment. These are available without loading the Core library.

## Objects in this Section

| Object | Description |
|--------|-------------|
| [`Platform.Load`](/platform-objects/platform-load/) | Load SSJS library namespaces (Core, etc.) |
| [`Platform.Variable`](/platform-objects/platform-variable/) | Read and write AMPscript variables |
| [`Platform.Response`](/platform-objects/platform-response/) | Control HTTP response (status, redirect, content-type) |
| [`Platform.Request`](/platform-objects/platform-request/) | Read HTTP request data (query string, POST, headers, cookies) |
| [`Platform.ClientBrowser`](/platform-objects/platform-clientbrowser/) | Detect browser type, version, and capabilities |
| [`Platform.Recipient`](/platform-objects/platform-recipient/) | Read subscriber attributes and sendable DE fields for the current recipient |

---

## Platform.Load

Before using the Core library (`DataExtension`, `Subscriber`, `HTTP`, etc.), you must call:

```javascript
Platform.Load("core", "1.1.5");
```

This must appear at the **top of your script block**, before any Core library calls. See [Platform.Load](/platform-objects/platform-load/) for details on available libraries and version numbers.

---

## Platform.Variable

The AMPscript–SSJS variable bridge. Read and write AMPscript variables from SSJS:

```javascript
var email = Platform.Variable.GetValue("@email");
Platform.Variable.SetValue("@result", "processed");
```

---

## Platform.Request

Read everything about the incoming HTTP request:

```javascript
var method = Platform.Request.Method;                        // "GET" or "POST"
var q = Platform.Request.GetQueryStringParameter("q");       // URL query param
var body = Platform.Request.GetPostData();                   // raw POST body
var header = Platform.Request.GetRequestHeader("X-Token");  // request header
var cookie = Platform.Request.GetCookieValue("sessionId");  // cookie value
```

---

## Platform.Response

Control the HTTP response before output is sent:

```javascript
Platform.Response.SetResponseCode(404, "Not Found");
Platform.Response.SetContentType("application/json");
Platform.Response.Redirect("https://example.com");
```
