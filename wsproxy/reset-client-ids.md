---
layout: page
title: proxy.resetClientIds
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/reset-client-ids/
description: Reset the Business Unit context previously set by setClientId — subsequent operations target the script's own BU again.
---

`proxy.resetClientIds()` clears any Business Unit context set by a previous [`proxy.setClientId()`](/wsproxy/set-client-id/) call. After resetting, all WSProxy operations target the BU the script is running in.

## Syntax

```javascript
proxy.resetClientIds();
```

## Parameters

None.

## Return Value

`undefined`.

## Examples

### Switch BU, then reset

```javascript
var proxy = new Script.Util.WSProxy();

// Target child BU
proxy.setClientId({ ID: 123456 });
var childResult = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);

// Restore own BU context before continuing
proxy.resetClientIds();
var ownResult = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
```

### Iterate over multiple BUs, then restore context

```javascript
var proxy = new Script.Util.WSProxy();
var businessUnits = [
    { name: "US", mid: 111111 },
    { name: "EU", mid: 222222 }
];

for (var i = 0; i < businessUnits.length; i++) {
    proxy.setClientId({ ID: businessUnits[i].mid });
    var result = proxy.retrieve("DataExtension", ["Name"]);
    Write(businessUnits[i].name + ": " + result.Results.length + " DEs<br>");
}

// Always reset after iterating to avoid unintended cross-BU side effects
proxy.resetClientIds();
```

## Notes

{% include callout.html type="note" content="Call `resetClientIds()` after finishing any cross-BU operations. Leaving the client ID set for the remainder of a script's execution can cause later WSProxy calls to target the wrong BU." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/set-client-id/">proxy.setClientId</a></li>
  <li><a href="/wsproxy/constructor/">WSProxy Constructor</a></li>
</ul>
</div>
