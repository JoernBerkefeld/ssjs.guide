---
layout: page
title: Date Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/date-methods/
description: Date prototype methods and statics in SSJS — value-confirmed getters and string conversions (ES3), the getMilliseconds off-by-one bug, Date.now returning a Date object, Date.parse never returning NaN, and the missing toISOString.
verification: verified
differs_from_docs: true
---

`Date` is available in SSJS and constructible (`new Date(...)`). Every member below was **runtime-proven on a live CloudPage** against the SFMC JINT engine and cross-checked with MDN. The instance getters and string conversions behave as expected, but several statics differ from the ECMAScript spec: **`Date.now()` returns a `Date` object instead of a number**, **`Date.parse()` returns `0` (never `NaN`) for unparseable strings**, and `getMilliseconds` is frequently off by one. `toISOString` is missing. All working members are ES3 except `Date.now` (ES5).

{% include callout.html type="warning" title="Differs from MDN / the ECMAScript spec" content="In the SFMC engine `Date.now()` returns a **Date object**, not a number; `Date.parse()` returns **`0`** (the epoch) instead of **`NaN`** for invalid strings; and date-only ISO strings (`\"2026-06-18\"`) parse as **local** midnight, not UTC. See the notes on each member below." %}

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`getFullYear()`](#getfullyear) | ES3 | ✅ Works | |
| [`getMonth()`](#getmonth) | ES3 | ✅ Works | 0 = January |
| [`getDate()`](#getdate) | ES3 | ✅ Works | Day of month 1–31 |
| [`getDay()`](#getday) | ES3 | ✅ Works | 0 = Sunday |
| [`getHours()`](#gethours) | ES3 | ✅ Works | |
| [`getMinutes()`](#getminutes) | ES3 | ✅ Works | |
| [`getSeconds()`](#getseconds) | ES3 | ✅ Works | |
| [`getTime()`](#gettime) | ES3 | ✅ Works | ms since epoch |
| [`getTimezoneOffset()`](#gettimezoneoffset) | ES3 | ✅ Works | minutes offset from UTC |
| [`valueOf()`](#valueof) | ES3 | ✅ Works | ms since epoch |
| [`getUTCFullYear()`](#getutcfullyear) | ES3 | ✅ Works | |
| [`getUTCMonth()`](#getutcmonth) | ES3 | ✅ Works | 0 = January |
| [`getUTCDate()`](#getutcdate) | ES3 | ✅ Works | Day of month 1–31 |
| [`getUTCDay()`](#getutcday) | ES3 | ✅ Works | 0 = Sunday |
| [`getUTCHours()`](#getutchours) | ES3 | ✅ Works | |
| [`getUTCMinutes()`](#getutcminutes) | ES3 | ✅ Works | |
| [`getUTCSeconds()`](#getutcseconds) | ES3 | ✅ Works | |
| [`getUTCMilliseconds()`](#getutcmilliseconds) | ES3 | ✅ Works | |
| [`toString()`](#tostring) | ES3 | ✅ Works | |
| [`toDateString()`](#todatestring) | ES3 | ✅ Works | |
| [`toTimeString()`](#totimestring) | ES3 | ✅ Works | Time portion string |
| [`toUTCString()`](#toutcstring) | ES3 | ✅ Works | |
| [`getMilliseconds()`](#getmilliseconds) | ES3 | ⚠️ Partial | Frequently off by one — do not trust exact value |
| [`Date.now()`](#now) | ES5 | ⚠️ Partial | Returns a **`Date` object**, not a number — coerce it |
| [`Date.parse(str)`](#parse) | ES3 | ⚠️ Partial | Invalid strings return **`0`**, not `NaN`; date-only strings parse as **local** |
| [`Date.UTC(...)`](#utc) | ES3 | ✅ Works | Pass ≥ 2 args; year-only form misbehaves |
| [`toISOString()`](#toisostring) | ES5 | ❌ Missing | Build the ISO string manually |
| [`toJSON()`](#tojson) | ES5 | ❌ Missing | Absent (depends on `toISOString`) |

---

## getFullYear {#getfullyear}

`(ES3)` — ✅ Works. Four-digit year in local time.

```javascript
new Date().getFullYear();   // e.g. 2026
```

## getMonth {#getmonth}

`(ES3)` — ✅ Works. Month (`0` = January … `11` = December) in local time.

## getDate {#getdate}

`(ES3)` — ✅ Works. Day of the month (1–31) in local time.

## getDay {#getday}

`(ES3)` — ✅ Works. Day of week (`0` = Sunday … `6` = Saturday) in local time.

## getHours {#gethours}

`(ES3)` — ✅ Works. Hours (0–23) in local time.

## getMinutes {#getminutes}

`(ES3)` — ✅ Works. Minutes (0–59) in local time.

## getSeconds {#getseconds}

`(ES3)` — ✅ Works. Seconds (0–59) in local time.

## getTime {#gettime}

`(ES3)` — ✅ Works. Milliseconds since the Unix epoch.

```javascript
new Date().getTime();   // ms since 1970-01-01T00:00:00Z
```

## getTimezoneOffset {#gettimezoneoffset}

`(ES3)` — ✅ Works. Difference, in minutes, between local time and UTC.

## valueOf {#valueof}

`(ES3)` — ✅ Works. Milliseconds since the Unix epoch (same as `getTime`).

## getUTCFullYear {#getutcfullyear}

`(ES3)` — ✅ Works. Four-digit year in UTC.

## getUTCMonth {#getutcmonth}

`(ES3)` — ✅ Works. Month (`0` = January … `11` = December) in UTC.

## getUTCDate {#getutcdate}

`(ES3)` — ✅ Works. Day of the month (1–31) in UTC.

## getUTCDay {#getutcday}

`(ES3)` — ✅ Works. Day of week (`0` = Sunday … `6` = Saturday) in UTC.

## getUTCHours {#getutchours}

`(ES3)` — ✅ Works. Hours (0–23) in UTC.

## getUTCMinutes {#getutcminutes}

`(ES3)` — ✅ Works. Minutes (0–59) in UTC.

## getUTCSeconds {#getutcseconds}

`(ES3)` — ✅ Works. Seconds (0–59) in UTC.

## getUTCMilliseconds {#getutcmilliseconds}

`(ES3)` — ✅ Works. Milliseconds (0–999) in UTC. Unlike the local [`getMilliseconds`](#getmilliseconds), the UTC variant was accurate at the epoch in testing.

## toString {#tostring}

`(ES3)` — ✅ Works. Human-readable date string (e.g. `Wed, 31 Dec 1969 18:00:00 GMT-06:00`), in the account time zone.

## toDateString {#todatestring}

`(ES3)` — ✅ Works. Date portion as a human-readable string.

## toTimeString {#totimestring}

`(ES3)` — ✅ Works. Time portion as a human-readable string.

## toUTCString {#toutcstring}

`(ES3)` — ✅ Works. Date string in the UTC time zone.

```javascript
new Date(0).toUTCString();   // "Thu, 01 Jan 1970 00:00:00 UTC"
```

## getMilliseconds {#getmilliseconds}

`(ES3)` — ⚠️ Partial. Milliseconds (0–999) in local time, but **frequently off by one** in the SFMC engine — do not rely on exact values.

{% include callout.html type="warning" title="Differs from MDN — off-by-one" content="Runtime-verified: constructing a date with 123 ms reports **122**; 555 → 554, 666 → 665, 777 → 776. Some values (0, 111, 888, 999) are exact. Never compare sub-second precision; round or avoid milliseconds." %}

## now {#now}

`(ES5)` — ⚠️ Partial. In the SFMC engine `Date.now()` returns a **`Date` object**, not a number as the spec requires.

{% include callout.html type="warning" title="Differs from MDN — returns a Date object, not a number" content="Runtime-verified: `typeof Date.now()` is `\"object\"` and it stringifies to a date-time string. MDN specifies a Number (ms since epoch). Numeric coercion (`Date.now() + 0`) yields the epoch ms, but any code expecting a plain number will break. Prefer `new Date().getTime()`, which returns a clean number." %}

```javascript
// ❌ Date.now() returns a Date object in SFMC, not a number
// ✅ use getTime() for clean epoch milliseconds
var ms = new Date().getTime();   // current time in ms (number)
```

## parse {#parse}

`(ES3)` — ⚠️ Partial. `Date.parse(dateString)` returns milliseconds since the epoch, but **invalid strings return `0`, not `NaN`**, and **date-only strings parse as local time, not UTC**.

{% include callout.html type="warning" title="Differs from MDN — no NaN, local date-only parsing" content="Runtime-verified: `Date.parse(\"garbage\")`, `Date.parse(\"\")`, and `Date.parse(\"2021-13-45\")` all return **`0`** (the epoch), not `NaN` — so `isNaN()` cannot detect a bad date and invalid input silently becomes 1970-01-01. Also, a date-only ISO string like `\"2026-06-18\"` is parsed as **local** midnight (`getUTCHours()` = 6 at GMT-06:00), whereas the ES5+ spec treats date-only forms as UTC. Validate input yourself." %}

```javascript
// ⚠️ SFMC returns 0 (epoch), not NaN — validate before trusting the result
Date.parse("2021-01-01T00:00:00Z");   // 1609459200000
Date.parse("2026-06-18");             // parses as LOCAL midnight, not UTC
Date.parse("garbage");                // 0  (spec: NaN)
```

## UTC {#utc}

`(ES3)` — ✅ Works, with a caveat. `Date.UTC(year[, month[, day[, hours[, minutes[, seconds[, ms]]]]]])` returns ms for the given UTC components when you pass at least **year and month**.

{% include callout.html type="warning" title="Differs from MDN — year-only form misbehaves" content="Runtime-verified: the year-only form `Date.UTC(2026)` returns a nonsense small number (observed **-21597974**) instead of a valid timestamp — and does **not** return `NaN`. Always pass at least year and month, e.g. `Date.UTC(2026, 0, 1)`." %}

```javascript
Date.UTC(1970, 0, 1);                    // 0
Date.UTC(2026, 0, 1);                    // 1767225600000
var d = new Date(Date.UTC(2026, 0, 1));  // build a UTC-based Date
```

## toISOString {#toisostring}

`(ES5)` — ❌ Missing. `Date.prototype.toISOString` is unavailable in SFMC (`typeof d.toISOString` is `undefined`; calling it throws *"Object expected: toISOString"*). Build the ISO string manually from the `getUTC*` methods, or use `Platform.Function.SystemDateToLocalDate`.

```javascript
function toISOString(d) {
    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) +
        "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
}
```

## toJSON {#tojson}

`(ES5)` — ❌ Missing. `Date.prototype.toJSON` is unavailable (`typeof d.toJSON` is `undefined`) because it depends on the absent [`toISOString`](#toisostring). Serialize dates with the manual `toISOString` polyfill above.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/">ECMAScript Built-ins</a></li>
  <li><a href="/platform-functions/now/">Platform.Function.Now</a></li>
</ul>
</div>
