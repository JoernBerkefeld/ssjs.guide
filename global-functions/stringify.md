---
layout: function
title: Stringify
parent: Global Functions
parent_url: /global-functions/
description: Converts an object or value to its JSON string representation. SFMC's equivalent of JSON.stringify() — not the same as the native String() function.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Stringify(value)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | any | Yes | The object or value to serialize to JSON. |

## Description

`Stringify()` is a global SSJS function that converts any JavaScript value to its JSON string representation. It is the SSJS equivalent of `JSON.stringify()`, which is not available in the SFMC SSJS engine.

**Important distinction from `String()`:**
- `Stringify(obj)` → produces JSON output: `{"name":"Jane","age":30}`
- `String(obj)` → converts CLR/.NET objects to JavaScript strings (not JSON)

Use `Stringify` when you want to store, log, or send JSON data.
Use `String()` when you need to convert the CLR response content from `Script.Util.HttpRequest.send()` before parsing it with `ParseJSON`.

## Examples

### Serialize an object

```javascript
var person = {
    name: "Jane Smith",
    email: "jane@example.com",
    score: 95
};

var json = Stringify(person);
Write(json);
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
    "Payload", Stringify(payload),
    "Timestamp", Platform.Function.Now()
);
```

### Debug: inspect any variable

```javascript
var rows = Platform.Function.LookupRows("MyDE", "Status", "active");
Write("<pre>" + Stringify(rows) + "</pre>");
```

### Error object serialization

When catching errors, `Stringify(e)` serializes the error object for logging:

```javascript
try {
    doSomething();
} catch (e) {
    // Stringify the error for human-readable logging
    var errorJson = Stringify(e);
    Platform.Function.InsertData("ErrorLog", "Error", errorJson, "Timestamp", Platform.Function.Now());
}
```

### Sending JSON via HTTP

```javascript
var requestBody = Stringify({
    subscriberKey: sk,
    email: email,
    status: "active"
});

var req = new Script.Util.HttpRequest("https://api.example.com/subscribers");
req.method = "POST";
req.setHeader("Content-Type", "application/json");
req.setHeader("Authorization", "Bearer " + token);
req.postData = requestBody;
var resp = req.send();
```

## Common Mistakes

**Using Stringify instead of String for HTTP responses:**

```javascript
// ❌ Wrong — Stringify doesn't convert CLR objects correctly
var req = new Script.Util.HttpRequest(url);
var resp = req.send();
var body = Stringify(resp.content); // May produce "{}" or wrong output

// ✅ Correct — use String() for CLR → JS conversion, then ParseJSON
var body = String(resp.content);
var data = Platform.Function.ParseJSON(body + "");
```

**Circular reference objects:** `Stringify` may fail or produce incorrect output for objects with circular references. Flatten the data structure first.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/string/">String()</a></li>
  <li><a href="/platform-functions/parsejson/">Platform.Function.ParseJSON</a></li>
  <li><a href="/global-functions/write/">Write</a></li>
  <li><a href="/language/objects-and-json/">Objects & JSON</a></li>
</ul>
</div>
