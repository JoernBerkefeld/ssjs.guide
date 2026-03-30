---
layout: function
title: Replace
parent: Platform Functions
parent_url: /platform-functions/
description: Substitutes all occurrences of a search substring within a source string. Case-sensitive.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Replace(value, search, replacement)"
return_type: string
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | Source string |
| `search` | string | Yes | Substring to find and replace |
| `replacement` | string | Yes | String to substitute in |

## Description

`Replace` replaces **all** occurrences of `search` in `value` with `replacement`. Unlike JavaScript's native `str.replace()` (which only replaces the first match without the `g` flag), `Replace` replaces all matches.

Case-sensitive.

## Examples

```javascript
// Replace all spaces
var clean = Platform.Function.Replace("Hello World", " ", "-");
Write(clean); // "Hello-World"

// Remove a character
var noCommas = Platform.Function.Replace("1,234,567", ",", "");
Write(noCommas); // "1234567"

// Template variable replacement
var template = "Dear {FirstName}, your order {OrderID} is ready.";
var filled = Platform.Function.Replace(template, "{FirstName}", firstName);
filled = Platform.Function.Replace(filled, "{OrderID}", orderId);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/indexof/">IndexOf</a></li>
  <li><a href="/platform-functions/substring/">Substring</a></li>
</ul>
</div>
