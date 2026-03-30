---
layout: page
title: WSProxy Patterns
parent: Recipes
parent_url: /recipes/
description: Common WSProxy patterns — paginated retrieval, bulk upsert, multi-BU iteration, and error-safe loops.
---

Practical patterns for working with [`Script.Util.WSProxy`](/wsproxy/) in production SSJS scripts.

---

## Paginated Retrieval of All Records

`proxy.retrieve()` returns up to ~2,500 rows. Use `proxy.retrieveBatch()` to automatically page through all results:

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.retrieveBatch(
    "DataExtensionObject[MyDE_Key]",
    ["SubscriberKey", "Email", "Score"],
    {
        Property: "Score",
        SimpleOperator: "greaterThan",
        Value: "50"
    }
);
var rows = result.Results;
Write("Total rows: " + rows.length);
```

---

## Manual Pagination with HasMoreRows

When you want to process rows in chunks rather than loading everything into memory:

```javascript
var proxy = new Script.Util.WSProxy();
var cols = ["Name", "CustomerKey", "RowCount"];
var allResults = [];
var moreRows = true;

while (moreRows) {
    var result = proxy.retrieve("DataExtension", cols);
    for (var i = 0; i < result.Results.length; i++) {
        allResults.push(result.Results[i]);
    }
    moreRows = result.HasMoreRows;
}
Write("Total DEs: " + allResults.length);
```

---

## Bulk Upsert to a Data Extension

Upsert multiple rows in one call using `SaveAction: "UpdateAdd"`:

```javascript
var proxy = new Script.Util.WSProxy();
var rows = [
    { Properties: { Property: [
        { Name: "SubscriberKey", Value: "sub_001" },
        { Name: "Score", Value: "90" }
    ]}},
    { Properties: { Property: [
        { Name: "SubscriberKey", Value: "sub_002" },
        { Name: "Score", Value: "75" }
    ]}}
];

var result = proxy.updateBatch(
    "DataExtensionObject[ScoringDE_Key]",
    rows,
    [{ SaveAction: "UpdateAdd" }]
);
if (result.Status !== "OK") {
    Write("Batch upsert failed: " + result.Results[0].StatusMessage);
}
```

---

## Multi-BU Iteration

Run the same operation across multiple child Business Units from a parent account:

```javascript
var proxy = new Script.Util.WSProxy();
var businessUnits = [
    { name: "US", mid: 111111 },
    { name: "EU", mid: 222222 },
    { name: "APAC", mid: 333333 }
];

for (var i = 0; i < businessUnits.length; i++) {
    proxy.setClientId({ ID: businessUnits[i].mid });

    var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
    Write(businessUnits[i].name + ": " + result.Results.length + " DEs<br>");
}

// Always reset after cross-BU operations
proxy.resetClientIds();
```

---

## Error-Safe Loop Pattern

Always check `result.Status` before accessing `result.Results`:

```javascript
var proxy = new Script.Util.WSProxy();
var items = [
    { SubscriberKey: "sub_001", Status: "Active" },
    { SubscriberKey: "sub_002", Status: "Unsubscribed" }
];

for (var i = 0; i < items.length; i++) {
    var result = proxy.update("Subscriber", items[i]);
    if (result.Status !== "OK") {
        var msg = result.Results && result.Results[0]
            ? result.Results[0].StatusMessage
            : "Unknown error";
        Platform.Function.LogDataExtension(
            "ErrorLog",
            ["Key", "Error", "Timestamp"],
            [items[i].SubscriberKey, msg, Platform.Function.Now()]
        );
    }
}
```

---

## Chunked Batch Processing

Split a large array into chunks to stay within SFMC's per-request limits:

```javascript
var proxy = new Script.Util.WSProxy();
var allRows = []; // ... your full dataset
var chunkSize = 50;

for (var c = 0; c < allRows.length; c += chunkSize) {
    var chunk = allRows.slice(c, c + chunkSize);
    var result = proxy.createBatch("DataExtensionObject[MyDE_Key]", chunk);
    if (result.Status !== "OK") {
        Write("Chunk " + (c / chunkSize) + " failed.<br>");
    }
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/">WSProxy Overview</a></li>
  <li><a href="/wsproxy/retrieve-all/">proxy.retrieveBatch</a></li>
  <li><a href="/wsproxy/create-batch/">proxy.createBatch</a></li>
  <li><a href="/wsproxy/update-item/">proxy.update</a></li>
  <li><a href="/wsproxy/set-client-id/">proxy.setClientId</a></li>
  <li><a href="/recipes/de-crud-patterns/">DE CRUD Patterns</a></li>
</ul>
</div>
