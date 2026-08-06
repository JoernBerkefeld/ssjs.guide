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
5 << 1   // 10  (left shift)
5 >> 1   // 2   (right shift)
5 >>> 0  // 5   (unsigned right shift)
```

{% include callout.html type="warning" title="Negative operands throw" content="Every bitwise operator in this engine fails when either operand is negative — the value's sign, not the operator, is what breaks. `&`, `|`, `^` and `~` throw <code>Arithmetic operation resulted in an overflow.</code>; `<<`, `>>` and `>>>` throw that same message for a negative <strong>left</strong> operand and <code>Value was either too large or too small for a UInt16.</code> for a negative <strong>right</strong> operand. A negative value held in a variable behaves exactly like a negative literal. Guard the sign before applying any bitwise operator — see [Known Bugs](/engine-limitations/known-bugs/#bitwise-negative-operand-throws)." %}

```javascript
(-1) | 0     // throws: Arithmetic operation resulted in an overflow.
(-1) >>> 0   // throws: Arithmetic operation resulted in an overflow.
5 & (-1)     // throws: Arithmetic operation resulted in an overflow.
5 << (-1)    // throws: Value was either too large or too small for a UInt16.
```

{% include callout.html type="bug" title="~ is broken for every operand" content="Bitwise NOT never computes <code>-(x + 1)</code>. <code>~0</code>, <code>~1</code>, <code>~2</code>, <code>~5</code> and <code>~255</code> all return the same constant <code>1.84467440737096e+19</code> (2<sup>64</sup>), so <code>~5 === -6</code> is <code>false</code> and even <code>~5 &lt; 0</code> is <code>false</code>. Use <code>-(x + 1)</code> instead of <code>~x</code>, and never use <code>~indexOf(…)</code> as a truthiness idiom — see [Known Bugs](/engine-limitations/known-bugs/#bitwise-not-broken)." %}

```javascript
~5          // 1.84467440737096e+19  — expected -6
~5 === -6   // false
-(5 + 1)    // -6  — the working alternative
```

`<<` also does not truncate its result to 32 bits (`0x80000000 << 1` returns `4294967296`, not `0`), so bitwise code cannot rely on 32-bit wrap-around.
