---
layout: function
title: IIf
parent: Platform Functions
parent_url: /platform-functions/
description: Returns one of two values based on a boolean condition. Inline if — similar to the ternary operator.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.IIf(condition, trueValue, falseValue)"
return_type: any
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `condition` | boolean | Yes | Boolean expression to evaluate |
| `trueValue` | any | Yes | Value returned if condition is true |
| `falseValue` | any | Yes | Value returned if condition is false |

## Examples

```javascript
var greeting = Platform.Function.IIf(isLoggedIn, "Welcome back!", "Please log in.");
Write(greeting);

// Equivalent ternary:
var greeting2 = isLoggedIn ? "Welcome back!" : "Please log in.";
```

In SSJS, the ternary operator (`? :`) is preferred over `IIf` — use `IIf` only for consistency with existing AMPscript patterns.
