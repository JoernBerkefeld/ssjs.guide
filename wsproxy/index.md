---
layout: category
title: WSProxy
description: WSProxy is the modern SSJS interface to the Salesforce Marketing Cloud SOAP API — create, retrieve, update, delete, and execute SFMC objects without raw SOAP XML.
nav_order: 7
has_children: true
differs_from_docs: true
aggregate_verification: false
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
| [`ErrorUtil.ThrowWSProxyError(...)`](/wsproxy/errorutil/) | Throw on a WSProxy error status so `try`/`catch` can handle SOAP failures — **only under `Platform.Load("Core", "1")`**; `undefined` on 1.1.1/1.1.5, so check `result.Status` yourself instead |

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
    Status: "OK",          // "OK", "MoreDataAvailable", "InvalidRequest", "Error", or a full message
    RequestID: "...",      // SFMC request ID (GUID) — always present, even on failures
    Results: [...],        // Array-LIKE collection of result entries / retrieved rows; null when rejected
    HasMoreRows: false,    // retrieve()/getNextBatch() only — absent on write methods
    StatusMessage: "..."   // rarely populated — read Results[i].StatusMessage instead
}
```

{% include differs-from-docs.html note="Runtime-verified facts that the docs do not cover:<br>• `Status` is **not** limited to `\"OK\"`/`\"Error\"` — a paged retrieve returns `\"MoreDataAvailable\"`, a rejected write returns `\"InvalidRequest\"`, and an unknown object type returns the entire message as the status value (for example `\"Error: NoSuchObjectTypeXyz is not a valid ObjectType.\"`). Compare against `\"OK\"` rather than testing for `\"Error\"`.<br>• `Results` is array-**like** but not a real array — `Results instanceof Array` is `false` even though `.length`, `.slice` and index access all work. Iterate with a classic `for` loop.<br>• `Results` is `null` (not an empty collection) when the request itself was rejected, so null-check before reading `.length`. A retrieve that simply matches nothing returns a zero-length collection.<br>• The top-level `StatusMessage` was `undefined` on every retrieve, create, update and delete observed, and only appeared — as an **empty** string — on `performItem`. The real message lives on `Results[i].StatusMessage`.<br>• `RequestID` is returned even for failed calls, and `getNextBatch` echoes the same value for every page of one retrieve." %}

Always check `result.Status` before using `result.Results`:

```javascript
var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
if (result.Status !== "OK" && result.Status !== "MoreDataAvailable") {
    Write("Error: " + result.Status);
} else if (result.Results) {
    var des = result.Results;
    for (var i = 0; i < des.length; i++) {
        Write(des[i].Name + "<br>");
    }
}
```

### `Results` entries (write methods)

Each entry returned by `createItem`, `createBatch`, `updateItem`, `updateBatch`, `deleteItem`, `deleteBatch`, `performItem` and `performBatch` carries:

| Property | Type | Description |
|---|---|---|
| `StatusCode` | string | `"OK"` on success, `"Error"` on failure. Absent on rows returned by `retrieve`/`getNextBatch`. |
| `StatusMessage` | string | Human-readable message — populated on **success** too (e.g. `"QueryDefinition deleted"`). |
| `OrdinalID` | number | Zero-based index of the input item; always `0` for the single-item methods. |
| `ErrorCode` | number | Numeric code — `0` on success **and** on many failures. Not a reliable failure signal. |
| `NewID` | number | Numeric ID of a newly created object. Create results only. |
| `NewObjectID` | string | GUID of a newly created object. Create results only. |
| `Object` | object | Echo of the affected object — your payload plus server fields (`ObjectID`, `CreatedDate`, `Client`, …). |
| `Task` | object | `performItem`/`performBatch` only — `{ StatusCode, StatusMessage, OrdinalID, ErrorCode, ID, TblAsyncID, InteractionObjectID }`. |
| `RequestID` | string | Present as a key but always `null` — use the top-level `RequestID`. |

{% include differs-from-docs.html note="Runtime-verified: `ErrorCode` is a **number** (not a string) and stays `0` even on entries whose `StatusCode` is `\"Error\"`, so branch on `StatusCode` alone. `NewObjectID` is undocumented but is what you need when the follow-up call expects an ObjectID GUID (deleting or performing a freshly created QueryDefinition or DataExtension). A populated `Task` is **not** proof the action ran: `Task.StatusCode` can read `\"OK\"` and `Task.InteractionObjectID` can hold a GUID while the outer `Status` is `\"InvalidRequest\"` and `Results[0].StatusCode` is `\"Error\"` — in that state `Task.ID` is `null` and `Task.TblAsyncID` is `0`. Per-entry `RequestID` is always `null`." %}

---

## WSProxy vs InvokeCreate/Retrieve

| Feature | WSProxy | CreateObject/Invoke |
|---------|---------|---------------------|
| Code verbosity | Concise | Verbose |
| Native JS objects | Yes | No (SFMC objects) |
| Error handling | Returns Status | Sets output variables |
| Pagination | Built-in (`HasMoreRows`) | Manual |
| Recommended | Yes | Legacy |
