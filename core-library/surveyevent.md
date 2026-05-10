---
layout: page
title: SurveyEvent
parent: Core Library
parent_url: /core-library/
description: Retrieve survey response events tied to sends.
---

`SurveyEvent` returns **survey** interaction rows linked to email sends when surveys are configured for tracking.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`SurveyEvent.Retrieve(filter)`](#retrieve) | object[] | Survey events matching the filter |

---

## Retrieve

### Syntax

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
