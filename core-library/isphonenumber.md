---
layout: function
title: IsPhoneNumber
parent: Core Library
parent_url: /core-library/
permalink: /core-library/isphonenumber/
description: Bare-name Core form of Platform.Function.IsPhoneNumber — checks whether a string is a valid phone number. Requires Platform.Load.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: true
syntax: "IsPhoneNumber(value)"
return_type: boolean
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | The string to evaluate as a phone number. |

## Description

`IsPhoneNumber()` is the bare-name Core-library form of [`Platform.Function.IsPhoneNumber()`](/platform-functions/isphonenumber/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

It behaves **identically** to `Platform.Function.IsPhoneNumber()`: same argument, same boolean return. Use the qualified [`Platform.Function.IsPhoneNumber()`](/platform-functions/isphonenumber/) form when you do not already have a `Platform.Load` call in scope.

## Return value

Returns a `boolean`. The accepted format is **digits `0`–`9` only, no spaces, and no leading `0`**. Country codes must be written without the leading `00`/`+`. This is the same digits-only, no-leading-zero format that SFMC phone-number fields and the SMS (MobileConnect) service expect. Strings containing spaces, a leading `0`, a `+`/`00` prefix, letters, mixed text, or that are empty all return `false`. See the qualified [`Platform.Function.IsPhoneNumber`](/platform-functions/isphonenumber/) page for the full runtime format details.

{% include differs-from-docs.html note="The official docs describe generic \"valid phone number\" validation, but the runtime enforces a stricter format: digits 0-9 only, no spaces, and no leading 0 — country codes must be written without the leading 00/+ (this is the same format SFMC phone fields and the SMS service expect)." %}

## Example

```javascript
Platform.Load("core", "1.1.5");
if (IsPhoneNumber(phoneInput)) {
    Write("Valid phone");
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/isphonenumber/">Platform.Function.IsPhoneNumber — qualified form (no Platform.Load required)</a></li>
  <li><a href="/core-library/isemailaddress/">IsEmailAddress</a></li>
</ul>
</div>
