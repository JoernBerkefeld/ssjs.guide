---
layout: function
title: SystemDateToLocalDate
parent: Platform Functions
parent_url: /platform-functions/
description: Converts a date-time value from Marketing Cloud system time (CST, without daylight saving adjustments) to the local time of the account or user.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.SystemDateToLocalDate(dateString)"
return_type: Date
min_args: 1
max_args: 1
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateString` | string | Yes | A date-time string in system time (CST) to convert to local time. |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`). An empty string, an invalid date, or a call with zero or two-plus arguments throws.

## Description

Converts a date-time value from Marketing Cloud system time (Central Standard Time, no daylight saving adjustments) to the local time configured for the account or user. The `Platform.Function.` form does **not** require `Platform.Load("core", ...)`; only the short `DateTime.SystemDateToLocalDate()` form does.

## Return value

Returns a **`Date` object** (runtime `typeof` is `"object"`, `Object.prototype.toString` reports `[object Date]`, and `getFullYear()` / `getHours()` / `getTime()` all work). It is not a plain string — it only serializes to an ISO-like string when written or passed through `Stringify()`. The value is expressed in the account's or user's local time, so a system input converts to the opposite offset direction of [`LocalDateToSystemDate()`](/platform-functions/localdatetosystemdate/).

{% include differs-from-docs.html note="The official docs type the return value as a string, but the runtime returns a Date object that only serializes to a string when written or stringified." %}

## Example

```javascript
var systemTime = Platform.Function.Now();
var localTime  = Platform.Function.SystemDateToLocalDate(systemTime);
Write(localTime);
```

## See Also

- [`DateTime.SystemDateToLocalDate()`](/core-library/datetime/#systemdatetolocaldate) — short form available after `Platform.Load("core", "1.1.5")`; equivalent to this function.
