---
layout: function
title: ContentImageByKey
parent: Platform Functions
parent_url: /platform-functions/
description: Returns a complete HTML img tag for a Content Builder image identified by its external key. Includes title, alt, and border attributes from the image asset.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentImageByKey(key[, fallbackKey])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the Content Builder image asset |
| `fallbackKey` | string | No | External key of a fallback image to use when the primary image cannot be found |

## Return Value

Returns a complete HTML `<img>` tag string including the image `src`, `title`, `alt`, and `border` attributes. Returns an empty string if neither the primary nor fallback key resolves to a valid image.

## Examples

```javascript
// Insert a Content Builder image by key
var imgTag = Platform.Function.ContentImageByKey("hero-banner-2024");
Write(imgTag);
```

```javascript
// Use a fallback if the personalised image might not exist
var personalisedImg = Platform.Function.ContentImageByKey(
    "banner-" + subscriberKey,
    "banner-default"
);
Write(personalisedImg);
```

## Notes

- The returned `<img>` tag is ready to embed in HTML output — no additional wrapping needed.
- Use `ContentImageByID` when you have the numeric asset ID rather than the external key.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentimagebyid/">ContentImageByID</a></li>
  <li><a href="/platform-functions/contentblockbykey/">ContentBlockByKey</a></li>
  <li><a href="/platform-functions/contentblockbyid/">ContentBlockByID</a></li>
</ul>
</div>
