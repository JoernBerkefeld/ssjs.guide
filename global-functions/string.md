---
layout: function
title: String()
parent: Global Functions
parent_url: /global-functions/
description: Native JavaScript function that converts any value to its string representation. Essential for converting CLR/.NET response objects from Script.Util.HttpRequest to JavaScript strings.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "String(value)"
return_type: string
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | any | Yes | Value to convert to string. Accepts any type including CLR/.NET objects. |

## Description

`String()` is the native JavaScript string conversion function. In standard JavaScript, it converts primitives like numbers and booleans to their string form. In SFMC SSJS, it has a critical additional use case: **converting the CLR (Common Language Runtime) response object** returned by `Script.Util.HttpRequest.send().content` into a JavaScript string.

The `.content` property of an HTTP response is a .NET object, not a JavaScript string. It cannot be passed directly to `Platform.Function.ParseJSON()`. You must first call `String(resp.content)` to convert it.

**Difference from `Stringify()`:**
- `String(value)` → converts any value (including CLR objects) to a plain JS string
- `Stringify(value)` → serializes a JavaScript value to a JSON string

## Examples

### Convert HTTP response content for JSON parsing

This is the primary use case for `String()` in SSJS:

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + accessToken);
var resp = req.send();

// resp.content is a CLR object — cannot pass directly to ParseJSON
var bodyStr = String(resp.content);   // CLR → JS string
var data    = Platform.Function.ParseJSON(bodyStr + ""); // JS string → JS object

Write(data.name);
```

### Number to string

```javascript
var n = 42;
var s = String(n); // "42"
Write(s + " items");
```

### Boolean to string

```javascript
var active = true;
Write("Active: " + String(active)); // "Active: true"
```

### Complete HTTP + JSON pattern

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

try {
    // Fetch an OAuth token (example)
    var tokenReq = new Script.Util.HttpRequest("https://auth.example.com/token");
    tokenReq.method = "POST";
    tokenReq.setHeader("Content-Type", "application/x-www-form-urlencoded");
    tokenReq.postData = "grant_type=client_credentials&client_id=xxx&client_secret=yyy";
    var tokenResp = tokenReq.send();

    if (tokenResp.statusCode !== 200) {
        throw new Error("Token request failed: " + tokenResp.statusCode);
    }

    // Convert CLR content → string → object
    var tokenObj = Platform.Function.ParseJSON(String(tokenResp.content) + "");
    var accessToken = tokenObj.access_token;

    // Use token in another request
    var dataReq = new Script.Util.HttpRequest("https://api.example.com/subscribers");
    dataReq.method = "GET";
    dataReq.setHeader("Authorization", "Bearer " + accessToken);
    var dataResp = dataReq.send();

    var result = Platform.Function.ParseJSON(String(dataResp.content) + "");
    Write(Stringify(result));

} catch (e) {
    Write("Error: " + e.message);
}
</script>
```

## Common Mistakes

**Not using `String()` before `ParseJSON`:**

```javascript
// ❌ May fail — resp.content is a CLR object, not a JS string
var data = Platform.Function.ParseJSON(resp.content);

// ✅ Convert first
var data = Platform.Function.ParseJSON(String(resp.content) + "");
```

**Confusing `String()` with `Stringify()`:**

```javascript
var obj = { a: 1, b: 2 };

String(obj);      // "[object Object]"   — NOT useful for JSON
Stringify(obj);   // '{"a":1,"b":2}'     — JSON serialization
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/stringify/">Stringify</a></li>
  <li><a href="/platform-functions/parsejson/">Platform.Function.ParseJSON</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
</ul>
</div>
