---
layout: function
title: EncryptSymmetric
parent: Platform Functions
parent_url: /platform-functions/
description: Encrypts a string using a symmetric key (AES or other) registered in SFMC Key Management.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.EncryptSymmetric(value, algorithm, password, passwordSalt, initializationVector, initializationVectorSalt)"
return_type: string
min_args: 6
max_args: 6
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | Plain text to encrypt |
| `algorithm` | string | Yes | Cipher algorithm, e.g. `"AES"` |
| `password` | string | Yes | Encryption password or key name |
| `passwordSalt` | string | Yes | Salt for the password. Pass empty string to use password as-is |
| `initializationVector` | string | Yes | IV value |
| `initializationVectorSalt` | string | Yes | Salt for the IV |

## Examples

```javascript
var encrypted = Platform.Function.EncryptSymmetric(
    "my secret data",
    "AES",
    "myKeyName", "",
    "myIVName", ""
);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/decryptsymmetric/">DecryptSymmetric</a></li>
</ul>
</div>
