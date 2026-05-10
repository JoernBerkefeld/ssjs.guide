---
layout: page
title: HTTPHeader
parent: Platform Objects
parent_url: /platform-objects/
description: Read, set, and remove named HTTP headers via the Core library HTTPHeader helpers.
---

The `HTTPHeader` object provides Core-library helpers for header access in SSJS (see official docs for whether a given call applies to the inbound request or outbound response in your context).

{% include callout.html type="warning" content="Requires <code>Platform.Load(\"core\", \"1.1.5\")</code> before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `HTTPHeader.GetValue(name)` | string | Returns the value of the named HTTP header |
| `HTTPHeader.SetValue(name, value)` | void | Sets a header value (`host` and `content-length` cannot be changed) |
| `HTTPHeader.Remove(headerName)` | string | Removes a header entry; returns `"OK"` |

## Examples

```javascript
Platform.Load("core", "1.1.5");

HTTPHeader.SetValue("X-Custom-Header", "example");
var prior = HTTPHeader.GetValue("X-Custom-Header");
HTTPHeader.Remove("X-Custom-Header");
```

## See Also

- [`Platform.Request`](/platform-objects/platform-request/) — incoming request data
- [`Platform.Response`](/platform-objects/platform-response/) — response helpers (cookies, redirect, content type)
