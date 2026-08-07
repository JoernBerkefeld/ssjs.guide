---
layout: category
title: HTTP Functions
description: Three approaches to making HTTP requests from SSJS — Platform.Function.HTTPGet/HTTPPost, Core HTTP.Get/HTTP.Post, and Script.Util.HttpRequest for full control.
nav_order: 8
has_children: true
differs_from_docs: true
aggregate_verification: false
---

SSJS offers three different ways to make HTTP requests. Choose based on how much control you need:

| API | Control Level | Best For |
|-----|--------------|----------|
| [Platform.Function.HTTPGet](/platform-functions/httpget/) / [Platform.Function.HTTPPost](/platform-functions/httppost/) | Basic | Simple GET/POST without a Core load — but the two return different things: `HTTPGet` hands back the **response body** as a string, `HTTPPost` only the **numeric status code** (its `response` out-parameter stays empty, so the body is unreachable) |
| [HTTP.Get](/http/get/) / [HTTP.Post](/http/post/) (Core) | Medium | Same transport as syndicated HTTP docs — returns a **status + body object** |
| [Script.Util.HttpGet](/http/script-util-httpget/) | Full-ish | Shorthand for `Script.Util.HttpRequest` with GET method but without control over timeouts and returned encoding/content-type |
| [Script.Util.HttpRequest](/http/script-util-httprequest/) | Full | Custom methods, headers, auth, timeouts, status codes and returns most details |
| [HTTPHeader](/core-library/httpheader/) (Core) | Header helpers | Read, set, and remove named HTTP headers |

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

Encode `user:password` with [`Platform.Function.Base64Encode`](/platform-functions/base64encode/) and send the result as the `Authorization: Basic …` header. Keep the credentials themselves out of the page — read them from a secure store rather than hard-coding them:

```javascript
var basic = Platform.Function.Base64Encode(apiUser + ":" + apiSecret);

var req = new Script.Util.HttpRequest("https://api.example.com/resource");
req.method = "GET";
req.setHeader("Authorization", "Basic " + basic);
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
// Platform.Function.HTTPPost hands back the HTTP status code, never the body,
// so the token request has to go through Script.Util.HttpRequest instead.
var authReq = new Script.Util.HttpRequest(authEndpoint);
authReq.method = "POST";
authReq.contentType = "application/json";
authReq.postData = authPayload;
var authResp = authReq.send();

// statusCode is a CLR value — Number() converts it so === works
var authStatus = Number(authResp.statusCode);
var tokenData = Platform.Function.ParseJSON(String(authResp.content) + "");

if (authStatus !== 200 || !tokenData || !tokenData.access_token) {
    throw new Error("Token fetch failed with status " + authStatus);
}
var token = tokenData.access_token;

// Step 2: Call API with token
var req = new Script.Util.HttpRequest("https://mc.rest.api.example.com/v2/contacts");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + token);
var resp = req.send();
var contacts = Platform.Function.ParseJSON(String(resp.content));
```
