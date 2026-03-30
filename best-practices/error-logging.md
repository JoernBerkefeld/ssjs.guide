---
layout: page
title: Error Logging
parent: Best Practices
parent_url: /best-practices/
description: Capture and persist SSJS errors to Data Extensions for debugging, monitoring, and alerting — with reusable logging patterns.
---

SFMC's native error handling is minimal and hard to inspect. The most reliable way to debug production issues is to log errors yourself to a Data Extension.

## Setting Up an Error Log DE

Create a DE with these columns:

| Column | Type | Length | Notes |
|--------|------|--------|-------|
| `LogId` | Text | 36 | Primary key, set to `GUID()` |
| `Timestamp` | Date | — | When the error occurred |
| `Page` | Text | 255 | CloudPage name or script identifier |
| `ErrorMessage` | Text | 500 | Short error message |
| `ErrorStack` | Text | 4000 | Full stack trace |
| `RequestData` | Text | 4000 | Query string, POST body snapshot |
| `SubscriberKey` | Text | 254 | If available |
| `Severity` | Text | 20 | `"error"`, `"warning"`, `"info"` |

---

## Basic Error Logger

```javascript
function logError(page, message, stack, requestData, subKey) {
    try {
        Platform.Function.InsertData(
            "ErrorLog",
            ["LogId", "Timestamp", "Page", "ErrorMessage", "ErrorStack", "RequestData", "SubscriberKey", "Severity"],
            [
                Platform.Function.GUID(),
                Platform.Function.Now(),
                page || "unknown",
                (message || "").substring(0, 500),
                (stack || "").substring(0, 4000),
                (requestData || "").substring(0, 4000),
                subKey || "",
                "error"
            ]
        );
    } catch(e) {
        // Silently fail — don't error while logging an error
    }
}
```

---

## Page-Level Error Wrapper

Wrap your entire CloudPage in a try/catch:

```javascript
<script runat="server">
var PAGE_NAME = "checkout-form";
var requestSnapshot = "method=" + Platform.Request.Method
    + " qs=" + Platform.Request.GetResolvedURL();

try {
    Platform.Load("core", "1.1.5");
    var rawBody = Platform.Request.GetPostData();
    requestSnapshot += " body=" + (rawBody || "").substring(0, 200);

    // === Main page logic here ===

    var email = Platform.Request.GetFormField("email");
    if (!Platform.Function.IsEmailAddress(email)) {
        throw new Error("Invalid email: " + email);
    }

    // ... rest of logic ...

} catch(e) {
    logError(PAGE_NAME, e.message, e.stack, requestSnapshot, "");

    Platform.Response.SetResponseCode(500, "Internal Server Error");
    Platform.Response.SetContentType("application/json");
    Write(Stringify({ error: "An error occurred. Please try again." }));
}

function logError(page, message, stack, requestData, subKey) {
    try {
        Platform.Function.InsertData(
            "ErrorLog",
            ["LogId", "Timestamp", "Page", "ErrorMessage", "ErrorStack", "RequestData", "SubscriberKey", "Severity"],
            [Platform.Function.GUID(), Platform.Function.Now(), page,
             (message || "").substring(0, 500), (stack || "").substring(0, 4000),
             (requestData || "").substring(0, 4000), subKey || "", "error"]
        );
    } catch(e) {}
}
</script>
```

---

## Severity Levels

Use different severity levels for different types of events:

```javascript
function log(page, severity, message, data) {
    try {
        Platform.Function.InsertData(
            "AppLog",
            ["LogId", "Timestamp", "Page", "Severity", "Message", "Data"],
            [Platform.Function.GUID(), Platform.Function.Now(), page, severity,
             (message || "").substring(0, 500), Stringify(data || {}).substring(0, 2000)]
        );
    } catch(e) {}
}

log("orders", "info", "Order received", { orderId: "123", total: 99.99 });
log("checkout", "warning", "Duplicate submission detected", { email: email });
log("payment", "error", "Payment gateway timeout", { gateway: "stripe", elapsed: elapsed });
```

---

## Automation Studio Logging

For automations, add structured step logging:

```javascript
var JOB_ID = Platform.Function.GUID();
var SCRIPT_NAME = "nightly-sync";

function logStep(step, status, message, count) {
    Platform.Function.InsertData(
        "AutomationLog",
        ["JobId", "Script", "Step", "Status", "Message", "RowCount", "Timestamp"],
        [JOB_ID, SCRIPT_NAME, step, status, message || "", count || 0, Platform.Function.Now()]
    );
}

logStep("start", "running", "Script started", 0);
// ... process rows ...
logStep("retrieve", "ok", "Rows retrieved", rows.length);
// ... process each row ...
logStep("complete", "ok", "All rows processed", processedCount);
```

---

## HTTP Error Logging

Log failed API calls with full context:

```javascript
function callApi(url, method, payload, token) {
    var req = new Script.Util.HttpRequest(url);
    req.method = method || "GET";
    req.setHeader("Authorization", "Bearer " + token);
    if (payload) {
        req.contentType = "application/json";
        req.postData = Stringify(payload);
    }

    var resp;
    try {
        resp = req.send();
    } catch(e) {
        logError("api-call", "HTTP request failed: " + url, e.message, "", "");
        throw e;
    }

    if (resp.statusCode >= 400) {
        log("api-call", "error",
            "HTTP " + resp.statusCode + " from " + url,
            { url: url, status: resp.statusCode, body: String(resp.content).substring(0, 500) }
        );
    }

    return resp;
}
```

---

## Monitoring with Email Alerts

For critical automation failures, send an alert email:

```javascript
} catch(e) {
    logError(SCRIPT_NAME, e.message, e.stack, "", "");

    // Alert the ops team
    try {
        Platform.Load("core", "1.1.5");
        var ts = TriggeredSend.Init("AutomationError_TSD");
        ts.Send({
            EmailAddress: "ops@yourbrand.com",
            SubscriberKey: "ops-alert",
            Attributes: {
                ScriptName: SCRIPT_NAME,
                ErrorMessage: e.message,
                Timestamp: Platform.Function.Now()
            }
        });
    } catch(alertErr) {
        // Fail silently if alert itself fails
    }
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/best-practices/debugging/">Debugging</a></li>
  <li><a href="/language/error-handling/">Error Handling</a></li>
  <li><a href="/core-library/triggeredsend/">TriggeredSend</a></li>
</ul>
</div>
