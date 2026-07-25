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
| [`Platform.Response.Redirect(url[, movedPermanently])`](#redirect) | void | Redirect the browser |

## Properties

| Property | Type | Description |
|----------|------|-------------|
| [`Platform.Response.ContentType`](#contenttype) | write-only | Sets the `Content-Type` of the HTTP response — reading it throws |
| [`Platform.Response.CharacterSet`](#characterset) | write-only | Sets the character set of the HTTP response — reading it throws |

---

### Platform.Response.ContentType {#contenttype}

{% include method-status.html status="verified" differs=true %}

```javascript
Platform.Response.ContentType = "application/json";
```

Sets the `Content-Type` header of the HTTP response. Set this before writing any output.

{% include differs-from-docs.html note="The docs present `ContentType` as a readable property, but at runtime it is **write-only**. Assignment works and is reflected in the HTTP `Content-Type` header, yet *every* read throws a null-reference error — both as the very first statement of the script and after output has been written. Calling it as a function throws as well. Track the value in your own variable if you need to read it back." %}

#### Examples

```javascript
Platform.Response.ContentType = "application/json";
Platform.Response.Write(Stringify({ status: "ok", id: newId }));
```

```javascript
Platform.Response.ContentType = "text/plain";
Platform.Response.Write("plain text response");
```

```javascript
// ❌ throws — the property cannot be read back
var current = Platform.Response.ContentType;

// ✅ keep your own copy instead
var contentType = "application/json";
Platform.Response.ContentType = contentType;
```

---

### Platform.Response.CharacterSet {#characterset}

{% include method-status.html status="verified" differs=true %}

```javascript
Platform.Response.CharacterSet = "UTF-8";
```

Sets the character set of the HTTP response.

{% include differs-from-docs.html note="Like [`ContentType`](#contenttype), this property is **write-only** at runtime. Assignment works and shows up as the `charset` of the HTTP `Content-Type` header, but every read throws a null-reference error, and calling it as a function throws too." %}

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

{% include method-status.html status="verified" differs=true %}

```javascript
Platform.Response.Redirect(url[, movedPermanently])
```

Redirects the browser to the specified URL.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Destination URL |
| `movedPermanently` | boolean | No | `true` for a 301 permanent redirect, `false` or omitted for a 302 temporary redirect |

{% include differs-from-docs.html note="Two behaviours the official docs do not state. First, the second argument is **optional** — a single-argument call produces a 302 with the `Location` header set, exactly like passing `false`. Second, the redirect **terminates the script immediately**: statements after the call never run, not even when the call sits inside a `try`/`catch` (no catchable exception is raised). Any response body written before the call is discarded in favour of the redirect payload." %}

#### Examples

```javascript
// Temporary redirect (302) — the flag is optional
Platform.Response.Redirect("https://example.com/thank-you");
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

{% include callout.html type="warning" content="`Redirect()` ends the script on the spot — nothing after the call executes, and any output written before it is thrown away. Do not rely on cleanup code placed after a redirect, and do not expect a `try`/`catch` around it to regain control. Use a 301 only when browsers should stop re-checking the original URL." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/write/">Write() — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
  <li><a href="/getting-started/execution-contexts/">Execution Contexts</a></li>
</ul>
</div>
