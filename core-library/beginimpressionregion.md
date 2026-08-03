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
test_scripts: complete
syntax: "BeginImpressionRegion(name)"
return_type: void
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | The impression region name. |

{% include test-script.html bundle="core-library--beginimpressionregion" chapter="parameters" %}

## Description

`BeginImpressionRegion()` is the bare-name Core-library form of [`Platform.Function.BeginImpressionRegion()`](/platform-functions/beginimpressionregion/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

**Runtime note:** unusable from SSJS. Once loaded, the bare name IS defined as a function, but calling it — with a string literal, a variable, or any other argument shape — throws a resolved-value error (`"…the parameter value for this call must be a literal (constant) values."`). The bare alias and the [`Platform.Function.BeginImpressionRegion`](/platform-functions/beginimpressionregion/) form behave identically (both throw), so impression regions are effectively an **AMPscript-only** feature.

The rule behind the error is the AMPscript parser's **literal-only** requirement for the region name: an SSJS argument always arrives as a computed value (`ResolvedValueParameter`) and never as a literal token, so no SSJS call shape can satisfy it. To open a region from an SSJS context, emit the AMPscript form with [`Platform.Function.TreatAsContent()`](/platform-functions/treatascontent/) — and, for a dynamic name, splice the name into the AMPscript source string so the parser still sees a literal.

**Scope of the evidence — CloudPage only.** Everything stated above was observed on plain CloudPage `GET` requests. No test was run inside an actual email send, even though impression regions are first and foremost a send-tracking feature, so the send-time behaviour is **unverified** and may differ.

{% include differs-from-docs.html note="The official docs present the function as callable with a region name, but every SSJS invocation — including one with a compile-time string literal — throws a resolved-value error, while the equivalent AMPscript literal call succeeds in the same content. Scope: observed on CloudPage GET requests only — the email/send context was not tested and may behave differently." %}

{% include test-script.html bundle="core-library--beginimpressionregion" chapter="ssjs-always-throws" label="Show test script — every SSJS call shape throws" %}

{% include test-script.html bundle="core-library--beginimpressionregion" chapter="description" %}

## Example

```javascript
Platform.Load("core", "1.1.5");
// Note: throws at runtime in SSJS — impression regions are AMPscript-only.
BeginImpressionRegion("hero-banner");
```

{% include test-script.html bundle="core-library--beginimpressionregion" chapter="example" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/beginimpressionregion/">Platform.Function.BeginImpressionRegion — qualified form (no Platform.Load required)</a></li>
  <li><a href="/core-library/endimpressionregion/">EndImpressionRegion</a></li>
</ul>
</div>
