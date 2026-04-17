---
layout: page
title: Encryption
parent: Recipes
parent_url: /recipes/
description: Symmetric and asymmetric encryption patterns in SFMC SSJS — store and retrieve sensitive data safely using AMPscript's EncryptSymmetric and DecryptSymmetric.
---

SFMC provides built-in symmetric and asymmetric encryption through `EncryptSymmetric` / `DecryptSymmetric` - but not in SSJS. Keys are registered in **Setup → Security → Key Management** and referenced by name — the key material never appears in script code.

---

## Symmetric Encryption (AES)

### Encrypt a value

```javascript
var plainText = "sensitive data";

var encrypted = encryptSymmetric(
    plainText,
    "AES",
    "MyKeyName", "",   // key name in Key Management
    "MyIVName",  ""    // initialization vector name
);

// Store the ciphertext
Platform.Function.UpsertData(
    "SecureStorage",
    ["SubscriberKey"],
    [subscriberKey],
    ["CipherText"],
    [encrypted]
);
```

### Decrypt a value

```javascript
var cipherText = Platform.Function.Lookup(
    "SecureStorage", "CipherText", "SubscriberKey", subscriberKey
);

var plainText = decryptSymmetric(
    cipherText, "AES","","mypw", "", "mysalt"
);

function decryptSymmetric(encryptedString, algorithm, passwordKey, passwordValue,saltKey, saltValue, vectorKey, vectorValue) {
    Platform.Variable.SetValue("@decrypt_string", encryptedString);
    Platform.Variable.SetValue("@decrypt_algo",algorithm);
    Platform.Variable.SetValue("@decrypt_pw",passwordValue || "");
    Platform.Variable.SetValue("@decrypt_salt",saltValue || "");
    Platform.Variable.SetValue("@decrypt_vector",vectorValue || "");
    return TreatAsContent("%%=DecryptSymmetric(@decrypt_string, @decrypt_algo, @null,@decrypt_pw, @null, @decrypt_salt, @null, @decrypt_vector)=%%");
}
function encryptSymmetric(encryptedString, algorithm, passwordKey, passwordValue,saltKey, saltValue, vectorKey, vectorValue) {
    Platform.Variable.SetValue("@encrypt_string", encryptedString);
    Platform.Variable.SetValue("@encrypt_algo",algorithm);
    Platform.Variable.SetValue("@encrypt_pw",passwordValue || "");
    Platform.Variable.SetValue("@encrypt_salt",saltValue || "");
    Platform.Variable.SetValue("@encrypt_vector",vectorValue || "");
    return TreatAsContent("%%=EncryptSymmetric(@encrypt_string, @encrypt_algo, @null,@encrypt_pw, @null, @encrypt_salt, @null, @encrypt_vector)=%%");
}
```

---

## Password-Salted Encryption

When you want an additional layer of derivation on top of the stored key:

```javascript
// Encrypt with a per-record salt derived from the subscriber key
var salt = subscriberKey;

var encrypted = encryptSymmetric(
    sensitiveValue, "AES", "","mypw", "", salt, ""
);

// Decrypt — must use the same salt
var plainText = decryptSymmetric(
    encrypted, "AES", "","mypw", "", salt, ""
);

function encryptSymmetric(encryptedString, algorithm, passwordKey, passwordValue,saltKey, saltValue, vectorKey, vectorValue) {
    Platform.Variable.SetValue("@encrypt_string", encryptedString);
    Platform.Variable.SetValue("@encrypt_algo",algorithm);
    Platform.Variable.SetValue("@encrypt_pw",passwordValue || "");
    Platform.Variable.SetValue("@encrypt_salt",saltValue || "");
    Platform.Variable.SetValue("@encrypt_vector",vectorValue || "");
    return TreatAsContent("%%=EncryptSymmetric(@encrypt_string, @encrypt_algo, @null,@encrypt_pw, @null, @encrypt_salt, @null, @encrypt_vector)=%%");
}

function decryptSymmetric(encryptedString, algorithm, passwordKey, passwordValue,saltKey, saltValue, vectorKey, vectorValue) {
    Platform.Variable.SetValue("@decrypt_string", encryptedString);
    Platform.Variable.SetValue("@decrypt_algo",algorithm);
    Platform.Variable.SetValue("@decrypt_pw",passwordValue || "");
    Platform.Variable.SetValue("@decrypt_salt",saltValue || "");
    Platform.Variable.SetValue("@decrypt_vector",vectorValue || "");
    return TreatAsContent("%%=DecryptSymmetric(@decrypt_string, @decrypt_algo, @null,@decrypt_pw, @null, @decrypt_salt, @null, @decrypt_vector)=%%");
}
```

