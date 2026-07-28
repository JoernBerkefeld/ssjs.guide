---
layout: function
title: Error()
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/error/
redirect_from:
  - /global-functions/error/
description: Native JavaScript Error constructor for creating throwable error objects in try/catch error handling.
verification: verified
differs_from_docs: true
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "new Error([message])"
return_type: object
min_args: 0
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | string | No | Human-readable description of the error. After `new Error(msg)` it is **not** readable via `.message` (use `String(e)`). After call-form `Error(msg)` or on engine-raised errors, `.message` is set. |

## Description

`Error` is the native JavaScript Error constructor. Use it with `throw` and `try/catch` for structured error handling in SSJS.

{% include differs-from-mdn.html content="Unlike standard JavaScript, `new Error(\"msg\")` in the SFMC (Jint) engine does **not** populate `.message` — it reads back `undefined` (not an own property). Recover the text with `String(e)` or `(\"\" + e)`. Call-form `Error(\"msg\")` **does** set `.message`, and engine-raised errors set both `.message` and `.description`. `e.toString()` after `new Error(\"msg\")` returns `\"Error: undefined\"`. `instanceof Error` is always `false`; for JS-constructed errors use `e.constructor === Error` or `e.name`." %}

## Examples

### Basic throw and catch

```javascript
try {
    throw new Error("Something went wrong");
} catch (e) {
    // e.message is undefined after new Error — use String(e).
    Write(String(e)); // "Something went wrong"
}
```

### Call-form vs `new` (message shape)

```javascript
var withNew = new Error("via-new");
Write(withNew.message);   // undefined
Write(String(withNew));   // "via-new"

var callForm = Error("via-call");
Write(callForm.message);  // "via-call"
Write(String(callForm));  // "via-call"
```

### Conditional error

```javascript
function getSubscriberEmail(sk) {
    if (!sk) {
        throw new Error("SubscriberKey is required");
    }

    var email = Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk);

    if (!email) {
        throw new Error("No subscriber found for key: " + sk);
    }

    return email;
}

try {
    var email = getSubscriberEmail(subscriberKey);
    Write("<p>Email: " + email + "</p>");
} catch (e) {
    // String(e) recovers the thrown message; e.message would be undefined here.
    Write('<p class="error">' + String(e) + "</p>");
}
```

### HTTP error handling

```javascript
try {
    var req = new Script.Util.HttpRequest("https://api.example.com/data");
    req.method = "GET";
    req.continueOnError = true;
    var resp = req.send();

    if (resp.statusCode === 401) {
        throw new Error("Unauthorized: check your access token");
    } else if (resp.statusCode !== 200) {
        throw new Error("API returned status " + resp.statusCode);
    }

    var data = Platform.Function.ParseJSON(String(resp.content) + "");
    // process data...

} catch (e) {
    // Use String(e) — e.message is undefined for new Error(...).
    Platform.Function.InsertData("ErrorLog", "Message", String(e), "Timestamp", Platform.Function.Now());
    Platform.Response.Redirect("/error", false);
}
```

### Error in serialization

`Stringify(e)` behaves differently depending on how the error was created:

- For **`new Error(...)`**, `Stringify(e)` is often `{}` when not thrown, or surfaces a hidden `{"jintException": ...}` after `throw`/`catch` — **not** the message. Use `String(e)` to log the message.
- For **call-form** `Error("msg")`, `Stringify(e)` yields `{"message":"msg"}`.
- For an **engine-raised** error, `Stringify(e)` yields `{"message": ..., "description": ...}`.

```javascript
try {
    performOperation();
} catch (e) {
    // For engine-raised errors this includes message + description;
    // for new Error(...) prefer String(e) to capture the message.
    Write("<pre>Error details: " + String(e) + " | " + Stringify(e) + "</pre>");
}
```

## Notes

The error object in SSJS is similar to but **not** identical to the standard ECMAScript `Error` object, and its shape depends on origin:

- **`new Error("msg")`**: `.message` is `undefined` (not own); recover via `String(e)` / `("" + e)`. `.name` is `"Error"`. `.stack` is unavailable. `instanceof Error` is `false`; `e.constructor === Error` is `true`.
- **Call-form `Error("msg")`**: `.message` **is** set to the argument; `hasOwnProperty("message")` is `true`; `toString()` returns `"Error: msg"`.
- **Engine-raised** (platform-thrown, e.g. a bad `Platform.Function` call): exposes `.message` (short) and `.description` (fuller text). `.stack` is unavailable. `instanceof Error` / `instanceof TypeError` are still `false`.
- **Thrown primitives / plain objects** (`throw "text"`, `throw { message: ..., description: ... }`) are valid; in `catch (e)`, `e` may be a string, a plain object, or an engine error — probe accordingly. Avoid `String(e)` on a thrown plain object (it can throw a .NET null-reference); prefer `Stringify(e)` or `e.toString()` there.
- `for (var k in e)` is unreliable for property discovery: on engine errors, JS `Error` instances, and thrown strings it enumerates the message **characters**, not property names.

SFMC platform errors (not thrown by your code) are also catchable, and these DO carry `.message`:

```javascript
try {
    Platform.Function.Lookup("NonExistentDE", "Field", "Key", "value");
} catch (e) {
    // Engine-raised errors expose .message and .description.
    Write("Platform error: " + e.message);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/error-types/">Error Types</a></li>
  <li><a href="/language/error-handling/">Error Handling Guide</a></li>
  <li><a href="/best-practices/debugging/">Debugging</a></li>
  <li><a href="/platform-functions/raiseerror/">Platform.Function.RaiseError</a></li>
</ul>
</div>
