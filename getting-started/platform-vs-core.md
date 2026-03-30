---
layout: page
title: Platform vs Core
parent: Getting Started
parent_url: /getting-started/
description: The two library layers in SSJS — Platform.Function.* vs Core library objects — and when to use each.
---

SSJS exposes SFMC functionality through two distinct library layers with different usage patterns, capabilities, and performance characteristics.

## The Two Layers

```
SSJS Runtime
├── Global functions     (Write, Stringify, ContentBlockByKey, …)
├── Platform             (always available, no Load required)
│   ├── Platform.Function.*    (~55 methods)
│   ├── Platform.Variable.*    (AMPscript bridge)
│   ├── Platform.Response.*    (HTTP response)
│   ├── Platform.Request.*     (HTTP request)
│   └── Platform.ClientBrowser.*
└── Core library         (requires Platform.Load("core", "1.1.5"))
    ├── DataExtension, DataExtension.Rows, DataExtension.Fields
    ├── Subscriber, Email, TriggeredSend
    ├── List, List.Subscribers
    ├── Send, Template, ContentArea, Folder
    ├── QueryDefinition, FilterDefinition, SendDefinition
    ├── Account, AccountUser, Portfolio
    └── BounceEvent, ClickEvent, OpenEvent, … (tracking events)
```

## Platform.Function.*

Available without any loading. Call directly as `Platform.Function.MethodName(...)`.

**Best for:**
- Data Extension lookups and writes in CloudPages and emails
- String/date/math operations
- Crypto (Base64, SHA, AES encryption)
- HTTP GET/POST calls
- JSON parsing, URL encoding
- AMPscript variable bridge

```javascript
// No Platform.Load needed
var email = Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk);
var now   = Platform.Function.Now();
var hash  = Platform.Function.SHA256(email);
```

## Core Library

Requires `Platform.Load("core", "1.1.5")` to be called **before** any Core object is used.

**Best for:**
- Object-oriented CRUD when you prefer `.Init()` / `.Rows.Add()` patterns
- Accessing SFMC object schemas (`DataExtension.Fields`)
- Email and subscriber management operations
- Tracking event retrieval (automation context)

```javascript
Platform.Load("core", "1.1.5");

var de = DataExtension.Init("MyDE");
var filter = { Property: "Status", SimpleOperator: "equals", Value: "active" };
var rows = de.Rows.Retrieve(filter); // ⚠️ Does NOT work on CloudPages

for (var i = 0; i < rows.length; i++) {
    Write(rows[i]["Email"] + "<br>");
}
```

> **Platform.Load version matters.** Always use `"1.1.5"`. Older versions (`"1"`, `"1.1.1"`) have known bugs that are fixed in 1.1.5. Missing the version argument also causes issues.

## WSProxy — A Third Option

For SOAP API operations, `WSProxy` (available without Platform.Load) is usually the best choice:

```javascript
var proxy = new WSProxy();
var cols  = ["Name", "CustomerKey", "RowCount"];
var result = proxy.retrieve("DataExtension", cols);
```

**WSProxy vs Core library:**

| Aspect | WSProxy | Core Library |
|--------|---------|-------------|
| Requires Platform.Load | No | Yes |
| Access to all SFMC objects | Yes | Limited set |
| Retrieve performance | Faster (batch) | Slower |
| API style | SOAP-over-JSON | Object-oriented |
| Multi-BU impersonation | Yes | No |
| Best for | SOAP-heavy work, batch ops | Simple CRUD patterns |

## Choosing the Right Tool

| Task | Recommended |
|------|-------------|
| Lookup single DE value | `Platform.Function.Lookup()` |
| Lookup multiple rows (CloudPage) | `Platform.Function.LookupRows()` |
| Insert/update/delete DE rows | `Platform.Function.InsertData/UpdateData/UpsertData/DeleteData` |
| Complex DE retrieval with sorting | `Platform.Function.LookupOrderedRows()` |
| Read DE rows (Automation only) | `DataExtension.Init().Rows.Retrieve()` |
| Full SFMC object CRUD | `new WSProxy()` |
| Subscriber management | `Subscriber.Init()` or `WSProxy` |
| External HTTP | `Script.Util.HttpRequest` |

→ Return to [Getting Started](/getting-started/) or continue to [Language Guide](/language/)
