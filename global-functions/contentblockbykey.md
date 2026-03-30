---
layout: function
title: ContentBlockByKey
parent: Global Functions
parent_url: /global-functions/
description: Renders a Content Builder asset by its customer key and returns the rendered HTML string.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "ContentBlockByKey(customerKey)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerKey` | string | Yes | The customer key (external key) of the Content Builder asset. |

## Description

`ContentBlockByKey()` renders a Content Builder block and returns the processed HTML. It's the SSJS equivalent of the AMPscript `ContentBlockByKey()` function (the global function works identically to `Platform.Function.ContentBlockByKey()`).

The returned string contains the fully rendered HTML, including any personalization variables resolved within the content block.

## Examples

### Render a content block

```javascript
var headerHtml = ContentBlockByKey("header-navigation");
Write(headerHtml);
```

### Conditional content block

```javascript
var sk = Platform.Request.GetQueryStringParameter("sk");
var isVIP = Platform.Function.Lookup("Subscribers", "IsVIP", "SubscriberKey", sk);

var blockKey = (isVIP === "1") ? "vip-welcome-block" : "standard-welcome-block";
Write(ContentBlockByKey(blockKey));
```

### Composing a page from blocks

```javascript
Write(ContentBlockByKey("page-header"));
Write('<main class="content">');
Write(ContentBlockByKey("main-content-" + pageId));
Write('</main>');
Write(ContentBlockByKey("page-footer"));
```

## Notes

- The customer key is set in Content Builder under the asset's properties
- The content block is processed server-side, so any AMPscript or SSJS inside it also executes
- Returns an empty string if the block is not found (no error thrown)
- Use `ContentBlockByName()` if you don't have the customer key

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/contentblockbyname/">ContentBlockByName</a></li>
  <li><a href="/global-functions/contentblockbyid/">ContentBlockByID</a></li>
  <li><a href="/global-functions/contentareabykey/">ContentAreaByKey</a></li>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey</a></li>
</ul>
</div>
