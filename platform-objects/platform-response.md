---
layout: page
title: Platform.Response
parent: Platform Objects
parent_url: /platform-objects/
description: Control the HTTP response from CloudPages and JSON Code Resources — set status codes, content types, cookies, response headers, and perform redirects.
verification: verified
---

`Platform.Response` lets you control the HTTP response sent back to the browser. Useful for REST-style CloudPage APIs, redirects, cookie management, and setting response headers and content type.

Does not require `Platform.Load`.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Platform.Response.Write(content)`](#write) | void | Write content to the HTTP response output |
| [`Platform.Response.SetResponseHeader(headerName, value)`](#setresponseheader) | void | Set a response header |
| [`Platform.Response.RemoveResponseHeader(headerName)`](#removeresponseheader) | void | Remove a response header |
| [`Platform.Response.SetCookie(name, value [, expires [, secure]])`](#setcookie) | void | Set a response cookie |
| [`Platform.Response.RemoveCookie(name)`](#removecookie) | void | Remove a cookie |
| [`Platform.Response.Redirect(url, movedPermanently)`](#redirect) | void | Redirect the browser |

## Properties

| Property | Type | Description |
|----------|------|-------------|
| [`Platform.Response.ContentType`](#contenttype) | string | Gets or sets the `Content-Type` of the HTTP response |
| [`Platform.Response.CharacterSet`](#characterset) | string | Gets or sets the character set of the HTTP response |

---

### Platform.Response.ContentType {#contenttype}

```javascript
Platform.Response.ContentType = "application/json";
```

Gets or sets the `Content-Type` header of the HTTP response. Set this before writing any output.

#### Examples

```javascript
Platform.Response.ContentType = "application/json";
Platform.Response.Write(Stringify({ status: "ok", id: newId }));
```

```javascript
Platform.Response.ContentType = "text/plain";
Platform.Response.Write("plain text response");
```

---

### Platform.Response.CharacterSet {#characterset}

```javascript
Platform.Response.CharacterSet = "UTF-8";
```

Gets or sets the character set of the HTTP response.

#### Examples

```javascript
Platform.Response.ContentType = "application/json";
Platform.Response.CharacterSet = "UTF-8";
Platform.Response.Write(Stringify(data));
```

---

### Platform.Response.Write {#write}

```javascript
Platform.Response.Write(content)
```

Writes a string directly to the HTTP response output. Does not require `Platform.Load`.

{% include callout.html type="note" content="This is distinct from the global `Write()` function. The global `Write()` requires `Platform.Load(\"core\", \"1.1.5\")` and writes to the rendered page output. `Platform.Response.Write()` does not require Core and writes to the HTTP response body — use it in scripts where Core is not loaded." %}

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | String to write to the response |

#### Examples

```javascript
// JSON API endpoint — no Platform.Load required
Platform.Response.ContentType = "application/json";
Platform.Response.Write(Stringify({ status: "ok" }));
```

```javascript
// With Core loaded, either Write() or Platform.Response.Write() works
Platform.Load("core", "1.1.5");
var rows = DataExtension.Init("MyDE").Rows.Retrieve();
Platform.Response.Write(Stringify(rows));
```

---

### Platform.Response.SetResponseHeader {#setresponseheader}

```javascript
Platform.Response.SetResponseHeader(headerName, value)
```

Sets a header on the HTTP response.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headerName` | string | Yes | Name of the response header |
| `value` | string | Yes | Value for the response header |

#### Examples

```javascript
Platform.Response.SetResponseHeader("Content-Type", "application/json");
Platform.Response.Write(Stringify({ status: "ok" }));
```

```javascript
// Security headers
Platform.Response.SetResponseHeader("X-Content-Type-Options", "nosniff");
Platform.Response.SetResponseHeader("X-Frame-Options", "DENY");
```

---

### Platform.Response.RemoveResponseHeader {#removeresponseheader}

```javascript
Platform.Response.RemoveResponseHeader(headerName)
```

Removes a previously set HTTP response header.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headerName` | string | Yes | Name of the response header to remove |

#### Examples

```javascript
Platform.Response.RemoveResponseHeader("X-Powered-By");
```

---

### Platform.Response.SetCookie {#setcookie}

```javascript
Platform.Response.SetCookie(name, value [, expires [, secure]])
```

Sets a cookie in the response.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Cookie name |
| `value` | string | Yes | Cookie value |
| `expires` | string | No | Expiration datetime string |
| `secure` | boolean | No | Send only over HTTPS |

#### Examples

```javascript
// Session cookie (expires when browser closes)
Platform.Response.SetCookie("sessionToken", token);

function dateAdd(timestamp,intervalToAdd,intervalType) {
    Platform.Variable.SetValue("@dateAdd_ts",timestamp);
    Platform.Variable.SetValue("@dateAdd_add",intervalToAdd);
    Platform.Variable.SetValue("@dateAdd_type",intervalType);
    return Platform.Function.TreatAsContent("%%=DateAdd(@dateAdd_ts, @dateAdd_add, @dateAdd_type)=%%");
}

// Persistent cookie with expiry
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return Platform.Function.TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}
var expiry = formatDate(
    dateAdd(Now(), 30, "D"),
    "ddd, DD MMM YYYY HH:mm:ss",
    "en-US"
) + " GMT";
Platform.Response.SetCookie("rememberMe", userId, expiry, true);

// Clear a cookie (set expired date)
Platform.Response.SetCookie("sessionToken", "", "Thu, 01 Jan 1970 00:00:00 GMT");
```

---

### Platform.Response.RemoveCookie {#removecookie}

```javascript
Platform.Response.RemoveCookie(name)
```

Removes a cookie from the client browser by setting its expiration to a past date.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name of the cookie to remove |

#### Examples

```javascript
Platform.Response.RemoveCookie("sessionToken");
```

---

### Platform.Response.Redirect {#redirect}

```javascript
Platform.Response.Redirect(url , movedPermanently)
```

Redirects the browser to the specified URL.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Destination URL |
| `movedPermanently` | boolean | Yes | `true` for 301 redirect, `false`/omitted for 302 |

#### Examples

```javascript
// Temporary redirect (302)
Platform.Response.Redirect("https://example.com/thank-you", false);

// Permanent redirect (301)
Platform.Response.Redirect("https://new-domain.com/page", true);

// Conditional redirect
var isLoggedIn = !!Platform.Request.GetCookieValue("session");
if (!isLoggedIn) {
    Platform.Response.Redirect("/login?next=" +
        Platform.Function.UrlEncode(Platform.Request.RequestURL), false);
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
