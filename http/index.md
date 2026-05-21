---
layout: category
title: HTTP & REST APIs
description: Three approaches to making HTTP requests from SSJS — Platform.Function.HTTPGet/HTTPPost, Core HTTP.Get/HTTP.Post, and Script.Util.HttpRequest for full control.
nav_order: 8
has_children: true
---

SSJS offers three different ways to make HTTP requests. Choose based on how much control you need:

| API | Control Level | Best For |
|-----|--------------|----------|
| `Platform.Function.HTTPGet` / `Platform.Function.HTTPPost` | Basic | Simple GET/POST; response body only |
| `HTTP.Get` / `HTTP.Post` (Core) | Medium | Same transport as syndicated HTTP docs — returns a **status + body object** |
| `Script.Util.HttpGet` | Full-ish | Shorthand for `Script.Util.HttpRequest` with GET method but without control over timeouts and returned encoding/content-type |
| `Script.Util.HttpRequest` | Full | Custom methods, headers, auth, timeouts, status codes and returns most details |

---

## Quick Comparison

```javascript
// 1. Platform.Function — simplest, body string
var body = Platform.Function.HTTPGet("https://api.example.com/data");

// 2. Core HTTP — object with status + Content (requires Platform.Load)
Platform.Load("core", "1.1.5");
var response = HTTP.Get("https://api.example.com/data");
Write(Stringify(response));

// 3. Script.Util.HttpRequest — full control
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + token);
var resp = req.send();
Write("Status: " + resp.statusCode + ", Body: " + String(resp.content));
```

---

## In This Section

| Page | Description |
|------|-------------|
| [HTTP.Get](/http/get/) | Core library GET — returns response object |
| [HTTP.Post](/http/post/) | Core library POST — returns response object |
| [Script.Util.HttpGet](/http/script-util-httpget/) | Full-featured HTTP GET request object |
| [Script.Util.HttpRequest](/http/script-util-httprequest/) | Full-featured HTTP request object |
| [Platform.Function.HTTPGet](/platform-functions/httpget/) | Simple GET without Core load |
| [Platform.Function.HTTPPost](/platform-functions/httppost/) | Simple POST without Core load |

---

## Authentication Patterns

### Bearer Token

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/resource");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + accessToken);
req.setHeader("Accept", "application/json");
var resp = req.send();
var data = Platform.Function.ParseJSON(String(resp.content));
```

### Basic Auth

Core SSJS does not expose `Platform.Function.Base64Encode`. Build a Basic token outside the runtime (secret store, token service) or derive it via AMPscript inside `TreatAsContent`, then pass the finished `Authorization: Basic …` header:

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/resource");
req.method = "GET";
req.setHeader("Authorization", "Basic " + basicCredentialsFromSecureStorage);
var resp = req.send();
```

### SFMC REST API OAuth2

```javascript
// Step 1: Get access token
var authPayload = Stringify({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret
});
var authResp = Platform.Function.HTTPPost(
    authEndpoint,
    "application/json",
    authPayload
);
var token = Platform.Function.ParseJSON(authResp + "").access_token;

// Step 2: Call API with token
var req = new Script.Util.HttpRequest("https://mc.rest.api.example.com/v2/contacts");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + token);
var resp = req.send();
var contacts = Platform.Function.ParseJSON(String(resp.content));
```
