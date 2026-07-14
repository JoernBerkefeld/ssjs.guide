---
layout: function
title: Base64Decode
parent: Core Library
parent_url: /core-library/
permalink: /core-library/base64decode/
redirect_from:
  - /global-functions/base64decode/
description: Decodes a Base64 encoded string to plain text. Single-argument form requiring Platform.Load. For charset control use Platform.Function.Base64Decode().
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: "Runtime-verified: the bare-name Base64Decode works after Platform.Load(\"core\") but only in the same scope the load ran in — it is undefined inside nested helper-function bodies. The official docs do not mention this scope rule. Platform.Function.Base64Decode(encodedString[, charset]) works in any scope and adds charset control."
syntax: "Base64Decode(encodedString)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedString` | string | Yes | Base64 encoded string to decode |

## Description

Decodes a Base64 encoded string back to plain text. Requires `Platform.Load("core", "1.1.5")` before use.

This is the single-argument bare-name form. It does not support a `charset` parameter — use [`Platform.Function.Base64Decode(encodedString, charset)`](/platform-functions/base64decode/) when charset control is needed.

## Example

```javascript
Platform.Load("core", "1.1.5");
var encoded = 'VGhpcyB3YXMgYSBCYXNlNjQgZW5jb2RlZCBzdHJpbmcu';
var decoded = Base64Decode(encoded);
Write(decoded); // "This was a Base64 encoded string."
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/base64encode/">Base64Encode (bare-name Core form)</a></li>
  <li><a href="/platform-functions/base64decode/">Platform.Function.Base64Decode</a></li>
</ul>
</div>
