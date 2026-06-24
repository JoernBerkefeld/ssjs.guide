---
layout: page
title: Number Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: Number prototype methods, constants, and the global numeric functions in SSJS — plus the ES6 Number statics that are missing and their fallbacks.
---

`Number` instance methods (`toFixed`, `toExponential`, `toPrecision`) and the ES3/ES5 constants work in SSJS. The global numeric functions `parseInt`/`parseFloat`/`isNaN`/`isFinite` work but have parsing caveats. ES6 `Number.*` statics are missing — use the global equivalents.

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
| [`Number.prototype.toExponential(digits)`](#toexponential) | ES3 | ✅ Works | |
| [`Number.prototype.toPrecision(digits)`](#toprecision) | ES3 | ✅ Works | |
| [Constants (`MAX_VALUE`, `MIN_VALUE`, …)](#constants) | ES3 | ✅ Works | |
| [`parseInt(str, radix)`](#parseint-global) | ES3 | ⚠️ Partial | `NaN` on trailing non-numeric chars |
| [`parseFloat(str)`](#parsefloat-global) | ES3 | ⚠️ Partial | `NaN` on trailing non-numeric chars; 32-bit precision |
| [`Number.isInteger(val)`](#isinteger) | ES6 | ❌ Missing | `typeof n === "number" && Math.floor(n) === n` |
| [`Number.isNaN(val)`](#isnan) | ES6 | ❌ Missing | Use the global `isNaN(value)` |
| [`Number.isFinite(val)`](#isfinite) | ES6 | ❌ Missing | Use the global `isFinite(value)` |
| [`Number.parseInt(str)`](#parseint) | ES6 | ❌ Missing | Use the global `parseInt(string, 10)` |
| [`Number.MAX_SAFE_INTEGER`](#max_safe_integer) | ES6 | ❌ Missing | `undefined` — use the literal `9007199254740991` |

---

## toFixed {#tofixed}

`(ES3)` — ✅ Works. Formats a number with a fixed number of decimal places.

```javascript
(3.14159).toFixed(2);   // "3.14"
```

## toExponential {#toexponential}

`(ES3)` — ✅ Works. Formats in exponential notation.

```javascript
(3.14159).toExponential(2);   // "3.14e+0"
```

## toPrecision {#toprecision}

`(ES3)` — ✅ Works. Formats to a number of significant digits.

```javascript
(3.14159).toPrecision(4);   // "3.142"
```

## Constants {#constants}

`(ES3)` — ✅ Works. `Number.MAX_VALUE`, `Number.MIN_VALUE`, `Number.NaN`, `Number.NEGATIVE_INFINITY`, `Number.POSITIVE_INFINITY` are all available.

```javascript
Number.MAX_VALUE;          // 1.7976931348623157e+308
Number.POSITIVE_INFINITY;  // Infinity
```

## parseInt (global) {#parseint-global}

`(ES3)` — ⚠️ Partial. The global `parseInt(str[, radix])` returns `NaN` when the string has **trailing non-numeric characters** (e.g. `parseInt("10px", 10)` is `NaN`, not `10`). Strip non-digits before parsing.

```javascript
parseInt("42", 10);     // 42
parseInt("255", 16);    // 255
parseInt("10px", 10);   // NaN in SFMC (spec would give 10)
```

## parseFloat (global) {#parsefloat-global}

`(ES3)` — ⚠️ Partial. The global `parseFloat(str)` returns `NaN` on trailing non-numeric characters and uses 32-bit precision — compare with a tolerance rather than `===`.

```javascript
parseFloat("3.14");    // 3.14 (32-bit precision)
parseFloat("1.5kg");   // NaN in SFMC (spec would give 1.5)
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

`(ES6)` — ❌ Missing. `Number.MAX_SAFE_INTEGER` is `undefined` in SFMC. Use the literal `9007199254740991`. The related `Number.EPSILON` (`2.220446049250313e-16`), `Number.MIN_SAFE_INTEGER` (`-9007199254740991`), and `Number.isSafeInteger` are likewise unavailable.

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
