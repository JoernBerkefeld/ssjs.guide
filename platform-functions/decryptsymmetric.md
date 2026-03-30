---
layout: function
title: DecryptSymmetric
parent: Platform Functions
parent_url: /platform-functions/
description: Decrypts a string that was encrypted with EncryptSymmetric using the same algorithm and key.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.DecryptSymmetric(encryptedValue, algorithm, password, passwordSalt, initializationVector, initializationVectorSalt)"
return_type: string
min_args: 6
max_args: 6
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encryptedValue` | string | Yes | Ciphertext to decrypt |
| `algorithm` | string | Yes | Same algorithm used when encrypting |
| `password` | string | Yes | Same password or key name used when encrypting |
| `passwordSalt` | string | Yes | Same salt used when encrypting |
| `initializationVector` | string | Yes | Same IV used when encrypting |
| `initializationVectorSalt` | string | Yes | Same IV salt used when encrypting |

## Examples

```javascript
var ciphertext = Platform.Function.Lookup("SecureData", "ciphertext", "id", id);
var plain = Platform.Function.DecryptSymmetric(
    ciphertext,
    "AES",
    "myKeyName", "",
    "myIVName", ""
);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/encryptsymmetric/">EncryptSymmetric</a></li>
</ul>
</div>
