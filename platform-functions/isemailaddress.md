---
layout: function
title: IsEmailAddress
parent: Platform Functions
parent_url: /platform-functions/
description: Checks whether a string is a valid email address format. More reliable than a custom regex for SFMC email validation.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.IsEmailAddress(value)"
return_type: boolean
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to validate as an email address |

## Examples

```javascript
var email = Platform.Request.GetFormData("email");

if (!Platform.Function.IsEmailAddress(email)) {
    Write('<p class="error">Please enter a valid email address.</p>');
} else {
    // Process valid email
    Platform.Function.UpsertData("Signups", ["Email"], [email], ["Status"], ["pending"]);
    Platform.Response.Redirect("/thank-you");
}
```

```javascript
// In a validation function
function validateInput(input) {
    if (!input.email) { return "Email is required"; }
    if (!Platform.Function.IsEmailAddress(input.email)) { return "Invalid email format"; }
    return null;
}
```
