---
layout: page
title: Math Object
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The Math built-in object in SSJS — which methods and constants work, which are partial, and which ES6 members are missing, with fallbacks.
---

Almost every `Math` member is **ES3** and works in SSJS. Two members are partial (`Math.max` / `Math.min`), one constant is missing (`Math.LOG10E`), and several ES6 methods are not available. Members that need a fallback are flagged below.

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
| [`Math.max(...values)`](#max) | ES3 | ⚠️ Partial | Throws with 3+ args; no-arg returns `0` — see Polyfills |
| [`Math.min(...values)`](#min) | ES3 | ⚠️ Partial | Throws with 3+ args; no-arg returns `0` — see Polyfills |
| [`Math.LOG10E`](#log10e) | ES3 | ❌ Missing | `undefined` — use the literal `0.4342944819032518` |
| [`Math.trunc(x)`](#trunc) | ES6 | ❌ Missing | `x < 0 ? Math.ceil(x) : Math.floor(x)` |
| [`Math.sign(x)`](#sign) | ES6 | ❌ Missing | `x > 0 ? 1 : x < 0 ? -1 : 0` |
| [`Math.cbrt(x)`](#cbrt) | ES6 | ❌ Missing | `Math.pow(x, 1 / 3)` for non-negative `x` |
| [`Math.log2(x)`](#log2) | ES6 | ❌ Missing | `Math.log(x) / Math.LN2` |
| [`Math.log10(x)`](#log10) | ES6 | ❌ Missing | `Math.log(x) / Math.LN10` |
| [`Math.hypot(a, b)`](#hypot) | ES6 | ❌ Missing | `Math.sqrt(a * a + b * b)` |

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

## abs {#abs}

`(ES3)` — ✅ Works. Absolute value.

```javascript
Math.abs(-5);   // 5
```

## ceil {#ceil}

`(ES3)` — ✅ Works. Rounds up to the nearest integer.

```javascript
Math.ceil(4.1);   // 5
```

## floor {#floor}

`(ES3)` — ✅ Works. Rounds down to the nearest integer.

```javascript
Math.floor(4.9);   // 4
```

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

## pow {#pow}

`(ES3)` — ✅ Works. `x` raised to the power `y`.

```javascript
Math.pow(2, 10);   // 1024
Math.pow(9, 0.5);  // 3
```

## sqrt {#sqrt}

`(ES3)` — ✅ Works. Square root.

```javascript
Math.sqrt(16);   // 4
```

## random {#random}

`(ES3)` — ✅ Works. Float in `[0, 1)`.

```javascript
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInt(1, 6);   // dice roll
```

## log {#log}

`(ES3)` — ✅ Works. Natural logarithm.

```javascript
Math.log(Math.E);   // 1
```

## exp {#exp}

`(ES3)` — ✅ Works. `e` raised to the power `x`.

```javascript
Math.exp(1);   // 2.718281828459045
```

## Trigonometry {#trigonometry}

<a id="sin"></a><a id="cos"></a><a id="tan"></a><a id="asin"></a><a id="acos"></a><a id="atan"></a><a id="atan2"></a>

`(ES3)` — ✅ Works. `Math.sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`.

```javascript
Math.sin(Math.PI / 2);   // 1
Math.cos(0);             // 1
Math.atan2(1, 1);        // π/4
```

## max {#max}

`(ES3)` — ⚠️ Partial.

{% include callout.html type="warning" content="`Math.max` throws when passed **3 or more arguments**, and the no-argument form returns `0` instead of `-Infinity`. Only the two-argument form is safe — fold with a loop for more, or use the [polyfill](/engine-limitations/polyfills/#math-max-min)." %}

```javascript
Math.max(1, 5);   // 5  — two-argument form is safe
// Math.max(1, 5, 3); — ❌ throws in SFMC

var arr = [3, 1, 4, 1, 5];
var max = arr[0];
for (var i = 1; i < arr.length; i++) { if (arr[i] > max) { max = arr[i]; } }
```

## min {#min}

`(ES3)` — ⚠️ Partial. Same caveat as [`Math.max`](#max): throws with 3+ args, no-arg returns `0` instead of `+Infinity`. See the [polyfill](/engine-limitations/polyfills/#math-max-min).

```javascript
Math.min(1, 5);   // 1  — two-argument form is safe
```

## LOG10E {#log10e}

`(ES3)` — ❌ Missing. `Math.LOG10E` is `undefined` in SFMC. Use the literal `0.4342944819032518`.

```javascript
var LOG10E = 0.4342944819032518;
```

## trunc {#trunc}

`(ES6)` — ❌ Missing. Use `x < 0 ? Math.ceil(x) : Math.floor(x)`.

```javascript
function trunc(x) { return x < 0 ? Math.ceil(x) : Math.floor(x); }
trunc(4.7);    // 4
trunc(-4.7);   // -4
```

## sign {#sign}

`(ES6)` — ❌ Missing. Use `x > 0 ? 1 : x < 0 ? -1 : 0`.

```javascript
function sign(n) { return n > 0 ? 1 : n < 0 ? -1 : 0; }
```

## cbrt {#cbrt}

`(ES6)` — ❌ Missing. Use `Math.pow(x, 1 / 3)` for non-negative `x`.

```javascript
function cbrt(x) { return Math.pow(Math.abs(x), 1 / 3) * (x < 0 ? -1 : 1); }
cbrt(27);    // 3
cbrt(-27);   // -3
```

## log2 {#log2}

`(ES6)` — ❌ Missing. Use `Math.log(x) / Math.LN2`.

```javascript
Math.log(8) / Math.LN2;   // 3
```

## log10 {#log10}

`(ES6)` — ❌ Missing. Use `Math.log(x) / Math.LN10`.

```javascript
Math.log(100) / Math.LN10;   // 2
```

## hypot {#hypot}

`(ES6)` — ❌ Missing. Use `Math.sqrt(a * a + b * b)`.

```javascript
function hypot(a, b) { return Math.sqrt(a * a + b * b); }
hypot(3, 4);   // 5
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/number-methods/">Number Methods</a></li>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
</ul>
</div>
