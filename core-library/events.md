---
layout: page
title: Tracking events
parent: Core Library
parent_url: /core-library/
description: SOAP-style tracking event namespaces — each exposes Retrieve(filter) for send metrics (bounce, click, open, sent, unsub, not-sent, forward, survey).
verification: verified
requires_core_load: true
---

These Core library objects expose **tracking rows** for email sends. Each namespace implements **`Retrieve(filter)`** with a WSProxy-style filter (for example `{ Property, SimpleOperator, Value }` on `SendID`, subscriber keys, or job fields appropriate to your query).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Summary

| Object | Purpose |
|--------|---------|
| [`BounceEvent`](#bounce-event) | Hard bounce, soft bounce, and related bounce outcomes |
| [`ClickEvent`](#click-event) | Link clicks |
| [`OpenEvent`](#open-event) | Opens |
| [`SentEvent`](#sent-event) | Sent / delivery hand-off events |
| [`UnsubEvent`](#unsub-event) | Unsubscribe events |
| [`NotSentEvent`](#not-sent-event) | Messages that did not send |
| [`ForwardedEmailEvent`](#forwarded-email-event) | Forwarded-email tracking |
| [`ForwardedEmailOptInEvent`](#forwarded-email-opt-in-event) | Forward opt-in tracking |
| [`SurveyEvent`](#survey-event) | Survey response events |

---

## BounceEvent {#bounce-event}

`BounceEvent` exposes **bounce** outcomes for email sends. Only **`Retrieve`** exists on this namespace. Supply filter criteria that match how your account stores send and subscriber identifiers.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`BounceEvent.Retrieve(filter)`](#bounce-event-syntax) | object[] | Bounce events matching the filter |

### Syntax {#bounce-event-syntax}

```javascript
BounceEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria for the search |

### Return value

`object[]` — matching bounce events.

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var bounces = BounceEvent.Retrieve(filter);
```

---

## ClickEvent {#click-event}

`ClickEvent` returns **click** tracking rows. Use criteria such as send ID, subscriber key, or URL identifiers depending on your reporting needs.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`ClickEvent.Retrieve(filter)`](#click-event-syntax) | object[] | Click events matching the filter |

### Syntax {#click-event-syntax}

```javascript
ClickEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var clicks = ClickEvent.Retrieve(filter);
```

---

## OpenEvent {#open-event}

`OpenEvent` returns **open** tracking data. Filter by send, subscriber, job, or other properties exposed on the event object for your account.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`OpenEvent.Retrieve(filter)`](#open-event-syntax) | object[] | Open events matching the filter |

### Syntax {#open-event-syntax}

```javascript
OpenEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var opens = OpenEvent.Retrieve(filter);
```

---

## SentEvent {#sent-event}

`SentEvent` exposes **sent** events (distinct from opens/clicks/bounces). Align filters with how send and subscriber identifiers are stored for your queries.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`SentEvent.Retrieve(filter)`](#sent-event-syntax) | object[] | Sent events matching the filter |

### Syntax {#sent-event-syntax}

```javascript
SentEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var sent = SentEvent.Retrieve(filter);
```

---

## UnsubEvent {#unsub-event}

`UnsubEvent` returns **unsubscribe** tracking rows. Combine filters on send ID, subscriber key, or related fields as needed.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`UnsubEvent.Retrieve(filter)`](#unsub-event-syntax) | object[] | Unsubscribe events matching the filter |

### Syntax {#unsub-event-syntax}

```javascript
UnsubEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var unsubs = UnsubEvent.Retrieve(filter);
```

---

## NotSentEvent {#not-sent-event}

`NotSentEvent` surfaces cases where a message **did not send**. Filter properties depend on the fields exposed for your jobs (send ID, reason codes, subscriber identifiers, etc.).

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`NotSentEvent.Retrieve(filter)`](#not-sent-event-syntax) | object[] | Not-sent events matching the filter |

### Syntax {#not-sent-event-syntax}

```javascript
NotSentEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var notSent = NotSentEvent.Retrieve(filter);
```

---

## ForwardedEmailEvent {#forwarded-email-event}

`ForwardedEmailEvent` returns rows when recipients **forward** email through tracked forward mechanics.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`ForwardedEmailEvent.Retrieve(filter)`](#forwarded-email-event-syntax) | object[] | Forwarded-email events matching the filter |

### Syntax {#forwarded-email-event-syntax}

```javascript
ForwardedEmailEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var forwards = ForwardedEmailEvent.Retrieve(filter);
```

---

## ForwardedEmailOptInEvent {#forwarded-email-opt-in-event}

`ForwardedEmailOptInEvent` captures **opt-in** actions associated with forwarded-email flows when that tracking is enabled for your account.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`ForwardedEmailOptInEvent.Retrieve(filter)`](#forwarded-email-opt-in-event-syntax) | object[] | Events matching the filter |

### Syntax {#forwarded-email-opt-in-event-syntax}

```javascript
ForwardedEmailOptInEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var optIns = ForwardedEmailOptInEvent.Retrieve(filter);
```

---

## SurveyEvent {#survey-event}

`SurveyEvent` returns **survey** interaction rows linked to email sends when surveys are configured for tracking.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`SurveyEvent.Retrieve(filter)`](#survey-event-syntax) | object[] | Survey events matching the filter |

### Syntax {#survey-event-syntax}

```javascript
SurveyEvent.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");

var sendID = 12345;
var filter = { Property: "SendID", SimpleOperator: "equals", Value: sendID };
var surveys = SurveyEvent.Retrieve(filter);
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
