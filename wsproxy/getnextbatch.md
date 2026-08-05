---
layout: function
title: <WSProxyInstance>.getNextBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/getnextbatch/
description: Fetches the next page of SOAP retrieve results after a prior retrieve returned HasMoreRows true. Pass the same object type and the RequestID from the previous response.
syntax: "<WSProxyInstance>.getNextBatch(objectType, requestId)"
return_type: object
min_args: 2
max_args: 2
verification: verified
test_scripts: complete
---

`<WSProxyInstance>.getNextBatch(objectType, requestId)` continues a paginated [`retrieve`](/wsproxy/retrieve/) sequence after `HasMoreRows` is true.

{% include callout.html type="note" content="**Runtime verified.** A `retrieve` of a Data Extension seeded with 2,600 rows returned a first page with `Status: \"MoreDataAvailable\"`, `HasMoreRows: true`, a `RequestID`, and exactly 2,500 rows (the default page size). Passing that same object type and `RequestID` to <code>getNextBatch</code> returned the next page (`Status: \"OK\"`, `HasMoreRows: false`, the remaining 100 rows) — 2,600 rows total across two pages, with `HasMoreRows` flipping to `false` on the last page. Each `Results` row carries a `Properties` array of `{ Name, Value }` pairs. Pagination happens **naturally** once a result set exceeds the 2,500-row default page size. To force a smaller page size, pass the <code>retrieveOptions.BatchSize</code> argument of <a href=\"/wsproxy/retrieve/\"><code>retrieve</code></a>." %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | Same SOAP object type passed to the original `retrieve` call |
| `requestId` | string | Yes | `RequestID` value from the previous `retrieve` or `getNextBatch` response |

{% include test-script.html bundle="wsproxy--getnextbatch" chapter="parameters" %}

## Return value

Same shape as [`retrieve`](/wsproxy/retrieve/): `Status`, `RequestID`, `Results`, and `HasMoreRows`.

{% include test-script.html bundle="wsproxy--getnextbatch" chapter="return-value" %}

## Examples

### Loop until all rows are read

```javascript
var proxy = new Script.Util.WSProxy();
var objectType = "DataExtension";
var result = proxy.retrieve(objectType, ["Name", "CustomerKey"]);

do {
    for (var i = 0; i < result.Results.length; i++) {
        Write(result.Results[i].Name + "<br>");
    }
    if (result.HasMoreRows) {
        // carry the RequestID from the previous response into the next page
        result = proxy.getNextBatch(objectType, result.RequestID);
    }
} while (result.HasMoreRows);
```

{% include test-script.html bundle="wsproxy--getnextbatch" chapter="examples" %}

## Notes

{% include callout.html type="note" content="Implement a <code>retrieve</code> / <code>getNextBatch</code> loop (see examples below) or wrap it in your own helper — SFMC does not ship a single built-in <code>retrieveBatch</code> convenience on <code>WSProxy</code>." %}

{% include test-script.html bundle="wsproxy--getnextbatch" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
</ul>
</div>
