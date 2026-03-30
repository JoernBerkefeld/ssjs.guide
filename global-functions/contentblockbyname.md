---
layout: function
title: ContentBlockByName
parent: Global Functions
parent_url: /global-functions/
description: Renders a Content Builder asset by its folder path and name, returning the rendered HTML.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "ContentBlockByName(name)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | The folder path and name of the Content Builder asset (e.g., `"My Folder/My Block"`). |

## Description

Renders a Content Builder block by its name (and optionally its folder path) and returns the rendered HTML. Use `ContentBlockByKey()` when possible — it is more reliable since names can change but external keys persist.

## Example

```javascript
// Block in the root of Content Builder
var html = ContentBlockByName("Global Header");

// Block in a subfolder
var footer = ContentBlockByName("Shared/Footer/Standard Footer");

Write(html);
Write(footer);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/contentblockbykey/">ContentBlockByKey</a></li>
  <li><a href="/global-functions/contentblockbyid/">ContentBlockByID</a></li>
</ul>
</div>
