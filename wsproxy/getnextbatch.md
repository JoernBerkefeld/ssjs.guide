---
layout: page
title: proxy.getNextBatch
parent: WSProxy
parent_url: /wsproxy/
description: Retrieve the next page of results from a previous retrieve call when HasMoreRows is true. Use for manual pagination over large result sets.
---

`proxy.getNextBatch()` continues a retrieve operation when the previous response had `HasMoreRows: true`. It uses the `RequestID` from the prior response to fetch the next batch of records.

## Syntax

```javascript
var result = proxy.getNextBatch(objectType, requestId);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type — must match the type used in the original `retrieve` call |
| `requestId` | string | Yes | The `RequestID` value returned in the previous retrieve response |

## Return Value

Returns the same structure as `retrieve()`:

```javascript
{
    Status: "OK",
    RequestID: "...",
    Results: [...],
    HasMoreRows: false   // false when no further pages remain
}
```

## Examples

### Paginate through all Data Extensions

```javascript
var proxy = new Script.Util.WSProxy();
var allResults = [];

var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
for (var i = 0; i < result.Results.length; i++) {
    allResults.push(result.Results[i]);
}

while (result.HasMoreRows) {
    result = proxy.getNextBatch("DataExtension", result.RequestID);
    for (var i = 0; i < result.Results.length; i++) {
        allResults.push(result.Results[i]);
    }
}

Write("Total DEs found: " + allResults.length);
```

### Retrieve all active subscribers with pagination

```javascript
var proxy = new Script.Util.WSProxy();
var filter = {
    Property: "Status",
    SimpleOperator: "equals",
    Value: "Active"
};

var result = proxy.retrieve("Subscriber", ["EmailAddress", "SubscriberKey"], filter);
var rows = result.Results;

while (result.HasMoreRows) {
    result = proxy.getNextBatch("Subscriber", result.RequestID);
    rows = rows.concat(result.Results);
}
```

## Notes

{% include callout.html type="note" content="For most pagination scenarios, `proxy.retrieveBatch()` is simpler — it handles `getNextBatch` internally and returns the complete result set in one call. Use `getNextBatch` directly when you need to process results in chunks or apply logic between pages." %}

- Each page typically contains up to 2,500 records, though the exact count depends on the object type and account configuration.
- Do not change the `objectType` between calls for the same pagination sequence.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
  <li><a href="/wsproxy/retrieve-all/">proxy.retrieveBatch</a></li>
  <li><a href="/wsproxy/constructor/">WSProxy Constructor</a></li>
</ul>
</div>
