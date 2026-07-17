---
layout: page
title: JSON
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/json/
description: The JSON built-in is unavailable in SFMC SSJS — use Platform.Function.ParseJSON and Platform.Function.Stringify (or the Stringify global) instead.
verification: verified
---

The native `JSON` object is **not available** in SFMC SSJS — `JSON.parse` and `JSON.stringify` both throw. Use the SFMC-proprietary `Platform.Function.ParseJSON` and `Platform.Function.Stringify` (or the `Stringify` global) instead.

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available — use the workaround |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`JSON.parse(text)`](#parse) | ES5 | ❌ Missing | Use [`Platform.Function.ParseJSON`](/platform-functions/parsejson/) |
| [`JSON.stringify(value)`](#stringify) | ES5 | ❌ Missing | Use [`Platform.Function.Stringify`](/platform-functions/stringify/) or the bare-name [`Stringify`](/core-library/stringify/) Core global |

---

## parse {#parse}

`(ES5)` — ❌ Missing. `JSON.parse` is not available. Use `Platform.Function.ParseJSON(string)`, which parses a JSON string into an SSJS object. Coerce the input to a string first (`str + ""`) to avoid CLR/JS boundary issues.

```javascript
// ❌ Not available in SFMC:
// var obj = JSON.parse(jsonString);

// ✅ Use Platform.Function.ParseJSON:
var jsonString = '{"name":"Jane","age":30}';
var obj = Platform.Function.ParseJSON(jsonString + "");
Write(obj.name);   // "Jane"
```

See [`Platform.Function.ParseJSON`](/platform-functions/parsejson/) for full details.

---

## stringify {#stringify}

`(ES5)` — ❌ Missing. `JSON.stringify` is not available. Use `Platform.Function.Stringify(value)` (no `Platform.Load` needed) or the `Stringify` global (requires `Platform.Load("Core", "1")`).

```javascript
// ❌ Not available in SFMC:
// var text = JSON.stringify(obj);

// ✅ Use Platform.Function.Stringify:
var obj = { name: "Jane", age: 30 };
var text = Platform.Function.Stringify(obj);
Write(text);   // '{"name":"Jane","age":30}'

// ✅ Or the Stringify global (after Platform.Load):
var text2 = Stringify(obj);
```

See [`Platform.Function.Stringify`](/platform-functions/stringify/) and [`Stringify`](/core-library/stringify/) for full details.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/parsejson/">Platform.Function.ParseJSON</a></li>
  <li><a href="/platform-functions/stringify/">Platform.Function.Stringify</a></li>
  <li><a href="/core-library/stringify/">Stringify (bare-name Core form)</a></li>
  <li><a href="/language/objects-and-json/">Objects &amp; JSON</a></li>
</ul>
</div>
