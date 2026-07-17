---
layout: page
title: Known Bugs
parent: Engine Limitations
parent_url: /engine-limitations/
description: Platform-specific SFMC SSJS behaviors that differ from documented or expected behavior — the switch default bug, Rows.Retrieve, GetPostData, and more.
---

These are behaviors in SFMC SSJS that are inconsistent with the official documentation or with standard JavaScript expectations. They are not theoretical — they have been observed by practitioners and documented in community resources.

{% include callout.html type="info" content="This page covers features that are **broken** or that **do not exist at runtime** despite being officially documented. For working features whose behavior merely differs from the docs (wrong return types, undocumented properties, etc.), see [Differs from Official Docs](/engine-limitations/differs-from-docs/)." %}

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

## Bare-name Core Globals Are Scope-Sensitive {#bare-name-redirect-does-not-exist}

**Severity: High** — `ReferenceError` / `undefined` inside nested scopes

The bare-name Core globals ([`Write`](/core-library/write/), [`Stringify`](/core-library/stringify/), [`Redirect`](/core-library/redirect/), [`Base64Encode`](/core-library/base64encode/), [`Format`](/core-library/format/), …) are injected by `Platform.Load("core", ...)` **only into the scope where the load runs**. Inside nested helper-function bodies (or `eval()`) they are `undefined` — even though the load already happened. This makes them look "not defined at runtime" when probed from inside a function, which is a scope artifact, not a real absence.

```javascript
Platform.Load("core", "1.1.5");

// ✅ Same scope as Platform.Load — works
Redirect("https://www.example.com", false);
Write("hello");

function helper() {
    // ❌ Nested scope — bare names are undefined here, throws ReferenceError
    Write("hello from helper");
}

// ✅ Scope-independent alternatives work everywhere, no Platform.Load needed
Platform.Response.Write("hello from anywhere");
Platform.Response.Redirect("https://www.example.com", false);
```

