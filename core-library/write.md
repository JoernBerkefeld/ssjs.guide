---
layout: function
title: Write
parent: Core Library
parent_url: /core-library/
permalink: /core-library/write/
redirect_from:
  - /global-functions/write/
description: Outputs a string to the rendered page. The primary mechanism for producing HTML output from an SSJS block.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: false
test_scripts: complete
syntax: "Write(content)"
return_type: void
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | The string to output to the page. |

{% include test-script.html bundle="core-library--write" chapter="parameters" %}

## Description

`Write()` appends the given string to the page output at the position of the `<script runat="server">` block. It does not add a newline — concatenate `"\n"` or `"<br>"` manually if needed.

The output is written into the final rendered HTML document. In email contexts, it is written into the email body. In Automation Studio, output is written to the activity log.

Requires `Platform.Load("core", "1.1.5")` before use. If you need output from a script that does not load Core, use [`Platform.Response.Write()`](/platform-objects/platform-response/#write) instead.

{% include test-script.html bundle="core-library--write" chapter="description" %}

## Examples

### Basic output

```javascript
Write("Hello, World!");
```

Output: `Hello, World!`

### HTML output

```javascript
var name = Platform.Request.GetQueryStringParameter("name") || "Subscriber";
Write("<h1>Welcome, " + name + "</h1>");
Write('<p class="subtitle">We\'re glad you\'re here.</p>');
```

### Multiple Write calls

Multiple calls append sequentially — they don't overwrite each other:

```javascript
Write("<ul>");
var rows = Platform.Function.LookupRows("Products", "Active", "1");
for (var i = 0, len = rows.length; i < len; i++) {
    Write("<li>" + rows[i]["Name"] + "</li>");
}
Write("</ul>");
```

### Conditional output

```javascript
var isAdmin = Platform.Function.Lookup("Users", "IsAdmin", "Key", userKey);
if (isAdmin === "1") {
    Write('<a href="/admin">Admin Panel</a>');
}
```

### Debug output

During development, use `Write` to inspect variable values:

```javascript
// Wrap in a debug guard so you don't expose data in production
var debug = Platform.Request.GetQueryStringParameter("debug") === "1";
if (debug) {
    Write('<pre style="color:orange">' + Stringify(dataObject) + '</pre>');
}
```

{% include test-script.html bundle="core-library--write" chapter="examples" %}

## Common Mistakes

**Passing objects or arrays directly:** Non-string values are stringified by the host, not by JavaScript `toString()`. Plain objects become a CLR Dictionary type name, arrays become `System.Collections.ArrayList`, and booleans become capitalized `True` / `False`. Numbers stringify as expected (`42`). Use `Stringify()` for objects:

{% include callout.html type="bug" content="`Write(myObject)` does **not** emit `[object Object]`. Objects and arrays render as CLR type names, and booleans render as `True` / `False`. See [Known Bugs](/engine-limitations/known-bugs/#write-clr-tostring)." %}

{% include test-script.html bundle="core-library--write" chapter="clr-coercion" label="Show test script — CLR stringification" %}

```javascript
// ❌ Emits a CLR type name, not useful JSON
Write(myObject);

// ✅ Serialize first
Write(Stringify(myObject));
```

**Unescaped HTML in dynamic content:** If writing user-provided content into the page, escape it to prevent XSS:

```javascript
function escapeHtml(str) {
    return (str + "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

Write("<p>" + escapeHtml(userInput) + "</p>");
```

{% include test-script.html bundle="core-library--write" chapter="common-mistakes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/stringify/">Stringify</a></li>
  <li><a href="/platform-objects/platform-response/">Platform.Response.Write</a></li>
  <li><a href="/best-practices/debugging/">Debugging with Write</a></li>
</ul>
</div>
