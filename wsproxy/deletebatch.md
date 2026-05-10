---
layout: page
title: proxy.deleteBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/delete-batch/
description: Delete multiple SFMC objects of the same type in one SOAP call (batch counterpart of deleteItem).
---

Deletes several objects in a single API round-trip. For **one** object, use [`proxy.deleteItem`](/wsproxy/delete-item/).

## Syntax

```javascript
var result = proxy.deleteBatch(objectType, propertiesArray);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `propertiesArray` | object[] | Yes | Array of property objects identifying each row to delete |

## Return value

Object with `Status`, `StatusMessage`, `RequestID`, and `Results`.

## Example

```javascript
var proxy = new Script.Util.WSProxy();
var items = [
    {
        CustomerKey: "MyDE",
        Keys: { Key: [{ Name: "Email", Value: "old@example.com" }] }
    }
];
var result = proxy.deleteBatch("DataExtensionObject", items);
Write(result.Status);
```

## See Also

- [`proxy.deleteItem`](/wsproxy/delete-item/)
- [`proxy.createBatch`](/wsproxy/create-batch/)
- [`proxy.updateBatch`](/wsproxy/update-batch/)
