---
layout: page
title: Object Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/object-methods/
description: Object methods in SSJS — hasOwnProperty and defineProperty work, getPrototypeOf is broken, and the ES5/ES6 Object statics are missing with for...in alternatives.
---

`hasOwnProperty` (ES3) and `Object.defineProperty` (ES5) work in SSJS. `Object.getPrototypeOf` exists but throws. The ES5/ES6 `Object` statics (`keys`, `assign`, `create`, `freeze`, `getOwnPropertyNames`) are missing — use `for...in` with `hasOwnProperty`.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available — use the workaround / polyfill |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Object.prototype.hasOwnProperty(prop)`](#hasownproperty) | ES3 | ✅ Works | |
| [`Object.defineProperty(obj, prop, descriptor)`](#defineproperty) | ES5 | ✅ Works | |
| [`Object.getPrototypeOf(obj)`](#getprototypeof) | ES5 | ⚠️ Partial | Throws at runtime — see Polyfills |
| [`Object.keys(obj)`](#keys) | ES5 | ❌ Missing | `for...in` with `hasOwnProperty` |
| [`Object.assign(target, ...src)`](#assign) | ES6 | ❌ Missing | Copy properties in a `for...in` loop |
| [`Object.create(proto)`](#create) | ES5 | ❌ Missing | Use a constructor function with a prototype |
| [`Object.freeze(obj)`](#freeze) | ES5 | ❌ Missing | Cannot enforce immutability — read-only by convention |
| [`Object.getOwnPropertyNames(obj)`](#getownpropertynames) | ES5 | ❌ Missing | `for...in` with `hasOwnProperty` (enumerable own keys) |

---

## hasOwnProperty {#hasownproperty}

`(ES3)` — ✅ Works. Returns `true` if the object has the property as its own (not inherited). Use it inside `for...in` loops to skip inherited members.

```javascript
var obj = { name: "Jane", age: 30 };
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        Write(key + ": " + obj[key] + "<br>");
    }
}
```

## defineProperty {#defineproperty}

`(ES5)` — ✅ Works. Defines or modifies a property using a descriptor.

```javascript
var o = {};
Object.defineProperty(o, "x", { value: 42, enumerable: true });
Write(o.x);   // 42
```

## getPrototypeOf {#getprototypeof}

`(ES5)` — ⚠️ Partial.

{% include callout.html type="danger" content="`Object.getPrototypeOf` exists in SFMC SSJS but throws at runtime, so it cannot be used directly. Apply the polyfill from [Polyfills](/engine-limitations/polyfills/#object-getprototypeof), or read the constructor's prototype directly." %}

```javascript
// Throws at runtime — do not use directly:
// var proto = Object.getPrototypeOf(obj);

// Safe alternative — read the constructor's prototype:
var proto = obj.constructor ? obj.constructor.prototype : null;
```

## keys {#keys}

`(ES5)` — ❌ Missing. Use a `for...in` loop with `hasOwnProperty`.

```javascript
function keys(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push(k); } }
    return result;
}
```

## assign {#assign}

`(ES6)` — ❌ Missing. Copy properties with a `for...in` loop and `hasOwnProperty`.

```javascript
function assign(target, source) {
    for (var k in source) { if (source.hasOwnProperty(k)) { target[k] = source[k]; } }
    return target;
}
```

## create {#create}

`(ES5)` — ❌ Missing. Use a constructor function with a prototype instead.

```javascript
function makeWithProto(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}
```

## freeze {#freeze}

`(ES5)` — ❌ Missing. `Object.freeze` is unavailable and immutability cannot be enforced; treat the object as read-only by convention.

## getOwnPropertyNames {#getownpropertynames}

`(ES5)` — ❌ Missing. Use a `for...in` loop with `hasOwnProperty` (returns enumerable own keys only).

```javascript
function ownNames(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push(k); } }
    return result;
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/language/objects-and-json/">Objects &amp; JSON</a></li>
</ul>
</div>
