---
layout: function
title: ContentImageByID
parent: Platform Functions
parent_url: /platform-functions/
description: Returns an HTML img element pointing at a Content Builder image identified by numeric asset ID. Optionally supply a fallback ID if the primary asset is missing.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.ContentImageByID(id[, fallbackId])"
return_type: string
min_args: 1
max_args: 2
verification: verified
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string \| number | Yes | Numeric ID of the image in Content Builder |
| `fallbackId` | string \| number | No | ID of a replacement image when the primary cannot be resolved |

{% include test-script.html bundle="platform-functions--contentimagebyid" chapter="parameters" %}

## Return value

A string containing an `img` tag (including typical attributes such as `src`, `alt`, and `title` as provided by the platform).

{% include test-script.html bundle="platform-functions--contentimagebyid" chapter="return-value" %}

## Examples

```javascript
var banner = Platform.Function.ContentImageByID(1234567);
Write(banner);
```

```javascript
var icon = Platform.Function.ContentImageByID(555, 999);
Write(icon);
```

{% include test-script.html bundle="platform-functions--contentimagebyid" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentimagebykey/">ContentImageByKey</a></li>
  <li><a href="/platform-functions/contentblockbyid/">Platform.Function.ContentBlockByID</a></li>
</ul>
</div>
