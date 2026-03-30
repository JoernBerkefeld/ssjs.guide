---
layout: page
title: Debugging
parent: Best Practices
parent_url: /best-practices/
description: Practical techniques for debugging SSJS code — from basic Write() tracing to structured error logging and silent error detection.
---

Debugging SSJS is challenging: there is no browser DevTools, no console, and SFMC's native error messages are often unhelpful. This page covers proven techniques for finding and fixing SSJS issues.

## 1. Write() Debugging

The simplest approach — output values directly to the page:

```javascript
var value = Platform.Function.Lookup("Config", "apiKey", "key", "main");
Write("DEBUG apiKey: " + value + "<br>");
```

### Structured Debug Output

```javascript
function debug(label, value) {
    Write("<pre style='background:#111;color:#0f0;padding:8px;font-size:12px'>"
        + label + ": " + Stringify(value)
        + "</pre>");
}

debug("requestMethod", Platform.Request.Method);
debug("queryParam id", Platform.Request.GetQueryStringParameter("id"));
debug("lookupResult", Platform.Function.LookupRows("Orders", "Status", "pending"));
```

### Conditional Debug Mode

```javascript
var DEBUG = Platform.Request.GetQueryStringParameter("debug") === "1";

function debugWrite(msg, data) {
    if (DEBUG) {
        Write("<pre>" + msg + ": " + Stringify(data) + "</pre>");
    }
}

// Access: /page?debug=1
debugWrite("payload", requestBody);
```

{% include callout.html type="warning" content="Always guard debug output behind a parameter check or a DE flag. Never leave `DEBUG = true` in production code." %}

---

## 2. Error Page Analysis

When SFMC shows a generic error page (\"Sorry, we encountered a problem\"), the error is logged in SFMC's native logs. To read them:

- **Email Studio → CloudPages → (select page) → Activity** — shows page execution errors
- **Automation Studio → Activity** — shows script activity errors in automations

However, these logs are often truncated. Prefer logging to a DE (see [Error Logging](/best-practices/error-logging/)).

---

## 3. Testing Execution Contexts

Different execution contexts have different constraints. Test in the right context:

| Context | URL Pattern | Notes |
|---------|-------------|-------|
| CloudPage | `pub.s10.exacttarget.com/...` | Full `Platform.Request` access |
| JSON Resource | `pub.s10.exacttarget.com/...-json` | Set Content-Type `application/json` |
| Automation | No URL | Use Email Studio Activity logs |
| Email | Preview in SFMC | Limited subset of functions |

---

## 4. ParseJSON Error Diagnosis

The most common SSJS error is `TypeError: Cannot read property 'X' of undefined` on a `ParseJSON` result. The root cause is usually a `null` or `undefined` HTTP response.

```javascript
var rawBody = Platform.Request.GetPostData();
Write("RAW BODY: [" + rawBody + "]<br>"); // is it empty?

var parsed = Platform.Function.ParseJSON(rawBody + ""); // + "" prevents 500
Write("PARSED TYPE: " + typeof parsed + "<br>");
Write("PARSED VALUE: " + Stringify(parsed) + "<br>");
```

---

## 5. Try/Catch with Write

Wrap suspicious code in try/catch and output the error:

```javascript
try {
    var result = someRiskyOperation();
    Write("Success: " + Stringify(result));
} catch(e) {
    Write("<pre style='color:red'>");
    Write("Error: " + e.message + "\n");
    Write("Stack: " + e.stack + "\n");
    Write("</pre>");
}
```

---

## 6. Diagnosing Blank Pages

A blank CloudPage with no output is almost always a silent runtime error. Common causes:

- `Platform.Load` not called before Core library use
- `ParseJSON` called on `null`/`undefined` without `+ ""`
- `switch` statement with `default` not executing (see [Known Bugs](/engine-limitations/known-bugs/))
- `DataExtension.Rows.Retrieve()` called without filter on CloudPage

**Diagnosis pattern:**

```javascript
Write("1: Script started<br>");
Platform.Load("core", "1.1.5");
Write("2: Core loaded<br>");

var de = DataExtension.Init("MyDE");
Write("3: DE initialized<br>");

var rows = de.Rows.Retrieve({
    Property: "Active",
    SimpleOperator: "equals",
    Value: "true"
});
Write("4: Retrieved " + rows.length + " rows<br>");
```

---

## 7. Automation Studio Debugging

Since automations have no URL, add a DE-based log:

```javascript
function logStep(step, message) {
    try {
        Platform.Function.InsertData(
            "AutomationLog",
            ["RunId", "Step", "Message", "Timestamp"],
            [runId, step, message, Platform.Function.Now()]
        );
    } catch(e) {}
}

logStep("start", "Automation script started");
// ... code ...
logStep("de_init", "DE rows: " + rows.length);
// ... code ...
logStep("complete", "Finished successfully");
```

---

## 8. Email Context Debugging

In email sends, use AMPscript variable output for debugging — SSJS `Write()` still works:

```javascript
Write("<!-- DEBUG: email=" + emailAddr + " subKey=" + subscriberKey + " -->");
```

Check the "View Email" preview in Content Builder to see the rendered HTML including debug comments.

---

## 9. Silent Error Patterns

Some SSJS operations fail silently (no error, no output). Always validate return values:

```javascript
// InsertData returns the new row count — check it
var inserted = Platform.Function.InsertData("Log",
    ["Event", "Timestamp"],
    ["pageview", Platform.Function.Now()]
);
if (inserted === 0) {
    Write("Warning: InsertData returned 0 rows inserted");
}

// Lookup returns "" on no match — not null
var val = Platform.Function.Lookup("DE", "Field", "Key", "value");
if (val === "") {
    Write("No record found");
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/best-practices/error-logging/">Error Logging</a></li>
  <li><a href="/engine-limitations/known-bugs/">Known Bugs</a></li>
  <li><a href="/language/error-handling/">Error Handling</a></li>
</ul>
</div>
