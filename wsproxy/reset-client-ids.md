---
layout: function
title: <WSProxyInstance>.resetClientIds
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/resetclientids/
redirect_from:
  - /wsproxy/reset-client-ids/
description: Reset the Business Unit context previously set by setClientId — subsequent operations target the script's own BU again.
syntax: "<WSProxyInstance>.resetClientIds()"
return_type: "null"
min_args: 0
max_args: 0
verification: verified
differs_from_docs: true
test_scripts: complete
---

`proxy.resetClientIds()` clears any Business Unit context set by a previous [`proxy.setClientId()`](/wsproxy/setclientid/) call. After resetting, all WSProxy operations target the BU the script is running in.

## Parameters

None.

{% include test-script.html bundle="wsproxy--reset-client-ids" chapter="parameters" %}

## Return Value

`null`. Runtime-verified: `resetClientIds()` returns a genuine `null` value (`=== null`), not `undefined`.

{% include differs-from-docs.html note="The official docs describe `resetClientIds()` as returning void, but at runtime it returns a genuine `null` (`=== null`), not `undefined`." %}

{% include test-script.html bundle="wsproxy--reset-client-ids" chapter="null-return" label="Show test script — null return, not void" %}

{% include test-script.html bundle="wsproxy--reset-client-ids" chapter="return-value" %}

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

{% include test-script.html bundle="wsproxy--reset-client-ids" chapter="examples" %}

## Notes

{% include callout.html type="note" content="Call `resetClientIds()` after finishing any cross-BU operations. Leaving the client ID set for the remainder of a script's execution can cause later WSProxy calls to target the wrong BU." %}

{% include test-script.html bundle="wsproxy--reset-client-ids" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/setclientid/">proxy.setClientId</a></li>
  <li><a href="/wsproxy/constructor/">WSProxy Constructor</a></li>
</ul>
</div>
