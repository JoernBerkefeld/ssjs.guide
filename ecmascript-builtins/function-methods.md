---
layout: page
title: Function Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/function-methods/
description: Function prototype methods in SSJS — call and apply work natively (ES3), while bind is missing because Function.prototype is sealed; use the bindFn helper.
---

`Function.prototype.call` and `Function.prototype.apply` are ES3 and work natively in SSJS. `Function.prototype.bind` (ES5) is **not** available, and `Function.prototype` is **sealed**, so `bind` cannot be installed on the prototype — use a standalone helper.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available — use the workaround / polyfill |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Function.prototype.call(thisArg, ...args)`](#call) | ES3 | ✅ Works | |
| [`Function.prototype.apply(thisArg, argsArray)`](#apply) | ES3 | ✅ Works | |
| [`Function.prototype.bind(thisArg, ...args)`](#bind) | ES5 | ❌ Missing | Prototype is sealed — use the `bindFn` helper |

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

{% include callout.html type="danger" content="`Function.prototype.bind` is not available in SSJS, and `Function.prototype` is sealed — assigning `Function.prototype.bind = …` silently has no effect. Use the standalone `bindFn` helper from [Polyfills](/engine-limitations/polyfills/#function-prototype-bind) instead." %}

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

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/ecmascript-builtins/">ECMAScript Built-ins</a></li>
</ul>
</div>
