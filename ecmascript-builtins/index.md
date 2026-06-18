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

The **ES** column shows the ECMAScript edition that standardized each member (ES3, ES5, or ES6).

### Array Methods

| Method | ES | Status | Notes |
|--------|----|--------|-------|
| `Array.prototype.concat(...)` | ES3 | ✅ Works | |
| `Array.prototype.join(sep)` | ES3 | ✅ Works | |
| `Array.prototype.length` | ES3 | ✅ Works | |
| `Array.prototype.pop()` | ES3 | ✅ Works | |
| `Array.prototype.push(item)` | ES3 | ✅ Works | |
| `Array.prototype.reverse()` | ES3 | ✅ Works | |
| `Array.prototype.shift()` | ES3 | ✅ Works | |
| `Array.prototype.slice(start, end)` | ES3 | ✅ Works | |
| `Array.prototype.sort(fn)` | ES3 | ✅ Works | |
| `Array.prototype.toLocaleString()` | ES3 | ✅ Works | |
| `Array.prototype.unshift(item)` | ES3 | ✅ Works | |
| `Array.prototype.splice(start[, deleteCount[, item1[, ...]]])` | ES3 | ⚠️ Partial | Delete form works; insert form (3rd+ arg) ignores `start`/`deleteCount` — see [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.lastIndexOf(item)` | ES5 | ⚠️ Broken — polyfill | Always returns -1; see [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.copyWithin(...)` | ES6 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.entries()` | ES6 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.fill(value)` | ES6 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.filter(fn)` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.find(fn)` | ES6 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.findIndex(fn)` | ES6 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.forEach(fn)` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.includes(item)` | ES6 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.indexOf(item)` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.map(fn)` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.reduce(fn)` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.reduceRight(fn)` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.some(fn)` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.isArray(val)` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.of(...)` | ES6 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `Array.prototype.every(fn)` | ES5 | ❌ Missing | Use `for` loop |

### String Methods

| Method | ES | Status | Notes |
|--------|----|--------|-------|
| `String.prototype.charAt(i)` | ES3 | ✅ Works | |
| `String.prototype.charCodeAt(i)` | ES3 | ✅ Works | |
| `String.prototype.concat(...)` | ES3 | ✅ Works | |
| `String.prototype.indexOf(sub)` | ES3 | ✅ Works | |
| `String.prototype.lastIndexOf(sub)` | ES3 | ✅ Works | |
| `String.prototype.length` | ES3 | ✅ Works | |
| `String.prototype.match(regex)` | ES3 | ✅ Works | |
| `String.prototype.replace(search, rep)` | ES3 | ✅ Works | Regex supported |
| `String.prototype.search(regex)` | ES3 | ✅ Works | |
| `String.prototype.slice(start, end)` | ES3 | ✅ Works | |
| `String.prototype.split(sep)` | ES3 | ✅ Works | |
| `String.prototype.substr(start, len)` | ES3 | ✅ Works | ES3 Annex B; prefer substring |
| `String.prototype.substring(start, end)` | ES3 | ✅ Works | |
| `String.prototype.toLowerCase()` | ES3 | ✅ Works | |
| `String.prototype.toLocaleLowerCase()` | ES3 | ✅ Works | |
| `String.prototype.toUpperCase()` | ES3 | ✅ Works | |
| `String.fromCharCode(code)` | ES3 | ✅ Works | Static method |
| `String.prototype.trim()` | ES5 | ⚠️ Polyfill | See [Polyfills](/engine-limitations/polyfills/) |
| `String.prototype.endsWith(sub)` | ES6 | ❌ Missing | Use polyfill or `lastIndexOf` |
| `String.prototype.includes(sub)` | ES6 | ❌ Missing | Use `indexOf !== -1` |
| `String.prototype.padEnd(len, ch)` | ES6 | ❌ Missing | Implement manually |
| `String.prototype.padStart(len, ch)` | ES6 | ❌ Missing | Implement manually |
| `String.prototype.repeat(n)` | ES6 | ❌ Missing | Loop instead |
| `String.prototype.startsWith(sub)` | ES6 | ❌ Missing | Use polyfill or `indexOf` |

### Math Object

All `Math` members are ES3 and work natively.

| Method / Constant | ES | Status |
|-------------------|----|--------|
| `Math.abs(x)` | ES3 | ✅ Works |
| `Math.acos(x)` | ES3 | ✅ Works |
| `Math.asin(x)` | ES3 | ✅ Works |
| `Math.atan(x)` | ES3 | ✅ Works |
| `Math.atan2(y, x)` | ES3 | ✅ Works |
| `Math.ceil(x)` | ES3 | ✅ Works |
| `Math.cos(x)` | ES3 | ✅ Works |
| `Math.E` | ES3 | ✅ Works |
| `Math.exp(x)` | ES3 | ✅ Works |
| `Math.floor(x)` | ES3 | ✅ Works |
| `Math.LN2` | ES3 | ✅ Works |
| `Math.LN10` | ES3 | ✅ Works |
| `Math.log(x)` | ES3 | ✅ Works |
| `Math.LOG10E` | ES3 | ✅ Works |
| `Math.LOG2E` | ES3 | ✅ Works |
| `Math.max(a, b, ...)` | ES3 | ✅ Works |
| `Math.min(a, b, ...)` | ES3 | ✅ Works |
| `Math.PI` | ES3 | ✅ Works |
| `Math.pow(base, exp)` | ES3 | ✅ Works |
| `Math.random()` | ES3 | ✅ Works |
| `Math.round(x)` | ES3 | ✅ Works |
| `Math.sin(x)` | ES3 | ✅ Works |
| `Math.sqrt(x)` | ES3 | ✅ Works |
| `Math.SQRT1_2` | ES3 | ✅ Works |
| `Math.SQRT2` | ES3 | ✅ Works |
| `Math.tan(x)` | ES3 | ✅ Works |

### Number

| Method / Constant | ES | Status | Notes |
|-------------------|----|--------|-------|
| `Number.prototype.toFixed(digits)` | ES3 | ✅ Works | |
| `Number.prototype.toExponential([digits])` | ES3 | ✅ Works | |
| `Number.prototype.toPrecision([digits])` | ES3 | ✅ Works | |
| `Number.prototype.toString([radix])` | ES3 | ✅ Works | |
| `Number.prototype.valueOf()` | ES3 | ✅ Works | |
| `Number.MAX_VALUE` | ES3 | ✅ Works | |
| `Number.MIN_VALUE` | ES3 | ✅ Works | |
| `Number.NaN` | ES3 | ✅ Works | |
| `Number.NEGATIVE_INFINITY` | ES3 | ✅ Works | |
| `Number.POSITIVE_INFINITY` | ES3 | ✅ Works | |
| `Number.isFinite(val)` | ES6 | ❌ Missing | Use global `isFinite()` |
| `Number.isInteger(val)` | ES6 | ❌ Missing | Use `val === Math.floor(val)` |
| `Number.isNaN(val)` | ES6 | ❌ Missing | Use global `isNaN()` |
| `Number.parseInt(str)` | ES6 | ❌ Missing | Use global `parseInt()` |
| `Number.parseFloat(str)` | ES6 | ❌ Missing | Use global `parseFloat()` |

### Object Methods

| Method | ES | Status | Notes |
|--------|----|--------|-------|
| `Object.prototype.hasOwnProperty(v)` | ES3 | ✅ Works | Use inside `for...in` to skip inherited properties |
| `Object.defineProperty(obj, prop, desc)` | ES5 | ✅ Works | Static method |
| `Object.getPrototypeOf(obj)` | ES5 | ⚠️ Broken — polyfill | Exists but throws at runtime; see [Polyfills](/engine-limitations/polyfills/) |
| `Object.keys(obj)` | ES6 | ❌ Missing | Use `for...in` with `hasOwnProperty` |
| `Object.values(obj)` | ES6 | ❌ Missing | Use `for...in` with `hasOwnProperty` |
| `Object.assign(target, ...src)` | ES6 | ❌ Missing | Copy properties manually |

### Date Methods

Value-confirmed `Date` members — see [Date Methods](/ecmascript-builtins/date-methods/) for examples.

| Method | ES | Status |
|--------|----|--------|
| `Date.prototype.getFullYear()` | ES3 | ✅ Works |
| `Date.prototype.getDay()` | ES3 | ✅ Works |
| `Date.prototype.getMinutes()` | ES3 | ✅ Works |
| `Date.prototype.getSeconds()` | ES3 | ✅ Works |
| `Date.prototype.getMilliseconds()` | ES3 | ✅ Works |
| `Date.prototype.valueOf()` | ES3 | ✅ Works |
| `Date.prototype.toString()` | ES3 | ✅ Works |
| `Date.prototype.toDateString()` | ES3 | ✅ Works |
| `Date.prototype.toUTCString()` | ES3 | ✅ Works |
| `Date.UTC(year[, ...])` | ES3 | ✅ Works |

## In This Section

| Page | Description |
|------|-------------|
| [Array Methods](/ecmascript-builtins/array-methods/) | Safe and polyfillable array methods |
| [String Methods](/ecmascript-builtins/string-methods/) | Safe and polyfillable string methods |
| [Math](/ecmascript-builtins/math/) | Math object reference |
| [Number Methods](/ecmascript-builtins/number-methods/) | Number methods, constants, and global numeric functions |
| [Object Methods](/ecmascript-builtins/object-methods/) | `hasOwnProperty`, `defineProperty`, and missing Object statics |
| [Date Methods](/ecmascript-builtins/date-methods/) | Value-confirmed `Date` getters, string conversions, and `Date.UTC` |
