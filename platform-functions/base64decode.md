---
layout: function
title: Base64Decode
parent: Platform Functions
parent_url: /platform-functions/
description: Decodes a Base64-encoded string back to plain text.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Base64Decode(value [, encoding])"
return_type: string
min_args: 1
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | Base64-encoded string to decode |
| `encoding` | string | No | Character encoding (default: UTF-8) |

## Examples

```javascript
var encoded = "SGVsbG8sIFdvcmxkIQ==";
var decoded = Platform.Function.Base64Decode(encoded);
Write(decoded); // "Hello, World!"
```
