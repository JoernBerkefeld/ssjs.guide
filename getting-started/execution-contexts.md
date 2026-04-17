---
layout: page
title: Execution Contexts
parent: Getting Started
parent_url: /getting-started/
description: GET vs POST, ExecutionContextType, ExecutionContextName, and how to detect the execution environment.
---

SSJS exposes information about how the current page was invoked through the `Platform.Request` namespace. Understanding the execution context lets you write a single page that handles both GET and POST scenarios.

## ExecutionContextType

`Platform.Request.Method` returns the HTTP verb: `"GET"` or `"POST"`. Use it to distinguish form submissions from initial page loads:

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

var method = Platform.Request.Method;

if (method === "POST") {
    // Handle form submission
    var email = Platform.Request.GetFormData("email");
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
| `Platform.Request.Method` | `"GET"` or `"POST"` |
| `Platform.Request.GetQueryStringParameter(name)` | Value from URL query string |
| `Platform.Request.GetFormData(name)` | Value from POST body (form-encoded) |
| `Platform.Request.GetPostData()` | Entire raw POST body (call only once) |
| `Platform.Request.GetCookieValue(name)` | Cookie value |
| `Platform.Request.GetRequestHeader(name)` | HTTP request header |
| `Platform.Request.HTTPRequestHeader(name)` | Same as above |

## Detecting the Environment

You can use feature detection to write code that degrades gracefully across contexts:

```javascript
<script runat="server">
// Detect if we're in a web context (CloudPage vs email/automation)
var isWebContext = (Platform.Request.Method !== null &&
                   Platform.Request.Method !== "");

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
    Platform.Response.Redirect("/error?code=no_sk");
}
</script>
```

**Encrypted parameters:** Use AMPscript's `CloudPagesURL()` to generate URLs with encrypted parameters. Decrypt with AMPscript's `DecryptSymmetric()` or rely on SFMC's built-in decryption for `CloudPagesURL`-generated links.

## POST Body

The POST body is available via two methods:

```javascript
// Get a specific form field (application/x-www-form-urlencoded)
var email = Platform.Request.GetFormData("email");

// Get the entire raw POST body
var rawBody = Platform.Request.GetPostData();
// ⚠️ GetPostData() can only be called ONCE per request
```

**JSON POST body pattern:**

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

if (Platform.Request.Method === "POST") {
    var rawBody = Platform.Request.GetPostData();
    // ParseJSON returns null if rawBody is null/undefined
    var payload = Platform.Function.ParseJSON(rawBody + "");

    if (payload && payload.email) {
        // Process...
    }
}
</script>
```

The `+ ""` coercion prevents `ParseJSON` from throwing a 500 error on `null`/`undefined` input.

## Cookies

```javascript
// Read a cookie
var token = Platform.Request.GetCookieValue("session_token");

// Set a cookie
var expiry = Platform.Function.DateAdd(Platform.Function.Now(), 30, "D");
var expiryStr = Platform.Function.FormatDate(expiry, "M/D/YYYY H:MM:SS");
Platform.Response.SetCookie("session_token", tokenValue, expiryStr, true);
// Parameters: name, value, expiration-string, https-only
```

→ Next: [Platform vs Core](/getting-started/platform-vs-core/)
