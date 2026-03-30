---
layout: page
title: Unsupported Syntax
parent: Engine Limitations
parent_url: /engine-limitations/
description: 24 ES6+ JavaScript features that cause runtime errors in SFMC SSJS, with safe alternatives for each.
---

The SFMC SSJS engine does not support ES6+ syntax. Using any of the following features will cause a **runtime error** (often a blank white page with no diagnostic message).

## let and const

```javascript
// ❌ Not supported
let name = "Jane";
const MAX = 100;

// ✅ Use var
var name = "Jane";
var MAX = 100;  // Use UPPER_CASE by convention to signal "constant"
```

## Arrow Functions

```javascript
// ❌ Not supported
var double = (x) => x * 2;
var greet  = name => "Hello, " + name;
var fn     = () => { return 42; };

// ✅ Use function expressions
var double = function(x) { return x * 2; };
var greet  = function(name) { return "Hello, " + name; };
var fn     = function() { return 42; };
```

## Template Literals

```javascript
// ❌ Not supported
var msg = `Hello, ${name}! You have ${count} messages.`;
var html = `<div class="${cls}">${content}</div>`;

// ✅ Use string concatenation
var msg  = "Hello, " + name + "! You have " + count + " messages.";
var html = '<div class="' + cls + '">' + content + '</div>';
```

## Classes

```javascript
// ❌ Not supported
class Animal {
    constructor(name) { this.name = name; }
    speak() { return this.name + " speaks"; }
}

// ✅ Use constructor functions
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return this.name + " speaks";
};

// Or use the module/factory pattern (preferred in SSJS)
function createAnimal(name) {
    var animal = { speak: speak };
    return animal;
    function speak() { return name + " speaks"; }
}
```

## Destructuring

```javascript
// ❌ Not supported — object destructuring
var { name, email } = subscriber;
var { x: alias } = obj;

// ❌ Not supported — array destructuring
var [first, second] = arr;

// ✅ Access properties directly
var name  = subscriber.name;
var email = subscriber.email;
var first  = arr[0];
var second = arr[1];
```

## Default Parameters

```javascript
// ❌ Not supported
function greet(name = "Subscriber") { return "Hello, " + name; }

// ✅ Check inside function body
function greet(name) {
    name = name || "Subscriber";
    return "Hello, " + name;
}
```

## Spread Syntax

```javascript
// ❌ Not supported
var combined = [...arr1, ...arr2];
var copy = [...arr];
var merged = { ...obj1, ...obj2 };

// ✅ Use concat for arrays
var combined = arr1.concat(arr2);

// ✅ Manual object merge
function merge(a, b) {
    var result = {};
    for (var k in a) { if (a.hasOwnProperty(k)) result[k] = a[k]; }
    for (var k in b) { if (b.hasOwnProperty(k)) result[k] = b[k]; }
    return result;
}
```

## Rest Parameters

```javascript
// ❌ Not supported
function sum(...numbers) { return numbers.reduce((a, b) => a + b, 0); }

// ✅ Use the arguments object
function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
```

## for...of

```javascript
// ❌ Not supported
for (var item of items) { process(item); }

// ✅ Use for loop
for (var i = 0; i < items.length; i++) {
    process(items[i]);
}
```

## Async / Await

```javascript
// ❌ Not supported — SSJS has no Promise/async model
async function fetchData() {
    const data = await fetch(url);
    return data.json();
}

// ✅ SSJS HTTP calls are synchronous by nature
// Script.Util.HttpRequest.send() blocks until the response arrives
var req = new Script.Util.HttpRequest(url);
req.method = "GET";
var resp = req.send(); // Synchronous — no await needed
var data = Platform.Function.ParseJSON(String(resp.content) + "");
```

## Generators

```javascript
// ❌ Not supported
function* counter() { let n = 0; while (true) { yield n++; } }

// ✅ Use a closure-based counter
function makeCounter() {
    var n = 0;
    return function() { return n++; };
}
```

## ES Modules (import/export)

```javascript
// ❌ Not supported
import { lookup } from './helpers.js';
export function myHelper() { ... }

// ✅ All code must be in script blocks or script activity input
// Use the module factory pattern for organization
function DEHelper(deName) {
    return { lookup: lookup };
    function lookup(field, filterField, filterValue) {
        return Platform.Function.Lookup(deName, field, filterField, filterValue);
    }
}
```

## Optional Chaining (?.)

```javascript
// ❌ Not supported
var city = user?.profile?.address?.city;

// ✅ Manual chained checks
var city = (user && user.profile && user.profile.address)
           ? user.profile.address.city
           : undefined;

// Or use a helper
function safeGet(obj, path) {
    var parts = path.split(".");
    var current = obj;
    for (var i = 0; i < parts.length; i++) {
        if (current == null) return undefined;
        current = current[parts[i]];
    }
    return current;
}
var city = safeGet(user, "profile.address.city");
```

## Nullish Coalescing (??)

```javascript
// ❌ Not supported
var name = user.name ?? "Subscriber";

// ✅ Use || for falsy fallback (note: also catches "", 0, false)
var name = user.name || "Subscriber";

// ✅ Explicit null/undefined check when "" or 0 are valid
var name = (user.name !== null && user.name !== undefined) ? user.name : "Subscriber";
```

## Direct Object Literal Returns

This is an SSJS-specific engine bug (not an ES version issue):

```javascript
// ❌ May cause a 500 error in SSJS
function getConfig() {
    return { timeout: 30, retries: 3 };
}

// ✅ Assign to variable first, then return
function getConfig() {
    var config = { timeout: 30, retries: 3 };
    return config;
}
```

## new on User-Defined Constructors

Using `new` with custom (non-native) constructor functions can fail if the function uses the revealing module pattern (returns an object):

```javascript
// ⚠️ Risky — if MyModule uses "return service" pattern, new will fail
var instance = new MyModule(config);

// ✅ Call as a factory function (no new)
var instance = MyModule(config);
```

`new` is safe for: `Date`, `RegExp`, `Error`, `Object`, `Array`, `WSProxy`, `Script.Util.HttpRequest`.
