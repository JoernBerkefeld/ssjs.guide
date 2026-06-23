---
layout: page
title: Object Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/object-methods/
description: Object prototype methods available in SSJS — safely checking own properties and iterating object keys without inheriting prototype members.
---

`Object` is available in SSJS. `hasOwnProperty` (ES3) and `Object.defineProperty` (ES5) are value-confirmed; `Object.getPrototypeOf` (ES5) exists but throws at runtime. ES6 static methods (`Object.keys()`, `Object.assign()`, etc.) are not available. Each section heading is tagged with its ECMAScript edition.

---

## hasOwnProperty `(ES3)`

Returns `true` if the object has the specified property as its own (not inherited through the prototype chain). Use this method inside `for...in` loops to skip inherited prototype members.

```javascript
Object.prototype.hasOwnProperty(v)
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `v` | string | Property name to check |

### Return Value

`boolean` — `true` if the property is an own property of the object, `false` otherwise.

### Example

```javascript
var obj = { name: "Jane", age: 30 };
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        Write(key + ": " + obj[key] + "<br>");
    }
}
// Outputs:
// name: Jane
// age: 30
```

---

## defineProperty `(ES5)`

`Object.defineProperty` is value-confirmed in SSJS. It defines a new property on an object, or modifies an existing one, using a property descriptor.

```javascript
Object.defineProperty(obj, prop, descriptor)
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `obj` | object | The object on which to define the property |
| `prop` | string | The name of the property to define |
| `descriptor` | object | The property descriptor (`value`, `enumerable`, etc.) |

### Return Value

`object` — the object that was passed in.

### Example

```javascript
var o = {};
Object.defineProperty(o, "x", { value: 42, enumerable: true });
Write(o.x);  // 42
```

---

## getPrototypeOf (broken — use polyfill) `(ES5)`

{% include callout.html type="danger" content="`Object.getPrototypeOf` exists in SFMC SSJS but throws at runtime, so it cannot be used directly. Apply the polyfill from [Polyfills](/engine-limitations/polyfills/), or access the constructor prototype directly." %}

```javascript
// Throws at runtime — do not use directly:
// var proto = Object.getPrototypeOf(obj);

// Safe alternative — read the constructor's prototype:
var proto = obj.constructor ? obj.constructor.prototype : null;
```

---

## Missing Object Statics

The following ES6 `Object` static methods are **not available** in SSJS:

| Method | ES | Alternative |
|--------|----|-------------|
| `Object.keys(obj)` | ES5 | Use `for...in` with `hasOwnProperty` |
| `Object.values(obj)` | ES6 | Use `for...in` with `hasOwnProperty` |
| `Object.entries(obj)` | ES6 | Use `for...in` with `hasOwnProperty` |
| `Object.assign(target, ...src)` | ES6 | Copy properties manually with a loop |
| `Object.create(proto)` | ES5 | Use a constructor function with a prototype |
| `Object.getOwnPropertyNames(obj)` | ES5 | Use `for...in` with `hasOwnProperty` (enumerable own keys only) |
| `Object.freeze(obj)` | ES5 | Not available — immutability cannot be enforced; treat as read-only by convention |
