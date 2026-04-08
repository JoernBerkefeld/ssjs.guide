---
layout: page
title: proxy.retrieve
parent: WSProxy
parent_url: /wsproxy/
description: Retrieve SFMC objects of a given type using an optional filter. Returns up to ~2500 rows per call; use retrieveBatch or getNextBatch for pagination.
---

## Syntax

```javascript
var result = proxy.retrieve(objectType, columns [, filter [, retrieveOptions [, requestProps]]]);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type (e.g., `"DataExtension"`, `"Subscriber"`, `"DataExtensionObject[CustomerKey]"`) |
| `columns` | string[] | Yes | Array of property names to return |
| `filter` | object | No | SimpleFilterPart or ComplexFilterPart |
| `retrieveOptions` | object | No | Properties to set on the SOAP `RetrieveOptions` object (e.g. `{ BatchSize: 500 }`) |
| `requestProps` | object | No | Additional request-level properties such as `{ QueryAllAccounts: true }` |

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
    Status: "OK",
    RequestID: "...",
    Results: [...],      // array of result objects
    HasMoreRows: false   // true when more rows exist (use retrieveBatch)
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

## Notes

- Returns up to ~2,500 rows per call. When `HasMoreRows` is `true`, call [`getNextBatch`](/wsproxy/getnextbatch/) with the `RequestID` to fetch subsequent pages, or use [`retrieveBatch`](/wsproxy/retrieve-all/) which handles pagination automatically.
- The `DataExtensionObject[CustomerKey]` syntax is used for retrieving rows from a specific DE. Replace `CustomerKey` with the DE's external key.
- `retrieveOptions` and `requestProps` are only needed for advanced SOAP scenarios. Most scripts only require the first three parameters.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/getnextbatch/">proxy.getNextBatch</a></li>
  <li><a href="/wsproxy/retrieve-all/">proxy.retrieveBatch</a></li>
  <li><a href="/wsproxy/create/">proxy.create</a></li>
</ul>
</div>
