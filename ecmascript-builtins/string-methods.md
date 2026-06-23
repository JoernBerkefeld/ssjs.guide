---
layout: page
title: String Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: String prototype methods available in SSJS — native methods, polyfill candidates, and ES3/ES5 safe alternatives for ES6+ methods.
---

Each section heading is tagged with the ECMAScript edition that standardized the methods it covers: `(ES3)`, `(ES5)`, or `(ES6)`.

## Length `(ES3)`

```javascript
var str = "Hello";
str.length;  // 5
```

---

## Character Access `(ES3)`

```javascript
var str = "Hello";
str.charAt(0);         // "H"
str.charCodeAt(0);     // 72
String.fromCharCode(72); // "H"
str[0];                // "H" (works in SSJS)
```

---

## Case Conversion `(ES3)`

```javascript
"Hello World".toUpperCase();        // "HELLO WORLD"
"Hello World".toLowerCase();        // "hello world"
"Hello World".toLocaleLowerCase();  // "hello world" (locale-aware lowercase)
```

---

## Searching

### indexOf / lastIndexOf `(ES3)`

```javascript
var str = "Hello World Hello";
str.indexOf("Hello");      // 0
str.lastIndexOf("Hello");  // 12
str.indexOf("xyz");        // -1
str.indexOf("o", 5);       // 7 (start from position 5)
```

### startsWith / endsWith / includes (missing — use indexOf or polyfill) `(ES6)`

{% include callout.html type="warning" content="`startsWith`, `endsWith`, and `includes` are ES6 and not available in SFMC SSJS. Apply polyfills from [Polyfills](/engine-limitations/polyfills/) or use the patterns below." %}

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

## Substrings `(ES3)`

{% include callout.html type="warning" content="`String.prototype.substr` throws at runtime in SFMC SSJS — it is **not** available. Use `substring` or `slice` instead, or apply the `substr` polyfill from [Polyfills](/engine-limitations/polyfills/)." %}

```javascript
var str = "Hello World";
str.slice(0, 5);       // "Hello"
str.slice(-5);         // "World"
str.substring(6, 11);  // "World"
// str.substr(6, 5);   // ❌ throws in SFMC — use substring/slice or the polyfill
```

---

## Trim (use polyfill) `(ES5)`

{% include callout.html type="warning" content="`String.prototype.trim` is not available in SFMC SSJS. Apply a polyfill. See [Polyfills](/engine-limitations/polyfills/)." %}

---

## Replace `(ES3)`

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

## Split `(ES3)`

{% include callout.html type="warning" content="The empty-separator form `str.split(\"\")` does **not** split into characters in SFMC SSJS — it returns the whole string as a single element. To get characters, loop with `charAt`, or use the `split` polyfill from [Polyfills](/engine-limitations/polyfills/)." %}

```javascript
"a,b,c".split(",");         // ["a", "b", "c"]
"a  b  c".split(/\s+/);     // ["a", "b", "c"]
"a,b,c".split(",", 2);      // ["a", "b"] (limit)

// "hello".split("");       // ❌ does NOT split into characters in SFMC
// Get characters by looping instead:
var chars = [];
var s = "hello";
for (var i = 0; i < s.length; i++) { chars.push(s.charAt(i)); }
// chars is now ["h", "e", "l", "l", "o"]
```

---

## Match / Search `(ES3)`

{% include callout.html type="warning" content="In SFMC SSJS, `String.match` returns an **empty array `[]`** (not `null`) when there is no match, and matched results do **not** carry a `.index` property. `String.search` is unreliable — it returns `0` instead of `-1` for a no-match, and some real matches return the wrong index — use `String.match` or `RegExp.test` to detect a match reliably, or apply the `search` polyfill from [Polyfills](/engine-limitations/polyfills/)." %}

```javascript
var str = "Call 555-1234 or 555-5678";
var matches = str.match(/\d{3}-\d{4}/g);  // ["555-1234", "555-5678"]
str.match(/zzz/);                         // [] (empty array in SFMC, not null)
str.search(/\d{3}-\d{4}/);                // unreliable in SFMC — may return the wrong index
str.search(/zzz/);                        // 0 in SFMC (spec would give -1) — ambiguous
```

---

## localeCompare `(ES3)`

```javascript
"apple".localeCompare("banana");  // negative (apple sorts before banana)
"banana".localeCompare("apple");  // positive
"apple".localeCompare("apple");   // 0 (equal)
```

---

## String Repetition (missing — implement manually) `(ES6)`

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

## Padding (missing — implement manually) `(ES6)`

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

## String.fromCharCode `(ES3)`

```javascript
String.fromCharCode(65);         // "A"
String.fromCharCode(72, 101, 108, 108, 111);  // "Hello"
```

---

## Template Literal Alternative `(ES6)`

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
