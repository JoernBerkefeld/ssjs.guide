---
layout: function
title: IsPhoneNumber
parent: Core Library
parent_url: /core-library/
permalink: /core-library/isphonenumber/
description: Bare-name Core form of Platform.Function.IsPhoneNumber — checks whether a string is a valid North American Numbering Plan (NANP) phone number. Requires Platform.Load.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: true
test_scripts: complete
syntax: "IsPhoneNumber(value)"
return_type: boolean
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string \| number | Yes | Value to evaluate as a phone number. |

{% include test-script.html bundle="core-library--isphonenumber" chapter="parameters" %}

## Description

`IsPhoneNumber()` is the bare-name Core-library form of [`Platform.Function.IsPhoneNumber()`](/platform-functions/isphonenumber/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

For the documented one-argument form it returns the same boolean as `Platform.Function.IsPhoneNumber()`. Calling with no arguments returns `false` (does not throw); surplus arguments are silently ignored. The qualified form throws on those arities. Prefer [`Platform.Function.IsPhoneNumber()`](/platform-functions/isphonenumber/) when you do not already have a `Platform.Load` call in scope.

{% include test-script.html bundle="core-library--isphonenumber" chapter="description" %}

## Return value

Returns a `boolean`. The check is **North American Numbering Plan (NANP) only**: a value passes when its digits form **10 digits**, optionally preceded by the country code `1`, with the **area code** and the **exchange code** each starting `2`–`9`. Spaces, dots, hyphens and parentheses are ignored, so `"(829) 555-0142"` and `"1-212-555-1234"` return `true`. Any other character — a `+` prefix, a `/` or `_` separator, letters, a trailing extension — returns `false`, as do non-NANP international numbers, empty strings, `null` and `undefined`. See the qualified [`Platform.Function.IsPhoneNumber`](/platform-functions/isphonenumber/) page for the full runtime format details.

{% include differs-from-docs.html note="The SSJS reference page describes generic \"valid phone number\" validation and never mentions the North American Numbering Plan. The runtime validates NANP numbers only — 10 digits with an optional leading 1, area and exchange codes starting 2-9 — and rejects every non-NANP international number. Punctuation (spaces, dots, hyphens, parentheses) is ignored rather than rejected. The AMPscript reference for the same function documents the NANP behaviour correctly." %}

{% include test-script.html bundle="core-library--isphonenumber" chapter="return-value" label="Show test script — NANP format and punctuation handling" %}

## Example

```javascript
Platform.Load("core", "1.1.5");
if (IsPhoneNumber(phoneInput)) {
    Write("Valid phone");
}
```

{% include test-script.html bundle="core-library--isphonenumber" chapter="example" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/isphonenumber/">Platform.Function.IsPhoneNumber — qualified form (no Platform.Load required)</a></li>
  <li><a href="/core-library/isemailaddress/">IsEmailAddress</a></li>
</ul>
</div>
