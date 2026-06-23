---
layout: page
title: Missing & Broken Methods
parent: Engine Limitations
parent_url: /engine-limitations/
description: Array, String, Number, Math, Object, Date, JSON, and RegExp members that are unavailable or return wrong results in SFMC SSJS, with manual workarounds.
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
| `Array.prototype.keys` | Standard index `for` loop |
| `Array.prototype.values` | Standard index `for` loop |
| `Array.prototype.at` | `arr[i]` (and `arr[arr.length + i]` for negative `i`) |
| `Array.prototype.flat` | Concatenate nested arrays manually in a loop |
| `Array.prototype.flatMap` | `for` loop with `push` |
| `Array.prototype.findLast` | Reverse `for` loop |
| `Array.isArray` | `Object.prototype.toString.call(v) === "[object Array]"` |
| `Array.of` | Array literal or `[].concat(args)` |
| `Array.from` | `for` loop over the source building the array |

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

### Array.prototype.slice — partial

`slice` works with explicit indices, including negative ones (`slice(-2)`, `slice(1, -1)`), but the no-argument form `arr.slice()` throws.

```javascript
var arr = [1, 2, 3, 4, 5];
arr.slice(1, 3);   // [2, 3] — works
arr.slice(-2);     // [4, 5] — works (negative index)
// arr.slice();    // ❌ throws (no-arg form)
```

**Use the polyfill** from the [Polyfills](/engine-limitations/polyfills/) page if you need the no-arg form.

### Array.prototype.sort — partial

`sort` works when called **with a compare function**, but the no-argument form `arr.sort()` throws, and the native sort cannot be re-invoked through a captured reference.

```javascript
var arr = [3, 1, 2];
arr.sort(function (a, b) { return a - b; });  // [1, 2, 3] — works
// arr.sort();  // ❌ throws (no-arg form)
```

**Use the polyfill** from the [Polyfills](/engine-limitations/polyfills/) page if you need the default lexicographic `sort()`.

## Missing String Methods

| Method | Workaround |
|--------|-----------|
| `String.prototype.trim` | `str.replace(/^\s+\|\s+$/g, "")` |
| `String.prototype.trimStart` | `str.replace(/^\s+/, "")` |
| `String.prototype.trimEnd` | `str.replace(/\s+$/, "")` |
| `String.prototype.startsWith` | `str.indexOf(sub) === 0` |
| `String.prototype.endsWith` | `str.slice(-sub.length) === sub` |
| `String.prototype.includes` | `str.indexOf(sub) !== -1` |
| `String.prototype.padStart` | Manual `for` loop prepending the pad character |
| `String.prototype.padEnd` | Manual `for` loop appending the pad character |
| `String.prototype.repeat` | Manual `for` loop concatenating the string |
| `String.prototype.codePointAt` | `charCodeAt` for BMP characters |

**Note:** `String.prototype.indexOf` is available and works correctly for strings. The `indexOf` missing-method warning only applies to `Array.prototype.indexOf`.

## Broken String Methods

These methods **exist** but throw or return incorrect results:

### String.prototype.substr — throws

`substr` throws at runtime in SFMC SSJS. Use `substring` or `slice` instead, or apply the `substr` polyfill.

```javascript
var str = "Hello World";
// str.substr(6, 5);   // ❌ throws
str.substring(6, 11);  // "World" — use this instead
```

### String.prototype.search — partial

`search` is unreliable in SFMC: it returns the wrong index for some real matches (observed returning `0` or `-1` where the match is elsewhere), and returns `0` instead of `-1` on a no-match. Use `String.match` or `RegExp.test` to detect a match, or apply the `search` polyfill.

### String.prototype.split — partial

The empty-separator form `str.split("")` does **not** split into characters — it returns the whole string as a single element. Loop with `charAt`, or apply the `split` polyfill.

### String.match return shape

`String.match` returns an **empty array `[]`** (not `null`) on no-match, and matched results do **not** carry a `.index` property.

**Use the polyfills** from the [Polyfills](/engine-limitations/polyfills/) page for `substr`, `search`, and `split`.

## Missing Number Methods

The ES6 static helpers on `Number` are **not available** — use the equivalent global functions or simple expressions instead:

| Method | Workaround |
|--------|-----------|
| `Number.isFinite` | Global `isFinite(val)` |
| `Number.isInteger` | `val === Math.floor(val)` (guard against non-numbers first) |
| `Number.isNaN` | Global `isNaN(val)` |
| `Number.parseInt` | Global `parseInt(str, radix)` |
| `Number.MAX_SAFE_INTEGER` | Literal `9007199254740991` |

## Missing Math Methods & Constants

The following ES6 `Math` members are **not available**, and the ES3 constant `Math.LOG10E` is `undefined` in SFMC:

| Member | Workaround |
|--------|-----------|
| `Math.LOG10E` | Literal `0.4342944819032518` |
| `Math.trunc` | `x < 0 ? Math.ceil(x) : Math.floor(x)` |
| `Math.sign` | `x > 0 ? 1 : x < 0 ? -1 : 0` |
| `Math.cbrt` | `Math.pow(x, 1 / 3)` for non-negative `x` |
| `Math.log2` | `Math.log(x) / Math.LN2` |
| `Math.log10` | `Math.log(x) / Math.LN10` |
| `Math.hypot` | `Math.sqrt(a * a + b * b)` |

**Broken `Math` methods:** `Math.max` / `Math.min` throw with 3+ arguments and the no-arg forms return `0` — see [Math Object](/ecmascript-builtins/math/) and the [Polyfills](/engine-limitations/polyfills/) page.

## Missing Date / JSON / RegExp Members

| Member | Workaround |
|--------|-----------|
| `Date.prototype.toISOString` | Build the ISO string from `get*` methods, or use `Platform.Function.FormatDate` |
| `JSON.parse` | `Platform.Function.ParseJSON(string)` |
| `JSON.stringify` | `Platform.Function.Stringify(value)` |
| `RegExp.prototype.ignoreCase` | Track the `i` flag yourself when constructing the RegExp |
| `RegExp.prototype.multiline` | Track the `m` flag yourself when constructing the RegExp |

**Broken `RegExp` behavior:** `RegExp.exec` capture groups (`result[1]+`) are `undefined`, and `lastIndex` does not advance with the `g` flag — use `String.match(/.../g)` to collect all matches.

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
