---
layout: page
title: Security
parent: Best Practices
parent_url: /best-practices/
description: SSJS security best practices — prevent injection, validate all inputs, protect against CSRF, secure tokens, and avoid data leakage.
claims_verified: true
test_scripts: complete
---

CloudPages that process user input or call external APIs are security-sensitive. This page covers the most important SSJS security practices.

## 1. Validate All User Input

Never trust query strings, POST bodies, form fields, or cookies. Always validate before using.

```javascript
var email = Platform.Request.GetFormField("email");

// Validate email format
if (!Platform.Function.IsEmailAddress(email)) {
    Write(Platform.Function.Stringify({ status: 400, statusMessage: "Bad Request", error: "Invalid email address" }));
    return;
}

var id = Platform.Request.GetQueryStringParameter("id");

// Validate numeric ID
if (!id || !/^\d+$/.test(id)) {
    Write(Platform.Function.Stringify({ status: 400, statusMessage: "Bad Request", error: "Invalid id" }));
    return;
}
id = parseInt(id, 10);
```

---

{% include test-script.html bundle="best-practices--security" chapter="1-validate-all-user-input" %}

## 2. Never Inject Input into Platform.Function.TreatAsContent

`Platform.Function.TreatAsContent()` evaluates AMPscript. Passing user-controlled data to it creates a **Server-Side Template Injection (SSTI)** vulnerability.

```javascript
// DANGEROUS — user can inject AMPscript
Platform.Function.TreatAsContent(userInput);

// SAFE against injection — set via Variable, then use a fixed template.
// The value now arrives as data, so it is never parsed as AMPscript source.
Variable.SetValue("@userInput", userInput);
var rendered = Platform.Function.TreatAsContent("%%=v(@userInput)=%%");
```

{% include callout.html type="warning" content="**`v()` does not encode anything.** Passing the value through `Variable.SetValue()` stops it being parsed as AMPscript **source** — that is the only guarantee it gives you. `TreatAsContent()` escapes and sanitises nothing: HTML tags, `<script>` elements and quote characters all come back byte-for-byte. If the rendered result is written into the page, it is still an XSS vector and must be HTML-encoded separately — see [Output Encoding](#6-output-encoding) below." %}

The two protections are independent and you usually need both:

| Threat | Protection |
|--------|-----------|
| AMPscript injection (SSTI) | `Variable.SetValue()` + fixed template — never concatenate input into the `TreatAsContent()` argument |
| XSS in the rendered output | HTML-encode the result yourself before writing it (§6) |

```javascript
// Both protections together
Variable.SetValue("@userInput", userInput);
var rendered = Platform.Function.TreatAsContent("%%=v(@userInput)=%%");
Write("<div>" + htmlEncode(rendered) + "</div>"); // htmlEncode defined in §6
```

---

{% include test-script.html bundle="best-practices--security" chapter="2-never-inject-input-into-platform-function-treatascontent" %}

## 3. Protect API Tokens

Never hardcode tokens in SSJS source code. Store them in a DE or use SFMC Key Management.

```javascript
// BAD — token visible in source/logs
var token = "Bearer sk-abc123secrettoken";

// GOOD — load from Config DE
var token = Platform.Function.Lookup("AppConfig", "value", "key", "apiToken");

// BETTER — load from encrypted field
var encryptedToken = Platform.Function.Lookup("AppConfig", "encryptedToken", "key", "apiToken");
function decryptSymmetric(encryptedString, algorithm, passwordKey, passwordValue,saltKey, saltValue, vectorKey, vectorValue) {
    Platform.Variable.SetValue("@decrypt_string", encryptedString);
    Platform.Variable.SetValue("@decrypt_algo",algorithm);
    Platform.Variable.SetValue("@decrypt_pw",passwordValue || "");
    Platform.Variable.SetValue("@decrypt_salt",saltValue || "");
    Platform.Variable.SetValue("@decrypt_vector",vectorValue || "");
    return Platform.Function.TreatAsContent("%%=DecryptSymmetric(@decrypt_string, @decrypt_algo, @null,@decrypt_pw, @null, @decrypt_salt, @null, @decrypt_vector)=%%");
}
var token = decryptSymmetric(encryptedToken, "AES", "myKey", "myIV");
```

