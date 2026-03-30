---
layout: function
title: MD5
parent: Platform Functions
parent_url: /platform-functions/
description: Computes the MD5 hash of a string value and returns it as a hexadecimal string.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.MD5(value [, encoding])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to hash |
| `encoding` | string | No | Encoding of input. Default: `"hex"` |

## Examples

```javascript
var hash = Platform.Function.MD5("hello@example.com");
Write(hash); // "5d41402abc4b2a76b9719d911017c592" (example only)
```

{% include callout.html type="warning" content="MD5 is a cryptographic hash, not encryption. It is one-way and considered weak for security-sensitive use cases. For data integrity or non-security identifiers it remains useful." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/sha256/">SHA256</a></li>
</ul>
</div>
