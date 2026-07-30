---
layout: page
title: Global Values
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The ECMAScript global value properties in SSJS — undefined works, NaN mostly works (lowercase string), but Infinity is severely broken (sign inverted in comparisons and string coercion), and the ES2020 globalThis is missing.
verification: verified
differs_from_docs: true
test_scripts: complete
---

The ECMAScript **global value properties** have mixed support in SSJS. `undefined` works exactly as expected and `NaN` behaves correctly for comparisons (only its string form is lowercase). **`Infinity` is severely broken** in the SFMC Jint engine: its sign is inverted in both numeric comparisons and string coercion (`Infinity > 0` returns `false`, `String(Infinity)` yields `-infinity`). The ES2020 `globalThis` is **not defined**.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available (or `undefined`) — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`undefined`](#undefined) | ES3 | ✅ Works | |
| [`NaN`](#nan) | ES3 | ⚠️ Partial | `String(NaN)` is lowercase `nan` |
| [`Infinity`](#infinity) | ES3 | ⚠️ Partial | **Sign inverted**: `Infinity > 0` is `false`, `String(Infinity)` is `-infinity` |
| [`globalThis`](#globalthis) | ES2020 | ❌ Missing | `undefined` — no global-object reference is exposed |

---

## undefined {#undefined}

`(ES3)` — ✅ Works. The primitive `undefined` value. `typeof undefined` is `"undefined"`, an unassigned declared variable is `undefined`, and `String(undefined)` is `"undefined"`.

```javascript
var x;
(typeof x === "undefined");   // true
(undefined === undefined);    // true
String(undefined);            // "undefined"
```

{% include test-script.html bundle="ecmascript-builtins--global-values" chapter="undefined" %}

## NaN {#nan}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} The not-a-number value. Comparisons behave correctly — `NaN === NaN` is `false`, `isNaN(NaN)` is `true`. Only its **string coercion is lowercase** (`nan`) instead of the spec's `NaN`.

```javascript
(NaN === NaN);    // false
isNaN(NaN);       // true
String(NaN);      // "nan" in SFMC (spec: "NaN")
```

{% include differs-from-mdn.html content="MDN specifies `String(NaN)` produces `\"NaN\"`; the SFMC Jint engine produces the lowercase `\"nan\"`. Comparison semantics are unaffected." %}

{% include test-script.html bundle="ecmascript-builtins--global-values" chapter="nan" %}

## Infinity {#infinity}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} **The `Infinity` global is broken in the SFMC Jint engine.** `typeof Infinity` is `"number"` and `Infinity === (1/0)` holds, but its **sign is inverted** everywhere else: `Infinity > 0` returns `false`, `Infinity < 0` returns `true`, and `String(Infinity)` yields `-infinity`. Symmetrically, `-Infinity` (and `-1/0`) compares as **positive** and stringifies to `infinity`. Even `Infinity > 1e308` returns `false`. Do **not** rely on `Infinity`/`-Infinity` for magnitude comparisons or output — compare against a concrete large numeric literal instead.

```javascript
typeof Infinity;      // "number"
Infinity > 0;         // false  (BUG — should be true)
Infinity < 0;         // true   (BUG)
String(Infinity);     // "-infinity"  (BUG — sign inverted, lowercase)
String(-Infinity);    // "infinity"   (BUG)
Infinity > 1e308;     // false  (BUG)
```

{% include differs-from-mdn.html content="MDN specifies `Infinity` is a positive value greater than any finite number and `String(Infinity)` is `\"Infinity\"`. The SFMC Jint engine inverts the sign of `Infinity`/`-Infinity` in both comparison and string coercion (`Infinity > 0` is `false`, `String(Infinity)` is `\"-infinity\"`), making the global unreliable for magnitude checks and output. Prefer comparing against a concrete numeric literal." %}

{% include test-script.html bundle="ecmascript-builtins--global-values" chapter="infinity" %}

## globalThis {#globalthis}

`(ES2020)` — ❌ Missing. `globalThis` is **not defined** in the SFMC engine (`typeof globalThis === "undefined"`). There is no standard reference to the global object; top-level `this` is also unusable (referencing `this` at top scope crashes the CloudPage). Reference the specific globals (`Platform`, `Variable`, …) you need directly.

```javascript
(typeof globalThis === "undefined");   // true — not available
```

{% include test-script.html bundle="ecmascript-builtins--global-values" chapter="globalthis" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/number-methods/">Number Methods (POSITIVE_INFINITY / NaN constants)</a></li>
  <li><a href="/ecmascript-builtins/global-functions/">Global Functions (isNaN, isFinite, encode/decode)</a></li>
</ul>
</div>
