---
layout: function
title: ContentBlockByKey
parent: Platform Functions
parent_url: /platform-functions/
description: Renders a Content Builder asset by its customer key and returns the rendered HTML string.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentBlockByKey(customerKey[, regionName, stopOnError, fallbackContent])"
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
| `customerKey` | string | Yes | The customer key (external key) of the Content Builder asset. Accepted as a string literal and as a variable. |
| `regionName` | string | No | The impression region name to associate with this content block. ⚠️ Unreachable from SSJS — supplying a 2nd argument always throws, see below. |
| `stopOnError` | boolean | No | When `true`, stops rendering if the block is not found. Defaults to `false`. ⚠️ Unreachable from SSJS — the call already throws on `regionName`. |
| `fallbackContent` | string | No | HTML string to render if the block is not found. ⚠️ Unreachable from SSJS — never emitted. |

{% include callout.html type="warning" content="From SSJS only the **single-argument** form works. Supplying *any* second argument throws a resolved-value error naming `ImpressionRegionName` — a string literal fails exactly like a variable, so this is not a literal-vs-variable restriction. The three optional parameters are reachable only through the AMPscript form; see the workaround below." %}

{% include test-script.html bundle="platform-functions--contentblockbykey" chapter="parameters" %}

## Description

`Platform.Function.ContentBlockByKey()` renders a Content Builder block by its customer key and returns the processed HTML as a string. The returned string contains the fully rendered HTML, including any personalization variables resolved within the content block.

The content block is processed server-side, so any AMPscript or SSJS inside it also executes.

The call returns the content rather than emitting it — pass the result to `Write()` to place it on the page.

**Runtime notes:**

- A key that does not exist throws `An error occurred when attempting to evaluate a ContentBlockByKey function call.` — it does **not** return the empty string.
- Passing the asset's **numeric ID** instead of its customer key throws the same evaluation error — use [`ContentBlockByID()`](/platform-functions/contentblockbyid/) for IDs.
- There is **no bare-name Core form**: `typeof ContentBlockByKey` is `"undefined"` even after `Platform.Load("core", "1.1.5")`, and calling it throws `Object expected: ContentBlockByKey`.

{% include differs-from-docs.html note="The official docs show the optional `regionName`, `stopOnError` and `fallbackContent` parameters as usable from SSJS. At runtime only the 1-argument form works; supplying `regionName` fails even when it is a string literal, so the remaining optional parameters are reachable only through the AMPscript form. A missing block therefore throws instead of yielding fallback content or the empty string." %}

{% include test-script.html bundle="platform-functions--contentblockbykey" chapter="only-one-argument-works" label="Show test script — only the single-argument form works from SSJS" %}

### Workaround — reach the optional parameters via AMPscript

The AMPscript function of the same name accepts all four parameters. Invoke it from SSJS with `Platform.Function.TreatAsContent()`:

```javascript
// impression region — works, returns the block's body
var html = Platform.Function.TreatAsContent('%%=ContentBlockByKey("ssjs-guide-test-block","heroRegion")=%%');

// fallback content for a missing block — returns "FALLBACK" instead of throwing
var safe = Platform.Function.TreatAsContent('%%=ContentBlockByKey("no-such-block","heroRegion",false,"FALLBACK")=%%');

// stopOnError: true — the missing block now throws through TreatAsContent
var strict = Platform.Function.TreatAsContent('%%=ContentBlockByKey("no-such-block","heroRegion",true)=%%');
```

With `stopOnError: false` and no `fallbackContent`, a missing block yields the empty string.

{% include test-script.html bundle="platform-functions--contentblockbykey" chapter="description" %}

## Examples

### Render a content block

```javascript
var headerHtml = Platform.Function.ContentBlockByKey("ssjs-guide-test-block");
Write(headerHtml);
```

The key may be a string literal or a variable — both resolve the same asset:

```javascript
var blockKey = "ssjs-guide-test-block";
Platform.Function.ContentBlockByKey("ssjs-guide-test-block");  // literal
Platform.Function.ContentBlockByKey(blockKey);                 // variable
```

### Conditional content block

```javascript
var sk = Platform.Request.GetQueryStringParameter("sk");
var isVIP = Platform.Function.Lookup("Subscribers", "IsVIP", "SubscriberKey", sk);

var key = (isVIP === "1") ? "vip-welcome-block" : "standard-welcome-block";
Write(Platform.Function.ContentBlockByKey(key));
```

### Composing a page from blocks

```javascript
Write(Platform.Function.ContentBlockByKey("page-header"));
Write('<main class="content">');
Write(Platform.Function.ContentBlockByKey("main-content-" + pageId));
Write('</main>');
Write(Platform.Function.ContentBlockByKey("page-footer"));
```

{% include test-script.html bundle="platform-functions--contentblockbykey" chapter="examples" %}

## Notes

- The customer key is set in Content Builder under the asset's properties.
- A missing block **throws** from SSJS — guard the call with `try/catch`, or use the AMPscript workaround above when you need `fallbackContent`.
- Use `Platform.Function.ContentBlockByName()` if you don't have the customer key, and [`ContentBlockByID()`](/platform-functions/contentblockbyid/) if you only have the numeric ID. Both siblings carry the same single-argument restriction.

{% include test-script.html bundle="platform-functions--contentblockbykey" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentblockbyname/">Platform.Function.ContentBlockByName</a></li>
  <li><a href="/platform-functions/contentblockbyid/">Platform.Function.ContentBlockByID</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent — used by the workaround</a></li>
</ul>
</div>
