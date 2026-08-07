---
layout: function
title: Variable
parent: Core Library
parent_url: /core-library/
permalink: /core-library/variable/
redirect_from:
  - /global-functions/variable/
description: The global Variable object provides access to AMPscript variables from SSJS, enabling bidirectional data exchange between the two scripting languages.
requires_core_load: true
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
verification: verified
differs_from_docs: true
test_scripts: complete
syntax: "Variable.GetValue(name)\nVariable.SetValue(name, value)"
return_type: object
min_args: 1
max_args: 2
---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `Variable.GetValue(name)` | string, number, boolean, or null | Gets the value of an AMPscript variable |
| `Variable.SetValue(name, value)` | undefined | Sets the value of an AMPscript variable |

{% include differs-from-docs.html note="Official docs describe a string GetValue return. Runtime preserves number and boolean scalars and returns JavaScript null for a never-set variable. SetValue returns undefined (void-like), while Platform.Variable.SetValue returns null — both share the same request-local variable state." %}

{% include test-script.html bundle="core-library--variable" chapter="methods" label="Show test script — return types vs official docs" %}

## Description

The global `Variable` object provides the bridge between AMPscript and SSJS. AMPscript variables are prefixed with `@` and live in a shared scope accessible by both languages on the same page.

After `Platform.Load("core", "1.1.5")`, bare `Variable.GetValue` / `Variable.SetValue` share request-local state with `Platform.Variable`. GetValue behaviour matches the Platform form; SetValue returns `undefined` here, while `Platform.Variable.SetValue` returns `null`.

{% include test-script.html bundle="core-library--variable" chapter="description" %}

## Examples

### Read an AMPscript variable

```html
%%[
  SET @subscriberKey = _subscriberKey
  SET @emailAddress  = emailaddr
]%%

<script runat="server">
// Read variables set by AMPscript
var sk    = Variable.GetValue("@subscriberKey");
var email = Variable.GetValue("@emailAddress");

Write("<p>Processing: " + email + "</p>");
</script>
```

### Write an AMPscript variable

```javascript
<script runat="server">
var data  = String(Platform.Function.Lookup("Preferences", "Theme", "SubscriberKey", sk));
// Never use `data || "light"` on a raw Lookup result — a NULL field throws
var theme = (data === "" || data === "null") ? "light" : data;
Variable.SetValue("@theme", theme);
</script>

<!-- Use the variable in AMPscript -->
<body class="theme-%%=v(@theme)=%%">
```

### Bridge pattern for AMPscript functions

The most important use: safely pass values into AMPscript functions via `Platform.Function.TreatAsContent`:

```javascript
// Safe: set value via Variable.SetValue, reference by name in AMPscript
Variable.SetValue("@inputStr", userValue);
Platform.Function.TreatAsContent("%%[Set @encoded = URLEncode(@inputStr, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

This pattern avoids AMPscript injection vulnerabilities.

{% include test-script.html bundle="core-library--variable" chapter="examples" %}

## Notes

Variable names must include the `@` prefix:

```javascript
Variable.SetValue("@name", "Jane");  // ✅ correct
Variable.SetValue("name", "Jane");   // ⚠️ may work but non-standard
```

{% include test-script.html bundle="core-library--variable" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-variable/">Platform.Variable</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent</a></li>
  <li><a href="/recipes/ampscript-bridge/">AMPscript Bridge recipe</a></li>
</ul>
</div>
