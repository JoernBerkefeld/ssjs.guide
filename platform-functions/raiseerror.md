---
layout: function
title: RaiseError
parent: Platform Functions
parent_url: /platform-functions/
description: Raises a user-defined error that halts script execution. Unlike throw, RaiseError can optionally skip the failed email send rather than bouncing.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.RaiseError(errorMessage [, skipOnError [, sourceType, sourceID]])"
return_type: void
min_args: 1
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `errorMessage` | string | Yes | Message describing the error |
| `skipOnError` | boolean | No | When `true`, skips the send record rather than causing a hard bounce (email send context). Default: `false` |
| `sourceType` | string | No | Source type identifier for logging |
| `sourceID` | string | No | Source ID for logging |

## Examples

```javascript
// Halt with an error
var email = Platform.Function.Lookup("Contacts", "email", "id", contactId);
if (Platform.Function.Empty(email)) {
    Platform.Function.RaiseError("No email found for contact: " + contactId);
}

// In email send: skip rather than bounce
var pref = Platform.Function.Lookup("Preferences", "optIn", "id", subscriberId);
if (pref !== "yes") {
    Platform.Function.RaiseError("Subscriber opted out.", true);
}
```

## Notes

In email sends:
- `RaiseError(msg, false)` — causes a hard bounce for this subscriber
- `RaiseError(msg, true)` — skips this subscriber silently without bouncing

For CloudPage error handling in a `try`/`catch`, use `throw` instead so execution can be caught and recovered. `RaiseError` always terminates execution.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/language/error-handling/">Error Handling</a></li>
</ul>
</div>
