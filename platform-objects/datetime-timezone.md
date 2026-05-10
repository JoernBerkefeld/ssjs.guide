---
layout: page
title: DateTime.TimeZone
parent: Platform Objects
parent_url: /platform-objects/
description: Retrieve Marketing Cloud time zone definitions. Requires the Core library.
---

`DateTime.TimeZone` exposes a single retrieve operation for time zone metadata.

{% include callout.html type="warning" content="Requires <code>Platform.Load(\"core\", \"1.1.5\")</code> before use." %}

## Method

### DateTime.TimeZone.Retrieve(filter)

Returns an array of time zones matching the filter. If you pass no filter (or an empty object), all time zones may be returned depending on platform behavior—prefer an explicit filter in production code.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter (for example `{ Property: "ID", SimpleOperator: "equals", Value: 1 }`) |

**Returns:** `object[]` — matching time zone rows.

## Example

```javascript
Platform.Load("core", "1.1.5");

var rows = DateTime.TimeZone.Retrieve({
    Property: "ID",
    SimpleOperator: "equals",
    Value: 1
});
Write(Stringify(rows));
```
