---
layout: page
title: Embedding SSJS
parent: Getting Started
parent_url: /getting-started/
description: The script block syntax, language attribute, multiple blocks, and how SSJS output is injected into the page.
---

## The `<script runat="server">` Block

SSJS is embedded using an HTML `<script>` tag with the `runat="server"` attribute:

```html
<html>
<body>
  <h1>My Page</h1>

  <script runat="server">
  Write("<p>This text comes from SSJS.</p>");
  </script>

  <p>This is regular HTML.</p>
</body>
</html>
```

The `Write()` output replaces the script block in the final rendered page. The subscriber sees:

```html
<html>
<body>
  <h1>My Page</h1>

  <p>This text comes from SSJS.</p>

  <p>This is regular HTML.</p>
</body>
</html>
```

## The `language` Attribute

You can optionally specify the language:

```html
<script runat="server" language="JavaScript">
// Explicitly sets JavaScript mode
</script>
```

This is usually omitted — `runat="server"` alone is sufficient and implies JavaScript. The `language` attribute is relevant when a page mixes AMPscript script blocks:

```html
<script runat="server" language="ampscript">
/* AMPscript block */
Set @name = "World"
</script>

<script runat="server" language="JavaScript">
/* SSJS block */
var name = Variable.GetValue("@name");
Write("Hello, " + name);
</script>
```

## Multiple Script Blocks

A single page can have multiple `<script runat="server">` blocks. They all **share the same execution scope** — variables declared in one block are visible in subsequent blocks.

```html
<script runat="server">
// Block 1: Load libraries and declare helpers
Platform.Load("core", "1.1.5");

function formatDate(dateStr) {
    return Platform.Function.FormatDate(dateStr, "MM/DD/YYYY");
}
</script>

<h1>Welcome</h1>

<script runat="server">
// Block 2: Use helpers defined in Block 1
var today = formatDate(Platform.Function.Now());
Write("<p>Today is " + today + "</p>");
</script>
```

All blocks execute in order before the page is assembled. The output of each block appears at that block's position in the HTML.

## Hoisting Behavior

Function declarations are **hoisted** within their script block but **not** across blocks. If you call a function before its block has executed, you'll get a runtime error.

```html
<script runat="server">
// ❌ This will error — greet() is defined in the next block
Write(greet("World"));
</script>

<script runat="server">
function greet(name) {
    return "Hello, " + name + "!";
}
</script>
```

**Safe pattern:** Put all function declarations in the **first** script block:

```html
<script runat="server">
Platform.Load("core", "1.1.5");

// All function declarations at the top
function greet(name) {
    return "Hello, " + name + "!";
}

function getSubscriberData(sk) {
    return Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk);
}
</script>

<h1>%%=v(@salutation)=%%</h1>

<script runat="server">
// Usage in later blocks is fine
var sk = Platform.Request.GetQueryStringParameter("sk");
Write(greet(getSubscriberData(sk)));
</script>
```

## AMPscript Inside SSJS

AMPscript and SSJS run in the same document and can share data through the `Variable` namespace:

```html
%%[
  SET @subscriberKey = _subscriberKey
]%%

<script runat="server">
// Read the AMPscript variable in SSJS
var sk = Variable.GetValue("@subscriberKey");

// Write back to AMPscript
var email = Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk);
Variable.SetValue("@email", email);
</script>

<!-- Use the SSJS-set variable in AMPscript -->
<p>Email: %%=v(@email)=%%</p>
```

Or use `Platform.Variable.GetValue` / `Platform.Variable.SetValue` for the same purpose.

## Ctrl: Tags (Alternative Syntax)

SFMC also supports older `ctrl:field`, `ctrl:var`, and `ctrl:eval` tags for inline SSJS output. These are legacy and rarely used in new development:

```html
<ctrl:eval>Platform.Function.Now()</ctrl:eval>
<ctrl:var name="myVariable" />
<ctrl:field name="FirstName" />
```

Stick to `<script runat="server">` + `Write()` for all new work.

→ Next: [Execution Contexts](/getting-started/execution-contexts/)
