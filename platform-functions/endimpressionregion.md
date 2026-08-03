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
return_type: "null"
min_args: 0
max_args: 1
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `closeAll` | boolean | No | When `true`, closes every nested impression region still open |

{% include test-script.html bundle="platform-functions--endimpressionregion" chapter="parameters" %}

{% include differs-from-docs.html note="The official docs type the return as void, but the runtime always returns a genuine null (typeof \"object\", === null) — even when called with no matching BeginImpressionRegion. Scope: measured on CloudPage GET requests only — the behaviour inside a real email send was never exercised and may differ." %}

{% include test-script.html bundle="platform-functions--endimpressionregion" chapter="returns-null" label="Show test script — returns a genuine null, not void" %}

> **⚠ Scope of the evidence — CloudPage only.** Every observation on this page comes from plain `GET` requests against a CloudPage. Nothing here was measured inside a real email send. Since impression regions exist primarily to track what a recipient sees in a delivered message, treat the send-time behaviour as **untested**: it may well differ from what is described here.

## Examples

`EndImpressionRegion()` is callable directly from SSJS, but its paired half is not: every SSJS [`BeginImpressionRegion()`](/platform-functions/beginimpressionregion/) call throws, so the region has to be opened with the AMPscript form via [`TreatAsContent()`](/platform-functions/treatascontent/).

```javascript
Platform.Function.TreatAsContent('%%[BeginImpressionRegion("sidebar")]%%');
Write(sidebarBlocks);
Platform.Function.EndImpressionRegion();
```

```javascript
Platform.Function.TreatAsContent('%%[BeginImpressionRegion("outer")]%%');
Platform.Function.TreatAsContent('%%[BeginImpressionRegion("inner")]%%');
Write(nestedContent);
Platform.Function.EndImpressionRegion(true);
```

{% include test-script.html bundle="platform-functions--endimpressionregion" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/endimpressionregion/">EndImpressionRegion — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/platform-functions/beginimpressionregion/">BeginImpressionRegion</a></li>
</ul>
</div>
