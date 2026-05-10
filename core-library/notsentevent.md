---
layout: page
title: NotSentEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve not-sent events — messages that did not go out (suppressions, holds, etc.).
---

`NotSentEvent` surfaces cases where a message **did not send**. Filter properties depend on the fields exposed for your jobs (send ID, reason codes, subscriber identifiers, etc.).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`NotSentEvent.Retrieve(filter)`](#retrieve) | object[] | Not-sent events matching the filter |

---

## Retrieve

### Syntax

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

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
