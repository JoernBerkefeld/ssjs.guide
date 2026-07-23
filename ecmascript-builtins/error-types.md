---
layout: page
title: Error Types
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/error-types/
description: Which JavaScript error constructors exist in the SFMC engine — the seven legacy Error subtypes (Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError) are present, while the ES2021+ AggregateError, SuppressedError, and the non-standard InternalError are missing.
verification: verified
differs_from_docs: true
---

The SFMC server-side JavaScript engine (Jint, an ES3/ES5-era dialect) provides the **seven legacy `Error` subtype constructors** but **none** of the newer aggregate/suppressed error types. This page catalogs each constructor's runtime status; for the base `Error` constructor's full parameter and message-shape details, see the dedicated [`Error()`](/ecmascript-builtins/error/) page.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Present | Constructor exists and produces a throwable error object |
| ❌ Missing | Not available (`typeof` is `"undefined"`; `new` throws `Unknown type`) |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Error()`](/ecmascript-builtins/error/) | ES3 | ✅ Present | Base constructor — see its own page |
| [`EvalError()`](#evalerror) | ES3 | ✅ Present | Same shape as `Error` |
| [`RangeError()`](#rangeerror) | ES3 | ✅ Present | Same shape as `Error` |
| [`ReferenceError()`](#referenceerror) | ES3 | ✅ Present | Same shape as `Error` |
| [`SyntaxError()`](#syntaxerror) | ES3 | ✅ Present | Same shape as `Error` |
| [`TypeError()`](#typeerror) | ES3 | ✅ Present | Same shape as `Error` |
| [`URIError()`](#urierror) | ES3 | ✅ Present | Same shape as `Error` |
| [`AggregateError()`](#aggregateerror) | ES2021 | ❌ Missing | `typeof AggregateError === "undefined"` |
| [`SuppressedError()`](#suppressederror) | ES2026 | ❌ Missing | `typeof SuppressedError === "undefined"` |
| [`InternalError()`](#internalerror) | Non-standard | ❌ Missing | Firefox-only; `typeof InternalError === "undefined"` |

## Shared behaviour of the present subtypes

All seven present constructors (`Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, `URIError`) behave identically to each other, and identically to the base [`Error`](/ecmascript-builtins/error/) constructor:

- `new SubType("msg")` and `SubType("msg")` (without `new`) both return an `object`.
- `.name` correctly reflects the subtype (e.g. `"TypeError"`, `"RangeError"`).
- **`.message` reads back `undefined`** — the constructor argument is lost. Recover it with `String(err)` or `("" + err)`; `err.toString()` returns `"<name>: undefined"`.
- `.description` is `undefined`.
- `Stringify(err)` returns `{}` (empty) for a JS-constructed subtype.

{% include differs-from-mdn.html content="In standard JavaScript a caught error is an instance of its constructor and of Error, but in the SFMC (Jint) engine `instanceof` returns false for both — e.g. `caught instanceof RangeError` and `caught instanceof Error` are both false even when the caught value was created with `new RangeError(...)`. Detect the type via `err.name` instead of `instanceof`." %}

{% include differs-from-mdn.html content="In standard JavaScript `new TypeError(\"msg\").message` returns `\"msg\"`, but in the SFMC engine every JS-constructed error subtype reports `.message` as `undefined`; the message is only recoverable via `String(err)` or `(\"\" + err)`." %}

## EvalError {#evalerror}

`(ES3)` — ✅ Present. Constructible; shares the [common subtype behaviour](#shared-behaviour-of-the-present-subtypes). `.name` is `"EvalError"`.

```javascript
var e = new EvalError("bad eval");
Write(e.name);       // "EvalError"
Write(String(e));    // "bad eval"  (e.message is undefined)
```

## RangeError {#rangeerror}

`(ES3)` — ✅ Present. Constructible; `.name` is `"RangeError"`.

```javascript
var e = new RangeError("out of range");
Write(e.name);       // "RangeError"
Write(String(e));    // "out of range"
```

## ReferenceError {#referenceerror}

`(ES3)` — ✅ Present. Constructible; `.name` is `"ReferenceError"`.

```javascript
var e = new ReferenceError("missing var");
Write(e.name);       // "ReferenceError"
```

## SyntaxError {#syntaxerror}

`(ES3)` — ✅ Present. Constructible; `.name` is `"SyntaxError"`.

```javascript
var e = new SyntaxError("bad token");
Write(e.name);       // "SyntaxError"
```

## TypeError {#typeerror}

`(ES3)` — ✅ Present. Constructible; `.name` is `"TypeError"`. The most useful subtype for guarding against wrong argument types in your own helpers.

```javascript
function requireString(v) {
    if (typeof v != "string") {
        throw new TypeError("expected a string");
    }
    return v;
}
try {
    requireString(42);
} catch (e) {
    Write(e.name + ": " + String(e)); // "TypeError: expected a string"
}
```

## URIError {#urierror}

`(ES3)` — ✅ Present. Constructible; `.name` is `"URIError"`. Note that the URI functions themselves (`decodeURI` etc.) do not throw `URIError` on malformed input in this engine — see [Global Functions](/ecmascript-builtins/global-functions/).

```javascript
var e = new URIError("bad uri");
Write(e.name);       // "URIError"
```

## Missing error types {#missing-error-types}

The following newer or non-standard error constructors are **not defined** in the SFMC engine. Use the base [`Error`](/ecmascript-builtins/error/) constructor instead.

### AggregateError {#aggregateerror}

`(ES2021)` — ❌ Missing. `AggregateError` (used with `Promise.any`) is **not defined** — `typeof AggregateError === "undefined"` and `new AggregateError(...)` throws `Unknown type: AggregateError`. Since `Promise` itself is absent, there is no scenario that would produce one.

### SuppressedError {#suppressederror}

`(ES2026)` — ❌ Missing. `SuppressedError` (paired with `using` / disposable resources) is **not defined** — `typeof SuppressedError === "undefined"`.

### InternalError {#internalerror}

`(Non-standard)` — ❌ Missing. `InternalError` is a Firefox-only, non-standard error type and is **not defined** in the SFMC engine — `typeof InternalError === "undefined"`.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/error/">Error()</a></li>
  <li><a href="/language/error-handling/">Error Handling Guide</a></li>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/platform-functions/raiseerror/">Platform.Function.RaiseError</a></li>
</ul>
</div>
