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
| [`Account`](/core-library/account/) | Account settings |
| [`AccountUser`](/core-library/accountuser/) | Users in the business unit |
| [`ContentAreaObj`](/core-library/contentareaobj/) | Classic Content Areas (**deprecated** object — not `ContentArea()` global) |
| [`DataExtension`](/core-library/dataextension/) | Initialize and work with Data Extensions |
| [`DataExtension.Fields`](/core-library/dataextension-fields/) | Field definitions on a DE |
| [`DataExtension.Rows`](/core-library/dataextension-rows/) | Retrieve, Add, Update, Remove rows |
| [`DeliveryProfile`](/core-library/deliveryprofile/) | Delivery profiles |
| [`Email`](/core-library/email/) | Email message definitions |
| [`FilterDefinition`](/core-library/filterdefinition/) | Data filters |
| [`Folder`](/core-library/folder/) | Content folders |
| [`List`](/core-library/list/) | Work with publication lists |
| [`List.Subscribers`](/core-library/list-subscribers/) | Subscribers on a specific list |
| [`Portfolio`](/core-library/portfolio/) | Portfolio (file) assets |
| [`QueryDefinition`](/core-library/querydefinition/) | SQL query activities |
| [`Send`](/core-library/send/) | Email sends |
| [`Send.Definition`](/core-library/senddefinition/) | Send Definition configurations |
| [`SendClassification`](/core-library/sendclassification/) | Send classifications |
| [`SenderProfile`](/core-library/senderprofile/) | Sender profiles |
| [`Subscriber`](/core-library/subscriber/) | Manage All Subscribers list entries |
| [`Template`](/core-library/template/) | Email templates |
| [`TriggeredSend`](/core-library/triggeredsend/) | Triggered send definitions and sends |

HTTP utilities are also part of the Core library but documented separately:

| Object | Description |
|--------|-------------|
| [`HTTP.GET`](/http/get/) | Simple HTTP GET |
| [`HTTP.POST`](/http/post/) | Simple HTTP POST |

---

## Tracking events {#events}

SOAP-style tracking event objects expose `Retrieve(filter)` for send metrics:

| Object | Page |
|--------|------|
| [`BounceEvent`](/core-library/events/#bounce-event) | Bounce events |
| [`ClickEvent`](/core-library/events/#click-event) | Click events |
| [`ForwardedEmailEvent`](/core-library/events/#forwarded-email-event) | Forwarded email events |
| [`ForwardedEmailOptInEvent`](/core-library/events/#forwarded-email-opt-in-event) | Forwarded opt-in events |
| [`NotSentEvent`](/core-library/events/#not-sent-event) | Not-sent events |
| [`OpenEvent`](/core-library/events/#open-event) | Open events |
| [`SentEvent`](/core-library/events/#sent-event) | Sent events |
| [`SurveyEvent`](/core-library/events/#survey-event) | Survey events |
| [`UnsubEvent`](/core-library/events/#unsub-event) | Unsubscribe events |

See **[Tracking events](/core-library/events/)** for full documentation on every type.

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
