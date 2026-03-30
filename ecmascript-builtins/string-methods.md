---
layout: page
title: String Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: String prototype methods available in SSJS — native methods, polyfill candidates, and ES3/ES5 safe alternatives for ES6+ methods.
---

## Length

```javascript
var str = "Hello";
str.length;  // 5
```

---

## Character Access

```javascript
var str = "Hello";
str.charAt(0);         // "H"
str.charCodeAt(0);     // 72
String.fromCharCode(72); // "H"
str[0];                // "H" (works in SSJS)
```

---

## Case Conversion

```javascript
"Hello World".toUpperCase();  // "HELLO WORLD"
"Hello World".toLowerCase();  // "hello world"
```

---

## Searching

### indexOf / lastIndexOf

```javascript
var str = "Hello World Hello";
str.indexOf("Hello");      // 0
str.lastIndexOf("Hello");  // 12
str.indexOf("xyz");        // -1
str.indexOf("o", 5);       // 7 (start from position 5)
```

### startsWith / endsWith / includes (missing — use indexOf)

```javascript
// startsWith
function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

// endsWith
function endsWith(str, suffix) {
    return str.lastIndexOf(suffix) === str.length - suffix.length;
}

// includes
function includes(str, sub) {
    return str.indexOf(sub) !== -1;
}
```

---

## Substrings

```javascript
var str = "Hello World";
str.slice(0, 5);       // "Hello"
str.slice(-5);         // "World"
str.substring(6, 11);  // "World"
str.substr(6, 5);      // "World" (deprecated but works)
```

---

## Trim (use polyfill)

```javascript
// Native trim may be missing — always use polyfill or Platform.Function.Trim
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    };
}
"  hello  ".trim();  // "hello"

// Or use Platform.Function
Platform.Function.Trim("  hello  ");  // "hello"
```

---

## Replace

```javascript
// Replace first occurrence
"aabbcc".replace("b", "X");          // "aaXbcc"

// Replace all (use regex with /g flag)
"aabbcc".replace(/b/g, "X");         // "aaXXcc"

// Case-insensitive replace
"Hello hello".replace(/hello/gi, "Hi"); // "Hi Hi"

// Replace with function
"hello world".replace(/\b\w/g, function(c) {
    return c.toUpperCase();
});  // "Hello World"
```

---

## Split

```javascript
"a,b,c".split(",");         // ["a", "b", "c"]
"hello".split("");          // ["h", "e", "l", "l", "o"]
"a  b  c".split(/\s+/);     // ["a", "b", "c"]
"a,b,c".split(",", 2);      // ["a", "b"] (limit)
```

---

## Match / Search

```javascript
var str = "Call 555-1234 or 555-5678";
var matches = str.match(/\d{3}-\d{4}/g);  // ["555-1234", "555-5678"]
str.search(/\d{3}-\d{4}/);                // 5
```

---

## String Repetition (missing — implement manually)

```javascript
// str.repeat(n) is ES6 — not available
function repeat(str, n) {
    var result = "";
    for (var i = 0; i < n; i++) {
        result += str;
    }
    return result;
}
repeat("ab", 3);  // "ababab"
```

---

## Padding (missing — implement manually)

```javascript
// padStart / padEnd are ES6 — not available
function padStart(str, targetLen, padChar) {
    str = String(str);
    padChar = padChar || " ";
    while (str.length < targetLen) {
        str = padChar + str;
    }
    return str;
}
function padEnd(str, targetLen, padChar) {
    str = String(str);
    padChar = padChar || " ";
    while (str.length < targetLen) {
        str = str + padChar;
    }
    return str;
}
padStart("7", 3, "0");  // "007"
```

---

## String.fromCharCode

```javascript
String.fromCharCode(65);         // "A"
String.fromCharCode(72, 101, 108, 108, 111);  // "Hello"
```

---

## Template Literal Alternative

Template literals are ES6 and not supported. Use string concatenation:

```javascript
// ES6 — NOT supported in SSJS:
// var msg = `Hello ${name}, you have ${count} messages.`;

// SSJS safe:
var msg = "Hello " + name + ", you have " + count + " messages.";
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/engine-limitations/missing-methods/">Missing Methods</a></li>
  <li><a href="/language/regular-expressions/">Regular Expressions</a></li>
  <li><a href="/platform-functions/trim/">Platform.Function.Trim</a></li>
</ul>
</div>
