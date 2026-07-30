---
layout: page
title: String Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
verification: verified
test_scripts: complete
differs_from_docs: true
redirect_from:
  - /global-functions/string/
description: The String() constructor/conversion function and String prototype methods in SSJS — which work natively, which are partial, and which are missing, with ES3/ES5-safe alternatives and polyfill links.
---

Each member below is tagged with the ECMAScript edition that standardized it: `(ES3)`, `(ES5)`, or `(ES6)`. Methods that need a polyfill link to [Polyfills](/engine-limitations/polyfills/).

## The String() constructor {#string-constructor}

`(ES3)` — ✅ Works. `String(value)` is the native constructor called as a conversion function: it converts any value to its string representation. Called with no argument, `String()` returns `""`. In SFMC SSJS it has a critical extra use case: **converting CLR/.NET objects** — most importantly the `.content` of a [`Script.Util.HttpRequest`](/http/script-util-httprequest/) response — into real JavaScript strings.

```javascript
String(42);       // "42"
String(true);     // "true"
String();         // ""
```

### Converting CLR HTTP response content

`resp.content` is a .NET object, not a JS string — it cannot be passed directly to `Platform.Function.ParseJSON()`. Convert it first:

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
var resp = req.send();

// resp.content is a CLR object — convert before parsing
var bodyStr = String(resp.content);                       // CLR → JS string
var data    = Platform.Function.ParseJSON(bodyStr + "");  // JS string → object
```

### String() vs Stringify()

- `String(value)` — converts any value (including CLR objects) to a plain JS string; objects become `"[object Object]"`.
- [`Stringify(value)`](/core-library/stringify/) — serializes a JavaScript value to a **JSON** string.

```javascript
var obj = { a: 1, b: 2 };
String(obj);      // "[object Object]"   — NOT useful for JSON
Stringify(obj);   // '{"a":1,"b":2}'     — JSON serialization
```

Do not call `String(e)` on a thrown plain object (it can raise a .NET null-reference error) — see [Error()](/ecmascript-builtins/error/).

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="string-constructor" %}

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
| [`charAt(index)`](#charat) | ES3 | ⚠️ Partial | Out-of-range index returns the last char, not `""` |
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
| [`trim()`](#trim) | ES5 | ❌ Missing | See Polyfills |
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

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="length" %}

## charAt {#charat}

`(ES3)` — ⚠️ Partial. Returns the character at the given index. In-range indices behave normally, but **out-of-range indices are broken**: instead of the spec-mandated empty string `""`, SFMC returns the **last character** of the string. Guard the index against `.length` before calling.

```javascript
"Hello".charAt(0);    // "H"
"Hello"[0];           // "H"  (bracket access works in range)

"Hello".charAt(99);   // "o"  — ❌ SFMC returns the last char, not ""
"Hello".charAt(5);    // "o"  — ❌ same bug (spec says "")
"Hello"[99];          // throws "Index was outside the bounds of the array"
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="charat" %}

## charCodeAt {#charcodeat}

`(ES3)` — ✅ Works. Returns the UTF-16 code unit at the given index.

```javascript
"Hello".charCodeAt(0);   // 72
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="charcodeat" %}

## indexOf {#indexof}

`(ES3)` — ✅ Works. Returns the index of the first occurrence, or `-1`.

```javascript
"Hello World".indexOf("World");   // 6
"Hello World".indexOf("o", 5);    // 7
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="indexof" %}

## lastIndexOf {#lastindexof}

`(ES3)` — ✅ Works. Returns the index of the last occurrence, or `-1`.

```javascript
"Hello World Hello".lastIndexOf("Hello");   // 12
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="lastindexof" %}

## toUpperCase {#touppercase}

`(ES3)` — ✅ Works.

```javascript
"Hello".toUpperCase();   // "HELLO"
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="touppercase" %}

## toLowerCase {#tolowercase}

`(ES3)` — ✅ Works.

```javascript
"Hello".toLowerCase();   // "hello"
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="tolowercase" %}

## toLocaleLowerCase {#tolocalelowercase}

`(ES3)` — ✅ Works. Locale-aware lowercase.

```javascript
"Hello".toLocaleLowerCase();   // "hello"
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="tolocalelowercase" %}

## substring {#substring}

`(ES3)` — ✅ Works. Returns the part of the string between two indices.

```javascript
"Hello World".substring(6, 11);   // "World"
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="substring" %}

## slice {#slice}

`(ES3)` — ✅ Works. Like `substring`, but supports negative indices.

```javascript
"Hello World".slice(0, 5);   // "Hello"
"Hello World".slice(-5);     // "World"
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="slice" %}

