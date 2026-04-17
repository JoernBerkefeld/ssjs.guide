---
layout: function
title: DateParse
parent: Platform Functions
parent_url: /platform-functions/
description: Converts a string representation to a date object that can be used with other date functions.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.DateParse(dateString [, format])"
return_type: object
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateString` | string | Yes | String to parse as a date |
| `format` | string | No | Expected date format pattern |

## Examples

```javascript
var dateStr = "2026-03-30";
var dateObj = Platform.Function.DateParse(dateStr);

// Use the parsed date with other functions
var formatted = Platform.Function.FormatDate(dateObj, "MMMM D, YYYY");
Write(formatted); // "March 30, 2026"
```
