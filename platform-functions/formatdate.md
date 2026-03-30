---
layout: function
title: FormatDate
parent: Platform Functions
parent_url: /platform-functions/
description: Formats a date value into a string using a specified pattern. Essential for storing dates in DE fields and setting cookie expiration strings.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.FormatDate(date, format [, locale])"
return_type: string
min_args: 2
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `date` | string | Yes | Date value to format |
| `format` | string | Yes | Format pattern string |
| `locale` | string | No | Locale for date formatting (e.g., `"en-US"`) |

### Format Patterns

| Pattern | Meaning | Example |
|---------|---------|---------|
| `M` | Month (no leading zero) | `3` |
| `MM` | Month (with leading zero) | `03` |
| `MMM` | Month abbreviation | `Mar` |
| `MMMM` | Full month name | `March` |
| `D` | Day (no leading zero) | `5` |
| `DD` | Day (with leading zero) | `05` |
| `YYYY` | Four-digit year | `2026` |
| `YY` | Two-digit year | `26` |
| `H` | Hour (12-hour, no leading zero) | `2` |
| `HH` | Hour (12-hour, with leading zero) | `02` |
| `h` | Hour (24-hour, no leading zero) | `14` |
| `hh` | Hour (24-hour, with leading zero) | `14` |
| `MM` | Minutes (in time context) | `45` |
| `SS` | Seconds | `30` |

## Examples

```javascript
var now = Platform.Function.Now();

// ISO-like format for DE storage
var isoDate = Platform.Function.FormatDate(now, "YYYY-MM-DD");
// "2026-03-30"

// US format for display
var usDate = Platform.Function.FormatDate(now, "M/D/YYYY");
// "3/30/2026"

// Full datetime for cookie expiry
var expiryStr = Platform.Function.FormatDate(
    Platform.Function.DateAdd(now, 15, "MI"),
    "M/D/YYYY H:MM:SS"
);
Platform.Response.SetCookie("csrf_token", token, expiryStr, true);

// Human-readable date for email
var displayDate = Platform.Function.FormatDate(now, "MMMM D, YYYY");
// "March 30, 2026"
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/now/">Now</a></li>
  <li><a href="/platform-functions/dateadd/">DateAdd</a></li>
  <li><a href="/platform-functions/dateparse/">DateParse</a></li>
</ul>
</div>
