---
layout: page
title: ClickEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve click tracking events for sends (links clicked in messages).
---

`ClickEvent` returns **click** tracking rows for messages. Use **`ClickEvent.Retrieve(filter)`** with criteria such as send ID, subscriber key, or URL identifiers depending on your reporting needs.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`ClickEvent.Retrieve(filter)`](#retrieve) | object[] | Click events matching the filter |

---

## Retrieve

### Syntax

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

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/#events">Tracking events overview</a></li>
</ul>
</div>
