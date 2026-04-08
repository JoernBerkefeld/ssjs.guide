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
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to evaluate as a phone number |

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
  <li><a href="/platform-functions/isemailaddress/">IsEmailAddress</a></li>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
</ul>
</div>
