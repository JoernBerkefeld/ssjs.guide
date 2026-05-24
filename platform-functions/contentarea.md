---
layout: function
title: Platform.Function.ContentArea
parent: Platform Functions
parent_url: /platform-functions/
description: "Retrieves rendered content from a classic Content Area by numeric ID. Deprecated — Content Areas are no longer supported on current SFMC infrastructure."
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
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Numeric ID of the Content Area. |
| `regionName` | string | No | Impression region for content tracking. |
| `stopOnError` | boolean | No | When `true`, throws on retrieval failure; when `false`, the call continues. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. |

## Description

`Platform.Function.ContentArea()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its numeric ID.

**This function is deprecated.** Classic Content Areas are no longer supported on modern SFMC infrastructure. Migrate content to Content Builder blocks and use [`Platform.Function.ContentBlockByID()`](/platform-functions/contentblockbyid/) instead.

### Difference from the global `ContentArea()` form

The bare-name global `ContentArea()` function accepts the same first two parameters but differs in the 3rd and 4th:

| | `Platform.Function.ContentArea()` | `ContentArea()` (global) |
|---|---|---|
| 3rd parameter | `stopOnError: boolean` | `errorMsg: string` |
| Requires `Platform.Load` | No | Yes — `Platform.Load("core", "1.1.5")` |

See [ContentArea (global)](/global-functions/contentarea/) for the global variant.

## Examples

```javascript
var content = Platform.Function.ContentArea(123456);
Platform.Response.Write(content);
```

```javascript
var content = Platform.Function.ContentArea(123456, "impressionRegion", false, "Fallback text here");
Platform.Response.Write(content);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/contentarea/">ContentArea() — global form (requires Platform.Load, different 3rd parameter)</a></li>
  <li><a href="/platform-functions/contentareabyname/">Platform.Function.ContentAreaByName</a></li>
  <li><a href="/platform-functions/contentblockbyid/">Platform.Function.ContentBlockByID — modern replacement</a></li>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey — modern replacement</a></li>
</ul>
</div>
