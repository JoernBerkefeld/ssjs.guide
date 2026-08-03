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
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | String containing AMPscript or HTML to evaluate server-side. |

{% include test-script.html bundle="platform-functions--treatascontent" chapter="parameters" %}

## Description

`Platform.Function.TreatAsContent()` submits a string to the SFMC template rendering engine for evaluation. Any AMPscript or HTML in the string is processed and the result returned.

This is primarily used to invoke AMPscript functions from SSJS context — functions like `EncryptSymmetric`, `DecryptSymmetric`, `URLEncode` (with encoding options), and others that have no direct SSJS equivalent.

The evaluated string is **returned**, not written to the response — the result must be captured and written yourself. Nothing in it is escaped or sanitised: HTML tags, `<script>` elements, pre-encoded entities and quote characters all come back byte-for-byte.

> **Security warning:** Never pass user-supplied input directly to `Platform.Function.TreatAsContent()`. Since it evaluates AMPscript, an attacker could inject AMPscript code that reads Data Extensions, subscriber attributes, or other sensitive data. Always use `Variable.SetValue()` to safely pass values into an AMPscript expression.

> **⚠ Scope of the evidence — CloudPage only.** Every runtime observation behind this page's test scripts comes from plain `GET` requests against a CloudPage. AMPscript content evaluation can differ by rendering context, so treat the behaviour inside a real email send as **untested**.

{% include test-script.html bundle="platform-functions--treatascontent" chapter="description" %}

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

{% include test-script.html bundle="platform-functions--treatascontent" chapter="the-safe-pattern" %}

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

### Reaching functions that SSJS cannot call directly

Several documented functions have **no working direct SSJS invocation** and are reachable only by emitting their AMPscript form through this function — see [`BeginImpressionRegion`](/platform-functions/beginimpressionregion/) and the [`ContentBlockByName`](/platform-functions/contentblockbyname/) family:

```javascript
// impression regions: the direct SSJS call throws, the AMPscript form works
Platform.Function.TreatAsContent('%%[BeginImpressionRegion("hero")]%%');
Write(heroHtml);
Platform.Function.EndImpressionRegion();

// a dynamic name still works — splice it into the AMPscript SOURCE so the
// AMPscript parser sees a literal token
var region = "promo-" + slotIndex;
Platform.Function.TreatAsContent('%%[BeginImpressionRegion("' + region + '")]%%');
```

{% include test-script.html bundle="platform-functions--treatascontent" chapter="examples" %}

## Notes

`Platform.Function.TreatAsContent()` returns the rendered output **directly** as a string — inline AMPscript such as `%%=Add(2,3)=%%` comes back in the return value (e.g. `"5"`). It never writes to the response itself. A **block-only** string (`%%[ ... ]%%` with no inline output) renders to an **empty string**, so when you only run a block to set variables, retrieve those values afterwards with `Variable.GetValue()` instead of reading the return value. Variable side effects persist across calls, and the function does not require `Platform.Load("core")` — though the bare-name form `TreatAsContent()` does.

**Argument coercion.** Scalar non-string arguments are coerced to string: a number renders as its digits, `null` and `undefined` render to the empty string, and booleans coerce with .NET capitalisation — `true` becomes `"True"`, not `"true"`. An **array** is *not* coerced: it throws, as does calling with zero or two-plus arguments.

**Errors in the evaluated AMPscript are catchable.** An unterminated block, an unknown AMPscript function, wrong argument types and an explicit `RaiseError()` all raise a normal JavaScript exception reading `An error occurred when attempting to evaluate a TreatAsContent function call.` — the page is not aborted and no error string is rendered into the result, so a `try`/`catch` around the call works. Not every malformed input is an error, though: a lone `]%%` is swallowed and yields the empty string, and an unterminated *inline* expression is passed through as literal text.

> **Writing your own probes:** an AMPscript delimiter written literally inside a CloudPage script is consumed by the page's own AMPscript pre-processor before the SSJS engine ever sees it, and an *unbalanced* one aborts the whole page with HTTP 422 — uncatchably. Build the delimiters from fragments (`var PCT = "%" + "%";`) when the string you evaluate must contain them.

**ESLint rule:** `sfmc/ssjs-no-treatascontent-injection` warns when the argument to `TreatAsContent` contains string concatenation with variables (injection risk).

{% include test-script.html bundle="platform-functions--treatascontent" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/variable/">Variable (bare-name Core form)</a></li>
  <li><a href="/recipes/ampscript-bridge/">AMPscript Bridge recipe</a></li>
  <li><a href="/best-practices/security/">Security</a></li>
</ul>
</div>
