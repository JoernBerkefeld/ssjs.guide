---
layout: page
title: Defensive Coding
parent: Best Practices
parent_url: /best-practices/
description: Guard against null values, empty strings, type coercion bugs, and unexpected DE return values with defensive SSJS patterns.
---

SSJS has several unique failure modes that differ from standard JavaScript. Defensive coding means proactively guarding against these platform-specific behaviors.

## 1. ParseJSON Null Guard

`Platform.Function.ParseJSON(null)` or `ParseJSON(undefined)` causes a 500 error. Always add `+ ""`:

```javascript
// WRONG — throws 500 if rawBody is null/undefined/""
var data = Platform.Function.ParseJSON(rawBody);

// CORRECT
var data = Platform.Function.ParseJSON(rawBody + "");

// Also safe for HTTP response content (CLR string)
var resp = req.send();
var data = Platform.Function.ParseJSON(String(resp.content) + "");
```

---

## 2. Lookup Returns "" Not null

`Platform.Function.Lookup` returns `""` (empty string) when no matching row exists. Checking for `null` will silently pass.

```javascript
var email = Platform.Function.Lookup("Contacts", "Email", "Id", contactId);

// WRONG — "" !== null, so this is always false when no record exists
if (email === null) { ... }

// CORRECT
if (Platform.Function.Empty(email)) {
    Write("Contact not found");
    return;
}

// Or
if (!email) {
    // handles both "" and null
}
```

---

## 3. GetPostData() One-Time Read

`Platform.Request.GetPostData()` returns `""` on the second call. Read once, save to variable.

```javascript
// WRONG
function getField(name) {
    var body = Platform.Request.GetPostData(); // second call returns ""
    return Platform.Function.ParseJSON(body + "")[name];
}

// CORRECT — read once at top of script
var rawBody = Platform.Request.GetPostData();
var body = Platform.Function.ParseJSON(rawBody + "");

function getField(name) {
    return body[name];
}
```

---

## 4. Type Coercion in Comparisons

`Platform.Function.Lookup` always returns a string. When comparing to numbers or booleans, be explicit:

```javascript
var score = Platform.Function.Lookup("Scores", "value", "userId", userId);

// WRONG — "95" > 80 is a string/number comparison and may behave unexpectedly
if (score > 80) { ... }

// CORRECT — convert to number first
if (parseInt(score, 10) > 80) { ... }

// For booleans stored as "true"/"false"
var isActive = Platform.Function.Lookup("Contacts", "active", "id", id);
if (isActive === "true") { ... }  // string comparison, not boolean
```

---

## 5. Property Access on Possibly-Null Objects

Always check for existence before accessing nested properties:

```javascript
var result = Platform.Function.LookupRows("DE", "Status", "active");

// WRONG — throws if result is empty
var firstEmail = result[0].Email;

// CORRECT
if (result && result.length > 0) {
    var firstEmail = result[0].Email;
}

// For WSProxy results
var wsResult = proxy.retrieve("DataExtension", ["Name", "CustomerKey"]);
if (wsResult.Status === "OK" && wsResult.Results && wsResult.Results.length > 0) {
    var de = wsResult.Results[0];
}
```

---

## 6. Undefined vs Missing Properties

SSJS inherits JavaScript's behavior where accessing a missing property returns `undefined`, not `null`:

```javascript
var obj = { name: "Jane" };
var email = obj.email;    // undefined
var name = obj.name;      // "Jane"

// Guard for undefined
if (typeof obj.email !== "undefined") {
    sendEmail(obj.email);
}

// Provide a default
var email = obj.email || "no-reply@example.com";
```

---

## 7. For...in Without hasOwnProperty

`for...in` iterates prototype properties. Always check `hasOwnProperty`:

```javascript
var config = Platform.Function.ParseJSON(configJson + "");

// WRONG — may iterate inherited prototype methods
for (var key in config) {
    Write(key + ": " + config[key]);
}

// CORRECT
for (var key in config) {
    if (config.hasOwnProperty(key)) {
        Write(key + ": " + config[key]);
    }
}
```

---

## 8. Switch Default Bug Workaround

The `switch` statement's `default` case may not execute in SSJS. Use `if`/`else if` for critical control flow or add an explicit fallback:

```javascript
// Potentially buggy in SSJS
switch(status) {
    case "active":
        handleActive();
        break;
    default:
        handleUnknown(); // may not execute!
}

// Safer
if (status === "active") {
    handleActive();
} else if (status === "inactive") {
    handleInactive();
} else {
    handleUnknown();
}
```

---

## 9. Empty Checks

Use a consistent utility function for all emptiness checks:

```javascript
function isEmpty(val) {
    return val === null
        || typeof val === "undefined"
        || val === ""
        || (typeof val === "string" && val.replace(/\s/g, "") === "");
}

isEmpty(null);       // true
isEmpty("");         // true
isEmpty("  ");       // true
isEmpty("hello");    // false
isEmpty(0);          // false
```

---

## 10. Division and Modulo Safety

Guard against division by zero:

```javascript
var total = rows.length;

// WRONG
var average = sumValue / total;  // NaN if total === 0

// CORRECT
var average = total > 0 ? sumValue / total : 0;
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/known-bugs/">Known Bugs</a></li>
  <li><a href="/language/data-types/">Data Types</a></li>
  <li><a href="/language/error-handling/">Error Handling</a></li>
</ul>
</div>
