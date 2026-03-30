---
layout: function
title: Variable (Global Object)
parent: Global Functions
parent_url: /global-functions/
description: The global Variable object provides access to AMPscript variables from SSJS, enabling bidirectional data exchange between the two scripting languages.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Variable.GetValue(name)\nVariable.SetValue(name, value)"
return_type: object
min_args: 1
max_args: 2
---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `Variable.GetValue(name)` | string | Gets the value of an AMPscript variable |
| `Variable.SetValue(name, value)` | void | Sets the value of an AMPscript variable |

## Description

The global `Variable` object provides the bridge between AMPscript and SSJS. AMPscript variables are prefixed with `@` and live in a shared scope accessible by both languages on the same page.

This is the same as `Platform.Variable.GetValue()` and `Platform.Variable.SetValue()`.

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
var data = Platform.Function.Lookup("Preferences", "Theme", "SubscriberKey", sk);
Variable.SetValue("@theme", data || "light");
</script>

<!-- Use the variable in AMPscript -->
<body class="theme-%%=v(@theme)=%%">
```

### Bridge pattern for AMPscript functions

The most important use: safely pass values into AMPscript functions via `TreatAsContent`:

```javascript
// Safe: set value via Variable.SetValue, reference by name in AMPscript
Variable.SetValue("@inputStr", userValue);
TreatAsContent("%%[Set @encoded = URLEncode(@inputStr, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

This pattern avoids AMPscript injection vulnerabilities.

## Notes

Variable names must include the `@` prefix:

```javascript
Variable.SetValue("@name", "Jane");  // ✅ correct
Variable.SetValue("name", "Jane");   // ⚠️ may work but non-standard
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-variable/">Platform.Variable</a></li>
  <li><a href="/platform-functions/getvalue/">Platform.Function.GetValue</a></li>
  <li><a href="/platform-functions/setvalue/">Platform.Function.SetValue</a></li>
  <li><a href="/global-functions/treatascontent/">TreatAsContent</a></li>
  <li><a href="/recipes/ampscript-bridge/">AMPscript Bridge recipe</a></li>
</ul>
</div>
