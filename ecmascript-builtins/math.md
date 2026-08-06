---
layout: page
title: Math Object
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The Math built-in object in SSJS — which methods and constants work, which are partial, and which ES6 members are missing, with fallbacks.
verification: verified
differs_from_docs: true
test_scripts: complete
---

Almost every `Math` member is **ES3** and works in SSJS. Two members are partial (`Math.max` / `Math.min`), one ES3 constant is missing (`Math.LOG10E`), and **all** ES6 `Math` methods are unavailable. Members that need a fallback are flagged below.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available (or `undefined`) — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Math.abs(x)`](#abs) | ES3 | ✅ Works | |
| [`Math.ceil(x)`](#ceil) | ES3 | ✅ Works | |
| [`Math.floor(x)`](#floor) | ES3 | ✅ Works | |
| [`Math.round(x)`](#round) | ES3 | ✅ Works | |
| [`Math.pow(x, y)`](#pow) | ES3 | ✅ Works | |
| [`Math.sqrt(x)`](#sqrt) | ES3 | ✅ Works | |
| [`Math.random()`](#random) | ES3 | ✅ Works | |
| [`Math.log(x)`](#log) | ES3 | ✅ Works | |
| [`Math.exp(x)`](#exp) | ES3 | ✅ Works | |
| [`Math.sin/cos/tan/asin/acos/atan/atan2`](#trigonometry) | ES3 | ✅ Works | |
| [`Math.PI / E / LN2 / LN10 / LOG2E / SQRT2 / SQRT1_2`](#constants) | ES3 | ✅ Works | |
| [`Math.max(...values)`](#max) | ES3 | ⚠️ Partial | Throws with 3+ args; a missing arg becomes `0` — see Polyfills |
| [`Math.min(...values)`](#min) | ES3 | ⚠️ Partial | Throws with 3+ args; a missing arg becomes `0` — see Polyfills |
| [`Math.LOG10E`](#log10e) | ES3 | ❌ Missing | `undefined` — use the literal `0.4342944819032518` |
| [`Math.trunc(x)`](#trunc) | ES6 | ❌ Missing | `x < 0 ? Math.ceil(x) : Math.floor(x)` |
| [`Math.sign(x)`](#sign) | ES6 | ❌ Missing | `x > 0 ? 1 : x < 0 ? -1 : 0` |
| [`Math.cbrt(x)`](#cbrt) | ES6 | ❌ Missing | `Math.pow(x, 1 / 3)` for non-negative `x` |
| [`Math.log2(x)`](#log2) | ES6 | ❌ Missing | `Math.log(x) / Math.LN2` |
| [`Math.log10(x)`](#log10) | ES6 | ❌ Missing | `Math.log(x) / Math.LN10` |
| [`Math.hypot(a, b)`](#hypot) | ES6 | ❌ Missing | `Math.sqrt(a * a + b * b)` |
| [`Math.expm1(x)`](#expm1) | ES6 | ❌ Missing | `Math.exp(x) - 1` |
| [`Math.log1p(x)`](#log1p) | ES6 | ❌ Missing | `Math.log(1 + x)` |
| [`Math.sinh/cosh/tanh(x)`](#hyperbolic) | ES6 | ❌ Missing | Build from `Math.exp` — see below |
| [`Math.asinh/acosh/atanh(x)`](#inverse-hyperbolic) | ES6 | ❌ Missing | Build from `Math.log`/`Math.sqrt` — see below |
| [`Math.clz32(x)`](#clz32) | ES6 | ❌ Missing | Count leading zero bits manually — the emulation throws for a negative argument |
| [`Math.fround(x)`](#fround) | ES6 | ❌ Missing | No ES3-safe equivalent — keep doubles |
| [`Math.imul(a, b)`](#imul) | ES6 | ❌ Missing | Emulate with bitwise ops — non-negative operands only, and no 32-bit wrap |

---

## Constants {#constants}

<a id="pi"></a><a id="e"></a><a id="ln2"></a><a id="ln10"></a><a id="log2e"></a><a id="sqrt2"></a><a id="sqrt1_2"></a>

`(ES3)` — ✅ Works (except `LOG10E`).

| Constant | Value |
|----------|-------|
| `Math.PI` | `3.141592653589793` |
| `Math.E` | `2.718281828459045` |
| `Math.LN2` | `0.6931471805599453` |
| `Math.LN10` | `2.302585092994046` |
| `Math.LOG2E` | `1.4426950408889634` |
| `Math.SQRT2` | `1.4142135623730951` |
| `Math.SQRT1_2` | `0.7071067811865476` |


{% include test-script.html bundle="ecmascript-builtins--math" chapter="constants" %}

## abs {#abs}

`(ES3)` — ✅ Works. Absolute value.

```javascript
Math.abs(-5);   // 5
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="abs" %}

## ceil {#ceil}

`(ES3)` — ✅ Works. Rounds up to the nearest integer.

