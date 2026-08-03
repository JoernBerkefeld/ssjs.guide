---
layout: function
title: ContentArea
parent: Core Library
parent_url: /core-library/
permalink: /core-library/contentarea/
redirect_from:
  - /global-functions/contentarea/
description: "Retrieves rendered content from a classic Content Area by numeric ID. Deprecated — Content Areas are no longer supported on current SFMC infrastructure."
deprecated: true
requires_core_load: true
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
verification: verified
test_scripts: complete
syntax: "ContentArea(id[, regionName, errorMsg, fallbackContent])"
return_type: string
min_args: 1
max_args: 4
differs_from_docs: true
---

{% include callout.html type="warning" content="**Deprecated.** Classic Content Areas are no longer supported on modern SFMC infrastructure. Migrate content to Content Builder and use [`Platform.Function.ContentBlockByID()`](/platform-functions/contentblockbyid/) instead." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Numeric ID of the Content Area. |
| `regionName` | string | No | Impression region for content tracking. |
| `errorMsg` | string | No | Error message returned as a string on retrieval failure. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. |

{% include test-script.html bundle="core-library--contentarea" chapter="parameters" %}

## Description

`ContentArea()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its numeric ID.

**Requires `Platform.Load`:** This global form requires `Platform.Load("core", "1.1.5")` before use. The qualified [`Platform.Function.ContentArea()`](/platform-functions/contentarea/) form does not.

**Runtime note:** after the load the global is a genuine function (`typeof ContentArea === "function"`), but no call shape returns a value — it is no escape hatch for the deprecated qualified form.

{% include differs-from-docs.html note="The official docs present the function as working, but no SSJS call returns a value: the basic call fails even for an existing Content Area, and supplying the impression-region parameter fails before `errorMsg` or `fallbackContent` can be used. See Platform.Function.ContentArea for the runnable proof." %}

{% include test-script.html bundle="core-library--contentarea" chapter="no-working-call-shape" label="Show test script — no SSJS call shape works" %}

### Difference from `Platform.Function.ContentArea()`

| | `ContentArea()` (global) | `Platform.Function.ContentArea()` |
|---|---|---|
| 3rd parameter | `errorMsg: string` | `stopOnError: boolean` |
| Requires `Platform.Load` | Yes — `Platform.Load("core", "1.1.5")` | No |

See [Platform.Function.ContentArea](/platform-functions/contentarea/) for the qualified variant.

{% include test-script.html bundle="core-library--contentarea" chapter="description" %}

## Examples

Both documented forms throw at runtime — they are shown as the *documented* shapes, not as working code:

```javascript
Platform.Load("core", "1.1.5");
// throws: An error occurred when attempting to evaluate an ContentArea function call.
var content = ContentArea(123456);
Platform.Response.Write(content);
```

```javascript
Platform.Load("core", "1.1.5");
// throws before the error message or fallback content can be used
var content = ContentArea(123456, "impressionRegion", "Could not load content area", "Fallback text here");
Platform.Response.Write(content);
```

Use [`Platform.Function.ContentBlockByID()`](/platform-functions/contentblockbyid/) instead.

{% include test-script.html bundle="core-library--contentarea" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentarea/">Platform.Function.ContentArea — qualified form (no Platform.Load required, boolean stopOnError)</a></li>
  <li><a href="/core-library/contentareabyname/">ContentAreaByName() — bare-name Core form</a></li>
  <li><a href="/platform-functions/contentblockbyid/">Platform.Function.ContentBlockByID — modern replacement</a></li>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey — modern replacement</a></li>
</ul>
</div>
