---
layout: page
title: Date Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/date-methods/
description: Date prototype methods and statics in SSJS — value-confirmed getters and string conversions (ES3), the getMilliseconds caveat, and the missing toISOString.
---

`Date` is available in SSJS. The members below were value-confirmed on the SFMC JINT engine. `getMilliseconds` is frequently off by one (Partial), and `toISOString` is missing. All working members are ES3.

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
| [`toString()`](#tostring) | ES3 | ✅ Works | |
| [`toDateString()`](#todatestring) | ES3 | ✅ Works | |
| [`toUTCString()`](#toutcstring) | ES3 | ✅ Works | |
| [`getMilliseconds()`](#getmilliseconds) | ES3 | ⚠️ Partial | Frequently off by one — do not trust exact value |
| [`Date.now()`](#now) | ES5 | ✅ Works | |
| [`Date.parse(str)`](#parse) | ES3 | ✅ Works | |
| [`Date.UTC(...)`](#utc) | ES3 | ✅ Works | |
| [`toISOString()`](#toisostring) | ES5 | ❌ Missing | Build the ISO string manually, or use `Platform.Function.FormatDate` |

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

## toString {#tostring}

`(ES3)` — ✅ Works. Human-readable date string.

## toDateString {#todatestring}

`(ES3)` — ✅ Works. Date portion as a human-readable string.

## toUTCString {#toutcstring}

`(ES3)` — ✅ Works. Date string in the UTC time zone.

```javascript
new Date(0).toUTCString();   // "Thu, 01 Jan 1970 00:00:00 UTC"
```

## getMilliseconds {#getmilliseconds}

`(ES3)` — ⚠️ Partial. Milliseconds (0–999) in local time, but **frequently off by one** in the SFMC engine — do not rely on exact values.

## now {#now}

`(ES5)` — ✅ Works. `Date.now()` returns the current time in milliseconds since the epoch.

```javascript
Date.now();   // current time in ms
```

## parse {#parse}

`(ES3)` — ✅ Works. `Date.parse(dateString)` returns milliseconds since the epoch.

```javascript
Date.parse("2026-06-18");   // ms for 2026-06-18 (UTC)
```

## UTC {#utc}

`(ES3)` — ✅ Works. `Date.UTC(year[, month[, day[, hours[, minutes[, seconds[, ms]]]]]])` returns ms for the given UTC components.

```javascript
Date.UTC(1970, 0, 1);                    // 0
var d = new Date(Date.UTC(2026, 0, 1));  // build a UTC-based Date
```

## toISOString {#toisostring}

`(ES5)` — ❌ Missing. `Date.prototype.toISOString` is unavailable in SFMC. Build the ISO string manually from the `get*` methods, or use `Platform.Function.FormatDate` / `Platform.Function.SystemDateToLocalDate`.

```javascript
function toISOString(d) {
    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) +
        "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/">ECMAScript Built-ins</a></li>
  <li><a href="/platform-functions/now/">Platform.Function.Now</a></li>
  <li><a href="/platform-functions/formatdate/">Platform.Function.FormatDate</a></li>
</ul>
</div>
