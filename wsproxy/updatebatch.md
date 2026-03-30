---
layout: page
title: proxy.updateBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/update-batch/
description: Update multiple SFMC objects in a single SOAP API call for better performance than looping proxy.update().
---

## Syntax

```javascript
var result = proxy.updateBatch(objectType, propertiesArray [, saveOptions]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `propertiesArray` | object[] | Yes | Array of update property objects |
| `saveOptions` | object | No | SOAP SaveOptions (e.g., `[{ SaveAction: "UpdateAdd" }]`) |

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

var result = proxy.updateBatch("Subscriber", batch, [{ SaveAction: "UpdateAdd" }]);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/update-item/">proxy.update</a></li>
  <li><a href="/wsproxy/create-batch/">proxy.createBatch</a></li>
</ul>
</div>
