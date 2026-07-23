---
layout: page
title: Boolean
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The Boolean constructor in SSJS — coercion via Boolean(value) works correctly, but boxed new Boolean() objects and their string form carry SFMC Jint quirks (capitalized "True"/"False").
verification: verified
differs_from_docs: true
---

The ECMAScript **`Boolean`** constructor works in SSJS. Called as a function, `Boolean(value)` performs correct truthiness coercion. The **boxed** `new Boolean(value)` object form also works, but the SFMC Jint engine stringifies a boxed boolean with a **capitalized** first letter (`True` / `False`) instead of the spec's lowercase, and `.valueOf()` on a boxed instance does not return a clean primitive in every path. Prefer the function-call coercion form `Boolean(value)` (or `!!value`) and avoid boxed booleans.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available (or `undefined`) — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Boolean(value)`](#boolean-coercion) | ES3 | ✅ Works | Truthiness coercion — returns a primitive `boolean` |
| [`new Boolean(value)`](#boolean-boxed) | ES3 | ⚠️ Partial | Boxed object; `String()` yields capitalized `True`/`False` |
| [`Boolean.prototype`](#boolean-prototype) | ES3 | ✅ Works | `toString` / `valueOf` present on the prototype |

---

## Boolean(value) — coercion {#boolean-coercion}

`(ES3)` — ✅ Works. Called as a plain function, `Boolean(value)` returns a primitive `boolean` reflecting the value's truthiness.

```javascript
Boolean(1);     // true
Boolean(0);     // false
Boolean("");    // false
Boolean("x");   // true
typeof Boolean(1);   // "boolean"
```

## new Boolean(value) — boxed object {#boolean-boxed}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} `new Boolean(value)` creates a boxed `Boolean` object (`typeof` is `"object"`). In the SFMC Jint engine its string form is **capitalized** — `String(new Boolean(true))` is `"True"`, not the spec's `"true"`. As in all JavaScript, a boxed boolean is always truthy in a condition (even `new Boolean(false)`), so this form is a footgun. Use `Boolean(value)` or `!!value` instead.

```javascript
var b = new Boolean(true);
typeof b;               // "object"
String(new Boolean(true));    // "True" in SFMC (spec: "true")
String(new Boolean(false));   // "False" in SFMC (spec: "false")
// if (new Boolean(false)) { ... }  // truthy! — avoid boxed booleans
```

{% include differs-from-mdn.html content="MDN specifies a boxed Boolean stringifies to lowercase `\"true\"`/`\"false\"`; the SFMC Jint engine capitalizes the first letter (`\"True\"`/`\"False\"`). Prefer the primitive coercion form `Boolean(value)` or `!!value`." %}

## Boolean.prototype {#boolean-prototype}

`(ES3)` — ✅ Works. `Boolean.prototype` exists and exposes `toString` and `valueOf`.

```javascript
typeof Boolean.prototype;            // "object"
typeof Boolean.prototype.toString;   // "function"
typeof Boolean.prototype.valueOf;    // "function"
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/number-methods/">Number Methods</a></li>
  <li><a href="/ecmascript-builtins/global-values/">Global Values</a></li>
</ul>
</div>
