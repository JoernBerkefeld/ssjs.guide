---
layout: function
title: DateAdd
parent: Platform Functions
parent_url: /platform-functions/
description: Adds a specified number of intervals (days, months, hours, etc.) to a date value.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.DateAdd(date, interval, datePart)"
return_type: string
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `date` | string | Yes | Date value to modify |
| `interval` | number | Yes | Number of intervals to add (can be negative to subtract) |
| `datePart` | string | Yes | Unit for the interval |

### DatePart Values

| Value | Meaning |
|-------|---------|
| `"Y"` | Years |
| `"M"` | Months |
| `"D"` | Days |
| `"H"` | Hours |
| `"MI"` | Minutes |
| `"S"` | Seconds |

## Examples

```javascript
var now = Platform.Function.Now();

// Add 30 days
var in30Days = Platform.Function.DateAdd(now, 30, "D");

// Subtract 1 year
var lastYear = Platform.Function.DateAdd(now, -1, "Y");

// Add 2 hours
var twoHoursLater = Platform.Function.DateAdd(now, 2, "H");

// Set cookie expiry to 15 minutes from now
var expiry = Platform.Function.DateAdd(now, 15, "MI");
var expiryStr = Platform.Function.FormatDate(expiry, "M/D/YYYY H:MM:SS");
Platform.Response.SetCookie("session", token, expiryStr, true);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/now/">Now</a></li>
  <li><a href="/platform-functions/datediff/">DateDiff</a></li>
  <li><a href="/platform-functions/formatdate/">FormatDate</a></li>
  <li><a href="/recipes/date-and-time/">Date & Time recipes</a></li>
</ul>
</div>
