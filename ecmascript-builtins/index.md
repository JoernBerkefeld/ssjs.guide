---
layout: category
title: ECMAScript Built-ins
description: Native JavaScript built-in objects and methods available in SSJS — which Array, String, and Math methods work, which are broken, and which require polyfills.
nav_order: 9
has_children: true
---

SSJS runs on the JINT engine with ES3/ES5 compatibility. Most native ECMAScript built-ins work as expected, but some methods are missing or behave incorrectly. This section documents what is safe to use.

{% include callout.html type="note" content="For missing methods, see [Polyfills](/engine-limitations/polyfills/) and [Missing Methods](/engine-limitations/missing-methods/)." %}

## Quick Reference

### Array Methods

| Method | Status | Notes |
|--------|--------|-------|
| `arr.push(item)` | ✅ Works | |
| `arr.pop()` | ✅ Works | |
| `arr.shift()` | ✅ Works | |
| `arr.unshift(item)` | ✅ Works | |
| `arr.splice(start, count)` | ✅ Works | |
| `arr.slice(start, end)` | ✅ Works | |
| `arr.join(sep)` | ✅ Works | |
| `arr.reverse()` | ✅ Works | |
| `arr.sort(fn)` | ✅ Works | |
| `arr.indexOf(item)` | ⚠️ Use polyfill | May not work |
| `arr.forEach(fn)` | ❌ Missing | Use `for` loop |
| `arr.map(fn)` | ❌ Missing | Use `for` loop |
| `arr.filter(fn)` | ❌ Missing | Use `for` loop |
| `arr.reduce(fn)` | ❌ Missing | Use `for` loop |
| `arr.some(fn)` | ❌ Missing | Use `for` loop |
| `arr.every(fn)` | ❌ Missing | Use `for` loop |
| `arr.find(fn)` | ❌ Missing | ES6, unsupported |
| `Array.isArray(val)` | ❌ Missing | Use `typeof val === "object" && val.length !== undefined` |

### String Methods

| Method | Status | Notes |
|--------|--------|-------|
| `str.length` | ✅ Works | |
| `str.charAt(i)` | ✅ Works | |
| `str.charCodeAt(i)` | ✅ Works | |
| `str.indexOf(sub)` | ✅ Works | |
| `str.lastIndexOf(sub)` | ✅ Works | |
| `str.slice(start, end)` | ✅ Works | |
| `str.substring(start, end)` | ✅ Works | |
| `str.toUpperCase()` | ✅ Works | |
| `str.toLowerCase()` | ✅ Works | |
| `str.split(sep)` | ✅ Works | |
| `str.replace(search, rep)` | ✅ Works | Regex supported |
| `str.match(regex)` | ✅ Works | |
| `str.search(regex)` | ✅ Works | |
| `str.trim()` | ⚠️ Use polyfill | May be missing |
| `str.startsWith(sub)` | ❌ Missing | ES6, use `indexOf` |
| `str.endsWith(sub)` | ❌ Missing | ES6, use `lastIndexOf` |
| `str.includes(sub)` | ❌ Missing | ES6, use `indexOf !== -1` |
| `str.repeat(n)` | ❌ Missing | ES6, loop instead |
| `str.padStart(len, ch)` | ❌ Missing | ES6, implement manually |

### Math Object

| Method | Status |
|--------|--------|
| `Math.abs(x)` | ✅ Works |
| `Math.ceil(x)` | ✅ Works |
| `Math.floor(x)` | ✅ Works |
| `Math.round(x)` | ✅ Works |
| `Math.max(a, b, ...)` | ✅ Works |
| `Math.min(a, b, ...)` | ✅ Works |
| `Math.pow(base, exp)` | ✅ Works |
| `Math.sqrt(x)` | ✅ Works |
| `Math.random()` | ✅ Works |
| `Math.PI` | ✅ Works |

## In This Section

| Page | Description |
|------|-------------|
| [Array Methods](/ecmascript-builtins/array-methods/) | Safe and polyfillable array methods |
| [String Methods](/ecmascript-builtins/string-methods/) | Safe and polyfillable string methods |
| [Math](/ecmascript-builtins/math/) | Math object reference |
