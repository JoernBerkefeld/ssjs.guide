---
layout: function
title: IsPhoneNumber
parent: Platform Functions
parent_url: /platform-functions/
description: Evaluates whether a string contains a valid phone number. Returns a boolean suitable for form validation on CloudPages.
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
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to evaluate as a phone number |

## Return value

Returns a `boolean`. The accepted format is **digits `0`–`9` only, no spaces, and no
leading `0`**. To present any country's country code (including the US), **omit** the
leading `00`/`+` — the country code is written as its bare digits with no leading zero.
This is the **same** digits-only, no-leading-zero format that SFMC phone-number fields
and the SMS (MobileConnect) service expect, so a value that passes `IsPhoneNumber` is
already in the shape those services accept.

Strings containing spaces, a leading `0`, a `+`/`00` international prefix, letters, mixed
text, or that are empty all return `false`.

{% include differs-from-docs.html note="The official docs describe generic \"valid phone number\" validation, but the runtime enforces a stricter format: digits 0-9 only, no spaces, and no leading 0 — country codes must be written without the leading 00/+ (this is the same format SFMC phone fields and the SMS service expect)." %}

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

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/isphonenumber/">IsPhoneNumber — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/platform-functions/isemailaddress/">IsEmailAddress</a></li>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
</ul>
</div>
