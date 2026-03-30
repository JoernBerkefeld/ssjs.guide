---
layout: page
title: Language Guide
description: The JavaScript subset that works in SFMC's SSJS engine — variables, types, control flow, loops, functions, objects, error handling, and more.
---

SFMC's SSJS engine runs JavaScript using JINT (JavaScript Interpreter for .NET), which implements roughly **ECMAScript 3 with some ES5 additions**. This guide covers the language features available to you and how they behave in the SFMC context.

## In This Section

- [Variables](/language/variables/) — `var` declarations, scope, and hoisting
- [Data Types](/language/data-types/) — strings, numbers, booleans, null/undefined, objects, arrays
- [Operators](/language/operators/) — arithmetic, comparison, logical, string concatenation
- [Control Flow](/language/control-flow/) — `if`/`else`, ternary, `switch` (with its bug)
- [Loops](/language/loops/) — `for`, `while`, `do...while`, `for...in`, performance tips
- [Functions & Scope](/language/functions-and-scope/) — declarations, expressions, closures, module pattern
- [Objects & JSON](/language/objects-and-json/) — object literals, JSON stringify/parse, iteration
- [Error Handling](/language/error-handling/) — `try`/`catch`/`finally`, `throw`, error patterns
- [Regular Expressions](/language/regular-expressions/) — patterns, `test`, `match`, `replace`

## Quick Reference

```javascript
// Variables — always use var
var name = "World";
var count = 0;
var active = true;
var data = null;

// Strings — single or double quotes, no template literals
var greeting = "Hello, " + name + "!";
var multi = "Line 1\nLine 2";

// Arrays — ES3 style
var arr = [1, 2, 3];
var len = arr.length;
arr[arr.length] = 4; // push equivalent
// No: arr.push, arr.forEach, arr.map, arr.filter

// Objects
var person = { name: "Jane", age: 30 };
var keys = [];
for (var k in person) {
    if (person.hasOwnProperty(k)) {
        keys[keys.length] = k;
    }
}

// Functions
function add(a, b) {
    return a + b;
}
var multiply = function(a, b) { return a * b; };

// Error handling
try {
    var result = riskyOperation();
} catch (e) {
    Write("Error: " + e.message);
}
```

## What Does NOT Work

```javascript
// ❌ ES6+ — none of these work in SSJS
const MAX = 100;              // no const
let counter = 0;              // no let
var fn = (x) => x * 2;       // no arrow functions
var str = `Hello ${name}`;    // no template literals
var { a, b } = obj;           // no destructuring
class MyClass {}               // no classes
async function f() {}          // no async/await
import something from 'mod';   // no modules
var arr2 = [...arr, 4];        // no spread
var obj2 = { ...obj, c: 3 };   // no spread
var x = obj?.prop;             // no optional chaining
var y = val ?? "default";      // no nullish coalescing
```

See [Engine Limitations](/engine-limitations/) for the complete list.
