---
layout: page
title: Global Functions
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The standard ECMAScript global functions in SSJS — URI encoding/decoding works but with x-www-form-urlencoded quirks (space becomes +, lowercase hex), while the legacy escape/unescape are missing entirely.
verification: verified
test_scripts: complete
differs_from_docs: true
redirect_from:
    - /global-functions/
---

The standard ECMAScript **global URI functions** — `encodeURI`, `encodeURIComponent`, `decodeURI`, `decodeURIComponent` — all exist and are callable without loading Core. However, the SFMC Jint engine **encodes and decodes like `application/x-www-form-urlencoded`, not RFC 3986**: a space becomes `+` (not `%20`), hex escapes are **lowercase** (`%2f`, not `%2F`), and on the way back a literal `+` becomes a space — in both `decodeURI` and `decodeURIComponent`. The legacy Annex-B `escape` / `unescape` functions are **not defined** at all. The numeric globals (`parseInt`, `parseFloat`, `isNaN`, `isFinite`) are documented under [Number Methods](/ecmascript-builtins/number-methods/).

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available (or `undefined`) — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`encodeURI(uri)`](#encodeuri) | ES3 | ⚠️ Partial | Space → `+` (not `%20`), lowercase hex |
| [`encodeURIComponent(str)`](#encodeuricomponent) | ES3 | ⚠️ Partial | Space → `+`, lowercase hex (`%2f`) |
| [`decodeURI(uri)`](#decodeuri) | ES3 | ⚠️ Partial | Also decodes reserved escapes and `+` → space (acts like `decodeURIComponent`) |
| [`decodeURIComponent(str)`](#decodeuricomponent) | ES3 | ⚠️ Partial | Decodes `+` as a space (form-urlencoded), unlike the spec |
| [`eval(script)`](#eval) | ES3 | ✅ Works | Runs arbitrary source — injection risk; prefer `Platform.Function.ParseJSON` |
| [`escape(str)`](#escape) | ES3 (Annex B) | ❌ Missing | `undefined`; use `encodeURIComponent` |
| [`unescape(str)`](#unescape) | ES3 (Annex B) | ❌ Missing | `undefined`; use `decodeURIComponent` |

---

## encodeURI {#encodeuri}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} Encodes a full URI, leaving reserved characters (`/`, `?`, `:`, `@`, `&`, `=`, `+`, `$`, `#`) intact. In the SFMC Jint engine a **space is encoded as `+`**, not the spec-mandated `%20`, and percent-escapes use **lowercase** hex digits.

```javascript
encodeURI("a b/c?d=1");   // "a+b/c?d=1" in SFMC (spec would give "a%20b/c?d=1")
```

{% include differs-from-mdn.html content="MDN specifies `encodeURI` encodes a space as `%20` and uses uppercase hex; the SFMC Jint engine encodes a space as `+` and emits lowercase hex escapes." %}

{% include test-script.html bundle="ecmascript-builtins--global-functions" chapter="encodeuri" %}

## encodeURIComponent {#encodeuricomponent}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} Encodes a URI component, escaping reserved characters too. Same engine quirks as `encodeURI`: **space → `+`** and **lowercase** hex.

```javascript
encodeURIComponent("a b/c?d=1");   // "a+b%2fc%3fd%3d1" in SFMC (spec: "a%20b%2Fc%3Fd%3D1")
encodeURIComponent("/");           // "%2f" in SFMC (spec: "%2F")
```

{% include differs-from-mdn.html content="MDN specifies `encodeURIComponent` encodes a space as `%20` with uppercase hex; the SFMC Jint engine encodes a space as `+` and emits lowercase hex (e.g. `/` → `%2f`, not `%2F`)." %}

{% include test-script.html bundle="ecmascript-builtins--global-functions" chapter="encodeuricomponent" %}

## decodeURI {#decodeuri}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} Reverses `encodeURI`, decoding percent-escapes back to their characters. The spec requires it to **preserve** escapes for the URI-syntax characters `; / ? : @ & = + $ , #`, but the SFMC Jint engine decodes them anyway — and a literal `+` becomes a space. In practice `decodeURI` is indistinguishable from [`decodeURIComponent`](#decodeuricomponent) here. Malformed escapes do **not** throw a `URIError` either.

```javascript
decodeURI("a%20b/c");   // "a b/c"
decodeURI("%2F");       // "/" in SFMC (spec: "%2F" stays escaped)
decodeURI("a+b");       // "a b" in SFMC (spec: "a+b")
```

{% include differs-from-mdn.html content="MDN specifies `decodeURI` preserves the escape sequences for `; / ? : @ & = + $ , #` and leaves a literal `+` unchanged, and throws a `URIError` on a malformed escape; the SFMC Jint engine decodes those reserved escapes, turns `+` into a space, and returns malformed input unchanged instead of throwing." %}

{% include test-script.html bundle="ecmascript-builtins--global-functions" chapter="decodeuri" %}

## decodeURIComponent {#decodeuricomponent}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} Reverses `encodeURIComponent`, decoding all percent-escapes. In the SFMC Jint engine a literal **`+` is decoded to a space** (form-urlencoded behaviour), which the spec does **not** do.

```javascript
decodeURIComponent("a%20b%2Fc");   // "a b/c"
decodeURIComponent("+");           // " " in SFMC (spec: "+" stays "+")
```

{% include differs-from-mdn.html content="MDN specifies `decodeURIComponent` leaves a literal `+` unchanged; the SFMC Jint engine decodes `+` to a space, matching `application/x-www-form-urlencoded` rather than RFC 3986." %}

{% include test-script.html bundle="ecmascript-builtins--global-functions" chapter="decodeuricomponent" %}

## eval {#eval}

`(ES3)` — ✅ Works. Parses a string of JavaScript source, executes it, and returns the completion value of the last evaluated expression. A non-string argument is returned unchanged. Direct `eval` sees the surrounding local scope, and bare-name Core globals loaded via `Platform.Load` are visible inside the evaluated string. Use it sparingly — it runs arbitrary code and is a common injection risk; prefer `Platform.Function.ParseJSON` for parsing data.

```javascript
Write(eval("1 + 1")); // 2

var x = 5;
Write(eval("x + 10")); // 15

Platform.Load("core", "1.1.5");
Write(eval('Stringify({a:1})')); // {"a":1}
```

{% include test-script.html bundle="ecmascript-builtins--global-functions" chapter="eval" %}

## escape {#escape}

`(ES3, Annex B)` — ❌ Missing. `escape` is **not defined** in the SFMC engine (`typeof escape === "undefined"`; calling it throws `Object expected`). Use [`encodeURIComponent`](#encodeuricomponent) instead.

```javascript
// escape("a b");            // throws "Object expected: escape" in SFMC
encodeURIComponent("a b");   // use this instead
```

{% include test-script.html bundle="ecmascript-builtins--global-functions" chapter="escape" %}

## unescape {#unescape}

`(ES3, Annex B)` — ❌ Missing. `unescape` is **not defined** in the SFMC engine (`typeof unescape === "undefined"`; calling it throws `Object expected`). Use [`decodeURIComponent`](#decodeuricomponent) instead.

```javascript
// unescape("a%20b");           // throws "Object expected: unescape" in SFMC
decodeURIComponent("a%20b");    // use this instead
```

{% include test-script.html bundle="ecmascript-builtins--global-functions" chapter="unescape" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/number-methods/#parseint-global">parseInt / parseFloat / isNaN / isFinite (global)</a></li>
  <li><a href="/ecmascript-builtins/global-values/">Global Values (Infinity, NaN, undefined)</a></li>
</ul>
</div>
