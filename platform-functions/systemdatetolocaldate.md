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
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateString` | string \| Date | Yes | A date-time value in system time (CST) to convert to local time. |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`). A real `Date` object is accepted as well, which is what makes passing `Platform.Function.Now()` straight in work. Invalid or empty date strings are rejected.

{% include test-script.html bundle="platform-functions--systemdatetolocaldate" chapter="parameters" %}

## Description

Converts a date-time value from Marketing Cloud system time (Central Standard Time, no daylight saving adjustments) to the local time configured for the account or user. The `Platform.Function.` form does **not** require `Platform.Load("core", ...)`; only the short `DateTime.SystemDateToLocalDate()` form does.

{% include test-script.html bundle="platform-functions--systemdatetolocaldate" chapter="description" %}

## Return value

Returns a **`Date` object** (runtime `typeof` is `"object"`, `Object.prototype.toString` reports `[object Date]`, `.constructor === Date`, and `getFullYear()` / `getHours()` / `getTime()` all work — identical to `new Date()`). The one anomaly is that `instanceof Date` returns `false`, due to the engine-wide `instanceof`-on-builtins bug — test with `.constructor === Date`, not `instanceof`. It is not a plain string: writing it renders the human-readable form (`8/5/2025 8:00:00 PM`), while `Stringify()` produces the ISO-like form `2025-08-05T20:00:00.000`. Note that `toISOString()` is **not** available on the returned value — it throws — so use `Stringify()` for the ISO-like form.

The value is expressed in the account's or user's local time, which does observe daylight saving while the system clock does not, so the same wall-clock system input yields a local hour one hour later in summer than in winter. The shift is always a whole number of hours — minutes, seconds and milliseconds pass through untouched — and [`LocalDateToSystemDate()`](/platform-functions/localdatetosystemdate/) is its exact inverse, so round-tripping a value through both functions returns the original instant to the millisecond.

{% include differs-from-docs.html note="The official docs type the return value as a string, but the runtime returns a Date object. String methods such as indexOf() and substring() throw on it; it produces a string only via an explicit Stringify() or String() call, or when written." %}

{% include test-script.html bundle="platform-functions--systemdatetolocaldate" chapter="differs-return-type" label="Show test script — Date object, not a string" %}

{% include test-script.html bundle="platform-functions--systemdatetolocaldate" chapter="return-value" %}

## Example

```javascript
var systemTime = Platform.Function.Now();
var localTime  = Platform.Function.SystemDateToLocalDate(systemTime);
Write(localTime);
```

Passing a `Date` **object** — as this example does with `Platform.Function.Now()` — marshals it through the CLR, and that round trip is not exact below the second: depending on the millisecond value, the converted instant can come back up to 2 ms short of the exact whole-hour shift. Passing the same instant as a **string** converts with no loss at all, so use string input if you need exact millisecond arithmetic.

{% include test-script.html bundle="platform-functions--systemdatetolocaldate" chapter="example" %}

## See Also

- [`DateTime.SystemDateToLocalDate()`](/core-library/datetime/#systemdatetolocaldate) — short form available after `Platform.Load("core", "1.1.5")`; equivalent to this function.

There is no bare-name `SystemDateToLocalDate()` global — only the `Platform.Function.` and `DateTime.` forms are reachable.

{% include test-script.html bundle="platform-functions--systemdatetolocaldate" chapter="see-also" %}
