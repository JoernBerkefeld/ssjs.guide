---
layout: page
title: Regular Expressions
parent: Language Guide
parent_url: /language/
description: RegExp literals, flags, test, match, replace, and split patterns available in SFMC SSJS.
---

Regular expressions work in SSJS using the ES3/5 RegExp API. The syntax and methods are the same as standard JavaScript.

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

## test — Boolean Check

```javascript
var email = "jane@example.com";
var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (emailRe.test(email)) {
    Write("Valid email");
} else {
    Write("Invalid email");
}
```

Note: `Platform.Function.IsEmailAddress()` is usually more reliable than a custom regex for SFMC email validation.

## match — Extract Matches

```javascript
var text = "Order #12345 placed on 2026-01-15";

// Without 'g' flag — returns first match with groups
var match = text.match(/\d{4}-\d{2}-\d{2}/);
if (match) {
    Write("Date found: " + match[0]); // "2026-01-15"
}

// With 'g' flag — returns array of all matches (no groups)
var numbers = text.match(/\d+/g);
// ["12345", "2026", "01", "15"]

// With capturing groups
var dateMatch = text.match(/(\d{4})-(\d{2})-(\d{2})/);
if (dateMatch) {
    Write("Year: " + dateMatch[1]);  // "2026"
    Write("Month: " + dateMatch[2]); // "01"
    Write("Day: " + dateMatch[3]);   // "15"
}
```

## replace — Substitution

```javascript
// Replace first occurrence
var cleaned = "Hello   World".replace(/\s+/, " ");
// "Hello World"

// Replace all (global flag)
var noSpaces = "Hello   World   Foo".replace(/\s+/g, " ");
// "Hello World Foo"

// Remove HTML tags
var plain = "<p>Hello <strong>World</strong></p>".replace(/<[^>]+>/g, "");
// "Hello World"

// Replace with function (works in SSJS!)
var result = "hello world".replace(/\b\w/g, function(match) {
    return match.toUpperCase();
});
// "Hello World"

// Backreferences
var swapped = "Jane Smith".replace(/(\w+)\s(\w+)/, "$2, $1");
// "Smith, Jane"
```

## split with RegExp

```javascript
// Split on any whitespace
var words = "hello   world   foo".split(/\s+/);
// ["hello", "world", "foo"]

// Split on comma with optional spaces
var items = "a, b ,  c".split(/\s*,\s*/);
// ["a", "b", "c"]
```

## exec — Iterating Matches

```javascript
var text = "foo123 bar456 baz789";
var re = /[a-z]+(\d+)/g;
var match;

while ((match = re.exec(text)) !== null) {
    Write("Found: " + match[0] + " — digits: " + match[1] + "<br>");
}
// Found: foo123 — digits: 123
// Found: bar456 — digits: 456
// Found: baz789 — digits: 789
```

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
