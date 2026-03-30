---
layout: function
title: HMAC
parent: Platform Functions
parent_url: /platform-functions/
description: Computes an HMAC signature for a message using a secret key and the specified algorithm (SHA256, MD5, etc.).
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.HMAC(algorithm, secret, message [, encoding])"
return_type: string
min_args: 3
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `algorithm` | string | Yes | Hash algorithm: `"sha256"`, `"sha1"`, `"md5"` |
| `secret` | string | Yes | Secret key string |
| `message` | string | Yes | Message to sign |
| `encoding` | string | No | Output encoding (default: `"hex"`) |

## Examples

```javascript
// Webhook signature validation
var secret = Platform.Function.Lookup("Config", "webhookSecret", "key", "webhook");
var body = Platform.Request.GetPostData();
var expectedSig = Platform.Function.HMAC("sha256", secret, body);
var receivedSig = Platform.Request.GetRequestHeader("X-Signature");

if (expectedSig !== receivedSig) {
    Platform.Response.SetResponseCode(401);
    Write("Unauthorized");
    return;
}
```
