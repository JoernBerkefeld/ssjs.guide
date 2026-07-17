---
layout: function
title: <WSProxyInstance>.updateBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/updatebatch/
redirect_from:
  - /wsproxy/update-batch/
description: Update multiple SFMC objects in a single SOAP API call for better performance than looping proxy.updateItem().
syntax: "<WSProxyInstance>.updateBatch(objectType, propertiesArray[, updateOptions])"
return_type: object
min_args: 2
max_args: 3
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `propertiesArray` | object[] | Yes | Array of update property objects |
| `updateOptions` | object | No | SOAP `UpdateOptions` (e.g. `{ SaveOptions: [{ PropertyName: "*", SaveAction: "UpdateAdd" }] }`) |

## Return Value

Returns an object with `Status` (e.g. `"OK"`), `RequestID`, and a `Results` array containing one entry per input item. Each `Results` entry carries `StatusCode`, `StatusMessage`, `OrdinalID`, `ErrorCode`, and an `Object` wrapper for the updated record.

## Examples

### Batch upsert subscribers from form submissions

```javascript
var proxy = new Script.Util.WSProxy();
var rawBody = Platform.Request.GetPostData();
var submissions = Platform.Function.ParseJSON(rawBody + "");

var batch = [];
for (var i = 0; i < submissions.length; i++) {
    batch.push({
        EmailAddress: submissions[i].email,
        SubscriberKey: submissions[i].email,
        Status: "Active"
    });
}

var result = proxy.updateBatch("Subscriber", batch, { SaveOptions: [{ PropertyName: "*", SaveAction: "UpdateAdd" }] });
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/updateitem/">proxy.updateItem</a></li>
  <li><a href="/wsproxy/createbatch/">proxy.createBatch</a></li>
</ul>
</div>
