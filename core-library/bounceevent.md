---
layout: page
title: BounceEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve bounce tracking events for sends (hard bounce, soft bounce, other bounce).
---

`BounceEvent` exposes **bounce** outcomes for email sends. Only **`Retrieve`** exists on this namespace; pass a WSProxy-style filter (for example on `SendID`, subscriber key, or job identifiers appropriate to your query).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`BounceEvent.Retrieve(filter)`](#retrieve) | object[] | Bounce events matching the filter |

---

## Retrieve

### Syntax

```javascript
BounceEvent.Retrieve(filter)
```

Returns rows describing bounce-related outcomes tied to message sends. Shape depends on event sub-type (hard bounce, soft bounce, etc.). Supply filter criteria that match how your account stores send and subscriber identifiers.

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

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
