---
layout: function
title: <WSProxyInstance>.setClientId
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/setclientid/
redirect_from:
  - /wsproxy/set-client-id/
description: Set the Business Unit client ID for WSProxy operations — allows parent BU scripts to operate on child BU data.
syntax: "<WSProxyInstance>.setClientId(options)"
return_type: "null"
min_args: 1
max_args: 1
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `options` | object | Yes | Object with the target ClientId properties; supply the MID under the `ID` key (and optionally `UserID`). |

The `options` object keys:

| Key | Type | Required | Description |
|------|------|----------|-------------|
| `ID` | number \| string | No* | The MID (Member ID) of the target Business Unit. A numeric string targets the same MID as the equivalent number. |
| `UserID` | number | No | Internal ID of a user to impersonate. Rarely used. |

*At least one of `ID` / `UserID` should be supplied.

{% include test-script.html bundle="wsproxy--setclientid" chapter="parameters" %}

{% include differs-from-docs.html note="The official docs type `setClientId` as returning `void`, but at runtime it returns a genuine `null` (`=== null`), not `undefined`." %}

{% include test-script.html bundle="wsproxy--setclientid" chapter="null-return" label="Show test script — null return, not void" %}

## Examples

### Operate on a child BU from parent

```javascript
var proxy = new Script.Util.WSProxy();

// Switch context to child BU with MID 123456 (fake)
proxy.setClientId({ ID: 123456 });

// All subsequent operations target the child BU
var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
var des = result.Results;
```

### Iterate over multiple BUs

```javascript
var proxy = new Script.Util.WSProxy();
var businessUnits = [
    { name: "US", mid: 123456 },
    { name: "EU", mid: 234567 },
    { name: "APAC", mid: 345678 }
];

for (var i = 0; i < businessUnits.length; i++) {
    proxy.setClientId({ ID: businessUnits[i].mid });
    var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
    Write(businessUnits[i].name + ": " + result.Results.length + " DEs<br>");
}
```

{% include test-script.html bundle="wsproxy--setclientid" chapter="examples" %}

## Return Value

`null` — the runtime returns a genuine `null` (proven `=== null`), even though the official docs describe it as `void`.

{% include test-script.html bundle="wsproxy--setclientid" chapter="return-value" %}

## Notes

{% include callout.html type="warning" content="`setClientId` itself is accepted from **any** Business Unit and always returns `null` — the call is never rejected. Whether the **subsequent** operation succeeds depends on the executing Business Unit: from a **parent Business Unit**, operations against the account's other Business Units succeed; from a **child Business Unit**, the only MID that works is its **own**. A child BU cannot reach its parent, and it cannot reach a sibling child BU either — both were runtime-tested with real MIDs and both are denied. Every denial returns a SOAP status naming the executing MID and the requested one (`MemberID &lt;executing&gt; does not have access to ClientID: ID[&lt;target&gt;]`). So cross-BU work with `setClientId` has to run from a parent Business Unit." %}

Find the MID for a BU in: Setup → Account Settings → Business Units → (select BU) → MID column.

{% include test-script.html bundle="wsproxy--setclientid" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/constructor/">WSProxy Constructor</a></li>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
</ul>
</div>
