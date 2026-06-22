---
layout: page
title: Function Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/function-methods/
description: Function prototype methods in SSJS — call and apply work natively (ES3), while bind is unavailable because Function.prototype is sealed.
---

`Function.prototype.call` and `Function.prototype.apply` are ES3 and work natively in SSJS — both are value-confirmed on a CloudPage. `Function.prototype.bind` (ES5) is **not** available, and unlike `Array.prototype` / `String.prototype`, `Function.prototype` is **sealed**, so `bind` cannot be installed on the prototype — use a standalone helper instead. Each section heading is tagged with its ECMAScript edition.

---

## call `(ES3)`

Calls the function with a given `this` value and arguments supplied individually.

```javascript
fn.call(thisArg[, arg1[, arg2[, ...]]])
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `thisArg` | any | The value to use as `this` when calling the function |
| `arg1, arg2, …` | any | Arguments passed to the function (optional, repeatable) |

### Return Value

`any` — whatever the called function returns.

### Example

```javascript
function greet(greeting) {
    return greeting + ", " + this.name;
}
var r = greet.call({ name: "Sam" }, "Hi");
Write(r);  // Hi, Sam
```

---

## apply `(ES3)`

Calls the function with a given `this` value and arguments supplied as an array.

```javascript
fn.apply(thisArg[, argsArray])
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `thisArg` | any | The value to use as `this` when calling the function |
| `argsArray` | Array | Array of arguments to pass to the function (optional) |

### Return Value

`any` — whatever the called function returns.

### Example

```javascript
function sum(a, b) {
    return a + b;
}
var r = sum.apply(null, [2, 3]);
Write(r);  // 5
```

---

## bind (unavailable — use the bindFn helper) `(ES5)`

{% include callout.html type="danger" content="`Function.prototype.bind` is not available in SSJS, and `Function.prototype` is sealed — assigning `Function.prototype.bind = …` silently has no effect. Use the standalone `bindFn` helper from [Polyfills](/engine-limitations/polyfills/) instead." %}

`bindFn(fn, thisArg[, ...preArgs])` returns a new function with `this` and any leading arguments pre-bound (it is built on the native `apply`):

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
Write(sayHi("Ada"));  // Hi, Ada!
```
