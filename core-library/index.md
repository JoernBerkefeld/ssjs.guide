---
layout: category
title: Core Library
description: The SSJS Core library provides object-oriented APIs for Data Extensions, Subscribers, Lists, Email sends, HTTP requests, and more. Load with Platform.Load("core", "1.1.5").
nav_order: 6
has_children: true
differs_from_docs: true
aggregate_verification: false
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
| [`DateTime`](/core-library/datetime/) | Date-time conversion helpers and time zone lookup |
| [`DeliveryProfile`](/core-library/deliveryprofile/) | Delivery profiles |
| [`Email`](/core-library/email/) | Classic Email Studio message definitions (**deprecated** — prefer Content Builder `htmlemail`) |
| [`FilterDefinition`](/core-library/filterdefinition/) | Data filters |
| [`Folder`](/core-library/folder/) | Content folders |
| [`HTTPHeader`](/core-library/httpheader/) | Read, set, and remove named HTTP headers |
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

## Bare-name Core functions and objects {#bare-name-globals}

`Platform.Load("core", ...)` also injects a set of **bare-name** functions and objects (historically documented as "global functions"). They exist **only after** the load has run — always call `Platform.Load("core", ...)` before you use them.

Once the load has run **at the top level of a script block**, the names are reachable for the rest of the request: at the top level, inside a helper declared *after* the load, inside a helper declared *before* it, inside a function expression assigned before it, inside nested and three-level-nested helpers, and inside a separate `<script runat="server">` block that performs no load of its own. Calling them from a helper works fine, so the bare names are not `undefined` inside helpers.

The mechanism is **not** lexical closure, though: an ordinary `var` declared next to the `Platform.Load` call does *not* escape that function, while the injected names do. The load writes the names into request-wide scope, and helpers reach them through the normal scope chain rather than by capturing the load scope.

{% include callout.html type="warning" content="Run `Platform.Load` at the TOP LEVEL of a script block. If the only load runs inside a function body, the bare Core **objects** (`DataExtension`, `Request`, `Variable`, …) still become available request-wide, but the bare Core **functions** (`Write`, `Stringify`, `Base64Encode`, …) stay `undefined` everywhere — including inside that same function — and calling one throws `Object expected: Write`." %}

Where a scope-independent `Platform.*` sibling exists, you may still prefer it for clarity.

| Function / Object | Description |
|--------|-------------|
| [`Attribute`](/core-library/attribute/) | Subscriber attribute values (`Attribute.GetValue`) |
| [`Base64Decode(encodedString)`](/core-library/base64decode/) | Decode Base64 to plain text |
| [`Base64Encode(string)`](/core-library/base64encode/) | Encode plain text to Base64 |
| [`BeginImpressionRegion(name)`](/core-library/beginimpressionregion/) | Start an impression region (unusable from SSJS — AMPscript-only) |
| [`ContentArea(id, …)`](/core-library/contentarea/) | Classic Content Area by ID (**deprecated**) |
| [`ContentAreaByName(name, …)`](/core-library/contentareabyname/) | Classic Content Area by name (**deprecated**) |
| [`EndImpressionRegion([closeAll])`](/core-library/endimpressionregion/) | End an impression region (returns `undefined`) |
| [`Format(value, formatCode)`](/core-library/format/) | Format numbers and dates |
| [`GUID()`](/core-library/guid/) | Generate a lowercase UUID v4 string |
| [`IsEmailAddress(value)`](/core-library/isemailaddress/) | Validate email address format |
| [`IsPhoneNumber(value)`](/core-library/isphonenumber/) | Validate phone number format |
| [`Now([useContextTime])`](/core-library/now/) | Current server date/time as a `Date` object |
| [`Redirect(url, movedPermanently)`](/core-library/redirect/) | Redirect the browser (CloudPages) |
| [`Request`](/core-library/request/) | Read incoming request values (`Request.URL()`, …) — a distinct object from [`Platform.Request`](/platform-objects/platform-request/), not an alias |
| [`Stringify(value)`](/core-library/stringify/) | Serialize a value to JSON |
| [`Variable`](/core-library/variable/) | AMPscript variable bridge (`Variable.GetValue` / `SetValue`) |
| [`Write(content)`](/core-library/write/) | Output a string to the rendered page |

{% include test-script.html bundle="core-library--index" chapter="bare-name-globals" %}

---

HTTP utilities are also part of the Core library but documented separately:

| Object | Description |
|--------|-------------|
| [`HTTP.Get`](/http/get/) | Simple HTTP GET |
| [`HTTP.Post`](/http/post/) | Simple HTTP POST |

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
| Returned field types | `DataExtension.Rows.Retrieve()` stringifies every value | `Lookup*` can return typed values (`string`, `number`, `boolean`, `Date`) |
| Error handling | Exceptions on failure | Returns 0/null |

See [Platform.Function vs Core Library](/getting-started/platform-vs-core/) for a detailed comparison.
