---
layout: function
title: ContentImageByKey
parent: Platform Functions
parent_url: /platform-functions/
description: Returns an HTML img element pointing at a Content Builder image identified by external key. Optionally supply a fallback key if the primary asset is missing.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.ContentImageByKey(key[, fallbackKey])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the image in Content Builder |
| `fallbackKey` | string | No | External key of a replacement image when the primary cannot be resolved |

## Return value

A string containing an `img` tag (including typical attributes such as `src`, `alt`, and `title` as provided by the platform).

## Examples

```javascript
var hero = Platform.Function.ContentImageByKey("hero-2026-campaign");
Write(hero);
```

```javascript
var thumb = Platform.Function.ContentImageByKey("product-thumb", "product-thumb-default");
Write(thumb);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentimagebyid/">ContentImageByID</a></li>
  <li><a href="/global-functions/contentblockbykey/">ContentBlockByKey</a></li>
</ul>
</div>
