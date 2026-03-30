---
layout: page
title: Getting Started
description: Your first steps with Server-Side JavaScript in Salesforce Marketing Cloud.
---

Server-Side JavaScript (SSJS) is a JavaScript-based scripting language that runs on the SFMC server before a page or email is sent to a subscriber or browser. Unlike client-side JavaScript that runs in the browser, SSJS has no DOM, no `window`, no `document` — but it has direct access to SFMC platform APIs.

## In This Section

- [What is SSJS?](/getting-started/what-is-ssjs/) — Origins, capabilities, and how it differs from client-side JavaScript
- [Where SSJS Runs](/getting-started/where-ssjs-runs/) — CloudPages, Email, Automation Studio, JSON Code Resources, and more
- [Embedding SSJS](/getting-started/embedding-ssjs/) — `<script runat="server">` syntax, `language` attribute, multiple blocks
- [Execution Contexts](/getting-started/execution-contexts/) — GET vs POST, ExecutionContextType, ExecutionContextName
- [Platform vs Core](/getting-started/platform-vs-core/) — The two library layers and when to use each

## Five-Minute Setup

```javascript
<script runat="server">
// 1. Load the Core library (required for DataExtension, Subscriber, etc.)
Platform.Load("core", "1.1.5");

// 2. Wrap in try/catch to prevent blank pages on errors
try {
    // 3. Read a query string parameter
    var name = Platform.Request.GetQueryStringParameter("name");

    // 4. Sanitize / default
    if (!name) { name = "World"; }

    // 5. Write output to the page
    Write("<h1>Hello, " + name + "!</h1>");

} catch (e) {
    Write("<p class='error'>Error: " + Stringify(e) + "</p>");
}
</script>
```

## What Makes SSJS Different

| Feature | SSJS | Client JS (browser) |
|---------|------|---------------------|
| Runs on | SFMC server | Subscriber's browser |
| DOM access | No | Yes |
| SFMC APIs | Direct | Via REST only |
| ES version | ~ES3/5 (JINT engine) | Modern |
| `let` / `const` | No — use `var` | Yes |
| Arrow functions | No | Yes |
| `async`/`await` | No | Yes |
| `JSON.parse` | No — use `Platform.Function.ParseJSON()` | Yes |

→ Continue to [What is SSJS?](/getting-started/what-is-ssjs/)
