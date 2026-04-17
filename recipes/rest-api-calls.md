---
layout: page
title: REST API Calls
parent: Recipes
parent_url: /recipes/
description: Complete patterns for calling external REST APIs and SFMC's own REST API from SSJS — OAuth2 tokens, GET/POST patterns, error handling, and token caching.
---

## OAuth2 Client Credentials Flow

```javascript
function getOAuthToken(authUrl, clientId, clientSecret) {
    // Check cached token in DE
    var cached = Platform.Function.LookupRows("TokenCache",
        "service", "oauth_" + clientId);
    if (cached && cached.length > 0) {
        var row = cached[0];
        var expiry = new Date(row.expires);
        if (expiry > new Date()) {
            return row.token;
        }
    }

    // Fetch new token
    var payload = Stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret
    });
    var response = Platform.Function.HTTPPost(authUrl, "application/json", payload);
    var tokenData = Platform.Function.ParseJSON(response + "");

    if (!tokenData || !tokenData.access_token) {
        throw new Error("Token fetch failed");
    }

    // Cache token (expire 60s early for safety)
    var expiresAt = Platform.Function.FormatDate(
        Platform.Function.DateAdd(
            Platform.Function.Now(),
            tokenData.expires_in - 60,
            "S"
        ),
        "MM/DD/YYYY HH:mm:ss"
    );
    Platform.Function.UpsertData("TokenCache",
        ["service"], ["oauth_" + clientId],
        ["token", "expires"],
        [tokenData.access_token, expiresAt]
    );

    return tokenData.access_token;
}
```

---

## SFMC REST API — Call Journey Entry Event

```javascript
var authUrl = "https://SUBDOMAIN.auth.marketingcloudapis.com/v2/token";
var apiBase = "https://SUBDOMAIN.rest.marketingcloudapis.com";
var clientId = Platform.Function.Lookup("SFMCConfig", "value", "key", "clientId");
var clientSecret = Platform.Function.Lookup("SFMCConfig", "value", "key", "clientSecret");

var token = getOAuthToken(authUrl, clientId, clientSecret);

var payload = {
    DefinitionKey: "JourneyDefinitionKey_Here",
    ContactKey: subscriberKey,
    EventDefinitionKey: "APIEvent-abc123",
    Data: {
        EmailAddress: email,
        FirstName: firstName,
        ProductId: productId
    }
};

var req = new Script.Util.HttpRequest(apiBase + "/interaction/v1/events");
req.method = "POST";
req.contentType = "application/json";
req.setHeader("Authorization", "Bearer " + token);
req.postData = Stringify(payload);

var resp = req.send();
var result = Platform.Function.ParseJSON(String(resp.content) + "");

if (resp.statusCode === 201) {
    Write(Stringify({ status: "entered", key: subscriberKey }));
} else {
    throw new Error("Journey entry failed: " + resp.statusCode + " " + Stringify(result));
}
```

---

## Generic REST Helper

```javascript
function apiCall(method, url, token, body) {
    var req = new Script.Util.HttpRequest(url);
    req.method = method;
    req.setHeader("Authorization", "Bearer " + token);
    req.setHeader("Accept", "application/json");

    if (body) {
        req.contentType = "application/json";
        req.postData = Stringify(body);
    }

    var resp = req.send();
    var data = Platform.Function.ParseJSON(String(resp.content) + "");

    return {
        status: resp.statusCode,
        ok: resp.statusCode >= 200 && resp.statusCode < 300,
        data: data
    };
}

// Usage
var result = apiCall("GET", apiBase + "/contacts/v1/contacts/" + contactKey, token, null);
if (!result.ok) {
    throw new Error("API error: " + result.status);
}
var contactData = result.data;
```

---

## External API with Retry

```javascript
function callWithRetry(url, method, payload, token, maxRetries) {
    maxRetries = maxRetries || 3;
    var lastError = null;

    for (var attempt = 0; attempt < maxRetries; attempt++) {
        try {
            var req = new Script.Util.HttpRequest(url);
            req.method = method;
            req.setHeader("Authorization", "Bearer " + token);
            if (payload) {
                req.contentType = "application/json";
                req.postData = Stringify(payload);
            }
            var resp = req.send();

            if (resp.statusCode === 429) {
                // Rate limited — wait and retry
                // (SSJS has no sleep, so we skip back-off and just retry)
                continue;
            }

            return { status: resp.statusCode, body: String(resp.content) };
        } catch(e) {
            lastError = e;
        }
    }
    throw lastError || new Error("Max retries exceeded for " + url);
}
```

---

## Webhook Receiver

```javascript
<script runat="server">
Platform.Response.SetContentType("application/json");

var rawBody = Platform.Request.GetPostData();

// Verify HMAC signature
var secret = Platform.Function.Lookup("Config", "value", "key", "webhookSecret");
var sig = Platform.Request.GetRequestHeader("X-Webhook-Signature");
var expected = Platform.Function.HMAC("sha256", secret, rawBody);

if (!sig || sig !== expected) {
    Write(Stringify({ status: 401, statusMessage: "Unauthorized", error: "Invalid signature" }));
    return;
}

var event = Platform.Function.ParseJSON(rawBody + "");

if (!event || !event.type) {
    Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "Missing event type" }));
    return;
}

// Route event
if (event.type === "order.created") {
    Platform.Function.InsertData("Orders",
        ["OrderId", "Email", "Total", "ReceivedAt"],
        [event.data.orderId, event.data.email,
         event.data.total, Platform.Function.Now()]
    );
} else if (event.type === "subscription.cancelled") {
    Platform.Function.UpdateData("Contacts",
        ["Status", "CancelledAt"],
        ["inactive", Platform.Function.Now()],
        ["Email"], [event.data.email]
    );
}

Write(Stringify({ received: true, type: event.type }));
</script>
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/platform-functions/httppost/">Platform.Function.HTTPPost</a></li>
  <li><a href="/platform-functions/hmac/">HMAC</a></li>
  <li><a href="/best-practices/security/">Security Best Practices</a></li>
</ul>
</div>
