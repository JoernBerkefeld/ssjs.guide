---
layout: function
title: Now
parent: Platform Functions
parent_url: /platform-functions/
description: Returns the current date and time of the SFMC server as a string.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Now()"
return_type: string
min_args: 0
max_args: 0
---

## Description

Returns the current server date/time as a string in a format like `"3/30/2026 2:45:23 PM"`. The time is in the SFMC account's configured timezone.

## Examples

```javascript
var now = Platform.Function.Now();
Write("Server time: " + now);

// Store a timestamp in a DE
Platform.Function.InsertData("Log", "Timestamp", Platform.Function.Now(), "Event", "page_view");

// Use with DateAdd for expiry calculations
var expiry = Platform.Function.DateAdd(Platform.Function.Now(), 30, "D");
Write("Expires: " + expiry);
```

## Notes

For time-sensitive calculations, note that `Now()` returns the SFMC server time (Central time by default, unless configured otherwise). It does not return the subscriber's local time — use `SystemDateToLocalDate()` for that.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/dateadd/">DateAdd</a></li>
  <li><a href="/platform-functions/datediff/">DateDiff</a></li>
  <li><a href="/platform-functions/formatdate/">FormatDate</a></li>
  <li><a href="/platform-functions/systemdatetolocaldate/">SystemDateToLocalDate</a></li>
  <li><a href="/recipes/date-and-time/">Date & Time recipes</a></li>
</ul>
</div>
