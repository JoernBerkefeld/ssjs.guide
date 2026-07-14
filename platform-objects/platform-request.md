---
layout: page
title: Platform.Request
parent: Platform Objects
parent_url: /platform-objects/
description: Read HTTP request data including query string parameters, POST body, form data, request headers, and cookies.
verification: verified
differs_from_docs: "Runtime-verified (CloudPage): Platform.Request is available WITHOUT Platform.Load. The getters GetQueryStringParameter / GetFormField / GetCookieValue / GetRequestHeader return null (typeof \"object\") for an absent key, NOT an empty string. GetPostData returns \"\" (empty string) on a GET. GetUserLanguages throws \"Unable to retrieve security descriptor for this frame.\" in a plain CloudPage GET."
---

`Platform.Request` provides methods to inspect every aspect of the incoming HTTP request in CloudPage, JSON Resource, and Triggered Send contexts.

Does not require `Platform.Load`.

{% include callout.html type="warning" content="The value getters (`GetQueryStringParameter`, `GetFormField`, `GetCookieValue`, `GetRequestHeader`) return **`null`** — not an empty string — when the requested key is absent. Guard reads with a truthiness or `!= null` check. `GetUserLanguages()` throws in a plain CloudPage context; wrap it in try/catch." %}

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `Platform.Request.Browser` | object | Browser metadata: `Platform`, `Browser`, `Version`, `MajorVersion`, `MinorVersion` |
| `Platform.Request.ClientIP` | string | IP address of the requesting client |
| `Platform.Request.HasSSL` | boolean | Whether the current request supports SSL (HTTPS) |
| `Platform.Request.IsSSL` | boolean | Whether the current request used an SSL (HTTPS) connection |
| `Platform.Request.Method` | string | HTTP method: `"GET"` or `"POST"` |
| `Platform.Request.QueryString` | string | Full raw query string of the request URL |
| `Platform.Request.ReferrerURL` | string | URL of the referring web address |
| `Platform.Request.RequestURL` | string | Full resolved URL of the current page |
| `Platform.Request.UserAgent` | string | User-agent string of the requesting browser |

