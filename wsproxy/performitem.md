---
layout: function
title: <WSProxyInstance>.performItem
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/performitem/
redirect_from:
  - /wsproxy/perform/
description: Run a SOAP Perform action on one SFMC object (start automations, query activities, and other perform-capable types).
syntax: "<WSProxyInstance>.performItem(objectType, properties, action[, performOptions])"
return_type: object
min_args: 3
max_args: 4
---

SFMC exposes SOAP **Perform** for lifecycle actions. WSProxy surfaces this as **`performItem`** for one target row and **`performBatch`** for many (see [`proxy.performBatch`](/wsproxy/performbatch/)).

There is **no** method named `proxy.perform` — older samples used informal shorthand.

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Fields identifying the target (e.g. `{ CustomerKey: "..." }` or `{ ObjectID: "..." }`) |
| `action` | string | Yes | Must be `"Start"` where applicable (lowercase `"start"` fails) |
| `performOptions` | object | No | SOAP `PerformOptions` |

## Return value

Object with `Status`, `StatusMessage`, `RequestID`, and `Results`.

## Examples

### Start a Query Definition

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.performItem(
    "QueryDefinition",
    { ObjectID: queryObjectId },
    "Start"
);
Write(result.Status);
```

### Start an Automation (example shape)

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.performItem(
    "Automation",
    { CustomerKey: "MyAutomation_Key" },
    "Start"
);
```

Use the SOAP object type and property shape required for that object (see SFMC SOAP docs for valid `action` values per type).

## See Also

- [`proxy.performBatch`](/wsproxy/performbatch/)
- [`proxy.execute`](/wsproxy/execute/) — different API (`LogUnsubEvent`, etc.)
