---
layout: function
title: TreatAsContent
parent: Global Functions
parent_url: /global-functions/
description: Evaluates a string containing AMPscript or HTML on the SFMC server and returns the rendered result. Security warning — never pass unvalidated user input.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "TreatAsContent(content)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | String containing AMPscript or HTML to evaluate server-side. |

## Description

`TreatAsContent()` submits a string to the SFMC template rendering engine for evaluation. Any AMPscript or HTML in the string is processed and the result returned.

This is primarily used to invoke AMPscript functions from SSJS context — functions like `EncryptSymmetric`, `DecryptSymmetric`, `URLEncode` (with encoding options), and others that have no direct SSJS equivalent.

> **Security warning:** Never pass user-supplied input directly to `TreatAsContent()`. Since it evaluates AMPscript, an attacker could inject AMPscript code that reads Data Extensions, subscriber attributes, or other sensitive data. Always use `Variable.SetValue()` to safely pass values into an AMPscript expression.

## The Safe Pattern

```javascript
// ❌ Unsafe — user input could contain AMPscript
var userInput = Platform.Request.GetFormData("name");
TreatAsContent("%%[Set @result = Format(@userInput)]%%");

// ✅ Safe — set the value via Variable.SetValue first, reference by variable name
Variable.SetValue("@inputVal", userInput);
TreatAsContent("%%[Set @result = Format(@inputVal, \"text\")]%%");
var result = Variable.GetValue("@result");
```

## Examples

### Call AMPscript functions unavailable in SSJS

```javascript
// Decrypt a value using AMPscript's DecryptSymmetric
TreatAsContent(
    '%%[Set @decrypted = DecryptSymmetric(@encryptedValue, "AES", ' +
    '@empty, "myPassword", @empty, "mySalt", @empty, "myIV")]%%'
);
var decrypted = Variable.GetValue("@decrypted");
```

or

```js
function decryptSymmetric(encryptedString, algorithm, passwordKey, passwordValue,saltKey, saltValue, vectorKey, vectorValue) {
    Platform.Variable.SetValue("@decrypt_string", encryptedString);
    Platform.Variable.SetValue("@decrypt_algo",algorithm);
    Platform.Variable.SetValue("@decrypt_pw",passwordValue || "");
    Platform.Variable.SetValue("@decrypt_salt",saltValue || "");
    Platform.Variable.SetValue("@decrypt_vector",vectorValue || "");
    return TreatAsContent("%%=DecryptSymmetric(@decrypt_string, @decrypt_algo, @null,@decrypt_pw, @null, @decrypt_salt, @null, @decrypt_vector)=%%");
}
```

### URLEncode with extra options

```javascript
Variable.SetValue("@valueToEncode", myValue);
TreatAsContent("%%[Set @encoded = URLEncode(@valueToEncode, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

### Execute complex AMPscript logic

```javascript
Variable.SetValue("@subscriberKey", sk);
TreatAsContent(
    "%%[" +
    "  Set @email = Lookup('Subscribers', 'Email', 'SubscriberKey', @subscriberKey) " +
    "  Set @isVIP = Lookup('VIPList', 'IsVIP', 'Email', @email) " +
    "]%%"
);
var email = Variable.GetValue("@email");
var isVIP = Variable.GetValue("@isVIP");
```

## Notes

The global `TreatAsContent()` is identical to `Platform.Function.TreatAsContent()`. It doesn't return the rendered output — use `Variable.GetValue()` to retrieve values set inside the AMPscript block.

**ESLint rule:** `sfmc/ssjs-no-treatascontent-injection` warns when the argument to `TreatAsContent` contains string concatenation with variables (injection risk).

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/variable/">Variable (global)</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent</a></li>
  <li><a href="/recipes/ampscript-bridge/">AMPscript Bridge recipe</a></li>
  <li><a href="/best-practices/security/">Security</a></li>
</ul>
</div>
