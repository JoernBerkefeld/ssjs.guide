---
layout: function
title: Format
parent: Core Library
parent_url: /core-library/
permalink: /core-library/format/
redirect_from:
  - /global-functions/format/
description: Applies a formatting rule to a string or numeric value — currencies, decimals, percentages, ISO dates, custom date patterns, and more. Requires the Core library.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: false
syntax: "Format(textToFormat, formatCode)"
return_type: string
min_args: 2
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `textToFormat` | string \| number | Yes | The string or number to apply a formatting rule to |
| `formatCode` | string | Yes | A format code to apply (see tables below) |

## Description

`Format()` applies a formatting rule to a string or numeric value. Use it to display currency, control decimal places, produce ISO 8601 timestamps, or build custom date strings.

Requires `Platform.Load("core", "1.1.5")` before use.

## Format Codes for Numeric Values

The values in the Example column are based on the sample value `4213.65`.

| Code | Description | Example |
|------|-------------|---------|
| `C` | Currency value with group and decimal separators | `$4,213.65` |
| `D` | Decimal value | `4213.65` |
| `E` | Exponential notation | `4.213650E+003` |
| `F` | Fixed-point value | `4213.65` |
| `G` | More compact of fixed-point or exponential notation | `4213.65` |
| `N` | Number with group and decimal separators | `4,213.65` |
| `P` | Percentage with group and decimal separators | `421,365.00%` |

Append a digit to any code to control the number of decimal places (rounding as needed). For example, with input `4213.65`:
- `C0` → `$4,214`
- `C4` → `$4,213.6500`

## Format Codes for Date Strings

### Predefined Date Formats

The values in the Example column are based on Monday, August 5, 2024 at 1:41:23 PM in the UTC-06:00 time zone.

| Code | Description | Example |
|------|-------------|---------|
| `d` | Short-form date | `8/5/24` |
| `M` | Month and day | `August 5` |
| `f` | Long-form date with 12-hour time | `Monday, August 5, 2024 1:41 PM` |
| `g` | Short-form date with 12-hour time | `8/5/2024 1:41 PM` |
| `O` | ISO 8601 timestamp | `2024-08-05T13:41:23.0000000` |
| `r` | RFC 1123 timestamp | `Mon, 05 Aug 2024 13:41:23 GMT` |
| `s` | Sortable timestamp | `2024-08-05T13:41:23` |
| `t` | 12-hour time | `1:41 PM` |
| `T` | 12-hour time with seconds | `1:41:23 PM` |
| `u` | Universal sortable timestamp | `2024-08-05 13:41:23Z` |
| `U` | Long-form date with 12-hour UTC time with seconds | `Monday, August 5, 2024 7:41:23 PM` |
| `y` | Month and year | `August 2024` |

### Custom Date Formats

Combine the codes below to build a custom format string. The values in the Example column are based on Monday, August 5, 2024 at 1:41:23 PM in the UTC-06:00 time zone.

| Code | Description | Example |
|------|-------------|---------|
| `d` | Day as numeral without leading zero | `5` |
| `dd` | Day as numeral with leading zero | `05` |
| `ddd` | Abbreviated day name | `Mon` |
| `dddd` | Full day name | `Monday` |
| `h` | Hours on a 12-hour clock without leading zero | `1` |
| `hh` | Hours on a 12-hour clock with leading zero | `01` |
| `HH` | Hours on a 24-hour clock | `13` |
| `mm` | Minutes | `41` |
| `M` | Month as numeral without leading zero | `8` |
| `MM` | Month as numeral with leading zero | `08` |
| `MMM` | Abbreviated month name | `Aug` |
| `MMMM` | Full month name | `August` |
| `ss` | Seconds | `23` |
| `tt` | 12-hour time period | `PM` |
| `yy` | Last two digits of year | `24` |
| `yyy` | Full year | `2024` |
| `z` | Time zone offset in hours without leading zero | `-6` |
| `zz` | Time zone offset in hours with leading zero | `-06` |
| `zzz` | Time zone offset in hours and minutes | `-06:00` |

{% include callout.html type="note" content="Some custom codes overlap with predefined codes (e.g. `d`). When passed as a single code, `Format(date, \"d\")` uses the predefined format. When combined with other codes, it uses the custom interpretation. For example, `Format(date, \"d MMMM\")` outputs `5 August`." %}

## Examples

### Format a currency value

```javascript
Platform.Load("core", "1.1.5");

var unitPrice = 29.99;
var salesTaxRate = 1.09;
var totalPrice = unitPrice * salesTaxRate; // 32.6891
var formatted = Format(totalPrice, "C2");
Write(formatted); // "$32.69"
```

### Format a date with a predefined code

```javascript
Platform.Load("core", "1.1.5");

var now = Platform.Function.Now();
var isoDate = Format(now, "O");
Write(isoDate); // e.g. "2024-08-05T13:41:23.0000000"
```

### Format a date with a custom pattern

```javascript
Platform.Load("core", "1.1.5");

var date = "2024-08-05T13:41:23.000-06:00";
var custom = Format(date, "dddd, MMMM d yyy HH:mm:ss (zzz)");
Write(custom); // "Monday, August 5 2024 13:41:23 (-06:00)"
```

### Build an RFC 1123 cookie expiry date

```javascript
Platform.Load("core", "1.1.5");

var expiry = Format(Platform.Function.Now(), "r"); // "Mon, 05 Aug 2024 13:41:23 GMT"
Platform.Response.SetCookie("session", token, expiry, true);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/recipes/date-and-time/">Date and Time Recipes</a></li>
  <li><a href="/platform-objects/platform-load/">Platform.Load</a></li>
  <li><a href="/core-library/stringify/">Stringify</a></li>
</ul>
</div>
