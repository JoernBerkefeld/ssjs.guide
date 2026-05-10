---
layout: page
title: ForwardedEmailEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve forwarded-email tracking events for sends.
---

`ForwardedEmailEvent` returns rows when recipients **forward** email through tracked forward mechanics. Apply filters appropriate to your reporting (send ID, subscriber key, etc.).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`ForwardedEmailEvent.Retrieve(filter)`](#retrieve) | object[] | Forwarded-email events matching the filter |

---

## Retrieve

### Syntax

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

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
