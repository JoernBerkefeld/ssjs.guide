---
layout: page
title: Global Functions
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The standard ECMAScript global functions in SSJS — URI encoding/decoding works but with x-www-form-urlencoded quirks (space becomes +, lowercase hex), while the legacy escape/unescape are missing entirely.
verification: verified
differs_from_docs: true
redirect_from:
    - /global-functions/
---

The standard ECMAScript **global URI functions** — `encodeURI`, `encodeURIComponent`, `decodeURI`, `decodeURIComponent` — all exist and are callable without loading Core. However, the SFMC Jint engine **encodes like `application/x-www-form-urlencoded`, not RFC 3986**: a space becomes `+` (not `%20`) and hex escapes are **lowercase** (`%2f`, not `%2F`). The legacy Annex-B `escape` / `unescape` functions are **not defined** at all. The numeric globals (`parseInt`, `parseFloat`, `isNaN`, `isFinite`, `eval`) are documented under [Number Methods](/ecmascript-builtins/number-methods/#parseint-global).

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available (or `undefined`) — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`encodeURI(uri)`](#encodeuri) | ES3 | ⚠️ Partial | Space → `+` (not `%20`), lowercase hex — {% include method-status.html status="differs-from-docs" %} |
| [`encodeURIComponent(str)`](#encodeuricomponent) | ES3 | ⚠️ Partial | Space → `+`, lowercase hex (`%2f`) — {% include method-status.html status="differs-from-docs" %} |
| [`decodeURI(uri)`](#decodeuri) | ES3 | ✅ Works | |
| [`decodeURIComponent(str)`](#decodeuricomponent) | ES3 | ⚠️ Partial | Decodes `+` as a space (form-urlencoded), unlike the spec — {% include method-status.html status="differs-from-docs" %} |
| [`escape(str)`](#escape) | ES3 (Annex B) | ❌ Missing | `undefined`; use `encodeURIComponent` |
| [`unescape(str)`](#unescape) | ES3 (Annex B) | ❌ Missing | `undefined`; use `decodeURIComponent` |

---

## encodeURI {#encodeuri}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="differs-from-docs" %} Encodes a full URI, leaving reserved characters (`/`, `?`, `:`, `@`, `&`, `=`, `+`, `$`, `#`) intact. In the SFMC Jint engine a **space is encoded as `+`**, not the spec-mandated `%20`, and percent-escapes use **lowercase** hex digits.

```javascript
encodeURI("a b/c?d=1");   // "a+b/c?d=1" in SFMC (spec would give "a%20b/c?d=1")
```

{% include differs-from-docs.html note="MDN specifies `encodeURI` encodes a space as `%20` and uses uppercase hex; the SFMC Jint engine encodes a space as `+` and emits lowercase hex escapes." %}

## encodeURIComponent {#encodeuricomponent}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="differs-from-docs" %} Encodes a URI component, escaping reserved characters too. Same engine quirks as `encodeURI`: **space → `+`** and **lowercase** hex.

```javascript
encodeURIComponent("a b/c?d=1");   // "a+b%2fc%3fd%3d1" in SFMC (spec: "a%20b%2Fc%3Fd%3D1")
encodeURIComponent("/");           // "%2f" in SFMC (spec: "%2F")
```

{% include differs-from-docs.html note="MDN specifies `encodeURIComponent` encodes a space as `%20` with uppercase hex; the SFMC Jint engine encodes a space as `+` and emits lowercase hex (e.g. `/` → `%2f`, not `%2F`)." %}

## decodeURI {#decodeuri}

`(ES3)` — ✅ Works. Reverses `encodeURI`, decoding percent-escapes back to their characters while leaving reserved characters intact.

```javascript
decodeURI("a%20b/c");   // "a b/c"
```

## decodeURIComponent {#decodeuricomponent}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="differs-from-docs" %} Reverses `encodeURIComponent`, decoding all percent-escapes. In the SFMC Jint engine a literal **`+` is decoded to a space** (form-urlencoded behaviour), which the spec does **not** do.

```javascript
decodeURIComponent("a%20b%2Fc");   // "a b/c"
decodeURIComponent("+");           // " " in SFMC (spec: "+" stays "+")
```

{% include differs-from-docs.html note="MDN specifies `decodeURIComponent` leaves a literal `+` unchanged; the SFMC Jint engine decodes `+` to a space, matching `application/x-www-form-urlencoded` rather than RFC 3986." %}

## escape {#escape}

`(ES3, Annex B)` — ❌ Missing. `escape` is **not defined** in the SFMC engine (`typeof escape === "undefined"`; calling it throws `Object expected`). Use [`encodeURIComponent`](#encodeuricomponent) instead.

```javascript
// escape("a b");            // throws "Object expected: escape" in SFMC
encodeURIComponent("a b");   // use this instead
```

## unescape {#unescape}

`(ES3, Annex B)` — ❌ Missing. `unescape` is **not defined** in the SFMC engine (`typeof unescape === "undefined"`; calling it throws `Object expected`). Use [`decodeURIComponent`](#decodeuricomponent) instead.

```javascript
// unescape("a%20b");           // throws "Object expected: unescape" in SFMC
decodeURIComponent("a%20b");    // use this instead
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/number-methods/#parseint-global">parseInt / parseFloat / isNaN / isFinite (global)</a></li>
  <li><a href="/ecmascript-builtins/global-values/">Global Values (Infinity, NaN, undefined)</a></li>
</ul>
</div>
