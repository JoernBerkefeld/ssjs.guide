---
layout: function
title: EndImpressionRegion
parent: Core Library
parent_url: /core-library/
permalink: /core-library/endimpressionregion/
description: Bare-name Core form of Platform.Function.EndImpressionRegion — marks the end of an impression region. Bare alias returns undefined (Platform.Function form returns null).
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: true
test_scripts: complete
syntax: "EndImpressionRegion([closeAll])"
return_type: undefined
min_args: 0
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `closeAll` | string \| boolean \| number | No | When `true`, closes every nested impression region still open. |

{% include test-script.html bundle="core-library--endimpressionregion" chapter="parameters" %}

## Description

`EndImpressionRegion()` is the bare-name Core-library form of [`Platform.Function.EndImpressionRegion()`](/platform-functions/endimpressionregion/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

Once loaded, the bare name IS defined as a function and can be called without throwing. Because [`BeginImpressionRegion`](/core-library/beginimpressionregion/) is unusable from SSJS, this method has no practical effect in SSJS either — impression regions are an **AMPscript-only** feature.

{% include test-script.html bundle="core-library--endimpressionregion" chapter="description" %}

## Return value

The bare alias returns **`undefined`** (`typeof "undefined"`). This differs from its [`Platform.Function.EndImpressionRegion`](/platform-functions/endimpressionregion/) counterpart, which returns a genuine **`null`** (`typeof "object"`, `=== null`). The official docs type the return as void.

{% include differs-from-docs.html note="The official docs type the return as void. The bare-name Core alias returns undefined (typeof \"undefined\"), whereas the Platform.Function form returns a genuine null (typeof \"object\", === null)." %}

{% include test-script.html bundle="core-library--endimpressionregion" chapter="returns-undefined" label="Show test script — bare alias returns undefined, not void" %}

## Example

```javascript
Platform.Load("core", "1.1.5");
EndImpressionRegion(); // returns undefined (Platform.Function form returns null)
```

{% include test-script.html bundle="core-library--endimpressionregion" chapter="example" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/endimpressionregion/">Platform.Function.EndImpressionRegion — qualified form (no Platform.Load required)</a></li>
  <li><a href="/core-library/beginimpressionregion/">BeginImpressionRegion</a></li>
</ul>
</div>
