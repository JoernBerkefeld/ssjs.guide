---
layout: function
title: Error()
parent: Global Functions
parent_url: /global-functions/
description: Native JavaScript Error constructor for creating throwable error objects in try/catch error handling.
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
| `message` | string | No | Human-readable description of the error. Accessible as `error.message`. |

## Description

`Error` is the native JavaScript Error constructor. Use it with `throw` and `try/catch` for structured error handling in SSJS.

The caught error object has a `.message` property that contains the string you passed to `new Error(message)`.

## Examples

### Basic throw and catch

```javascript
try {
    throw new Error("Something went wrong");
} catch (e) {
    Write(e.message); // "Something went wrong"
}
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
    Write('<p class="error">' + e.message + "</p>");
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
    Platform.Function.InsertData("ErrorLog", "Message", e.message, "Timestamp", Platform.Function.Now());
    Platform.Response.Redirect("/error");
}
```

### Error in serialization

`Stringify(e)` serializes the error object for logging:

```javascript
try {
    performOperation();
} catch (e) {
    Write("<pre>Error details: " + Stringify(e) + "</pre>");
}
```

## Notes

The error object in SSJS is similar to but not always identical to the standard ECMAScript `Error` object. It reliably has `.message`, but properties like `.stack` are not available.

SFMC platform errors (not thrown by your code) are also catchable:

```javascript
try {
    Platform.Function.Lookup("NonExistentDE", "Field", "Key", "value");
} catch (e) {
    Write("Platform error: " + e.message);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/language/error-handling/">Error Handling Guide</a></li>
  <li><a href="/best-practices/debugging/">Debugging</a></li>
  <li><a href="/platform-functions/raiseerror/">Platform.Function.RaiseError</a></li>
</ul>
</div>
