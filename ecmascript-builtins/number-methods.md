---
layout: page
title: Number Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: Number prototype methods and the global numeric functions in SSJS — plus the classic ES3 constants (defined but several return wrong values), the missing ES6 statics, and their fallbacks.
verification: verified
test_scripts: complete
differs_from_docs: true
---

`Number` instance methods (`toFixed`, `toExponential`, `toPrecision`, `toString`, `valueOf`) work in SSJS. The global numeric functions `parseInt`/`parseFloat`/`isNaN`/`isFinite` work but have parsing caveats. The **classic ES3 constants are defined but several return wrong values** — `Number.MIN_VALUE` is a large negative number and the `Number.*_INFINITY` constants have their signs swapped. The **ES6 statics** (`Number.MAX_SAFE_INTEGER`, `Number.isInteger`, `Number.isNaN`, …) are genuinely `undefined`. Prefer the global identifiers or numeric literals over the unreliable `Number` constants.

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
| [`Number.prototype.toPrecision(digits)`](#toprecision) | ES3 | ⚠️ Partial | `digits` selects decimal places, not significant digits — same as `toFixed(digits - 1)`; argument is mandatory |
| [`Number.prototype.toString(radix)`](#tostring) | ES3 | ⚠️ Partial | `radix` only supports 2, 8, 10, 16 — others throw "Invalid Base." |
| [`Number.prototype.valueOf()`](#valueof) | ES3 | ✅ Works | |
| [`parseInt(str, radix)`](#parseint-global) | ES3 | ⚠️ Partial | `NaN` on trailing non-numeric chars |
| [`parseFloat(str)`](#parsefloat-global) | ES3 | ⚠️ Partial | `NaN` on trailing non-numeric chars; 32-bit precision |
| [Constants (ES3) — `MAX_VALUE`, `NaN`, `POSITIVE_INFINITY`, …](#constants-es3) | ES3 | ⚠️ Partial | Defined but wrong: `MIN_VALUE` negative, `*_INFINITY` signs swapped — use global identifiers / literals |
| [Constants (ES6) — `MAX_SAFE_INTEGER`, `EPSILON`, …](#constants-es6) | ES6 | ❌ Missing | `undefined` — use literals such as `9007199254740991` |
| [`Number.isInteger(val)`](#isinteger) | ES6 | ❌ Missing | `typeof n === "number" && Math.floor(n) === n` |
| [`Number.isNaN(val)`](#isnan) | ES6 | ❌ Missing | Use the global `isNaN(value)` |
| [`Number.isFinite(val)`](#isfinite) | ES6 | ❌ Missing | Use the global `isFinite(value)` |
| [`Number.parseInt(str)`](#parseint) | ES6 | ❌ Missing | Use the global `parseInt(string, 10)` |
| [`Number.parseFloat(str)`](#parsefloat) | ES6 | ❌ Missing | Use the global `parseFloat(string)` |
| [`Number.isSafeInteger(val)`](#issafeinteger) | ES6 | ❌ Missing | Compare against the literal `9007199254740991` |

---

## toFixed {#tofixed}

`(ES3)` — ✅ Works. Formats a number with a fixed number of decimal places and returns a string.

```javascript
(3.14159).toFixed(2);   // "3.14"
(9.99).toFixed();       // "10"
(-3.14159).toFixed(2);  // "-3.14"
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="tofixed" %}

## toExponential {#toexponential}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} Formats in exponential notation. When called **without** an argument, the SFMC Jint engine pads the significand with trailing zeros instead of the minimal standard form, so always pass an explicit digit count.

```javascript
(123456).toExponential(2);   // "1.23e+5"
(3.14159).toExponential();   // "3.1415900000000000e+0" in SFMC (spec would give "3.14159e+0")
```

{% include differs-from-mdn.html content="MDN specifies that `toExponential()` with no argument uses the minimal number of digits needed; the SFMC Jint engine instead pads the significand with trailing zeros — always pass an explicit `fractionDigits`." %}

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="toexponential" %}

## toPrecision {#toprecision}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} In the SFMC Jint engine `toPrecision(digits)` formats to a fixed number of **decimal places**, not significant digits — the result carries `max(1, digits - 1)` decimals, which makes it identical to `toFixed(digits - 1)`. It never switches to exponential notation. The argument is also **mandatory** here, and must be between 1 and 21.

```javascript
(3.14159).toPrecision(4);   // "3.142"  — coincides with the spec result
(123.456).toPrecision(5);   // "123.4560" in SFMC (spec would give "123.46")
(123.456).toPrecision(2);   // "123.5" in SFMC (spec would give "1.2e+2")
(1234567).toPrecision(3);   // "1234567.00" in SFMC (spec would give "1.23e+6")
(123.456).toPrecision();    // throws "precision missing"
(123.456).toPrecision(0);   // throws "precision must be between 1 and 21"
```

Because the argument means decimal places, use [`toFixed`](#tofixed) directly — it expresses the same intent without the misleading name. There is no built-in significant-digit formatter in this engine.

{% include differs-from-mdn.html content="MDN specifies `toPrecision(precision)` formats to that many *significant* digits and switches to exponential notation when the value's exponent falls outside the requested precision; the SFMC Jint engine instead formats to `max(1, precision - 1)` *decimal places* (identical to `toFixed(precision - 1)`) and never produces exponential output. The argument is mandatory in SFMC, whereas MDN specifies the no-argument form behaves like `toString()`." %}

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="toprecision" %}

## toString {#tostring}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} Returns the number as a string. The optional `radix` only accepts **2, 8, 10, or 16** in the SFMC Jint engine — any other base throws `"Invalid Base."` (standard JavaScript supports 2–36). Fractional values are truncated to their integer part before non-decimal conversion.

```javascript
(255).toString();     // "255"
(255).toString(16);   // "ff"
(255).toString(2);    // "11111111"
(35).toString(36);    // throws "Invalid Base." in SFMC
(3.5).toString(2);    // "100" in SFMC (spec would give "11.1")
```

{% include differs-from-mdn.html content="MDN specifies `toString(radix)` accepts any radix from 2 to 36; the SFMC Jint engine supports only 2, 8, 10, and 16 (others throw `\"Invalid Base.\"`) and truncates fractional values before non-decimal conversion (`(3.5).toString(2)` → `\"100\"`, not `\"11.1\"`)." %}

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="tostring" %}

## valueOf {#valueof}

`(ES3)` — ✅ Works. Returns the primitive number value.

```javascript
(42).valueOf();   // 42
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="valueof" %}

## parseInt (global) {#parseint-global}

`(ES3)` — ⚠️ Partial. The global `parseInt(str[, radix])` returns `NaN` when the string has **trailing non-numeric characters** (e.g. `parseInt("10px", 10)` is `NaN`, not `10`). Strip non-digits before parsing. Radix parsing itself follows the spec.

```javascript
parseInt("42", 10);     // 42
parseInt("255", 16);    // 597  (2×256 + 5×16 + 5 — standard base-16 parse)
parseInt("0x1F");       // 31   (auto-detects hex prefix)
parseInt("10px", 10);   // NaN in SFMC (spec would give 10)
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="parseint-global" %}

## parseFloat (global) {#parsefloat-global}

`(ES3)` — ⚠️ Partial. The global `parseFloat(str)` returns `NaN` on trailing non-numeric characters and uses 32-bit precision — compare with a tolerance rather than `===`.

```javascript
parseFloat("3.14");           // 3.14000010490417 (32-bit precision)
parseFloat("3.14") === 3.14;  // false in SFMC — never compare parsed floats with ===
parseFloat("1.5kg");          // NaN in SFMC (spec would give 1.5)
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="parsefloat-global" %}

## Constants (ES3) {#constants-es3}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %} The classic ES3 `Number` constants **are defined** in the SFMC Jint engine (`typeof Number.MAX_VALUE === "number"`), but several **return wrong values**. This diverges from standard JavaScript, where all of these hold their spec values.

```javascript
Number.MAX_VALUE;          // 1.79769313486232e+308 — correct
Number.MIN_VALUE;          // -1.79769313486232e+308 in SFMC — WRONG (spec: 5e-324, smallest positive)
Number.NaN;                // NaN — correct (Number.NaN === Number.NaN is false)
Number.POSITIVE_INFINITY;  // stringifies "-infinity", reads back < 0 — WRONG (sign swapped)
Number.NEGATIVE_INFINITY;  // stringifies "infinity", reads back > 0 — WRONG (sign swapped)
```

Do not trust `Number.MIN_VALUE` or the `Number.*_INFINITY` constants. `Number.MAX_VALUE` and `Number.NaN` are safe. Prefer the global identifiers or numeric literals — but note that even the global `Infinity` is unreliable in this engine: `(Infinity > 0)` returns `false` and it stringifies with an **inverted sign** (`String(Infinity)` → `"-infinity"`). The global `NaN` behaves correctly (`NaN !== NaN` is `true`).

{% include differs-from-mdn.html content="Per the ECMAScript spec, `Number.MIN_VALUE` is the smallest positive value (`5e-324`) and `Number.POSITIVE_INFINITY` / `Number.NEGATIVE_INFINITY` hold `+Infinity` / `-Infinity`; in the SFMC Jint engine `Number.MIN_VALUE` reads back as a large negative number and both `*_INFINITY` constants have their signs swapped." %}

```javascript
var MAX_VALUE = 1.7976931348623157e308;   // literal fallback for MIN_VALUE / *_INFINITY
var isNotANumber = (value !== value);      // reliable NaN test
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="constants-es3" %}

## Constants (ES6) {#constants-es6}

`(ES6)` — ❌ Missing. `Number.MAX_SAFE_INTEGER`, `Number.MIN_SAFE_INTEGER`, `Number.EPSILON` are genuinely `undefined` in SFMC.

Use the literals instead:

```javascript
var MAX_SAFE_INTEGER = 9007199254740991;
var EPSILON = 2.220446049250313e-16;
var MIN_SAFE_INTEGER = -9007199254740991;
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="constants-es6" %}

## Number.isInteger {#isinteger}

`(ES6)` — ❌ Missing. Use `typeof n === "number" && Math.floor(n) === n`.

```javascript
function isInteger(n) { return typeof n === "number" && Math.floor(n) === n; }
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="isinteger" %}

## Number.isNaN {#isnan}

`(ES6)` — ❌ Missing. Use the global `isNaN(value)` (note: the global coerces non-numbers, unlike `Number.isNaN`).

```javascript
isNaN(NaN);       // true
value !== value;  // reliable inline NaN check
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="isnan" %}

## Number.isFinite {#isfinite}

`(ES6)` — ❌ Missing. Use the global `isFinite(value)`.

```javascript
isFinite(42);         // true
isFinite(Infinity);   // false
isFinite(NaN);        // false
isFinite("abc");      // true   — expected false
isFinite(null);       // true   — spec-correct, ToNumber(null) is 0
```

{% include callout.html type="bug" content="The global `isFinite` returns **`true`** for a non-numeric string — `isFinite(\"abc\")` and `isFinite(Number(\"abc\"))` are both `true`, where the spec requires `false`. `isFinite(NaN)` itself is correct, and `isFinite(\"\")` / `isFinite(null)` returning `true` is spec-correct (`ToNumber` yields `0`). Test an untrusted value with `isNaN(Number(value))` instead — see [isFinite Returns true for a Non-Numeric String](/engine-limitations/known-bugs/#isfinite-true-for-non-numeric-string)." %}

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="isfinite" %}

## Number.parseInt {#parseint}

`(ES6)` — ❌ Missing. Use the global `parseInt(string, 10)`.

```javascript
parseInt("42", 10);   // 42
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="parseint" %}

## Number.parseFloat {#parsefloat}

`(ES6)` — ❌ Missing. `Number.parseFloat` is `undefined` in SFMC. Use the [global `parseFloat(string)`](#parsefloat-global) — mind its 32-bit precision and the `NaN` on trailing characters.

```javascript
parseFloat("3.14");   // 3.14000010490417
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="parsefloat" %}

## Number.isSafeInteger {#issafeinteger}

`(ES6)` — ❌ Missing. `Number.isSafeInteger` is `undefined` in SFMC. Compare against the literal safe-integer bound yourself.

```javascript
function isSafeInteger(n) {
    return typeof n === "number" && Math.floor(n) === n && Math.abs(n) <= 9007199254740991;
}
```

{% include test-script.html bundle="ecmascript-builtins--number-methods" chapter="issafeinteger" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/math/">Math Object</a></li>
</ul>
</div>
