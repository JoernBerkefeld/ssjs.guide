---
layout: function
title: Trim
parent: Platform Functions
parent_url: /platform-functions/
description: Removes leading and trailing whitespace from a string.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Trim(value)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to trim |

## Examples

```javascript
var input = "  Jane Smith  ";
var trimmed = Platform.Function.Trim(input);
Write(trimmed); // "Jane Smith"

// Trim form input before storing
var email = Platform.Function.Trim(Platform.Request.GetFormData("email"));
```

## Notes

`Platform.Function.Trim()` is more reliable than `String.prototype.trim()` in SSJS, since `String.prototype.trim` is not available without a polyfill.
