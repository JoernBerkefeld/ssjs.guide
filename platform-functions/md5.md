---
layout: function
title: MD5
parent: Platform Functions
parent_url: /platform-functions/
description: Returns an MD5 hash for a given string value. Optionally specify the character set used to evaluate the string.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.MD5(string[, charset])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `string` | string | Yes | String to evaluate |
| `charset` | string | No | Character set to use when evaluating the string, such as `ASCII` or `UTF-8` |

## Description

Returns an MD5 hash of the given input string. Use the optional `charset` parameter when the input string contains characters outside ASCII range.

{% include callout.html type="warning" content="MD5 is a one-way hash, not encryption. Do not use it to store passwords or protect sensitive data." %}

## Examples

### Hash a value from a Data Extension

```javascript
var normalStr = Platform.Function.Lookup("ForMD5Info", "HashData", "HashKey", "stringValue");
var hashedStr = Platform.Function.MD5(normalStr);
Write(hashedStr);
```

### Hash with explicit character set

```javascript
var hashedStr = Platform.Function.MD5("Hello World", "UTF-8");
Write(hashedStr); // "b10a8db164e0754105b7a99be72e3fe5"
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/base64encode/">Platform.Function.Base64Encode</a></li>
  <li><a href="/platform-functions/base64decode/">Platform.Function.Base64Decode</a></li>
  <li><a href="/recipes/encryption/">Encryption recipe</a></li>
</ul>
</div>
