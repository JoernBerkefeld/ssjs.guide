---
layout: page
title: Function Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/function-methods/
description: Function prototype members in SSJS — call and apply work natively (ES3), bind is missing (sealed prototype), .length throws, .name/.caller are undefined, and toString returns a tag not source. The arguments object and Function() constructor work.
verification: verified
differs_from_docs: true
---

`Function.prototype.call` and `Function.prototype.apply` are ES3 and work natively in SSJS. `Function.prototype.bind` (ES5) is **not** available, and `Function.prototype` is **sealed**, so `bind` cannot be installed on the prototype — use a standalone helper. The `arguments` object and the `Function()` constructor both work, but several introspection members behave unlike standard JavaScript: `.length` **throws**, `.name` and `.caller` are `undefined`, `toString()` returns `[object Function]` (not the source), and `fn.constructor === Function` is `false`.

Every member below is **runtime-verified on a live CloudPage** and cross-checked against [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) (ECMAScript built-ins have no Salesforce reference).

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or difference |
| ❌ Missing | Not available — use the workaround / polyfill |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Function.prototype.call(thisArg, ...args)`](#call) | ES3 | ✅ Works | |
| [`Function.prototype.apply(thisArg, argsArray)`](#apply) | ES3 | ✅ Works | |
| [`Function.prototype.bind(thisArg, ...args)`](#bind) | ES5 | ❌ Missing | Prototype is sealed — use the `bindFn` helper |
| [`arguments`](#arguments) | ES3 | ✅ Works | Array-like object inside every function |
| [`Function(...args, body)`](#function-constructor) | ES3 | ✅ Works | With or without `new` |
| [`Function.prototype.toString()`](#tostring) | ES3 | ⚠️ Differs | Returns `[object Function]`, not the source |
| [`Function.prototype.length`](#length) | ES3 | ❌ Broken | Throws a null-reference error |
| [`Function.prototype.name`](#name) | ES3 | ❌ Missing | `undefined` |
| [`Function.prototype.caller`](#caller) | ES3 | ❌ Missing | `undefined` |
| [`fn.constructor`](#constructor) | ES3 | ⚠️ Differs | `fn.constructor === Function` is `false` |

---

## call {#call}

`(ES3)` — ✅ Works. Calls the function with a given `this` value and arguments supplied individually.

```javascript
function greet(greeting) {
    return greeting + ", " + this.name;
}
var r = greet.call({ name: "Sam" }, "Hi");
Write(r);   // Hi, Sam
```

## apply {#apply}

`(ES3)` — ✅ Works. Calls the function with a given `this` value and arguments supplied as an array.

```javascript
function sum(a, b) { return a + b; }
var r = sum.apply(null, [2, 3]);
Write(r);   // 5
```

## bind {#bind}

`(ES5)` — ❌ Missing.

{% include callout.html type="danger" content="`Function.prototype.bind` is not available in SSJS (`typeof fn.bind` is `undefined`; calling it throws `Object expected: bind`), and `Function.prototype` is sealed — assigning `Function.prototype.bind = …` silently has no effect. Use the standalone `bindFn` helper from [Polyfills](/engine-limitations/polyfills/#function-prototype-bind) instead." %}

`bindFn(fn, thisArg[, ...preArgs])` returns a new function with `this` and any leading arguments pre-bound (built on the native `apply`):

```javascript
function bindFn(fn, thisArg) {
    var preArgs = [];
    for (var i = 2; i < arguments.length; i++) { preArgs.push(arguments[i]); }
    return function () {
        var callArgs = [];
        for (var a = 0; a < preArgs.length; a++) { callArgs.push(preArgs[a]); }
        for (var b = 0; b < arguments.length; b++) { callArgs.push(arguments[b]); }
        return fn.apply(thisArg, callArgs);
    };
}

var greet = function (greeting, name) { return greeting + ", " + name + "!"; };
var sayHi = bindFn(greet, null, "Hi");
Write(sayHi("Ada"));   // Hi, Ada!
```

## arguments {#arguments}

`(ES3)` — ✅ Works. The array-like `arguments` object is available inside every function: `arguments.length` and index access (`arguments[0]`, `arguments[1]`, …) both work, so you can accept a variable number of parameters.

```javascript
function total() {
    var t = 0;
    for (var i = 0; i < arguments.length; i++) { t += arguments[i]; }
    return t;
}
Write(total(10, 20, 30));   // 60
```

## Function() constructor {#function-constructor}

`(ES3)` — ✅ Works. The `Function` constructor builds a function from string arguments and a body, both with and without `new`.

```javascript
var multiply = new Function("a", "b", "return a * b;");
Write(multiply(6, 7));   // 42

var addOne = Function("x", "return x + 1;");   // no "new" also works
Write(addOne(41));       // 42
```

## toString {#tostring}

`(ES3)` — ⚠️ Differs.

{% include differs-from-mdn.html content="Standard `fn.toString()` returns the function **source code**. In the SFMC engine it returns the generic **`[object Function]`** object tag instead. (`String(fn)` and `\"\" + fn` yield `\"function\"`.) Do not rely on reading a function's source at runtime." link="#functionprototypetostring-returns-object-function-not-source" %}

```javascript
function greet() {}
Write(greet.toString());   // "[object Function]" in SFMC (not the source)
```

## length {#length}

`(ES3)` — ❌ Broken.

{% include callout.html type="danger" content="Reading `fn.length` **throws** `Object reference not set to an instance of an object.` in the SFMC engine — it does not return the declared argument count. `fn.hasOwnProperty(\"length\")` is `false`. Track expected arity yourself instead of reading `fn.length`. See [Known Bugs](/engine-limitations/known-bugs/#functionprototypelength-throws)." %}

```javascript
function sum(a, b) { return a + b; }
// var n = sum.length;   // ❌ THROWS "Object reference not set to an instance of an object."
var expectedArgs = 2;    // ✅ track arity yourself
```

## name {#name}

`(ES3)` — ❌ Missing.

{% include callout.html type="danger" content="`fn.name` is `undefined` in SSJS — it does not return the function's name. Pass an explicit name string where you need one." %}

```javascript
function greet() {}
Write(typeof greet.name);   // "undefined"
```

## caller {#caller}

`(ES3, deprecated)` — ❌ Missing.

{% include callout.html type="danger" content="The deprecated `fn.caller` property is `undefined` in SSJS. Do not rely on caller-chain introspection." %}

```javascript
function inner() { return typeof inner.caller; }
Write(inner());   // "undefined"
```

## constructor {#constructor}

`(ES3)` — ⚠️ Differs.

{% include differs-from-mdn.html content="`fn instanceof Function` is `true` (as expected), but `fn.constructor === Function` is **`false`** in the SFMC engine — the constructor identity link is broken. Use `instanceof Function` to test whether a value is a function, not a `.constructor === Function` comparison." link="#functionprototypeconstructor-identity-is-broken" %}

```javascript
function greet() {}
Write(greet instanceof Function);        // true
Write(greet.constructor === Function);   // false in SFMC (true in standard JS)
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/engine-limitations/differs-from-docs/">Differs from Official Docs</a></li>
  <li><a href="/engine-limitations/known-bugs/">Known Bugs</a></li>
  <li><a href="/ecmascript-builtins/">ECMAScript Built-ins</a></li>
</ul>
</div>
