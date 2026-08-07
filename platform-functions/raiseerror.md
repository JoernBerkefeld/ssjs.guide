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
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | string | Yes | Message describing the error |
| `currentRecipientOnly` | boolean | No | When `true`, the error applies only to the current recipient. When `false`, the entire send job stops. |
| `errorCode` | string \| number | No | Short user-defined code identifying the error type |
| `errorNumber` | string \| number | No | User-defined numeric error code for reference |

{% include differs-from-docs.html note="The official docs mark <code>currentRecipientOnly</code>, <code>errorCode</code>, and <code>errorNumber</code> as required, but the runtime raises correctly when called with just <code>message</code>, so they are optional." %}

{% include test-script.html bundle="platform-functions--raiseerror" chapter="optional-args" label="Show test script — only message is required" %}

{% include differs-from-docs.html note="When caught in a CloudPage <code>try</code>/<code>catch</code>, the raised exception exposes only <code>message</code> and <code>description</code> (an <code>AMPScriptRaiseErrorException</code>); the <code>errorCode</code> and <code>errorNumber</code> arguments are not surfaced on the error object." %}

{% include test-script.html bundle="platform-functions--raiseerror" chapter="caught-exception-shape" label="Show test script — shape of the caught exception" %}

{% include test-script.html bundle="platform-functions--raiseerror" chapter="parameters" %}

## Examples

```javascript
// Halt with an error
var email = String(Platform.Function.Lookup("Contacts", "email", "id", contactId));
if (email === "" || email === "null") {
    Platform.Function.RaiseError("No email found for contact: " + contactId);
}

// In email send: skip rather than bounce
var pref = Platform.Function.Lookup("Preferences", "optIn", "id", subscriberId);
if (pref !== "yes") {
    Platform.Function.RaiseError("Subscriber opted out.", true);
}
```

{% include test-script.html bundle="platform-functions--raiseerror" chapter="examples" %}

## Notes

In email sends:
- `RaiseError(msg, false)` — causes a hard bounce for this subscriber
- `RaiseError(msg, true)` — skips this subscriber silently without bouncing

On a CloudPage, an **uncaught** `RaiseError` terminates the request: the page returns HTTP 422 with an empty body, and any output written before the call is discarded.

It *can* however be caught. A `try`/`catch` around `RaiseError` resumes normally, and a `finally` block still runs — but the caught value is an `AMPScriptRaiseErrorException`, not a JavaScript `Error`: `instanceof Error` is `false` and `name` reports the misleading `"TypeError"`. For ordinary catch-and-recover control flow on a CloudPage, prefer `throw` with a plain string.

{% include test-script.html bundle="platform-functions--raiseerror" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/language/error-handling/">Error Handling</a></li>
</ul>
</div>
