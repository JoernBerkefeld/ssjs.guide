---
layout: function
title: Concat
parent: Platform Functions
parent_url: /platform-functions/
description: Joins two or more string values together. Equivalent to string concatenation with the + operator.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Concat(value1, value2 [, ...])"
return_type: string
min_args: 2
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value1` | string | Yes | First string |
| `value2` | string | Yes | Second string |
| `...` | string | No | Additional strings |

## Examples

```javascript
var full = Platform.Function.Concat("Hello", ", ", "World", "!");
Write(full); // "Hello, World!"

// Equivalent to:
var full2 = "Hello" + ", " + "World" + "!";
```

In practice, the `+` operator is more commonly used for concatenation in SSJS. `Concat` is most useful for consistency when writing AMPscript-style code.
