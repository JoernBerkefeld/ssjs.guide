---
layout: function
title: Platform.Function.ContentArea
parent: Platform Functions
parent_url: /platform-functions/
description: "Retrieves rendered content from a classic Content Area by ID. Salesforce documents Content Areas as deprecated in favour of Content Builder blocks."
deprecated: true
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentArea(id[, regionName, stopOnError, fallbackContent])"
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
| `id` | string \| number | Yes | ID of the Content Area. A numeric string for the same id works too. |
| `regionName` | string | No | Impression region for content tracking. ⚠️ Supplying it makes the call throw a resolved-value error — see below. |
| `stopOnError` | boolean | No | When `true`, throws on retrieval failure; when `false`, the call continues. ⚠️ Unreachable — the call already throws on `regionName`. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. ⚠️ Unreachable — never emitted at runtime. |

{% include test-script.html bundle="platform-functions--contentarea" chapter="parameters" %}

## Description

`Platform.Function.ContentArea()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its ID.

Salesforce's documentation marks Content Areas as deprecated in favour of Content Builder. For new work, migrate content to Content Builder blocks and use [`Platform.Function.ContentBlockByID()`](/platform-functions/contentblockbyid/).

**Runtime note:** only the single-argument form works. Given the id of a Content Area that actually exists, the 1-argument call returns that area's content, and the same id passed as a numeric string works as well. An id that does not resolve throws an evaluation error — that throw says the id did not resolve, nothing more. Adding the documented `regionName` throws a *different*, resolved-value error, which makes `stopOnError` and `fallbackContent` unreachable. The bare-name [`ContentArea()`](/core-library/contentarea/) Core form behaves the same.

{% include differs-from-docs.html note="The official docs present all four parameters as usable. At runtime only the first one is: supplying `regionName` fails with a resolved-value error before `stopOnError` or `fallbackContent` can take effect, so the documented 4-argument form never works." %}

{% include test-script.html bundle="platform-functions--contentarea" chapter="unreachable-parameters" label="Show test script — only the 1-argument form works" %}

### Difference from the global `ContentArea()` form

The bare-name global `ContentArea()` function accepts the same first two parameters but differs in the 3rd and 4th:

| | `Platform.Function.ContentArea()` | `ContentArea()` (global) |
|---|---|---|
| 3rd parameter | `stopOnError: boolean` | `errorMsg: string` |
| Requires `Platform.Load` | No | Yes — `Platform.Load("core", "1.1.5")` |

See [ContentArea](/core-library/contentarea/) for the bare-name Core variant.

{% include test-script.html bundle="platform-functions--contentarea" chapter="description" %}

## Examples

The single-argument form works when the id resolves to an existing Content Area:

```javascript
// returns the content area's rendered markup
var content = Platform.Function.ContentArea(935116);
Platform.Response.Write(content);
```

The documented 4-argument form does not — it is shown as the *documented* shape, not as working code:

```javascript
// throws: A ContentArea function call includes an invalid parameter value.
//         … Parameter Name: ImpressionRegionName
var content = Platform.Function.ContentArea(935116, "impressionRegion", false, "Fallback text here");
Platform.Response.Write(content);
```

For new content, use [`Platform.Function.ContentBlockByID()`](/platform-functions/contentblockbyid/) instead.

{% include test-script.html bundle="platform-functions--contentarea" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/contentarea/">ContentArea() — bare-name Core form (requires Platform.Load, different 3rd parameter)</a></li>
  <li><a href="/platform-functions/contentareabyname/">Platform.Function.ContentAreaByName</a></li>
  <li><a href="/platform-functions/contentblockbyid/">Platform.Function.ContentBlockByID — modern replacement</a></li>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey — modern replacement</a></li>
</ul>
</div>
