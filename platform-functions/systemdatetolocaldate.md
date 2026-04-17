---
layout: function
title: SystemDateToLocalDate
parent: Platform Functions
parent_url: /platform-functions/
description: Converts an SFMC system (server) date to the subscriber's local timezone date.
availability:
  email: true
  cloudpage: false
  automation: false
  triggered_send: true
syntax: "Platform.Function.SystemDateToLocalDate(date)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `date` | string | Yes | System date to convert to subscriber's local time |

## Description

Converts the SFMC system date to the subscriber's local timezone, using the subscriber's timezone setting in SFMC. Only available in email/send contexts where subscriber data is available.

## Example

```javascript
var serverTime = Platform.Function.Now();
var localTime  = Platform.Function.SystemDateToLocalDate(serverTime);
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

Write("Your local time: " + formatDate(localTime, "M/D/YYYY H:MM"));
```
