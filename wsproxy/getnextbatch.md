---
layout: page
title: proxy.getNextBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/getnextbatch/
description: Fetches the next page of SOAP retrieve results after a prior retrieve returned HasMoreRows true. Pass the same object type and the RequestID from the previous response.
---

`proxy.getNextBatch(objectType, requestId)` continues a paginated [`retrieve`](/wsproxy/retrieve/) sequence. Use it when you manage pagination manually instead of using [`retrieveBatch`](/wsproxy/retrieve-all/).

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

{% include callout.html type="note" content="For most scripts, [`retrieveBatch`](/wsproxy/retrieve-all/) is simpler because it wraps the retrieve / getNextBatch loop." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
  <li><a href="/wsproxy/retrieve-all/">proxy.retrieveBatch</a></li>
</ul>
</div>
