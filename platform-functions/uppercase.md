---
layout: function
title: Uppercase
parent: Platform Functions
parent_url: /platform-functions/
description: Converts all characters in a string to uppercase.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Uppercase(value)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to convert to uppercase |

## Examples

```javascript
var upper = Platform.Function.Uppercase("hello world");
Write(upper); // "HELLO WORLD"

// Normalize for comparison
var status = Platform.Function.Uppercase(Platform.Request.GetQueryStringParameter("status"));
if (status === "ACTIVE") { ... }
```