**Works correctly:** call bare names in the same scope as `Platform.Load`, or use the `Platform.*` siblings (e.g. [`Platform.Response.Redirect`](/platform-objects/platform-response/#redirect), [`Platform.Response.Write`](/platform-objects/platform-response/#write), [`Platform.Function.Stringify`](/platform-functions/stringify/)) inside helpers.

---

## Bare-name Recipient Does Not Exist

**Severity: High** — the alias is `undefined`

The bare-name global `Recipient` is documented as an alias for [`Platform.Recipient`](/platform-objects/platform-recipient/), but runtime testing on CloudPages shows it is **undefined both before and after** `Platform.Load("core", ...)` — it does not exist as a usable alias.

```javascript
// ❌ undefined regardless of Platform.Load — throws when you call a member
var v = Recipient.GetAttributeValue("FirstName");

// ✅ Use the fully-qualified Platform.Recipient
var v = Platform.Recipient.GetAttributeValue("FirstName");

// ✅ Or Attribute.GetValue after Platform.Load("core", ...)
Platform.Load("core", "1.1.5");
var v2 = Attribute.GetValue("FirstName");
```

**Works correctly:** [`Platform.Recipient.GetAttributeValue(...)`](/platform-objects/platform-recipient/), or [`Attribute.GetValue(...)`](/core-library/attribute/) after `Platform.Load`.

---

## DataExtension.Rows.Retrieve() on CloudPages — not reproducible

**Status: Retracted** — could not be reproduced under runtime verification

This entry previously claimed that `DataExtension.Rows.Retrieve()` returns empty results on CloudPages and that the `filter` argument is required. **Runtime verification on a live CloudPage disproved both claims**: `de.Rows.Retrieve()` with **no filter** returned all rows, and a filtered call returned the matching rows.

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("MyDE");

// ✅ Works on CloudPages — returns all rows
var all = de.Rows.Retrieve();

// ✅ Works on CloudPages — returns matching rows
var rows = de.Rows.Retrieve({ Property: "Status", SimpleOperator: "equals", Value: "active" });
```

For the confirmed runtime characteristics of `Rows.Retrieve` / `Rows.Lookup` (string vs typed values, empty-array vs `null` on no match, host-array shape), see [Differs from Official Docs](/engine-limitations/differs-from-docs/) and the [DataExtension.Rows reference](/core-library/dataextension-rows/).

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

## Array.prototype.slice Throws on the No-Argument Form

**Severity: Low** — throws instead of copying

`Array.prototype.slice` handles positive **and** negative indices correctly in SFMC SSJS (`slice(1, 3)`, `slice(-2)`, `slice(1, -1)` all return the expected ranges — runtime-verified). The one bug is the **no-argument** form `slice()`, which throws instead of returning a shallow copy.

```javascript
[0, 1, 2, 3, 4].slice();
// Expected: [0, 1, 2, 3, 4]  (shallow copy)
// Actual:   THROWS "Index was outside the bounds of the array."
```

Pass an explicit start index — `arr.slice(0)` — to copy the whole array, or use the [slice polyfill](/engine-limitations/polyfills/#array-prototype-slice).

---

## Array.prototype.sort Throws Without a Compare Function

**Severity: Low** — throws instead of default sort

`Array.prototype.sort(compareFn)` works correctly in SFMC SSJS when you pass a compare function (numeric and string comparators both sort as expected — runtime-verified). The **no-argument** form `sort()` (default lexicographic order) throws.

```javascript
[3, 1, 4, 1, 5].sort();
// Expected: [1, 1, 3, 4, 5]  (default string compare)
// Actual:   THROWS "Failed to compare two elements in the array."
```

Always pass an explicit compare function, or use the [sort polyfill](/engine-limitations/polyfills/#array-prototype-sort) if you need the default order.

---

## Array.prototype.splice — splice(start) Throws and the Insert Form Ignores Parameters

**Severity: Medium** — throws or silent incorrect behavior

`Array.prototype.splice(start[, deleteCount[, item1 … itemN]])` works correctly in SFMC SSJS **only** for the two-argument delete form `splice(start, deleteCount)` (an over-large `deleteCount` is clamped to the remaining length — runtime-verified). Two forms are broken:

- The **one-argument** form `splice(start)` throws `Index was outside the bounds of the array.`
- The **insert** form: as soon as a third argument (`item1`) is passed, the engine ignores `start` and `deleteCount` and just overwrites from the left with the items to insert.

```javascript
var arr = [1, 2, 3, 4, 5];
arr.splice(2);
// Expected: removes from index 2 on, arr becomes [1, 2]
// Actual:   THROWS "Index was outside the bounds of the array."

arr.splice(2, 1, 'a');
// Expected: removes element at index 2, arr becomes [1, 2, 'a', 4, 5]
// Actual:   first element is replaced = ['a', 2, 3, 4, 5] as if you ran arr.splice(null, null, "a");
```

Use the two-argument delete form `splice(start, arr.length)` in place of `splice(start)`, or the [splice polyfill](/engine-limitations/polyfills/#array-prototype-splice) for the one-argument delete form and any insert.

---

## Array.prototype.lastIndexOf Always Returns -1

**Severity: Low** — incorrect result

`Array.prototype.lastIndexOf` is present but always returns `-1`.

```javascript
[1, 2, 3, 2].lastIndexOf(2);
// Expected: 3
// Actual:   -1
```

Use the [lastIndexOf polyfill](/engine-limitations/polyfills/#array-prototype-lastindexof).

---

## ParseJSON Throws on a Non-String Object/Array (not on null/undefined)

**Severity: Medium** — causes page to error

A common belief is that `Platform.Function.ParseJSON()` throws a 500 on `null`/`undefined` — **runtime verification disproves this**. Passing `null`, `undefined`, an empty string, or invalid JSON returns **`null`** (it does **not** throw). The genuine error cases are a **wrong argument count** (zero args, or a second argument) and a **non-string object/array** argument, which throw an engine `InvalidOperationException`.

```javascript
// ✅ null / undefined / invalid / empty input returns null — no error
var data = Platform.Function.ParseJSON(responseBody);
if (data) {
    // safe to use
}

// ❌ Passing an array or any non-string object THROWS
var bad = Platform.Function.ParseJSON(["a", "b"]);

// ✅ Coerce to a string first with + "" so non-string scalars stay valid input
var safe = Platform.Function.ParseJSON(responseBody + "");
```

Always check the return value for `null` rather than relying on a thrown error. See the [ParseJSON reference](/platform-functions/parsejson/) for the full runtime-verified behavior.

**ESLint rule:** `sfmc/ssjs-prefer-parsejson-safe-arg` auto-fixes the string-coercion pattern.

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

---

## Date.prototype.getMilliseconds Is Off by One

**Severity: Low** — incorrect sub-second value

`Date.prototype.getMilliseconds()` frequently reads back one less than the value the date was constructed with.

```javascript
new Date(2020, 0, 1, 0, 0, 0, 123).getMilliseconds();
// Expected: 123
// Actual:   122

new Date(2020, 0, 1, 0, 0, 0, 555).getMilliseconds(); // 554
new Date(2020, 0, 1, 0, 0, 0, 666).getMilliseconds(); // 665
new Date(2020, 0, 1, 0, 0, 0, 777).getMilliseconds(); // 776
// Some values are exact: 0, 111, 222, 333, 444, 888, 999
```

Never compare or store sub-second precision from a `Date`. Round to whole seconds, or read milliseconds from `getTime()` arithmetic if you must. The UTC variant `getUTCMilliseconds()` was accurate at the epoch in testing, but treat local millisecond precision as unreliable.

---

## Date.now() Returns a Date Object, Not a Number

**Severity: Medium** — type mismatch breaks numeric code

`Date.now()` returns a **`Date` object** in the SFMC engine, not the numeric timestamp the spec requires.

```javascript
typeof Date.now();   // "object"  (spec: "number")

// ❌ math on the result is wrong unless you coerce
// ✅ use getTime() for a clean number
var ms = new Date().getTime();   // number of ms since epoch
```

Numeric coercion (`Date.now() + 0`) does recover the epoch milliseconds, but prefer `new Date().getTime()`. See [Differs from Official Docs](/engine-limitations/differs-from-docs/#datenow-returns-a-date-object-not-a-number).

---

## Date.parse() Returns 0 (Never NaN) for Invalid Strings

**Severity: Medium** — invalid dates silently become 1970-01-01

`Date.parse()` returns **`0`** (the Unix epoch) for any unparseable string instead of `NaN`, so `isNaN()` cannot detect a bad date.

```javascript
Date.parse("garbage");     // 0   (spec: NaN)
Date.parse("");            // 0   (spec: NaN)
Date.parse("2021-13-45");  // 0   (spec: NaN)
isNaN(Date.parse("garbage")); // false — bad input looks like 1970-01-01
```

Validate date strings yourself before calling `Date.parse()`; do not rely on `NaN` for error detection. Note also that date-only strings parse as **local** midnight, not UTC. See [Differs from Official Docs](/engine-limitations/differs-from-docs/#dateparse-returns-0-never-nan-for-invalid-strings-and-parses-date-only-strings-as-local).

---

## Function.prototype.length Throws {#functionprototypelength-throws}

**Severity: Medium** — reading a function's arity crashes the page

Reading `fn.length` (the declared argument count) **throws** `Object reference not set to an instance of an object.` in the SFMC engine instead of returning a number. `fn.hasOwnProperty("length")` is `false`.

```javascript
function sum(a, b) { return a + b; }
sum.length;
// Expected: 2
// Actual:   THROWS "Object reference not set to an instance of an object."
```

Track expected arity yourself (a plain variable or constant) rather than reading `fn.length`. Related missing/altered `Function.prototype` members: `fn.name` and `fn.caller` are `undefined`, `fn.toString()` returns `[object Function]` not the source, and `fn.constructor === Function` is `false` — see [Function Methods](/ecmascript-builtins/function-methods/) and [Differs from Official Docs](/engine-limitations/differs-from-docs/#functionprototypetostring-returns-object-function-not-source).

---

## Math.max / Math.min Throw with 3+ Arguments {#math-max-min-throw}

**Severity: Medium** — the variadic form crashes the page

`Math.max` and `Math.min` are variadic in standard JavaScript, but in the SFMC engine they only accept **exactly two** arguments. Passing **three or more** throws, and the **no-argument** form returns `0` instead of `-Infinity` / `+Infinity`. The two-argument form is runtime-verified correct.

```javascript
Math.max(1, 5);       // 5   — safe
Math.max(1, 5, 3);    // THROWS "Index was outside the bounds of the array."
Math.max();           // 0   — expected -Infinity

Math.min(1, 5);       // 1   — safe
Math.min(1, 5, 3);    // THROWS "Index was outside the bounds of the array."
Math.min();           // 0   — expected +Infinity
```

Compare two values at a time — `Math.max(Math.max(a, b), c)` — fold with a loop, or use the [Math.max / Math.min polyfill](/engine-limitations/polyfills/#math-max-min). See [Math Object](/ecmascript-builtins/math/#max) for the full list of `Math` members and which ES6 methods are missing.

---

## Infinity Has an Inverted Sign and Broken Comparisons {#infinity-inverted}

**Severity: Medium** — silent wrong results in numeric edge cases

The global `Infinity` identifier exists (`typeof Infinity` is `"number"`), but the SFMC Jint engine mishandles it. When stringified it shows the **wrong sign**: `String(Infinity)` and `(1/0)` render as `"-infinity"`, while `-Infinity` and `(-1/0)` render as `"infinity"`. Worse, comparisons are also broken — `(Infinity > 0)` and `(1/0 > 0)` both return **`false`** instead of `true` (runtime-verified). `Number.POSITIVE_INFINITY` / `Number.NEGATIVE_INFINITY` do not exist to work around this (both are `undefined` — see [Number Methods](/ecmascript-builtins/number-methods/#constants)).

```javascript
typeof Infinity;    // "number"
String(Infinity);   // "-infinity"  — inverted sign
(1 / 0);            // "-infinity"  — inverted sign
(Infinity > 0);     // false        — expected true
isFinite(Infinity); // false        — this one is correct
```

Avoid relying on `Infinity` semantics. Use `isFinite(x)` to detect non-finite values (it returns the correct answer), and never branch on the sign or ordering of an `Infinity` value. See [Number Methods](/ecmascript-builtins/number-methods/#constants).

---

## Object.prototype.isPrototypeOf Hangs the Engine {#objectprototypeisprototypeof-hangs}

**Severity: High** — the page never renders (request times out)

`Object.prototype.isPrototypeOf` exists in the SFMC Jint engine (`typeof obj.isPrototypeOf` is `"function"`), but **calling it hangs the engine indefinitely** — the CloudPage times out and never returns any output (runtime-verified: a probe that called it produced a request timeout, and removing the call let the same script render). There is no argument form that is safe.

```javascript
typeof ({}).isPrototypeOf;        // "function"  — it appears to exist
// Ctor.prototype.isPrototypeOf(obj);  // HANGS — never call it (request times out)
```

Never call `isPrototypeOf`. To test prototype/instance relationships, compare the constructor directly (`obj.constructor === Ctor`) or walk the prototype chain manually. See [Object Methods](/ecmascript-builtins/object-methods/#isprototypeof).

---

## Object.prototype.propertyIsEnumerable Always Returns false {#objectprototypepropertyisenumerable-broken}

**Severity: Low** — incorrect result

`Object.prototype.propertyIsEnumerable(prop)` exists in the SFMC Jint engine but is **broken**: it returns `false` even for own enumerable properties (runtime-verified). Use `hasOwnProperty` for own-property checks instead.

```javascript
var o = { a: 1 };
o.propertyIsEnumerable("a"); // false — WRONG, should be true
o.hasOwnProperty("a");       // true  — use this instead
```

See [Object Methods](/ecmascript-builtins/object-methods/#propertyisenumerable) and [Differs from Official Docs](/engine-limitations/differs-from-docs/#objectprototypepropertyisenumerable-broken).
