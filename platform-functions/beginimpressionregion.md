---
layout: function
title: BeginImpressionRegion
parent: Platform Functions
parent_url: /platform-functions/
description: Marks the start of a named impression region in rendered content. Unusable from SSJS — every call throws; impression regions are an AMPscript-only feature.
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
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Identifier for the impression region |

{% include test-script.html bundle="platform-functions--beginimpressionregion" chapter="parameters" %}

## Description

`Platform.Function.BeginImpressionRegion()` is documented as the opening half of an impression-tracking region, paired with [`EndImpressionRegion()`](/platform-functions/endimpressionregion/).

**Runtime note:** it is **unusable from SSJS**. Every invocation throws a resolved-value error — a string literal, a number literal, a concatenation, the empty string and a variable all fail identically, so no SSJS call shape works.

The cause is a **literal-only rule in the AMPscript parser**, not a missing tracking context. The region name must be a literal *token* in the AMPscript source; an SSJS argument always arrives as a computed value (`Parameter Type: ResolvedValueParameter`) and is rejected before its content matters — which is why even a compile-time literal fails from SSJS. The same rule applies inside AMPscript itself: an AMPscript variable is rejected as a `ResolvedVariableParameter` and a nested function call is rejected too, while an AMPscript string literal is accepted. The bare-name Core form [`BeginImpressionRegion()`](/core-library/beginimpressionregion/) behaves identically, so it is no escape hatch.

> **⚠ Scope of the evidence — CloudPage only.** Every observation on this page comes from plain `GET` requests against a CloudPage. Nothing here was measured inside a real email send. Since impression regions exist primarily to track what a recipient sees in a delivered message, treat the send-time behaviour as **untested**: it may well differ from what is described here.

{% include differs-from-docs.html note="The official docs describe the function as callable with a region name, but every SSJS invocation — including one with a compile-time string literal — throws \"the parameter value for this call must be a literal (constant) values\", while the equivalent AMPscript literal call succeeds in the same content. Scope: measured on CloudPage GET requests only — the behaviour inside a real email send was never exercised and may differ." %}

{% include test-script.html bundle="platform-functions--beginimpressionregion" chapter="ssjs-always-throws" label="Show test script — every SSJS call shape throws" %}

To open an impression region from an SSJS context, emit the AMPscript form with [`Platform.Function.TreatAsContent()`](/platform-functions/treatascontent/):

```javascript
Platform.Function.TreatAsContent('%%[BeginImpressionRegion("hero")]%%');
Write(heroHtml);
Platform.Function.EndImpressionRegion();
```

A dynamic region name is still possible — build the name in JavaScript and splice it into the AMPscript *source string*, so that the AMPscript parser sees a literal:

```javascript
var region = "promo-" + slotIndex;
Platform.Function.TreatAsContent('%%[BeginImpressionRegion("' + region + '")]%%');
```

{% include test-script.html bundle="platform-functions--beginimpressionregion" chapter="description" %}

## Examples

The AMPscript form, which is the only form that works:

```javascript
%%[ BeginImpressionRegion("hero") ]%%
```

The SSJS workaround via `TreatAsContent()`:

```javascript
Platform.Function.TreatAsContent('%%[BeginImpressionRegion("promo-slot-1")]%%');
Write(promoContent);
Platform.Function.EndImpressionRegion(true);
```

{% include test-script.html bundle="platform-functions--beginimpressionregion" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/beginimpressionregion/">BeginImpressionRegion — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/platform-functions/endimpressionregion/">EndImpressionRegion</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent</a></li>
</ul>
</div>
