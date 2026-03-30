---
layout: page
title: Data Types
parent: Language Guide
parent_url: /language/
description: Strings, numbers, booleans, null, undefined, objects, and arrays in SFMC SSJS.
---

## Primitive Types

### String

Strings use single or double quotes. No template literals (backticks).

```javascript
var single = 'Hello';
var double = "World";
var combined = "Hello, " + "World!"; // concatenation only
var withNewline = "Line 1\nLine 2";
var withQuote = "He said \"hello\"";
var withTab = "col1\tcol2";
```

String length:

```javascript
var str = "Hello";
var len = str.length; // 5
```

### Number

Numbers are IEEE 754 doubles (same as JavaScript).

```javascript
var integer = 42;
var decimal = 3.14;
var negative = -100;
var big = 1e6;   // 1000000
var nan = NaN;   // not a number
var inf = Infinity;

// Type checks
typeof 42 === "number"; // true
isNaN(NaN);             // true
isFinite(Infinity);     // false
```

### Boolean

```javascript
var yes = true;
var no  = false;

// Falsy values in SSJS (same as JS):
// false, 0, "", null, undefined, NaN

// Truthy: everything else, including "0", "false", [], {}
if ("false") { Write("Truthy!"); } // will execute
```

### null

Explicitly no value. Use for intentionally empty variables.

```javascript
var result = null;
typeof null === "object"; // true (JS quirk)
result === null;          // true
```

### undefined

A variable that has been declared but not assigned.

```javascript
var x;
typeof x === "undefined"; // true
x === undefined;          // true
```

**SFMC quirk:** `Platform.Function.Lookup()` returns an empty string `""` (not `null` or `undefined`) when no matching row is found. Check with `!result` or `result === ""`.

## Objects

Plain objects are key-value maps. Use them for structured data.

```javascript
var subscriber = {
    key:   "abc123",
    email: "jane@example.com",
    active: true
};

// Access
var email = subscriber.email;        // dot notation
var key   = subscriber["key"];       // bracket notation

// Assign
subscriber.name = "Jane Smith";
subscriber["status"] = "confirmed";

// Check property exists
if (subscriber.hasOwnProperty("email")) {
    // safe to access
}

// Iterate — always use hasOwnProperty
for (var prop in subscriber) {
    if (subscriber.hasOwnProperty(prop)) {
        Write(prop + ": " + subscriber[prop] + "<br>");
    }
}
```

> **Always use `hasOwnProperty` in `for...in` loops.** SFMC objects may have inherited enumerable properties (like `_type`) that you don't want to process.

## Arrays

Arrays are ordered lists. SSJS has ES3/5-safe array operations.

```javascript
var fruits = ["apple", "banana", "cherry"];
var nums   = [1, 2, 3, 4, 5];
var mixed  = ["text", 42, true, null];

// Access and length
var first = fruits[0];   // "apple"
var len   = fruits.length; // 3

// Safe array methods (available in SSJS)
fruits.push("date");          // add to end (returns new length)
fruits.pop();                  // remove from end
fruits.shift();                // remove from front
fruits.unshift("avocado");     // add to front
fruits.reverse();              // in-place reverse
fruits.sort();                 // in-place sort (lexicographic)

// Slice (safe)
var sub = fruits.slice(1, 3);  // ["banana", "cherry"] — no mutation

// String join
var str = fruits.join(", ");   // "apple, banana, cherry"
```

**Missing array methods — use polyfills or manual loops:**

```javascript
// ❌ These are NOT available in SSJS:
// arr.forEach(), arr.map(), arr.filter(), arr.find(), arr.indexOf()
// arr.every(), arr.some(), arr.reduce(), arr.includes()

// ✅ Manual equivalents:
for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    // process item
}
```

See [Polyfills](/engine-limitations/polyfills/) for ready-to-use Array method implementations.

## Type Conversions

```javascript
// String to number
var n1 = Number("42");    // 42
var n2 = parseInt("42px"); // 42
var n3 = parseFloat("3.14"); // 3.14
var n4 = "5" * 1;         // 5 (implicit)

// Number to string
var s1 = String(42);      // "42"
var s2 = 42 + "";         // "42" (concatenation coercion)
var s3 = (42).toString(); // "42"

// Boolean coercion
var b1 = Boolean(0);      // false
var b2 = Boolean("");     // false
var b3 = Boolean("0");    // true (non-empty string!)
var b4 = !!value;         // double-negation shorthand
```

## JSON

SSJS does **not** have `JSON.parse` or `JSON.stringify`. Use the SFMC alternatives:

```javascript
// Parse JSON string → object
var obj = Platform.Function.ParseJSON(jsonString + "");
// The + "" prevents a 500 error if jsonString is undefined

// Serialize object → JSON string
var jsonStr = Stringify(obj);
```
