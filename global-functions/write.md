---
layout: function
title: Write
parent: Global Functions
parent_url: /global-functions/
description: Outputs a string to the rendered page. The primary mechanism for producing HTML output from an SSJS block.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Write(content)"
return_type: void
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | The string to output to the page. |

## Description

`Write()` appends the given string to the page output at the position of the `<script runat="server">` block. It does not add a newline — concatenate `"\n"` or `"<br>"` manually if needed.

The output is written into the final rendered HTML document. In email contexts, it is written into the email body. In Automation Studio, output is written to the activity log.

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

## Common Mistakes

**Forgetting to convert to string:** `Write` expects a string. Non-string values are automatically coerced via `toString()`, but complex objects will output `[object Object]`. Use `Stringify()` for objects:

```javascript
// ❌ Outputs "[object Object]"
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

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/stringify/">Stringify</a></li>
  <li><a href="/platform-objects/platform-response/">Platform.Response.Write</a></li>
  <li><a href="/best-practices/debugging/">Debugging with Write</a></li>
</ul>
</div>
