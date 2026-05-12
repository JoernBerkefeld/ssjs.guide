---
layout: function
title: Base64Encode
parent: Platform Functions
parent_url: /platform-functions/
description: Encodes a string value to Base64. Optionally specify the character set. Only decodable with Platform.Function.Base64Decode() or Base64Decode().
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Base64Encode(string[, charset])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `string` | string | Yes | String to encode |
| `charset` | string | No | Character set to use when encoding, such as `ASCII` or `UTF-8` |

## Description

Encodes a string value to Base64. Use the optional `charset` parameter to control encoding for non-ASCII strings.

For a single-argument form without charset control, see [`Base64Encode()`](/global-functions/base64encode/) under Global Functions.

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
  <li><a href="/global-functions/base64encode/">Base64Encode (global)</a></li>
  <li><a href="/platform-functions/md5/">Platform.Function.MD5</a></li>
</ul>
</div>