```javascript
Math.ceil(4.1);   // 5
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="ceil" %}

## floor {#floor}

`(ES3)` — ✅ Works. Rounds down to the nearest integer.

```javascript
Math.floor(4.9);   // 4
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="floor" %}

## round {#round}

`(ES3)` — ✅ Works. Rounds to the nearest integer.

```javascript
Math.round(4.5);   // 5
function roundTo(n, decimals) {
    var factor = Math.pow(10, decimals);
    return Math.round(n * factor) / factor;
}
roundTo(3.14159, 2);   // 3.14
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="round" %}

## pow {#pow}

`(ES3)` — ✅ Works. `x` raised to the power `y`.

```javascript
Math.pow(2, 10);   // 1024
Math.pow(9, 0.5);  // 3
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="pow" %}

## sqrt {#sqrt}

`(ES3)` — ✅ Works. Square root.

```javascript
Math.sqrt(16);   // 4
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="sqrt" %}

## random {#random}

`(ES3)` — ✅ Works. Float in `[0, 1)`.

```javascript
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInt(1, 6);   // dice roll
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="random" %}

## log {#log}

`(ES3)` — ✅ Works. Natural logarithm.

```javascript
Math.log(Math.E);   // 1
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="log" %}

## exp {#exp}

`(ES3)` — ✅ Works. `e` raised to the power `x`.

```javascript
Math.exp(1);   // 2.718281828459045
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="exp" %}

## Trigonometry {#trigonometry}

<a id="sin"></a><a id="cos"></a><a id="tan"></a><a id="asin"></a><a id="acos"></a><a id="atan"></a><a id="atan2"></a>

`(ES3)` — ✅ Works. `Math.sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`.

```javascript
Math.sin(Math.PI / 2);   // 1
Math.cos(0);             // 1
Math.atan2(1, 1);        // π/4
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="trigonometry" %}

## max {#max}

`(ES3)` — ⚠️ Partial.

{% include callout.html type="warning" content="`Math.max` throws when passed **3 or more arguments**. With **fewer than two** it does not throw — the engine supplies `0` for each missing argument, so `Math.max(x)` behaves as `Math.max(x, 0)` and the no-argument form returns `0` instead of `-Infinity`. Only the two-argument form is safe — fold with a loop for more, or use the [polyfill](/engine-limitations/polyfills/#math-max-min)." %}

```javascript
Math.max(1, 5);   // 5  — two-argument form is safe
// Math.max(1, 5, 3); — ❌ throws in SFMC

Math.max(5);      // 5  — ⚠️ looks right, but only because 5 > 0
Math.max(-7);     // 0  — ❌ expected -7: the missing argument became 0

var arr = [3, 1, 4, 1, 5];
var max = arr[0];
for (var i = 1; i < arr.length; i++) { if (arr[i] > max) { max = arr[i]; } }
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="max" %}

## min {#min}

`(ES3)` — ⚠️ Partial. Same caveat as [`Math.max`](#max): throws with 3+ args, and every missing argument is supplied as `0`, so the no-argument form returns `0` instead of `+Infinity`. See the [polyfill](/engine-limitations/polyfills/#math-max-min).

```javascript
Math.min(1, 5);   // 1  — two-argument form is safe

Math.min(5);      // 0  — ❌ expected 5: the missing argument became 0
Math.min(-7);     // -7 — ⚠️ looks right, but only because -7 < 0
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="min" %}

## LOG10E {#log10e}

`(ES3)` — ❌ Missing. `Math.LOG10E` is `undefined` in SFMC. Use the literal `0.4342944819032518`.

```javascript
var LOG10E = 0.4342944819032518;
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="log10e" %}

## trunc {#trunc}

`(ES6)` — ❌ Missing. Use `x < 0 ? Math.ceil(x) : Math.floor(x)`.

```javascript
function trunc(x) { return x < 0 ? Math.ceil(x) : Math.floor(x); }
trunc(4.7);    // 4
trunc(-4.7);   // -4
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="trunc" %}

## sign {#sign}

`(ES6)` — ❌ Missing. Use `x > 0 ? 1 : x < 0 ? -1 : 0`.

```javascript
function sign(n) { return n > 0 ? 1 : n < 0 ? -1 : 0; }
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="sign" %}

## cbrt {#cbrt}

`(ES6)` — ❌ Missing. Use `Math.pow(x, 1 / 3)` for non-negative `x`.

```javascript
function cbrt(x) { return Math.pow(Math.abs(x), 1 / 3) * (x < 0 ? -1 : 1); }
cbrt(27);    // 3
cbrt(-27);   // -3
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="cbrt" %}

## log2 {#log2}

`(ES6)` — ❌ Missing. Use `Math.log(x) / Math.LN2`.

```javascript
Math.log(8) / Math.LN2;   // 3
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="log2" %}

## log10 {#log10}

