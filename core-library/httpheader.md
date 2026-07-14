---
layout: page
title: HTTPHeader
parent: Core Library
parent_url: /core-library/
permalink: /core-library/httpheader/
redirect_from:
  - /platform-objects/httpheader/
verification: differs
differs_from_docs: "Runtime-verified: GetValue reads INBOUND request headers (e.g. Host, User-Agent) and returns null for a header you just set with SetValue — GetValue and SetValue operate on separate (inbound vs outbound) collections. Remove returns undefined, not \"OK\"."
description: Read, set, and remove named HTTP headers via the Core library HTTPHeader helpers.
---

The `HTTPHeader` object provides Core-library helpers for header access in SSJS. Runtime testing shows `GetValue` reads the **inbound request** headers while `SetValue`/`Remove` operate on **outbound** headers — the two are separate collections, so you cannot read back a value you just set.

{% include callout.html type="warning" content="Requires <code>Platform.Load(\"core\", \"1.1.5\")</code> before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `HTTPHeader.GetValue(name)` | string | Returns the value of the named **inbound** request header (e.g. `Host`, `User-Agent`); returns `null` if absent — including for a header set via `SetValue` |
| `HTTPHeader.SetValue(name, value)` | void | Sets an **outbound** header value (`host` and `content-length` cannot be changed) |
| `HTTPHeader.Remove(headerName)` | void | Removes a header entry; returns `undefined` |

## Examples

```javascript
Platform.Load("core", "1.1.5");

// Read an inbound request header:
var host = HTTPHeader.GetValue("Host");
Write(host);

// Set / remove outbound headers (not readable back via GetValue):
HTTPHeader.SetValue("X-Custom-Header", "example");
HTTPHeader.Remove("X-Custom-Header");
```

## See Also

- [`Platform.Request`](/platform-objects/platform-request/) — incoming request data
- [`Platform.Response`](/platform-objects/platform-response/) — response helpers (cookies, redirect, content type)
