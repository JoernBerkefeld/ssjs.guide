---
layout: page
title: Error Handling
parent: Language Guide
parent_url: /language/
description: try/catch/finally, throw, Error objects, and error handling patterns for robust SFMC SSJS.
claims_verified: true
test_scripts: complete
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
try { /* ... */ }
catch (e) { /* ... */ }         // catch only

try { /* ... */ }
finally { /* ... */ }           // no catch — errors still propagate, finally still runs

try { /* ... */ }
catch (e) { /* ... */ }
finally { /* ... */ }            // full pattern
```

{% include test-script.html bundle="language--error-handling" chapter="try-catch-finally" %}

## The Error Object

When an exception is caught, `e` is an error-like object with a `message` property:

```javascript
try {
    throw new Error("Something went wrong");
} catch (e) {
    Write(e.message);      // "Something went wrong"
    Write(Platform.Function.Stringify(e));   // full object as JSON
}
```

**Note:** The structure of the caught object depends on what was thrown. SSJS platform errors may not always conform to the standard Error shape.

{% include test-script.html bundle="language--error-handling" chapter="the-error-object" %}

## throw

Throw any value — typically a `new Error(message)`:

```javascript
function getSubscriber(sk) {
    if (!sk) {
        throw new Error("SubscriberKey is required");
    }

    // String() first — a Lookup result throws on a truthiness test when the field is empty
    var email = String(Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk));
    if (email === "" || email === "null") {
        throw new Error("Subscriber not found: " + sk);
    }

    return email;
}

try {
    var email = getSubscriber(subscriberKey);
    Write(email);
} catch (e) {
    Platform.Response.Redirect("/error?msg=" + Platform.Function.UrlEncode(e.message), false);
}
```

{% include test-script.html bundle="language--error-handling" chapter="throw" %}

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
        Platform.Response.Redirect("/error?code=missing_sk", false);
    }

    var data = Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk);
    Write("<p>Found: " + data + "</p>");

} catch (e) {
    // In production: redirect to error page
    // In development: show the error
    var isDebug = Platform.Request.GetQueryStringParameter("debug") === "1";

    if (isDebug) {
        Write("<pre>Error: " + Platform.Function.Stringify(e) + "</pre>");
    } else {
        Platform.Response.Redirect("/error?code=unexpected", false);
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
            "Message", error.message || Platform.Function.Stringify(error),
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

    // statusCode is a CLR value — Number() converts it so === works
    var status = Number(resp.statusCode);
    if (status === 200) {
        var data = Platform.Function.ParseJSON(String(resp.content) + "");
        // process data...
    } else if (status === 401) {
        throw new Error("Unauthorized — check your access token");
    } else if (status === 404) {
        throw new Error("Resource not found");
    } else {
        throw new Error("API error: " + status);
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
    email: Platform.Request.GetFormField("email"),
    name:  Platform.Request.GetFormField("name")
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

{% include test-script.html bundle="language--error-handling" chapter="common-error-patterns" %}

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

{% include test-script.html bundle="language--error-handling" chapter="raiseerror" %}

## Debugging Errors

When you see a blank white page on a CloudPage, it's usually an uncaught error. Enable debug mode:

```javascript
// Add ?debug=1 to your URL during development
var isDebug = Platform.Request.GetQueryStringParameter("debug") === "1";

try {
    // ... your code
} catch (e) {
    if (isDebug) {
        Write("<pre style='color:red'>" + Platform.Function.Stringify(e) + "</pre>");
    } else {
        Platform.Response.Redirect("/error", false);
    }
}
```

See [Debugging](/best-practices/debugging/) for more techniques.


{% include test-script.html bundle="language--error-handling" chapter="debugging-errors" %}