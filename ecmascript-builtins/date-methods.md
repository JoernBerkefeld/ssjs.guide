---
layout: page
title: Date Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/date-methods/
description: Date prototype methods and statics confirmed to work in SSJS — value-tested getters, string conversions, and the Date.UTC static, all ES3.
---

`Date` is available in SSJS. The methods below were value-confirmed on the SFMC JINT engine — they exist **and** return correct values. All are part of ES3.

{% include callout.html type="note" content="Only the members listed here have been verified to return correct values. Other `Date` members may exist but behave inconsistently — test before relying on them." %}

---

## Instance Methods (ES3)

| Method | Returns | Description |
|--------|---------|-------------|
| `Date.prototype.getFullYear()` `(ES3)` | number | Four-digit year in local time |
| `Date.prototype.getDay()` `(ES3)` | number | Day of week (0 = Sunday … 6 = Saturday) in local time |
| `Date.prototype.getMinutes()` `(ES3)` | number | Minutes (0–59) in local time |
| `Date.prototype.getSeconds()` `(ES3)` | number | Seconds (0–59) in local time |
| `Date.prototype.getMilliseconds()` `(ES3)` | number | Milliseconds (0–999) in local time |
| `Date.prototype.valueOf()` `(ES3)` | number | Milliseconds since the Unix epoch |
| `Date.prototype.toString()` `(ES3)` | string | Human-readable date string |
| `Date.prototype.toDateString()` `(ES3)` | string | Date portion as a human-readable string |
| `Date.prototype.toUTCString()` `(ES3)` | string | Date string in the UTC time zone |

```javascript
var d = new Date();
d.getFullYear();      // e.g. 2026
d.getDay();           // 0–6
d.getMinutes();       // 0–59
d.getSeconds();       // 0–59
d.getMilliseconds();  // 0–999
d.valueOf();          // ms since 1970-01-01T00:00:00Z

var epoch = new Date(0);
epoch.toString();      // human-readable
epoch.toDateString();  // date portion only
epoch.toUTCString();   // "Thu, 01 Jan 1970 00:00:00 UTC"
```

---

## Static Methods (ES3)

| Method | Returns | Description |
|--------|---------|-------------|
| `Date.UTC(year[, month[, day[, hours[, minutes[, seconds[, ms]]]]]])` `(ES3)` | number | Milliseconds since the Unix epoch for the given UTC date components |

```javascript
Date.UTC(1970, 0, 1);          // 0
Date.UTC(2026, 5, 18);         // ms for 2026-06-18 (UTC)
var d = new Date(Date.UTC(2026, 0, 1));  // build a UTC-based Date
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/">ECMAScript Built-ins</a></li>
  <li><a href="/platform-functions/now/">Platform.Function.Now</a></li>
  <li><a href="/platform-functions/dateadd/">Platform.Function.DateAdd</a></li>
</ul>
</div>
