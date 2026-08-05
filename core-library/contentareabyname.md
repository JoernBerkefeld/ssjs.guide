---
layout: function
title: ContentAreaByName
parent: Core Library
parent_url: /core-library/
permalink: /core-library/contentareabyname/
redirect_from:
  - /global-functions/contentareabyname/
description: "Retrieves rendered content from a classic Content Area by name. Salesforce documents Content Areas as deprecated in favour of Content Builder blocks."
deprecated: true
requires_core_load: true
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
verification: verified
test_scripts: complete
syntax: "ContentAreaByName(name[, regionName, errorMsg, fallbackContent])"
return_type: string
min_args: 1
max_args: 4
differs_from_docs: true
---

{% include callout.html type="warning" content="**Deprecated.** Salesforce documents classic Content Areas as superseded by Content Builder. For new content, use [`Platform.Function.ContentBlockByName()`](/platform-functions/contentblockbyname/) instead." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name of the Content Area. The bare name works; the `"folder\myArea"` form works too. Matching is case-insensitive. |
| `regionName` | string | No | Impression region for content tracking. ⚠️ Supplying it makes the call throw a resolved-value error — see below. |
| `errorMsg` | string | No | Error message returned as a string on retrieval failure. ⚠️ Unreachable — the call already throws on `regionName`. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. ⚠️ Unreachable — never emitted at runtime. |

{% include test-script.html bundle="core-library--contentareabyname" chapter="parameters" %}

## Description

`ContentAreaByName()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its name.

**Requires `Platform.Load`:** This global form requires `Platform.Load("core", "1.1.5")` before use. The qualified [`Platform.Function.ContentAreaByName()`](/platform-functions/contentareabyname/) form does not.

**Runtime note:** after the load the global is a genuine function (`typeof ContentAreaByName === "function"`) and the single-argument call returns the content of a Content Area that exists. Matching is case-insensitive and the `"folder\myArea"` form resolves; the area's CustomerKey, a space-padded name and an unknown name are rejected — a throw at arity 1 means the name did not resolve. Every arity above 1 throws, so `regionName`, `errorMsg` and `fallbackContent` are unusable.

{% include differs-from-docs.html note="The official docs present all four parameters as usable. At runtime only the first one is: supplying the impression-region parameter fails with a resolved-value error before `errorMsg` or `fallbackContent` can be used. See Platform.Function.ContentAreaByName for the runnable proof." %}

{% include test-script.html bundle="core-library--contentareabyname" chapter="unreachable-parameters" label="Show test script — only the 1-argument form works" %}

### Difference from `Platform.Function.ContentAreaByName()`

| | `ContentAreaByName()` (global) | `Platform.Function.ContentAreaByName()` |
|---|---|---|
| 3rd parameter | `errorMsg: string` | `stopOnError: boolean` |
| Requires `Platform.Load` | Yes — `Platform.Load("core", "1.1.5")` | No |

See [Platform.Function.ContentAreaByName](/platform-functions/contentareabyname/) for the qualified variant.

{% include test-script.html bundle="core-library--contentareabyname" chapter="description" %}

## Examples

The single-argument form works when the name resolves to an existing Content Area:

```javascript
Platform.Load("core", "1.1.5");
// returns the content area's rendered markup
var content = ContentAreaByName("myContentArea");
Platform.Response.Write(content);
```

The documented 4-argument form does not — it is shown as the *documented* shape, not as working code:

```javascript
Platform.Load("core", "1.1.5");
// throws before the error message or fallback content can be used
var content = ContentAreaByName("myContentArea", "impressionRegion", "Could not load content area", "Fallback text here");
Platform.Response.Write(content);
```

For new content, use [`Platform.Function.ContentBlockByName()`](/platform-functions/contentblockbyname/) instead.

{% include test-script.html bundle="core-library--contentareabyname" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentareabyname/">Platform.Function.ContentAreaByName — qualified form (no Platform.Load required, boolean stopOnError)</a></li>
  <li><a href="/core-library/contentarea/">ContentArea() — bare-name Core form</a></li>
  <li><a href="/platform-functions/contentblockbyname/">Platform.Function.ContentBlockByName — modern replacement</a></li>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey — modern replacement</a></li>
</ul>
</div>
