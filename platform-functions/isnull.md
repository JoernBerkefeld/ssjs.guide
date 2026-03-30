---
layout: function
title: IsNull
parent: Platform Functions
parent_url: /platform-functions/
description: Checks whether a value is null. Returns true for null, false for any other value including empty string.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.IsNull(value)"
return_type: boolean
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | any | Yes | Value to check |

## Examples

```javascript
Platform.Function.IsNull(null);      // true
Platform.Function.IsNull("");        // false
Platform.Function.IsNull(undefined); // true
Platform.Function.IsNull(0);         // false
Platform.Function.IsNull("hello");   // false
```

## Notes

For most SSJS use cases, a simple `!value` or `value === null` check is more idiomatic. `Platform.Function.IsNull` is an AMPscript-compatibility function.

Use `Platform.Function.Empty()` to also check for empty strings and whitespace.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/empty/">Empty</a></li>
</ul>
</div>
