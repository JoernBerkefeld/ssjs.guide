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

**Note:** `String.prototype.indexOf` is available and works correctly for strings. The `indexOf` missing-method warning only applies to `Array.prototype.indexOf`.

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
```

→ For ready-to-use polyfill implementations, see [Polyfills](/engine-limitations/polyfills/)
