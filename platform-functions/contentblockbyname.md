---
layout: function
title: ContentBlockByName
parent: Platform Functions
parent_url: /platform-functions/
description: Renders a Content Builder asset by its folder path and name, returning the rendered HTML.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentBlockByName(name[, regionName, stopOnError, fallbackContent, statusVariable])"
return_type: string
min_args: 1
max_args: 5
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | The folder path and name of the Content Builder asset (e.g., `"My Folder/My Block"`). |
| `regionName` | string | No | The impression region name to associate with this content block. |
| `stopOnError` | boolean | No | When `true`, stops rendering if the block is not found. Defaults to `false`. |
| `fallbackContent` | string | No | HTML string to render if the block is not found. |
| `statusVariable` | string | No | Variable name that receives the lookup status. |

## Description

Renders a Content Builder block by its name (and optionally its folder path) and returns the rendered HTML.

Use `Platform.Function.ContentBlockByKey()` when possible — it is more reliable since names can change but external keys persist.

## Example

```javascript
// Block in the root of Content Builder
var html = Platform.Function.ContentBlockByName("Global Header");

// Block in a subfolder
var footer = Platform.Function.ContentBlockByName("Shared/Footer/Standard Footer");

Write(html);
Write(footer);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey</a></li>
  <li><a href="/platform-functions/contentblockbyid/">Platform.Function.ContentBlockByID</a></li>
</ul>
</div>
