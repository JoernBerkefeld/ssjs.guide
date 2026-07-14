---
layout: function
title: Redirect
parent: Global Functions
parent_url: /global-functions/
description: Redirect the browser to another address with a temporary (302) or permanent (301) HTTP redirect. Behaves like Platform.Response.Redirect.
availability:
  email: false
  cloudpage: true
  automation: false
  triggered_send: false
requires_core_load: true
syntax: "Redirect(url, movedPermanently)"
return_type: void
min_args: 2
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | The address to send the browser to. |
| `movedPermanently` | boolean | Yes | `true` issues an HTTP `301 Moved Permanently` redirect; `false` issues an HTTP `302 Found` ("Moved Temporarily") redirect. Use `false` unless you are certain the move is permanent — browsers cache `301` responses aggressively and may skip re-checking the original URL. |

## Description

`Redirect(url, movedPermanently)` sends the visitor's browser to another URL. It behaves like its sibling [`Platform.Response.Redirect()`](/platform-objects/platform-response/#redirect) and requires `Platform.Load("Core", ...)` before use. Because it drives the HTTP response, it is meaningful only in CloudPage (browser) contexts.

## Example

```javascript
Platform.Load("Core", "1.1.5");
Redirect("https://www.example.com", false);
```

### Known bug — redirect inside try/catch

If a `try` block contains a redirect, the redirect triggers the `catch` block. In the example below the intended redirect to `salesforce.com` is overridden by the `catch` redirect to `example.com`:

```javascript
Platform.Load("Core", "1.1.5");
try {
    Redirect("https://salesforce.com", false);
} catch (ex) {
    Redirect("https://example.com", false);
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
