---
layout: function
title: Platform.Function.ContentAreaByName
parent: Platform Functions
parent_url: /platform-functions/
description: "Retrieves rendered content from a classic Content Area by name. Deprecated — Content Areas are no longer supported on current SFMC infrastructure."
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
| `name` | string | Yes | Name of the Content Area (folder path notation, e.g. `"My Content\myArea"`). |
| `regionName` | string | No | Impression region for content tracking. ⚠️ Supplying it makes the call throw a resolved-value error — see below. |
| `stopOnError` | boolean | No | When `true`, throws on retrieval failure; when `false`, the call continues. ⚠️ Unreachable — the call already throws on `regionName`. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. ⚠️ Unreachable — never emitted at runtime. |

{% include test-script.html bundle="platform-functions--contentareabyname" chapter="parameters" %}

## Description

`Platform.Function.ContentAreaByName()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its name.

**This function is deprecated.** Classic Content Areas are no longer supported on modern SFMC infrastructure. Migrate content to Content Builder blocks and use [`Platform.Function.ContentBlockByName()`](/platform-functions/contentblockbyname/) instead.

**Runtime note:** no SSJS call shape works. The 1-argument form throws for every name — folder-path notation, a bare name and the empty string alike — even though a WSProxy retrieve confirms a Content Area exists in the same business unit. Adding the documented `regionName` throws a *different*, resolved-value error, which makes `stopOnError` and `fallbackContent` unreachable. The bare-name [`ContentAreaByName()`](/core-library/contentareabyname/) Core form behaves the same.

{% include differs-from-docs.html note="The official docs present the function as working, including its optional impression-region and fallback parameters. At runtime no SSJS call returns a value: the basic call fails even for an existing Content Area, and supplying `regionName` fails before `stopOnError` or `fallbackContent` can be used." %}

{% include test-script.html bundle="platform-functions--contentareabyname" chapter="no-working-call-shape" label="Show test script — no SSJS call shape works" %}

### Difference from the global `ContentAreaByName()` form

The bare-name global `ContentAreaByName()` function accepts the same first two parameters but differs in the 3rd and 4th:

| | `Platform.Function.ContentAreaByName()` | `ContentAreaByName()` (global) |
|---|---|---|
| 3rd parameter | `stopOnError: boolean` | `errorMsg: string` |
| Requires `Platform.Load` | No | Yes — `Platform.Load("core", "1.1.5")` |

See [ContentAreaByName](/core-library/contentareabyname/) for the bare-name Core variant.

{% include test-script.html bundle="platform-functions--contentareabyname" chapter="description" %}

## Examples

Both documented forms throw at runtime — they are shown as the *documented* shapes, not as working code:

```javascript
// throws: An error occurred when attempting to evaluate a ContentAreaByName function call.
var content = Platform.Function.ContentAreaByName("My Content\\myContentArea");
Platform.Response.Write(content);
```

```javascript
// throws: A ContentAreaByName function call includes an invalid parameter value.
//         … Parameter Name: ImpressionRegionName
var content = Platform.Function.ContentAreaByName("My Content\\myContentArea", "impressionRegion", false, "Fallback text here");
Platform.Response.Write(content);
```

Use [`Platform.Function.ContentBlockByName()`](/platform-functions/contentblockbyname/) instead.

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
