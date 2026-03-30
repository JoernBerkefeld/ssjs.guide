---
layout: function
title: Length
parent: Platform Functions
parent_url: /platform-functions/
description: Returns the number of characters in a string.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Length(value)"
return_type: number
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to measure |

## Examples

```javascript
var str = "Hello!";
var len = Platform.Function.Length(str);
Write(len); // 6

// Validate minimum length
var password = Platform.Request.GetFormData("password");
if (Platform.Function.Length(password) < 8) {
    Write("Password must be at least 8 characters.");
}
```

## Notes

This is equivalent to `str.length` in JavaScript, but provided as a Platform function for consistency with other string operations. Both approaches work in SSJS.
