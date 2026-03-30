---
layout: function
title: Base64Encode
parent: Platform Functions
parent_url: /platform-functions/
description: Encodes a string value to Base64 format.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Base64Encode(value [, encoding])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | String to encode |
| `encoding` | string | No | Character encoding (default: UTF-8) |

## Examples

```javascript
var encoded = Platform.Function.Base64Encode("Hello, World!");
Write(encoded); // "SGVsbG8sIFdvcmxkIQ=="

// Common use: Basic Auth header
var credentials = "username:password";
var authHeader = "Basic " + Platform.Function.Base64Encode(credentials);
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", authHeader);
var resp = req.send();
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/base64decode/">Base64Decode</a></li>
</ul>
</div>
