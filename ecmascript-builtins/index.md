---
layout: category
title: ECMAScript Built-ins
description: Native JavaScript built-in objects and methods available in SSJS — which Array, String, Math, Number, Date, RegExp, and JSON members work, which are partial, and which are missing.
nav_order: 9
has_children: true
verification: verified
differs_from_docs: true
redirect_from:
    - /engine-limitations/missing-methods/
---

SSJS runs on the JINT engine with ES3/ES5 compatibility. Most native ECMAScript built-ins work as expected, but some methods are missing or behave incorrectly. This section documents what is safe to use, and links each member to its full details and any [Polyfills](/engine-limitations/polyfills/).

{% include callout.html type="note" content="Missing methods are listed here and on each section page. For drop-in implementations, see [Polyfills](/engine-limitations/polyfills/)." %}

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug (see Notes) |
| ❌ Missing | Not available (or `undefined`) — use the workaround in Notes |

## Quick Reference

The **ES** column shows the ECMAScript edition that standardized each member (ES3, ES5, or ES6). Method names link to their full details on the relevant section page.

### Array Methods

| Method | ES | Status | Notes |
|--------|----|--------|-------|
| [`Array.prototype.concat(...)`](/ecmascript-builtins/array-methods/#concat) | ES3 | ✅ Works | |
| [`Array.prototype.join(sep)`](/ecmascript-builtins/array-methods/#join) | ES3 | ✅ Works | |
| [`Array.prototype.length`](/ecmascript-builtins/array-methods/#length) | ES3 | ✅ Works | |
| [`Array.prototype.pop()`](/ecmascript-builtins/array-methods/#pop) | ES3 | ✅ Works | |
| [`Array.prototype.push(item)`](/ecmascript-builtins/array-methods/#push) | ES3 | ✅ Works | |
| [`Array.prototype.reverse()`](/ecmascript-builtins/array-methods/#reverse) | ES3 | ✅ Works | |
| [`Array.prototype.shift()`](/ecmascript-builtins/array-methods/#shift) | ES3 | ✅ Works | |
| [`Array.prototype.toLocaleString()`](/ecmascript-builtins/array-methods/#tolocalestring) | ES3 | ✅ Works | |
| [`Array.prototype.unshift(item)`](/ecmascript-builtins/array-methods/#unshift) | ES3 | ✅ Works | |
| [`Array.prototype.slice(start, end)`](/ecmascript-builtins/array-methods/#slice) | ES3 | ⚠️ Partial | Positive/negative indices work; no-arg `slice()` throws — see [Polyfills](/engine-limitations/polyfills/#array-prototype-slice) |
| [`Array.prototype.sort(fn)`](/ecmascript-builtins/array-methods/#sort) | ES3 | ⚠️ Partial | Works with a compare function; no-arg `sort()` throws — see [Polyfills](/engine-limitations/polyfills/#array-prototype-sort) |
| [`Array.prototype.splice(start, deleteCount, ...items)`](/ecmascript-builtins/array-methods/#splice) | ES3 | ⚠️ Partial | Only `splice(start, deleteCount)` works; `splice(start)` throws and insert form is broken — see [Polyfills](/engine-limitations/polyfills/#array-prototype-splice) |
| [`Array.prototype.lastIndexOf(item)`](/ecmascript-builtins/array-methods/#lastindexof) | ES5 | ⚠️ Partial | Always returns -1; see [Polyfills](/engine-limitations/polyfills/#array-prototype-lastindexof) |
| [`Array.prototype.indexOf(item)`](/ecmascript-builtins/array-methods/#indexof) | ES5 | ❌ Missing | See [Polyfills](/engine-limitations/polyfills/#array-prototype-indexof) |
| [`Array.prototype.forEach(fn)`](/ecmascript-builtins/array-methods/#foreach) | ES5 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-foreach) |
| [`Array.prototype.map(fn)`](/ecmascript-builtins/array-methods/#map) | ES5 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-map) |
| [`Array.prototype.filter(fn)`](/ecmascript-builtins/array-methods/#filter) | ES5 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-filter) |
| [`Array.prototype.reduce(fn)`](/ecmascript-builtins/array-methods/#reduce) | ES5 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-reduce) |
| [`Array.prototype.reduceRight(fn)`](/ecmascript-builtins/array-methods/#reduceright) | ES5 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-reduceright) |
| [`Array.prototype.some(fn)`](/ecmascript-builtins/array-methods/#some) | ES5 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-some) |
| [`Array.prototype.every(fn)`](/ecmascript-builtins/array-methods/#every) | ES5 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-every) |
| [`Array.prototype.find(fn)`](/ecmascript-builtins/array-methods/#find) | ES6 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-find) |
| [`Array.prototype.findIndex(fn)`](/ecmascript-builtins/array-methods/#findindex) | ES6 | ❌ Missing | Use `for` loop or [Polyfills](/engine-limitations/polyfills/#array-prototype-findindex) |
| [`Array.prototype.includes(item)`](/ecmascript-builtins/array-methods/#includes) | ES6 | ❌ Missing | Use `indexOf(x) !== -1` or [Polyfills](/engine-limitations/polyfills/#array-prototype-includes) |
| [`Array.prototype.fill(value)`](/ecmascript-builtins/array-methods/#fill) | ES6 | ❌ Missing | See [Polyfills](/engine-limitations/polyfills/#array-prototype-fill) |
| [`Array.prototype.copyWithin(...)`](/ecmascript-builtins/array-methods/#copywithin) | ES6 | ❌ Missing | See [Polyfills](/engine-limitations/polyfills/#array-prototype-copywithin) |
| [`Array.prototype.entries()`](/ecmascript-builtins/array-methods/#entries) | ES6 | ❌ Missing | See [Polyfills](/engine-limitations/polyfills/#array-prototype-entries) |
| [`Array.prototype.keys()`](/ecmascript-builtins/array-methods/#keys) | ES6 | ❌ Missing | Use a standard index `for` loop |
| [`Array.prototype.values()`](/ecmascript-builtins/array-methods/#values) | ES6 | ❌ Missing | Use a standard index `for` loop |
| [`Array.prototype.at(i)`](/ecmascript-builtins/array-methods/#at) | ES6 | ❌ Missing | Use `arr[i]` (and `arr[arr.length + i]` for negative `i`) |
| [`Array.prototype.flat(depth)`](/ecmascript-builtins/array-methods/#flat) | ES6 | ❌ Missing | Concatenate nested arrays manually in a loop |
| [`Array.prototype.flatMap(fn)`](/ecmascript-builtins/array-methods/#flatmap) | ES6 | ❌ Missing | Build the result with a `for` loop and `push` |
| [`Array.prototype.findLast(fn)`](/ecmascript-builtins/array-methods/#findlast) | ES6 | ❌ Missing | Iterate from the end with a `for` loop |
| [`Array.isArray(val)`](/ecmascript-builtins/array-methods/#isarray) | ES5 | ❌ Missing | See [Polyfills](/engine-limitations/polyfills/#array-isarray) |
| [`Array.of(...)`](/ecmascript-builtins/array-methods/#of) | ES6 | ❌ Missing | See [Polyfills](/engine-limitations/polyfills/#array-of) |
| [`Array.from(source)`](/ecmascript-builtins/array-methods/#from) | ES6 | ❌ Missing | Build the array with a `for` loop over the source |

### String Methods

| Method | ES | Status | Notes |
|--------|----|--------|-------|
| [`String(value)`](/ecmascript-builtins/string-methods/#string-constructor) | ES3 | ✅ Works | Constructor as conversion function; also converts CLR/.NET objects (e.g. `resp.content`) to JS strings |
| [`String.prototype.charAt(i)`](/ecmascript-builtins/string-methods/#charat) | ES3 | ⚠️ Partial | Out-of-range index returns the last char, not `""` |
| [`String.prototype.charCodeAt(i)`](/ecmascript-builtins/string-methods/#charcodeat) | ES3 | ✅ Works | |
| [`String.prototype.concat(...)`](/ecmascript-builtins/string-methods/#concat) | ES3 | ✅ Works | |
| [`String.prototype.indexOf(sub)`](/ecmascript-builtins/string-methods/#indexof) | ES3 | ✅ Works | |
| [`String.prototype.lastIndexOf(sub)`](/ecmascript-builtins/string-methods/#lastindexof) | ES3 | ✅ Works | |
| [`String.prototype.length`](/ecmascript-builtins/string-methods/#length) | ES3 | ✅ Works | |
| [`String.prototype.localeCompare(other)`](/ecmascript-builtins/string-methods/#localecompare) | ES3 | ✅ Works | |
| [`String.prototype.match(regex)`](/ecmascript-builtins/string-methods/#match) | ES3 | ⚠️ Partial | No-match returns `[]` (empty array), not `null`; matches have no `.index` |
| [`String.prototype.replace(search, rep)`](/ecmascript-builtins/string-methods/#replace) | ES3 | ✅ Works | Regex supported |
| [`String.prototype.slice(start, end)`](/ecmascript-builtins/string-methods/#slice) | ES3 | ✅ Works | |
| [`String.prototype.substring(start, end)`](/ecmascript-builtins/string-methods/#substring) | ES3 | ✅ Works | |
| [`String.prototype.search(regex)`](/ecmascript-builtins/string-methods/#search) | ES3 | ⚠️ Partial | Unreliable — no-match returns `0` instead of `-1`, and some real matches return the wrong index — see [Polyfills](/engine-limitations/polyfills/#string-prototype-search) |
| [`String.prototype.split(sep)`](/ecmascript-builtins/string-methods/#split) | ES3 | ⚠️ Partial | Empty-separator `split("")` does not split into characters — see [Polyfills](/engine-limitations/polyfills/#string-prototype-split) |
| [`String.prototype.substr(start, len)`](/ecmascript-builtins/string-methods/#substr) | ES3 | ❌ Missing | Throws at runtime; use `substring` or the [polyfill](/engine-limitations/polyfills/#string-prototype-substr) |
| [`String.prototype.toLowerCase()`](/ecmascript-builtins/string-methods/#tolowercase) | ES3 | ✅ Works | |
| [`String.prototype.toLocaleLowerCase()`](/ecmascript-builtins/string-methods/#tolocalelowercase) | ES3 | ✅ Works | |
| [`String.prototype.toUpperCase()`](/ecmascript-builtins/string-methods/#touppercase) | ES3 | ✅ Works | |
| `String.fromCharCode(code)` | ES3 | ✅ Works | Static method |
| [`String.prototype.trim()`](/ecmascript-builtins/string-methods/#trim) | ES5 | ❌ Missing | See [Polyfills](/engine-limitations/polyfills/#string-prototype-trim) or `Platform.Function.Trim` |
| [`String.prototype.startsWith(sub)`](/ecmascript-builtins/string-methods/#startswith) | ES6 | ❌ Missing | Use `indexOf === 0` or [polyfill](/engine-limitations/polyfills/#string-prototype-startswith) |
| [`String.prototype.endsWith(sub)`](/ecmascript-builtins/string-methods/#endswith) | ES6 | ❌ Missing | Use `lastIndexOf` or [polyfill](/engine-limitations/polyfills/#string-prototype-endswith) |
| [`String.prototype.includes(sub)`](/ecmascript-builtins/string-methods/#includes) | ES6 | ❌ Missing | Use `indexOf !== -1` |
| [`String.prototype.trimStart()`](/ecmascript-builtins/string-methods/#trimstart) | ES6 | ❌ Missing | Use a `/^\s+/` replace |
| [`String.prototype.trimEnd()`](/ecmascript-builtins/string-methods/#trimend) | ES6 | ❌ Missing | Use a `/\s+$/` replace |
| [`String.prototype.padStart(len, ch)`](/ecmascript-builtins/string-methods/#padstart) | ES6 | ❌ Missing | Prepend pad characters in a loop |
| [`String.prototype.padEnd(len, ch)`](/ecmascript-builtins/string-methods/#padend) | ES6 | ❌ Missing | Append pad characters in a loop |
| [`String.prototype.repeat(n)`](/ecmascript-builtins/string-methods/#repeat) | ES6 | ❌ Missing | Concatenate in a loop |
| [`String.prototype.codePointAt(i)`](/ecmascript-builtins/string-methods/#codepointat) | ES6 | ❌ Missing | Use `charCodeAt` for BMP characters |

### Math Object

The ES3 `Math` members below work natively; `Math.max` / `Math.min` have argument-count caveats, the ES3 constant `Math.LOG10E` is missing, and **all** ES6 `Math` methods are unavailable.

| Method / Constant | ES | Status | Notes |
|-------------------|----|--------|-------|
| [`Math.abs(x)`](/ecmascript-builtins/math/#abs) | ES3 | ✅ Works | |
| [`Math.ceil(x)`](/ecmascript-builtins/math/#ceil) | ES3 | ✅ Works | |
| [`Math.floor(x)`](/ecmascript-builtins/math/#floor) | ES3 | ✅ Works | |
| [`Math.round(x)`](/ecmascript-builtins/math/#round) | ES3 | ✅ Works | |
| [`Math.pow(base, exp)`](/ecmascript-builtins/math/#pow) | ES3 | ✅ Works | |
| [`Math.sqrt(x)`](/ecmascript-builtins/math/#sqrt) | ES3 | ✅ Works | |
| [`Math.random()`](/ecmascript-builtins/math/#random) | ES3 | ✅ Works | |
| [`Math.log(x)`](/ecmascript-builtins/math/#log) | ES3 | ✅ Works | |
| [`Math.exp(x)`](/ecmascript-builtins/math/#exp) | ES3 | ✅ Works | |
| [`Math.sin/cos/tan/asin/acos/atan/atan2`](/ecmascript-builtins/math/#trigonometry) | ES3 | ✅ Works | |
| [`Math.PI / E / LN2 / LN10 / LOG2E / SQRT2 / SQRT1_2`](/ecmascript-builtins/math/#constants) | ES3 | ✅ Works | |
| [`Math.max(a, b, ...)`](/ecmascript-builtins/math/#max) | ES3 | ⚠️ Partial | Throws with 3+ args; no-arg `Math.max()` returns `0` not `-Infinity` — compare two at a time or use the [polyfill](/engine-limitations/polyfills/#math-max-min) |
| [`Math.min(a, b, ...)`](/ecmascript-builtins/math/#min) | ES3 | ⚠️ Partial | Throws with 3+ args; no-arg `Math.min()` returns `0` not `+Infinity` — compare two at a time or use the [polyfill](/engine-limitations/polyfills/#math-max-min) |
| [`Math.LOG10E`](/ecmascript-builtins/math/#log10e) | ES3 | ❌ Missing | `undefined` in SFMC; use the literal `0.4342944819032518` |
| [`Math.trunc(x)`](/ecmascript-builtins/math/#trunc) | ES6 | ❌ Missing | `x < 0 ? Math.ceil(x) : Math.floor(x)` |
| [`Math.sign(x)`](/ecmascript-builtins/math/#sign) | ES6 | ❌ Missing | `x > 0 ? 1 : x < 0 ? -1 : 0` |
| [`Math.cbrt(x)`](/ecmascript-builtins/math/#cbrt) | ES6 | ❌ Missing | `Math.pow(x, 1 / 3)` for non-negative `x` |
| [`Math.log2(x)`](/ecmascript-builtins/math/#log2) | ES6 | ❌ Missing | `Math.log(x) / Math.LN2` |
| [`Math.log10(x)`](/ecmascript-builtins/math/#log10) | ES6 | ❌ Missing | `Math.log(x) / Math.LN10` |
| [`Math.hypot(a, b)`](/ecmascript-builtins/math/#hypot) | ES6 | ❌ Missing | `Math.sqrt(a * a + b * b)` |
| [`Math.expm1(x)`](/ecmascript-builtins/math/#expm1) | ES6 | ❌ Missing | `Math.exp(x) - 1` |
| [`Math.log1p(x)`](/ecmascript-builtins/math/#log1p) | ES6 | ❌ Missing | `Math.log(1 + x)` |
| [`Math.sinh/cosh/tanh(x)`](/ecmascript-builtins/math/#hyperbolic) | ES6 | ❌ Missing | Build from `Math.exp` |
| [`Math.asinh/acosh/atanh(x)`](/ecmascript-builtins/math/#inverse-hyperbolic) | ES6 | ❌ Missing | Build from `Math.log`/`Math.sqrt` |
| [`Math.clz32(x)`](/ecmascript-builtins/math/#clz32) | ES6 | ❌ Missing | Count leading zero bits manually |
| [`Math.fround(x)`](/ecmascript-builtins/math/#fround) | ES6 | ❌ Missing | No ES3-safe equivalent |
| [`Math.imul(a, b)`](/ecmascript-builtins/math/#imul) | ES6 | ❌ Missing | Emulate with bitwise ops |

### Number

| Method / Constant | ES | Status | Notes |
|-------------------|----|--------|-------|
| [`Number.prototype.toFixed(digits)`](/ecmascript-builtins/number-methods/#tofixed) | ES3 | ✅ Works | |
| [`Number.prototype.toExponential([digits])`](/ecmascript-builtins/number-methods/#toexponential) | ES3 | ⚠️ Partial | No-arg form pads trailing zeros — always pass `digits` |
| [`Number.prototype.toPrecision([digits])`](/ecmascript-builtins/number-methods/#toprecision) | ES3 | ✅ Works | |
| [`Number.prototype.toString([radix])`](/ecmascript-builtins/number-methods/#tostring) | ES3 | ⚠️ Partial | `radix` only supports 2, 8, 10, 16 — others throw "Invalid Base." |
| `Number.prototype.valueOf()` | ES3 | ✅ Works | |
| [`Number.MAX_VALUE / MIN_VALUE / NaN / NEGATIVE_INFINITY / POSITIVE_INFINITY`](/ecmascript-builtins/number-methods/#constants) | ES3 | ⚠️ Partial | Defined but several wrong: `MIN_VALUE` negative, `*_INFINITY` signs swapped (`MAX_VALUE`/`NaN` correct) — use literals |
| [`Number.isInteger(val)`](/ecmascript-builtins/number-methods/#isinteger) | ES6 | ❌ Missing | Use `typeof n === "number" && Math.floor(n) === n` |
| [`Number.isNaN(val)`](/ecmascript-builtins/number-methods/#isnan) | ES6 | ❌ Missing | Use global `isNaN()` |
| [`Number.isFinite(val)`](/ecmascript-builtins/number-methods/#isfinite) | ES6 | ❌ Missing | Use global `isFinite()` |
| [`Number.parseInt(str)`](/ecmascript-builtins/number-methods/#parseint) | ES6 | ❌ Missing | Use global `parseInt()` |
| [`Number.MAX_SAFE_INTEGER`](/ecmascript-builtins/number-methods/#max_safe_integer) | ES6 | ❌ Missing | `undefined` — use the literal `9007199254740991` |

### Global Functions

Standard ECMAScript global functions (not SFMC-specific) — callable without any namespace.

| Function | ES | Status | Notes |
|----------|----|--------|-------|
| [`parseInt(str[, radix])`](/ecmascript-builtins/number-methods/#parseint-global) | ES3 | ⚠️ Partial | Always pass a radix; returns `NaN` for trailing non-digits (`parseInt("10px", 10)` → `NaN`, not `10`) |
| [`parseFloat(str)`](/ecmascript-builtins/number-methods/#parsefloat-global) | ES3 | ⚠️ Partial | Returns `NaN` for trailing non-digits (`parseFloat("1.5kg")` → `NaN`); result uses 32-bit precision |
| `isNaN(val)` | ES3 | ✅ Works | |
| `isFinite(val)` | ES3 | ✅ Works | |
| `eval(script)` | ES3 | ✅ Works | Evaluates a JS source string; direct eval sees local scope and Platform.Load Core globals. Executes arbitrary code — use sparingly (injection risk); prefer `Platform.Function.ParseJSON` for data. |
| [`encodeURI(uri)`](/ecmascript-builtins/global-functions/#encodeuri) | ES3 | ⚠️ Partial | Space → `+` (not `%20`), lowercase hex |
| [`encodeURIComponent(str)`](/ecmascript-builtins/global-functions/#encodeuricomponent) | ES3 | ⚠️ Partial | Space → `+`, lowercase hex (`%2f`) |
| [`decodeURI(uri)`](/ecmascript-builtins/global-functions/#decodeuri) | ES3 | ✅ Works | |
| [`decodeURIComponent(str)`](/ecmascript-builtins/global-functions/#decodeuricomponent) | ES3 | ⚠️ Partial | Decodes `+` as a space (form-urlencoded) |
| [`escape(str)`](/ecmascript-builtins/global-functions/#escape) | ES3 | ❌ Missing | `undefined`; use `encodeURIComponent` |
| [`unescape(str)`](/ecmascript-builtins/global-functions/#unescape) | ES3 | ❌ Missing | `undefined`; use `decodeURIComponent` |

### Global Values

Standard ECMAScript global value properties.

| Value | ES | Status | Notes |
|-------|----|--------|-------|
| [`undefined`](/ecmascript-builtins/global-values/#undefined) | ES3 | ✅ Works | |
| [`NaN`](/ecmascript-builtins/global-values/#nan) | ES3 | ⚠️ Partial | `String(NaN)` is lowercase `nan` |
| [`Infinity`](/ecmascript-builtins/global-values/#infinity) | ES3 | ⚠️ Partial | **Sign inverted**: `Infinity > 0` is `false`, `String(Infinity)` is `-infinity` |
| [`globalThis`](/ecmascript-builtins/global-values/#globalthis) | ES2020 | ❌ Missing | `undefined` — no global-object reference |

### Boolean

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Boolean(value)`](/ecmascript-builtins/boolean/#boolean-coercion) | ES3 | ✅ Works | Truthiness coercion — returns a primitive `boolean` |
| [`new Boolean(value)`](/ecmascript-builtins/boolean/#boolean-boxed) | ES3 | ⚠️ Partial | Boxed object; `String()` yields capitalized `True`/`False` |
| [`Boolean.prototype`](/ecmascript-builtins/boolean/#boolean-prototype) | ES3 | ✅ Works | |

### Missing ES6+ Objects

These top-level objects/types postdate the engine's ES3/ES5 baseline and are entirely absent.

| Object | ES | Status | Notes |
|--------|----|--------|-------|
| [`Symbol`](/ecmascript-builtins/symbol/) | ES6 | ❌ Missing | `undefined`; no iterator protocol — use string keys + index loops |
| [`BigInt`](/ecmascript-builtins/bigint/) | ES2020 | ❌ Missing | `undefined`; `10n` literals are a syntax error — keep large integers as strings |
| [`Map` / `Set` / `WeakMap` / `WeakSet`](/ecmascript-builtins/keyed-collections/) | ES6 | ❌ Missing | `undefined`; `new` throws `Unknown type` — use plain objects as dictionaries/sets |
| [`Promise`](/ecmascript-builtins/promises-iteration/#promise) | ES6 | ❌ Missing | `undefined`; engine is synchronous — Platform/HTTP calls block and return directly |
| [`Iterator` / `Generator` / async variants](/ecmascript-builtins/promises-iteration/) | ES6+ | ❌ Missing | No iteration protocol; `function*` / `async` / `await` are unsupported |
| [`Proxy` / `Reflect`](/ecmascript-builtins/reflection/) | ES6 | ❌ Missing | `undefined`; no trap-based interception — use ES5 `Object` methods and operators |
| [`ArrayBuffer` / `DataView` / typed arrays](/ecmascript-builtins/typed-arrays/) | ES6+ | ❌ Missing | `undefined`; no binary buffers — use plain arrays or Base64 strings |
| [`WeakRef` / `FinalizationRegistry`](/ecmascript-builtins/memory-management/) | ES2021 | ❌ Missing | `undefined`; no weak refs or GC callbacks — hold normal references |
| [`Intl`](/ecmascript-builtins/internationalization/) | ES2015 | ❌ Missing | `undefined`; `toLocale*` methods ignore locale — use `Platform.Function.FormatNumber` / `FormatDate` |

### Object Methods

| Method | ES | Status | Notes |
|--------|----|--------|-------|
| [`Object.prototype.hasOwnProperty(v)`](/ecmascript-builtins/object-methods/#hasownproperty) | ES3 | ✅ Works | Use inside `for...in` to skip inherited properties |
| [`Object.prototype.toString()`](/ecmascript-builtins/object-methods/#tostring) | ES3 | ✅ Works | |
| [`Object.prototype.valueOf()`](/ecmascript-builtins/object-methods/#valueof) | ES3 | ✅ Works | |
| [`Object.prototype.isPrototypeOf(obj)`](/ecmascript-builtins/object-methods/#isprototypeof) | ES3 | ❌ Missing | **Hangs the engine** — never call it; compare `obj.constructor === Ctor` |
| [`Object.prototype.propertyIsEnumerable(v)`](/ecmascript-builtins/object-methods/#propertyisenumerable) | ES3 | ⚠️ Partial | Broken — always returns `false`; use `hasOwnProperty` |
| [`Object.defineProperty(obj, prop, desc)`](/ecmascript-builtins/object-methods/#defineproperty) | ES5 | ✅ Works | Static method |
| [`Object.getPrototypeOf(obj)`](/ecmascript-builtins/object-methods/#getprototypeof) | ES5 | ✅ Works | Static method |
| [`Object.keys(obj)`](/ecmascript-builtins/object-methods/#keys) | ES5 | ❌ Missing | Use `for...in` with `hasOwnProperty` |
| [`Object.values(obj)`](/ecmascript-builtins/object-methods/#values) | ES6 | ❌ Missing | Use `for...in` with `hasOwnProperty` |
| [`Object.entries(obj)`](/ecmascript-builtins/object-methods/#entries) | ES6 | ❌ Missing | Use `for...in` with `hasOwnProperty` |
| [`Object.assign(target, ...src)`](/ecmascript-builtins/object-methods/#assign) | ES6 | ❌ Missing | Copy properties manually in a `for...in` loop |
| [`Object.create(proto)`](/ecmascript-builtins/object-methods/#create) | ES5 | ❌ Missing | Use a constructor function with `new` |
| [`Object.freeze(obj)`](/ecmascript-builtins/object-methods/#freeze) | ES5 | ❌ Missing | No equivalent — enforce immutability by convention |
| [`Object.getOwnPropertyNames(obj)`](/ecmascript-builtins/object-methods/#getownpropertynames) | ES5 | ❌ Missing | Use `for...in` with `hasOwnProperty` |
| [`Object.getOwnPropertyDescriptor(obj, prop)`](/ecmascript-builtins/object-methods/#getownpropertydescriptor) | ES5 | ❌ Missing | Read the value directly + `hasOwnProperty` |
| [`Object.defineProperties(obj, descs)`](/ecmascript-builtins/object-methods/#defineproperties) | ES5 | ❌ Missing | Call `Object.defineProperty` once per property |
| [`Object.seal / isSealed / preventExtensions / isExtensible`](/ecmascript-builtins/object-methods/#extensibility) | ES5 | ❌ Missing | No runtime extensibility control |

### Function Methods

| Method / Property | ES | Status | Notes |
|-------------------|----|--------|-------|
| [`Function.prototype.call(thisArg, ...)`](/ecmascript-builtins/function-methods/#call) | ES3 | ✅ Works | |
| [`Function.prototype.apply(thisArg, argsArray)`](/ecmascript-builtins/function-methods/#apply) | ES3 | ✅ Works | |
| [`arguments`](/ecmascript-builtins/function-methods/#arguments) | ES3 | ✅ Works | Array-like object inside every function |
| [`Function(...args, body)`](/ecmascript-builtins/function-methods/#function-constructor) | ES3 | ✅ Works | Constructor works with or without `new` |
| [`Function.prototype.toString()`](/ecmascript-builtins/function-methods/#tostring) | ES3 | ⚠️ Partial | Returns `[object Function]`, not the source |
| [`fn.constructor`](/ecmascript-builtins/function-methods/#constructor) | ES3 | ⚠️ Partial | `fn.constructor === Function` is `false`; use `instanceof Function` |
| [`Function.prototype.bind(thisArg, ...)`](/ecmascript-builtins/function-methods/#bind) | ES5 | ❌ Missing | Prototype is sealed — use the `bindFn` helper in [Polyfills](/engine-limitations/polyfills/#function-prototype-bind) |
| [`Function.prototype.length`](/ecmascript-builtins/function-methods/#length) | ES3 | ❌ Broken | Reading it throws; track arity yourself — see [Known Bugs](/engine-limitations/known-bugs/#functionprototypelength-throws) |
| [`Function.prototype.name`](/ecmascript-builtins/function-methods/#name) | ES3 | ❌ Missing | `undefined` |
| [`Function.prototype.caller`](/ecmascript-builtins/function-methods/#caller) | ES3 | ❌ Missing | `undefined` (deprecated) |

### Error

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`new Error([message])`](/ecmascript-builtins/error/) | ES3 | ⚠️ Partial | Constructor works, but `.message` on a JS-constructed Error reads `undefined` — recover the message via `String(e)`; engine-raised platform errors do carry `.message` / `.description` |
| [`EvalError` / `RangeError` / `ReferenceError` / `SyntaxError` / `TypeError` / `URIError`](/ecmascript-builtins/error-types/) | ES3 | ⚠️ Partial | All six legacy subtypes are present and constructible; they share the base `Error` quirks (`.message` undefined, `instanceof` always `false`) |
| [`AggregateError` / `SuppressedError` / `InternalError`](/ecmascript-builtins/error-types/#missing-error-types) | ES2021+ | ❌ Missing | Newer / non-standard error types are absent — use the base `Error` constructor |

### Date Methods

Value-confirmed `Date` members — see [Date Methods](/ecmascript-builtins/date-methods/) for examples.

| Method | ES | Status | Notes |
|--------|----|--------|-------|
| [`Date.prototype.getFullYear()`](/ecmascript-builtins/date-methods/#getfullyear) | ES3 | ✅ Works | |
| [`Date.prototype.getMonth()`](/ecmascript-builtins/date-methods/#getmonth) | ES3 | ✅ Works | 0-based |
| [`Date.prototype.getDate()`](/ecmascript-builtins/date-methods/#getdate) | ES3 | ✅ Works | |
| [`Date.prototype.getDay()`](/ecmascript-builtins/date-methods/#getday) | ES3 | ✅ Works | |
| [`Date.prototype.getHours()`](/ecmascript-builtins/date-methods/#gethours) | ES3 | ✅ Works | |
| [`Date.prototype.getMinutes()`](/ecmascript-builtins/date-methods/#getminutes) | ES3 | ✅ Works | |
| [`Date.prototype.getSeconds()`](/ecmascript-builtins/date-methods/#getseconds) | ES3 | ✅ Works | |
| [`Date.prototype.getMilliseconds()`](/ecmascript-builtins/date-methods/#getmilliseconds) | ES3 | ⚠️ Partial | Frequently off by one — do not rely on exact millisecond values |
| [`Date.prototype.getTime()`](/ecmascript-builtins/date-methods/#gettime) | ES3 | ✅ Works | |
| [`Date.prototype.getTimezoneOffset()`](/ecmascript-builtins/date-methods/#gettimezoneoffset) | ES3 | ✅ Works | |
| [`Date.prototype.valueOf()`](/ecmascript-builtins/date-methods/#valueof) | ES3 | ✅ Works | |
| [`Date.prototype.getUTCFullYear()` … `getUTCMilliseconds()`](/ecmascript-builtins/date-methods/#getutcfullyear) | ES3 | ✅ Works | Full `getUTC*` family confirmed |
| [`Date.prototype.toString()`](/ecmascript-builtins/date-methods/#tostring) | ES3 | ✅ Works | |
| [`Date.prototype.toDateString()`](/ecmascript-builtins/date-methods/#todatestring) | ES3 | ✅ Works | |
| [`Date.prototype.toTimeString()`](/ecmascript-builtins/date-methods/#totimestring) | ES3 | ✅ Works | |
| [`Date.prototype.toUTCString()`](/ecmascript-builtins/date-methods/#toutcstring) | ES3 | ✅ Works | |
| [`Date.prototype.toISOString()`](/ecmascript-builtins/date-methods/#toisostring) | ES5 | ❌ Missing | Build the ISO string manually |
| [`Date.prototype.toJSON()`](/ecmascript-builtins/date-methods/#tojson) | ES5 | ❌ Missing | Absent (depends on `toISOString`) |
| [`Date.now()`](/ecmascript-builtins/date-methods/#now) | ES5 | ⚠️ Partial | Static — returns a **Date object**, not a number |
| [`Date.parse(str)`](/ecmascript-builtins/date-methods/#parse) | ES3 | ⚠️ Partial | Static — invalid strings return **`0`**, not `NaN`; date-only parses as local |
| [`Date.UTC(year[, ...])`](/ecmascript-builtins/date-methods/#utc) | ES3 | ⚠️ Partial | Static — pass ≥ 2 args; year-only form returns a nonsense value, not `NaN` |

### RegExp

Value-confirmed `RegExp` members — see [Regular Expressions](/ecmascript-builtins/regular-expressions/) for syntax, flags, and examples.

| Method / Property | ES | Status | Notes |
|-------------------|----|--------|-------|
| [`RegExp.prototype.test(string)`](/ecmascript-builtins/regular-expressions/#test) | ES3 | ✅ Works | |
| [`RegExp.prototype.exec(string)`](/ecmascript-builtins/regular-expressions/#exec) | ES3 | ⚠️ Partial | Full match `result[0]`, `.index`, `.input` work, but capture groups `result[1]+` are `undefined` and `result.length` is always 3; `lastIndex` does not advance |
| [`RegExp.prototype.source`](/ecmascript-builtins/regular-expressions/#source) | ES3 | ✅ Works | |
| [`RegExp.prototype.global`](/ecmascript-builtins/regular-expressions/#global) | ES3 | ✅ Works | |
| [`RegExp.prototype.lastIndex`](/ecmascript-builtins/regular-expressions/#lastindex) | ES3 | ⚠️ Partial | Does not advance after `exec()`/`test()` with the `g` flag, and manual assignment is ignored — use `String.match(/.../g)` to get all matches |
| [`RegExp.prototype.ignoreCase`](/ecmascript-builtins/regular-expressions/#ignorecase) | ES3 | ❌ Missing | `undefined` in SFMC; track the `i` flag yourself |
| [`RegExp.prototype.multiline`](/ecmascript-builtins/regular-expressions/#multiline) | ES3 | ❌ Missing | `undefined` in SFMC; track the `m` flag yourself |
| [`re instanceof RegExp`](/ecmascript-builtins/regular-expressions/#instanceof) | ES3 | ⚠️ Partial | Always `false` (even for `new RegExp(...)`) — use `re.constructor === RegExp` |

### JSON

The native `JSON` object is unavailable — see [JSON](/ecmascript-builtins/json/) for the SFMC alternatives.

| Method | ES | Status | Notes |
|--------|----|--------|-------|
| [`JSON.parse(text)`](/ecmascript-builtins/json/#parse) | ES5 | ❌ Missing | Use [`Platform.Function.ParseJSON`](/platform-functions/parsejson/) |
| [`JSON.stringify(value)`](/ecmascript-builtins/json/#stringify) | ES5 | ❌ Missing | Use [`Platform.Function.Stringify`](/platform-functions/stringify/) or the bare-name [`Stringify`](/core-library/stringify/) Core global |

## In This Section

| Page | Description |
|------|-------------|
| [Global Functions](/ecmascript-builtins/global-functions/) | URI encode/decode functions (form-urlencoded quirks) and the missing `escape`/`unescape` |
| [Global Values](/ecmascript-builtins/global-values/) | `undefined`, `NaN`, the broken `Infinity`, and the missing `globalThis` |
| [Boolean](/ecmascript-builtins/boolean/) | The `Boolean` constructor and boxed-object `True`/`False` quirk |
| [Symbol](/ecmascript-builtins/symbol/) | Not available (ES6) — no unique primitives or iterator protocol |
| [BigInt](/ecmascript-builtins/bigint/) | Not available (ES2020) — no arbitrary-precision integers |
| [Array Methods](/ecmascript-builtins/array-methods/) | Safe and polyfillable array methods |
| [String Methods](/ecmascript-builtins/string-methods/) | The `String()` constructor/conversion function and safe / polyfillable string methods |
| [Error()](/ecmascript-builtins/error/) | The `Error` constructor and the SFMC-specific `.message` caveat |
| [Error Types](/ecmascript-builtins/error-types/) | The six present legacy `Error` subtypes and the missing `AggregateError` / `SuppressedError` / `InternalError` |
| [Keyed Collections](/ecmascript-builtins/keyed-collections/) | Not available (ES6) — `Map` / `Set` / `WeakMap` / `WeakSet` are absent |
| [Promises & Iteration](/ecmascript-builtins/promises-iteration/) | Not available (ES6+) — `Promise`, iterators, generators, and `async`/`await` are absent (synchronous engine) |
| [Reflection](/ecmascript-builtins/reflection/) | Not available (ES6) — `Proxy` and `Reflect` are absent |
| [Typed Arrays](/ecmascript-builtins/typed-arrays/) | Not available (ES6+) — `ArrayBuffer`, `DataView`, `Atomics`, and all typed-array views are absent |
| [Memory Management](/ecmascript-builtins/memory-management/) | Not available (ES2021) — `WeakRef` and `FinalizationRegistry` are absent |
| [Internationalization](/ecmascript-builtins/internationalization/) | Not available (ES2015) — `Intl` is absent and `toLocale*` methods ignore locale |
| [Math](/ecmascript-builtins/math/) | Math object reference |
| [Number Methods](/ecmascript-builtins/number-methods/) | Number methods, constants, and global numeric functions |
| [Object Methods](/ecmascript-builtins/object-methods/) | `hasOwnProperty`, `defineProperty`, and missing Object statics |
| [Function Methods](/ecmascript-builtins/function-methods/) | Native `call` / `apply`, the `arguments` object and `Function()` constructor, the `bind` (`bindFn`) helper, and the broken `.length` / `.name` / `toString` / `constructor` members |
| [Date Methods](/ecmascript-builtins/date-methods/) | Value-confirmed `Date` getters, string conversions, and `Date.UTC` |
| [Regular Expressions](/ecmascript-builtins/regular-expressions/) | `RegExp` `test`, `exec`, and the `source` / `global` / `lastIndex` accessors (`ignoreCase` / `multiline` are `undefined` in SFMC) |
| [JSON](/ecmascript-builtins/json/) | `JSON.parse` / `JSON.stringify` are unavailable — use `Platform.Function.ParseJSON` / `Platform.Function.Stringify` |
