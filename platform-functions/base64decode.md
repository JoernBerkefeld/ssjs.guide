---
layout: function
title: Base64Decode
parent: Platform Functions
parent_url: /platform-functions/
description: Decodes a Base64-encoded string. Only works with values encoded using Platform.Function.Base64Encode() or Base64Encode() — not arbitrary Base64 strings.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Base64Decode(encodedString[, charset])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedString` | string | Yes | Base64 encoded string to decode |
| `charset` | string | No | Character set to use when decoding, such as `ASCII` or `UTF-8` |

## Description

Decodes a Base64-encoded string back to its original value. Use the optional `charset` parameter to match the encoding used when the string was encoded.

For a single-argument form without charset control, see [`Base64Decode()`](/core-library/base64decode/) under the Core Library bare-name functions.

## Example

```javascript
var encodedStr = Platform.Function.Lookup("forBase64Info", "ReceiptData", "ReceiptKey", "stringValue");
var decodedStr = Platform.Function.Base64Decode(encodedStr);
Write(decodedStr);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/base64encode/">Platform.Function.Base64Encode</a></li>
  <li><a href="/core-library/base64decode/">Base64Decode (bare-name Core form)</a></li>
  <li><a href="/platform-functions/md5/">Platform.Function.MD5</a></li>
</ul>
</div>
