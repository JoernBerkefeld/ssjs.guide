---
layout: function
title: LocalDateToSystemDate
parent: Platform Functions
parent_url: /platform-functions/
description: Converts a date-time value from local account or user time to Marketing Cloud system time (CST, without daylight saving adjustments).
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.LocalDateToSystemDate(dateString)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateString` | string | Yes | A date-time string in local account/user time to convert to system time (CST). |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`).

## Example

```javascript
var time = Platform.Function.Now();
var systemTime = Platform.Function.LocalDateToSystemDate(time);
Write(systemTime);
```

## See Also

- [`DateTime.LocalDateToSystemDate()`](/platform-objects/datetime/#localdatetolocaldate) — short form available after `Platform.Load("core", "1.1.5")`; equivalent to this function.
