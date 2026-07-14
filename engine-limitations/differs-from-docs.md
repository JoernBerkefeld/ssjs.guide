---
layout: page
title: Differs from Official Docs
parent: Engine Limitations
parent_url: /engine-limitations/
description: Every SSJS function, object, and property whose runtime behavior in the SFMC engine differs from the official Salesforce documentation — return types, required arguments, null vs empty-string results, and more. Each entry is runtime-verified on a live CloudPage.
---

The official Salesforce SSJS documentation contains a number of inaccuracies: wrong return types, arguments listed as optional that are actually required, properties that exist but are undocumented, and members that behave differently than described. Every entry below has been **runtime-verified on a live CloudPage** and is flagged in the reference pages with a {% include callout.html type="warning" title="Differs from official Salesforce docs" content="…" %} note.

This page is the single, growing catalog of those discrepancies. Each row links to the method's main reference page, where the same discrepancy is documented inline.

{% include callout.html type="info" content="This differs from [Known Bugs](/engine-limitations/known-bugs/): entries here are cases where the docs are simply **inaccurate** about how a working feature behaves. Known Bugs covers features that are outright **broken** or that **do not exist at runtime** despite being documented." %}

## Globals

### Request (bare-name global) — more reliable than Platform.Request

[Reference: Request](/global-functions/request/)

The bare-name global `Request` works after `Platform.Load("core", "1.1.5")` and is **more reliable than `Platform.Request` for `.URL()`**: `Request.URL()` returns the full request URL as a string, whereas `Platform.Request.URL()` throws *"Unable to retrieve security descriptor for this frame."* in CloudPages. Other members (`PagePath`, `Method`, `ApplicationID`, `PackageID`, `ApplicationBaseURL`) return CLR values (empty in a plain CloudPage GET, with `Method` = `"GET"`). Prefer the bare-name `Request` in CloudPages.

### Error — new Error("msg") does not expose .message

[Reference: Error](/global-functions/error/)

Unlike standard JavaScript, a JS-constructed `new Error("msg")` in the SFMC Jint engine does **not** expose the message via `.message` — `err.message` reads back `undefined`, and `Stringify(err)` surfaces only a hidden `{jintException}` (the .NET stack), not the message. Recover the message with `String(err)` or `("" + err)` (both yield the constructor argument), or `err.toString()` (yields `"Error: undefined"`). This differs from **engine-raised** errors, which DO carry `.message` + `.description`. Do not rely on `new Error(...).message`.

### HTTPHeader (bare-name global) — separate inbound/outbound collections

[Reference: HTTPHeader](/core-library/httpheader/)

Available after `Platform.Load("core", ...)`. `GetValue` reads **inbound** request headers and returns `null` for a header you set via `SetValue` (separate inbound vs outbound collections). `Remove` returns `undefined`, not the `"OK"` string implied by some docs.

### Redirect (bare-name global) — does not exist at runtime

[Reference: Redirect](/global-functions/redirect/)

