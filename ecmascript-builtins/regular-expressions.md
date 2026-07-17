---
layout: page
title: Regular Expressions
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/regular-expressions/
redirect_from:
    - /language/regular-expressions/
description: RegExp in SSJS — creation, flags, test, exec, and the source/global/lastIndex accessors, with the SFMC engine quirks for capture groups, lastIndex, ignoreCase, multiline, and instanceof.
verification: verified
differs_from_docs: true
---

Regular expressions work in SSJS using the ES3/ES5 `RegExp` API. Literal and constructor syntax both work, and `test`, `String.match`, `String.replace` (including `$1` back-references and function replacers), and `String.split` behave as expected. A few accessors, `exec`'s capture-group / `lastIndex` behavior, `instanceof RegExp`, and `String.search`'s return index differ from the spec — those are flagged below. Every fact on this page has been proven against live SFMC CloudPage runtime output.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available (or `undefined`) — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`RegExp.prototype.test(string)`](#test) | ES3 | ✅ Works | Most reliable way to check for a match |
| [`RegExp.prototype.exec(string)`](#exec) | ES3 | ⚠️ Partial | Full match `result[0]`, `result.index`, and `result.input` work; capture groups `result[1]+` are `undefined` and `lastIndex` does not advance |
| [`RegExp.prototype.source`](#source) | ES3 | ✅ Works | Pattern text without slashes or flags |
| [`RegExp.prototype.global`](#global) | ES3 | ✅ Works | `true` if the `g` flag was set |
| [`RegExp.prototype.lastIndex`](#lastindex) | ES3 | ⚠️ Partial | Does not advance after `exec()` / `test()` with the `g` flag; setting it manually is ignored |
| [`RegExp.prototype.ignoreCase`](#ignorecase) | ES3 | ❌ Missing | `undefined` in SFMC — track the `i` flag yourself |
| [`RegExp.prototype.multiline`](#multiline) | ES3 | ❌ Missing | `undefined` in SFMC — track the `m` flag yourself |
| [`re instanceof RegExp`](#instanceof) | ES3 | ⚠️ Partial | Always `false` (even for `new RegExp(...)`) — use `re.constructor === RegExp` |

---

## Creating RegExp

```javascript
// Literal syntax (preferred)
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var digitsOnly   = /^\d+$/;
var noSpaces     = /\s/g;

// Constructor syntax (for dynamic patterns)
var fieldName = "email";
var dynamicPattern = new RegExp(fieldName + "=([^&]+)", "i");
```

## Flags

| Flag | Meaning |
|------|---------|
| `g` | Global — find all matches, not just the first |
| `i` | Case-insensitive |
| `m` | Multiline — `^` and `$` match line boundaries |

```javascript
var text = "Hello World hello";

/hello/i.test(text);   // true (case-insensitive)
text.match(/hello/gi); // ["Hello", "hello"] (global + case-insensitive)
```

---

## test {#test}

`(ES3)` — ✅ Works. Returns `true` if the pattern matches the string, `false` otherwise. This is the most reliable way to detect a match in SFMC.

```javascript
var email = "jane@example.com";
var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (emailRe.test(email)) {
    Write("Valid email");
} else {
    Write("Invalid email");
}
```

> `Platform.Function.IsEmailAddress()` is usually more reliable than a custom regex for SFMC email validation.

---

## exec {#exec}

`(ES3)` — ⚠️ Partial. `exec` returns an array whose `result[0]` (full match), `result.index`, and `result.input` are all correct, but **capture groups `result[1]` and beyond are `undefined`**, and **`lastIndex` does not advance**, so the usual `while ((m = re.exec(str)) !== null)` loop never terminates with the `g` flag. Note that `result.length` is always `3` regardless of how many groups the pattern has, so it cannot be used to count captures. To collect all matches or read capture groups, use `String.match` instead.

{% include callout.html type="warning" content="`RegExp.exec` capture groups (`result[1]+`) are `undefined` in SFMC SSJS, and `lastIndex` does not advance with the `g` flag — do not loop on `exec()`. Use `String.match(/.../g)` to collect all matches." %}

```javascript
// ❌ Do NOT do this — lastIndex never advances, this loops forever:
// var re = /[a-z]+(\d+)/g;
// while ((match = re.exec(text)) !== null) { ... }

// ✅ Collect all matches with String.match + the g flag:
var text = "foo123 bar456 baz789";
var matches = text.match(/[a-z]+\d+/g);
// ["foo123", "bar456", "baz789"]

// ✅ Read a single match's full text (result[0] is reliable):
var first = /[a-z]+\d+/.exec(text);
Write(first[0]);   // "foo123"
// first[1] is undefined in SFMC even though the pattern has a group
```

To extract capture groups reliably, match the non-global pattern with `String.match`:

```javascript
var dateMatch = "2026-06-18".match(/(\d{4})-(\d{2})-(\d{2})/);
// dateMatch[1] = "2026", dateMatch[2] = "06", dateMatch[3] = "18"
```

---

## source {#source}

`(ES3)` — ✅ Works. Returns the pattern text, excluding the surrounding slashes and any flags.

```javascript
var re = /\d{4}-\d{2}-\d{2}/g;
re.source;   // "\\d{4}-\\d{2}-\\d{2}"
```

---

## global {#global}

`(ES3)` — ✅ Works. `true` if the `g` flag was set on the RegExp, `false` otherwise.

```javascript
/abc/g.global;   // true
/abc/.global;    // false
```

---

## lastIndex {#lastindex}

`(ES3)` — ⚠️ Partial. The property exists but **does not advance** after `exec()` / `test()` with the `g` flag, so it cannot be used to drive stateful iteration. Use `String.match(/.../g)` to get all matches in one call.

```javascript
var re = /\d+/g;
re.exec("a1 b2 c3");
re.lastIndex;   // stays 0 in SFMC — does not advance

// Setting lastIndex manually is also ignored — the next exec still
// matches from the start:
re.lastIndex = 3;
re.exec("a1 b2 c3");   // still matches "1" at index 1, not from position 3

// Use String.match instead to get every match:
"a1 b2 c3".match(/\d+/g);   // ["1", "2", "3"]
```

---

## instanceof {#instanceof}

`(ES3)` — ⚠️ Partial. In the SFMC engine, `re instanceof RegExp` is **always `false`** — even for objects created with `new RegExp(...)`. This differs from standard JavaScript, where it returns `true`. Unlike `Function` (where `.constructor` is broken but `instanceof` works), for `RegExp` the reverse holds: `re.constructor === RegExp` correctly returns `true`. Use the constructor comparison to detect a RegExp.

```javascript
var re = new RegExp("\\d+");
re instanceof RegExp;        // false in SFMC (true in standard JS)
re.constructor === RegExp;   // true — use this instead
```

---

## ignoreCase {#ignorecase}

`(ES3)` — ❌ Missing. `RegExp.prototype.ignoreCase` is `undefined` in SFMC. If you need to know whether the `i` flag is active, track it yourself when you construct the RegExp.

```javascript
// ignoreCase is undefined in SFMC — store the flag separately:
var caseInsensitive = true;
var re = caseInsensitive ? /hello/i : /hello/;
```

---

## multiline {#multiline}

`(ES3)` — ❌ Missing. `RegExp.prototype.multiline` is `undefined` in SFMC. Track the `m` flag yourself when constructing the RegExp if you need to read it back.

```javascript
// multiline is undefined in SFMC — store the flag separately:
var isMultiline = true;
var re = isMultiline ? /^line/m : /^line/;
```

---

## Common Patterns

```javascript
// Email validation (basic)
var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Digits only
var isNumeric = /^\d+$/.test(value);

// Alphanumeric
var isAlphanumeric = /^[a-zA-Z0-9]+$/.test(value);

// UUID / GUID
var isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

// URL query parameter extraction
function getQueryParam(url, name) {
    var re = new RegExp("[?&]" + name + "=([^&]*)");
    var match = url.match(re);
    return match ? decodeURIComponent(match[1]) : null;
}

// Escape HTML special characters
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;");
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/string-methods/">String Methods</a></li>
  <li><a href="/ecmascript-builtins/">ECMAScript Built-ins</a></li>
  <li><a href="/platform-functions/isemailaddress/">Platform.Function.IsEmailAddress</a></li>
</ul>
</div>
