---
layout: page
title: Execution Contexts
parent: Getting Started
parent_url: /getting-started/
description: GET vs POST, ExecutionContextType, ExecutionContextName, and how to detect the execution environment.
---

SSJS exposes information about how the current page was invoked through the `Platform.Request` namespace. Understanding the execution context lets you write a single page that handles both GET and POST scenarios.

## ExecutionContextType

`Platform.Request.Method` returns the HTTP verb: `"GET"` or `"POST"`. It is a **CLR value**, not a JavaScript string, so strict equality against a literal is always false — convert it with `String(...)` first. Use it to distinguish form submissions from initial page loads:

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

// String() converts the CLR value to a real JavaScript string
var method = String(Platform.Request.Method);

if (method === "POST") {
    // Handle form submission
    var email = Platform.Request.GetFormField("email");
    // ... process the form ...
    Write("<p>Thanks! We received: " + email + "</p>");
} else {
    // Render the form
    Write('<form method="post">');
    Write('<input name="email" type="email" placeholder="Your email">');
    Write('<button type="submit">Submit</button>');
    Write('</form>');
}
</script>
```

## ExecutionContextName

`Platform.Request.GetQueryStringParameter("_pageId")` returns the CloudPages page ID. The system variable `ExecutionContextName` (when available) contains the name of the Automation or context that triggered execution.

In CloudPages, these built-in names are available:

| Variable | Description |
|----------|-------------|
| `Platform.Request.Method` | `"GET"` or `"POST"` — a CLR value; wrap in `String(...)` before strict comparison |
| `Platform.Request.GetQueryStringParameter(name)` | Value from URL query string |
| `Platform.Request.GetFormField(name)` | Value from POST body (application/x-www-form-urlencoded) |
| `Platform.Request.GetPostData()` | Entire raw POST body (call only once) |
| `Platform.Request.GetCookieValue(name)` | Cookie value |
| `Platform.Request.GetRequestHeader(name)` | HTTP request header |

## Detecting the Environment

You can use feature detection to write code that degrades gracefully across contexts:

```javascript
<script runat="server">
// Detect if we're in a web context (CloudPage vs email/automation)
// String() first — strict comparison against the raw CLR value never matches
var requestMethod = String(Platform.Request.Method);
var isWebContext = (requestMethod !== "null" && requestMethod !== "");

if (isWebContext) {
    var qs = Platform.Request.GetQueryStringParameter("debug");
    if (qs === "1") {
        // Show debug output
    }
}
</script>
```

## GET Parameters

Read individual query string parameters with `Platform.Request.GetQueryStringParameter()`:

```javascript
<script runat="server">
var subscriberKey = Platform.Request.GetQueryStringParameter("sk");
var campaignId    = Platform.Request.GetQueryStringParameter("cid");

// Parameters not present in the URL return an empty string ""
if (!subscriberKey) {
    Platform.Response.Redirect("/error?code=no_sk", false);
}
</script>
```

**Encrypted parameters:** Use AMPscript's `CloudPagesURL()` to generate URLs with encrypted parameters. Decrypt with AMPscript's `DecryptSymmetric()` or rely on SFMC's built-in decryption for `CloudPagesURL`-generated links.

## POST Body

The POST body is available via two methods:

```javascript
// Get a specific form field (application/x-www-form-urlencoded)
var email = Platform.Request.GetFormField("email");

// Get the entire raw POST body
var rawBody = Platform.Request.GetPostData();
// ⚠️ GetPostData() can only be called ONCE per request
```

**JSON POST body pattern:**

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

if (String(Platform.Request.Method) === "POST") {
    var rawBody = Platform.Request.GetPostData();
    // ParseJSON returns null if rawBody is null/undefined
    var payload = Platform.Function.ParseJSON(rawBody + "");

    if (payload && payload.email) {
        // Process...
    }
}
</script>
```

`ParseJSON` returns `null` for `null`/`undefined` input rather than erroring — the `+ ""` coercion guards against the case that really throws, a non-string object or array argument.

## Cookies

```javascript
// Read a cookie
var token = Platform.Request.GetCookieValue("session_token");

// Set a cookie
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

var expiry = dateAdd(Now(), 30, "D");
var expiryStr = formatDate(expiry, "M/D/YYYY","H:MM:SS");
Platform.Response.SetCookie("session_token", tokenValue, expiryStr, true);
// Parameters: name, value, expiration-string, https-only
```

→ Next: [Platform vs Core](/getting-started/platform-vs-core/)
