---
layout: page
title: Engine Limitations
description: The SFMC SSJS engine runs on JINT (JavaScript Interpreter for .NET) with approximately ES3/5 support. This section documents what doesn't work and how to work around it.
---

SFMC SSJS runs on **JINT** — a .NET JavaScript interpreter that implements roughly ECMAScript 3 with some ES5 additions. Modern JavaScript features from ES6 (2015) and later are **not supported** and will throw runtime errors, often causing a blank white page.

This section documents every known limitation along with practical workarounds.

## In This Section

- [Unsupported Syntax](/engine-limitations/unsupported-syntax/) — 24 ES6+ features that cause runtime errors
- [Missing Methods](/engine-limitations/missing-methods/) — Broken or unavailable Array and String methods
- [Polyfills](/engine-limitations/polyfills/) — Ready-to-paste polyfill implementations for all 20 missing methods
- [Known Bugs](/engine-limitations/known-bugs/) — Platform-specific behaviors that differ from documented/expected behavior

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
| `arr.forEach()` | `for` loop — or add the `forEach` polyfill |
| `arr.map()` | Manual loop — or add the `map` polyfill |
| `arr.filter()` | Manual loop — or add the `filter` polyfill |
| `arr.indexOf()` | Manual loop — or add the `indexOf` polyfill |
| `str.trim()` | `str.replace(/^\s+\|\s+$/g, "")` — or add the `trim` polyfill |
| `str.startsWith()` | `str.indexOf(sub) === 0` — or add the polyfill |
| `str.endsWith()` | Manual substring check — or add the polyfill |

## ESLint Plugin

The `eslint-plugin-sfmc` package includes rules that detect all unsupported syntax in your SSJS files. Install it to get editor warnings before deploying.

```json
{
  "plugins": ["sfmc"],
  "rules": {
    "sfmc/ssjs-no-unsupported-syntax": "error",
    "sfmc/ssjs-no-unavailable-method": "warn"
  }
}
```
