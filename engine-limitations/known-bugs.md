---
layout: page
title: Known Bugs
parent: Engine Limitations
parent_url: /engine-limitations/
description: Platform-specific SFMC SSJS behaviors that differ from documented or expected behavior — the switch default bug, Rows.Retrieve, GetPostData, and more.
---

These are behaviors in SFMC SSJS that are inconsistent with the official documentation or with standard JavaScript expectations. They are not theoretical — they have been observed by practitioners and documented in community resources.

## switch default May Not Execute

**Severity: High** — can silently skip fallback logic

The SFMC SSJS engine has a known bug where the `default` case of a `switch` statement may not execute when no `case` matches.

```javascript
var status = "unknown";

switch (status) {
    case "active":
        Write("Active");
        break;
    case "inactive":
        Write("Inactive");
        break;
    default:
        // ⚠️ This MAY NOT execute — SFMC engine bug
        Write("Unknown status");
}
```

**Safe workaround:** Replace `default` with an explicit pre-check or post-check:

```javascript
// Option 1: Explicit check before switch
var validStatuses = { active: true, inactive: true };
if (!validStatuses[status]) {
    Write("Unknown status");
} else {
    switch (status) {
        case "active":   Write("Active");   break;
        case "inactive": Write("Inactive"); break;
    }
}

// Option 2: Initialize result before switch, keep switch case-only
var result = "Unknown status";
switch (status) {
    case "active":   result = "Active";   break;
    case "inactive": result = "inactive"; break;
}
Write(result);
```

**ESLint rule:** `sfmc/ssjs-no-switch-default` warns about relying on `default`.

---

## DataExtension.Rows.Retrieve() on CloudPages

**Severity: High** — silently returns empty results

The Core library method `DataExtension.Rows.Retrieve()` does **not work on CloudPages**. It returns empty results without an error.

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("MyDE");

// ❌ On CloudPages — returns [] silently
var rows = de.Rows.Retrieve({ Property: "Status", SimpleOperator: "equals", Value: "active" });

// ✅ Use Platform.Function.LookupRows instead on CloudPages
var rows = Platform.Function.LookupRows("MyDE", "Status", "active");
```

The `filter` parameter is also **required** despite the Salesforce documentation saying it is optional.

**Works correctly in:** Automation Studio, Email (precompile).

---

## GetPostData() Can Only Be Called Once

**Severity: Medium** — second call returns empty string

`Platform.Request.GetPostData()` reads the raw POST body. However, the body can only be read **once per request**. Subsequent calls return an empty string.

```javascript
// ❌ Second call returns ""
var body1 = Platform.Request.GetPostData(); // correct
var body2 = Platform.Request.GetPostData(); // returns ""

// ✅ Store in a variable and reuse
var postBody = Platform.Request.GetPostData();
var asJson = Platform.Function.ParseJSON(postBody + "");
var asText = postBody; // reuse the cached value
```

---

## Direct Object Literal Returns Cause 500

**Severity: Medium** — causes a runtime 500 error

Returning an object literal directly from a function can fail in SSJS:

```javascript
// ❌ May cause 500 error
function getConfig() {
    return { timeout: 30, retries: 3 };
}

// ✅ Assign to a variable first
function getConfig() {
    var config = { timeout: 30, retries: 3 };
    return config;
}
```

**ESLint rule:** `sfmc/ssjs-no-unsupported-syntax` includes a `DirectObjectReturn` check.

---

## Array.prototype.splice Ignores Parameters

**Severity: Medium** — silent incorrect behavior

`Array.prototype.splice` in SFMC SSJS ignores its `startIndex` and `deleteCount` arguments, behaving as if both are `0`. This means it never actually removes elements from the intended position.

```javascript
var arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);
// Expected: removes element at index 2, arr becomes [1, 2, 4, 5]
// Actual:   arr is unchanged = [1, 2, 3, 4, 5]
```

Use the [splice polyfill](/engine-limitations/polyfills/#splice-broken--must-override).

---

## Array.prototype.lastIndexOf Always Returns -1

**Severity: Low** — incorrect result

`Array.prototype.lastIndexOf` is present but always returns `-1`.

```javascript
[1, 2, 3, 2].lastIndexOf(2);
// Expected: 3
// Actual:   -1
```

Use the [lastIndexOf polyfill](/engine-limitations/polyfills/#lastindexof-array--broken--must-override).

---

## ParseJSON Throws 500 on null/undefined

**Severity: Medium** — causes page to error

`Platform.Function.ParseJSON()` throws a server 500 error if passed `null`, `undefined`, or a non-string value.

```javascript
// ❌ If responseBody is null/undefined, this throws 500
var data = Platform.Function.ParseJSON(responseBody);

// ✅ Coerce to string first with + ""
var data = Platform.Function.ParseJSON(responseBody + "");
// If responseBody is null, this passes "null" to ParseJSON, which returns null safely
```

**ESLint rule:** `sfmc/ssjs-prefer-parsejson-safe-arg` auto-fixes this.

---

## new on User-Defined Constructors

**Severity: Low** — behavior depends on pattern

Using `new` with a user-defined constructor that uses the **revealing module pattern** (explicitly `return`s a service object) may fail:

```javascript
// ❌ May fail if MyService() returns an object via 'return service'
var svc = new MyService(config);

// ✅ Call without new (factory pattern)
var svc = MyService(config);
```

`new` works reliably with: `Date`, `RegExp`, `Error`, `Object`, `Array`, `WSProxy`, `Script.Util.HttpRequest`.

---

## DataExtension.Init name vs External Key

**Severity: Low** — wrong data accessed silently

`DataExtension.Init()` (Core library) looks up the DE by **name**, while `Platform.Function.Lookup()` and friends use either name or external key depending on context. When names and external keys differ, using the wrong one returns unexpected results.

```javascript
// Core library — uses Name (not External Key)
var de = DataExtension.Init("My DE Name");

// Platform.Function — uses External Key by default
var val = Platform.Function.Lookup("MyDE_ExternalKey", "Field", "Key", value);
```

---

## Platform.Load Must Come Before Any Core Usage

**Severity: High** — runtime error

`Platform.Load("core", "1.1.5")` must be called before **any** Core library object (`DataExtension`, `Subscriber`, `Email`, etc.) is referenced — not just before it's used.

```javascript
// ❌ Error — DataExtension referenced before Platform.Load
var de = DataExtension.Init("MyDE");
Platform.Load("core", "1.1.5");

// ✅ Load first, always
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("MyDE");
```

Even declaring a variable that holds a Core object before `Platform.Load` can fail.

**ESLint rules:** `sfmc/ssjs-require-platform-load`, `sfmc/ssjs-require-platform-load-order`, `sfmc/ssjs-prefer-platform-load-version`
