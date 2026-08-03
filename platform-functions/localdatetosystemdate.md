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
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateString` | string \| Date | Yes | A date-time value in local account/user time to convert to system time (CST). |

Accepted formats include ISO 8601 (`2025-08-05T12:34:56.789Z`), US notation (`8/5/2025 12:34 PM`), long-form (`5 August 2025`), and time-only (`14:23:56`). A real `Date` object is accepted as well, which is what makes passing `Platform.Function.Now()` straight in work. Invalid or empty date strings are rejected.

{% include test-script.html bundle="platform-functions--localdatetosystemdate" chapter="parameters" %}

## Return value

Returns a **`Date` object** (runtime `typeof` is `"object"`, `Object.prototype.toString` reports `[object Date]`, `.constructor === Date`, and `getFullYear()` / `getHours()` / `getTime()` all work — identical to `new Date()`). The one anomaly is that `instanceof Date` returns `false`, due to the engine-wide `instanceof`-on-builtins bug — test with `.constructor === Date`, not `instanceof`. It is not a plain string: writing it renders the human-readable form (`8/5/2025 4:00:00 AM`), while `Stringify()` produces the ISO-like form `2025-08-05T04:00:00.000`. Note that `toISOString()` is **not** available on the returned value — it throws — so use `Stringify()` for the ISO-like form.

The value is expressed in Marketing Cloud system time (CST) with daylight saving removed, so the same wall-clock local input yields a system hour one hour earlier in summer than in winter. The shift is always a whole number of hours — minutes, seconds and milliseconds pass through untouched — and [`SystemDateToLocalDate()`](/platform-functions/systemdatetolocaldate/) is its exact inverse, so round-tripping a value through both functions returns the original instant to the millisecond.

{% include differs-from-docs.html note="The official docs type the return value as a string, but the runtime returns a Date object. String methods such as indexOf() and substring() throw on it; it produces a string only via an explicit Stringify() or String() call, or when written." %}

{% include test-script.html bundle="platform-functions--localdatetosystemdate" chapter="differs-return-type" label="Show test script — Date object, not a string" %}

{% include test-script.html bundle="platform-functions--localdatetosystemdate" chapter="return-value" %}

## Example

```javascript
var time = Platform.Function.Now();
var systemTime = Platform.Function.LocalDateToSystemDate(time);
Write(systemTime);
```

{% include test-script.html bundle="platform-functions--localdatetosystemdate" chapter="example" %}

## See Also

- [`DateTime.LocalDateToSystemDate()`](/core-library/datetime/#localdatetosystemdate) — short form available after `Platform.Load("core", "1.1.5")`; equivalent to this function.

There is no bare-name `LocalDateToSystemDate()` global — only the `Platform.Function.` and `DateTime.` forms are reachable.

{% include test-script.html bundle="platform-functions--localdatetosystemdate" chapter="see-also" %}
