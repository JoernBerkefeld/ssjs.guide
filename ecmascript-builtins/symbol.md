---
layout: page
title: Symbol
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The ES6 Symbol primitive type is not available in SSJS — the SFMC Jint engine predates ES2015, so Symbol, Symbol.iterator, and well-known symbols are all undefined.
verification: verified
---

**`Symbol` is not available in SSJS.** The SFMC server-side JavaScript engine (Jint) implements an ES3/ES5-era dialect and predates ES2015, so the `Symbol` primitive type — introduced in ES6 — is entirely absent. `typeof Symbol` is `"undefined"`, and calling `Symbol("x")` throws `Object expected`.

## Status legend

| Icon | Meaning |
|------|---------|
| ❌ Missing | Not available (or `undefined`) — no workaround provides real symbols |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Symbol()`](#symbol) | ES6 | ❌ Missing | `typeof Symbol === "undefined"`; calling it throws |
| [`Symbol.iterator`](#symbol-iterator) | ES6 | ❌ Missing | No well-known symbols; no iterator protocol |

---

## Symbol {#symbol}

`(ES6)` — ❌ Missing. `Symbol` is **not defined** in the SFMC engine.

```javascript
(typeof Symbol === "undefined");   // true
// Symbol("x");                    // throws "Object expected: Symbol"
```

There is no equivalent for the unique-primitive use case. For "unique key" needs, use a plain string key with a namespace prefix. There is no way to create a truly collision-proof key.

## Symbol.iterator {#symbol-iterator}

`(ES6)` — ❌ Missing. Because `Symbol` itself is absent, there are no **well-known symbols** (`Symbol.iterator`, `Symbol.asyncIterator`, `Symbol.hasInstance`, …) and therefore **no iterator protocol**. `for…of`, spread, and destructuring over iterables are unavailable. Use classic `for (var i = 0; i < arr.length; i++)` loops over arrays instead.

```javascript
(typeof Symbol === "undefined");   // true → Symbol.iterator cannot exist
// iterate arrays with a classic index loop:
for (var i = 0; i < arr.length; i++) { /* … */ }
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/ecmascript-builtins/array-methods/">Array Methods</a></li>
</ul>
</div>
