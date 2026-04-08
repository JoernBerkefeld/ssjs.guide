---
layout: function
title: ContentImageByID
parent: Platform Functions
parent_url: /platform-functions/
description: Returns a complete HTML img tag for a Content Builder image identified by its numeric ID. Includes title, alt, and border attributes from the image asset.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentImageByID(id[, fallbackId])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Numeric ID of the Content Builder image asset |
| `fallbackId` | number | No | Numeric ID of a fallback image to use when the primary image cannot be found |

## Return Value

Returns a complete HTML `<img>` tag string including the image `src`, `title`, `alt`, and `border` attributes. Returns an empty string if neither the primary nor fallback ID resolves to a valid image.

## Examples

```javascript
// Insert a Content Builder image by numeric ID
var imgTag = Platform.Function.ContentImageByID(98765);
Write(imgTag);
```

```javascript
// Provide a fallback image ID
var imgTag = Platform.Function.ContentImageByID(98765, 11111);
Write(imgTag);
```

## Notes

- The returned `<img>` tag is ready to embed in HTML output — no additional wrapping needed.
- Use `ContentImageByKey` when you have the external key of the asset rather than the numeric ID.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentimagebykey/">ContentImageByKey</a></li>
  <li><a href="/platform-functions/contentblockbyid/">ContentBlockByID</a></li>
  <li><a href="/platform-functions/contentblockbykey/">ContentBlockByKey</a></li>
</ul>
</div>
