---
layout: page
title: HTTPHeader
parent: Core Library
parent_url: /core-library/
permalink: /core-library/httpheader/
redirect_from:
  - /platform-objects/httpheader/
verification: verified
differs_from_docs: true
description: Read, set, and remove named HTTP headers via the Core library HTTPHeader helpers.
---

The `HTTPHeader` object provides Core-library helpers for header access in SSJS. Runtime testing shows `GetValue` reads the **inbound request** headers while `SetValue`/`Remove` operate on **outbound** headers — the two are separate collections, so you cannot read back a value you just set.

{% include callout.html type="warning" content="Requires <code>Platform.Load(\"core\", \"1.1.5\")</code> before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`HTTPHeader.GetValue(name)`](#getvalue) | string | Returns the value of the named **inbound** request header (e.g. `Host`, `User-Agent`); returns `null` if absent — including for a header set via `SetValue` |
| [`HTTPHeader.SetValue(name, value)`](#setvalue) | void | Sets an **outbound** header value (`host` and `content-length` cannot be changed) |
| [`HTTPHeader.Remove(headerName)`](#remove) | void | Removes a header entry; returns `undefined` |

### HTTPHeader.GetValue {#getvalue}

Returns the value of the named **inbound** HTTP request header (e.g. `Host`, `User-Agent`). Returns `null` when the header is absent — including for a header you set earlier with `SetValue`, because `GetValue` and `SetValue` operate on separate (inbound vs outbound) collections.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name of the HTTP header to read |

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var host = HTTPHeader.GetValue("Host");
Write(host);
```

### HTTPHeader.SetValue {#setvalue}

Sets the value of the named **outbound** HTTP header. The `host` and `content-length` headers cannot be changed. Values set here are not readable via `GetValue`, which reads inbound headers.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name of the header to set |
| `value` | string | Yes | Value to assign to the header |

#### Examples

```javascript
Platform.Load("core", "1.1.5");
HTTPHeader.SetValue("X-Custom-Header", "example");
```

### HTTPHeader.Remove {#remove}

Removes the named entry from the HTTP header. Returns `undefined` — call it for its side effect only.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headerName` | string | Yes | Name of the header to remove |

#### Examples

```javascript
Platform.Load("core", "1.1.5");
HTTPHeader.Remove("X-Custom-Header"); // no useful return value
```

## See Also

- [`Platform.Request`](/platform-objects/platform-request/) — incoming request data
- [`Platform.Response`](/platform-objects/platform-response/) — response helpers (cookies, redirect, content type)
