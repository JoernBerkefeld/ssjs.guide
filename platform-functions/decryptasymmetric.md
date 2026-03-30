---
layout: function
title: DecryptAsymmetric
parent: Platform Functions
parent_url: /platform-functions/
description: Decrypts a string that was encrypted using an asymmetric private key stored in SFMC Key Management.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.DecryptAsymmetric(encryptedValue, keyName)"
return_type: string
min_args: 2
max_args: 2
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encryptedValue` | string | Yes | Encrypted ciphertext to decrypt |
| `keyName` | string | Yes | Name of the private key registered in SFMC Key Management |

## Examples

```javascript
var ciphertext = Platform.Function.Lookup("EncryptedLog", "encryptedValue", "id", rowId);
var plain = Platform.Function.DecryptAsymmetric(ciphertext, "MyPrivateKey");
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/encryptasymmetric/">EncryptAsymmetric</a></li>
</ul>
</div>
