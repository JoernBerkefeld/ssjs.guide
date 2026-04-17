---
layout: page
title: Date and Time
parent: Recipes
parent_url: /recipes/
description: Date manipulation patterns in SSJS — formatting, calculating differences, timezone handling, and building date ranges.
---

## Get Current Date/Time

```javascript
var now = Platform.Function.Now();  // "3/30/2026 10:15:00 AM" (SFMC server time)

function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

// Format for display
var displayDate = formatDate(now, "MM/DD/YYYY", "en-US");
var isoDate = formatDate(now, "YYYY-MM-DD", "en-US");
var fullDateTime = formatDate(now, "MM/DD/YYYY HH:mm:ss", "en-US");

// For cookies/HTTP headers
var httpDate = formatDate(now, "ddd, DD MMM YYYY HH:mm:ss", "en-US") + " GMT";
```

---

## Date Arithmetic

```javascript
var now = Platform.Function.Now();

function dateAdd(timestamp,intervalToAdd,intervalType) {
    Platform.Variable.SetValue("@dateAdd_ts",timestamp);
    Platform.Variable.SetValue("@dateAdd_add",intervalToAdd);
    Platform.Variable.SetValue("@dateAdd_type",intervalType);
    return TreatAsContent("%%=DateAdd(@dateAdd_ts, @dateAdd_add, @dateAdd_type)=%%");
}

// Add/subtract time
var tomorrow = dateAdd(now, 1, "D");
var nextWeek = dateAdd(now, 7, "D");
var nextMonth = dateAdd(now, 1, "M");
var nextYear = dateAdd(now, 1, "Y");
var inTwoHours = dateAdd(now, 2, "H");
var tenMinutesAgo = dateAdd(now, -10, "MI");

// Date parts: Y=year, M=month, D=day, H=hour, MI=minute, S=second
```

---

## Cookie Expiry Date

```javascript
function dateAdd(timestamp,intervalToAdd,intervalType) {
    Platform.Variable.SetValue("@dateAdd_ts",timestamp);
    Platform.Variable.SetValue("@dateAdd_add",intervalToAdd);
    Platform.Variable.SetValue("@dateAdd_type",intervalType);
    return TreatAsContent("%%=DateAdd(@dateAdd_ts, @dateAdd_add, @dateAdd_type)=%%");
}
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

// Cookie expiry 30 days from now
var expiry = formatDate(
    dateAdd(Platform.Function.Now(), 30, "D"),
    "ddd, DD MMM YYYY HH:mm:ss",
    "en-US"
) + " GMT";
Platform.Response.SetCookie("session", token, expiry, "/", "", true);
```

---

## Timezone Conversion

```javascript
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

// Convert SFMC server time to subscriber's local time
var serverTime = Platform.Function.Now();
var localTime = Platform.Function.SystemDateToLocalDate(serverTime);
var localDisplay = formatDate(localTime, "MM/DD/YYYY h:mm a", "en-US");
Write("Your local time: " + localDisplay);
```

---

## Date Range Filter

```javascript
function dateAdd(timestamp,intervalToAdd,intervalType) {
    Platform.Variable.SetValue("@dateAdd_ts",timestamp);
    Platform.Variable.SetValue("@dateAdd_add",intervalToAdd);
    Platform.Variable.SetValue("@dateAdd_type",intervalType);
    return TreatAsContent("%%=DateAdd(@dateAdd_ts, @dateAdd_add, @dateAdd_type)=%%");
}
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

// Get records from the last 7 days
var sevenDaysAgo = formatDate(
    dateAdd(Platform.Function.Now(), -7, "D"),
    "MM/DD/YYYY HH:mm:ss"
);

// Use with Platform.Function (filter by date string comparison)
var recentRows = Platform.Function.LookupRows("Events", "CreatedAt", sevenDaysAgo);
// Note: This is an exact match, not a range. Use WSProxy for range queries.

// Range query using WSProxy
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve(
    "DataExtensionObject[Events_Key]",
    ["Email", "EventType", "CreatedAt"],
    {
        LeftOperand: {
            Property: "CreatedAt",
            SimpleOperator: "greaterThan",
            Value: sevenDaysAgo
        },
        LogicalOperator: "AND",
        RightOperand: {
            Property: "CreatedAt",
            SimpleOperator: "lessThan",
            Value: formatDate(Platform.Function.Now(), "MM/DD/YYYY HH:mm:ss")
        }
    }
);
```

---

## Format for DE Storage vs Display

```javascript
var now = Platform.Function.Now();
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

// DE-compatible format (consistent, sortable)
var deFormat = formatDate(now, "MM/DD/YYYY","HH:mm:ss", "en-US");

// User-friendly display
var displayFormat = formatDate(now, "MMMM D, YYYY", "", "en-US");
// "March 30, 2026"

// ISO 8601 (for APIs, JSON)
var isoFormat = formatDate(now, "YYYY-MM-DD", "THH:mm:ss", "en-US");
// "2026-03-30T10:15:00"
```

---

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/now/">Platform.Function.Now</a></li>
  <li><a href="/platform-functions/systemdatetolocaldate/">Platform.Function.SystemDateToLocalDate</a></li>
</ul>
</div>
