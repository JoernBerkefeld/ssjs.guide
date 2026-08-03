---
layout: function
title: Now
parent: Platform Functions
parent_url: /platform-functions/
description: Returns the current date and time of the SFMC server as a Date object.
verification: verified
differs_from_docs: true
test_scripts: complete
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

On a CloudPage there is no triggering send or activity timestamp, so `Now(true)` returns a current-time `Date` just like the omitted and `false` forms. In a triggered context, `true` selects the initiation timestamp instead.

{% include test-script.html bundle="platform-functions--now" chapter="parameters" %}

## Return value

Returns a **`Date` object** (runtime `typeof` is `"object"`, `Object.prototype.toString` reports `[object Date]`, `.constructor === Date`, with working `Date` accessors such as `getFullYear()`, `getMonth()`, and `getTime()` — identical to `new Date()`). The one anomaly is that `instanceof Date` returns `false`, due to the engine-wide `instanceof`-on-builtins bug (it also affects `Array`/`RegExp`/`Function`) — test with `.constructor === Date`, not `instanceof`.

Each call returns a snapshot. Re-reading the same captured value produces the identical epoch timestamp, while a separate later `Now()` call can advance. Milliseconds are populated and available through `getMilliseconds()` and `getTime()`.

The value has three distinct output forms: `String(now)` and `"" + now` produce an RFC 2822-style value such as `"Tue, 14 Jul 2026 17:59:40 GMT-06:00"`; `Platform.Response.Write(now)` produces the account's locale-style rendering such as `7/31/2026 8:58:07 AM`; and `Stringify(now)` produces a quoted ISO-like value such as `"2026-07-31T08:58:07.529"`. `toISOString()` is not available and throws. String methods such as `indexOf()` and `substring()` also throw on the raw `Date`, so serialize it explicitly before performing string operations.

{% include differs-from-docs.html note="The official docs type the return value as an RFC 2822-compliant string, but the runtime returns a Date object; String() is RFC-like, Platform.Response.Write() is locale-style, and Stringify() is ISO-like." %}

{% include test-script.html bundle="platform-functions--now" chapter="differs-return-type" label="Show test script — Date object, not an RFC string" %}

{% include test-script.html bundle="platform-functions--now" chapter="return-value" %}

## Description

Returns the current server date/time as a stable `Date` snapshot. In contexts with a triggering send or activity, passing `true` selects that initiation timestamp; otherwise the value tracks the current request clock. Use `SystemDateToLocalDate()` when you need the account/user-local representation instead of system time.

{% include test-script.html bundle="platform-functions--now" chapter="description" %}

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

{% include test-script.html bundle="platform-functions--now" chapter="examples" %}

## Notes

`Now()` returns system time, not the subscriber's local time. Use `SystemDateToLocalDate()` to convert the captured value to the account/user-local representation. Date-object conversion passes through CLR interop, so round trips can differ by up to 2 ms; use structural or bounded comparisons for sub-second arithmetic.

{% include test-script.html bundle="platform-functions--now" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/now/">Now — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/platform-functions/systemdatetolocaldate/">SystemDateToLocalDate</a></li>
  <li><a href="/recipes/date-and-time/">Date & Time recipes</a></li>
</ul>
</div>

{% include test-script.html bundle="platform-functions--now" chapter="see-also" %}
