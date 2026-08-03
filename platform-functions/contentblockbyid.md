---
layout: function
title: ContentBlockByID
parent: Platform Functions
parent_url: /platform-functions/
description: Renders a Content Builder asset by its numeric identifier.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentBlockByID(id[, regionName, stopOnError, fallbackContent])"
return_type: string
min_args: 1
max_args: 4
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string \| number | Yes | The numeric ID of the Content Builder asset. Accepted as a number, as a numeric string, and as a variable. |
| `regionName` | string | No | The impression region name to associate with this content block. ⚠️ Unreachable from SSJS — supplying a 2nd argument always throws, see below. |
| `stopOnError` | boolean | No | When `true`, stops rendering if the block is not found. Defaults to `false`. ⚠️ Unreachable from SSJS — the call already throws on `regionName`. |
| `fallbackContent` | string | No | HTML string to render if the block is not found. ⚠️ Unreachable from SSJS — never emitted. |

{% include callout.html type="warning" content="From SSJS only the **single-argument** form works. Supplying *any* second argument throws a resolved-value error naming `ImpressionRegionName` — a string literal fails exactly like a variable, so this is not a literal-vs-variable restriction. The three optional parameters are reachable only through the AMPscript form; see the workaround below." %}

{% include test-script.html bundle="platform-functions--contentblockbyid" chapter="parameters" %}

## Description

Renders a Content Builder block by its numeric asset ID and returns its rendered body as a string. The call returns the content rather than emitting it — pass the result to `Write()` to place it on the page.

Prefer [`Platform.Function.ContentBlockByKey()`](/platform-functions/contentblockbykey/) as it uses the external key, which is more stable and human-readable than a numeric ID. Both forms return identical content for the same asset, and both are subject to the same single-argument restriction.

`ContentBlockByID` is the modern replacement for the deprecated [`Platform.Function.ContentArea()`](/platform-functions/contentarea/), whose every arity throws.

**Runtime notes:**

- A non-existent ID throws `An error occurred when attempting to evaluate a ContentBlockByID function call.`
- Passing the asset's **external key** instead of its numeric ID fails — use `ContentBlockByKey()` for keys.
- There is **no bare-name Core form**: `typeof ContentBlockByID` is `"undefined"` even after `Platform.Load("core", "1.1.5")`, and calling it throws `Object expected: ContentBlockByID`.

{% include differs-from-docs.html note="The official docs show the optional `regionName`, `stopOnError` and `fallbackContent` parameters as usable from SSJS. At runtime only the 1-argument form works; supplying `regionName` fails even when it is a string literal, so the remaining optional parameters are reachable only through the AMPscript form." %}

{% include test-script.html bundle="platform-functions--contentblockbyid" chapter="only-one-argument-works" label="Show test script — only the single-argument form works from SSJS" %}

### Workaround — reach the optional parameters via AMPscript

The AMPscript function of the same name accepts all four parameters. Invoke it from SSJS with `Platform.Function.TreatAsContent()`:

```javascript
// impression region — works, returns the block's body
var html = Platform.Function.TreatAsContent('%%=ContentBlockByID(1469165,"heroRegion")=%%');

// fallback content for a missing block — returns "FALLBACK" instead of throwing
var safe = Platform.Function.TreatAsContent('%%=ContentBlockByID(12345,"heroRegion",false,"FALLBACK")=%%');

// stopOnError: true — the missing block now throws through TreatAsContent
var strict = Platform.Function.TreatAsContent('%%=ContentBlockByID(12345,"heroRegion",true)=%%');
```

With `stopOnError: false` and no `fallbackContent`, a missing block yields the empty string.

{% include test-script.html bundle="platform-functions--contentblockbyid" chapter="description" %}

## Example

```javascript
var blockHtml = Platform.Function.ContentBlockByID(1469165);
Write(blockHtml);
```

The single argument may be a number, a numeric string or a variable — all three resolve the same asset:

```javascript
var id = 1469165;
Platform.Function.ContentBlockByID(1469165);    // number
Platform.Function.ContentBlockByID("1469165");  // numeric string
Platform.Function.ContentBlockByID(id);         // variable
```

{% include test-script.html bundle="platform-functions--contentblockbyid" chapter="example" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey</a></li>
  <li><a href="/platform-functions/contentblockbyname/">Platform.Function.ContentBlockByName</a></li>
  <li><a href="/platform-functions/contentarea/">Platform.Function.ContentArea — deprecated predecessor</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent — used by the workaround</a></li>
</ul>
</div>
