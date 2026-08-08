---
layout: page
title: Object Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/object-methods/
description: Object methods in SSJS — hasOwnProperty, toString, valueOf, defineProperty and getPrototypeOf work; isPrototypeOf hangs the engine, propertyIsEnumerable is broken, and the ES5/ES6 Object statics are missing with for...in alternatives.
verification: verified
differs_from_docs: true
test_scripts: complete
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
| [`Object.prototype.isPrototypeOf(obj)`](#isprototypeof) | ES3 | ⚠️ Partial | Present but **hangs the engine** when called — never call it |
| [`Object.prototype.propertyIsEnumerable(prop)`](#propertyisenumerable) | ES3 | ⚠️ Partial | Broken — always returns `false` |
| [`Object.defineProperty(obj, prop, descriptor)`](#defineproperty) | ES5 | ✅ Works | |
| [`Object.getPrototypeOf(obj)`](#getprototypeof) | ES5 | ✅ Works | |
| [`Object.keys(obj)`](#keys) | ES5 | ❌ Missing | `for...in` with `hasOwnProperty` |
| [`Object.values(obj)`](#values) | ES6 | ❌ Missing | `for...in` with `hasOwnProperty` |
| [`Object.entries(obj)`](#entries) | ES6 | ❌ Missing | `for...in` with `hasOwnProperty` |
| [`Object.assign(target, ...src)`](#assign) | ES6 | ❌ Missing | Copy properties in a `for...in` loop |
| [`Object.create(proto)`](#create) | ES5 | ❌ Missing | Use a constructor function with a prototype |
| [`Object.freeze / isFrozen(obj)`](#freeze) | ES5 | ❌ Missing | Cannot enforce immutability — read-only by convention |
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

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="hasownproperty" %}

## toString {#tostring}

`(ES3)` — ✅ Works. Returns the default string representation of the object (e.g. `[object Object]`).

```javascript
var o = { a: 1 };
Write(o.toString());   // [object Object]
```

{% include callout.html type="note" content="Only the **explicit** call returns `\"[object Object]\"`. Implicit coercion does not: `String({})` **throws** `Object reference not set to an instance of an object.` (catchable, no page abort) and `(\"\" + {})` yields the **empty string** — see [String() vs Stringify()](/ecmascript-builtins/string-methods/#string-constructor)." %}

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="tostring" %}

## valueOf {#valueof}

`(ES3)` — ✅ Works. Returns the primitive value of the object (the object itself for plain objects).

```javascript
var n = new Number(5);
Write(n.valueOf());   // 5
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="valueof" %}

## isPrototypeOf {#isprototypeof}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %}

{% include callout.html type="danger" content="`Object.prototype.isPrototypeOf` exists in SFMC SSJS but **hangs the Jint engine** when called — the CloudPage times out and never returns. Never call it. Compare prototypes directly (e.g. `obj.constructor === Ctor`) or walk the prototype chain manually." %}

{% include differs-from-mdn.html content="MDN specifies `isPrototypeOf` as a normal `Object.prototype` method that returns a boolean; the method is present in the SFMC Jint engine (`typeof` is `\"function\"`) but **calling it hangs the engine** — the request times out (HTTP 408) with no output. Never call it; compare `obj.constructor === Ctor` instead." %}

```javascript
// HANGS the engine — never call:
// Ctor.prototype.isPrototypeOf(obj);

// Safe alternative:
var isInstance = (obj.constructor === Ctor);
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="isprototypeof" %}

## propertyIsEnumerable {#propertyisenumerable}

`(ES3)` — ⚠️ Partial. {% include method-status.html status="verified" differs=true %}

{% include callout.html type="warning" content="`Object.prototype.propertyIsEnumerable` exists but is **broken**: it returns `false` even for own enumerable properties. Use `hasOwnProperty` for own-property checks instead." %}

{% include differs-from-mdn.html content="MDN specifies `propertyIsEnumerable(prop)` returns `true` for an own enumerable property; in the SFMC Jint engine it is present (`typeof` = `function`) but **returns `false` even for own enumerable properties**. Unlike the sibling `isPrototypeOf`, calling it does not hang the engine. Use `hasOwnProperty` for own-property checks instead." %}

```javascript
var o = { a: 1 };
// o.propertyIsEnumerable("a") returns false (WRONG — should be true)
Write(o.hasOwnProperty("a"));   // true — use this instead
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="propertyisenumerable" %}

## defineProperty {#defineproperty}

`(ES5)` — ✅ Works. Defines or modifies a single property using a descriptor.

```javascript
var o = {};
Object.defineProperty(o, "x", { value: 42, enumerable: true });
Write(o.x);   // 42
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="defineproperty" %}

## getPrototypeOf {#getprototypeof}

`(ES5)` — ✅ Works. Returns the prototype of the given object.

```javascript
var o = { a: 1 };
var proto = Object.getPrototypeOf(o);
Write(typeof proto);   // object
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="getprototypeof" %}

## keys {#keys}

`(ES5)` — ❌ Missing. {% include method-status.html status="verified" differs=true %} Use a `for...in` loop with `hasOwnProperty`.

```javascript
function keys(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push(k); } }
    return result;
}
```

{% include differs-from-mdn.html content="MDN documents a large set of `Object` statics. In the SFMC Jint engine only `Object.defineProperty` and `Object.getPrototypeOf` are present and working — `keys`, `values`, `entries`, `assign`, `create`, `freeze`, `isFrozen`, `defineProperties`, `getOwnPropertyNames`, `getOwnPropertyDescriptor`, `seal`, `isSealed`, `preventExtensions`, and `isExtensible` are all `undefined`. Use a `for...in` loop with `hasOwnProperty` for key/value enumeration." %}

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="keys" %}

## values {#values}

`(ES6)` — ❌ Missing. Collect values with a `for...in` loop and `hasOwnProperty`.

```javascript
function values(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push(obj[k]); } }
    return result;
}
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="values" %}

## entries {#entries}

`(ES6)` — ❌ Missing. Build `[key, value]` pairs with a `for...in` loop.

```javascript
function entries(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push([k, obj[k]]); } }
    return result;
}
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="entries" %}

## assign {#assign}

`(ES6)` — ❌ Missing. Copy properties with a `for...in` loop and `hasOwnProperty`.

```javascript
function assign(target, source) {
    for (var k in source) { if (source.hasOwnProperty(k)) { target[k] = source[k]; } }
    return target;
}
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="assign" %}

## create {#create}

`(ES5)` — ❌ Missing. Use a constructor function with a prototype instead.

```javascript
function makeWithProto(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="create" %}

## freeze / isFrozen {#freeze}

`(ES5)` — ❌ Missing. `Object.freeze` and `Object.isFrozen` are unavailable and immutability cannot be enforced; treat the object as read-only by convention.

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="freeze" %}

