---
layout: function
title: Base64Decode
parent: Platform Functions
parent_url: /platform-functions/
description: Decodes a standard Base64-encoded string. Optionally specify the character set. Decodes any valid standard Base64 string, not only values produced by Base64Encode().
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Base64Decode(encodedString[, charset])"
return_type: string
min_args: 1
max_args: 2
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedString` | string | Yes | Base64 encoded string to decode |
| `charset` | string | No | Character set to use when decoding, such as `ASCII` or `UTF-8` |

## Description

Decodes a standard Base64-encoded string back to its original value. Use the optional `charset` parameter to control how the decoded bytes are interpreted.

It decodes any valid standard Base64 string — the input does not have to have been produced by `Base64Encode()`.

{% include differs-from-docs.html note="The official docs imply it only decodes values created by the matching Base64Encode() function, but the runtime decodes any valid standard Base64 string." %}

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
