---
layout: function
title: ContentBlockByID
parent: Platform Functions
parent_url: /platform-functions/
description: Renders a Content Builder asset by its numeric identifier.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentBlockByID(id[, regionName, stopOnError, fallbackContent])"
return_type: string
min_args: 1
max_args: 4
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | The numeric ID of the Content Builder asset. |
| `regionName` | string | No | The impression region name to associate with this content block. |
| `stopOnError` | boolean | No | When `true`, stops rendering if the block is not found. Defaults to `false`. |
| `fallbackContent` | string | No | HTML string to render if the block is not found. |

{% include callout.html type="note" content="Once any optional argument is supplied, every argument must be a compile-time literal — a variable in a multi-argument call is rejected at runtime." %}

## Description

Renders a Content Builder block by its numeric asset ID. Prefer `Platform.Function.ContentBlockByKey()` as it uses the external key, which is more stable and human-readable than a numeric ID.

## Example

```javascript
var blockHtml = Platform.Function.ContentBlockByID(12345);
Write(blockHtml);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey</a></li>
  <li><a href="/platform-functions/contentblockbyname/">Platform.Function.ContentBlockByName</a></li>
</ul>
</div>
