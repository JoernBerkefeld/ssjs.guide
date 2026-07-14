---
layout: page
title: Engine Limitations
description: The SFMC SSJS engine runs on JINT (JavaScript Interpreter for .NET) with approximately ES3/5 support. This section documents what doesn't work and how to work around it.
---

SFMC SSJS runs on **JINT** — a .NET JavaScript interpreter that implements roughly ECMAScript 3 with some ES5 additions. Modern JavaScript features from ES6 (2015) and later are **not supported** and will throw runtime errors, often causing a blank white page.

This section documents every known limitation along with practical workarounds.

## In This Section

- [Unsupported Syntax](/engine-limitations/unsupported-syntax/) — 24 ES6+ features that cause runtime errors
- [ECMAScript Built-ins](/ecmascript-builtins/) — Which Array, String, Number, Math, Object, Date, RegExp, and JSON members work, are partial, or are missing
- [Polyfills](/engine-limitations/polyfills/) — Ready-to-paste polyfill implementations for the missing and broken methods
- [Known Bugs](/engine-limitations/known-bugs/) — Platform-specific behaviors that differ from documented/expected behavior
- [Differs from Official Docs](/engine-limitations/differs-from-docs/) — Runtime-verified cases where a working feature behaves differently than the official Salesforce documentation describes

## Quick Reference: What to Use Instead

| Modern JavaScript | SSJS Equivalent |
|-------------------|-----------------|
| `let x = 1` | `var x = 1` |
| `const X = 1` | `var X = 1` (convention: UPPER_CASE) |
| `` `Hello ${name}` `` | `"Hello " + name` |
| `(x) => x * 2` | `function(x) { return x * 2; }` |
| `class Foo {}` | `function Foo() {}` (constructor fn) |
| `for...of` | `for (var i = 0; i < arr.length; i++)` |
| `...spread` | `Array.prototype.concat` or manual loop |
| `{ a, ...rest }` | Manual property assignment |
| `async/await` | N/A — SSJS is synchronous |
| `import/export` | N/A — use one script block |
| `?.` optional chaining | `obj && obj.prop && obj.prop.sub` |
| `??` nullish coalescing | `val !== null && val !== undefined ? val : def` or `val \|\| def` |
| `JSON.parse()` | `Platform.Function.ParseJSON(str + "")` |
| `JSON.stringify()` | `Stringify(obj)` |
| `Array.isArray()` | `Object.prototype.toString.call(v) === "[object Array]"` |
| `arr.forEach()` | `for` loop — or add the [`forEach` polyfill](/engine-limitations/polyfills/#array-prototype-foreach) |
| `arr.map()` | Manual loop — or add the [`map` polyfill](/engine-limitations/polyfills/#array-prototype-map) |
| `arr.filter()` | Manual loop — or add the [`filter` polyfill](/engine-limitations/polyfills/#array-prototype-filter) |
| `arr.indexOf()` | Manual loop — or add the [`indexOf` polyfill](/engine-limitations/polyfills/#array-prototype-indexof) |
| `str.trim()` | `str.replace(/^\s+\|\s+$/g, "")` — or add the [`trim` polyfill](/engine-limitations/polyfills/#string-prototype-trim) |
| `str.startsWith()` | `str.indexOf(sub) === 0` — or add the [polyfill](/engine-limitations/polyfills/#string-prototype-startswith) |
| `str.endsWith()` | Manual substring check — or add the [polyfill](/engine-limitations/polyfills/#string-prototype-endswith) |

## ESLint Plugin

The `eslint-plugin-sfmc` package includes rules that detect all unsupported syntax in your SSJS files. Install it to get editor warnings before deploying.

```js
// eslint.config.js
import sfmc from 'eslint-plugin-sfmc';

export default [
    // Lint standalone .ampscript/.amp and .ssjs files
    ...sfmc.configs.recommended,

    // Lint AMPscript + SSJS embedded in .html files
    ...sfmc.configs.embedded,
];
```
