---
layout: function
title: Platform.Function.Stringify
parent: Platform Functions
parent_url: /platform-functions/
description: Converts an object or value to its JSON string representation. Does not require Platform.Load.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.Stringify(object)"
return_type: string
min_args: 1
max_args: 1
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `object` | any | Yes | The object or value to serialize to JSON. |

Passing an explicit `undefined` or `null` returns the literal string `"null"` (a JSON string, not the JavaScript `null` value).

Although the official reference types the parameter as `object`, every scalar type is accepted too — strings, numbers and booleans all serialize to their JSON form. Unlike `JSON.stringify()`, there are no `replacer` or `space` parameters.

{% include test-script.html bundle="platform-functions--stringify" chapter="parameters" %}

## Description

`Platform.Function.Stringify()` converts any JavaScript value to its JSON string representation. It is the SSJS equivalent of `JSON.stringify()`, which is not available in the SFMC SSJS engine.

### Difference from the global `Stringify()` form

Both functions produce byte-identical output for the same value, but they differ in two runtime-verified ways:

| | `Platform.Function.Stringify()` | `Stringify()` (global) |
|---|---|---|
| Requires `Platform.Load` | **No** | **Yes** — `Platform.Load("core", "1.1.5")` |
| Wrong argument count | **Throws** | **Silent** — zero args returns `"null"`, an extra arg is ignored |

Prefer `Platform.Function.Stringify()` when you do not already have a `Platform.Load` call in scope, or when you want to avoid the initialization overhead — and because its stricter argument checking surfaces mistakes instead of hiding them.

See [Stringify](/core-library/stringify/) for the bare-name Core variant.

**Important distinction from `String()`:**
- `Platform.Function.Stringify(obj)` → produces JSON output: `{"name":"Jane","age":30}`
- `String(obj)` → converts CLR/.NET objects to JavaScript strings (not JSON)

Use `Stringify` / `Platform.Function.Stringify` when you want to store, log, or send JSON data.
Use `String()` when you need to convert CLR response content from `Script.Util.HttpRequest.send()` before parsing it with `ParseJSON`.

{% include test-script.html bundle="platform-functions--stringify" chapter="description" %}

## Serialization details

The serializer is a .NET implementation, not `JSON.stringify()`. Its output is usually valid JSON, but several details differ from what a JavaScript developer expects. All of the following are runtime-verified on a CloudPage.

**Layout.** Objects are compact — no space after `:` or `,`. **Array elements are separated by a comma plus a CRLF**, so array output spans multiple lines. That is still legal JSON (whitespace is permitted between elements), but the output is not byte-identical to a compact serializer, which matters when comparing or signing payloads.

```javascript
Platform.Function.Stringify({ a: 1, b: 2 });  // {"a":1,"b":2}
Platform.Function.Stringify([1, 2]);          // [1,\r\n2]
```

**Escaping.** Double quotes, backslashes, newlines and tabs are escaped. Forward slashes and single quotes are not. Non-ASCII characters pass through **raw** rather than as `\uXXXX` escapes.

**Output that is not valid JSON.** Two cases produce broken output:

- A control character such as `U+0001` is emitted raw. The JSON spec requires `\u0001`.
- A double quote inside a **key** is not escaped, so `{ 'a"b': 1 }` serializes to `{"a"b":1}`.

**Missing and non-serializable members.** An `undefined` property or array element becomes `null` (`JSON.stringify` omits object properties instead). A **function**-valued member becomes the string `"function"`, in both objects and arrays.

**Numbers.** Negative zero becomes `0`. Large and small magnitudes use the .NET round-trip exponent form rather than the JavaScript form, and precision is lost above the safe-integer range:

```javascript
Platform.Function.Stringify(9007199254740991);  // 9.00719925474099E+15
Platform.Function.Stringify(6.02e23);           // 6.02E+23
Platform.Function.Stringify(1e-7);              // 1E-07
```

That exponent text is **not** valid JSON number syntax, so `ParseJSON` returns it as a string rather than a number.

{% include differs-from-docs.html note="NaN and both infinities are serialized wrongly. NaN becomes the single character U+221E (the infinity sign). Worse, the infinity signs are inverted: positive Infinity serializes to \"-∞\" and negative Infinity to \"∞\". JSON.stringify emits null for all three. Confirmed on a CloudPage via two independent constructions (1/0 and Number.POSITIVE_INFINITY). Never let a NaN or Infinity reach Stringify — guard the value first." %}

{% include test-script.html bundle="platform-functions--stringify" chapter="nan-infinity-deviation" label="Show test script — NaN and inverted infinity signs" %}

**Dates.** A `Date` serializes to a quoted ISO-like local string with millisecond precision and **no** timezone suffix — `"2026-07-31T10:05:22.871"`. This differs from `String(date)`, which produces an RFC-like form, and from `Platform.Response.Write(date)`, which produces a locale form. See [Platform.Function.Now](/platform-functions/now/).

**Circular references.** A self-referencing object does **not** throw: the repeated node is emitted as `null`.

{% include test-script.html bundle="platform-functions--stringify" chapter="serialization-details" %}

## Examples

### Serialize an object

```javascript
var person = {
    name: "Jane Smith",
    email: "jane@example.com",
    score: 95
};

var json = Platform.Function.Stringify(person);
Platform.Response.Write(json);
// {"name":"Jane Smith","email":"jane@example.com","score":95}
```

### Store JSON in a Data Extension

```javascript
var payload = {
    action: "page_view",
    page: "/preferences",
    timestamp: Platform.Function.Now()
};

Platform.Function.InsertData(
    "ActivityLog",
    "SubscriberKey", subscriberKey,
    "Payload", Platform.Function.Stringify(payload),
    "Timestamp", Platform.Function.Now()
);
```

### Debug: inspect any variable

```javascript
var rows = Platform.Function.LookupRows("MyDE", "Status", "active");
Platform.Response.Write("<pre>" + Platform.Function.Stringify(rows) + "</pre>");
```

{% include test-script.html bundle="platform-functions--stringify" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/stringify/">Stringify() — bare-name Core form (requires Platform.Load)</a></li>
  <li><a href="/ecmascript-builtins/string-methods/#string-constructor">String()</a></li>
  <li><a href="/platform-functions/parsejson/">Platform.Function.ParseJSON</a></li>
  <li><a href="/core-library/write/">Write() — Core output function</a></li>
  <li><a href="/platform-objects/platform-response/#write">Platform.Response.Write()</a></li>
</ul>
</div>
