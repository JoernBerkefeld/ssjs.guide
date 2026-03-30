---
layout: function
title: Empty
parent: Platform Functions
parent_url: /platform-functions/
description: Checks whether a string value is null, empty, or contains only whitespace.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Empty(value)"
return_type: boolean
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to check |

## Examples

```javascript
Platform.Function.Empty(null);     // true
Platform.Function.Empty("");       // true
Platform.Function.Empty("   ");    // true
Platform.Function.Empty("hello");  // false
Platform.Function.Empty("0");      // false

var name = Platform.Request.GetFormData("name");
if (Platform.Function.Empty(name)) {
    Write("Name is required.");
}
```
