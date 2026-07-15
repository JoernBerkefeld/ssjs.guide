---
layout: function
title: TreatAsContent
parent: Platform Functions
parent_url: /platform-functions/
description: Evaluates a string containing AMPscript or HTML on the SFMC server and returns the rendered result. Security warning — never pass unvalidated user input.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.TreatAsContent(content)"
return_type: string
min_args: 1
max_args: 1
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | String containing AMPscript or HTML to evaluate server-side. |

## Description

`Platform.Function.TreatAsContent()` submits a string to the SFMC template rendering engine for evaluation. Any AMPscript or HTML in the string is processed and the result returned.

This is primarily used to invoke AMPscript functions from SSJS context — functions like `EncryptSymmetric`, `DecryptSymmetric`, `URLEncode` (with encoding options), and others that have no direct SSJS equivalent.

> **Security warning:** Never pass user-supplied input directly to `Platform.Function.TreatAsContent()`. Since it evaluates AMPscript, an attacker could inject AMPscript code that reads Data Extensions, subscriber attributes, or other sensitive data. Always use `Variable.SetValue()` to safely pass values into an AMPscript expression.

## The Safe Pattern

```javascript
// ❌ Unsafe — user input could contain AMPscript
var userInput = Platform.Request.GetFormField("name");
Platform.Function.TreatAsContent("%%[Set @result = Format(@userInput)]%%");

// ✅ Safe — set the value via Variable.SetValue first, reference by variable name
Variable.SetValue("@inputVal", userInput);
Platform.Function.TreatAsContent("%%[Set @result = Format(@inputVal, \"text\")]%%");
var result = Variable.GetValue("@result");
```

## Examples

### Call AMPscript functions unavailable in SSJS

```javascript
// Decrypt a value using AMPscript's DecryptSymmetric
Platform.Function.TreatAsContent(
    '%%[Set @decrypted = DecryptSymmetric(@encryptedValue, "AES", ' +
    '@empty, "myPassword", @empty, "mySalt", @empty, "myIV")]%%'
);
var decrypted = Variable.GetValue("@decrypted");
```

or

```js
function decryptSymmetric(encryptedString, algorithm, passwordKey, passwordValue, saltKey, saltValue, vectorKey, vectorValue) {
    Platform.Variable.SetValue("@decrypt_string", encryptedString);
    Platform.Variable.SetValue("@decrypt_algo", algorithm);
    Platform.Variable.SetValue("@decrypt_pw", passwordValue || "");
    Platform.Variable.SetValue("@decrypt_salt", saltValue || "");
    Platform.Variable.SetValue("@decrypt_vector", vectorValue || "");
    return Platform.Function.TreatAsContent("%%=DecryptSymmetric(@decrypt_string, @decrypt_algo, @null,@decrypt_pw, @null, @decrypt_salt, @null, @decrypt_vector)=%%");
}
```

### URLEncode with extra options

```javascript
Variable.SetValue("@valueToEncode", myValue);
Platform.Function.TreatAsContent("%%[Set @encoded = URLEncode(@valueToEncode, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

### Execute complex AMPscript logic

```javascript
Variable.SetValue("@subscriberKey", sk);
Platform.Function.TreatAsContent(
    "%%[" +
    "  Set @email = Lookup('Subscribers', 'Email', 'SubscriberKey', @subscriberKey) " +
    "  Set @isVIP = Lookup('VIPList', 'IsVIP', 'Email', @email) " +
    "]%%"
);
var email = Variable.GetValue("@email");
var isVIP = Variable.GetValue("@isVIP");
```

## Notes

`Platform.Function.TreatAsContent()` returns the rendered output **directly** as a string — inline AMPscript such as `%%=Add(2,3)=%%` comes back in the return value (e.g. `"5"`). A **block-only** string (`%%[ ... ]%%` with no inline output) renders to an **empty string**, so when you only run a block to set variables, retrieve those values afterwards with `Variable.GetValue()` instead of reading the return value. Variable side effects persist across calls, and the function does not require `Platform.Load("core")`. Non-string arguments are coerced to string; calling with zero or two-plus arguments throws.

**ESLint rule:** `sfmc/ssjs-no-treatascontent-injection` warns when the argument to `TreatAsContent` contains string concatenation with variables (injection risk).

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/variable/">Variable (bare-name Core form)</a></li>
  <li><a href="/recipes/ampscript-bridge/">AMPscript Bridge recipe</a></li>
  <li><a href="/best-practices/security/">Security</a></li>
</ul>
</div>
