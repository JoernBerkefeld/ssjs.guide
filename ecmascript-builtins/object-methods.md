---
layout: page
title: Object Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/object-methods/
description: Object methods in SSJS — hasOwnProperty, toString, valueOf, defineProperty and getPrototypeOf work; isPrototypeOf hangs the engine, propertyIsEnumerable is broken, and the ES5/ES6 Object statics are missing with for...in alternatives.
verification: verified
differs_from_docs: true
---

`hasOwnProperty`, `toString`, `valueOf` (ES3), `Object.defineProperty` and `Object.getPrototypeOf` (ES5) work in SSJS. `Object.prototype.isPrototypeOf` **hangs the engine** and `propertyIsEnumerable` is **broken**. Every other ES5/ES6 `Object` static (`keys`, `values`, `entries`, `assign`, `create`, `freeze`, `getOwnPropertyNames`, …) is **missing** — use `for...in` with `hasOwnProperty`.

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
| [`Object.prototype.toString()`](#tostring) | ES3 | ✅ Works | |
| [`Object.prototype.valueOf()`](#valueof) | ES3 | ✅ Works | |
| [`Object.prototype.isPrototypeOf(obj)`](#isprototypeof) | ES3 | ❌ Missing | Hangs the engine — never call it |
| [`Object.prototype.propertyIsEnumerable(prop)`](#propertyisenumerable) | ES3 | ⚠️ Partial | Broken — always returns `false` |
| [`Object.defineProperty(obj, prop, descriptor)`](#defineproperty) | ES5 | ✅ Works | |
| [`Object.getPrototypeOf(obj)`](#getprototypeof) | ES5 | ✅ Works | |
| [`Object.keys(obj)`](#keys) | ES5 | ❌ Missing | `for...in` with `hasOwnProperty` |
| [`Object.values(obj)`](#values) | ES6 | ❌ Missing | `for...in` with `hasOwnProperty` |
| [`Object.entries(obj)`](#entries) | ES6 | ❌ Missing | `for...in` with `hasOwnProperty` |
| [`Object.assign(target, ...src)`](#assign) | ES6 | ❌ Missing | Copy properties in a `for...in` loop |
| [`Object.create(proto)`](#create) | ES5 | ❌ Missing | Use a constructor function with a prototype |
| [`Object.freeze(obj)`](#freeze) | ES5 | ❌ Missing | Cannot enforce immutability — read-only by convention |
| [`Object.getOwnPropertyNames(obj)`](#getownpropertynames) | ES5 | ❌ Missing | `for...in` with `hasOwnProperty` (enumerable own keys) |
| [`Object.getOwnPropertyDescriptor(obj, prop)`](#getownpropertydescriptor) | ES5 | ❌ Missing | Read the value directly + `hasOwnProperty` |
| [`Object.defineProperties(obj, descriptors)`](#defineproperties) | ES5 | ❌ Missing | Call `Object.defineProperty` once per property |
| [`Object.seal / isSealed / preventExtensions / isExtensible`](#extensibility) | ES5 | ❌ Missing | No runtime extensibility control |

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

## toString {#tostring}

`(ES3)` — ✅ Works. Returns the default string representation of the object (e.g. `[object Object]`).

```javascript
var o = { a: 1 };
Write(o.toString());   // [object Object]
```

## valueOf {#valueof}

`(ES3)` — ✅ Works. Returns the primitive value of the object (the object itself for plain objects).

```javascript
var n = new Number(5);
Write(n.valueOf());   // 5
```

## isPrototypeOf {#isprototypeof}

`(ES3)` — ❌ Missing.

{% include callout.html type="danger" content="`Object.prototype.isPrototypeOf` exists in SFMC SSJS but **hangs the Jint engine** when called — the CloudPage times out and never returns. Never call it. Compare prototypes directly (e.g. `obj.constructor === Ctor`) or walk the prototype chain manually." %}

```javascript
// HANGS the engine — never call:
// Ctor.prototype.isPrototypeOf(obj);

// Safe alternative:
var isInstance = (obj.constructor === Ctor);
```

## propertyIsEnumerable {#propertyisenumerable}

`(ES3)` — ⚠️ Partial.

{% include callout.html type="warning" content="`Object.prototype.propertyIsEnumerable` exists but is **broken**: it returns `false` even for own enumerable properties. Use `hasOwnProperty` for own-property checks instead." %}

```javascript
var o = { a: 1 };
// o.propertyIsEnumerable("a") returns false (WRONG — should be true)
Write(o.hasOwnProperty("a"));   // true — use this instead
```

## defineProperty {#defineproperty}

`(ES5)` — ✅ Works. Defines or modifies a single property using a descriptor.

```javascript
var o = {};
Object.defineProperty(o, "x", { value: 42, enumerable: true });
Write(o.x);   // 42
```

## getPrototypeOf {#getprototypeof}

`(ES5)` — ✅ Works. Returns the prototype of the given object.

```javascript
var o = { a: 1 };
var proto = Object.getPrototypeOf(o);
Write(typeof proto);   // object
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

## values {#values}

`(ES6)` — ❌ Missing. Collect values with a `for...in` loop and `hasOwnProperty`.

```javascript
function values(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push(obj[k]); } }
    return result;
}
```

## entries {#entries}

`(ES6)` — ❌ Missing. Build `[key, value]` pairs with a `for...in` loop.

```javascript
function entries(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push([k, obj[k]]); } }
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

`(ES5)` — ❌ Missing. `Object.freeze` (and `isFrozen`) are unavailable and immutability cannot be enforced; treat the object as read-only by convention.

## getOwnPropertyNames {#getownpropertynames}

`(ES5)` — ❌ Missing. Use a `for...in` loop with `hasOwnProperty` (returns enumerable own keys only).

```javascript
function ownNames(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push(k); } }
    return result;
}
```

## getOwnPropertyDescriptor {#getownpropertydescriptor}

`(ES5)` — ❌ Missing. Read the property value directly and use `hasOwnProperty` to test ownership.

```javascript
// Instead of Object.getOwnPropertyDescriptor(obj, "x"):
var hasIt = obj.hasOwnProperty("x");
var value = hasIt ? obj.x : undefined;
```

## defineProperties {#defineproperties}

`(ES5)` — ❌ Missing. Only the singular `Object.defineProperty` works — call it once per property.

```javascript
var o = {};
Object.defineProperty(o, "a", { value: 1, enumerable: true });
Object.defineProperty(o, "b", { value: 2, enumerable: true });
```

## seal / isSealed / preventExtensions / isExtensible {#extensibility}

`(ES5)` — ❌ Missing. None of the extensibility controls are available; objects always remain extensible at runtime and there is nothing to test.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/engine-limitations/differs-from-docs/">Differs from Docs</a></li>
  <li><a href="/engine-limitations/known-bugs/">Known Bugs</a></li>
  <li><a href="/language/objects-and-json/">Objects &amp; JSON</a></li>
</ul>
</div>