All properties return `null` (or `false` for boolean properties) when no valid request object exists or the value is absent.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`GetCookieValue(name)`](#getcookievalue) | string | Read a cookie value |
| [`GetFormField(name)`](#getformfield) | string | Read a form field (POST or GET) |
| [`GetPostData([encoding])`](#getpostdata) | string | Read raw POST body (optional character encoding) |
| [`GetQueryStringParameter(name)`](#getquerystringparameter) | string | Read a URL query parameter |
| [`GetRequestHeader(name)`](#getrequestheader) | string | Read a request header |
| [`GetUserLanguages()`](#getuserlanguages) | string | Read the browser `Accept-Language` header value |

---

## Method: GetQueryStringParameter

```javascript
Platform.Request.GetQueryStringParameter(parameterName)
```

Returns the value of a URL query string parameter. Returns **`null`** if the parameter is not present (runtime-verified — the official docs' claim of an empty string is incorrect).

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `parameterName` | string | Yes | Query parameter name |

### Examples

```javascript
// URL: /page?id=42&mode=preview
var id = Platform.Request.GetQueryStringParameter("id");     // "42"
var mode = Platform.Request.GetQueryStringParameter("mode"); // "preview"
var missing = Platform.Request.GetQueryStringParameter("foo"); // null
```

---

## Method: GetFormField

```javascript
Platform.Request.GetFormField(fieldName)
```

Reads a field from either a GET query string or POST form body (application/x-www-form-urlencoded or multipart/form-data). Returns **`null`** when the field is absent.

### Examples

```javascript
var email = Platform.Request.GetFormField("email");
var firstName = Platform.Request.GetFormField("firstName");
```

---

## Method: GetPostData

```javascript
Platform.Request.GetPostData([encoding])
```

Returns the raw POST body as a string. Typically used for JSON or XML payloads sent with content-type `application/json`.

When `encoding` is omitted, the platform default applies (often a legacy Windows code page). Pass an encoding name such as `"UTF-8"` when the client sends UTF-8.

{% include callout.html type="warning" content="`GetPostData()` can only be called **once per request**. Calling it a second time returns an empty string. Read it into a variable immediately at the top of your script." %}

### Examples

```javascript
// CORRECT — read once, reuse the variable
var rawBody = Platform.Request.GetPostData();
var payload = Platform.Function.ParseJSON(rawBody + "");

// WRONG — second call returns ""
var a = Platform.Request.GetPostData();
var b = Platform.Request.GetPostData(); // b === ""
```

### Checking Request Method First

```javascript
if (Platform.Request.Method === "POST") {
    var rawBody = Platform.Request.GetPostData();
    if (rawBody) {
        var data = Platform.Function.ParseJSON(rawBody + "");
        // process data
    }
}
```

---

## Method: GetUserLanguages

```javascript
Platform.Request.GetUserLanguages()
```

Returns the raw value of the HTTP `Accept-Language` header (for example a comma-separated list with quality values).

{% include callout.html type="warning" content="Runtime-verified: in a plain CloudPage GET this method **throws** `\"Unable to retrieve security descriptor for this frame.\"`. Wrap it in try/catch, or prefer reading the header directly via `GetRequestHeader(\"Accept-Language\")`." %}

### Examples

```javascript
var langs;
try {
    langs = Platform.Request.GetUserLanguages();
} catch (e) {
    langs = Platform.Request.GetRequestHeader("Accept-Language");
}
if (langs) {
    Write("<!-- Accept-Language: " + langs + " -->");
}
```

---

## Method: GetRequestHeader

```javascript
Platform.Request.GetRequestHeader(headerName)
```

Returns the value of an HTTP request header. Header names are case-insensitive. Returns **`null`** when the header is absent.

### Examples

```javascript
var contentType = Platform.Request.GetRequestHeader("Content-Type");
var authHeader = Platform.Request.GetRequestHeader("Authorization");
var customToken = Platform.Request.GetRequestHeader("X-API-Token");

// Token authentication pattern
var token = Platform.Request.GetRequestHeader("X-Auth-Token");
var expectedToken = Platform.Function.Lookup("Config", "value", "key", "apiToken");
if (token !== expectedToken) {
    Write(Stringify({ status: 401, statusMessage: "Unauthorized", error: "Unauthorized" }));
    return;
}
```

---

## Method: GetCookieValue

```javascript
Platform.Request.GetCookieValue(cookieName)
```

Returns the value of a cookie sent with the request. Returns **`null`** when the cookie is absent.

### Examples

```javascript
var sessionId = Platform.Request.GetCookieValue("sfmc_session");
if (!sessionId) {
    // No session — redirect to login
    Platform.Response.Redirect("/login", false);
}
```

---

## Property: RequestURL

```javascript
Platform.Request.RequestURL
```

Returns the full URL of the current CloudPage as it was resolved, including CloudPages URL encryption parameters.

### Examples

```javascript
var currentUrl = Platform.Request.RequestURL;
```

---

## Property: Browser

```javascript
Platform.Request.Browser
```

Returns an object describing the requesting client's browser with the following fields: `Platform`, `Browser`, `Version`, `MajorVersion`, `MinorVersion`.

### Examples

```javascript
var browser = Platform.Request.Browser;
Write(Stringify(browser));
// { "Platform": "WinNT", "Browser": "Chrome", "Version": "124.0", "MajorVersion": 124, "MinorVersion": 0 }
```

---

## Property: ClientIP

```javascript
Platform.Request.ClientIP
```

Returns the IP address of the requesting client as a string.

### Examples

```javascript
var ip = Platform.Request.ClientIP;
Write("Request from: " + ip);
```

---

## Property: HasSSL

```javascript
Platform.Request.HasSSL
```

Returns `true` if the current request supports SSL (HTTPS), `false` otherwise.

### Examples

```javascript
if (!Platform.Request.HasSSL) {
    Platform.Response.Redirect("https://" + Platform.Request.RequestURL, false);
}
```

---

## Property: IsSSL

```javascript
Platform.Request.IsSSL
```

Returns `true` if the current request was made over an SSL (HTTPS) connection. Alias of `HasSSL`.

---

## Property: QueryString

```javascript
Platform.Request.QueryString
```

Returns the full raw query string of the request URL (everything after `?`). Use `GetQueryStringParameter(name)` to read individual values.

### Examples

```javascript
var qs = Platform.Request.QueryString;
// e.g. "id=42&mode=preview"
```

---

## Property: ReferrerURL

```javascript
Platform.Request.ReferrerURL
```

Returns the URL of the referring web address (the HTTP `Referer` header value). Returns `null` when no referrer is present.

### Examples

```javascript
var referrer = Platform.Request.ReferrerURL;
if (referrer) {
    Write("<!-- Referred from: " + referrer + " -->");
}
```

---

## Property: UserAgent

```javascript
Platform.Request.UserAgent
```

Returns the user-agent string from the HTTP request. Use with [`Platform.Function.IsCHTMLBrowser()`](/platform-functions/ischtmlbrowser/) to detect browser types.

### Examples

```javascript
var ua = Platform.Request.UserAgent;
var isCHTML = Platform.Function.IsCHTMLBrowser(ua);
```

---

## Complete Request Handler Pattern

```javascript
var method = Platform.Request.Method;

if (method === "GET") {
    var id = Platform.Request.GetQueryStringParameter("id");
    if (!id) {
        Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "id is required" }));
    } else {
        var record = Platform.Function.Lookup("Records", "data", "id", id);
        Platform.Response.ContentType = "application/json";
        Write(Stringify({ id: id, data: record }));
    }
} else if (method === "POST") {
    var rawBody = Platform.Request.GetPostData();
    try {
        var body = Platform.Function.ParseJSON(rawBody + "");
        // process body...
        Platform.Response.ContentType = "application/json";
        Write(Stringify({ status: "ok" }));
    } catch(e) {
        Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "Invalid JSON" }));
    }
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-response/">Platform.Response</a></li>
  <li><a href="/getting-started/execution-contexts/">Execution Contexts</a></li>
  <li><a href="/recipes/cloud-page-apps/">CloudPage App Recipes</a></li>
</ul>
</div>
