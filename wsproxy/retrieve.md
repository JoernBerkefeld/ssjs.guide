---
layout: function
title: <WSProxyInstance>.retrieve
parent: WSProxy
parent_url: /wsproxy/
description: Retrieve SFMC objects of a given type using an optional filter. Returns up to ~2500 rows per call; use getNextBatch for pagination.
syntax: "<WSProxyInstance>.retrieve(objectType, columns[, filter[, retrieveOptions[, requestProps]]])"
return_type: object
min_args: 2
max_args: 5
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type (e.g., `"DataExtension"`, `"Subscriber"`, `"DataExtensionObject[CustomerKey]"`) |
| `columns` | string[] | Yes | Array of property names to return |
| `filter` | object | No | SimpleFilterPart or ComplexFilterPart |
| `retrieveOptions` | object | No | Properties to set on the SOAP `RetrieveOptions` object. Set `{ BatchSize: n }` (1–2500) to force paged results; values above 2500 are ignored |
| `requestProps` | object | No | Additional request-level properties such as `{ QueryAllAccounts: true }`. Set `ContinueRequest` to a prior page's `RequestID` to fetch the next page via `retrieve` (an alternative to `getNextBatch`) |

{% include callout.html type="note" content="**Runtime verified.** In an anonymous CloudPage, <code>retrieve(obj, cols, null, { BatchSize: 2 }, { QueryAllAccounts: false })</code> against a 6-row Data Extension returned a first page with `Status: \"MoreDataAvailable\"`, `HasMoreRows: true`, a `RequestID`, and exactly 2 rows — the <code>retrieveOptions.BatchSize</code> argument does **not** throw the security-descriptor error that the <a href=\"/wsproxy/setbatchsize/\"><code>setBatchSize()</code></a> instance method throws. Setting <code>props.ContinueRequest</code> to that `RequestID` and calling <code>retrieve</code> again returned each next page (3 pages of 2 rows, 6 total), the `RequestID` held constant, and `HasMoreRows` flipped to `false` (`Status: \"OK\"`) on the last page. `BatchSize` caps at 2,500." %}

## Filter Types

### SimpleFilterPart

```javascript
var filter = {
    Property: "Status",
    SimpleOperator: "equals",    // equals, notEquals, greaterThan, lessThan, isNull, isNotNull, like, between, IN
    Value: "Active"
};
```

### ComplexFilterPart (AND / OR)

```javascript
var filter = {
    LeftOperand: {
        Property: "Status",
        SimpleOperator: "equals",
        Value: "active"
    },
    LogicalOperator: "AND",   // or "OR"
    RightOperand: {
        Property: "Score",
        SimpleOperator: "greaterThan",
        Value: "50"
    }
};
```

## Return Value

```javascript
{
    Status: "OK",        // "MoreDataAvailable" while a paged result set still has more pages; "OK" on the final page
    RequestID: "...",    // carry into getNextBatch, or into props.ContinueRequest, to fetch the next page
    Results: [...],      // array of result objects
    HasMoreRows: false   // true when more rows exist (use getNextBatch or props.ContinueRequest)
}
```

## Examples

### Retrieve all Data Extensions

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey", "Description"]);
var des = result.Results;
for (var i = 0; i < des.length; i++) {
    Write(des[i].Name + " (" + des[i].CustomerKey + ")<br>");
}
```

### Retrieve with filter

```javascript
var proxy = new Script.Util.WSProxy();
var filter = {
    Property: "Status",
    SimpleOperator: "equals",
    Value: "Active"
};
var result = proxy.retrieve("TriggeredSendDefinition",
    ["Name", "CustomerKey", "Status"],
    filter
);
```

### Retrieve DE rows

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve(
    "DataExtensionObject[MyDE_CustomerKey]",
    ["Email", "FirstName", "Score"],
    {
        Property: "Score",
        SimpleOperator: "greaterThan",
        Value: "80"
    }
);
var rows = result.Results;
```

### Retrieve a subscriber

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve(
    "Subscriber",
    ["EmailAddress", "SubscriberKey", "Status"],
    {
        Property: "SubscriberKey",
        SimpleOperator: "equals",
        Value: "sub_12345"
    }
);
var sub = result.Results[0];
```

### Retrieve across all business units

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve(
    "DataExtension",
    ["Name", "CustomerKey"],
    {},
    null,
    { QueryAllAccounts: true }
);
```

### Manual pagination with getNextBatch

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);

while (result.HasMoreRows) {
    // process result.Results ...
    result = proxy.getNextBatch("DataExtension", result.RequestID);
}
```

### Pagination with BatchSize and ContinueRequest

Force a smaller page with `retrieveOptions.BatchSize`, then continue via `props.ContinueRequest` — a fully `retrieve`-based alternative to `getNextBatch`. Runtime-verified to work in an anonymous CloudPage.

```javascript
var proxy = new Script.Util.WSProxy();
var obj = "DataExtensionObject[MyDE_CustomerKey]";
var cols = ["Pk", "Val"];
var opts = { BatchSize: 500 };          // 1..2500; larger is ignored
var props = { QueryAllAccounts: false };

// First page
var data = proxy.retrieve(obj, cols, null, opts, props);
// data.Status === "MoreDataAvailable" and data.HasMoreRows === true while paged

// Subsequent pages
while (data.HasMoreRows) {
    // process data.Results ...
    props.ContinueRequest = data.RequestID;   // carry the RequestID forward
    data = proxy.retrieve(obj, cols, null, opts, props);
}
// last page: data.Status === "OK", data.HasMoreRows === false
```

## Notes

- Returns up to ~2,500 rows per call by default. When `HasMoreRows` is `true`, either call [`getNextBatch`](/wsproxy/getnextbatch/) with the `RequestID`, or set `props.ContinueRequest` to the `RequestID` and call `retrieve` again — both fetch subsequent pages.
- Pass `{ BatchSize: n }` as the 4th (`retrieveOptions`) argument to force a smaller page size (1–2,500; larger values are ignored). Unlike the [`setBatchSize()`](/wsproxy/setbatchsize/) instance method (which throws in an anonymous CloudPage), the `retrieveOptions.BatchSize` argument works there.
- A paged `retrieve` returns `Status: "MoreDataAvailable"` until the final page, which returns `Status: "OK"`.
- The `DataExtensionObject[CustomerKey]` syntax is used for retrieving rows from a specific DE. Replace `CustomerKey` with the DE's external key.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/getnextbatch/">proxy.getNextBatch</a></li>
  <li><a href="/wsproxy/createitem/">proxy.createItem</a></li>
</ul>
</div>
