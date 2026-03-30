---
layout: page
title: Math Object
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The Math built-in object in SSJS — all standard methods work as expected. Complete reference with examples.
---

All `Math` object methods and constants work correctly in SSJS. No polyfills are needed.

## Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `Math.PI` | `3.141592653589793` | π |
| `Math.E` | `2.718281828459045` | Euler's number |
| `Math.LN2` | `0.6931471805599453` | Natural log of 2 |
| `Math.LN10` | `2.302585092994046` | Natural log of 10 |
| `Math.SQRT2` | `1.4142135623730951` | Square root of 2 |

---

## Rounding

```javascript
Math.floor(4.9);   // 4  — round down
Math.ceil(4.1);    // 5  — round up
Math.round(4.5);   // 5  — round to nearest
Math.round(4.4);   // 4

// Round to N decimal places
function roundTo(n, decimals) {
    var factor = Math.pow(10, decimals);
    return Math.round(n * factor) / factor;
}
roundTo(3.14159, 2);  // 3.14
```

---

## Absolute Value / Sign

```javascript
Math.abs(-5);     // 5
Math.abs(3.14);   // 3.14

// Sign check (Math.sign is ES6 — use this instead)
function sign(n) {
    return n > 0 ? 1 : n < 0 ? -1 : 0;
}
```

---

## Min / Max

```javascript
Math.max(1, 5, 3);   // 5
Math.min(1, 5, 3);   // 1

// Max/min of array
var arr = [3, 1, 4, 1, 5, 9, 2, 6];
var max = arr[0];
var min = arr[0];
for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
}
```

---

## Powers and Roots

```javascript
Math.pow(2, 10);   // 1024
Math.pow(9, 0.5);  // 3 (square root)
Math.sqrt(16);     // 4
Math.sqrt(2);      // 1.4142135623730951

// Cube root (Math.cbrt is ES6)
function cbrt(x) {
    return Math.pow(Math.abs(x), 1/3) * (x < 0 ? -1 : 1);
}
cbrt(27);   // 3
cbrt(-27);  // -3
```

---

## Logarithms

```javascript
Math.log(Math.E);   // 1 (natural log)
Math.log(1);        // 0
Math.log(100) / Math.LN10;  // log base 10 (Math.log10 is ES6)
Math.log(8) / Math.LN2;     // log base 2 (Math.log2 is ES6)
```

---

## Trigonometry

```javascript
Math.sin(Math.PI / 2);   // 1
Math.cos(0);             // 1
Math.tan(Math.PI / 4);   // 1
Math.asin(1);            // π/2
Math.acos(1);            // 0
Math.atan(1);            // π/4
Math.atan2(1, 1);        // π/4
```

---

## Random Numbers

```javascript
Math.random();                    // float in [0, 1)

// Integer in [min, max] inclusive
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInt(1, 6);   // dice roll: 1-6

// Random item from array
function randomItem(arr) {
    return arr[randomInt(0, arr.length - 1)];
}
```

---

## Number Parsing

```javascript
parseInt("42", 10);      // 42
parseInt("0xFF", 16);    // 255
parseFloat("3.14");      // 3.14
isNaN(NaN);              // true
isNaN("hello");          // true
isNaN(42);               // false
isFinite(Infinity);      // false
isFinite(42);            // true
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/array-methods/">Array Methods</a></li>
  <li><a href="/ecmascript-builtins/string-methods/">String Methods</a></li>
</ul>
</div>
