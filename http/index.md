---
layout: category
title: HTTP & REST APIs
description: Three approaches to making HTTP requests from SSJS — Platform.Function.HTTPGet/HTTPPost, the Core HTTP object, and Script.Util.HttpRequest for full control.
nav_order: 8
has_children: true
---

SSJS offers three different ways to make HTTP requests. Choose based on how much control you need:

| API | Control Level | Best For |
|-----|--------------|----------|
| `Platform.Function.HTTPGet/HTTPPost` | Basic | Simple GET/POST, no status code needed |
| `HTTP.Get / HTTP.Post / HTTP.GetRequest / HTTP.PostRequest` | Medium | When you need response status codes |
| `Script.Util.HttpRequest` | Full | Custom methods, headers, auth, timeouts |

---

## Quick Comparison

```javascript
// 1. Platform.Function — simplest, body only
var body = Platform.Function.HTTPGet("https://api.example.com/data");

// 2. Core HTTP — status code + body (requires Platform.Load)
Platform.Load("core", "1.1.5");
var statusCode = [0];
var body = HTTP.Get(["https://api.example.com/data"], statusCode);
Write("Status: " + statusCode[0] + ", Body: " + body);

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
| [HTTP.Get](/http/http-get/) | Core library simple GET request |
| [HTTP.Post](/http/http-post/) | Core library simple POST request |
| [HTTP.GetRequest](/http/http-getrequest/) | Core library GET with status code |
| [HTTP.PostRequest](/http/http-postrequest/) | Core library POST with status code |
| [Script.Util.HttpRequest](/http/script-util-httprequest/) | Full-featured HTTP request object |

The `Platform.Function.HTTPGet` and `Platform.Function.HTTPPost` equivalents are documented in the [Platform Functions](/platform-functions/) section.

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

```javascript
var credentials = Platform.Function.Base64Encode("username:password");
var req = new Script.Util.HttpRequest("https://api.example.com/resource");
req.method = "GET";
req.setHeader("Authorization", "Basic " + credentials);
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
