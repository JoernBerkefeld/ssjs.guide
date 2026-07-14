---
layout: page
title: ErrorUtil
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/errorutil/
redirect_from:
  - /platform-objects/errorutil/
description: Throw when a WSProxy result indicates failure so try/catch can handle SOAP-level errors. Requires the Core library.
---

WSProxy methods return a **result object** with a `Status` field instead of throwing on many SOAP failures. `ErrorUtil.ThrowWSProxyError(result)` inspects that status and throws when the call failed, so you can use ordinary `try` / `catch` flow.

{% include callout.html type="warning" content="Requires <code>Platform.Load(\"core\", \"1.1.5\")</code> before use." %}

## Syntax

```javascript
ErrorUtil.ThrowWSProxyError(result);
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `result` | object | Yes | Any WSProxy return value (`retrieve`, `performItem`, `createItem`, etc.). Minimum shape includes `Status`, `RequestID`, and `Results`. |

Returns nothing when `Status` indicates success; throws when status indicates an error.

## Example

```javascript
Platform.Load("core", "1.1.5");

var api = new Script.Util.WSProxy();
var customerKey = "00000000-0000-0000-0000-000000000001";

try {
    var result = api.retrieve(
        "DataExtensionObject[" + customerKey + "]",
        ["FirstName", "LastName", "EmailAddress"]
    );
    ErrorUtil.ThrowWSProxyError(result);
    // success path — use result.Results
} catch (ex) {
    Write(Stringify(ex));
}
```

## See Also

- [WSProxy overview](/wsproxy/)
- [proxy.retrieve](/wsproxy/retrieve/)
