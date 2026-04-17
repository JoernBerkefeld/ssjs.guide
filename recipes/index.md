---
layout: category
title: Recipes
description: Ready-to-use SSJS patterns and code recipes for common SFMC development scenarios — CloudPage apps, REST APIs, DE CRUD, subscriber management, and more.
nav_order: 11
has_children: true
---

Practical, copy-paste-ready patterns for the most common SSJS development scenarios.

## In This Section

| Recipe | Description |
|--------|-------------|
| [CloudPage Apps](/recipes/cloud-page-apps/) | Request routing, session management, multi-step forms |
| [AMPscript Bridge](/recipes/ampscript-bridge/) | Passing data between AMPscript and SSJS |
| [REST API Calls](/recipes/rest-api-calls/) | OAuth2 tokens, GET/POST patterns, error handling |
| [DE CRUD Patterns](/recipes/de-crud-patterns/) | Complete CRUD with both Platform.Function and Core |
| [Subscriber Management](/recipes/subscriber-management/) | Subscribe, unsubscribe, update preferences |
| [Date and Time](/recipes/date-and-time/) | Formatting, calculations, timezone handling |

---

## Quick Patterns

### Get current subscriber info in email

```javascript
var email = Platform.Variable.GetValue("@_emailaddr")
         || Platform.Variable.GetValue("@emailaddr");
var subKey = Platform.Variable.GetValue("@_subscriberkey")
          || Platform.Variable.GetValue("@subscriberKey");
```

### Redirect to login if no session

```javascript
var session = Platform.Request.GetCookieValue("session");
if (!session) {
    Platform.Response.Redirect("/login?next="
        + Platform.Function.URLEncode(Platform.Request.RequestURL()));
}
```

### JSON API response boilerplate

```javascript
Platform.Response.SetContentType("application/json");
var method = Platform.Request.Method;
if (method !== "POST") {
    Write(Stringify({ status: 405, statusMessage: "Method Not Allowed", error: "POST required" }));
    return;
}
var body = Platform.Function.ParseJSON(Platform.Request.GetPostData() + "");
```
