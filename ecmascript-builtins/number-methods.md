---
layout: page
title: Number Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: Number prototype methods and the global numeric functions in SSJS — plus the Number statics and constants that are missing (including the classic ES3 constants) and their fallbacks.
verification: verified
differs_from_docs: true
---

`Number` instance methods (`toFixed`, `toExponential`, `toPrecision`, `toString`, `valueOf`) work in SSJS. The global numeric functions `parseInt`/`parseFloat`/`isNaN`/`isFinite` work but have parsing caveats. **Every `Number.*` static and constant is missing** — even the classic ES3 constants (`Number.MAX_VALUE`, `Number.NaN`, …) are `undefined` in the SFMC Jint engine, unlike standard JavaScript. Use the global identifiers or numeric literals instead.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available (or `undefined`) — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Number.prototype.toFixed(digits)`](#tofixed) | ES3 | ✅ Works | |
| [`Number.prototype.toExponential(digits)`](#toexponential) | ES3 | ⚠️ Partial | No-arg form pads trailing zeros — always pass `digits` |
| [`Number.prototype.toPrecision(digits)`](#toprecision) | ES3 | ✅ Works | |
| [`Number.prototype.toString(radix)`](#tostring) | ES3 | ⚠️ Partial | `radix` only supports 2, 8, 10, 16 — others throw "Invalid Base." |
| [`Number.prototype.valueOf()`](#valueof) | ES3 | ✅ Works | |
| [`parseInt(str, radix)`](#parseint-global) | ES3 | ⚠️ Partial | `NaN` on trailing non-numeric chars |
| [`parseFloat(str)`](#parsefloat-global) | ES3 | ⚠️ Partial | `NaN` on trailing non-numeric chars; 32-bit precision |
| [Constants (`MAX_VALUE`, `NaN`, `POSITIVE_INFINITY`, …)](#constants) | ES3 | ❌ Missing | All `undefined` in SFMC — {% include method-status.html status="differs-from-docs" %} use global identifiers / literals |
| [`Number.isInteger(val)`](#isinteger) | ES6 | ❌ Missing | `typeof n === "number" && Math.floor(n) === n` |
| [`Number.isNaN(val)`](#isnan) | ES6 | ❌ Missing | Use the global `isNaN(value)` |
| [`Number.isFinite(val)`](#isfinite) | ES6 | ❌ Missing | Use the global `isFinite(value)` |
| [`Number.parseInt(str)`](#parseint) | ES6 | ❌ Missing | Use the global `parseInt(string, 10)` |
| [`Number.MAX_SAFE_INTEGER`](#max_safe_integer) | ES6 | ❌ Missing | `undefined` — use the literal `9007199254740991` |

---

## toFixed {#tofixed}

`(ES3)` — ✅ Works. Formats a number with a fixed number of decimal places and returns a string.

```javascript
(3.14159).toFixed(2);   // "3.14"
(9.99).toFixed();       // "10"
(-3.14159).toFixed(2);  // "-3.14"
```

## toExponential {#toexponential}

`(ES3)` — ⚠️ Partial. Formats in exponential notation. When called **without** an argument, the SFMC Jint engine pads the significand with trailing zeros instead of the minimal standard form, so always pass an explicit digit count.

```javascript
(123456).toExponential(2);   // "1.23e+5"
(3.14159).toExponential();   // "3.1415900000000000e+0" in SFMC (spec would give "3.14159e+0")
```

## toPrecision {#toprecision}

`(ES3)` — ✅ Works. Formats to a number of significant digits.

```javascript
(3.14159).toPrecision(4);   // "3.142"
(123.456).toPrecision(5);   // "123.46"
```

## toString {#tostring}

`(ES3)` — ⚠️ Partial. Returns the number as a string. The optional `radix` only accepts **2, 8, 10, or 16** in the SFMC Jint engine — any other base throws `"Invalid Base."` (standard JavaScript supports 2–36). Fractional values are truncated to their integer part before non-decimal conversion.

```javascript
(255).toString();     // "255"
(255).toString(16);   // "ff"
(255).toString(2);    // "11111111"
(35).toString(36);    // throws "Invalid Base." in SFMC
(3.5).toString(2);    // "100" in SFMC (spec would give "11.1")
```

## valueOf {#valueof}

`(ES3)` — ✅ Works. Returns the primitive number value.

```javascript
(42).valueOf();   // 42
```

## parseInt (global) {#parseint-global}

`(ES3)` — ⚠️ Partial. The global `parseInt(str[, radix])` returns `NaN` when the string has **trailing non-numeric characters** (e.g. `parseInt("10px", 10)` is `NaN`, not `10`). Strip non-digits before parsing. Radix parsing itself follows the spec.

```javascript
parseInt("42", 10);     // 42
parseInt("255", 16);    // 597  (2×256 + 5×16 + 5 — standard base-16 parse)
parseInt("0x1F");       // 31   (auto-detects hex prefix)
parseInt("10px", 10);   // NaN in SFMC (spec would give 10)
```

## parseFloat (global) {#parsefloat-global}

`(ES3)` — ⚠️ Partial. The global `parseFloat(str)` returns `NaN` on trailing non-numeric characters and uses 32-bit precision — compare with a tolerance rather than `===`.

```javascript
parseFloat("3.14");           // 3.14000010490417 (32-bit precision)
parseFloat("3.14") === 3.14;  // false in SFMC — never compare parsed floats with ===
parseFloat("1.5kg");          // NaN in SFMC (spec would give 1.5)
```

## Constants {#constants}

`(ES3)` — ❌ Missing. {% include method-status.html status="differs-from-docs" %} **Every `Number` constant is `undefined` in the SFMC Jint engine**, even the classic ES3 ones. This diverges from standard JavaScript, where these are always present.

```javascript
Number.MAX_VALUE;          // undefined in SFMC (spec: 1.7976931348623157e+308)
Number.MIN_VALUE;          // undefined in SFMC (spec: 5e-324)
Number.NaN;                // undefined in SFMC — use the global NaN or 0/0
Number.POSITIVE_INFINITY;  // undefined in SFMC
Number.NEGATIVE_INFINITY;  // undefined in SFMC
```

Use the global identifiers or literals instead — but note that even the global `Infinity` is unreliable in this engine: `(Infinity > 0)` returns `false` and it stringifies with an **inverted sign** (`String(Infinity)` → `"-infinity"`). The global `NaN` behaves correctly (`NaN !== NaN` is `true`).

```javascript
var MAX_VALUE = 1.7976931348623157e308;   // literal fallback
var isNotANumber = (value !== value);      // reliable NaN test
```

## Number.isInteger {#isinteger}

`(ES6)` — ❌ Missing. Use `typeof n === "number" && Math.floor(n) === n`.

```javascript
function isInteger(n) { return typeof n === "number" && Math.floor(n) === n; }
```

## Number.isNaN {#isnan}

`(ES6)` — ❌ Missing. Use the global `isNaN(value)` (note: the global coerces non-numbers, unlike `Number.isNaN`).

```javascript
isNaN(NaN);       // true
value !== value;  // reliable inline NaN check
```

## Number.isFinite {#isfinite}

`(ES6)` — ❌ Missing. Use the global `isFinite(value)`.

```javascript
isFinite(42);         // true
isFinite(Infinity);   // false
```

## Number.parseInt {#parseint}

`(ES6)` — ❌ Missing. Use the global `parseInt(string, 10)`.

```javascript
parseInt("42", 10);   // 42
```

## Number.MAX_SAFE_INTEGER {#max_safe_integer}

`(ES6)` — ❌ Missing. `Number.MAX_SAFE_INTEGER` is `undefined` in SFMC. Use the literal `9007199254740991`. The related `Number.EPSILON` (`2.220446049250313e-16`), `Number.MIN_SAFE_INTEGER` (`-9007199254740991`), `Number.parseFloat`, and `Number.isSafeInteger` are likewise unavailable.

```javascript
var MAX_SAFE_INTEGER = 9007199254740991;
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/math/">Math Object</a></li>
  <li><a href="/platform-functions/format/">Platform.Function.Format</a></li>
</ul>
</div>
