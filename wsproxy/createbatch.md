---
layout: page
title: proxy.createBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/create-batch/
description: Create multiple SFMC objects in a single SOAP API call — more efficient than calling proxy.create() in a loop.
---

## Syntax

```javascript
var result = proxy.createBatch(objectType, propertiesArray);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `propertiesArray` | object[] | Yes | Array of property objects, one per item to create |

## Return Value

```javascript
{
    Status: "OK",
    RequestID: "...",
    Results: [
        { StatusCode: "OK", StatusMessage: "...", Object: {...} },
        ...
    ]
}
```

## Examples

### Batch insert subscriber records

```javascript
var proxy = new Script.Util.WSProxy();
var submissions = [
    { email: "alice@example.com", name: "Alice" },
    { email: "bob@example.com", name: "Bob" },
    { email: "carol@example.com", name: "Carol" }
];

var batch = [];
for (var i = 0; i < submissions.length; i++) {
    batch.push({
        EmailAddress: submissions[i].email,
        SubscriberKey: submissions[i].email,
        Status: "Active"
    });
}

var result = proxy.createBatch("Subscriber", batch);

// Check results
var results = result.Results;
for (var j = 0; j < results.length; j++) {
    if (results[j].StatusCode !== "OK") {
        Write("Failed: " + results[j].StatusMessage + "<br>");
    }
}
```

## Notes

{% include callout.html type="note" content="SFMC SOAP API batches are typically limited to 2,500 records per call. For larger datasets, split into chunks." %}

```javascript
// Chunk helper for large batches
function chunkArray(arr, size) {
    var chunks = [];
    for (var i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

var proxy = new Script.Util.WSProxy();
var chunks = chunkArray(largeArray, 500);
for (var c = 0; c < chunks.length; c++) {
    proxy.createBatch("Subscriber", chunks[c]);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/create-item/">proxy.create</a></li>
  <li><a href="/wsproxy/update-batch/">proxy.updateBatch</a></li>
</ul>
</div>
