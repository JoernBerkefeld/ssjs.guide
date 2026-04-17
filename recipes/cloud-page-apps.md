---
layout: page
title: CloudPage Apps
parent: Recipes
parent_url: /recipes/
description: Patterns for building CloudPage applications — request routing, session cookies, multi-step forms, and JSON API endpoints.
---

## Basic Request Router

```html
<script runat="server">
Platform.Load("core", "1.1.5");

var method = Platform.Request.Method;
var rawBody = method === "POST" ? Platform.Request.GetPostData() : "";

if (method === "GET") {
    handleGet();
} else if (method === "POST") {
    handlePost(Platform.Function.ParseJSON(rawBody + ""));
} else {
    Write(Stringify({ status: 405, statusMessage: "Method Not Allowed", error: "Method not allowed" }));
}

function handleGet() {
    var id = Platform.Request.GetQueryStringParameter("id");
    if (Platform.Function.Empty(id)) {
        Platform.Response.SetContentType("application/json");
        Write(Stringify({ message: "Welcome to the API" }));
        return;
    }
    var record = Platform.Function.Lookup("Records", "data", "id", id);
    Platform.Response.SetContentType("application/json");
    if (Platform.Function.Empty(record)) {
        Write(Stringify({ status: 404, statusMessage: "Not Found", error: "Record not found" }));
    } else {
        Write(Stringify({ id: id, data: record }));
    }
}

function handlePost(body) {
    if (!body || !body.email) {
        Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "email is required" }));
        return;
    }
    if (!Platform.Function.IsEmailAddress(body.email)) {
        Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "Invalid email format" }));
        return;
    }
    Platform.Function.InsertData("Submissions",
        ["Email", "Name", "Timestamp"],
        [body.email, body.name || "", Platform.Function.Now()]
    );
    Platform.Response.SetContentType("application/json");
    Write(Stringify({ status: "ok", email: body.email }));
}
</script>
```

---

## Session Management

```html
<script runat="server">
var SESSION_COOKIE = "sfmc_session";
var SESSION_DE = "Sessions";

function createSession(userId, data) {
    var token = Platform.Function.GUID();
    var expires = Platform.Function.FormatDate(
        Platform.Function.DateAdd(Platform.Function.Now(), 30, "D"),
        "MM/DD/YYYY HH:mm:ss"
    );
    Platform.Function.InsertData(SESSION_DE,
        ["token", "userId", "data", "expires"],
        [token, userId, Stringify(data), expires]
    );
    Platform.Response.SetCookie(SESSION_COOKIE, token, expires, "/", "", true);
    return token;
}

function getSession() {
    var token = Platform.Request.GetCookieValue(SESSION_COOKIE);
    if (!token) return null;

    var row = Platform.Function.LookupRows(SESSION_DE, "token", token);
    if (!row || row.length === 0) return null;

    var session = row[0];
    // Check expiry
    if (new Date(session.expires) < new Date()) {
        return null;
    }
    return {
        userId: session.userId,
        data: Platform.Function.ParseJSON(session.data + "")
    };
}

function destroySession() {
    var token = Platform.Request.GetCookieValue(SESSION_COOKIE);
    if (token) {
        Platform.Function.DeleteData(SESSION_DE, ["token"], [token]);
        Platform.Response.SetCookie(SESSION_COOKIE, "",
            "Thu, 01 Jan 1970 00:00:00 GMT", "/", "", true);
    }
}

// Usage
var session = getSession();
if (!session) {
    Platform.Response.Redirect("/login");
}
Write("Hello, user " + session.userId);
</script>
```

---

## Multi-Step Form

```javascript
var step = parseInt(Platform.Request.GetQueryStringParameter("step") || "1", 10);
var sessionToken = Platform.Request.GetCookieValue("formSession");

// Initialize form session
if (!sessionToken) {
    sessionToken = Platform.Function.GUID();
    Platform.Response.SetCookie("formSession", sessionToken, "", "/");
    Platform.Function.InsertData("FormSessions",
        ["token", "step", "data", "created"],
        [sessionToken, "1", "{}", Platform.Function.Now()]
    );
}

if (Platform.Request.Method === "POST") {
    var fieldName = Platform.Request.GetFormField("fieldName");
    // Save step data
    var existing = Platform.Function.Lookup("FormSessions", "data", "token", sessionToken);
    var saved = Platform.Function.ParseJSON(existing + "");
    saved["step" + step] = { name: fieldName };
    Platform.Function.UpdateData("FormSessions",
        ["data", "step"],
        [Stringify(saved), String(step + 1)],
        ["token"], [sessionToken]
    );

    if (step < 3) {
        Platform.Response.Redirect("?step=" + (step + 1));
    } else {
        // Final submission
        // process complete form data...
        Write("Form complete!");
    }
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
  <li><a href="/platform-objects/platform-response/">Platform.Response</a></li>
  <li><a href="/best-practices/security/">Security Best Practices</a></li>
</ul>
</div>