## getOwnPropertyNames {#getownpropertynames}

`(ES5)` — ❌ Missing. Use a `for...in` loop with `hasOwnProperty` (returns enumerable own keys only).

```javascript
function ownNames(obj) {
    var result = [];
    for (var k in obj) { if (obj.hasOwnProperty(k)) { result.push(k); } }
    return result;
}
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="getownpropertynames" %}

## getOwnPropertyDescriptor {#getownpropertydescriptor}

`(ES5)` — ❌ Missing. Read the property value directly and use `hasOwnProperty` to test ownership.

```javascript
// Instead of Object.getOwnPropertyDescriptor(obj, "x"):
var hasIt = obj.hasOwnProperty("x");
var value = hasIt ? obj.x : undefined;
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="getownpropertydescriptor" %}

## defineProperties {#defineproperties}

`(ES5)` — ❌ Missing. Only the singular `Object.defineProperty` works — call it once per property.

```javascript
var o = {};
Object.defineProperty(o, "a", { value: 1, enumerable: true });
Object.defineProperty(o, "b", { value: 2, enumerable: true });
```

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="defineproperties" %}

## seal / isSealed / preventExtensions / isExtensible {#extensibility}

`(ES5)` — ❌ Missing. None of the extensibility controls are available; objects always remain extensible at runtime and there is nothing to test.

{% include test-script.html bundle="ecmascript-builtins--object-methods" chapter="extensibility" %}

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
