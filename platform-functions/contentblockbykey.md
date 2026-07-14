---
layout: function
title: ContentBlockByKey
parent: Platform Functions
parent_url: /platform-functions/
description: Renders a Content Builder asset by its customer key and returns the rendered HTML string.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentBlockByKey(customerKey[, regionName, stopOnError, fallbackContent])"
return_type: string
min_args: 1
max_args: 4
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerKey` | string | Yes | The customer key (external key) of the Content Builder asset. |
| `regionName` | string | No | The impression region name to associate with this content block. |
| `stopOnError` | boolean | No | When `true`, stops rendering if the block is not found. Defaults to `false`. |
| `fallbackContent` | string | No | HTML string to render if the block is not found. |

{% include differs-from-docs.html note="Once any optional argument is supplied, every argument must be a compile-time literal; a variable in a multi-argument call is rejected at runtime. Passing the key alone as a variable still works." %}

## Description

`Platform.Function.ContentBlockByKey()` renders a Content Builder block and returns the processed HTML. The returned string contains the fully rendered HTML, including any personalization variables resolved within the content block.

The content block is processed server-side, so any AMPscript or SSJS inside it also executes.

## Examples

### Render a content block

```javascript
var headerHtml = Platform.Function.ContentBlockByKey("header-navigation");
Write(headerHtml);
```

### With a fallback

```javascript
var html = Platform.Function.ContentBlockByKey("promo-banner", null, false, "<p>No promo available.</p>");
Write(html);
```

### Conditional content block

```javascript
var sk = Platform.Request.GetQueryStringParameter("sk");
var isVIP = Platform.Function.Lookup("Subscribers", "IsVIP", "SubscriberKey", sk);

var blockKey = (isVIP === "1") ? "vip-welcome-block" : "standard-welcome-block";
Write(Platform.Function.ContentBlockByKey(blockKey));
```

### Composing a page from blocks

```javascript
Write(Platform.Function.ContentBlockByKey("page-header"));
Write('<main class="content">');
Write(Platform.Function.ContentBlockByKey("main-content-" + pageId));
Write('</main>');
Write(Platform.Function.ContentBlockByKey("page-footer"));
```

## Notes

- The customer key is set in Content Builder under the asset's properties.
- Returns an empty string (or `fallbackContent`) if the block is not found.
- Use `Platform.Function.ContentBlockByName()` if you don't have the customer key.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentblockbyname/">Platform.Function.ContentBlockByName</a></li>
  <li><a href="/platform-functions/contentblockbyid/">Platform.Function.ContentBlockByID</a></li>
</ul>
</div>
