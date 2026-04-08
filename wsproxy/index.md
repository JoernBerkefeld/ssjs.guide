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

// Retrieve all active triggered sends
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
| [`proxy.retrieve(objectType, columns, filter)`](/wsproxy/retrieve/) | Retrieve SFMC objects |
| [`proxy.getNextBatch(objectType, requestId)`](/wsproxy/getnextbatch/) | Continue a paginated retrieve after `HasMoreRows` |
| [`proxy.retrieveBatch(objectType, columns, filter)`](/wsproxy/retrieve-all/) | Retrieve large sets with pagination |
| [`proxy.create(objectType, properties)`](/wsproxy/create-item/) | Create a new SFMC object |
| [`proxy.createBatch(objectType, propertiesArray)`](/wsproxy/create-batch/) | Create multiple objects |
| [`proxy.update(objectType, properties, filter)`](/wsproxy/update-item/) | Update existing objects |
| [`proxy.updateBatch(objectType, propertiesArray)`](/wsproxy/update-batch/) | Update multiple objects |
| [`proxy.delete(objectType, properties)`](/wsproxy/delete-item/) | Delete an SFMC object |
| [`proxy.execute(objectType, properties)`](/wsproxy/execute/) | Execute an operation |
| [`proxy.perform(objectType, action, properties)`](/wsproxy/perform/) | Perform an action (start, pause, etc.) |
| [`proxy.setClientId(clientId)`](/wsproxy/set-client-id/) | Set Business Unit for parent BU access |
| [`proxy.resetClientIds()`](/wsproxy/reset-client-ids/) | Clear BU context set by `setClientId` |

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
proxy.create("Subscriber", {
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
    Status: "OK",          // "OK" or "Error"
    RequestID: "...",      // SFMC request ID
    Results: [...],        // Array of result objects (retrieve) or created/updated objects
    HasMoreRows: false     // true when pagination is needed (retrieve)
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
| Pagination | Built-in (HasMoreRows) | Manual |
| Recommended | Yes | Legacy |
