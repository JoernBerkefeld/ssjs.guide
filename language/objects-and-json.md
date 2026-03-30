---
layout: page
title: Objects & JSON
parent: Language Guide
parent_url: /language/
description: Object literals, property access, iteration, JSON serialization and parsing in SSJS.
---

## Object Literals

```javascript
var person = {
    firstName: "Jane",
    lastName:  "Smith",
    email:     "jane@example.com",
    active:    true,
    score:     95.5
};
```

## Property Access

```javascript
// Dot notation (preferred when key is a valid identifier)
var first = person.firstName;
person.city = "New York";

// Bracket notation (required for dynamic keys or reserved words)
var field = "email";
var value = person[field];
person["last-login"] = "2026-01-01";

// Checking for property existence
if (person.hasOwnProperty("city")) {
    Write(person.city);
}

if ("email" in person) {
    // in checks prototype chain too — use hasOwnProperty for own properties
}
```

## Nested Objects

```javascript
var user = {
    profile: {
        name: "Jane Smith",
        address: {
            city: "Chicago",
            state: "IL"
        }
    },
    settings: {
        theme: "dark",
        notifications: true
    }
};

// Safe deep access (no optional chaining ?. in SSJS)
var city = user.profile && user.profile.address && user.profile.address.city;
city = city || "Unknown";
```

## Object Iteration

```javascript
var config = { host: "api.example.com", port: 443, secure: true };

// Always use hasOwnProperty in for...in
for (var key in config) {
    if (config.hasOwnProperty(key)) {
        Write(key + ": " + config[key] + "<br>");
    }
}
```

## Object as a Lookup Map

Use objects as simple hash maps for fast key lookup:

```javascript
var statusLabels = {
    "A": "Active",
    "I": "Inactive",
    "P": "Pending",
    "U": "Unsubscribed"
};

var code = "A";
var label = statusLabels[code] || "Unknown";
Write(label); // "Active"
```

## Arrays of Objects

Common pattern for working with DE row results:

```javascript
var rows = Platform.Function.LookupRows("MyDE", "Status", "active");

// rows is an array of row objects
for (var i = 0, len = rows.length; i < len; i++) {
    var row = rows[i];
    Write(row["Email"] + " - " + row["Name"] + "<br>");
}

// Build a summary array
var emails = [];
for (var i = 0, len = rows.length; i < len; i++) {
    emails[emails.length] = rows[i]["Email"];
}
Write("Emails: " + emails.join(", "));
```

## JSON — Serialization and Parsing

SSJS does **not** have `JSON.stringify` or `JSON.parse`. Use the SFMC equivalents:

### Stringify (Object → JSON String)

```javascript
var data = {
    subscriberKey: "abc123",
    email: "jane@example.com",
    score: 95
};

var jsonString = Stringify(data);
Write(jsonString);
// {"subscriberKey":"abc123","email":"jane@example.com","score":95}
```

`Stringify` is a global SSJS function — not `JSON.stringify`.

### ParseJSON (JSON String → Object)

```javascript
var jsonString = '{"name":"Jane","score":95}';
var obj = Platform.Function.ParseJSON(jsonString + "");
Write(obj.name); // Jane
```

The `+ ""` coercion is important: `ParseJSON` will throw a 500 error if passed `null` or `undefined`. Appending an empty string safely coerces to `"null"` or `"undefined"` which ParseJSON can handle gracefully (returns null).

### Full Round-Trip Example

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

// Build an object
var payload = {
    action: "update",
    subscriber: {
        key: Platform.Request.GetQueryStringParameter("sk"),
        status: "active"
    }
};

// Serialize to JSON string
var jsonStr = Stringify(payload);

// Store in DE
Platform.Function.InsertData("AuditLog", "Payload", jsonStr, "Timestamp", Platform.Function.Now());

// Later: retrieve and parse
var storedJson = Platform.Function.Lookup("AuditLog", "Payload", "ID", "1");
var parsed = Platform.Function.ParseJSON(storedJson + "");
Write(parsed.subscriber.key);
</script>
```

### Working with HTTP API Responses

```javascript
var req = new Script.Util.HttpRequest("https://api.example.com/data");
req.method = "GET";
req.setHeader("Authorization", "Bearer " + accessToken);
var resp = req.send();

// resp.content is a CLR (.NET) object — must use String() to convert
var body = String(resp.content);

// Now parse as JSON
var data = Platform.Function.ParseJSON(body + "");

if (data && data.results) {
    for (var i = 0, len = data.results.length; i < len; i++) {
        Write(data.results[i].name + "<br>");
    }
}
```

`String()` is used specifically to convert CLR response objects to JavaScript strings. This is different from `Stringify()` (which produces JSON).

## Copying Objects

SSJS has no `Object.assign` or spread syntax. Copy objects manually:

```javascript
// Shallow copy
function shallowCopy(obj) {
    var copy = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = obj[key];
        }
    }
    return copy;
}

// Merge two objects (second overwrites first)
function merge(target, source) {
    var result = shallowCopy(target);
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            result[key] = source[key];
        }
    }
    return result;
}
```
