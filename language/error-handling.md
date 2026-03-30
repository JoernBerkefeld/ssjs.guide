---
layout: page
title: Error Handling
parent: Language Guide
parent_url: /language/
description: try/catch/finally, throw, Error objects, and error handling patterns for robust SFMC SSJS.
---

## try / catch / finally

```javascript
try {
    var result = riskyOperation();
    Write("Success: " + result);
} catch (e) {
    Write("Error: " + e.message);
} finally {
    // Runs always — cleanup code
    Write("Done.");
}
```

All three blocks can be used independently:

```javascript
try { ... }
catch (e) { ... }         // catch only

try { ... }
finally { ... }           // no catch — errors still propagate, finally still runs

try { ... }
catch (e) { ... }
finally { ... }            // full pattern
```

## The Error Object

When an exception is caught, `e` is an error-like object with a `message` property:

```javascript
try {
    throw new Error("Something went wrong");
} catch (e) {
    Write(e.message);      // "Something went wrong"
    Write(Stringify(e));   // full object as JSON
}
```

**Note:** The structure of the caught object depends on what was thrown. SSJS platform errors may not always conform to the standard Error shape.

## throw

Throw any value — typically a `new Error(message)`:

```javascript
function getSubscriber(sk) {
    if (!sk) {
        throw new Error("SubscriberKey is required");
    }

    var email = Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk);
    if (!email) {
        throw new Error("Subscriber not found: " + sk);
    }

    return email;
}

try {
    var email = getSubscriber(subscriberKey);
    Write(email);
} catch (e) {
    Platform.Response.Redirect("/error?msg=" + Platform.Function.URLEncode(e.message));
}
```

## Common Error Patterns

### Global Try/Catch Wrapper

Wrap your entire CloudPage in a top-level try/catch to prevent blank white pages:

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

try {
    // All page logic here
    var sk = Platform.Request.GetQueryStringParameter("sk");

    if (!sk) {
        Platform.Response.Redirect("/error?code=missing_sk");
    }

    var data = Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk);
    Write("<p>Found: " + data + "</p>");

} catch (e) {
    // In production: redirect to error page
    // In development: show the error
    var isDebug = Platform.Request.GetQueryStringParameter("debug") === "1";

    if (isDebug) {
        Write("<pre>Error: " + Stringify(e) + "</pre>");
    } else {
        Platform.Response.Redirect("/error?code=unexpected");
    }
}
</script>
```

### Log Errors to a Data Extension

```javascript
function logError(context, error) {
    try {
        Platform.Function.InsertData(
            "ErrorLog",
            "Timestamp", Platform.Function.Now(),
            "Context", context,
            "Message", error.message || Stringify(error),
            "PageURL", Platform.Request.GetQueryStringParameter("_url") || ""
        );
    } catch (logError) {
        // Swallow logging errors to avoid infinite loop
    }
}

try {
    performOperation();
} catch (e) {
    logError("performOperation", e);
    Platform.Response.Redirect("/error");
}
```

### HTTP Error Handling

```javascript
try {
    var req = new Script.Util.HttpRequest("https://api.example.com/data");
    req.method = "GET";
    req.continueOnError = true;  // Don't throw on HTTP errors
    req.retries = 2;
    var resp = req.send();

    if (resp.statusCode === 200) {
        var data = Platform.Function.ParseJSON(String(resp.content) + "");
        // process data...
    } else if (resp.statusCode === 401) {
        throw new Error("Unauthorized — check your access token");
    } else if (resp.statusCode === 404) {
        throw new Error("Resource not found");
    } else {
        throw new Error("API error: " + resp.statusCode);
    }
} catch (e) {
    logError("apiCall", e);
    Write('<p class="error">Could not load data. Please try again.</p>');
}
```

### Validation Pattern

Guard against missing/invalid inputs early:

```javascript
function validateInput(params) {
    var errors = [];

    if (!params.email) {
        errors[errors.length] = "Email is required";
    } else if (Platform.Function.IsEmailAddress(params.email) === false) {
        errors[errors.length] = "Email is not valid";
    }

    if (!params.name) {
        errors[errors.length] = "Name is required";
    }

    return errors;
}

var params = {
    email: Platform.Request.GetFormData("email"),
    name:  Platform.Request.GetFormData("name")
};

var errors = validateInput(params);
if (errors.length > 0) {
    Write('<ul class="errors">');
    for (var i = 0; i < errors.length; i++) {
        Write("<li>" + errors[i] + "</li>");
    }
    Write("</ul>");
} else {
    // Process valid form
}
```

## RaiseError

`Platform.Function.RaiseError()` is an SFMC-specific function that stops execution and logs an error. Unlike `throw`, it can optionally suppress the email send:

```javascript
// In email context — stop execution (and optionally skip the send)
if (!subscriberEmail) {
    Platform.Function.RaiseError("No email address found for subscriber", true);
    // true = skip the send; false or omitted = continue the send job but stop this script
}
```

Use `RaiseError` in email contexts. Use `throw` + `try/catch` in CloudPage contexts.

## Debugging Errors

When you see a blank white page on a CloudPage, it's usually an uncaught error. Enable debug mode:

```javascript
// Add ?debug=1 to your URL during development
var isDebug = Platform.Request.GetQueryStringParameter("debug") === "1";

try {
    // ... your code
} catch (e) {
    if (isDebug) {
        Write("<pre style='color:red'>" + Stringify(e) + "</pre>");
    } else {
        Platform.Response.Redirect("/error");
    }
}
```

See [Debugging](/best-practices/debugging/) for more techniques.
