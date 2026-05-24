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
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name of the Content Area (folder path notation, e.g. `"My Content\myArea"`). |
| `regionName` | string | No | Impression region for content tracking. |
| `stopOnError` | boolean | No | When `true`, throws on retrieval failure; when `false`, the call continues. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. |

## Description

`Platform.Function.ContentAreaByName()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its name.

**This function is deprecated.** Classic Content Areas are no longer supported on modern SFMC infrastructure. Migrate content to Content Builder blocks and use [`Platform.Function.ContentBlockByName()`](/platform-functions/contentblockbyname/) instead.

### Difference from the global `ContentAreaByName()` form

The bare-name global `ContentAreaByName()` function accepts the same first two parameters but differs in the 3rd and 4th:

| | `Platform.Function.ContentAreaByName()` | `ContentAreaByName()` (global) |
|---|---|---|
| 3rd parameter | `stopOnError: boolean` | `errorMsg: string` |
| Requires `Platform.Load` | No | Yes — `Platform.Load("core", "1.1.5")` |

See [ContentAreaByName (global)](/global-functions/contentareabyname/) for the global variant.

## Examples

```javascript
var content = Platform.Function.ContentAreaByName("My Content\\myContentArea");
Platform.Response.Write(content);
```

```javascript
var content = Platform.Function.ContentAreaByName("My Content\\myContentArea", "impressionRegion", false, "Fallback text here");
Platform.Response.Write(content);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/contentareabyname/">ContentAreaByName() — global form (requires Platform.Load, different 3rd parameter)</a></li>
  <li><a href="/platform-functions/contentarea/">Platform.Function.ContentArea</a></li>
  <li><a href="/platform-functions/contentblockbyname/">Platform.Function.ContentBlockByName — modern replacement</a></li>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey — modern replacement</a></li>
</ul>
</div>
