---
layout: function
title: DateDiff
parent: Platform Functions
parent_url: /platform-functions/
description: Calculates the difference between two date values in the specified interval unit.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.DateDiff(date1, date2, datePart)"
return_type: number
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `date1` | string | Yes | First date value |
| `date2` | string | Yes | Second date value |
| `datePart` | string | Yes | Unit for the difference (`"Y"`, `"M"`, `"D"`, `"H"`, `"MI"`, `"S"`) |

## Description

Returns `date2 - date1` in the specified units. Positive if `date2` is after `date1`, negative if before.

## Examples

```javascript
var lastLogin = Platform.Function.Lookup("Users", "LastLogin", "SK", sk);
var now = Platform.Function.Now();

// How many days since last login?
var daysSince = Platform.Function.DateDiff(lastLogin, now, "D");

if (daysSince > 90) {
    Write("<p>Welcome back! It's been " + daysSince + " days.</p>");
}

// Age check
var birthDate = subscriber.BirthDate;
var ageInYears = Platform.Function.DateDiff(birthDate, now, "Y");
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/dateadd/">DateAdd</a></li>
  <li><a href="/platform-functions/now/">Now</a></li>
</ul>
</div>
