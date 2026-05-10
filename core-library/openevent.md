---
layout: page
title: OpenEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve open tracking events for sends (email opens).
---

`OpenEvent` returns **open** tracking data for sends. Filter by send, subscriber, job, or other properties exposed on the event object for your account.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`OpenEvent.Retrieve(filter)`](#retrieve) | object[] | Open events matching the filter |

---

## Retrieve

### Syntax

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

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
