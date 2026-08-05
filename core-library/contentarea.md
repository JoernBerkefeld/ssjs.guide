---
layout: function
title: ContentArea
parent: Core Library
parent_url: /core-library/
permalink: /core-library/contentarea/
redirect_from:
  - /global-functions/contentarea/
description: "Retrieves rendered content from a classic Content Area by ID. Salesforce documents Content Areas as deprecated in favour of Content Builder blocks."
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

{% include callout.html type="warning" content="**Deprecated.** Salesforce documents classic Content Areas as superseded by Content Builder. For new content, use [`Platform.Function.ContentBlockByID()`](/platform-functions/contentblockbyid/) instead." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string \| number | Yes | ID of the Content Area. A numeric string for the same id works too. |
| `regionName` | string | No | Impression region for content tracking. ⚠️ Supplying it makes the call throw a resolved-value error — see below. |
| `errorMsg` | string | No | Error message returned as a string on retrieval failure. ⚠️ Unreachable — the call already throws on `regionName`. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. ⚠️ Unreachable — never emitted at runtime. |

{% include test-script.html bundle="core-library--contentarea" chapter="parameters" %}

## Description

`ContentArea()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its ID.

**Requires `Platform.Load`:** This global form requires `Platform.Load("core", "1.1.5")` before use. The qualified [`Platform.Function.ContentArea()`](/platform-functions/contentarea/) form does not.

**Runtime note:** after the load the global is a genuine function (`typeof ContentArea === "function"`) and the single-argument call returns the content of a Content Area that exists — the same id passed as a numeric string works too. An id that does not resolve throws an evaluation error. Every arity above 1 throws, so `regionName`, `errorMsg` and `fallbackContent` are unusable.

{% include differs-from-docs.html note="The official docs present all four parameters as usable. At runtime only the first one is: supplying the impression-region parameter fails with a resolved-value error before `errorMsg` or `fallbackContent` can be used. See Platform.Function.ContentArea for the runnable proof." %}

{% include test-script.html bundle="core-library--contentarea" chapter="unreachable-parameters" label="Show test script — only the 1-argument form works" %}

### Difference from `Platform.Function.ContentArea()`

| | `ContentArea()` (global) | `Platform.Function.ContentArea()` |
|---|---|---|
| 3rd parameter | `errorMsg: string` | `stopOnError: boolean` |
| Requires `Platform.Load` | Yes — `Platform.Load("core", "1.1.5")` | No |

See [Platform.Function.ContentArea](/platform-functions/contentarea/) for the qualified variant.

{% include test-script.html bundle="core-library--contentarea" chapter="description" %}

## Examples

The single-argument form works when the id resolves to an existing Content Area:

```javascript
Platform.Load("core", "1.1.5");
// returns the content area's rendered markup
var content = ContentArea(935116);
Platform.Response.Write(content);
```

The documented 4-argument form does not — it is shown as the *documented* shape, not as working code:

```javascript
Platform.Load("core", "1.1.5");
// throws before the error message or fallback content can be used
var content = ContentArea(935116, "impressionRegion", "Could not load content area", "Fallback text here");
Platform.Response.Write(content);
```

For new content, use [`Platform.Function.ContentBlockByID()`](/platform-functions/contentblockbyid/) instead.

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