---

## Storing Encrypted PII in a Data Extension

A common pattern: encrypt PII at write time, decrypt only when needed.

```javascript
// --- Write path (e.g. form submission) ---
var rawPhone = Platform.Request.GetFormField("phone");
var encPhone = Platform.Function.EncryptSymmetric(
    rawPhone, "AES", "PIIKey", "", "PIIiv", ""
);
Platform.Function.UpsertData(
    "ContactsSecure",
    ["SubscriberKey"],
    [subscriberKey],
    ["PhoneEncrypted", "UpdatedAt"],
    [encPhone, Platform.Function.Now()]
);

// --- Read path (e.g. personalisation script) ---
var encPhone = Platform.Function.Lookup(
    "ContactsSecure", "PhoneEncrypted", "SubscriberKey", subscriberKey
);
if (encPhone) {
    var phone = decryptSymmetric(
        encPhone, "AES", "PIIKey", "", "PIIiv", ""
    );
    Write("Phone: " + phone);
}

function decryptSymmetric(encryptedString, algorithm, passwordKey, passwordValue,saltKey, saltValue, vectorKey, vectorValue) {
    Platform.Variable.SetValue("@decrypt_string", encryptedString);
    Platform.Variable.SetValue("@decrypt_algo",algorithm);
    Platform.Variable.SetValue("@decrypt_pw",passwordValue || "");
    Platform.Variable.SetValue("@decrypt_salt",saltValue || "");
    Platform.Variable.SetValue("@decrypt_vector",vectorValue || "");
    return TreatAsContent("%%=DecryptSymmetric(@decrypt_string, @decrypt_algo, @null,@decrypt_pw, @null, @decrypt_salt, @null, @decrypt_vector)=%%");
}
```

---

## Hashing (Non-Reversible)

For values that only need to be compared (passwords, tokens), prefer a hash rather than encryption:

```javascript
// SHA-256 hash — cannot be reversed
var hashed = rawValue + "";

// Store the hash
Platform.Function.UpsertData(
    "TokenStore",
    ["Token"],
    [hashed],
    ["SubscriberKey", "CreatedAt"],
    [subscriberKey, Platform.Function.Now()]
);

// Verify: hash the submitted value and compare
var submittedHash = submittedValue + "";
var match = Platform.Function.Lookup("TokenStore", "SubscriberKey", "Token", submittedHash);
if (match) {
    Write("Token valid for: " + match);
}
```

---

## Notes

{% include callout.html type="warning" content="Always manage keys in **SFMC Key Management** (Setup → Security → Key Management). Never hard-code key material in scripts or store it in Data Extensions." %}

- Key names in `EncryptSymmetric` / `DecryptSymmetric` refer to the **external key** (name) of the key registered in Key Management, not the key value itself.
- `EncryptSymmetric` and `DecryptSymmetric` are available in all SFMC execution contexts (Email, Cloud Page, Automation, Triggered Send).
- For hashing without the need for decryption, prefer AMPscript's `SHA256` over encryption.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/best-practices/security/">Security Best Practices</a></li>
</ul>
</div>
