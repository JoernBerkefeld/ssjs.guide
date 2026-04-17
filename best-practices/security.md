---
layout: page
title: Security
parent: Best Practices
parent_url: /best-practices/
description: SSJS security best practices — prevent injection, validate all inputs, protect against CSRF, secure tokens, and avoid data leakage.
---

CloudPages that process user input or call external APIs are security-sensitive. This page covers the most important SSJS security practices.

## 1. Validate All User Input

Never trust query strings, POST bodies, form fields, or cookies. Always validate before using.

```javascript
var email = Platform.Request.GetFormField("email");

// Validate email format
if (!Platform.Function.IsEmailAddress(email)) {
    Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "Invalid email address" }));
    return;
}

var id = Platform.Request.GetQueryStringParameter("id");

// Validate numeric ID
if (!id || !/^\d+$/.test(id)) {
    Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "Invalid id" }));
    return;
}
id = parseInt(id, 10);
```

---

## 2. Never Inject Input into TreatAsContent

`TreatAsContent()` evaluates AMPscript. Passing user-controlled data to it creates a **Server-Side Template Injection (SSTI)** vulnerability.

```javascript
// DANGEROUS — user can inject AMPscript
TreatAsContent(userInput);

// SAFE — set via Variable, then use a fixed template
Variable.SetValue("@userInput", userInput);
TreatAsContent("%%=v(@userInput)=%%"); // v() output-encodes the value
```

---

## 3. Protect API Tokens

Never hardcode tokens in SSJS source code. Store them in a DE or use SFMC Key Management.

```javascript
// BAD — token visible in source/logs
var token = "Bearer sk-abc123secrettoken";

// GOOD — load from Config DE
var token = Platform.Function.Lookup("AppConfig", "value", "key", "apiToken");

// BETTER — load from encrypted field
var encryptedToken = Platform.Function.Lookup("AppConfig", "encryptedToken", "key", "apiToken");
var token = Platform.Function.DecryptSymmetric(encryptedToken, "AES", "myKey", "", "myIV", "");
```

---

## 4. CSRF Protection for Forms

CloudPages forms are publicly accessible. Without CSRF protection, any site can submit to your form.

```javascript
// Generate CSRF token on page load (GET)
if (Platform.Request.Method === "GET") {
    var csrfToken = Platform.Function.GUID();
    Platform.Response.SetCookie("csrfToken", csrfToken, "", "/", "", true);
    // Output token in form
    Write('<input type="hidden" name="csrf_token" value="' + csrfToken + '">');
}

// Validate on POST
if (Platform.Request.Method === "POST") {
    var tokenFromCookie = Platform.Request.GetCookieValue("csrfToken");
    var tokenFromForm = Platform.Request.GetFormField("csrf_token");

    if (!tokenFromCookie || tokenFromCookie !== tokenFromForm) {
        Write(Stringify({ status: 403, statusMessage: "Forbidden", error: "CSRF validation failed" }));
        return;
    }
    // Process form...
}
```

---

## 5. Token-Based API Authentication

For JSON endpoints called by other services:

```javascript
// Shared secret authentication
var receivedToken = Platform.Request.GetRequestHeader("X-API-Token");
var expectedToken = Platform.Function.Lookup("AppConfig", "value", "key", "apiSecret");

if (Platform.Function.Empty(receivedToken) || receivedToken !== expectedToken) {
    Write(Stringify({ status: 401, statusMessage: "Unauthorized", error: "Unauthorized" }));
    return;
}
```

---

## 6. Output Encoding

Always HTML-encode output from user input to prevent XSS:

```javascript
function htmlEncode(str) {
    return (str + "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}

// DANGEROUS
Write("<div>Hello, " + userName + "</div>"); // XSS if userName contains <script>

// SAFE
Write("<div>Hello, " + htmlEncode(userName) + "</div>");
```

---

## 7. Restrict Sensitive Data in Responses

Don't expose internal identifiers, full DE records, or stack traces in error responses:

```javascript
// BAD — leaks internal structure
} catch(e) {
    Write(Stringify(e));
}

// GOOD — safe error message
} catch(e) {
    Platform.Function.InsertData("ErrorLog",
        ["timestamp", "message", "stack"],
        [Platform.Function.Now(), e.message, e.stack || ""]
    );
    Write(Stringify({ status: 500, statusMessage: "Internal Server Error", error: "An internal error occurred" }));
}
```

---

## 8. Rate Limiting with DE

CloudPages don't have built-in rate limiting. Implement it with a DE:

```javascript
var ip = Platform.Request.GetRequestHeader("X-Forwarded-For")
       || Platform.Request.GetRequestHeader("REMOTE_ADDR")
       || "unknown";
var timeWindow = Platform.Function.FormatDate(Platform.Function.Now(), "MM/DD/YYYY HH:mm");
var key = ip + "|" + timeWindow;

var hitCount = Platform.Function.Lookup("RateLimit", "count", "key", key);
hitCount = parseInt(hitCount, 10) || 0;

if (hitCount >= 10) { // 10 requests per minute
    Write(Stringify({ status: 429, statusMessage: "Too Many Requests", error: "Rate limit exceeded" }));
    return;
}

Platform.Function.UpsertData("RateLimit",
    ["key"], [key],
    ["count", "window"],
    [hitCount + 1, timeWindow]
);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/best-practices/defensive-coding/">Defensive Coding</a></li>
  <li><a href="/global-functions/treatascontent/">TreatAsContent</a></li>
  <li><a href="/platform-functions/hmac/">HMAC</a></li>
  <li><a href="/platform-functions/encryptsymmetric/">EncryptSymmetric</a></li>
</ul>
</div>
