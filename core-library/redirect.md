---
layout: function
title: Redirect
parent: Global Functions
parent_url: /global-functions/
description: Officially documented bare-name redirect helper that does NOT exist at runtime — use Platform.Response.Redirect instead.
availability:
  email: false
  cloudpage: true
  automation: false
  triggered_send: false
requires_core_load: true
verification: verified
differs_from_docs: "Runtime-verified: the bare-name Redirect global is undefined under every Core version tested (1, 1.1.1, 1.1.5) — Platform.Load does not inject it, contrary to the official example. Use Platform.Response.Redirect(url, movedPermanently) instead, which is always available."
syntax: "Redirect(url, movedPermanently)"
return_type: void
min_args: 2
max_args: 2
---

{% include callout.html type="bug" content="<strong>Does not exist at runtime.</strong> Despite appearing in the official documentation, the bare-name <code>Redirect</code> global is <code>undefined</code> in CloudPages under every Core version tested (<code>1</code>, <code>1.1.1</code>, <code>1.1.5</code>). Calling it throws a <code>ReferenceError</code>. Use <a href=\"/platform-objects/platform-response/#redirect\"><code>Platform.Response.Redirect(url, movedPermanently)</code></a> instead — it is always available." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | The address to send the browser to. |
| `movedPermanently` | boolean | Yes | `true` issues an HTTP `301 Moved Permanently` redirect; `false` issues an HTTP `302 Found` ("Moved Temporarily") redirect. Use `false` unless you are certain the move is permanent — browsers cache `301` responses aggressively and may skip re-checking the original URL. |

## Description

The official docs describe `Redirect(url, movedPermanently)` as a bare-name helper that sends the visitor's browser to another URL. **Runtime testing proves this global is not defined** in CloudPages regardless of the Core library version loaded, so it cannot be used. Its documented sibling [`Platform.Response.Redirect()`](/platform-objects/platform-response/#redirect) is the working equivalent and requires no `Platform.Load`.

## Working example — use Platform.Response.Redirect

```javascript
Platform.Response.Redirect("https://www.example.com", false);
```

### Known bug — redirect inside try/catch

This caveat applies to `Platform.Response.Redirect()` as well: if a `try` block contains a redirect, the redirect triggers the `catch` block. In the example below the intended redirect to `salesforce.com` is overridden by the `catch` redirect to `example.com`:

```javascript
try {
    Platform.Response.Redirect("https://salesforce.com", false);
} catch (ex) {
    Platform.Response.Redirect("https://example.com", false);
}
```

Keep redirects out of `try` blocks, or guard the `catch` so it does not perform its own redirect.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-response/#redirect">Platform.Response.Redirect</a></li>
  <li><a href="/platform-functions/redirectto/">Platform.Function.RedirectTo</a></li>
</ul>
</div>
