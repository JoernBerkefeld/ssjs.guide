---
layout: category
title: WSProxy
description: WSProxy is the modern SSJS interface to the Salesforce Marketing Cloud SOAP API — create, retrieve, update, delete, and execute SFMC objects without raw SOAP XML.
nav_order: 7
has_children: true
---

WSProxy is the recommended way to interact with the SFMC SOAP API from SSJS. It abstracts the verbose `CreateObject`/`SetObjectProperty`/`InvokeCreate` pattern behind simple JavaScript method calls.

{% include callout.html type="warning" content="WSProxy does **not** require `Platform.Load`. It is available in all SSJS execution contexts without any import." %}

## Quick Start

```javascript
var proxy = new Script.Util.WSProxy();

// Retrieve active triggered sends
var cols = ["Name", "CustomerKey", "Status"];
var filter = {
    Property: "Status",
    SimpleOperator: "equals",
    Value: "Active"
};
var result = proxy.retrieve("TriggeredSendDefinition", cols, filter);
var items = result.Results;
```

## Methods

| Method | Description |
|--------|-------------|
| [`new Script.Util.WSProxy()`](/wsproxy/constructor/) | Create a WSProxy instance |
| [`<WSProxyInstance>.retrieve(...)`](/wsproxy/retrieve/) | Retrieve SFMC objects (paginate with `getNextBatch` when `HasMoreRows`) |
| [`<WSProxyInstance>.getNextBatch(...)`](/wsproxy/getnextbatch/) | Continue a paginated retrieve |
| [`<WSProxyInstance>.setBatchSize(...)`](/wsproxy/setbatchsize/) | Change retrieve page size |
| [`<WSProxyInstance>.createItem(...)`](/wsproxy/createitem/) | Create a new SFMC object |
| [`<WSProxyInstance>.updateItem(...)`](/wsproxy/updateitem/) | Update an existing object |
| [`<WSProxyInstance>.deleteItem(...)`](/wsproxy/deleteitem/) | Delete an object |
| [`<WSProxyInstance>.createBatch(...)`](/wsproxy/createbatch/) | Create multiple objects |
| [`<WSProxyInstance>.updateBatch(...)`](/wsproxy/updatebatch/) | Update multiple objects |
| [`<WSProxyInstance>.deleteBatch(...)`](/wsproxy/deletebatch/) | Delete multiple objects |
| [`<WSProxyInstance>.describe(...)`](/wsproxy/describe/) | SOAP object metadata |
| [`<WSProxyInstance>.execute(...)`](/wsproxy/execute/) | Named execute requests (e.g. `LogUnsubEvent`) |
| [`<WSProxyInstance>.performItem(...)`](/wsproxy/performitem/) | SOAP Perform on one object |
| [`<WSProxyInstance>.performBatch(...)`](/wsproxy/performbatch/) | SOAP Perform on many objects |
| [`<WSProxyInstance>.setClientId(...)`](/wsproxy/setclientid/) | Target another business unit |
| [`<WSProxyInstance>.resetClientIds()`](/wsproxy/resetclientids/) | Clear BU override |
| [`ErrorUtil.ThrowWSProxyError(...)`](/wsproxy/errorutil/) | Throw on a WSProxy error status so `try`/`catch` can handle SOAP failures (requires Core load) |

---

## Common Use Cases

### Retrieve Data Extension Rows

```javascript
var proxy = new Script.Util.WSProxy();
var cols = ["Email", "FirstName", "Status"];
var filter = {
    Property: "Status",
    SimpleOperator: "equals",
    Value: "active"
};
var result = proxy.retrieve("DataExtensionObject[MyDE]", cols, filter);
var rows = result.Results;
```

### Upsert Subscriber

```javascript
var proxy = new Script.Util.WSProxy();
proxy.createItem("Subscriber", {
    EmailAddress: "jane@example.com",
    SubscriberKey: "sub_jane",
    Lists: [{ ID: 123, Status: "Active" }]
});
```

### Retrieve All Data Extensions

```javascript
var proxy = new Script.Util.WSProxy();
var cols = ["Name", "CustomerKey", "Description", "RowCount"];
var result = proxy.retrieve("DataExtension", cols);
var des = result.Results;
```

---

## Response Structure

All WSProxy methods return an object with the following shape:

```javascript
{
    Status: "OK",          // "OK" or an error status
    RequestID: "...",      // SFMC request ID
    Results: [...],      // Array of result objects (retrieve) or affected rows
    HasMoreRows: false    // true when pagination is needed (retrieve)
}
```

Always check `result.Status` before using `result.Results`:

```javascript
var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
if (result.Status !== "OK") {
    Write("Error: " + result.Status);
} else {
    var des = result.Results;
    for (var i = 0; i < des.length; i++) {
        Write(des[i].Name + "<br>");
    }
}
```

---

## WSProxy vs InvokeCreate/Retrieve

| Feature | WSProxy | CreateObject/Invoke |
|---------|---------|---------------------|
| Code verbosity | Concise | Verbose |
| Native JS objects | Yes | No (SFMC objects) |
| Error handling | Returns Status | Sets output variables |
| Pagination | Built-in (`HasMoreRows`) | Manual |
| Recommended | Yes | Legacy |
