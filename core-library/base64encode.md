---
layout: function
title: Base64Encode
parent: Core Library
parent_url: /core-library/
permalink: /core-library/base64encode/
redirect_from:
  - /global-functions/base64encode/
description: Encodes plain text to a Base64 string. Single-argument form requiring Platform.Load. For charset control use Platform.Function.Base64Encode().
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: "Runtime-verified: the bare-name Base64Encode works after Platform.Load(\"core\") but only in the same scope the load ran in — it is undefined inside nested helper-function bodies. The official docs do not mention this scope rule. Platform.Function.Base64Encode(string[, charset]) works in any scope and adds charset control."
syntax: "Base64Encode(string)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `string` | string | Yes | Text to encode |

## Description

Encodes a plain text string to Base64. Requires `Platform.Load("core", "1.1.5")` before use.

This is the single-argument bare-name form. It does not support a `charset` parameter — use [`Platform.Function.Base64Encode(string, charset)`](/platform-functions/base64encode/) when charset control is needed.

## Example

```javascript
Platform.Load("core", "1.1.5");
var decoded = 'Convert to Base64';
var encoded = Base64Encode(decoded);
Write(encoded); // "Q29udmVydCB0byBCYXNlNjQ="
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/base64decode/">Base64Decode (bare-name Core form)</a></li>
  <li><a href="/platform-functions/base64encode/">Platform.Function.Base64Encode</a></li>
</ul>
</div>
