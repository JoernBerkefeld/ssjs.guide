---
layout: page
title: Platform.Request
parent: Platform Objects
parent_url: /platform-objects/
description: Read HTTP request data including query string parameters, POST body, form data, request headers, and cookies.
verification: verified
differs_from_docs: true
test_scripts: complete
---

`Platform.Request` provides methods to inspect every aspect of the incoming HTTP request in CloudPage, JSON Resource, and Triggered Send contexts.

Does not require `Platform.Load`.

{% include callout.html type="info" content="**`Platform.Request` and the Core Library [`Request`](/core-library/request/) object are two different objects — not aliases.** They share a name and purpose but differ in member set and access style. `Platform.Request` (this page) works **without** `Platform.Load` and exposes a rich mix of **properties** (`RequestURL`, `Method`, `ClientIP`, `QueryString`, …) and **getter methods** (`GetQueryStringParameter()`, `GetCookieValue()`, `GetRequestHeader()`, …). Core `Request` is a smaller, method-only set — six zero-arg context methods (`Request.URL()`, `Request.Method()`, `Request.PagePath()`, …) plus the single-argument value getters `Request.GetQueryStringParameter(name)` and `Request.GetFormField(name)` — that **requires `Platform.Load(\"core\", ...)`**. For example, the current URL is the `RequestURL` **property** here, but the `URL()` **method** on Core `Request`. Pick the object that has the member you need — don't assume they mirror each other." %}

{% include callout.html type="warning" content="The value getters (`GetQueryStringParameter`, `GetFormField`, `GetCookieValue`, `GetRequestHeader`) return **`null`** — not an empty string — when the requested key is absent. Guard reads with a truthiness or `!= null` check. `GetUserLanguages()` as called is **not defined at runtime** — the engine does not resolve it and it throws at every arity tried (0/1/2 args) — so read `GetRequestHeader(\"Accept-Language\")` instead for the same value." %}

## Properties

