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
return_type: Date
min_args: 1
max_args: 1
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateString` | string | Yes | A date-time string in local account/user time to convert to system time (CST). |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`). An empty string, an invalid date, or a call with zero or two-plus arguments throws.

## Return value

Returns a **`Date` object** (runtime `typeof` is `"object"`, `Object.prototype.toString` reports `[object Date]`, and `getFullYear()` / `getHours()` / `getTime()` all work). It is not a plain string — it only serializes to an ISO-like string such as `2025-08-05T04:00:00.000` when written or passed through `Stringify()`. The value is expressed in Marketing Cloud system time (CST) with daylight saving removed, so the same wall-clock local input yields a system hour one hour earlier in summer than in winter.

{% include differs-from-docs.html note="The official docs type the return value as a string, but the runtime returns a Date object that only serializes to a string when written or stringified." %}

## Example

```javascript
var time = Platform.Function.Now();
var systemTime = Platform.Function.LocalDateToSystemDate(time);
Write(systemTime);
```

## See Also

- [`DateTime.LocalDateToSystemDate()`](/core-library/datetime/#localdatetosystemdate) — short form available after `Platform.Load("core", "1.1.5")`; equivalent to this function.
