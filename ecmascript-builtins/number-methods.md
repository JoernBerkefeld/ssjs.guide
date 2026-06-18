---
layout: page
title: Number Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: Number prototype methods, static constants, and global numeric functions available in SSJS — and which ES6 Number statics are missing.
---

`Number` is fully available in SSJS as an ES3/ES5 object. Instance methods like `toFixed()` and `toString()` work natively. ES6 static methods such as `Number.isInteger()` are not available — use the equivalent global functions or patterns instead.

---

The **ES** column shows the ECMAScript edition that standardized each member.

## Global Numeric Functions

These are standard ECMAScript global functions (not SFMC-proprietary), available without any namespace in all SSJS contexts.

| Function | ES | Returns | Description |
|----------|----|---------|-------------|
| `parseFloat(str)` | ES3 | number | Parse a string and return a floating-point number |
| `parseInt(str[, radix])` | ES3 | number | Parse a string and return an integer |
| `isNaN(val)` | ES3 | boolean | Returns `true` if the value is `NaN` |
| `isFinite(val)` | ES3 | boolean | Returns `true` if the value is a finite number |

```javascript
parseFloat("3.14");      // 3.14
parseInt("255", 16);     // 255 (hex)
isNaN("hello");          // true
isFinite(Infinity);      // false
isFinite(42);            // true
```

---

## Number Instance Methods

| Method | ES | Returns | Description |
|--------|----|---------|-------------|
| `Number.prototype.toFixed(digits)` | ES3 | string | Format with a fixed number of decimal places |
| `Number.prototype.toExponential([digits])` | ES3 | string | Format in exponential notation |
| `Number.prototype.toPrecision([digits])` | ES3 | string | Format to a specified number of significant digits |
| `Number.prototype.toString([radix])` | ES3 | string | Convert to string, optionally in another base |
| `Number.prototype.valueOf()` | ES3 | number | Return the primitive numeric value |

```javascript
var n = 3.14159;
n.toFixed(2);          // "3.14"
n.toPrecision(4);      // "3.142"
n.toExponential(2);    // "3.14e+0"
n.toString();          // "3.14159"
(255).toString(16);    // "ff" (hex)
(255).toString(2);     // "11111111" (binary)
```

---

## Number Constants

ES3/ES5 constants on the `Number` constructor — all available in SSJS.

| Constant | ES | Value | Description |
|----------|----|-------|-------------|
| `Number.MAX_VALUE` | ES3 | `1.7976931348623157e+308` | Largest positive representable number |
| `Number.MIN_VALUE` | ES3 | `5e-324` | Smallest positive non-zero number |
| `Number.NaN` | ES3 | `NaN` | Not-a-Number (same as global `NaN`) |
| `Number.NEGATIVE_INFINITY` | ES3 | `-Infinity` | Negative infinity |
| `Number.POSITIVE_INFINITY` | ES3 | `Infinity` | Positive infinity |

---

## ES6 Static Methods (Not Available)

The following ES6 `Number.*` static methods do not exist in SSJS. Use the global equivalents or inline expressions instead.

| Missing Method | ES | ES5 Alternative |
|----------------|----|-----------------|
| `Number.isFinite(val)` | ES6 | `isFinite(val)` |
| `Number.isNaN(val)` | ES6 | `isNaN(val)` _(note: differs for non-numbers)_ |
| `Number.isInteger(val)` | ES6 | `val === Math.floor(val)` |
| `Number.isSafeInteger(val)` | ES6 | `val === Math.floor(val) && Math.abs(val) <= 9007199254740991` |
| `Number.parseInt(str)` | ES6 | `parseInt(str, 10)` |
| `Number.parseFloat(str)` | ES6 | `parseFloat(str)` |
| `Number.EPSILON` | ES6 | Hardcode `2.220446049250313e-16` if needed |
| `Number.MAX_SAFE_INTEGER` | ES6 | Hardcode `9007199254740991` if needed |
| `Number.MIN_SAFE_INTEGER` | ES6 | Hardcode `-9007199254740991` if needed |

---

## Type Checking Patterns

```javascript
// Check if a value is a number type
typeof val === "number"        // true for NaN and Infinity too

// Check for a real, usable number
isFinite(val)                  // true only if finite and not NaN

// Check for integer
val === Math.floor(val)        // true for whole numbers
val % 1 === 0                  // alternative

// Explicit NaN check
isNaN(val)                     // true if val is NaN (or non-numeric string)
val !== val                    // true only if val is NaN (reliable inline check)
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/math/">Math Object</a></li>
  <li><a href="/platform-functions/format/">Platform.Function.Format</a></li>
</ul>
</div>
