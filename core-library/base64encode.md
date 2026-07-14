---
layout: function
title: Base64Encode
parent: Global Functions
parent_url: /global-functions/
description: Encodes plain text to a Base64 string. Single-argument form requiring Platform.Load. For charset control use Platform.Function.Base64Encode().
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
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
  <li><a href="/global-functions/base64decode/">Base64Decode (global)</a></li>
  <li><a href="/platform-functions/base64encode/">Platform.Function.Base64Encode</a></li>
</ul>
</div>