`(ES6)` — ❌ Missing. Use `Math.log(x) / Math.LN10`.

```javascript
Math.log(100) / Math.LN10;   // 2
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="log10" %}

## hypot {#hypot}

`(ES6)` — ❌ Missing. Use `Math.sqrt(a * a + b * b)`.

```javascript
function hypot(a, b) { return Math.sqrt(a * a + b * b); }
hypot(3, 4);   // 5
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="hypot" %}

## expm1 {#expm1}

`(ES6)` — ❌ Missing. Use `Math.exp(x) - 1`.

```javascript
function expm1(x) { return Math.exp(x) - 1; }
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="expm1" %}

## log1p {#log1p}

`(ES6)` — ❌ Missing. Use `Math.log(1 + x)`.

```javascript
function log1p(x) { return Math.log(1 + x); }
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="log1p" %}

## Hyperbolic {#hyperbolic}

<a id="sinh"></a><a id="cosh"></a><a id="tanh"></a>

`(ES6)` — ❌ Missing. `Math.sinh`, `Math.cosh`, and `Math.tanh` are all `undefined`. Build them from `Math.exp`.

```javascript
function sinh(x) { return (Math.exp(x) - Math.exp(-x)) / 2; }
function cosh(x) { return (Math.exp(x) + Math.exp(-x)) / 2; }
function tanh(x) { var e = Math.exp(2 * x); return (e - 1) / (e + 1); }
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="hyperbolic" %}

## Inverse hyperbolic {#inverse-hyperbolic}

<a id="asinh"></a><a id="acosh"></a><a id="atanh"></a>

`(ES6)` — ❌ Missing. `Math.asinh`, `Math.acosh`, and `Math.atanh` are all `undefined`. Build them from `Math.log` and `Math.sqrt`.

```javascript
function asinh(x) { return Math.log(x + Math.sqrt(x * x + 1)); }
function acosh(x) { return Math.log(x + Math.sqrt(x * x - 1)); }
function atanh(x) { return Math.log((1 + x) / (1 - x)) / 2; }
```


{% include test-script.html bundle="ecmascript-builtins--math" chapter="inverse-hyperbolic" %}

## clz32 {#clz32}

`(ES6)` — ❌ Missing. Count leading zero bits over a 32-bit unsigned value manually.

```javascript
function clz32(x) {
    x = x >>> 0;
    if (x === 0) { return 32; }
    var n = 0;
    while (x <= 0x7fffffff) { n++; x = x << 1; }
    return n;
}

clz32(0);            // 32
clz32(1);            // 31
clz32(0x80000000);   // 0
clz32(-1);           // throws: Arithmetic operation resulted in an overflow.
```

{% include callout.html type="warning" content="**Non-negative arguments only.** `>>>` throws `Arithmetic operation resulted in an overflow.` for a negative operand, so this emulation cannot evaluate a negative argument at all — `clz32(-1)` and `clz32(-5)` both throw on the very first line. The spec's `Math.clz32` coerces to uint32 first and would return `0` for `-1`. Test the sign yourself before calling, or map a negative value to its uint32 form without bitwise operators (`x < 0 ? x + 4294967296 : x`). See [Bitwise operators](/language/operators/#bitwise-rarely-needed)." %}


{% include test-script.html bundle="ecmascript-builtins--math" chapter="clz32" %}

## fround {#fround}

`(ES6)` — ❌ Missing. There is no ES3-safe equivalent (no typed arrays); keep values as doubles.


{% include test-script.html bundle="ecmascript-builtins--math" chapter="fround" %}

## imul {#imul}

`(ES6)` — ❌ Missing. Emulate 32-bit integer multiplication with bitwise operations.

```javascript
function imul(a, b) {
    var aHi = (a >>> 16) & 0xffff, aLo = a & 0xffff;
    var bHi = (b >>> 16) & 0xffff, bLo = b & 0xffff;
    return ((aLo * bLo) + (((aHi * bLo + aLo * bHi) << 16) >>> 0)) | 0;
}

imul(3, 4);           // 12
imul(65535, 32767);   // 2147385345
imul(-5, 12);         // throws: Arithmetic operation resulted in an overflow.
```

{% include callout.html type="warning" content="**Non-negative operands only, and no 32-bit wrap.** Every bitwise operator in this engine throws `Arithmetic operation resulted in an overflow.` when given a negative operand — not just `>>>`, `&` and `|` — so this emulation cannot evaluate a negative argument at all. See [Bitwise operators](/language/operators/#bitwise-rarely-needed). It is also correct only while the true product fits in a signed 32-bit integer — `<<` does not truncate its result to 32 bits, so `imul(0xffffffff, 5)` returns `21474836475` instead of the spec's `-5`." %}


{% include test-script.html bundle="ecmascript-builtins--math" chapter="imul" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/number-methods/">Number Methods</a></li>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
</ul>
</div>
