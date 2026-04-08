---
layout: function
title: EndImpressionRegion
parent: Platform Functions
parent_url: /platform-functions/
description: Marks the end of an impression region opened with BeginImpressionRegion. Optionally closes all nested regions in one call.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.EndImpressionRegion([closeAll])"
return_type: void
min_args: 0
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `closeAll` | boolean | No | When `true`, closes every nested impression region still open |

## Examples

```javascript
Platform.Function.BeginImpressionRegion("sidebar");
Write(sidebarBlocks);
Platform.Function.EndImpressionRegion();
```

```javascript
Platform.Function.BeginImpressionRegion("outer");
Platform.Function.BeginImpressionRegion("inner");
Write(nestedContent);
Platform.Function.EndImpressionRegion(true);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/beginimpressionregion/">BeginImpressionRegion</a></li>
</ul>
</div>
