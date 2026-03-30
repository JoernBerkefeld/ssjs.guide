---
layout: page
title: Functions & Scope
parent: Language Guide
parent_url: /language/
description: Function declarations, expressions, closures, the module pattern, and scope in SSJS.
---

## Function Declarations

Function declarations are hoisted to the top of their scope:

```javascript
// Can call before declaration thanks to hoisting
greet("Jane");

function greet(name) {
    Write("Hello, " + name + "!");
}
```

## Function Expressions

Assigned to variables — not hoisted:

```javascript
var greet = function(name) {
    Write("Hello, " + name + "!");
};

greet("Jane"); // Must be called AFTER the assignment
```

## Parameters and Return Values

```javascript
function add(a, b) {
    return a + b;
}

// Default parameter simulation (no default params in SSJS)
function greet(name, greeting) {
    greeting = greeting || "Hello";
    name = name || "Subscriber";
    return greeting + ", " + name + "!";
}

// Variable arguments (no rest params)
function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
sum(1, 2, 3); // 6
```

## Arrow Functions — NOT SUPPORTED

Arrow functions are ES6 and will throw a runtime error:

```javascript
// ❌ Not supported in SSJS
var double = (x) => x * 2;
var greet  = name => "Hello, " + name;

// ✅ Use function expressions instead
var double = function(x) { return x * 2; };
var greet  = function(name) { return "Hello, " + name; };
```

## Closures

Closures work as in standard JavaScript — inner functions capture references to outer scope:

```javascript
function makeCounter(start) {
    var count = start || 0;
    return function() {
        count++;
        return count;
    };
}

var counter = makeCounter(10);
Write(counter()); // 11
Write(counter()); // 12
Write(counter()); // 13
```

Closures are commonly used for configuration objects:

```javascript
function createLogger(prefix) {
    return {
        log: function(msg) {
            Write("[" + prefix + "] " + msg + "<br>");
        },
        error: function(msg) {
            Write("[" + prefix + " ERROR] " + msg + "<br>");
        }
    };
}

var logger = createLogger("SSJS");
logger.log("Starting process...");
logger.error("Something went wrong");
```

## The Module Pattern (SFMC Best Practice)

Because SSJS lacks classes, modules, or proper encapsulation, the **Revealing Module Pattern** is the recommended approach for building reusable utilities:

```javascript
/**
 * Creates a DataExtension helper module.
 * @param {string} deName - Data Extension name
 * @returns {{ lookup: Function, upsert: Function }}
 */
function DEHelper(deName) {
    var service = {
        lookup: lookup,
        upsert: upsert,
        count:  count
    };

    return service;

    function lookup(returnField, filterField, filterValue) {
        return Platform.Function.Lookup(deName, returnField, filterField, filterValue);
    }

    function upsert(keyFields, keyValues, dataFields, dataValues) {
        return Platform.Function.UpsertData(deName, keyFields, keyValues, dataFields, dataValues);
    }

    function count() {
        return Platform.Function.DataExtensionRowCount(deName);
    }
}

// Usage
var subscribers = DEHelper("Subscribers");
var email = subscribers.lookup("Email", "SubscriberKey", sk);
subscribers.upsert(["SubscriberKey"], [sk], ["LastSeen"], [Platform.Function.Now()]);
```

Key properties of this pattern:
- Calling `DEHelper()` **without `new`** is safe — no `this` binding issues
- Returns a plain object of named functions — easy to extend and test
- Inner functions capture `deName` in closure — no global state needed
- **Never use `return { method: function() {...} }` directly** — SSJS has a bug where returning an object literal from a function can fail. Use the pattern above (assign to variable, return variable) instead.

## Object Literal Return Bug

This is a known SSJS engine limitation:

```javascript
// ❌ May fail in some SSJS contexts
function getConfig() {
    return {
        timeout: 30,
        retries: 3
    };
}

// ✅ Assign to variable first, then return
function getConfig() {
    var config = {
        timeout: 30,
        retries: 3
    };
    return config;
}
```

## Recursive Functions

Recursion works normally, but SSJS has stack limits. Keep recursion depth reasonable (< 100 levels):

```javascript
function factorial(n) {
    if (n <= 1) { return 1; }
    return n * factorial(n - 1);
}

Write(factorial(10)); // 3628800
```

## IIFE (Immediately Invoked Function Expression)

Useful for creating a private scope:

```javascript
(function() {
    var privateVar = "not visible outside";
    
    // All code here is scoped
    var result = Platform.Function.Lookup("Config", "Value", "Key", "timeout");
    
    // Only expose what's needed
    Platform.Variable.SetValue("@timeout", result);
})();
```