## concat {#concat}

`(ES3)` — ✅ Works. Concatenates strings. `+` is usually preferred.

```javascript
"Hello".concat(" ", "World");   // "Hello World"
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="concat" %}

## replace {#replace}

`(ES3)` — ✅ Works. Replaces matches of a string or RegExp. Use the `/g` flag to replace all.

```javascript
"aabbcc".replace("b", "X");    // "aaXbcc"
"aabbcc".replace(/b/g, "X");   // "aaXXcc"
"hello world".replace(/\b\w/g, function (c) { return c.toUpperCase(); });   // "Hello World"
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="replace" %}

## localeCompare {#localecompare}

`(ES3)` — ✅ Works. Compares two strings in the current locale.

```javascript
"apple".localeCompare("banana");   // negative
"apple".localeCompare("apple");    // 0
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="localecompare" %}

## match {#match}

`(ES3)` — ⚠️ Partial. In SFMC, `String.match` returns an **empty array `[]`** (not `null`) when there is no match, and matched results do **not** carry an `.index` property.

```javascript
var str = "Call 555-1234 or 555-5678";
str.match(/\d{3}-\d{4}/g);   // ["555-1234", "555-5678"]
str.match(/zzz/);            // [] (empty array in SFMC, not null)
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="match" %}

## search {#search}

`(ES3)` — ⚠️ Partial. Unreliable in SFMC: returns `0` instead of `-1` for a no-match, and some real matches return the wrong index. Use [`match`](#match) or [`RegExp.test`](/ecmascript-builtins/regular-expressions/#test) to detect a match, or apply the [polyfill](/engine-limitations/polyfills/#string-prototype-search).

```javascript
"abc123".search(/\d/);   // unreliable — prefer match() or RegExp.test()
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="search" %}

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

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="split" %}

## trim {#trim}

`(ES5)` — ❌ Missing. Apply the [polyfill](/engine-limitations/polyfills/#string-prototype-trim). There is no `Platform.Function.Trim` in SSJS — reading it reports `clrmethodinfo` (a [phantom member](/engine-limitations/known-bugs/)), but calling it throws `Unable to retrieve security descriptor for this frame.`

```javascript
function trim(str) {
    return String(str).replace(/^\s+/, "").replace(/\s+$/, "");
}
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="trim" %}

## substr {#substr}

`(ES3)` — ❌ Missing. `String.prototype.substr` throws at runtime in SFMC. Use [`substring`](#substring) or [`slice`](#slice), or apply the [polyfill](/engine-limitations/polyfills/#string-prototype-substr).

```javascript
"Hello World".substring(6, 11);   // "World"  (instead of substr(6, 5))
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="substr" %}

## startsWith {#startswith}

`(ES6)` — ❌ Missing. Use `indexOf(prefix) === 0` or the [polyfill](/engine-limitations/polyfills/#string-prototype-startswith).

```javascript
function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="startswith" %}

## endsWith {#endswith}

`(ES6)` — ❌ Missing. Use a `lastIndexOf` check or the [polyfill](/engine-limitations/polyfills/#string-prototype-endswith).

```javascript
function endsWith(str, suffix) {
    return str.lastIndexOf(suffix) === str.length - suffix.length;
}
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="endswith" %}

## includes {#includes}

`(ES6)` — ❌ Missing. Use `indexOf(substr) !== -1`.

```javascript
function includes(str, sub) {
    return str.indexOf(sub) !== -1;
}
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="includes" %}

## trimStart {#trimstart}

`(ES6)` — ❌ Missing. Use a `/^\s+/` replace.

```javascript
function trimStart(str) {
    return String(str).replace(/^\s+/, "");
}
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="trimstart" %}

## trimEnd {#trimend}

`(ES6)` — ❌ Missing. Use a `/\s+$/` replace.

```javascript
function trimEnd(str) {
    return String(str).replace(/\s+$/, "");
}
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="trimend" %}

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

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="padstart" %}

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

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="padend" %}

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

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="repeat" %}

## codePointAt {#codepointat}

`(ES6)` — ❌ Missing. Use `charCodeAt` for Basic Multilingual Plane characters.

```javascript
"A".charCodeAt(0);   // 65  (codePointAt(0) for BMP chars)
```

{% include test-script.html bundle="ecmascript-builtins--string-methods" chapter="codepointat" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/ecmascript-builtins/regular-expressions/">Regular Expressions</a></li>
</ul>
</div>
