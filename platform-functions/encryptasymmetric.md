---
layout: function
title: EncryptAsymmetric
parent: Platform Functions
parent_url: /platform-functions/
description: Encrypts a string using an asymmetric key pair (RSA) registered in SFMC Key Management.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.EncryptAsymmetric(value, keyName)"
return_type: string
min_args: 2
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | Yes | Plain text to encrypt |
| `keyName` | string | Yes | Name of the public key registered in SFMC Key Management |

## Examples

```javascript
var sensitive = "creditcard:4111111111111111";
var encrypted = Platform.Function.EncryptAsymmetric(sensitive, "MyPublicKey");
Platform.Function.InsertData("EncryptedLog", ["encryptedValue"], [encrypted]);
```

## Notes

Keys must be configured under **Setup → Platform Tools → Security → Key Management** before use. This function uses the registered public key to encrypt; decryption requires the corresponding private key outside SFMC.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/decryptasymmetric/">DecryptAsymmetric</a></li>
  <li><a href="/platform-functions/encryptsymmetric/">EncryptSymmetric</a></li>
</ul>
</div>
