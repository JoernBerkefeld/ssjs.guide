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
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jsonString` | string \| boolean \| number | Yes | A JSON-like string, boolean, or number to deserialise. Numbers match the equivalent numeric string. Booleans are accepted but convert to CLR `"True"` / `"False"` (see warning). Arrays and other object arguments throw; `null` and `undefined` return `null`. |

{% include callout.html type="warning" content="Boolean arguments are **accepted** (they do not throw) but convert via CLR stringification to `\"True\"` / `\"False\"` — not JSON boolean primitives, and not the same as `ParseJSON(\"true\")` / `ParseJSON(\"false\")`, which return the lowercase strings `\"true\"` / `\"false\"`. Do not pass booleans expecting JSON-boolean behaviour. See [Known Bugs](/engine-limitations/known-bugs/#parsejson-boolean-arguments-return-clr-true--false)." %}

{% include differs-from-docs.html note="The official docs type the argument as \"string or string[]\" and describe passing an \"array of strings\", but arrays and other object values are not accepted. A number is accepted and matches the equivalent numeric string; a boolean is accepted but yields the CLR strings \"True\"/\"False\". null and undefined return null." %}

{% include test-script.html bundle="platform-functions--parsejson" chapter="parameter-type-deviation" label="Show test script — accepted argument types" %}

{% include test-script.html bundle="platform-functions--parsejson" chapter="parameters" %}

## Return value

Runtime-verified on a CloudPage:

- A JSON **object** string returns a native object; a JSON **array** string returns a host array (with `.length` and index access, though `instanceof Array` is `false`).
- A **scalar** JSON value (`"42"`, `'"hello"'`, `"true"`, `"null"`) is returned **unchanged as a string** — scalars are not deserialised to primitives.
- An **empty** or whitespace-only string, `null`, `undefined`, or malformed structural input such as `"{not json"` returns **`null`** without throwing.
- The parser is **more permissive than strict JSON**: it accepts trailing content after an object, trailing commas, single-quoted keys, and unquoted keys. Do not use successful parsing as proof that an input is standards-compliant JSON.
- A leading Unicode BOM is not skipped; that input comes back as a string rather than a deserialised object.
- Duplicate object keys keep the last value. Numbers use the engine's IEEE-754 number representation, so integers above the safe range lose precision.
- A **number** argument matches `ParseJSON` of the equivalent numeric string. A **boolean** argument is accepted but returns the CLR strings `"True"` / `"False"` (not the lowercase JSON-scalar strings).

{% include differs-from-docs.html note="The official docs give the return type as \"object or object[]\". Runtime-verified: scalar JSON values come back as strings, empty/malformed/null/undefined input can return null, and several non-standard JSON extensions are accepted. The effective return type is object, array, string, or null." %}

{% include test-script.html bundle="platform-functions--parsejson" chapter="return-type-deviation" label="Show test script — return types and permissive parsing" %}

{% include test-script.html bundle="platform-functions--parsejson" chapter="return-value" %}

## Description

`ParseJSON` is the SSJS stand-in for `JSON.parse()` — the native method is absent from the JINT engine that powers SFMC scripting.

> **Runtime-verified behaviour:** contrary to a common belief, `ParseJSON` does **not** throw when passed `null`, `undefined`, a number, or a boolean — it returns `null` (for null/undefined and some invalid structural inputs), a number-matched string, or the CLR strings `"True"` / `"False"` for booleans. Object and array arguments are not accepted. Always check the return value for `null`, and validate strict JSON separately if strict syntax matters.

{% include test-script.html bundle="platform-functions--parsejson" chapter="description" %}

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

{% include test-script.html bundle="platform-functions--parsejson" chapter="examples" %}

## Common Mistakes

**Passing a non-string object or array argument:**

```javascript
// ❌ Passing an array (or any non-string object) throws
//    System.InvalidOperationException at runtime.
var obj = Platform.Function.ParseJSON(["a", "b"]);

// ✅ Pass a single JSON string
var obj = Platform.Function.ParseJSON('["a","b"]');
```

**Not checking the return value:** `ParseJSON` returns `null` for an empty string or some malformed structural input — it does not throw. The JSON text `"null"` is different: as a top-level scalar, it returns the string `"null"`:

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

**Assuming successful parsing means strict JSON:** the runtime also accepts several non-standard forms, including trailing content, trailing commas, single-quoted keys, and unquoted keys. Validate the input with a strict parser before it reaches SFMC when standards compliance or signature verification matters.

{% include test-script.html bundle="platform-functions--parsejson" chapter="common-mistakes" %}

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
