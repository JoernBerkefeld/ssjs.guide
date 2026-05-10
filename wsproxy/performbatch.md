---
layout: page
title: proxy.performBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/perform-batch/
description: Run a SOAP Perform action against multiple objects of the same type in one call (parallel to performItem for a single object).
---

Performs the same action on **multiple** rows/objects in one SOAP request. For a **single** object, use [`proxy.performItem`](/wsproxy/perform/).

## Syntax

```javascript
var result = proxy.performBatch(objectType, propertiesArray, action[, performOptions]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `propertiesArray` | object[] | Yes | One property object per target row (identify each item, e.g. `ObjectID`) |
| `action` | string | Yes | Must be `"Start"` (lowercase `"start"` fails) |
| `performOptions` | object | No | SOAP `PerformOptions` fields |

## Return value

Object with `Status`, `StatusMessage`, `RequestID`, and `Results` (one entry per input item when successful).

## Example

```javascript
var proxy = new Script.Util.WSProxy();
var items = [{ ObjectID: id1 }, { ObjectID: id2 }];
var result = proxy.performBatch("QueryDefinition", items, "Start");
Write(result.Status);
```

## See Also

- [`proxy.performItem`](/wsproxy/perform/) — single-object perform
