---
layout: function
title: IsEmailAddress
parent: Core Library
parent_url: /core-library/
permalink: /core-library/isemailaddress/
description: Bare-name Core form of Platform.Function.IsEmailAddress — checks whether a string is a valid email address format. Requires Platform.Load.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: false
syntax: "IsEmailAddress(value)"
return_type: boolean
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | The string to validate as an email address. |

## Description

`IsEmailAddress()` is the bare-name Core-library form of [`Platform.Function.IsEmailAddress()`](/platform-functions/isemailaddress/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

It behaves **identically** to `Platform.Function.IsEmailAddress()`: same argument, same boolean return. Use the qualified [`Platform.Function.IsEmailAddress()`](/platform-functions/isemailaddress/) form when you do not already have a `Platform.Load` call in scope.

## Return value

Returns a `boolean` — `true` for a valid email address format, `false` otherwise.

## Example

```javascript
Platform.Load("core", "1.1.5");
if (IsEmailAddress(emailInput)) {
    Write("Valid email");
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/isemailaddress/">Platform.Function.IsEmailAddress — qualified form (no Platform.Load required)</a></li>
  <li><a href="/core-library/isphonenumber/">IsPhoneNumber</a></li>
</ul>
</div>
