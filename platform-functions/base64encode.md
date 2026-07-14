---
layout: function
title: Base64Encode
parent: Platform Functions
parent_url: /platform-functions/
description: Encodes a string value to standard Base64. Optionally specify the character set. The output is interoperable standard Base64 that any decoder can read.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Base64Encode(string[, charset])"
return_type: string
min_args: 1
max_args: 2
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `string` | string | Yes | String to encode |
| `charset` | string | No | Character set to use when encoding, such as `ASCII` or `UTF-8` |

## Description

Encodes a string value to standard Base64. Use the optional `charset` parameter to control byte encoding for non-ASCII strings.

The result is standard, interoperable Base64 — any Base64 decoder can read it, not only the matching SFMC decode function.

{% include differs-from-docs.html note="The official docs state the output can only be decoded by the matching Base64Decode() function, but the runtime produces standard interoperable Base64 that any decoder accepts." %}

For a single-argument form without charset control, see [`Base64Encode()`](/core-library/base64encode/) under the Core Library bare-name functions.

## Example

```javascript
var normalStr = Platform.Function.Lookup("ForBase64Info", "ReceiptData", "ReceiptKey", "stringValue");
var encodedStr = Platform.Function.Base64Encode(normalStr);
Write(encodedStr);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/base64decode/">Platform.Function.Base64Decode</a></li>
  <li><a href="/core-library/base64encode/">Base64Encode (bare-name Core form)</a></li>
  <li><a href="/platform-functions/md5/">Platform.Function.MD5</a></li>
</ul>
</div>
