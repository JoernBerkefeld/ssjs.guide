---
layout: function
title: IsPhoneNumber
parent: Platform Functions
parent_url: /platform-functions/
description: Evaluates whether a string is a valid North American Numbering Plan (NANP) phone number. Returns a boolean suitable for form validation on CloudPages.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.IsPhoneNumber(value)"
return_type: boolean
min_args: 1
max_args: 1
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string \| number | Yes | Value to evaluate as a phone number |

{% include test-script.html bundle="platform-functions--isphonenumber" chapter="parameters" %}

## Return value

Returns a `boolean`. The check is **North American Numbering Plan (NANP) only** — it is
**not** a general international phone-number validator. A value passes only when its
digits form a NANP number:

- **10 digits**, optionally preceded by the country code `1` (11 digits in total).
- The **area code** must start with `2`–`9`.
- The **exchange (central-office) code** must start with `2`–`9`.

**Spaces, dots, hyphens and parentheses are ignored**, so `"647 555 0123"`,
`"425.555.0185"`, `"(829) 555-0142"` and `"1-212-555-1234"` all return `true`. Leading
and trailing whitespace is tolerated as well.

Any other character makes the value `false` — including a `+` prefix, a `/` or `_`
separator, letters, and a trailing extension such as `"2125551234x99"`. Numbers outside
the NANP (`"0161 496 0009"`, `"82 517 460 123"`, `"4917612345678"`) return `false`
because their digits do not fit the NANP shape, as do empty strings, `null` and
`undefined`.

{% include differs-from-docs.html note="The SSJS reference page describes generic \"valid phone number\" validation and never mentions the North American Numbering Plan. The runtime validates NANP numbers only — 10 digits with an optional leading 1, area and exchange codes starting 2-9 — and rejects every non-NANP international number. Punctuation (spaces, dots, hyphens, parentheses) is ignored rather than rejected. The AMPscript reference for the same function documents the NANP behaviour correctly." %}

{% include test-script.html bundle="platform-functions--isphonenumber" chapter="return-value" label="Show test script — NANP format and punctuation handling" %}

## Examples

```javascript
var phone = Platform.Request.GetFormField("phone");

if (!Platform.Function.IsPhoneNumber(phone)) {
    Write('<p class="error">Please enter a valid phone number.</p>');
} else {
    Platform.Function.UpsertData("Leads", ["Phone"], [phone], ["Source"], ["web"]);
}
```

```javascript
function normalizeContact(raw) {
    if (!Platform.Function.IsPhoneNumber(raw.mobile)) {
        return { ok: false, msg: "Invalid mobile number" };
    }
    return { ok: true };
}
```

{% include test-script.html bundle="platform-functions--isphonenumber" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/isphonenumber/">IsPhoneNumber — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/platform-functions/isemailaddress/">IsEmailAddress</a></li>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
</ul>
</div>
