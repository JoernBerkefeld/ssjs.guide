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

`proxy.retrieve()` returns up to ~2,500 rows per call. For full pagination, use `proxy.retrieve()` for the first call and `proxy.getNextBatch()` for subsequent pages, looping while `HasMoreRows` is true:

```javascript
var proxy = new Script.Util.WSProxy();
var objectType = "DataExtensionObject[MyDE_Key]";
var cols = ["SubscriberKey", "Email", "Score"];
var filter = { Property: "Score", SimpleOperator: "greaterThan", Value: "50" };
var reqID = null;
var allRows = [];
var moreData = true;

while (moreData) {
    moreData = false;
    var result = reqID == null
        ? proxy.retrieve(objectType, cols, filter)
        : proxy.getNextBatch(objectType, reqID);

    if (result != null) {
        moreData = result.HasMoreRows;
        reqID = result.RequestID;
        if (result.Results) {
            for (var i = 0; i < result.Results.length; i++) {
                allRows.push(result.Results[i]);
            }
        }
    }
}
Write("Total rows: " + allRows.length);
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
    var result = proxy.updateItem("Subscriber", items[i]);
    if (result.Status !== "OK") {
        var msg = result.Results && result.Results[0]
            ? result.Results[0].StatusMessage
            : "Unknown error";
        Platform.Function.InsertData(
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
  <li><a href="/wsproxy/getnextbatch/">proxy.getNextBatch</a></li>
  <li><a href="/wsproxy/createbatch/">proxy.createBatch</a></li>
  <li><a href="/wsproxy/updateitem/">proxy.updateItem</a></li>
  <li><a href="/wsproxy/setclientid/">proxy.setClientId</a></li>
  <li><a href="/recipes/de-crud-patterns/">DE CRUD Patterns</a></li>
</ul>
</div>
