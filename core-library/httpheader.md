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
test_scripts: complete
description: Read, set, and remove named HTTP headers via the Core library HTTPHeader helpers.
---

The `HTTPHeader` object provides Core-library helpers for header access in SSJS. Runtime testing shows `GetValue` reads the **inbound request** headers while `SetValue`/`Remove` operate on **outbound** headers — the two are separate collections, so you cannot read back a value you just set.

{% include callout.html type="warning" content="Requires <code>Platform.Load(\"core\", \"1.1.5\")</code> before use." %}

{% include differs-from-docs.html note="`GetValue` reads inbound headers only, so a header you set with `SetValue` comes back as `null`. `Remove` returns `undefined`, not `\"OK\"`. Official docs also claim `host` cannot be changed; at runtime `SetValue(\"Host\", …)` does emit an outbound `Host` header. `content-length` remains protected (the response keeps the real body length)." %}

{% include test-script.html bundle="core-library--httpheader" chapter="differs-inbound-outbound" label="Show test script — inbound vs outbound and Remove" %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`HTTPHeader.GetValue(name)`](#getvalue) | string \| null | Returns the value of the named **inbound** request header (e.g. `Host`); returns `null` if absent — including for a header set via `SetValue` |
| [`HTTPHeader.SetValue(name, value)`](#setvalue) | void | Sets an **outbound** header value (`content-length` cannot be changed; `host` can) |
| [`HTTPHeader.Remove(headerName)`](#remove) | void | Removes a header entry; returns `undefined` |

{% include test-script.html bundle="core-library--httpheader" chapter="methods" %}

### HTTPHeader.GetValue {#getvalue}

Returns the value of the named **inbound** HTTP request header (e.g. `Host`). Returns `null` when the header is absent — including for a header you set earlier with `SetValue`, because `GetValue` and `SetValue` operate on separate (inbound vs outbound) collections.

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

{% include test-script.html bundle="core-library--httpheader" chapter="getvalue" %}

### HTTPHeader.SetValue {#setvalue}

Sets the value of the named **outbound** HTTP header. The `content-length` header cannot be changed (the response keeps the real body length). Official docs also claim `host` is protected, but `SetValue("Host", …)` does emit an outbound `Host` header. Values set here are not readable via `GetValue`, which reads inbound headers.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name of the header to set |
| `value` | string \| number \| boolean | Yes | Value to assign to the header |

{% include callout.html type="bug" content="A boolean `value` is accepted, but the outbound header uses CLR capitalization (`True` / `False`), not lowercase `true` / `false`. Prefer an explicit string when the exact token matters. See [known bugs](/engine-limitations/known-bugs/#httpheader-setvalue-boolean-clr-true--false)." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
HTTPHeader.SetValue("X-Custom-Header", "example");
```

{% include test-script.html bundle="core-library--httpheader" chapter="setvalue" %}

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

{% include test-script.html bundle="core-library--httpheader" chapter="remove" %}

## See Also

- [`Platform.Request`](/platform-objects/platform-request/) — incoming request data
- [`Platform.Response`](/platform-objects/platform-response/) — response helpers (cookies, redirect, content type)
