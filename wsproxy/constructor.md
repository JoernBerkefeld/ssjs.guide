---
layout: page
title: new Script.Util.WSProxy()
parent: WSProxy
parent_url: /wsproxy/
description: Creates a new WSProxy instance for interacting with the SFMC SOAP API. No arguments required.
---

## Syntax

```javascript
var proxy = new Script.Util.WSProxy();
```

Creates a new WSProxy instance. No arguments are needed. The proxy automatically authenticates using the current SFMC account credentials.

## Examples

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
```

## Notes

### No Platform.Load Required

WSProxy does not require `Platform.Load("core", "1.1.5")`. It is available as `Script.Util.WSProxy` in all SSJS contexts.

### Single Instance is Fine

You can create one proxy instance and reuse it for multiple operations in the same script block.

### Business Unit Context

By default, WSProxy operates in the context of the currently executing Business Unit. Use `proxy.setClientId()` to switch to a parent or child BU.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
  <li><a href="/wsproxy/set-client-id/">proxy.setClientId</a></li>
</ul>
</div>
