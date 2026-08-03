---
layout: function
title: ContentBlockByName
parent: Platform Functions
parent_url: /platform-functions/
description: Renders a Content Builder asset by its name (optionally qualified by a backslash-separated folder path), returning the rendered HTML.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.ContentBlockByName(name[, regionName, stopOnError, fallbackContent, statusVariable])"
return_type: string
min_args: 1
max_args: 5
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | The asset's name, optionally qualified by a **backslash**-separated folder path (e.g. `"Content Builder\\My Folder\\My Block"`). Accepted as a string literal and as a variable. |
| `regionName` | string | No | The impression region name to associate with this content block. ⚠️ Unreachable from SSJS — supplying a 2nd argument always throws, see below. |
| `stopOnError` | boolean | No | When `true`, stops rendering if the block is not found. Defaults to `false`. ⚠️ Unreachable from SSJS — the call already throws on `regionName`. |
| `fallbackContent` | string | No | HTML string to render if the block is not found. ⚠️ Unreachable from SSJS — never emitted. |
| `statusVariable` | string | No | Variable name that receives the lookup status. ⚠️ Unreachable from SSJS because the call already fails on `regionName`. |

{% include callout.html type="warning" content="From SSJS only the **single-argument** form works. Supplying *any* second argument throws a resolved-value error naming `ImpressionRegionName` — a string literal fails exactly like a variable, so this is not a literal-vs-variable restriction. The four optional parameters are reachable only through the AMPscript form; see the workaround below." %}

{% include test-script.html bundle="platform-functions--contentblockbyname" chapter="parameters" %}

## Description

`Platform.Function.ContentBlockByName()` renders a Content Builder block by its **name** and returns the processed HTML as a string. The call returns the content rather than emitting it — pass the result to `Write()` to place it on the page.

Prefer [`Platform.Function.ContentBlockByKey()`](/platform-functions/contentblockbykey/) when you can: external keys persist, whereas an asset's name and folder can be changed by anyone editing it in Content Builder.

### Name resolution

- **A bare name resolves the asset no matter which folder it lives in.** A block sitting several folders deep is found by its name alone — the path is only needed to disambiguate when the same name is reused across folders.
- **The path separator is a backslash (`\`), not a forward slash.** `"Content Builder\\My Folder\\My Block"` resolves; the same path written with `/` throws.
- Both the **fully-qualified** path starting at the `Content Builder` root and a **partial** path (the immediate folder plus the name) resolve the asset.
- A path naming the **wrong** folder for that asset throws, so the path is genuinely matched and not merely ignored.
- The name may be supplied as a **string literal or a variable**, including one built by concatenation.

**Runtime notes:**

- A name that does not exist throws `An error occurred when attempting to evaluate a ContentBlockByName function call.` — it does **not** return the empty string.
- Passing the asset's **numeric ID** throws the same evaluation error — use [`ContentBlockByID()`](/platform-functions/contentblockbyid/) for IDs and [`ContentBlockByKey()`](/platform-functions/contentblockbykey/) for external keys.
- There is **no bare-name Core form**: `typeof ContentBlockByName` is `"undefined"` even after `Platform.Load("core", "1.1.5")`, and calling it throws `Object expected: ContentBlockByName`.

{% include callout.html type="warning" content="**SSJS authoring caveat:** a string literal whose *last* character is a backslash — e.g. `\"Content Builder\\\\\" + folder` — aborts the whole CloudPage with HTTP 422 before any line runs. Keep the separator in the middle of a literal, or build it with `String.fromCharCode(92)`." %}

{% include differs-from-docs.html note="The official docs show the optional `regionName`, `stopOnError`, `fallbackContent` and `statusVariable` parameters as usable from SSJS. At runtime only the 1-argument form works; supplying `regionName` fails even when it is a string literal, so the remaining optional parameters are reachable only through the AMPscript form. A missing block therefore throws instead of yielding fallback content or the empty string." %}

{% include test-script.html bundle="platform-functions--contentblockbyname" chapter="only-one-argument-works" label="Show test script — only the single-argument form works from SSJS" %}

### Workaround — reach the optional parameters via AMPscript

The AMPscript function of the same name accepts all five parameters. Invoke it from SSJS with `Platform.Function.TreatAsContent()`:

```javascript
// impression region — works, returns the block's body
var html = Platform.Function.TreatAsContent('%%=ContentBlockByName("ssjs-guide-test-block","heroRegion")=%%');

// fallback content for a missing block — returns "FALLBACK" instead of throwing
var safe = Platform.Function.TreatAsContent('%%=ContentBlockByName("no-such-block","heroRegion",false,"FALLBACK")=%%');

// stopOnError: true — the missing block now throws through TreatAsContent
var strict = Platform.Function.TreatAsContent('%%=ContentBlockByName("no-such-block","heroRegion",true)=%%');

// statusVariable — the 5-argument form the SSJS binding rejects outright
var withStatus = Platform.Function.TreatAsContent('%%[ var @s ]%%%%=ContentBlockByName("ssjs-guide-test-block","heroRegion",false,"FALLBACK",@s)=%%');
```

With `stopOnError: false` and no `fallbackContent`, a missing block yields the empty string. The AMPscript form uses the **same backslash** path syntax.

{% include test-script.html bundle="platform-functions--contentblockbyname" chapter="description" %}

## Example

```javascript
// A bare name resolves the block wherever it lives
var html = Platform.Function.ContentBlockByName("Global Header");

// A folder path disambiguates a name reused across folders — BACKSLASH separated
var footer = Platform.Function.ContentBlockByName("Content Builder\\Shared\\Standard Footer");

Write(html);
Write(footer);
```

The name may also be a variable, or built by concatenation:

```javascript
var blockName = "Global Header";
Platform.Function.ContentBlockByName(blockName);

var sep = String.fromCharCode(92); // "\" — see the authoring caveat above
Platform.Function.ContentBlockByName("Content Builder" + sep + "Shared" + sep + "Standard Footer");
```

{% include test-script.html bundle="platform-functions--contentblockbyname" chapter="example" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/contentblockbykey/">Platform.Function.ContentBlockByKey</a></li>
  <li><a href="/platform-functions/contentblockbyid/">Platform.Function.ContentBlockByID</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent — used by the workaround</a></li>
</ul>
</div>
