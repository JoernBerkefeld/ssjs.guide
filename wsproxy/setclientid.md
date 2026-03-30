---
layout: page
title: proxy.setClientId
parent: WSProxy
parent_url: /wsproxy/
description: Set the Business Unit client ID for WSProxy operations — allows parent BU scripts to operate on child BU data.
---

## Syntax

```javascript
proxy.setClientId({ ID: clientId });
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `clientId` | number | Yes | The MID (Member ID) of the target Business Unit |

## Examples

### Operate on a child BU from parent

```javascript
var proxy = new Script.Util.WSProxy();

// Switch context to child BU with MID 123456
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

## Notes

{% include callout.html type="warning" content="`setClientId` can only be used from a **parent Business Unit** or **Enterprise** account. Child BU scripts cannot use `setClientId` to access other BUs." %}

Find the MID for a BU in: Setup → Account Settings → Business Units → (select BU) → MID column.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/constructor/">WSProxy Constructor</a></li>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
</ul>
</div>
