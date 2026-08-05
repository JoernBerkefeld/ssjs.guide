---
layout: function
title: Platform.Function.ContentAreaByName
parent: Platform Functions
parent_url: /platform-functions/
description: "Retrieves rendered content from a classic Content Area by name. Salesforce documents Content Areas as deprecated in favour of Content Builder blocks."
deprecated: true
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentAreaByName(name[, regionName, stopOnError, fallbackContent])"
return_type: string
min_args: 1
max_args: 4
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name of the Content Area. The bare name works; the `"folder\myArea"` form works too. Matching is case-insensitive. |
| `regionName` | string | No | Impression region for content tracking. ⚠️ Supplying it makes the call throw a resolved-value error — see below. |
| `stopOnError` | boolean | No | When `true`, throws on retrieval failure; when `false`, the call continues. ⚠️ Unreachable — the call already throws on `regionName`. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. ⚠️ Unreachable — never emitted at runtime. |

{% include test-script.html bundle="platform-functions--contentareabyname" chapter="parameters" %}

## Description

`Platform.Function.ContentAreaByName()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its name.

Salesforce's documentation marks Content Areas as deprecated in favour of Content Builder. For new work, migrate content to Content Builder blocks and use [`Platform.Function.ContentBlockByName()`](/platform-functions/contentblockbyname/).

**Runtime note:** only the single-argument form works. Given the name of a Content Area that actually exists, the 1-argument call returns that area's content. Matching is case-insensitive and the `"folder\myArea"` form resolves as well, while the area's CustomerKey, a name padded with spaces and an unknown name are all rejected with an evaluation error — a throw at arity 1 means the name did not resolve. Adding the documented `regionName` throws a *different*, resolved-value error, which makes `stopOnError` and `fallbackContent` unreachable. The bare-name [`ContentAreaByName()`](/core-library/contentareabyname/) Core form behaves the same.

{% include differs-from-docs.html note="The official docs present all four parameters as usable. At runtime only the first one is: supplying `regionName` fails with a resolved-value error before `stopOnError` or `fallbackContent` can take effect, so the documented 4-argument form never works." %}

{% include test-script.html bundle="platform-functions--contentareabyname" chapter="unreachable-parameters" label="Show test script — only the 1-argument form works" %}

### Difference from the global `ContentAreaByName()` form

The bare-name global `ContentAreaByName()` function accepts the same first two parameters but differs in the 3rd and 4th:

| | `Platform.Function.ContentAreaByName()` | `ContentAreaByName()` (global) |
|---|---|---|
| 3rd parameter | `stopOnError: boolean` | `errorMsg: string` |
| Requires `Platform.Load` | No | Yes — `Platform.Load("core", "1.1.5")` |

See [ContentAreaByName](/core-library/contentareabyname/) for the bare-name Core variant.

{% include test-script.html bundle="platform-functions--contentareabyname" chapter="description" %}

## Examples

The single-argument form works when the name resolves to an existing Content Area:

```javascript
// returns the content area's rendered markup
var content = Platform.Function.ContentAreaByName("myContentArea");
Platform.Response.Write(content);
```

The documented 4-argument form does not — it is shown as the *documented* shape, not as working code:

```javascript
// throws: A ContentAreaByName function call includes an invalid parameter value.
//         … Parameter Name: ImpressionRegionName
var content = Platform.Function.ContentAreaByName("myContentArea", "impressionRegion", false, "Fallback text here");
Platform.Response.Write(content);
```

For new content, use [`Platform.Function.ContentBlockByName()`](/platform-functions/contentblockbyname/) instead.

{% include test-script.html bundle="platform-functions--contentareabyname" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/contentareabyname/">ContentAreaByName() — bare-name Core form (requires Platform.Load, different 3rd parameter)</a></li>
  <li><a href="/platform-functions/contentarea/">Platform.Function.ContentArea</a></li>
  <li><a href="/platform-functions/contentblockbyname/">Platform.Function.ContentBlockByName — modern replacement</a></li>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey — modern replacement</a></li>
</ul>
</div>
