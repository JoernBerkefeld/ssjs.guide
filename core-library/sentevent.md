---
layout: page
title: SentEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve sent events — confirmation that messages were handed off for delivery.
---

`SentEvent` exposes **sent** events for message sends (distinct from opens/clicks/bounces). Use filters aligned with how send and subscriber identifiers are stored for your queries.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`SentEvent.Retrieve(filter)`](#retrieve) | object[] | Sent events matching the filter |

---

## Retrieve

### Syntax

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

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
