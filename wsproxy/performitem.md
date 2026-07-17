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
verification: verified
differs_from_docs: true
---

SFMC exposes SOAP **Perform** for lifecycle actions. WSProxy surfaces this as **`performItem`** for one target row and **`performBatch`** for many (see [`proxy.performBatch`](/wsproxy/performbatch/)).

There is **no** method named `proxy.perform` — older samples used informal shorthand.

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `properties` | object | Yes | Fields identifying the target (e.g. `{ CustomerKey: "..." }` or `{ ObjectID: "..." }`) |
| `action` | string | Yes | Perform verb, typically `"Start"`. Case-insensitive at runtime (`"start"` works identically to `"Start"`) |
| `performOptions` | object | No | SOAP `PerformOptions` |

{% include differs-from-docs.html note="The official docs type `action` as `Enum('Start')` and this page previously claimed lowercase `\"start\"` fails, but the runtime accepts the verb case-insensitively — `\"start\"` returns the same `Status: \"OK\"` as `\"Start\"`." %}

## Return value

Object with `Status` (string, `"OK"` on success), `StatusMessage` (string, empty on success), `RequestID` (string), and `Results` (an array with a single entry for the acted-on item). Each `Results` element carries `StatusCode`, `StatusMessage` (e.g. `"QueryDefinition perform called successfully"`), `OrdinalID`, `ErrorCode`, an `Object` (the acted-on API object), and a `Task` sub-object (`StatusCode`, `StatusMessage`, `ID`, `TblAsyncID`, `InteractionObjectID`).

{% include differs-from-docs.html note="The official docs list only `Status`, `StatusMessage`, `RequestID`, and `Results` and do not detail the per-item `Results[0]` structure (`StatusCode`, `ErrorCode`, `Object`, and the `Task` sub-object with `InteractionObjectID`) proven at runtime." %}

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
