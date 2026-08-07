---
layout: page
title: Defensive Coding
parent: Best Practices
parent_url: /best-practices/
description: Guard against null values, empty strings, type coercion bugs, and unexpected DE return values with defensive SSJS patterns.
---

SSJS has several unique failure modes that differ from standard JavaScript. Defensive coding means proactively guarding against these platform-specific behaviors.

## 1. ParseJSON Argument Guard

Contrary to a widespread belief, `Platform.Function.ParseJSON(null)` and `ParseJSON(undefined)` do **not** error — they return `null` (runtime-verified, see [Known Bugs](/engine-limitations/known-bugs/)). What actually throws is a **wrong argument count** and a **non-string object or array** argument. Coercing with `+ ""` keeps such a value a string, so it is still the safe habit — but you must also check the result for `null`:

```javascript
// RISKY — throws if rawBody is an object or array
var data = Platform.Function.ParseJSON(rawBody);

// CORRECT — coerce to a string, then check for null
var data = Platform.Function.ParseJSON(rawBody + "");
if (!data) {
    Write("No data or invalid JSON");
    return;
}

// Also safe for HTTP response content (CLR string)
var resp = req.send();
var data = Platform.Function.ParseJSON(String(resp.content) + "");
```

---

## 2. Lookup Returns null — and a CLR null for an Empty Field

`Platform.Function.Lookup` returns a genuine JS `null` when no matching row exists (runtime-verified). The trap is a different case: a row that exists but whose field was never populated returns a **CLR null**, which is not `=== null` and **throws** the moment you coerce it — so `if (!email)` is not a safe guard.

```javascript
var email = Platform.Function.Lookup("Contacts", "Email", "Id", contactId);

// WRONG — throws "Object cannot be cast from DBNull to other types." on a CLR null
if (!email) { ... }

// CORRECT — coerce with String() first, then test the string
var value = String(email);   // "null" when no row matched, "" when the field is empty
if (value === "" || value === "null") {
    Write("Contact not found or no email on file");
    return;
}
```

See [Lookup](/platform-functions/lookup/) for all four empty-ish outcomes.

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

`Platform.Function.Lookup` hands back each column's **native** runtime type — a Number/Decimal column arrives as a `number`, a Boolean column as a `boolean`, Text as a `string`, and a Date column as a real `Date`. `DataExtension.Rows.Retrieve()` does the opposite and stringifies **every** field. Know which of the two you called before you compare:

```javascript
// Lookup — a Number column is already a number, so a numeric compare is correct
var score = Platform.Function.Lookup("Scores", "value", "userId", userId);
if (score > 80) { ... }

// Rows.Retrieve — every field arrives as a string, so convert before comparing
var row = DataExtension.Init("Scores").Rows.Retrieve({
    Property: "userId", SimpleOperator: "equals", Value: userId
})[0];
if (parseInt(row.value, 10) > 80) { ... }

// Booleans: Lookup yields a real boolean, Rows.Retrieve the capitalized text "True"/"False"
var isActive = Platform.Function.Lookup("Contacts", "active", "id", id);
if (isActive === true) { ... }
if (row.active === "True") { ... }
```

---

## 5. Property Access on Possibly-Null Objects

Always check for existence before accessing nested properties:

```javascript
var result = Platform.Function.LookupRows("DE", "Status", "active");

// WRONG — LookupRows returns null (not an empty array) when nothing matches,
//         so result[0] is a TypeError on null
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
