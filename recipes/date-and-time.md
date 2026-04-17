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

// Format for display
var displayDate = Platform.Function.FormatDate(now, "MM/DD/YYYY", "en-US");
var isoDate = Platform.Function.FormatDate(now, "YYYY-MM-DD", "en-US");
var fullDateTime = Platform.Function.FormatDate(now, "MM/DD/YYYY HH:mm:ss", "en-US");

// For cookies/HTTP headers
var httpDate = Platform.Function.FormatDate(now, "ddd, DD MMM YYYY HH:mm:ss", "en-US") + " GMT";
```

---

## Date Arithmetic

```javascript
var now = Platform.Function.Now();

// Add/subtract time
var tomorrow = Platform.Function.DateAdd(now, 1, "D");
var nextWeek = Platform.Function.DateAdd(now, 7, "D");
var nextMonth = Platform.Function.DateAdd(now, 1, "M");
var nextYear = Platform.Function.DateAdd(now, 1, "Y");
var inTwoHours = Platform.Function.DateAdd(now, 2, "H");
var tenMinutesAgo = Platform.Function.DateAdd(now, -10, "MI");

// Date parts: Y=year, M=month, D=day, H=hour, MI=minute, S=second
```

---

## Cookie Expiry Date

```javascript
// Cookie expiry 30 days from now
var expiry = Platform.Function.FormatDate(
    Platform.Function.DateAdd(Platform.Function.Now(), 30, "D"),
    "ddd, DD MMM YYYY HH:mm:ss",
    "en-US"
) + " GMT";
Platform.Response.SetCookie("session", token, expiry, "/", "", true);
```

---

## Timezone Conversion

```javascript
// Convert SFMC server time to subscriber's local time
var serverTime = Platform.Function.Now();
var localTime = Platform.Function.SystemDateToLocalDate(serverTime);
var localDisplay = Platform.Function.FormatDate(localTime, "MM/DD/YYYY h:mm a", "en-US");
Write("Your local time: " + localDisplay);
```

---

## Date Range Filter

```javascript
// Get records from the last 7 days
var sevenDaysAgo = Platform.Function.FormatDate(
    Platform.Function.DateAdd(Platform.Function.Now(), -7, "D"),
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
            Value: Platform.Function.FormatDate(Platform.Function.Now(), "MM/DD/YYYY HH:mm:ss")
        }
    }
);
```

---

## Format for DE Storage vs Display

```javascript
var now = Platform.Function.Now();

// DE-compatible format (consistent, sortable)
var deFormat = Platform.Function.FormatDate(now, "MM/DD/YYYY HH:mm:ss", "en-US");

// User-friendly display
var displayFormat = Platform.Function.FormatDate(now, "MMMM D, YYYY", "en-US");
// "March 30, 2026"

// ISO 8601 (for APIs, JSON)
var isoFormat = Platform.Function.FormatDate(now, "YYYY-MM-DDTHH:mm:ss", "en-US");
// "2026-03-30T10:15:00"
```

---

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/now/">Platform.Function.Now</a></li>
  <li><a href="/platform-functions/dateadd/">Platform.Function.DateAdd</a></li>
  <li><a href="/platform-functions/formatdate/">Platform.Function.FormatDate</a></li>
  <li><a href="/platform-functions/systemdatetolocaldate/">Platform.Function.SystemDateToLocalDate</a></li>
</ul>
</div>
