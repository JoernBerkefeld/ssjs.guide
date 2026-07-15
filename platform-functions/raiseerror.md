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
syntax: "Platform.Function.RaiseError(message[, currentRecipientOnly[, errorCode[, errorNumber]]])"
return_type: void
min_args: 1
max_args: 4
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | string | Yes | Message describing the error |
| `currentRecipientOnly` | boolean | No | When `true`, the error applies only to the current recipient. When `false`, the entire send job stops. |
| `errorCode` | string | No | Short user-defined code identifying the error type |
| `errorNumber` | number | No | User-defined numeric error code for reference |

{% include differs-from-docs.html note="The official docs mark <code>currentRecipientOnly</code>, <code>errorCode</code>, and <code>errorNumber</code> as required, but the runtime raises correctly when called with just <code>message</code>, so they are optional." %}

{% include differs-from-docs.html note="When caught in a CloudPage <code>try</code>/<code>catch</code>, the raised exception exposes only <code>message</code> and <code>description</code> (an <code>AMPScriptRaiseErrorException</code>); the <code>errorCode</code> and <code>errorNumber</code> arguments are not surfaced on the error object." %}

## Examples

```javascript
// Halt with an error
var email = Platform.Function.Lookup("Contacts", "email", "id", contactId);
if (!email) {
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