---

{% include test-script.html bundle="best-practices--security" chapter="3-protect-api-tokens" %}

## 4. CSRF Protection for Forms

CloudPages forms are publicly accessible. Without CSRF protection, any site can submit to your form.

```javascript
// Platform.Request.Method is a CLR value — convert once before comparing
var method = String(Platform.Request.Method);

// Generate CSRF token on page load (GET)
if (method === "GET") {
    var csrfToken = Platform.Function.GUID();
    Platform.Response.SetCookie("csrfToken", csrfToken, "", true);
    // Output token in form
    Write('<input type="hidden" name="csrf_token" value="' + csrfToken + '">');
}

// Validate on POST
if (method === "POST") {
    var tokenFromCookie = Platform.Request.GetCookieValue("csrfToken");
    var tokenFromForm = Platform.Request.GetFormField("csrf_token");

    if (!tokenFromCookie || tokenFromCookie !== tokenFromForm) {
        Write(Platform.Function.Stringify({ status: 403, statusMessage: "Forbidden", error: "CSRF validation failed" }));
        return;
    }
    // Process form...
}
```

---

{% include test-script.html bundle="best-practices--security" chapter="4-csrf-protection-for-forms" %}

## 5. Token-Based API Authentication

For JSON endpoints called by other services:

```javascript
// Shared secret authentication
var receivedToken = Platform.Request.GetRequestHeader("X-API-Token");
var expectedToken = Platform.Function.Lookup("AppConfig", "value", "key", "apiSecret");

if (!receivedToken || receivedToken !== expectedToken) {
    Write(Platform.Function.Stringify({ status: 401, statusMessage: "Unauthorized", error: "Unauthorized" }));
    return;
}
```

---

{% include test-script.html bundle="best-practices--security" chapter="5-token-based-api-authentication" %}

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

{% include test-script.html bundle="best-practices--security" chapter="6-output-encoding" %}

## 7. Restrict Sensitive Data in Responses

Don't expose internal identifiers, full DE records, or raw error objects in error responses:

```javascript
// BAD — leaks internal structure
} catch(e) {
    Write(Platform.Function.Stringify(e));
}

// GOOD — safe error message
} catch(e) {
    // String(e) — this engine has no .stack, and .message is undefined for new Error(/* ... */)
    Platform.Function.InsertData("ErrorLog",
        ["timestamp", "message"],
        [Platform.Function.Now(), String(e)]
    );
    Write(Platform.Function.Stringify({ status: 500, statusMessage: "Internal Server Error", error: "An internal error occurred" }));
}
```

---

{% include test-script.html bundle="best-practices--security" chapter="7-restrict-sensitive-data-in-responses" %}

## 8. Rate Limiting with DE

CloudPages don't have built-in rate limiting. Implement it with a DE:

```javascript
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return Platform.Function.TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

var ip = Platform.Request.GetRequestHeader("X-Forwarded-For")
       || Platform.Request.GetRequestHeader("REMOTE_ADDR")
       || "unknown";
var timeWindow = formatDate(Platform.Function.Now(), "MM/DD/YYYY HH:mm");
var key = ip + "|" + timeWindow;

var hitCount = Platform.Function.Lookup("RateLimit", "count", "key", key);
// String() first — parsing a Lookup result directly throws when the field is empty
hitCount = parseInt(String(hitCount), 10) || 0;

if (hitCount >= 10) { // 10 requests per minute
    Write(Platform.Function.Stringify({ status: 429, statusMessage: "Too Many Requests", error: "Rate limit exceeded" }));
    return;
}

Platform.Function.UpsertData("RateLimit",
    ["key"], [key],
    ["count", "window"],
    [hitCount + 1, timeWindow]
);
```

{% include test-script.html bundle="best-practices--security" chapter="8-rate-limiting-with-de" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/best-practices/defensive-coding/">Defensive Coding</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent</a></li>
</ul>
</div>
