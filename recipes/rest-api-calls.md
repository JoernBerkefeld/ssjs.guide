---
layout: page
title: REST API Calls
parent: Recipes
parent_url: /recipes/
description: Complete patterns for calling external REST APIs and SFMC's own REST API from SSJS — OAuth2 tokens, GET/POST patterns, error handling, and token caching.
---

## OAuth2 Client Credentials Flow

```javascript
function dateAdd(timestamp,intervalToAdd,intervalType) {
    Platform.Variable.SetValue("@dateAdd_ts",timestamp);
    Platform.Variable.SetValue("@dateAdd_add",intervalToAdd);
    Platform.Variable.SetValue("@dateAdd_type",intervalType);
    return Platform.Function.TreatAsContent("%%=DateAdd(@dateAdd_ts, @dateAdd_add, @dateAdd_type)=%%");
}
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return Platform.Function.TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

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
    // Platform.Function.HTTPPost hands back the HTTP status code, never the body,
    // so the token request has to go through Script.Util.HttpRequest instead.
    var req = new Script.Util.HttpRequest(authUrl);
    req.method = "POST";
    req.contentType = "application/json";
    req.postData = payload;
    var resp = req.send();

    // statusCode is a CLR value — Number() converts it so === works
    var status = Number(resp.statusCode);
    var tokenData = Platform.Function.ParseJSON(String(resp.content) + "");

    if (status !== 200 || !tokenData || !tokenData.access_token) {
        throw new Error("Token fetch failed with status " + status);
    }

    // Cache token (expire a minute early for safety). DateAdd has no seconds unit —
    // only Y, M, D, H and MI — so convert the expires_in seconds to whole minutes.
    var lifetimeMinutes = Math.floor((tokenData.expires_in - 60) / 60);
    var expiresAt = formatDate(
        dateAdd(
            Platform.Function.Now(),
            lifetimeMinutes,
            "MI"
        ),
        "MM/DD/YYYY","HH:mm:ss"
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

// statusCode is a CLR value — Number() converts it so === works
var status = Number(resp.statusCode);
if (status === 201) {
    Write(Stringify({ status: "entered", key: subscriberKey }));
} else {
    throw new Error("Journey entry failed: " + status + " " + Stringify(result));
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

    // statusCode is a CLR value — Number() converts it to a real JavaScript number
    var status = Number(resp.statusCode);
    return {
        status: status,
        ok: status >= 200 && status < 300,
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

            // statusCode is a CLR value — Number() converts it so === works
            var status = Number(resp.statusCode);
            if (status === 429) {
                // Rate limited — wait and retry
                // (SSJS has no sleep, so we skip back-off and just retry)
                continue;
            }

            return { status: status, body: String(resp.content) };
        } catch(e) {
            lastError = e;
        }
    }
    throw lastError || new Error("Max retries exceeded for " + url);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/platform-functions/httppost/">Platform.Function.HTTPPost</a></li>
  <li><a href="/best-practices/security/">Security Best Practices</a></li>
</ul>
</div>
