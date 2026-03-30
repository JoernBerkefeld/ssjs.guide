---
layout: page
title: Platform.Request
parent: Platform Objects
parent_url: /platform-objects/
description: Read HTTP request data including query string parameters, POST body, form data, request headers, and cookies.
---

`Platform.Request` provides methods to inspect every aspect of the incoming HTTP request in CloudPage, JSON Resource, and Triggered Send contexts.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `Platform.Request.Method` | string | HTTP method: `"GET"` or `"POST"` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`GetQueryStringParameter(name)`](#getquerystringparameter) | string | Read a URL query parameter |
| [`GetFormField(name)`](#getformfield) | string | Read a form field (POST or GET) |
| [`GetPostData()`](#getpostdata) | string | Read raw POST body |
| [`GetRequestHeader(name)`](#getrequestheader) | string | Read a request header |
| [`GetCookieValue(name)`](#getcookievalue) | string | Read a cookie value |
| [`GetResolvedURL()`](#getresolvedurl) | string | Get the full resolved URL of the current page |

---

## Method: GetQueryStringParameter

```javascript
Platform.Request.GetQueryStringParameter(parameterName)
```

Returns the value of a URL query string parameter. Returns `""` if not present.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `parameterName` | string | Yes | Query parameter name |

### Examples

```javascript
// URL: /page?id=42&mode=preview
var id = Platform.Request.GetQueryStringParameter("id");     // "42"
var mode = Platform.Request.GetQueryStringParameter("mode"); // "preview"
var missing = Platform.Request.GetQueryStringParameter("foo"); // ""
```

---

## Method: GetFormField

```javascript
Platform.Request.GetFormField(fieldName)
```

Reads a field from either a GET query string or POST form body (application/x-www-form-urlencoded or multipart/form-data).

### Examples

```javascript
var email = Platform.Request.GetFormField("email");
var firstName = Platform.Request.GetFormField("firstName");
```

---

## Method: GetPostData

```javascript
Platform.Request.GetPostData()
```

Returns the raw POST body as a string. Typically used for JSON or XML payloads sent with content-type `application/json`.

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
    if (!Platform.Function.Empty(rawBody)) {
        var data = Platform.Function.ParseJSON(rawBody + "");
        // process data
    }
}
```

---

## Method: GetRequestHeader

```javascript
Platform.Request.GetRequestHeader(headerName)
```

Returns the value of an HTTP request header. Header names are case-insensitive.

### Examples

```javascript
var contentType = Platform.Request.GetRequestHeader("Content-Type");
var authHeader = Platform.Request.GetRequestHeader("Authorization");
var customToken = Platform.Request.GetRequestHeader("X-API-Token");

// Token authentication pattern
var token = Platform.Request.GetRequestHeader("X-Auth-Token");
var expectedToken = Platform.Function.Lookup("Config", "value", "key", "apiToken");
if (token !== expectedToken) {
    Platform.Response.SetResponseCode(401, "Unauthorized");
    Write(Stringify({ error: "Unauthorized" }));
    return;
}
```

---

## Method: GetCookieValue

```javascript
Platform.Request.GetCookieValue(cookieName)
```

Returns the value of a cookie sent with the request.

### Examples

```javascript
var sessionId = Platform.Request.GetCookieValue("sfmc_session");
if (Platform.Function.Empty(sessionId)) {
    // No session — redirect to login
    Platform.Response.Redirect("/login");
}
```

---

## Method: GetResolvedURL

```javascript
Platform.Request.GetResolvedURL()
```

Returns the full URL of the current CloudPage as it was resolved, including CloudPages URL encryption parameters.

### Examples

```javascript
var currentUrl = Platform.Request.GetResolvedURL();
```

---

## Complete Request Handler Pattern

```javascript
<script runat="server">
var method = Platform.Request.Method;

if (method === "GET") {
    var id = Platform.Request.GetQueryStringParameter("id");
    if (Platform.Function.Empty(id)) {
        Platform.Response.SetResponseCode(400, "Bad Request");
        Write(Stringify({ error: "id is required" }));
    } else {
        var record = Platform.Function.Lookup("Records", "data", "id", id);
        Platform.Response.SetContentType("application/json");
        Write(Stringify({ id: id, data: record }));
    }
} else if (method === "POST") {
    var rawBody = Platform.Request.GetPostData();
    try {
        var body = Platform.Function.ParseJSON(rawBody + "");
        // process body...
        Platform.Response.SetContentType("application/json");
        Write(Stringify({ status: "ok" }));
    } catch(e) {
        Platform.Response.SetResponseCode(400, "Bad Request");
        Write(Stringify({ error: "Invalid JSON" }));
    }
}
</script>
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
