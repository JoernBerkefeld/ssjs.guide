---
layout: function
title: Now
parent: Platform Functions
parent_url: /platform-functions/
description: Returns the current date and time of the SFMC server as a Date object.
verification: verified
differs_from_docs: true
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Now([useContextTime])"
return_type: Date
min_args: 0
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `useContextTime` | boolean | No | When `true`, returns the time the triggering send or activity was initiated. When `false` or omitted, returns the current system clock time. |

## Return value

Returns a **`Date` object** (runtime `typeof` is `"object"`, `Object.prototype.toString` reports `[object Date]`, `.constructor === Date`, with working `Date` accessors such as `getFullYear()`, `getMonth()`, and `getTime()` — identical to `new Date()`). The one anomaly is that `instanceof Date` returns `false`, due to the engine-wide `instanceof`-on-builtins bug (it also affects `Array`/`RegExp`/`Function`) — test with `.constructor === Date`, not `instanceof`. The time is in the SFMC account's configured timezone (Central by default). When concatenated to a string it coerces to an RFC 2822-style value such as `"Tue, 14 Jul 2026 17:59:40 GMT-06:00"`, which is why `Platform.Response.Write()` outputs it in that format.

{% include differs-from-docs.html note="The official docs describe the return as an RFC 2822-compliant date-time string, but the runtime returns a Date object; it only appears as an RFC 2822 string when coerced during output." %}

## Description

Returns the current server date/time. The time is in the SFMC account's configured timezone (Central time by default, unless configured otherwise).

## Examples

```javascript
var now = Platform.Function.Now();
Write("Server time: " + now); // e.g. "Tue, 14 Jul 2026 17:59:40 GMT-06:00"

// now is a Date object — Date accessors work directly:
Write(now.getFullYear()); // 2026

// Store a timestamp in a DE
Platform.Function.InsertData("Log", "Timestamp", Platform.Function.Now(), "Event", "page_view");

// Use with DateAdd for expiry calculations
function dateAdd(timestamp,intervalToAdd,intervalType) {
    Platform.Variable.SetValue("@dateAdd_ts",timestamp);
    Platform.Variable.SetValue("@dateAdd_add",intervalToAdd);
    Platform.Variable.SetValue("@dateAdd_type",intervalType);
    return Platform.Function.TreatAsContent("%%=DateAdd(@dateAdd_ts, @dateAdd_add, @dateAdd_type)=%%");
}
var expiry = dateAdd(Now(), 30, "D");
Write("Expires: " + expiry);
```

## Notes

For time-sensitive calculations, note that `Now()` returns the SFMC server time (Central time by default, unless configured otherwise). It does not return the subscriber's local time — use `SystemDateToLocalDate()` for that.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/now/">Now — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/platform-functions/systemdatetolocaldate/">SystemDateToLocalDate</a></li>
  <li><a href="/recipes/date-and-time/">Date & Time recipes</a></li>
</ul>
</div>
