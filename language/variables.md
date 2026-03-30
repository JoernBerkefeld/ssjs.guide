---
layout: page
title: Variables
parent: Language Guide
parent_url: /language/
description: var declarations, scope, hoisting, and the rules for using variables in SFMC SSJS.
---

## Declaration

SSJS uses only `var` for variable declarations. `let` and `const` are **not supported** and will cause a runtime error.

```javascript
var name = "Jane";
var count = 42;
var active = true;
var data = null;
var nothing; // undefined
```

## Scope

Variables declared with `var` have **function scope**, not block scope. A variable declared inside an `if` block or `for` loop is accessible outside that block.

```javascript
if (true) {
    var x = 10; // function-scoped, not block-scoped
}
Write(x); // 10 — works fine

for (var i = 0; i < 3; i++) {
    // ...
}
Write(i); // 3 — i is still accessible here
```

In SSJS, the "global scope" within a single `<script runat="server">` block is the top-level scope. Variables declared at the top level of any script block are shared across **all** script blocks on the same page.

## Hoisting

Function declarations are hoisted to the top of their containing scope. Variable declarations (not their values) are also hoisted.

```javascript
// Function declarations are fully hoisted
greet(); // Works — even called before declaration

function greet() {
    Write("Hello!");
}

// Variable declarations are hoisted, but not their values
Write(y); // undefined (not an error, just undefined)
var y = 5;
Write(y); // 5
```

**Hoisting across script blocks is NOT guaranteed.** Always place function declarations in the **first** script block on a page.

## Naming Conventions

SSJS follows standard JavaScript naming conventions. The SFMC community style guide recommends:

- `camelCase` for local variables: `subscriberKey`, `emailAddress`, `rowCount`
- `PascalCase` is reserved for platform objects: `Platform`, `DataExtension`, `WSProxy`
- Prefix private/internal functions with `_`: `_formatDate`, `_validateEmail`
- Constants (by convention only, no `const`): `var MAX_ROWS = 200;` (uppercase + underscores)

```javascript
var subscriberKey = Platform.Request.GetQueryStringParameter("sk");
var emailAddress  = "";
var rowCount      = 0;

var MAX_RETRIES = 3;

function _formatName(first, last) {
    return first + " " + last;
}
```

## Multiple Variables

Declare multiple variables with separate `var` statements (one per variable is most readable and lint-friendly):

```javascript
// Preferred: one var per line
var first  = "Jane";
var last   = "Smith";
var email  = "jane@example.com";

// Also valid: comma-separated (harder to diff)
var a = 1, b = 2, c = 3;
```

## Common Pitfalls

**Forgetting `var` creates a global:**

```javascript
function doSomething() {
    result = "oops"; // ⚠️ No var — creates/overwrites global
}
```

Always use `var` inside functions to keep scope contained.

**Variable leaking across iterations:**

```javascript
for (var i = 0; i < rows.length; i++) {
    var rowData = processRow(rows[i]); // rowData is re-declared each iteration
    // This works in SSJS but wouldn't in strict block-scoped languages
}
// rowData and i still accessible here
```
