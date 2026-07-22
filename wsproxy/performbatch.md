---
layout: function
title: <WSProxyInstance>.performBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/performbatch/
redirect_from:
  - /wsproxy/perform-batch/
description: Run a SOAP Perform action against multiple objects of the same type in one call (parallel to performItem for a single object).
syntax: "<WSProxyInstance>.performBatch(objectType, propertiesArray, action[, performOptions])"
return_type: object
min_args: 3
max_args: 4
verification: verified
differs_from_docs: true
---

Performs the same action on **multiple** rows/objects in one SOAP request. For a **single** object, use [`<WSProxyInstance>.performItem`](/wsproxy/performitem/).

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `propertiesArray` | object[] | Yes | One property object per target row (identify each item, e.g. `ObjectID`) |
| `action` | string | Yes | The perform verb, typically `"Start"`. Runtime-verified as **case-insensitive** — `"start"` behaves identically to `"Start"` |
| `performOptions` | object | No | SOAP `PerformOptions` fields |

{% include differs-from-docs.html note="The official docs list `action` as `Enum('Start')` without noting case behaviour; at runtime the verb is case-insensitive, and each `Results` entry carries a `Task` sub-object plus per-item `StatusCode`/`StatusMessage` not detailed in the docs." %}

## Return value

Object with `Status` (`"OK"` on success), `StatusMessage` (empty on success), `RequestID`, and `Results` — an array with one entry per input item. Each `Results` entry carries `StatusCode`, `StatusMessage`, `OrdinalID`, `ErrorCode`, an `Object` wrapper (the acted-on API object) and a `Task` sub-object (with `StatusCode`, `StatusMessage`, `InteractionObjectID`).

## Example

```javascript
var proxy = new Script.Util.WSProxy();
var items = [{ ObjectID: id1 }, { ObjectID: id2 }];
var result = proxy.performBatch("QueryDefinition", items, "Start");
Write(result.Status);
```

## See Also

- [`<WSProxyInstance>.performItem`](/wsproxy/performitem/) — single-object perform
