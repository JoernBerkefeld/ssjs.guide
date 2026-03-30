---
layout: function
title: TreatAsContentArea
parent: Global Functions
parent_url: /global-functions/
description: Renders a classic content area stored in the system. Legacy function — prefer ContentBlockByKey for Content Builder assets.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "TreatAsContentArea(content)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | Classic content area markup to render. |

## Description

Legacy function for rendering classic Email Classic content areas. For new development, use `ContentBlockByKey()` with Content Builder assets.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/contentblockbykey/">ContentBlockByKey</a></li>
  <li><a href="/global-functions/contentareabykey/">ContentAreaByKey</a></li>
</ul>
</div>
