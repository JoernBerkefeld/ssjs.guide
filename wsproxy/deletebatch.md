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
test_scripts: complete
---

Deletes several objects in a single API round-trip. For **one** object, use [`proxy.deleteItem`](/wsproxy/deleteitem/).

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `propertiesArray` | object[] | Yes | Array of property objects identifying each object to delete |
| `deleteOptions` | object | No | Optional SOAP `DeleteOptions` object (e.g. `RequestType`, `QueuePriority`) |

{% include test-script.html bundle="wsproxy--deletebatch" chapter="parameters" %}

## Return value

Object with `Status`, `RequestID`, and `Results`. `Status` and `RequestID` are strings; `Results` is an array with one entry per input object. Each `Results` entry carries `StatusCode`, `StatusMessage`, `ErrorCode`, `OrdinalID`, and `Object`. There is no top-level `StatusMessage`.

`Status` is `"OK"` when every object was deleted and `"Error"` when at least one was not — a failed object does not throw, it comes back with `StatusCode: "Error"`, a diagnostic `StatusMessage` and a non-zero `ErrorCode`.

{% include test-script.html bundle="wsproxy--deletebatch" chapter="return-value" %}

## Example

For a `DataExtensionObject`, identify each row with `CustomerKey` plus a flat `Keys` array of `{ Name, Value }` pairs.

```javascript
var proxy = new Script.Util.WSProxy();
var items = [
    {
        CustomerKey: "MyDE",
        Keys: [{ Name: "Email", Value: "old@example.com" }]
    }
];
var result = proxy.deleteBatch("DataExtensionObject", items);
Write(result.Status);
```

{% include callout.html type="warning" content="The nested <code>Keys: { Key: [...] }</code> form and the bracketed <code>DataExtensionObject[MyDE]</code> objectType both throw <code>Error executing delete call.</code> Use the flat <code>Keys</code> array together with a <code>CustomerKey</code> property instead — the same rule applies to proxy.deleteItem." %}

{% include test-script.html bundle="wsproxy--deletebatch" chapter="example" %}

## See Also

- [`proxy.deleteItem`](/wsproxy/deleteitem/)
- [`proxy.createBatch`](/wsproxy/createbatch/)
- [`proxy.updateBatch`](/wsproxy/updatebatch/)
