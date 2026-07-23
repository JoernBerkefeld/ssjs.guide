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
verification: verified
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jsonString` | string | Yes | A single well-formed JSON string to deserialise. Must be a string — an array or other object argument throws a runtime error. |

{% include differs-from-docs.html note="The official docs type the argument as \"string or string[]\" and describe passing an \"array of strings\". Runtime-verified: passing an array (or any non-string object) throws System.InvalidOperationException (\"Unable to retrieve security descriptor for this frame\"). Only a single string argument is accepted." %}

## Return value

Runtime-verified on a CloudPage:

- A JSON **object** string returns a native object; a JSON **array** string returns a host array (with `.length` and index access, though `instanceof Array` is `false`).
- A **scalar** JSON value (`"42"`, `'"hello"'`, `"true"`, `"null"`) is returned **unchanged as a string** — scalars are not deserialised to primitives.
- **Invalid**, **empty**, `null`, or `undefined` input returns **`null`** — it does **not** throw.
- Non-string scalar arguments (number, boolean) are coerced to their string form rather than throwing.

{% include differs-from-docs.html note="The official docs give the return type as \"object or object[]\". Runtime-verified: scalar JSON values come back as strings and invalid/empty/null/undefined input returns null (no error thrown), so the effective return type is object, array, string, or null." %}

## Description

`ParseJSON` is the SSJS stand-in for `JSON.parse()` — the native method is absent from the JINT engine that powers SFMC scripting.

> **Runtime-verified behaviour:** contrary to a common belief, `ParseJSON` does **not** throw when passed `null`, `undefined`, or a non-string scalar — it returns `null` (for null/undefined/invalid input) or a coerced string. The genuine error case is a **wrong argument count** (zero args, or a second argument) or a **non-string object/array** argument, which throw an engine `InvalidOperationException`. Always check the return value for `null`.

## Examples

### Parse a JSON string

```javascript
var json = '{"name":"Jane","score":95,"active":true}';
var obj  = Platform.Function.ParseJSON(json + "");

Write(obj.name);   // Jane
Write(obj.score);  // 95
```

### Always check the return value

```javascript
// Invalid/empty/null input returns null — it does not throw.
var data = Platform.Function.ParseJSON(responseBody);

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

**Passing a non-string object or array argument:**

```javascript
// ❌ Passing an array (or any non-string object) throws
//    System.InvalidOperationException at runtime.
var obj = Platform.Function.ParseJSON(["a", "b"]);

// ✅ Pass a single JSON string
var obj = Platform.Function.ParseJSON('["a","b"]');
```

**Not checking the return value:** `ParseJSON` returns `null` for the JSON `null` literal, an empty string, or invalid JSON — it does not throw:

```javascript
var data = Platform.Function.ParseJSON(str);
if (!data) {
    Write("No data or invalid JSON.");
    return;
}
```

**Expecting scalar deserialisation:** a scalar JSON value is returned unchanged as a **string**, not a primitive:

```javascript
Platform.Function.ParseJSON("42");     // "42"  (string, not number 42)
Platform.Function.ParseJSON("true");   // "true" (string, not boolean true)
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/stringify/">Stringify</a></li>
  <li><a href="/ecmascript-builtins/json/">JSON (built-in — unavailable in SSJS)</a></li>
  <li><a href="/ecmascript-builtins/string-methods/#string-constructor">String()</a></li>
  <li><a href="/language/objects-and-json/">Objects & JSON</a></li>
</ul>
</div>
