---
layout: page
title: Operators
parent: Language Guide
parent_url: /language/
description: Arithmetic, comparison, logical, string concatenation, and assignment operators in SFMC SSJS.
---

## Arithmetic

```javascript
var a = 10, b = 3;

a + b;   // 13
a - b;   // 7
a * b;   // 30
a / b;   // 3.333...
a % b;   // 1 (modulo)

// Increment / decrement
var n = 0;
n++;   // post-increment
++n;   // pre-increment
n--;   // post-decrement
--n;   // pre-decrement
```

## String Concatenation

`+` concatenates strings. When mixing types, JavaScript coerces non-strings:

```javascript
"Hello, " + "World"   // "Hello, World"
"Count: " + 42        // "Count: 42"
"Sum: " + (1 + 2)     // "Sum: 3" (parentheses force arithmetic first)
"Sum: " + 1 + 2       // "Sum: 12" (left-to-right string concat!)
```

Concatenating across multiple lines:

```javascript
var html = '<div class="profile">' +
           '<h2>' + name + '</h2>' +
           '<p>' + email + '</p>' +
           '</div>';
```

## Comparison

```javascript
// Loose equality (type coercion)
5 == "5"     // true — avoid this
null == undefined // true

// Strict equality (no coercion) — PREFERRED
5 === 5      // true
5 === "5"    // false
null === undefined // false

// Inequality
5 != "5"     // false (loose)
5 !== "5"    // true  (strict — preferred)

// Relational
5 > 3        // true
5 >= 5       // true
3 < 5        // true
3 <= 3       // true

// String comparison (lexicographic)
"b" > "a"    // true
"banana" > "apple" // true
```

**Use strict equality (`===` and `!==`) to avoid subtle type coercion bugs.**

## Logical Operators

```javascript
// AND — returns first falsy or last truthy
true && true   // true
true && false  // false
"a" && "b"    // "b" (last truthy)
"" && "b"     // "" (first falsy)

// OR — returns first truthy or last falsy
false || true  // true
"a" || "b"    // "a" (first truthy)
"" || "b"     // "b" (first truthy)
null || "default" // "default"

// NOT
!true    // false
!false   // true
!""      // true (empty string is falsy)
!"text"  // false
!!value  // double-negation → boolean coercion
```

**Short-circuit defaults pattern:**

```javascript
// Provide fallback values using || (no ?? operator in SSJS)
var name    = Platform.Request.GetQueryStringParameter("name") || "Subscriber";
var timeout = config.timeout || 30;
var debug   = options.debug || false;
```

**Note:** `||` returns the first truthy value — `0` and `""` are falsy, so this won't work if `0` or `""` are valid values. In those cases, use explicit checks:

```javascript
var count = (options.count !== undefined && options.count !== null)
            ? options.count
            : 0;
```

## Ternary Operator

```javascript
var message = isLoggedIn ? "Welcome back!" : "Please log in.";

// Nested (use sparingly — hard to read)
var label = count === 0 ? "none" : (count === 1 ? "one" : "many");
```

## Assignment Operators

```javascript
var x = 5;
x += 3;  // x = x + 3  → 8
x -= 2;  // x = x - 2  → 6
x *= 4;  // x = x * 4  → 24
x /= 6;  // x = x / 6  → 4
x %= 3;  // x = x % 3  → 1
```

## typeof

```javascript
typeof "string"   // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (JS quirk)
typeof {}         // "object"
typeof []         // "object"
typeof function(){} // "function"
```

Use `typeof` for safe existence checks:

```javascript
if (typeof myVar !== "undefined") {
    // myVar has been declared and assigned
}
```

## Bitwise (rarely needed)

```javascript
5 & 3    // 1   (AND)
5 | 3    // 7   (OR)
5 ^ 3    // 6   (XOR)
~5       // -6  (NOT)
5 << 1   // 10  (left shift)
5 >> 1   // 2   (right shift)
```
