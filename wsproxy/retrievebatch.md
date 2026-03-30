---
layout: page
title: proxy.retrieveBatch
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/retrieve-all/
description: Retrieve all SFMC objects of a type with automatic pagination — handles HasMoreRows internally so you get a complete result set.
---

## Syntax

```javascript
var result = proxy.retrieveBatch(objectType, columns [, filter]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `columns` | string[] | Yes | Array of property names to return |
| `filter` | object | No | SimpleFilterPart or ComplexFilterPart |

## Return Value

Returns the same structure as `retrieve()`, but `Results` contains **all** matching records across all pages:

```javascript
{
    Status: "OK",
    RequestID: "...",
    Results: [...]   // complete result set
}
```

## Examples

### Retrieve all rows from a large DE

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieveBatch(
    "DataExtensionObject[BigDE_Key]",
    ["Email", "FirstName", "Score"]
);
var rows = result.Results;
Write("Total rows: " + rows.length);
```

### Retrieve all active subscribers

```javascript
var proxy = new Script.Util.WSProxy();
var filter = {
    Property: "Status",
    SimpleOperator: "equals",
    Value: "Active"
};
var result = proxy.retrieveBatch(
    "Subscriber",
    ["EmailAddress", "SubscriberKey", "Status"],
    filter
);
var subs = result.Results;
```

## Notes

{% include callout.html type="note" content="`retrieveBatch` handles pagination automatically. For very large datasets (100k+ rows), consider whether batch processing in Automation Studio with chunked queries is more appropriate." %}

Use `retrieve` when you know results are small. Use `retrieveBatch` when the total row count may exceed 2,500.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
</ul>
</div>
