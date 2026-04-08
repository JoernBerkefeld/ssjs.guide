---
layout: function
title: IsPhoneNumber
parent: Platform Functions
parent_url: /platform-functions/
description: Evaluates whether a string contains a valid phone number. Returns a boolean.
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
var phone = Platform.Request.GetFormField("phoneNumber");

if (!Platform.Function.IsPhoneNumber(phone)) {
    Write('<p class="error">Please enter a valid phone number.</p>');
} else {
    Platform.Function.UpsertData("Contacts", ["Phone"], [phone], ["Status"], ["pending"]);
    Platform.Response.Redirect("/thank-you");
}
```

```javascript
// In a validation helper
function validateContact(input) {
    if (!input.phone) { return "Phone is required"; }
    if (!Platform.Function.IsPhoneNumber(input.phone)) { return "Invalid phone number"; }
    return null;
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/isemailaddress/">IsEmailAddress</a></li>
  <li><a href="/platform-functions/isnull/">IsNull</a></li>
  <li><a href="/platform-functions/empty/">Empty</a></li>
</ul>
</div>
