---
layout: page
title: What is SSJS?
parent: Getting Started
parent_url: /getting-started/
description: Origins, capabilities, and how SSJS fits into Salesforce Marketing Cloud.
---

Server-Side JavaScript (SSJS) is a scripting language built into Salesforce Marketing Cloud that lets you write JavaScript-like code that executes on the **SFMC server** before content is delivered to a browser or email client.

## Origins

SSJS predates modern JavaScript runtimes significantly. It runs on **JINT** (JavaScript Interpreter for .NET), which implements approximately **ECMAScript 3 with some ES5 additions**. This means you're writing JavaScript as it existed around 2009 — no classes, no arrow functions, no template literals, no destructuring, no modules.

This is not a bug to work around — it's the environment. Understanding this upfront prevents hours of debugging cryptic runtime errors.

## What SSJS Can Do

SSJS gives you access to things that AMPscript simply cannot do:

- **Full control flow** — complex loops, recursion, custom functions, module patterns
- **JSON manipulation** — parse, build, and transform complex data structures
- **HTTP requests** — call external REST APIs, authenticate, handle responses
- **SOAP API access** — full SFMC SOAP API via WSProxy (faster than Core library)
- **Request/response control** — read query strings, POST bodies, headers; set cookies, headers, status codes
- **Content rendering** — output HTML dynamically, process Content Builder assets

## Comparison with AMPscript

Both AMPscript and SSJS run server-side in SFMC. The choice depends on context:

| Situation | Prefer |
|-----------|--------|
| Simple personalization in email | AMPscript |
| Complex data lookups in email | AMPscript (faster precompile) |
| CloudPage with business logic | SSJS |
| External API calls | SSJS |
| JSON manipulation | SSJS |
| SOAP API operations | SSJS (WSProxy) |
| Need both in one page | Use both — they share scope via `Variable.GetValue` / `Variable.SetValue` |

SSJS is **slower than AMPscript** for simple Data Extension lookups in emails because of its overhead. In emails, prefer AMPscript for data retrieval and use SSJS when you genuinely need its capabilities.

## How SSJS Relates to JavaScript

If you know JavaScript, SSJS will feel familiar but limited:

```javascript
// This is valid SSJS
function greet(name) {
    return "Hello, " + name + "!";
}
var message = greet("World");
Write(message);

// This is NOT valid SSJS (ES6+)
// const greet = (name) => `Hello, ${name}!`;  // ❌ arrow fn + template literal
// let message = greet("World");                // ❌ let
```

Key absences from the standard JavaScript you know:
- No `window`, `document`, `console`, `localStorage`, `fetch`, `XMLHttpRequest`
- No `JSON.parse` or `JSON.stringify` — use `Platform.Function.ParseJSON()` and `Stringify()`
- No `Array.isArray`, `Array.prototype.forEach`, `Array.prototype.map`, `Array.prototype.filter`
- No `Object.keys`, `Object.values`, `Object.assign`
- No `Promise`, `async`/`await`, `setTimeout`, `setInterval`

See [Engine Limitations](/engine-limitations/) for the complete list.

## The Execution Model

When SFMC processes a page or email containing `<script runat="server">`, it:

1. Parses the entire document
2. Executes **all** `<script runat="server">` blocks top-to-bottom (they share the same scope)
3. The output of `Write()` calls is injected at the position of the script block in the page
4. The final document is sent to the browser or email client

This is synchronous, single-threaded execution. There are timeout limits:
- CloudPages: no documented hard limit, but long-running pages will error
- Automation Studio Script Activities: **30-minute** hard timeout
- Emails (precompile): much shorter — keep SSJS in emails minimal

→ Next: [Where SSJS Runs](/getting-started/where-ssjs-runs/)
