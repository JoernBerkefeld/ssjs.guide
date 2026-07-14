---
layout: function
title: Platform.Function.Stringify
parent: Platform Functions
parent_url: /platform-functions/
description: Converts an object or value to its JSON string representation. Does not require Platform.Load.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Stringify(object)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `object` | any | Yes | The object or value to serialize to JSON. |

## Description

`Platform.Function.Stringify()` converts any JavaScript value to its JSON string representation. It is the SSJS equivalent of `JSON.stringify()`, which is not available in the SFMC SSJS engine.

### Difference from the global `Stringify()` form

Both functions produce identical output, but they differ in one important way:

| | `Platform.Function.Stringify()` | `Stringify()` (global) |
|---|---|---|
| Requires `Platform.Load` | **No** | **Yes** — `Platform.Load("core", "1.1.5")` |

Prefer `Platform.Function.Stringify()` when you do not already have a `Platform.Load` call in scope, or when you want to avoid the initialization overhead.

See [Stringify](/core-library/stringify/) for the bare-name Core variant.

**Important distinction from `String()`:**
- `Platform.Function.Stringify(obj)` → produces JSON output: `{"name":"Jane","age":30}`
- `String(obj)` → converts CLR/.NET objects to JavaScript strings (not JSON)

Use `Stringify` / `Platform.Function.Stringify` when you want to store, log, or send JSON data.
Use `String()` when you need to convert CLR response content from `Script.Util.HttpRequest.send()` before parsing it with `ParseJSON`.

## Examples

### Serialize an object

```javascript
var person = {
    name: "Jane Smith",
    email: "jane@example.com",
    score: 95
};

var json = Platform.Function.Stringify(person);
Platform.Function.Write(json);
// {"name":"Jane Smith","email":"jane@example.com","score":95}
```

### Store JSON in a Data Extension

```javascript
var payload = {
    action: "page_view",
    page: "/preferences",
    timestamp: Platform.Function.Now()
};

Platform.Function.InsertData(
    "ActivityLog",
    "SubscriberKey", subscriberKey,
    "Payload", Platform.Function.Stringify(payload),
    "Timestamp", Platform.Function.Now()
);
```

### Debug: inspect any variable

```javascript
var rows = Platform.Function.LookupRows("MyDE", "Status", "active");
Platform.Function.Write("<pre>" + Platform.Function.Stringify(rows) + "</pre>");
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/stringify/">Stringify() — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/ecmascript-builtins/string-methods/#string-constructor">String()</a></li>
  <li><a href="/platform-functions/parsejson/">Platform.Function.ParseJSON</a></li>
  <li><a href="/platform-functions/write/">Platform.Function.Write</a></li>
</ul>
</div>
