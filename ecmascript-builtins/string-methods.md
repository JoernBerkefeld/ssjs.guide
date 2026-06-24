---
layout: page
title: String Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: String prototype methods in SSJS — which work natively, which are partial, and which are missing, with ES3/ES5-safe alternatives and polyfill links.
---

Each member below is tagged with the ECMAScript edition that standardized it: `(ES3)`, `(ES5)`, or `(ES6)`. Methods that need a polyfill link to [Polyfills](/engine-limitations/polyfills/).

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available — use the workaround / polyfill |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`length`](#length) | ES3 | ✅ Works | |
| [`charAt(index)`](#charat) | ES3 | ✅ Works | `str[i]` also works |
| [`charCodeAt(index)`](#charcodeat) | ES3 | ✅ Works | |
| [`indexOf(search, fromIndex)`](#indexof) | ES3 | ✅ Works | |
| [`lastIndexOf(search, fromIndex)`](#lastindexof) | ES3 | ✅ Works | |
| [`toUpperCase()`](#touppercase) | ES3 | ✅ Works | |
| [`toLowerCase()`](#tolowercase) | ES3 | ✅ Works | |
| [`toLocaleLowerCase()`](#tolocalelowercase) | ES3 | ✅ Works | |
| [`substring(start, end)`](#substring) | ES3 | ✅ Works | |
| [`slice(start, end)`](#slice) | ES3 | ✅ Works | |
| [`concat(...strings)`](#concat) | ES3 | ✅ Works | |
| [`replace(pattern, replacement)`](#replace) | ES3 | ✅ Works | |
| [`localeCompare(other)`](#localecompare) | ES3 | ✅ Works | |
| [`match(regexp)`](#match) | ES3 | ⚠️ Partial | Returns `[]` (not `null`) on no match; no `.index` |
| [`search(regexp)`](#search) | ES3 | ⚠️ Partial | Returns `0` (not `-1`) on no match; unreliable — see Polyfills |
| [`split(separator, limit)`](#split) | ES3 | ⚠️ Partial | Empty-separator form does not split into chars — see Polyfills |
| [`trim()`](#trim) | ES5 | ❌ Missing | See Polyfills, or `Platform.Function.Trim` |
| [`substr(start, length)`](#substr) | ES3 | ❌ Missing | Throws at runtime — use `substring`/`slice` or polyfill |
| [`startsWith(prefix)`](#startswith) | ES6 | ❌ Missing | Use `indexOf(prefix) === 0` or polyfill |
| [`endsWith(suffix)`](#endswith) | ES6 | ❌ Missing | Use `lastIndexOf` check or polyfill |
| [`includes(substr)`](#includes) | ES6 | ❌ Missing | Use `indexOf(substr) !== -1` |
| [`trimStart()`](#trimstart) | ES6 | ❌ Missing | Use a `/^\s+/` replace |
| [`trimEnd()`](#trimend) | ES6 | ❌ Missing | Use a `/\s+$/` replace |
| [`padStart(targetLen, pad)`](#padstart) | ES6 | ❌ Missing | Prepend pad characters in a loop |
| [`padEnd(targetLen, pad)`](#padend) | ES6 | ❌ Missing | Append pad characters in a loop |
| [`repeat(count)`](#repeat) | ES6 | ❌ Missing | Concatenate in a loop |
| [`codePointAt(index)`](#codepointat) | ES6 | ❌ Missing | Use `charCodeAt` for BMP characters |

---

## length {#length}

`(ES3)` — ✅ Works. The number of UTF-16 code units in the string.

```javascript
"Hello".length;   // 5
```

## charAt {#charat}

`(ES3)` — ✅ Works. Returns the character at the given index. `str[i]` also works in SSJS.

```javascript
"Hello".charAt(0);   // "H"
"Hello"[0];          // "H"
```

## charCodeAt {#charcodeat}

`(ES3)` — ✅ Works. Returns the UTF-16 code unit at the given index.

```javascript
"Hello".charCodeAt(0);   // 72
```

## indexOf {#indexof}

`(ES3)` — ✅ Works. Returns the index of the first occurrence, or `-1`.

```javascript
"Hello World".indexOf("World");   // 6
"Hello World".indexOf("o", 5);    // 7
```

## lastIndexOf {#lastindexof}

`(ES3)` — ✅ Works. Returns the index of the last occurrence, or `-1`.

```javascript
"Hello World Hello".lastIndexOf("Hello");   // 12
```

## toUpperCase {#touppercase}

`(ES3)` — ✅ Works.

```javascript
"Hello".toUpperCase();   // "HELLO"
```

## toLowerCase {#tolowercase}

`(ES3)` — ✅ Works.

```javascript
"Hello".toLowerCase();   // "hello"
```

## toLocaleLowerCase {#tolocalelowercase}

`(ES3)` — ✅ Works. Locale-aware lowercase.

```javascript
"Hello".toLocaleLowerCase();   // "hello"
```

## substring {#substring}

`(ES3)` — ✅ Works. Returns the part of the string between two indices.

```javascript
"Hello World".substring(6, 11);   // "World"
```

## slice {#slice}

`(ES3)` — ✅ Works. Like `substring`, but supports negative indices.

```javascript
"Hello World".slice(0, 5);   // "Hello"
"Hello World".slice(-5);     // "World"
```

## concat {#concat}

`(ES3)` — ✅ Works. Concatenates strings. `+` is usually preferred.

```javascript
"Hello".concat(" ", "World");   // "Hello World"
```

## replace {#replace}

`(ES3)` — ✅ Works. Replaces matches of a string or RegExp. Use the `/g` flag to replace all.

```javascript
"aabbcc".replace("b", "X");    // "aaXbcc"
"aabbcc".replace(/b/g, "X");   // "aaXXcc"
"hello world".replace(/\b\w/g, function (c) { return c.toUpperCase(); });   // "Hello World"
```

## localeCompare {#localecompare}

`(ES3)` — ✅ Works. Compares two strings in the current locale.

```javascript
"apple".localeCompare("banana");   // negative
"apple".localeCompare("apple");    // 0
```

## match {#match}

`(ES3)` — ⚠️ Partial. In SFMC, `String.match` returns an **empty array `[]`** (not `null`) when there is no match, and matched results do **not** carry an `.index` property.

```javascript
var str = "Call 555-1234 or 555-5678";
str.match(/\d{3}-\d{4}/g);   // ["555-1234", "555-5678"]
str.match(/zzz/);            // [] (empty array in SFMC, not null)
```

## search {#search}

`(ES3)` — ⚠️ Partial. Unreliable in SFMC: returns `0` instead of `-1` for a no-match, and some real matches return the wrong index. Use [`match`](#match) or [`RegExp.test`](/ecmascript-builtins/regular-expressions/#test) to detect a match, or apply the [polyfill](/engine-limitations/polyfills/#string-prototype-search).

```javascript
"abc123".search(/\d/);   // unreliable — prefer match() or RegExp.test()
```

## split {#split}

`(ES3)` — ⚠️ Partial. The empty-separator form `str.split("")` does **not** split into characters in SFMC — it returns the whole string as a single element. Loop with `charAt`, or apply the [polyfill](/engine-limitations/polyfills/#string-prototype-split).

```javascript
"a,b,c".split(",");      // ["a", "b", "c"]
"a  b  c".split(/\s+/);  // ["a", "b", "c"]

// "hello".split("") — ❌ does NOT split into chars in SFMC. Loop instead:
var chars = [];
var s = "hello";
for (var i = 0; i < s.length; i++) { chars.push(s.charAt(i)); }
```

## trim {#trim}

`(ES5)` — ❌ Missing. Apply the [polyfill](/engine-limitations/polyfills/#string-prototype-trim), or use `Platform.Function.Trim`.

```javascript
function trim(str) {
    return String(str).replace(/^\s+/, "").replace(/\s+$/, "");
}
```

## substr {#substr}

`(ES3)` — ❌ Missing. `String.prototype.substr` throws at runtime in SFMC. Use [`substring`](#substring) or [`slice`](#slice), or apply the [polyfill](/engine-limitations/polyfills/#string-prototype-substr).

```javascript
"Hello World".substring(6, 11);   // "World"  (instead of substr(6, 5))
```

## startsWith {#startswith}

`(ES6)` — ❌ Missing. Use `indexOf(prefix) === 0` or the [polyfill](/engine-limitations/polyfills/#string-prototype-startswith).

```javascript
function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}
```

## endsWith {#endswith}

`(ES6)` — ❌ Missing. Use a `lastIndexOf` check or the [polyfill](/engine-limitations/polyfills/#string-prototype-endswith).

```javascript
function endsWith(str, suffix) {
    return str.lastIndexOf(suffix) === str.length - suffix.length;
}
```

## includes {#includes}

`(ES6)` — ❌ Missing. Use `indexOf(substr) !== -1`.

```javascript
function includes(str, sub) {
    return str.indexOf(sub) !== -1;
}
```

## trimStart {#trimstart}

`(ES6)` — ❌ Missing. Use a `/^\s+/` replace.

```javascript
function trimStart(str) {
    return String(str).replace(/^\s+/, "");
}
```

## trimEnd {#trimend}

`(ES6)` — ❌ Missing. Use a `/\s+$/` replace.

```javascript
function trimEnd(str) {
    return String(str).replace(/\s+$/, "");
}
```

## padStart {#padstart}

`(ES6)` — ❌ Missing. Prepend pad characters in a loop.

```javascript
function padStart(str, targetLen, padChar) {
    str = String(str);
    padChar = padChar || " ";
    while (str.length < targetLen) { str = padChar + str; }
    return str;
}
padStart("7", 3, "0");   // "007"
```

## padEnd {#padend}

`(ES6)` — ❌ Missing. Append pad characters in a loop.

```javascript
function padEnd(str, targetLen, padChar) {
    str = String(str);
    padChar = padChar || " ";
    while (str.length < targetLen) { str = str + padChar; }
    return str;
}
```

## repeat {#repeat}

`(ES6)` — ❌ Missing. Concatenate in a loop.

```javascript
function repeat(str, n) {
    var result = "";
    for (var i = 0; i < n; i++) { result += str; }
    return result;
}
repeat("ab", 3);   // "ababab"
```

## codePointAt {#codepointat}

`(ES6)` — ❌ Missing. Use `charCodeAt` for Basic Multilingual Plane characters.

```javascript
"A".charCodeAt(0);   // 65  (codePointAt(0) for BMP chars)
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/ecmascript-builtins/regular-expressions/">Regular Expressions</a></li>
  <li><a href="/platform-functions/trim/">Platform.Function.Trim</a></li>
</ul>
</div>
