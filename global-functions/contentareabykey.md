---
layout: function
title: ContentAreaByKey
parent: Global Functions
parent_url: /global-functions/
description: Renders a classic content area (legacy Email Classic) by its external key.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "ContentAreaByKey(key)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the classic content area. |

## Description

Renders a legacy "classic" content area from Email Classic (pre-Content Builder). For new development, use `ContentBlockByKey()` with Content Builder assets instead.

## Example

```javascript
var footer = ContentAreaByKey("classic-footer-key");
Write(footer);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/contentblockbykey/">ContentBlockByKey</a></li>
</ul>
</div>
