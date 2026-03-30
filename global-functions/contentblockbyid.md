---
layout: function
title: ContentBlockByID
parent: Global Functions
parent_url: /global-functions/
description: Renders a Content Builder asset by its numeric identifier.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "ContentBlockByID(id)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | The numeric ID of the Content Builder asset. |

## Description

Renders a Content Builder block by its numeric asset ID. Prefer `ContentBlockByKey()` as it uses the external key which is more stable and human-readable than a numeric ID.

## Example

```javascript
var blockHtml = ContentBlockByID(12345);
Write(blockHtml);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/contentblockbykey/">ContentBlockByKey</a></li>
  <li><a href="/global-functions/contentblockbyname/">ContentBlockByName</a></li>
</ul>
</div>
