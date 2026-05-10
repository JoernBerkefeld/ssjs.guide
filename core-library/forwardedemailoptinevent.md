---
layout: page
title: ForwardedEmailOptInEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve forwarded-email opt-in events for sends.
---

`ForwardedEmailOptInEvent` captures **opt-in** actions associated with forwarded-email flows when that tracking is enabled for your account.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`ForwardedEmailOptInEvent.Retrieve(filter)`](#retrieve) | object[] | Events matching the filter |

---

## Retrieve

### Syntax

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

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
