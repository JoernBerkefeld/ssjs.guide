---
layout: function
title: ParseJSON
parent: Platform Functions
parent_url: /platform-functions/
description: Converts a JSON string into a native JavaScript object or array. SFMC's built-in substitute for JSON.parse(), which the SSJS engine does not provide.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.ParseJSON(jsonString)"
return_type: object
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jsonString` | string | Yes | Well-formed JSON string to deserialise |

## Description

`ParseJSON` is the SSJS stand-in for `JSON.parse()` — the native method is absent from the JINT engine that powers SFMC scripting.

> **Critical caveat:** `ParseJSON` throws a server **500 error** if passed `null`, `undefined`, or a non-string value. Always coerce to string with `+ ""` before calling.

## Examples

### Parse a JSON string

```javascript
var json = '{"name":"Jane","score":95,"active":true}';
var obj  = Platform.Function.ParseJSON(json + "");

Write(obj.name);   // Jane
Write(obj.score);  // 95
```

### Safe pattern: always use `+ ""`

```javascript
// ✅ Safe — even if responseBody is null, this won't throw
var data = Platform.Function.ParseJSON(responseBody + "");

if (data) {
    Write(data.title);
}
```

### Parse HTTP response

The most common use case:

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + accessToken);
var resp = req.send();

// Step 1: Convert CLR response to JS string
var bodyStr = String(resp.content);

// Step 2: Parse JSON string to object
var data = Platform.Function.ParseJSON(bodyStr + "");

if (data && data.results) {
    for (var i = 0; i < data.results.length; i++) {
        Write(data.results[i].name + "<br>");
    }
}
```

### Parse stored JSON from a DE

```javascript
var jsonStr = Platform.Function.Lookup("Config", "Value", "Key", "api_settings");
var settings = Platform.Function.ParseJSON(jsonStr + "");

var endpoint = settings && settings.endpoint || "/api/v1";
var timeout  = settings && settings.timeout  || 30;
```

### Array parsing

```javascript
var arrayJson = '["red","green","blue"]';
var colors = Platform.Function.ParseJSON(arrayJson + "");

for (var i = 0; i < colors.length; i++) {
    Write(colors[i] + "<br>");
}
```

## Common Mistakes

**Not using `+ ""`:**

```javascript
// ❌ If jsonString is null/undefined → 500 error
var obj = Platform.Function.ParseJSON(jsonString);

// ✅ Safe coercion
var obj = Platform.Function.ParseJSON(jsonString + "");
```

**Not checking the return value:** `ParseJSON` returns `null` if the string is `"null"`, `""`, or invalid JSON:

```javascript
var data = Platform.Function.ParseJSON(str + "");
if (!data) {
    Write("No data or invalid JSON.");
    return;
}
```

**ESLint rule:** `sfmc/ssjs-prefer-parsejson-safe-arg` auto-fixes missing `+ ""` coercion.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/stringify/">Stringify</a></li>
  <li><a href="/global-functions/string/">String()</a></li>
  <li><a href="/language/objects-and-json/">Objects & JSON</a></li>
</ul>
</div>
