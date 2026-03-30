---
layout: function
title: Format
parent: Platform Functions
parent_url: /platform-functions/
description: Formats a value according to a .NET format string — useful for number formatting, padding, and specialized string output.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Format(value, format)"
return_type: string
min_args: 2
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | Value to format |
| `format` | string | Yes | .NET format string |

## Examples

```javascript
// Currency format
var price = Platform.Function.Format(1234.5, "C2");
Write(price); // "$1,234.50"

// Number with thousands separator
var num = Platform.Function.Format(9876543, "N0");
Write(num); // "9,876,543"

// Percentage
var pct = Platform.Function.Format(0.852, "P1");
Write(pct); // "85.2%"

// Zero-padded number
var padded = Platform.Function.Format(7, "D4");
Write(padded); // "0007"
```
