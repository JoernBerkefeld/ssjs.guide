---
layout: page
title: Boolean
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The Boolean constructor in SSJS — coercion via Boolean(value) returns a primitive but classifies negative numbers and empty arrays as falsy, and boxed new Boolean() objects carry several Jint quirks.
verification: verified
differs_from_docs: true
test_scripts: complete
---

The ECMAScript **`Boolean`** constructor works in SSJS, but the SFMC Jint engine deviates from the specification in several places. `Boolean(value)` returns a genuine primitive `boolean`, yet it classifies **negative numbers** and **empty arrays** as falsy, and the primitive it returns carries **no methods** (there is no auto-boxing). The boxed `new Boolean(value)` form is worse: it stringifies with a **capitalized** first letter (`True` / `False`), a boxed `false` is **falsy**, and `.valueOf()` does not unwrap to a primitive. Prefer the function-call form `Boolean(value)` (or `!!value`), and compare values explicitly rather than relying on truthiness.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available (or `undefined`) — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Boolean(value)`](#boolean-coercion) | ES3 | ⚠️ Partial | Returns a primitive `boolean`, but negative numbers and `[]` coerce to `false` |
| [`new Boolean(value)`](#boolean-boxed) | ES3 | ⚠️ Partial | Boxed object; capitalized `True`/`False`, falsy when boxing `false` |
| [`Boolean.prototype`](#boolean-prototype) | ES3 | ✅ Works | `toString` / `valueOf` present; `.call()` on a primitive gives the spec form |
| [`<boxed>.valueOf()`](#boolean-boxed) | ES3 | ⚠️ Partial | Does **not** unwrap — returns the boxed object itself |
| [`<boxed>.toString()`](#boolean-boxed) | ES3 | ⚠️ Partial | Returns capitalized `"True"`/`"False"` instead of lowercase |

---

## Boolean(value) — coercion {#boolean-coercion}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} Called as a plain function, `Boolean(value)` returns a primitive `boolean` (`typeof` is `"boolean"`). The classification is correct for the common cases, but the engine treats a number as truthy only when it is **greater than zero**, so every negative number is falsy. An empty array is also falsy, because objects are coerced through `ToPrimitive` first.

```javascript
Boolean(1);        // true
Boolean(0);        // false
Boolean("");       // false
Boolean("x");      // true
Boolean("0");      // true
Boolean(null);     // false
typeof Boolean(1); // "boolean"

// SFMC deviations:
Boolean(-1);       // false in SFMC (spec: true)
Boolean(-0.5);     // false in SFMC (spec: true)
Boolean([]);       // false in SFMC (spec: true)
Boolean([0]);      // true
```

The primitive returned has **no methods** — there is no auto-boxing, so calling `.toString()` or `.valueOf()` on it throws `Object expected`. Use `String(...)` instead, or call through the prototype (see [`Boolean.prototype`](#boolean-prototype)).

```javascript
var b = Boolean(1);
b.toString();            // throws: Object expected: toString
String(b);               // "true"  — use this
true.toString();         // "true"  — a literal does work
```

{% include differs-from-mdn.html content="Three deviations. (1) The engine coerces a number with the rule `n > 0`, so `Boolean(-1)` is `false` where MDN specifies `true`. (2) `Boolean([])` is `false`; MDN specifies every object — including an empty array — is truthy. (3) The returned primitive is not auto-boxed, so `Boolean(1).toString()` throws instead of returning `\"true\"`. Compare numbers explicitly (`n !== 0`), test arrays with `.length`, and use `String(value)` for stringification." %}

{% include test-script.html bundle="ecmascript-builtins--boolean" chapter="coercion" %}

## new Boolean(value) — boxed object {#boolean-boxed}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} `new Boolean(value)` creates a boxed `Boolean` object (`typeof` is `"object"`), but almost every observable behaviour deviates from the specification: the string form is capitalized, a boxed `false` is **falsy** (in standard JavaScript every object is truthy), `.valueOf()` returns the boxed object rather than the wrapped primitive, and `instanceof Boolean` is `false`. Avoid this form entirely — use `Boolean(value)` or `!!value`.

```javascript
var b = new Boolean(false);
typeof b;                     // "object"
String(new Boolean(true));    // "True" in SFMC (spec: "true")
String(new Boolean(false));   // "False" in SFMC (spec: "false")

if (b) { /* NOT entered */ }  // falsy in SFMC (spec: truthy — it is an object)
!!b;                          // false in SFMC (spec: true)

typeof b.valueOf();           // "object" in SFMC (spec: "boolean")
b.valueOf() === b;            // true in SFMC — valueOf does not unwrap
b instanceof Boolean;         // false in SFMC (spec: true)
b.constructor === Boolean;    // true
```

{% include differs-from-mdn.html content="MDN specifies a boxed Boolean stringifies to lowercase `\"true\"`/`\"false\"`; the SFMC Jint engine capitalizes the first letter (`\"True\"`/`\"False\"`). Prefer the primitive coercion form `Boolean(value)` or `!!value`." %}

{% include test-script.html bundle="ecmascript-builtins--boolean" chapter="capitalized-boxed-string" label="Show test script — capitalized stringification" %}

{% include differs-from-mdn.html content="Beyond stringification, a boxed Boolean also breaks three other MDN guarantees: `new Boolean(false)` is **falsy** in a condition (MDN: every object is truthy), `.valueOf()` returns the boxed object instead of the wrapped primitive, and `instanceof Boolean` is `false`. There is no reliable way to unwrap a boxed Boolean — do not create one." %}

{% include test-script.html bundle="ecmascript-builtins--boolean" chapter="boxed" %}

## Boolean.prototype {#boolean-prototype}

`(ES3)` — ✅ Works. `Boolean.prototype` exists and exposes `toString`, `valueOf`, and `constructor`. Because a primitive boolean is not auto-boxed in this engine, calling these through `.call()` is the reliable way to invoke them on a primitive — and doing so returns the correct **lowercase** spec form.

```javascript
typeof Boolean.prototype;            // "object"
typeof Boolean.prototype.toString;   // "function"
typeof Boolean.prototype.valueOf;    // "function"

Boolean.prototype.toString.call(true);        // "true"  (correct, lowercase)
Boolean.prototype.toString.call(Boolean(1));  // "true"  (works where .toString() throws)
Boolean.prototype.valueOf.call(true);         // true

// but on a boxed instance the capitalization quirk still applies:
Boolean.prototype.toString.call(new Boolean(true));  // "True" (spec: "true")
```

{% include test-script.html bundle="ecmascript-builtins--boolean" chapter="prototype" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/number-methods/">Number Methods</a></li>
  <li><a href="/ecmascript-builtins/global-values/">Global Values</a></li>
</ul>
</div>
