---
layout: function
title: IndexOf
parent: Platform Functions
parent_url: /platform-functions/
description: Returns the zero-based position of the first occurrence of a substring within a string. Returns -1 if not found.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.IndexOf(value, search)"
return_type: number
min_args: 2
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to search in |
| `search` | string | Yes | Substring to find |

## Examples

```javascript
var str = "hello@example.com";

var atPos = Platform.Function.IndexOf(str, "@");
Write(atPos); // 5

// Check if substring exists
if (Platform.Function.IndexOf(str, "@") > -1) {
    Write("Contains @");
}

// Find domain part
var domain = Platform.Function.Substring(str, atPos + 2);
// atPos is 0-based, Substring is 1-based, so +2 to skip "@"
```