The bare-name global `Redirect` is `undefined` under **every** Core version tested (`"1"`, `"1.1.1"`, `"1.1.5"`) — `Platform.Load` does not inject it at all, contrary to the official example. Calling it throws a `ReferenceError`. Use `Platform.Response.Redirect(url, movedPermanently)` instead, which is always available. (Also listed in [Known Bugs](/engine-limitations/known-bugs/#bare-name-redirect-does-not-exist).)

### ErrorUtil (bare-name global) — only in Core "1"

[Reference: ErrorUtil](/wsproxy/errorutil/)

`ErrorUtil` is provided **only** by `Platform.Load("Core", "1")`. Under newer Core versions (`"1.1.1"`, `"1.1.5"`, …) it is `undefined`. Effectively deprecated in Core > 1. Prefer checking `result.Status` and throwing `new Error(...)` instead of `ErrorUtil.ThrowWSProxyError`.

## Global Functions

### Attribute.GetValue — works in CloudPages, returns "" when no recipient

[Reference: Attribute](/global-functions/attribute/)

After `Platform.Load("Core", ...)` the `Attribute` object exists and `Attribute.GetValue(name)` executes and returns a string — it is **not** unavailable in CloudPages, contrary to what the docs imply. When no subscriber/attribute is in context (e.g. an anonymous CloudPage GET) it returns an **empty string** rather than throwing. In email/triggered-send/personalized contexts it returns the actual attribute value.

## Platform Functions

### Platform.Function.HTTPGet — returns the body, and all 6 args are required

[Reference: Platform.Function.HTTPGet](/platform-functions/httpget/)

The official docs are wrong on two counts:

1. They state this returns a **numeric status**, but it actually returns the **response body as a string**; the numeric status is written to the `statusVariable` out-parameter (`statusVariable[0]`).
2. They list `emptyContentHandling`, `headerNames`, `headerValues`, and `statusVariable` as optional, but runtime testing shows **all six arguments are required** — the call throws a security-descriptor error otherwise. Pass `null` for unused header arrays.

## Platform Objects

### Platform.Request.GetQueryStringParameter — returns null (not "") when absent

[Reference: Platform.Request](/platform-objects/platform-request/)

For an **absent** parameter this returns `null` (`typeof "object"`), **not** an empty string — the docs give no indication of the empty-vs-null behavior. A present parameter returns its string value. Guard reads with a truthiness / `!= null` check.

### Platform.Request.GetFormField — returns null (not "") when absent

[Reference: Platform.Request](/platform-objects/platform-request/)

For an **absent** field this returns `null` (`typeof "object"`), **not** an empty string.

### Platform.Request.GetCookieValue — returns null (not "") when absent

[Reference: Platform.Request](/platform-objects/platform-request/)

For an **absent** cookie this returns `null` (`typeof "object"`), **not** an empty string.

### Platform.Request.GetUserLanguages — throws in a plain CloudPage GET

[Reference: Platform.Request](/platform-objects/platform-request/)

Throws *"Unable to retrieve security descriptor for this frame."* in a plain CloudPage GET context. Wrap in `try/catch` or avoid; may only work in specific contexts.

### Platform.Variable.GetValue — returns null (not "") when never set

[Reference: Platform.Variable](/platform-objects/platform-variable/)

When the variable was **never set** this returns `null` (`typeof "object"`), **not** an empty string. A variable explicitly set to `""` returns `""`. The leading `@` is optional — `GetValue("v")` and `GetValue("@v")` return the same value. (The bare-name `Variable` alias only exists **after** `Platform.Load("core", ...)`.)

### Platform.Recipient.GetAttributeValue — returns "" outside a send, does not throw

[Reference: Platform.Recipient](/platform-objects/platform-recipient/)

Does **not** throw outside a send context — in a plain CloudPage it returns `""` (empty string, `typeof "string"`) for any attribute because no recipient is bound. The bare-name `Recipient` alias is **not** available even after `Platform.Load`; use `Platform.Recipient.GetAttributeValue(...)` (or `Attribute.GetValue(...)` after load).

## HTTP Functions

### Script.Util.HttpRequest.timeout — undocumented but works

[Reference: Script.Util.HttpRequest](/http/script-util-httprequest/)

Not listed as a configuration property in the official docs (which only mention that `send()` times out after 30 seconds), but the property exists and is applied at runtime.

### Script.Util.HttpRequest.emptyContentHandling — numeric, not boolean

[Reference: Script.Util.HttpRequest](/http/script-util-httprequest/)

The official docs type this as a **boolean**, but the runtime accepts only a **numeric** value (`0`/`1`/`2`) and rejects `true`/`false` — identical to `Script.Util.HttpGet`.

### Script.Util.HttpRequest response headers — not indexable

[Reference: Script.Util.HttpRequest](/http/script-util-httprequest/)

The official example reads a single header via `headers["..."]`, but that access throws *"Use of CLR is not allowed"* at runtime. Individual values are only readable by parsing the `for..in` enumeration keys (shaped `"[Name, Value]"`), not by indexing.

### Script.Util.HttpGet.timeout — undocumented but works

[Reference: Script.Util.HttpGet](/http/script-util-httpget/)

Not listed in the official docs, but the property exists and is applied end-to-end at runtime (same behavior as on `Script.Util.HttpRequest`).
