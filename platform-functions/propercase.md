---
layout: function
title: ProperCase
parent: Platform Functions
parent_url: /platform-functions/
description: Converts the first letter of each word to uppercase and the rest to lowercase (title case).
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.ProperCase(value)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to convert to title case |

## Examples

```javascript
var name = Platform.Function.ProperCase("JANE SMITH");
Write(name); // "Jane Smith"

var city = Platform.Function.ProperCase("new york");
Write(city); // "New York"
```
