---
layout: page
title: UnsubEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve unsubscribe events tied to sends and subscriber actions.
---

`UnsubEvent` returns **unsubscribe** tracking rows (list or global unsubscribes as modeled for your account). Combine filters on send ID, subscriber key, or related fields as needed.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`UnsubEvent.Retrieve(filter)`](#retrieve) | object[] | Unsubscribe events matching the filter |

---

## Retrieve

### Syntax

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

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
