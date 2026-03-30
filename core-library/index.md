---
layout: category
title: Core Library
description: The SSJS Core library provides object-oriented APIs for Data Extensions, Subscribers, Lists, Email sends, HTTP requests, and more. Load with Platform.Load("core", "1.1.5").
nav_order: 6
has_children: true
---

The Core library is loaded with `Platform.Load("core", "1.1.5")` and gives you access to a set of powerful object-oriented namespaces. Unlike `Platform.Function.*`, Core library objects use a more JavaScript-idiomatic dot-notation with method chaining.

{% include callout.html type="warning" content="You must call `Platform.Load(\"core\", \"1.1.5\")` before using any Core library object. Place it at the very top of your first `<script runat=\"server\">` block." %}

```javascript
Platform.Load("core", "1.1.5");
```

## Core Library Objects

| Object | Description |
|--------|-------------|
| [`DataExtension`](/core-library/dataextension/) | Initialize and work with Data Extensions |
| [`DataExtension.Rows`](/core-library/dataextension-rows/) | Retrieve, Add, Update, Remove rows |
| [`Subscriber`](/core-library/subscriber/) | Manage All Subscribers list entries |
| [`List`](/core-library/list/) | Work with publication lists |
| [`Email`](/core-library/email/) | Send emails programmatically |
| [`TriggeredSend`](/core-library/triggeredsend/) | Initiate triggered send definitions |

HTTP utilities are also part of the Core library but documented separately:

| Object | Description |
|--------|-------------|
| [`HTTP`](/http/http-get/) | Simple HTTP GET and POST |
| [`Script.Util`](/http/script-util-httprequest/) | Advanced HTTP with request objects |

---

## When to Use Core vs Platform.Function

The Core library and `Platform.Function.*` both interact with SFMC data, but have different strengths:

| | Core Library | Platform.Function |
|-|-------------|-------------------|
| DE operations | Object-based (Init → Rows.Retrieve) | Functional (Lookup, InsertData) |
| Subscriber | Rich object model | No direct equivalent |
| Performance (large datasets) | Better for bulk | Better for single lookups |
| CloudPage retrieve | Works correctly | `DataExtension.Rows.Retrieve()` bug |
| Error handling | Exceptions on failure | Returns 0/null |

See [Platform.Function vs Core Library](/getting-started/platform-vs-core/) for a detailed comparison.
