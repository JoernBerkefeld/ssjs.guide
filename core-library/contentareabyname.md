---
layout: function
title: ContentAreaByName
parent: Core Library
parent_url: /core-library/
permalink: /core-library/contentareabyname/
redirect_from:
  - /global-functions/contentareabyname/
description: "Retrieves rendered content from a classic Content Area by name. Deprecated — Content Areas are no longer supported on current SFMC infrastructure."
deprecated: true
requires_core_load: true
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "ContentAreaByName(name[, regionName, errorMsg, fallbackContent])"
return_type: string
min_args: 1
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name of the Content Area (folder path notation, e.g. `"My Content\myArea"`). |
| `regionName` | string | No | Impression region for content tracking. |
| `errorMsg` | string | No | Error message returned as a string on retrieval failure. |
| `fallbackContent` | string | No | Content to display when the area cannot be retrieved. |

## Description

`ContentAreaByName()` retrieves and renders content from a classic (legacy) SFMC Content Area identified by its name.

**This function is deprecated.** Classic Content Areas are no longer supported on modern SFMC infrastructure. Migrate content to Content Builder blocks and use [`Platform.Function.ContentBlockByName()`](/platform-functions/contentblockbyname/) instead.

**Requires `Platform.Load`:** This global form requires `Platform.Load("core", "1.1.5")` before use. The qualified [`Platform.Function.ContentAreaByName()`](/platform-functions/contentareabyname/) form does not.

### Difference from `Platform.Function.ContentAreaByName()`

| | `ContentAreaByName()` (global) | `Platform.Function.ContentAreaByName()` |
|---|---|---|
| 3rd parameter | `errorMsg: string` | `stopOnError: boolean` |
| Requires `Platform.Load` | Yes — `Platform.Load("core", "1.1.5")` | No |

See [Platform.Function.ContentAreaByName](/platform-functions/contentareabyname/) for the qualified variant.

## Examples

```javascript
Platform.Load("core", "1.1.5");
var content = ContentAreaByName("My Content\\myContentArea");
Platform.Response.Write(content);
```

```javascript
Platform.Load("core", "1.1.5");
var content = ContentAreaByName("My Content\\myContentArea", "impressionRegion", "Could not load content area", "Fallback text here");
Platform.Response.Write(content);
```

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
