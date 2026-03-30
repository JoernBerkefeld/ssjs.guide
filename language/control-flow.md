---
layout: page
title: Control Flow
parent: Language Guide
parent_url: /language/
description: if/else, ternary, switch (and its SFMC bug), and branching patterns in SSJS.
---

## if / else

```javascript
var score = 85;

if (score >= 90) {
    Write("A");
} else if (score >= 80) {
    Write("B");
} else if (score >= 70) {
    Write("C");
} else {
    Write("F");
}
```

Omitting braces works for single statements but is not recommended:

```javascript
if (valid) doSomething(); // works but fragile
```

### Truthy / Falsy Checks

```javascript
var value = Platform.Request.GetQueryStringParameter("id");

// Preferred: !! coercion or direct truthiness check
if (!value) {
    // value is "", null, undefined, 0, or false
    Platform.Response.Redirect("/error");
}

// Explicit empty string check
if (value === "" || value === null) {
    // strictly no value
}
```

SFMC functions often return `""` (empty string) rather than `null`/`undefined` when data is missing. Use `!value` or `value === ""` accordingly.

### Boolean Coercion Patterns

```javascript
// Convert to boolean explicitly
var hasValue = !!value;
var isActive = !!subscriber.active;

// Short-circuit for defaults
var name = Platform.Request.GetQueryStringParameter("name") || "Subscriber";

// Safe property access (no optional chaining in SSJS)
var city = (person && person.address && person.address.city) || "Unknown";
```

## switch

The `switch` statement works but has a **known SFMC engine bug**:

> **The `default` case may not execute reliably.** If none of the `case` values match and execution reaches `default`, the engine may skip it.

```javascript
var status = "pending";

switch (status) {
    case "active":
        Write("Active");
        break;
    case "inactive":
        Write("Inactive");
        break;
    default:
        // ⚠️ This may NOT execute in SSJS
        Write("Unknown status");
}
```

**Safe pattern:** Replace `default` with an explicit final `else`:

```javascript
// Safer approach — use if/else for the fallback
var output = "";
if (status === "active") {
    output = "Active";
} else if (status === "inactive") {
    output = "Inactive";
} else {
    output = "Unknown status"; // Always works
}
Write(output);
```

Or check explicitly before the switch:

```javascript
var validStatuses = { active: true, inactive: true };
if (!validStatuses[status]) {
    Write("Unknown status");
} else {
    switch (status) {
        case "active":   Write("Active");   break;
        case "inactive": Write("Inactive"); break;
    }
}
```

### Fall-through

`switch` fall-through (omitting `break`) works as in standard JavaScript:

```javascript
switch (level) {
    case "admin":
    case "superuser":
        // Both "admin" and "superuser" fall through here
        Write("Full access");
        break;
    case "user":
        Write("Limited access");
        break;
}
```

## Ternary

The ternary operator `condition ? thenValue : elseValue` is fully supported:

```javascript
var greeting = hour < 12 ? "Good morning" : "Good afternoon";
var label = count === 1 ? "item" : "items";
var cssClass = isActive ? "active" : "inactive";
```

Avoid deeply nested ternaries — they become unreadable quickly.

## Short-Circuit Evaluation

Use `&&` and `||` for concise conditional execution:

```javascript
// Execute only if condition is true
isDebug && Write("<pre>" + Stringify(data) + "</pre>");

// Default value
var timeout = config.timeout || 30;

// Safe property access
var name = user && user.profile && user.profile.firstName;
```

## Throw / Early Return

Use `throw` or early returns to guard against invalid states:

```javascript
function processSubscriber(sk) {
    if (!sk) {
        throw new Error("SubscriberKey is required");
    }

    var email = Platform.Function.Lookup("Subscribers", "Email", "SubscriberKey", sk);
    if (!email) {
        return null; // early return — nothing to process
    }

    // ... rest of function
    return email;
}

try {
    var result = processSubscriber(sk);
    if (result) {
        Write(result);
    }
} catch (e) {
    Write("Error: " + e.message);
}
```
