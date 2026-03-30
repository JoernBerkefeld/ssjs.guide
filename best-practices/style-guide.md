---
layout: page
title: Style Guide
parent: Best Practices
parent_url: /best-practices/
description: SSJS coding style conventions — variable naming, indentation, function organization, and patterns for consistent, readable code.
---

Consistent code style makes SSJS easier to read, review, and debug. These conventions reflect community norms and practical experience.

## Variables

Always use `var`. Never use `let` or `const` — they throw runtime errors in SSJS.

```javascript
// CORRECT
var subscriberKey = Platform.Variable.GetValue("@subscriberKey");
var isLoggedIn = false;
var MAX_ROWS = 500;

// WRONG — will throw runtime errors
let subscriberKey = "...";
const MAX_ROWS = 500;
```

Use descriptive names. Avoid single-letter variables outside of short loops.

```javascript
// OK for loops
for (var i = 0; i < rows.length; i++) { ... }

// Not OK for meaningful data
var x = Platform.Request.GetFormField("email");  // unclear
var email = Platform.Request.GetFormField("email");  // clear
```

---

## Functions

Use function declarations for utilities, function expressions for callbacks (when available).

```javascript
// Named function declaration — preferred for utilities
function validateEmail(email) {
    return Platform.Function.IsEmailAddress(email);
}

// Named function expression
var formatDate = function(date, format) {
    return Platform.Function.FormatDate(date, format, "en-US");
};
```

Group related functions. Use the **Revealing Module Pattern** for namespacing:

```javascript
var FormHandler = (function() {
    function validate(data) {
        if (Platform.Function.Empty(data.email)) return false;
        if (!Platform.Function.IsEmailAddress(data.email)) return false;
        return true;
    }

    function process(data) {
        Platform.Function.InsertData("Leads",
            ["Email", "Name", "Source"],
            [data.email, data.name, data.source]
        );
    }

    return { validate: validate, process: process };
})();
```

---

## Script Block Organization

Organize your script block in this order:

```javascript
<script runat="server">
// 1. Platform.Load (if using Core)
Platform.Load("core", "1.1.5");

// 2. Constants and configuration
var PAGE_ID = 12345;
var DEBUG = Platform.Request.GetQueryStringParameter("debug") === "1";

// 3. Read request data once
var method = Platform.Request.Method;
var rawBody = (method === "POST") ? Platform.Request.GetPostData() : "";

// 4. Helper functions
function getConfig(key) {
    return Platform.Function.Lookup("AppConfig", "value", "key", key);
}

// 5. Main logic
if (method === "GET") {
    // handle GET
} else if (method === "POST") {
    // handle POST
}
</script>
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Variables | camelCase | `subscriberKey`, `isActive` |
| Constants | UPPER_SNAKE_CASE | `MAX_ROWS`, `API_BASE_URL` |
| Functions | camelCase | `formatDate()`, `validateInput()` |
| Objects/modules | PascalCase | `FormHandler`, `DataUtils` |
| DE column access | Match DE column name exactly | `rows[i].SubscriberKey` |

---

## Indentation and Formatting

Use 4-space indentation (or 2-space consistently). Always use braces for `if`/`for`/`while`:

```javascript
// GOOD
if (condition) {
    doSomething();
}

// BAD — no braces invite bugs
if (condition)
    doSomething();
```

---

## Comments

Write comments that explain **why**, not **what**:

```javascript
// GOOD — explains non-obvious intent
// GetPostData() can only be called once per request — read immediately
var rawBody = Platform.Request.GetPostData();

// BAD — just narrates the code
// Get the post data
var rawBody = Platform.Request.GetPostData();
```

Document known bugs and workarounds:

```javascript
// ParseJSON throws 500 on null/undefined — using + "" guard
var data = Platform.Function.ParseJSON(responseBody + "");
```

---

## Platform.Function Aliases

When using `InsertDE`, `UpdateDE`, `UpsertDE`, `DeleteDE` (aliases for `InsertData` etc.) — prefer the full names for clarity:

```javascript
// Preferred — function intent is obvious
Platform.Function.InsertData("DE", ["col"], ["val"]);
Platform.Function.UpsertData("DE", ["key"], ["val"], ["col"], ["val"]);

// Also valid, just less descriptive
InsertDE("DE", ["col"], ["val"]);
```

---

## Error Handling

Always wrap external calls in try/catch:

```javascript
var result = null;
try {
    var resp = req.send();
    result = Platform.Function.ParseJSON(String(resp.content) + "");
} catch(e) {
    // Log and handle gracefully
    logError("http_request", e.message);
    Platform.Response.SetResponseCode(502, "Bad Gateway");
    Write(Stringify({ error: "External API unavailable" }));
    return;
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/language/functions-and-scope/">Functions and Scope</a></li>
  <li><a href="/language/error-handling/">Error Handling</a></li>
  <li><a href="/best-practices/defensive-coding/">Defensive Coding</a></li>
</ul>
</div>
