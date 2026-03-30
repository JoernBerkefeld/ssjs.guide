---
layout: function
title: Substring
parent: Platform Functions
parent_url: /platform-functions/
description: Extracts part of a string starting at a given position. Uses 1-based indexing (not 0-based like JavaScript's built-in substr/substring).
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Substring(value, start [, length])"
return_type: string
min_args: 2
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | Source string |
| `start` | number | Yes | Starting position (**1-based**, not 0-based!) |
| `length` | number | No | Number of characters to extract (if omitted, extracts to end of string) |

> **Important:** `Substring` uses **1-based indexing** — position `1` is the first character. This differs from JavaScript's native `str.substring(0)`.

## Examples

```javascript
var str = "Hello, World!";

// Extract from position 8, length 5
var sub1 = Platform.Function.Substring(str, 8, 5);
Write(sub1); // "World"

// Extract from position 1, length 5
var sub2 = Platform.Function.Substring(str, 1, 5);
Write(sub2); // "Hello"

// Extract from position 8 to end
var sub3 = Platform.Function.Substring(str, 8);
Write(sub3); // "World!"

// Get domain from email
var email = "jane@example.com";
var atPos = Platform.Function.IndexOf(email, "@");
var domain = Platform.Function.Substring(email, atPos + 2);
Write(domain); // "example.com"
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/indexof/">IndexOf</a></li>
  <li><a href="/platform-functions/length/">Length</a></li>
</ul>
</div>
