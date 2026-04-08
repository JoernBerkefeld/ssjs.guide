---
layout: function
title: EndImpressionRegion
parent: Platform Functions
parent_url: /platform-functions/
description: Marks the end of an impression tracking region previously opened with BeginImpressionRegion. Optionally closes all nested regions at once.
availability:
  email: true
  cloudpage: false
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
| `closeAll` | boolean | No | When `true`, closes all nested open impression regions. When `false` or omitted, closes only the most recently opened region. |

## Examples

```javascript
// Basic usage — close the most recently opened region
Platform.Function.BeginImpressionRegion("promo-block");
Write(promoContent);
Platform.Function.EndImpressionRegion();
```

```javascript
// Close all nested regions at once
Platform.Function.BeginImpressionRegion("outer");
Platform.Function.BeginImpressionRegion("inner");
Write(content);
Platform.Function.EndImpressionRegion(true); // closes both "inner" and "outer"
```

## Notes

- Must always be paired with a preceding `BeginImpressionRegion` call.
- Passing `true` for `closeAll` is useful when exiting from nested content generation where the exact nesting depth is not known.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/beginimpressionregion/">BeginImpressionRegion</a></li>
</ul>
</div>
