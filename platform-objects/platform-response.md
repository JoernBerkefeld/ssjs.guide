---
layout: page
title: Platform.Response
parent: Platform Objects
parent_url: /platform-objects/
description: Control the HTTP response from CloudPages and JSON Code Resources — set status codes, content types, cookies, and perform redirects.
---

`Platform.Response` lets you control the HTTP response sent back to the browser. Useful for REST-style CloudPage APIs, redirects, and cookie management.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`SetContentType(mimeType)`](#setcontenttype) | void | Set the Content-Type header |
| [`SetCookie(name, value [, expires [, path [, domain [, secure]]]])`](#setcookie) | void | Set a response cookie |
| [`Redirect(url [, permanent])`](#redirect) | void | Redirect the browser |

---

## Method: SetContentType

```javascript
Platform.Response.SetContentType(mimeType)
```

Sets the `Content-Type` header of the response. Default is `text/html`.

### Common Content Types

| Use Case | MIME Type |
|----------|-----------|
| JSON API response | `"application/json"` |
| HTML page | `"text/html; charset=UTF-8"` |
| Plain text | `"text/plain"` |
| XML | `"application/xml"` |
| JavaScript | `"application/javascript"` |

### Examples

```javascript
// JSON API
Platform.Response.SetContentType("application/json");
Write(Stringify({ status: "ok", count: rows.length }));

// Plain text
Platform.Response.SetContentType("text/plain");
Write("OK");
```

---

## Method: SetCookie

```javascript
Platform.Response.SetCookie(name, value [, expires [, path [, domain [, secure]]]])
```

Sets a cookie in the response.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Cookie name |
| `value` | string | Yes | Cookie value |
| `expires` | string | No | Expiration datetime string |
| `path` | string | No | Cookie path (default: `"/"`) |
| `domain` | string | No | Cookie domain |
| `secure` | boolean | No | Send only over HTTPS |

### Examples

```javascript
// Session cookie (expires when browser closes)
Platform.Response.SetCookie("sessionToken", token);

// Persistent cookie with expiry
var expiry = Platform.Function.FormatDate(
    Platform.Function.DateAdd(Platform.Function.Now(), 30, "D"),
    "ddd, DD MMM YYYY HH:mm:ss",
    "en-US"
) + " GMT";
Platform.Response.SetCookie("rememberMe", userId, expiry, "/", "", true);

// Clear a cookie (set expired date)
Platform.Response.SetCookie("sessionToken", "", "Thu, 01 Jan 1970 00:00:00 GMT");
```

---

## Method: Redirect

```javascript
Platform.Response.Redirect(url [, permanent])
```

Redirects the browser to the specified URL.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Destination URL |
| `permanent` | boolean | No | `true` for 301 redirect, `false`/omitted for 302 |

### Examples

```javascript
// Temporary redirect (302)
Platform.Response.Redirect("https://example.com/thank-you");

// Permanent redirect (301)
Platform.Response.Redirect("https://new-domain.com/page", true);

// Conditional redirect
var isLoggedIn = !Platform.Function.Empty(Platform.Request.GetCookieValue("session"));
if (!isLoggedIn) {
    Platform.Response.Redirect("/login?next=" +
        Platform.Function.URLEncode(Platform.Request.RequestURL()));
}
```

{% include callout.html type="warning" content="Once `Redirect()` is called, any subsequent `Write()` calls are ignored. Execution continues but output is discarded." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
  <li><a href="/getting-started/execution-contexts/">Execution Contexts</a></li>
</ul>
</div>
