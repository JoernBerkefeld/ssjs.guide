---
layout: function
title: Redirect
parent: Core Library
parent_url: /core-library/
permalink: /core-library/redirect/
redirect_from:
  - /global-functions/redirect/
description: Bare-name redirect helper injected by Platform.Load("core") — scope-sensitive; for scope-independent use call Platform.Response.Redirect instead.
availability:
  email: false
  cloudpage: true
  automation: false
  triggered_send: false
requires_core_load: true
verification: verified
differs_from_docs: "Runtime-verified: the bare-name Redirect global IS defined after Platform.Load(\"core\") but only in the same scope the load ran in — it is not visible inside nested helper-function bodies. The official docs do not mention this scope rule. Platform.Response.Redirect(url, movedPermanently) works in any scope without Platform.Load."
syntax: "Redirect(url, movedPermanently)"
return_type: void
min_args: 2
max_args: 2
---

{% include callout.html type="warning" content="<strong>Scope-sensitive.</strong> The bare-name <code>Redirect</code> global exists only after <code>Platform.Load(\"core\", ...)</code> and only in the <em>same scope</em> the load ran in — inside nested helper-function bodies it is <code>undefined</code>. For scope-independent use, call <a href=\"/platform-objects/platform-response/#redirect\"><code>Platform.Response.Redirect(url, movedPermanently)</code></a>, which needs no <code>Platform.Load</code>." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | The address to send the browser to. |
| `movedPermanently` | boolean | Yes | `true` issues an HTTP `301 Moved Permanently` redirect; `false` issues an HTTP `302 Found` ("Moved Temporarily") redirect. Use `false` unless you are certain the move is permanent — browsers cache `301` responses aggressively and may skip re-checking the original URL. |

## Description

`Redirect(url, movedPermanently)` sends the visitor's browser to another URL. Runtime testing proves the bare name **is** injected by `Platform.Load("core", ...)` and performs the redirect — but **only in the same scope** the load ran in. Inside nested helper-function bodies (or `eval()`), the bare name is `undefined`. Its sibling [`Platform.Response.Redirect()`](/platform-objects/platform-response/#redirect) works in any scope and requires no `Platform.Load`.

## Examples

### Bare-name form (same scope as Platform.Load)

```javascript
Platform.Load("core", "1.1.5");
Redirect("https://www.example.com", false);
```

### Scope-independent form — Platform.Response.Redirect

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
