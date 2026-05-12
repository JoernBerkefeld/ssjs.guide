---
layout: category
title: ECMAScript Built-ins
description: Native JavaScript built-in objects and methods available in SSJS — which Array, String, Math, and Number methods work, which are broken, and which require polyfills.
nav_order: 9
has_children: true
---

SSJS runs on the JINT engine with ES3/ES5 compatibility. Most native ECMAScript built-ins work as expected, but some methods are missing or behave incorrectly. This section documents what is safe to use.

{% include callout.html type="note" content="For missing methods, see [Polyfills](/engine-limitations/polyfills/) and [Missing Methods](/engine-limitations/missing-methods/)." %}

## Quick Reference

### Array Methods

| Method | Status | Notes |
|--------|--------|-------|
| `Array.prototype.concat(...)` | ✅ Works | |
| `Array.prototype.join(sep)` | ✅ Works | |
| `Array.prototype.length` | ✅ Works | |
| `Array.prototype.pop()` | ✅ Works | |
| `Array.prototype.push(item)` | ✅ Works | |
| `Array.prototype.reverse()` | ✅ Works | |
| `Array.prototype.shift()` | ✅ Works | |
| `Array.prototype.slice(start, end)` | ✅ Works | |
| `Array.prototype.sort(fn)` | ✅ Works | |
| `Array.prototype.unshift(item)` | ✅ Works | |
| `Array.prototype.splice(start, count)` | ⚠️ Broken — polyfill | Ignores parameters; see [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.lastIndexOf(item)` | ⚠️ Broken — polyfill | Always returns -1; see [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.copyWithin(...)` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.entries()` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.fill(value)` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.findIndex(fn)` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.includes(item)` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.indexOf(item)` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.reduceRight(fn)` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.isArray(val)` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.of(...)` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.every(fn)` | ❌ Missing | Use `for` loop |
| `Array.prototype.filter(fn)` | ❌ Missing | Use `for` loop or polyfill |
| `Array.prototype.find(fn)` | ❌ Missing | Use `for` loop or polyfill |
| `Array.prototype.forEach(fn)` | ❌ Missing | Use `for` loop or polyfill |
| `Array.prototype.map(fn)` | ❌ Missing | Use `for` loop or polyfill |
| `Array.prototype.reduce(fn)` | ❌ Missing | Use `for` loop or polyfill |
| `Array.prototype.some(fn)` | ❌ Missing | Use `for` loop or polyfill |

### String Methods

| Method | Status | Notes |
|--------|--------|-------|
| `String.prototype.charAt(i)` | ✅ Works | |
| `String.prototype.charCodeAt(i)` | ✅ Works | |
| `String.prototype.concat(...)` | ✅ Works | |
| `String.prototype.indexOf(sub)` | ✅ Works | |
| `String.prototype.lastIndexOf(sub)` | ✅ Works | |
| `String.prototype.length` | ✅ Works | |
| `String.prototype.match(regex)` | ✅ Works | |
| `String.prototype.replace(search, rep)` | ✅ Works | Regex supported |
| `String.prototype.search(regex)` | ✅ Works | |
| `String.prototype.slice(start, end)` | ✅ Works | |
| `String.prototype.split(sep)` | ✅ Works | |
| `String.prototype.substr(start, len)` | ✅ Works | ES3 Annex B; prefer substring |
| `String.prototype.substring(start, end)` | ✅ Works | |
| `String.prototype.toLowerCase()` | ✅ Works | |
| `String.prototype.toUpperCase()` | ✅ Works | |
| `String.fromCharCode(code)` | ✅ Works | Static method |
| `String.prototype.trim()` | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `String.prototype.endsWith(sub)` | ❌ Missing | ES6; use polyfill or `lastIndexOf` |
| `String.prototype.includes(sub)` | ❌ Missing | ES6; use `indexOf !== -1` |
| `String.prototype.padEnd(len, ch)` | ❌ Missing | ES6; implement manually |
| `String.prototype.padStart(len, ch)` | ❌ Missing | ES6; implement manually |
| `String.prototype.repeat(n)` | ❌ Missing | ES6; loop instead |
| `String.prototype.startsWith(sub)` | ❌ Missing | ES6; use polyfill or `indexOf` |

### Math Object

| Method / Constant | Status |
|-------------------|--------|
| `Math.abs(x)` | ✅ Works |
| `Math.acos(x)` | ✅ Works |
| `Math.asin(x)` | ✅ Works |
| `Math.atan(x)` | ✅ Works |
| `Math.atan2(y, x)` | ✅ Works |
| `Math.ceil(x)` | ✅ Works |
| `Math.cos(x)` | ✅ Works |
| `Math.E` | ✅ Works |
| `Math.exp(x)` | ✅ Works |
| `Math.floor(x)` | ✅ Works |
| `Math.LN2` | ✅ Works |
| `Math.LN10` | ✅ Works |
| `Math.log(x)` | ✅ Works |
| `Math.LOG10E` | ✅ Works |
| `Math.LOG2E` | ✅ Works |
| `Math.max(a, b, ...)` | ✅ Works |
| `Math.min(a, b, ...)` | ✅ Works |
| `Math.PI` | ✅ Works |
| `Math.pow(base, exp)` | ✅ Works |
| `Math.random()` | ✅ Works |
| `Math.round(x)` | ✅ Works |
| `Math.sin(x)` | ✅ Works |
| `Math.sqrt(x)` | ✅ Works |
| `Math.SQRT1_2` | ✅ Works |
| `Math.SQRT2` | ✅ Works |
| `Math.tan(x)` | ✅ Works |

### Number

| Method / Constant | Status | Notes |
|-------------------|--------|-------|
| `Number.prototype.toFixed(digits)` | ✅ Works | |
| `Number.prototype.toExponential([digits])` | ✅ Works | |
| `Number.prototype.toPrecision([digits])` | ✅ Works | |
| `Number.prototype.toString([radix])` | ✅ Works | |
| `Number.prototype.valueOf()` | ✅ Works | |
| `Number.MAX_VALUE` | ✅ Works | |
| `Number.MIN_VALUE` | ✅ Works | |
| `Number.NaN` | ✅ Works | |
| `Number.NEGATIVE_INFINITY` | ✅ Works | |
| `Number.POSITIVE_INFINITY` | ✅ Works | |
| `Number.isFinite(val)` | ❌ Missing | ES6; use global `isFinite()` |
| `Number.isInteger(val)` | ❌ Missing | ES6; use `val === Math.floor(val)` |
| `Number.isNaN(val)` | ❌ Missing | ES6; use global `isNaN()` |
| `Number.parseInt(str)` | ❌ Missing | ES6; use global `parseInt()` |
| `Number.parseFloat(str)` | ❌ Missing | ES6; use global `parseFloat()` |

### Object Methods

| Method | Status | Notes |
|--------|--------|-------|
| `Object.prototype.hasOwnProperty(v)` | ✅ Works | Use inside `for...in` to skip inherited properties |
| `Object.keys(obj)` | ❌ Missing | ES6; use `for...in` with `hasOwnProperty` |
| `Object.values(obj)` | ❌ Missing | ES6; use `for...in` with `hasOwnProperty` |
| `Object.assign(target, ...src)` | ❌ Missing | ES6; copy properties manually |

## In This Section

| Page | Description |
|------|-------------|
| [Array Methods](/ecmascript-builtins/array-methods/) | Safe and polyfillable array methods |
| [String Methods](/ecmascript-builtins/string-methods/) | Safe and polyfillable string methods |
| [Math](/ecmascript-builtins/math/) | Math object reference |
| [Number Methods](/ecmascript-builtins/number-methods/) | Number methods, constants, and global numeric functions |
| [Object Methods](/ecmascript-builtins/object-methods/) | `hasOwnProperty` and missing Object statics |
