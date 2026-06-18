---
layout: page
title: Missing & Broken Methods
parent: Engine Limitations
parent_url: /engine-limitations/
description: Array and String prototype methods that are unavailable or return wrong results in SFMC SSJS, with manual workarounds.
---

The SFMC SSJS engine is missing many Array and String methods that are available in modern JavaScript. Some methods exist on the prototype but return **incorrect results** (marked as "broken"). All can be replaced with polyfills — see the [Polyfills](/engine-limitations/polyfills/) page.

## Missing Array Methods

These methods do **not exist** in SFMC SSJS and will throw an error if called:

| Method | Workaround |
|--------|-----------|
| `Array.prototype.forEach` | `for` loop |
| `Array.prototype.map` | Manual `for` loop building a new array |
| `Array.prototype.filter` | Manual `for` loop with condition |
| `Array.prototype.find` | Manual `for` loop, `return` on match |
| `Array.prototype.findIndex` | Manual `for` loop returning index |
| `Array.prototype.indexOf` | Manual `for` loop comparing values |
| `Array.prototype.includes` | Manual `for` loop |
| `Array.prototype.some` | Manual `for` loop with early `return true` |
| `Array.prototype.every` | Manual `for` loop with early `return false` |
| `Array.prototype.reduce` | Manual `for` loop with accumulator |
| `Array.prototype.reduceRight` | Reverse `for` loop with accumulator |
| `Array.prototype.fill` | Manual `for` loop assigning value |
| `Array.prototype.copyWithin` | Manual `for` loop |
| `Array.prototype.entries` | Manual index-based iteration |
| `Array.isArray` | `Object.prototype.toString.call(v) === "[object Array]"` |
| `Array.of` | Array literal or `[].concat(args)` |

## Broken Array Methods

These methods **exist** in SSJS but return incorrect results:

### Array.prototype.splice — broken

`splice` ignores its `startIndex` and `deleteCount` arguments — it behaves as if both are 0, effectively inserting all elements at the beginning.

```javascript
var arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);
// Expected: [1, 2, 4, 5]  (remove element at index 2)
// Actual:   [1, 2, 3, 4, 5]  (nothing removed — start/count ignored!)
```

**Use the polyfill** from the [Polyfills](/engine-limitations/polyfills/) page.

### Array.prototype.lastIndexOf — broken

`lastIndexOf` always returns `-1`, regardless of the input:

```javascript
var arr = [1, 2, 3, 2, 1];
arr.lastIndexOf(2);
// Expected: 3
// Actual:   -1  (always!)
```

**Use the polyfill** from the [Polyfills](/engine-limitations/polyfills/) page.

## Missing String Methods

| Method | Workaround |
|--------|-----------|
| `String.prototype.trim` | `str.replace(/^\s+\|\s+$/g, "")` |
| `String.prototype.startsWith` | `str.indexOf(sub) === 0` |
| `String.prototype.endsWith` | `str.slice(-sub.length) === sub` |
| `String.prototype.includes` | `str.indexOf(sub) !== -1` |
| `String.prototype.padStart` | Manual `for` loop prepending the pad character |
| `String.prototype.padEnd` | Manual `for` loop appending the pad character |
| `String.prototype.repeat` | Manual `for` loop concatenating the string |

**Note:** `String.prototype.indexOf` is available and works correctly for strings. The `indexOf` missing-method warning only applies to `Array.prototype.indexOf`.

## Missing Number Methods

The ES6 static helpers on `Number` are **not available** — use the equivalent global functions or simple expressions instead:

| Method | Workaround |
|--------|-----------|
| `Number.isFinite` | Global `isFinite(val)` |
| `Number.isInteger` | `val === Math.floor(val)` (guard against non-numbers first) |
| `Number.isNaN` | Global `isNaN(val)` |
| `Number.parseInt` | Global `parseInt(str, radix)` |
| `Number.parseFloat` | Global `parseFloat(str)` |

## Broken Object Methods

These methods **exist** in SSJS but do not behave correctly:

### Object.getPrototypeOf — broken

`Object.getPrototypeOf` is present but **throws at runtime** when called.

```javascript
Object.getPrototypeOf({});
// Expected: the prototype object
// Actual:   throws an error
```

**Use the polyfill** from the [Polyfills](/engine-limitations/polyfills/) page.

## Missing Object Methods

These methods do **not exist** in SFMC SSJS and will throw an error if called:

| Method | Workaround |
|--------|-----------|
| `Object.keys` | `for...in` loop with `hasOwnProperty`, pushing keys |
| `Object.values` | `for...in` loop with `hasOwnProperty`, pushing values |
| `Object.assign` | Manual `for...in` copy of each source's own properties |

## Safe Array Methods (Available in SSJS)

These work correctly without polyfills:

| Method | Notes |
|--------|-------|
| `Array.prototype.push` | Add to end |
| `Array.prototype.pop` | Remove from end |
| `Array.prototype.shift` | Remove from front |
| `Array.prototype.unshift` | Add to front |
| `Array.prototype.slice` | Non-mutating sub-array |
| `Array.prototype.join` | Join to string |
| `Array.prototype.sort` | In-place sort (lexicographic by default) |
| `Array.prototype.reverse` | In-place reverse |
| `Array.prototype.concat` | Merge arrays |
| `Array.prototype.length` | Length property |

## Manual Equivalents (Without Polyfills)

```javascript
// forEach equivalent
for (var i = 0, len = arr.length; i < len; i++) {
    process(arr[i]);
}

// map equivalent
var result = [];
for (var i = 0, len = arr.length; i < len; i++) {
    result.push(transform(arr[i]));
}

// filter equivalent
var filtered = [];
for (var i = 0, len = arr.length; i < len; i++) {
    if (predicate(arr[i])) { filtered.push(arr[i]); }
}

// find equivalent
var found = null;
for (var i = 0, len = arr.length; i < len; i++) {
    if (predicate(arr[i])) { found = arr[i]; break; }
}

// indexOf equivalent
function indexOfValue(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) { return i; }
    }
    return -1;
}

// includes equivalent
function includesValue(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) { return true; }
    }
    return false;
}

// Array.isArray equivalent
function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
}

// String.prototype.padStart equivalent
function padStart(str, targetLength, padChar) {
    padChar = padChar || " ";
    while (str.length < targetLength) { str = padChar + str; }
    return str;
}

// String.prototype.padEnd equivalent
function padEnd(str, targetLength, padChar) {
    padChar = padChar || " ";
    while (str.length < targetLength) { str = str + padChar; }
    return str;
}

// String.prototype.repeat equivalent
function repeat(str, count) {
    var result = "";
    for (var i = 0; i < count; i++) { result += str; }
    return result;
}

// Number.isInteger equivalent
function isInteger(value) {
    return typeof value === "number" && isFinite(value) && value === Math.floor(value);
}

// Object.keys equivalent
function objectKeys(obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) { keys.push(key); }
    }
    return keys;
}

// Object.values equivalent
function objectValues(obj) {
    var values = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) { values.push(obj[key]); }
    }
    return values;
}

// Object.assign equivalent
function objectAssign(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) { target[key] = source[key]; }
    }
    return target;
}
```

→ For ready-to-use polyfill implementations, see [Polyfills](/engine-limitations/polyfills/)
