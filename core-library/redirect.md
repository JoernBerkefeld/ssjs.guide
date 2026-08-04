---
layout: function
title: Redirect
parent: Core Library
parent_url: /core-library/
permalink: /core-library/redirect/
redirect_from:
  - /global-functions/redirect/
description: Bare-name redirect helper injected by Platform.Load("core") — call Platform.Load first, or use Platform.Response.Redirect which needs no Platform.Load.
availability:
  email: false
  cloudpage: true
  automation: false
  triggered_send: false
requires_core_load: true
verification: verified
differs_from_docs: false
test_scripts: complete
syntax: "Redirect(url, movedPermanently)"
return_type: void
min_args: 2
max_args: 2
---

{% include callout.html type="note" content="The bare-name <code>Redirect</code> global exists only <em>after</em> <code>Platform.Load(\"core\", ...)</code> has run, so call the load first. Once loaded it is usable in that scope and inside nested helper-function bodies that close over it. If you have no <code>Platform.Load</code> in scope, use <a href=\"/platform-objects/platform-response/#redirect\"><code>Platform.Response.Redirect(url, movedPermanently)</code></a>, which needs no <code>Platform.Load</code>." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | The address to send the browser to. |
| `movedPermanently` | string \| boolean \| number | Yes | `true` / `1` / `"true"` issue an HTTP `301 Moved Permanently` redirect; `false` / `0` / `"false"` issue an HTTP `302 Found` ("Moved Temporarily") redirect. Use a temporary redirect unless you are certain the move is permanent — browsers cache `301` responses aggressively and may skip re-checking the original URL. |

{% include test-script.html bundle="core-library--redirect" chapter="parameters" %}

## Description

`Redirect(url, movedPermanently)` sends the visitor's browser to another URL. Runtime testing proves the bare name **is** injected by `Platform.Load("core", ...)` and performs the redirect. It exists only **after** the load has run, so call `Platform.Load` first; once loaded it works in that scope and inside nested helper-function bodies that close over it. Its sibling [`Platform.Response.Redirect()`](/platform-objects/platform-response/#redirect) works in any scope and requires no `Platform.Load`.

{% include test-script.html bundle="core-library--redirect" chapter="description" %}

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

{% include test-script.html bundle="core-library--redirect" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-response/#redirect">Platform.Response.Redirect</a></li>
  <li><a href="/platform-functions/redirectto/">Platform.Function.RedirectTo</a></li>
</ul>
</div>
