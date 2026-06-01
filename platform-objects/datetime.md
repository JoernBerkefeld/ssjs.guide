---
layout: page
title: DateTime
parent: Platform Objects
parent_url: /platform-objects/
permalink: /platform-objects/datetime/
redirect_from:
  - /platform-objects/datetime-timezone/
description: Date-time utilities for converting between system time and local time, and for retrieving time zone definitions. Requires the Core library.
---

The `DateTime` namespace provides date-time conversion helpers and time zone lookup, available after loading the Core library.

{% include callout.html type="warning" content="Requires <code>Platform.Load(\"core\", \"1.1.5\")</code> before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`DateTime.SystemDateToLocalDate(dateString)`](#systemdatetolocaldate) | string | Convert system time (CST) to local account/user time |
| [`DateTime.LocalDateToSystemDate(dateString)`](#localdatetolocaldate) | string | Convert local account/user time to system time (CST) |
| [`DateTime.TimeZone.Retrieve(filter)`](#timezone-retrieve) | object[] | Retrieve time zone definitions |

---

### DateTime.SystemDateToLocalDate {#systemdatetolocaldate}

Converts a date-time value from Marketing Cloud system time (Central Standard Time, no daylight saving adjustments) to the local time configured for the account or user.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateString` | string | Yes | A date-time string in system time (CST) to convert to local time. |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`).

**Returns:** `string` — the converted local date-time string.

**Equivalent full-form:** [`Platform.Function.SystemDateToLocalDate()`](/platform-functions/systemdatetolocaldate/)

```javascript
Platform.Load("core", "1.1.5");
var localTime = DateTime.SystemDateToLocalDate(Platform.Function.Now());
Write(localTime);
```

---

### DateTime.LocalDateToSystemDate {#localdatetolocaldate}

Converts a date-time value from the local time of the account or user to Marketing Cloud system time (Central Standard Time, no daylight saving adjustments).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateString` | string | Yes | A date-time string in local account/user time to convert to system time (CST). |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`).

**Returns:** `string` — the converted system date-time string.

**Equivalent full-form:** [`Platform.Function.LocalDateToSystemDate()`](/platform-functions/localdatetosystemdate/)

```javascript
Platform.Load("core", "1.1.5");
var systemTime = DateTime.LocalDateToSystemDate("8/5/2025 12:34 PM");
Write(systemTime);
```

---

### DateTime.TimeZone.Retrieve {#timezone-retrieve}

Returns an array of time zones matching the filter. If you pass no filter (or an empty object), all time zones may be returned depending on platform behavior — prefer an explicit filter in production code.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter (for example `{ Property: "ID", SimpleOperator: "equals", Value: 1 }`) |

**Returns:** `object[]` — matching time zone rows.

```javascript
Platform.Load("core", "1.1.5");

var rows = DateTime.TimeZone.Retrieve({
    Property: "ID",
    SimpleOperator: "equals",
    Value: 1
});
Write(Stringify(rows));
```
