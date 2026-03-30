---
layout: page
title: Where SSJS Runs
parent: Getting Started
parent_url: /getting-started/
description: CloudPages, Email, Automation Studio, JSON Code Resources — the full list of SSJS execution contexts and their differences.
---

SSJS executes in several different contexts within Salesforce Marketing Cloud, each with different capabilities and constraints.

## CloudPages (Landing Pages)

CloudPages is the most flexible SSJS environment. A landing page is a publicly accessible URL hosted by SFMC.

**Capabilities:**
- Full request/response access (`Platform.Request.*`, `Platform.Response.*`)
- Read query strings, POST bodies, cookies, headers
- Set response headers, cookies, redirect
- Make external HTTP calls
- Full Data Extension CRUD

**Limitations:**
- `DataExtension.Rows.Retrieve()` does **not** work on CloudPages — use `Platform.Function.LookupRows()` instead
- Requests time out (no documented limit, but ~30s is a practical ceiling for external calls)

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");
var method = Platform.Request.Method; // "GET" or "POST"
Write("<p>Request method: " + method + "</p>");
</script>
```

## JSON Code Resources

A special CloudPages type that sets `Content-Type: application/json`. Perfect for building simple API endpoints:

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");
Platform.Response.SetResponseHeader("Content-Type", "application/json");

var result = { status: "ok", timestamp: Platform.Function.Now() };
Write(Stringify(result));
</script>
```

You cannot write HTML and JSON in the same resource — the first `Write()` determines the content type behavior. Set the header explicitly at the top.

## Email (Precompile)

SSJS in emails runs during **precompile** — when SFMC personalizes the email for each subscriber before sending. This is the most constrained environment.

**Limitations:**
- No request/response access (`Platform.Request.*` returns empty values)
- No `Platform.Response.*`
- Significant **performance penalty** compared to AMPscript — prefer AMPscript for data lookups
- Short execution window — keep logic minimal
- `WSProxy` works but is slower per-send than AMPscript equivalents

**Valid use cases in email:**
- Complex conditional logic that AMPscript can't express cleanly
- JSON manipulation
- Custom function definitions for reuse

```javascript
<script runat="server">
var firstName = Platform.Function.Lookup("Subscribers", "FirstName", "SubscriberKey", _subscriberKey);
var displayName = firstName ? firstName : "Subscriber";
Variable.SetValue("@displayName", displayName);
</script>
%%=v(@displayName)=%%
```

## Automation Studio (Script Activities)

Script Activities let you run SSJS as a step in an Automation. This is how SSJS is used for scheduled batch processing.

**Capabilities:**
- Full SOAP API access via WSProxy
- Data Extension operations
- No request/response (not a web context)
- Hard **30-minute timeout** per execution

**Practical patterns:**
- Batch-process rows in chunks to stay under the timeout
- Log progress to a Data Extension
- Use `Platform.Function.Now()` and date math to track elapsed time

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

var startTime = new Date();
var maxMinutes = 25; // Leave 5-minute buffer

var proxy = new WSProxy();
var results = proxy.retrieve("DataExtension", ["CustomerKey", "Name"]);

var processed = 0;
for (var i = 0; i < results.Results.length; i++) {
    // Check elapsed time
    var elapsed = (new Date() - startTime) / 60000;
    if (elapsed > maxMinutes) { break; }

    // Process each item...
    processed++;
}

Write("Processed: " + processed + " items");
</script>
```

## Triggered Send (Email)

Similar to email precompile. SSJS runs when a triggered send fires for a subscriber.

**Note:** `Platform.Request.*` is not available in triggered send context.

## MobileConnect (SMS)

SSJS can run in MobileConnect context for SMS personalization, with significant limitations. Most data operations work, but HTTP and some response functions do not.

## Summary Table

| Context | Request/Response | HTTP Calls | Platform.Load | WSProxy | Rows.Retrieve |
|---------|-----------------|-----------|---------------|---------|---------------|
| CloudPage | ✅ Full | ✅ | ✅ | ✅ | ❌ Use LookupRows |
| JSON Code Resource | ✅ | ✅ | ✅ | ✅ | ❌ |
| Email (precompile) | ❌ | ✅ | ✅ | ✅ (slow) | ✅ |
| Automation Studio | ❌ | ✅ | ✅ | ✅ | ✅ |
| Triggered Send | ❌ | ✅ | ✅ | ✅ | ✅ |
| MobileConnect | Partial | ❌ | ✅ | ✅ | ✅ |

→ Next: [Embedding SSJS](/getting-started/embedding-ssjs/)
