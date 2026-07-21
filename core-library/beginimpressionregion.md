---
layout: function
title: BeginImpressionRegion
parent: Core Library
parent_url: /core-library/
permalink: /core-library/beginimpressionregion/
description: Bare-name Core form of Platform.Function.BeginImpressionRegion — marks the start of a named impression region. Unusable from SSJS; AMPscript-only feature.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: true
syntax: "BeginImpressionRegion(name)"
return_type: void
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | The impression region name. |

## Description

`BeginImpressionRegion()` is the bare-name Core-library form of [`Platform.Function.BeginImpressionRegion()`](/platform-functions/beginimpressionregion/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

**Runtime note:** unusable from SSJS. Once loaded, the bare name IS defined as a function, but calling it — with either a string literal or a variable — throws a resolved-value error (`"…the parameter value for this call must be a literal (constant) value."`). The bare alias and the [`Platform.Function.BeginImpressionRegion`](/platform-functions/beginimpressionregion/) form behave identically (both throw), so impression regions are effectively an **AMPscript-only** feature.

{% include differs-from-docs.html note="The region name must be a compile-time literal; passing a variable is rejected at runtime with a resolved-value error, which the official docs do not mention. In practice every call throws from SSJS." %}

## Example

```javascript
Platform.Load("core", "1.1.5");
// Note: throws at runtime in SSJS — impression regions are AMPscript-only.
BeginImpressionRegion("hero-banner");
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/beginimpressionregion/">Platform.Function.BeginImpressionRegion — qualified form (no Platform.Load required)</a></li>
  <li><a href="/core-library/endimpressionregion/">EndImpressionRegion</a></li>
</ul>
</div>
