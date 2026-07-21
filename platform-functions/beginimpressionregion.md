---
layout: function
title: BeginImpressionRegion
parent: Platform Functions
parent_url: /platform-functions/
description: Marks the start of a named impression region in rendered content. Pair with EndImpressionRegion for analytics that attribute views to specific sections.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.BeginImpressionRegion(name)"
return_type: void
min_args: 1
max_args: 1
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Identifier for the impression region |

{% include differs-from-docs.html note="The region name must be a compile-time literal; passing a variable is rejected at runtime with a resolved-value error, which the official docs do not mention." %}

## Examples

```javascript
Platform.Function.BeginImpressionRegion("hero");
Write(heroHtml);
Platform.Function.EndImpressionRegion();
```

```javascript
Platform.Function.BeginImpressionRegion("promo-slot-1");
Write(promoContent);
Platform.Function.EndImpressionRegion(true);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/beginimpressionregion/">BeginImpressionRegion — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/platform-functions/endimpressionregion/">EndImpressionRegion</a></li>
</ul>
</div>
