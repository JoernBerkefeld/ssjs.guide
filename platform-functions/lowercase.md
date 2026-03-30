---
layout: function
title: Lowercase
parent: Platform Functions
parent_url: /platform-functions/
description: Converts all characters in a string to lowercase.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Lowercase(value)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to convert to lowercase |

## Examples

```javascript
var lower = Platform.Function.Lowercase("HELLO WORLD");
Write(lower); // "hello world"

// Normalize email for comparison/storage
var email = Platform.Function.Lowercase(Platform.Function.Trim(emailInput));
```