| Property | Type | Description |
|----------|------|-------------|
| [`Platform.Request.Browser`](#browser) | object | Browser metadata: `Platform`, `Browser`, `Version`, `MajorVersion`, `MinorVersion` |
| [`Platform.Request.ClientIP`](#clientip) | string | IP address of the requesting client |
| [`Platform.Request.HasSSL`](#hasssl) | boolean | Whether the current request supports SSL (HTTPS) |
| [`Platform.Request.IsSSL`](#isssl) | boolean | Whether the current request used an SSL (HTTPS) connection |
| [`Platform.Request.Method`](#method) | string | HTTP method: `"GET"` or `"POST"` |
| [`Platform.Request.QueryString`](#querystring) | string | Full raw query string of the request URL |
| [`Platform.Request.ReferrerURL`](#referrerurl) | string | URL of the referring web address |
| [`Platform.Request.RequestURL`](#requesturl) | string | Full resolved URL of the current page |
| [`Platform.Request.UserAgent`](#useragent) | string | User-agent string of the requesting browser |

On a CloudPage GET, these are CLR-backed request values rather than ordinary JavaScript primitives. Convert string properties with `String(...)` before strict comparison; test `HasSSL` and `IsSSL` directly in conditions. `UserAgent` and `ReferrerURL` throw when their corresponding headers are absent, so prefer `GetRequestHeader(...)` when the header is optional.

{% include test-script.html bundle="platform-objects--platform-request" chapter="properties" %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`GetCookieValue(name)`](#getcookievalue) | string | Read a cookie value |
| [`GetFormField(name)`](#getformfield) | string | Read a named POST form field, or `null` when absent (does not read GET query parameters) |
| [`GetPostData([encoding])`](#getpostdata) | string | Read raw POST body (optional character encoding) |
| [`GetQueryStringParameter(name)`](#getquerystringparameter) | string | Read a URL query parameter |
| [`GetRequestHeader(name)`](#getrequestheader) | string | Read a request header |
| [`GetUserLanguages()`](#getuserlanguages) ⚠️ | string | Read the browser `Accept-Language` header value — `GetUserLanguages()` as called is **not defined at runtime** (the engine does not resolve it; throws at every arity tried); use `GetRequestHeader("Accept-Language")` |

{% include test-script.html bundle="platform-objects--platform-request" chapter="methods" %}

---

### Platform.Request.GetQueryStringParameter {#getquerystringparameter}

```javascript
Platform.Request.GetQueryStringParameter(parameterName)
```

Returns the value of a URL query string parameter. Returns **`null`** if the parameter is not present (runtime-verified — the official docs' claim of an empty string is incorrect). An explicitly empty value returns `""`; repeated values are returned as one comma-joined string in URL order. Parameter names are case-insensitive, `+` and percent-encoded spaces decode to spaces, percent escapes decode once, and UTF-8 escapes decode to Unicode characters.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `parameterName` | string | Yes | Query parameter name |

#### Examples

```javascript
// URL: /page?id=42&mode=preview
var id = Platform.Request.GetQueryStringParameter("id");     // "42"
var mode = Platform.Request.GetQueryStringParameter("mode"); // "preview"
var missing = Platform.Request.GetQueryStringParameter("foo"); // null
```

---

### Platform.Request.GetFormField {#getformfield}

```javascript
Platform.Request.GetFormField(fieldName)
```

Reads a submitted form field from a POST form body (`application/x-www-form-urlencoded` or `multipart/form-data`). On a plain CloudPage GET it does **not** fall back to query parameters; it returns **`null`** even when the same name is present in the URL.

#### Examples

```javascript
var email = Platform.Request.GetFormField("email");
var firstName = Platform.Request.GetFormField("firstName");
```

---

### Platform.Request.GetPostData {#getpostdata}

```javascript
Platform.Request.GetPostData([encoding])
```

Returns the raw POST body as a string. Typically used for JSON or XML payloads sent with content-type `application/json`. On a GET request, both the first and subsequent reads return an empty string.

When `encoding` is omitted, the platform default applies (often a legacy Windows code page). Pass an encoding name such as `"UTF-8"` when the client sends UTF-8.

{% include callout.html type="warning" content="`GetPostData()` can only be called **once per request**. Calling it a second time returns an empty string. Read it into a variable immediately at the top of your script." %}

#### Examples

```javascript
// CORRECT — read once, reuse the variable
var rawBody = Platform.Request.GetPostData();
var payload = Platform.Function.ParseJSON(rawBody + "");

// WRONG — second call returns ""
var a = Platform.Request.GetPostData();
var b = Platform.Request.GetPostData(); // b === ""
```

#### Checking Request Method First

```javascript
if (String(Platform.Request.Method) === "POST") {
    var rawBody = Platform.Request.GetPostData();
    if (rawBody) {
        var data = Platform.Function.ParseJSON(rawBody + "");
        // process data
    }
}
```

---

### Platform.Request.GetUserLanguages {#getuserlanguages}

```javascript
Platform.Request.GetUserLanguages()
```

Is documented to return the raw value of the HTTP `Accept-Language` header (for example a comma-separated list with quality values).

{% include callout.html type="warning" content="**Not defined at runtime.** The engine does not resolve this member: a runtime probe found it throws `System.InvalidOperationException: \"Unable to retrieve security descriptor for this frame.\"` at every arity tried (0/1/2 args) — the generic error the SSJS engine raises for an unrecognized member name or an argument count the engine does not accept (**not** a security, frame, or context restriction). The same `Accept-Language` header **is** present and readable via `GetRequestHeader(\"Accept-Language\")` in the same run, so use that instead — it returns the same value this method is documented to expose." %}

#### Workaround

```javascript
// GetUserLanguages() is not defined at runtime — read the header directly.
var langs = Platform.Request.GetRequestHeader("Accept-Language");
if (langs) {
    Write("<!-- Accept-Language: " + langs + " -->");
}
```

---

### Platform.Request.GetRequestHeader {#getrequestheader}

```javascript
Platform.Request.GetRequestHeader(headerName)
```

Returns the value of an HTTP request header. Header names are case-insensitive. Returns **`null`** when the header is absent.

#### Examples

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

### Platform.Request.GetCookieValue {#getcookievalue}

```javascript
Platform.Request.GetCookieValue(cookieName)
```

Returns the value of a cookie sent with the request. Returns **`null`** when the cookie is absent.

#### Examples

```javascript
var sessionId = Platform.Request.GetCookieValue("sfmc_session");
if (!sessionId) {
    // No session — redirect to login
    Platform.Response.Redirect("/login", false);
}
```

---

### Platform.Request.RequestURL {#requesturl}

```javascript
Platform.Request.RequestURL
```

Returns the absolute URL of the current CloudPage, including the query string. The value is a CLR string, so convert it with `String(...)` before strict comparison.

#### Examples

```javascript
var currentUrl = Platform.Request.RequestURL;
```

---

### Platform.Request.Browser {#browser}

```javascript
Platform.Request.Browser
```

Returns an object describing the requesting client's browser with the following fields: `Platform`, `Browser`, `Version`, `MajorVersion`, `MinorVersion`.

#### Examples

```javascript
var browser = Platform.Request.Browser;
Write(Stringify(browser));
// { "Platform": "WinNT", "Browser": "Chrome", "Version": "124.0", "MajorVersion": 124, "MinorVersion": 0 }
```

---

### Platform.Request.ClientIP {#clientip}

```javascript
Platform.Request.ClientIP
```

Returns the IP address of the requesting client as a string.

#### Examples

```javascript
var ip = Platform.Request.ClientIP;
Write("Request from: " + ip);
```

---

### Platform.Request.HasSSL {#hasssl}

```javascript
Platform.Request.HasSSL
```

Returns a CLR boolean that is truthy when the request uses HTTPS. Test it directly in a condition; strict comparison with JavaScript `true` does not match.

#### Examples

```javascript
if (!Platform.Request.HasSSL) {
    Platform.Response.Redirect("https://" + Platform.Request.RequestURL, false);
}
```

---

### Platform.Request.IsSSL {#isssl}

```javascript
Platform.Request.IsSSL
```

Returns the same CLR boolean value as `HasSSL`. Test it directly in a condition rather than with strict equality.

---

### Platform.Request.Method {#method}

```javascript
Platform.Request.Method
```

Returns the HTTP method of the current request as a CLR string. Convert it before strict comparison: `String(Platform.Request.Method) === "GET"`.

#### Examples

```javascript
var method = String(Platform.Request.Method);
if (method === "POST") {
    var body = Platform.Request.GetPostData();
    // handle POST
}
```

---

### Platform.Request.QueryString {#querystring}

```javascript
Platform.Request.QueryString
```

Returns the full raw query string of the request URL **including the leading `?`**. The CLR string preserves the encoded form; use `GetQueryStringParameter(name)` for decoded values.

#### Examples

```javascript
var qs = Platform.Request.QueryString;
// e.g. "id=42&mode=preview"
```

---

### Platform.Request.ReferrerURL {#referrerurl}

```javascript
Platform.Request.ReferrerURL
```

Returns the HTTP `Referer` header as a CLR string. If that header is absent, reading this property throws a null-reference error; use `GetRequestHeader("Referer")` when the referrer is optional.

#### Examples

```javascript
var referrer = Platform.Request.ReferrerURL;
if (referrer) {
    Write("<!-- Referred from: " + referrer + " -->");
}
```

---

### Platform.Request.UserAgent {#useragent}

```javascript
Platform.Request.UserAgent
```

Returns the `User-Agent` header as a CLR string. If the header is absent, reading this property throws a null-reference error; use `GetRequestHeader("User-Agent")` for an optional read. Use the populated value with [`Platform.Function.IsCHTMLBrowser()`](/platform-functions/ischtmlbrowser/) to detect browser types.

#### Examples

```javascript
var ua = Platform.Request.UserAgent;
var isCHTML = Platform.Function.IsCHTMLBrowser(ua);
```

---

## Complete Request Handler Pattern

```javascript
var method = String(Platform.Request.Method);

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

{% include test-script.html bundle="platform-objects--platform-request" chapter="complete-request-handler-pattern" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/request/">Request (Core Library)</a></li>
  <li><a href="/platform-objects/platform-response/">Platform.Response</a></li>
  <li><a href="/getting-started/execution-contexts/">Execution Contexts</a></li>
  <li><a href="/recipes/cloud-page-apps/">CloudPage App Recipes</a></li>
</ul>
</div>
