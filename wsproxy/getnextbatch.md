---
layout: page
title: proxy.getNextBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/getnextbatch/
description: Fetches the next page of SOAP retrieve results after a prior retrieve returned HasMoreRows true. Pass the same object type and the RequestID from the previous response.
---

`proxy.getNextBatch(objectType, requestId)` continues a paginated [`retrieve`](/wsproxy/retrieve/) sequence after `HasMoreRows` is true.

## Syntax

```javascript
var result = proxy.getNextBatch(objectType, requestId);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | Same SOAP object type passed to the original `retrieve` call |
| `requestId` | string | Yes | `RequestID` value from the previous `retrieve` or `getNextBatch` response |

## Return value

Same shape as [`retrieve`](/wsproxy/retrieve/): `Status`, `RequestID`, `Results`, and `HasMoreRows`.

## Examples

### Loop until all rows are read

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);

while (result.Status === "OK") {
    for (var i = 0; i < result.Results.length; i++) {
        Write(result.Results[i].Name + "<br>");
    }
    if (!result.HasMoreRows) {
        break;
    }
    result = proxy.getNextBatch("DataExtension", result.RequestID);
}
```

## Notes

{% include callout.html type="note" content="Implement a <code>retrieve</code> / <code>getNextBatch</code> loop (see examples below) or wrap it in your own helper — SFMC does not ship a single built-in <code>retrieveBatch</code> convenience on <code>WSProxy</code>." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
  <li><a href="/wsproxy/setbatchsize/">proxy.setBatchSize</a></li>
</ul>
</div>
