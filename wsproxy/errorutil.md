---
layout: page
title: ErrorUtil
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/errorutil/
redirect_from:
  - /platform-objects/errorutil/
verification: verified
test_scripts: complete
differs_from_docs: true
description: Throw when a WSProxy result indicates failure so try/catch can handle SOAP-level errors. Deprecated in newer Core versions.
---

{% include callout.html type="caution" content="<strong>Deprecated / version-locked.</strong> Runtime testing shows <code>ErrorUtil</code> is provided <strong>only</strong> by <code>Platform.Load(\"Core\", \"1\")</code>. Under newer Core versions (<code>1.1.1</code>, <code>1.1.5</code>) <code>ErrorUtil</code> is <code>undefined</code> and calling <code>ErrorUtil.ThrowWSProxyError()</code> throws a <code>TypeError</code> (<code>Object expected: ThrowWSProxyError</code>). Prefer the <code>result.Status</code> check shown below, which works on every Core version." %}

{% include test-script.html bundle="wsproxy--errorutil" chapter="core-version-lock" label="Show test script — ErrorUtil is undefined on newer Core versions" %}

WSProxy methods return a **result object** with a `Status` field instead of throwing on many SOAP failures. Historically `ErrorUtil.ThrowWSProxyError(result)` inspected that status and threw when the call failed, so you could use ordinary `try` / `catch` flow.

## Recommended replacement (works on any Core version)

Check `result.Status` yourself and throw a standard [`Error`](/ecmascript-builtins/error/):

```javascript
var api = new Script.Util.WSProxy();
var customerKey = "00000000-0000-0000-0000-000000000001";

try {
    var result = api.retrieve(
        "DataExtensionObject[" + customerKey + "]",
        ["FirstName", "LastName", "EmailAddress"]
    );
    if (String(result.Status).indexOf("Error") === 0) {
        throw new Error(String(result.Status));
    }
    // success path — use result.Results
} catch (ex) {
    Write(String(ex));
}
```

{% include test-script.html bundle="wsproxy--errorutil" chapter="recommended-replacement" %}

## ThrowWSProxyError {#throwwsproxyerror}

Legacy — only under `Platform.Load("Core", "1")`.

```javascript
ErrorUtil.ThrowWSProxyError(result);
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `result` | object | Yes | Any WSProxy return value (`retrieve`, `performItem`, `createItem`, etc.). Minimum shape includes `Status`, `RequestID`, and `Results`. |

Returns the `Status` string (e.g. `"OK"`) when `Status` indicates success; throws when status indicates an error. **Only available under `Platform.Load("Core", "1")`.** When it throws on a real WSProxy error, the thrown value is a plain **string** (e.g. `"Error: Data extension does not exist: …"`), not an `Error` object — read it with `String(ex)`; `ex.message` and `ex.description` are `undefined`.

{% include test-script.html bundle="wsproxy--errorutil" chapter="throwwsproxyerror" %}

## See Also

- [WSProxy overview](/wsproxy/)
- [proxy.retrieve](/wsproxy/retrieve/)
- [Error](/ecmascript-builtins/error/)
