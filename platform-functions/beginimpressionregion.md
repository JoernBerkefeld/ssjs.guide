---
layout: function
title: BeginImpressionRegion
parent: Platform Functions
parent_url: /platform-functions/
description: Marks the start of a named impression tracking region within email or CloudPage content. Use with EndImpressionRegion to wrap trackable content areas.
availability:
  email: true
  cloudpage: false
  automation: false
  triggered_send: true
syntax: "Platform.Function.BeginImpressionRegion(name)"
return_type: void
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Unique name identifying this impression tracking region |

## Examples

```javascript
// Track impressions on a specific content area
Platform.Function.BeginImpressionRegion("hero-banner");
Write(heroContent);
Platform.Function.EndImpressionRegion();
```

```javascript
// Track multiple distinct regions in a single email
Platform.Function.BeginImpressionRegion("header");
Write(headerContent);
Platform.Function.EndImpressionRegion();

Platform.Function.BeginImpressionRegion("product-recommendations");
Write(productContent);
Platform.Function.EndImpressionRegion();

Platform.Function.BeginImpressionRegion("footer-cta");
Write(footerContent);
Platform.Function.EndImpressionRegion();
```

## Notes

- Every call to `BeginImpressionRegion` must have a corresponding `EndImpressionRegion` call.
- Impression regions are primarily used in email sends — Marketing Cloud records which regions were rendered for each subscriber.
- Region names must be unique within a single send.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/endimpressionregion/">EndImpressionRegion</a></li>
</ul>
</div>
