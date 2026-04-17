---
layout: function
title: URLEncode
parent: Platform Functions
parent_url: /platform-functions/
description: Encodes a string value for safe inclusion in a URL query parameter or path component.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.URLEncode(value)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to URL-encode |

## Examples

```javascript
var email = "jane+test@example.com";
var encoded = Platform.Function.URLEncode(email);
Write(encoded); // "jane%2Btest%40example.com"

// Build a URL with encoded parameters
var redirectUrl = "/search?q=" + Platform.Function.URLEncode(searchQuery)
                + "&lang=" + Platform.Function.URLEncode(lang);
Platform.Response.Redirect(redirectUrl);
```

## Notes

For more encoding options (e.g., encoding `+` signs differently), use the AMPscript `URLEncode` function with extra parameters via `TreatAsContent`:

```javascript
Variable.SetValue("@val", myValue);
TreatAsContent("%%[Set @encoded = URLEncode(@val, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

