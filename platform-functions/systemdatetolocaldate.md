---
layout: function
title: SystemDateToLocalDate
parent: Platform Functions
parent_url: /platform-functions/
description: Converts a date-time value from Marketing Cloud system time (CST, without daylight saving adjustments) to the local time of the account or user.
availability:
  email: true
  cloudpage: false
  automation: false
  triggered_send: true
syntax: "Platform.Function.SystemDateToLocalDate(dateString)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateString` | string | Yes | A date-time string in system time (CST) to convert to local time. |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`).

## Description

Converts a date-time value from Marketing Cloud system time (Central Standard Time, no daylight saving adjustments) to the local time configured for the account or user. Requires `Platform.Load("core", "1.1.5")` before use.

## Example

```javascript
var serverTime = Platform.Function.Now();
var localTime  = Platform.Function.SystemDateToLocalDate(serverTime);
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return Platform.Function.TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

Write("Your local time: " + formatDate(localTime, "M/D/YYYY H:MM"));
```

## See Also

- [`DateTime.SystemDateToLocalDate()`](/core-library/datetime/#systemdatetolocaldate) — short form available after `Platform.Load("core", "1.1.5")`; equivalent to this function.
