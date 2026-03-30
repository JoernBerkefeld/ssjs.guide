---
layout: function
title: Char
parent: Platform Functions
parent_url: /platform-functions/
description: Returns the character corresponding to a given ASCII code.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Char(asciiCode)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `asciiCode` | number | Yes | ASCII character code (0–255) |

## Examples

```javascript
Write(Platform.Function.Char(65));  // "A"
Write(Platform.Function.Char(97));  // "a"
Write(Platform.Function.Char(10));  // newline character
Write(Platform.Function.Char(44));  // ","
```
