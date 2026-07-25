---
layout: page
title: DateTime
parent: Core Library
parent_url: /core-library/
permalink: /core-library/datetime/
redirect_from:
  - /platform-objects/datetime/
  - /platform-objects/datetime-timezone/
verification: verified
differs_from_docs: true
description: Date-time utilities for converting between system time and local time, and for retrieving time zone definitions. Requires the Core library.
---

The `DateTime` namespace provides date-time conversion helpers and time zone lookup, available after loading the Core library.

{% include callout.html type="warning" content="Requires <code>Platform.Load(\"core\", \"1.1.5\")</code> before use." %}

{% include callout.html type="note" content="Runtime-verified: the conversion methods return genuine <code>Date</code> objects (<code>typeof \"object\"</code>, <code>Object.prototype.toString</code> reports <code>[object Date]</code>, <code>.constructor === Date</code>, working <code>getFullYear()</code>/<code>getHours()</code>/<code>getTime()</code>; only <code>instanceof Date</code> is false due to the engine-wide instanceof-on-builtins bug — test with <code>.constructor === Date</code>). They also coerce to a string automatically (via <code>String(value)</code>, <code>\"\" + value</code>, or <code>Write(value)</code>). <code>DateTime.TimeZone.Retrieve()</code> rows are CLR objects that <code>Stringify()</code> cannot serialize — enumerate their fields with <code>for..in</code>." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`DateTime.SystemDateToLocalDate(dateString)`](#systemdatetolocaldate) | Date | Convert system time (CST) to local account/user time |
| [`DateTime.LocalDateToSystemDate(dateString)`](#localdatetosystemdate) | Date | Convert local account/user time to system time (CST) |
| [`DateTime.TimeZone.Retrieve([filter])`](#timezone-retrieve) | object[] | Retrieve time zone definitions — omit the filter for all time zones |

---

### DateTime.SystemDateToLocalDate {#systemdatetolocaldate}

Converts a date-time value from Marketing Cloud system time (Central Standard Time, no daylight saving adjustments) to the local time configured for the account or user.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateString` | string | Yes | A date-time string in system time (CST) to convert to local time. |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`).

**Returns:** `Date` — the converted local date-time as a `Date` object (`typeof "object"`, `Object.prototype.toString` reports `[object Date]`, `.constructor === Date`; only `instanceof Date` is false). Coerces to an ISO-like string when written or stringified.

**Equivalent full-form:** [`Platform.Function.SystemDateToLocalDate()`](/platform-functions/systemdatetolocaldate/)

```javascript
Platform.Load("core", "1.1.5");
var localTime = DateTime.SystemDateToLocalDate(Platform.Function.Now());
Write(localTime);
```

---

### DateTime.LocalDateToSystemDate {#localdatetosystemdate}

Converts a date-time value from the local time of the account or user to Marketing Cloud system time (Central Standard Time, no daylight saving adjustments).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateString` | string | Yes | A date-time string in local account/user time to convert to system time (CST). |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`).

**Returns:** `Date` — the converted system date-time as a `Date` object (`typeof "object"`, `Object.prototype.toString` reports `[object Date]`, `.constructor === Date`; only `instanceof Date` is false). Coerces to an ISO-like string when written or stringified.

**Equivalent full-form:** [`Platform.Function.LocalDateToSystemDate()`](/platform-functions/localdatetosystemdate/)

```javascript
Platform.Load("core", "1.1.5");
var systemTime = DateTime.LocalDateToSystemDate("8/5/2025 12:34 PM");
Write(systemTime);
```

---

### DateTime.TimeZone.Retrieve {#timezone-retrieve}

{% include method-status.html status="verified" differs=true %}

Returns the time zones matching the filter, or every time zone when no filter is given.

```javascript
DateTime.TimeZone.Retrieve([filter])
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | object | No | WSProxy-style filter (for example `{ Property: "ID", SimpleOperator: "equals", Value: 1 }`). Omit it to retrieve the full list |

**Returns:** `object[]` — matching time zone rows, each carrying `ID` (number) and `Name` (string).

{% include differs-from-docs.html note="The `filter` argument is **optional**, contrary to the docs — calling `DateTime.TimeZone.Retrieve()` with no argument returns the full time-zone list. A filter that matches nothing returns an empty collection rather than `null`, so `.length` can be read unconditionally, but a *malformed* filter (a plain string, or an object missing the three filter properties) raises a time-zone retrieval error instead of returning an empty list. The returned value is a CLR collection, not a JavaScript array: it is indexable and has `.length`, but `instanceof Array` is `false` and array methods such as `push` are absent. `Platform.Load(\"core\", ...)` is genuinely required — before the load `DateTime` is `undefined` and the call throws." %}

```javascript
Platform.Load("core", "1.1.5");

// Full list — no filter needed
var all = DateTime.TimeZone.Retrieve();
Write(all.length + " time zones\n");

// Filtered lookup
var rows = DateTime.TimeZone.Retrieve({
    Property: "ID",
    SimpleOperator: "equals",
    Value: 1
});
// Stringify() cannot serialize these CLR rows — read the fields directly
for (var i = 0; i < rows.length; i++) {
    Write(rows[i].ID + " = " + rows[i].Name + "\n");
}
```
