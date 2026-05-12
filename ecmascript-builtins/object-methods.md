---
layout: page
title: Object Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/object-methods/
description: Object prototype methods available in SSJS — safely checking own properties and iterating object keys without inheriting prototype members.
---

`Object` is available in SSJS. Only `hasOwnProperty` is officially documented in the SFMC SSJS engine. ES6 static methods (`Object.keys()`, `Object.assign()`, etc.) are not available.

---

## hasOwnProperty

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

## Missing Object Statics

The following ES6 `Object` static methods are **not available** in SSJS:

| Method | Alternative |
|--------|-------------|
| `Object.keys(obj)` | Use `for...in` with `hasOwnProperty` |
| `Object.values(obj)` | Use `for...in` with `hasOwnProperty` |
| `Object.entries(obj)` | Use `for...in` with `hasOwnProperty` |
| `Object.assign(target, ...src)` | Copy properties manually with a loop |
| `Object.create(proto)` | Not available |
| `Object.freeze(obj)` | Not available |
