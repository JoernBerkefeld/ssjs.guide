---
layout: function
title: <WSProxyInstance>.deleteBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/deletebatch/
redirect_from:
  - /wsproxy/delete-batch/
description: Delete multiple SFMC objects of the same type in one SOAP call (batch counterpart of deleteItem).
syntax: "<WSProxyInstance>.deleteBatch(objectType, propertiesArray[, deleteOptions])"
return_type: object
min_args: 2
max_args: 3
verification: verified
---

Deletes several objects in a single API round-trip. For **one** object, use [`proxy.deleteItem`](/wsproxy/deleteitem/).

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `propertiesArray` | object[] | Yes | Array of property objects identifying each object to delete |
| `deleteOptions` | object | No | Optional SOAP `DeleteOptions` object (e.g. `RequestType`, `QueuePriority`) |

## Return value

Object with `Status`, `RequestID`, and `Results`. `Status` and `RequestID` are strings; `Results` is an array with one entry per input object. Each `Results` entry carries `StatusCode`, `StatusMessage`, `ErrorCode`, `OrdinalID`, and `Object`. There is no top-level `StatusMessage`.

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

- [`proxy.deleteItem`](/wsproxy/deleteitem/)
- [`proxy.createBatch`](/wsproxy/createbatch/)
- [`proxy.updateBatch`](/wsproxy/updatebatch/)
