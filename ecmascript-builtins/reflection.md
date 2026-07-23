---
layout: page
title: Reflection
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/reflection/
description: The ES6 reflection objects Proxy and Reflect are not available in SSJS. The SFMC Jint engine predates ES2015, so both are undefined and cannot be used to intercept or introspect objects.
verification: pending
---

**The ES6 reflection objects are not available in SSJS.** The SFMC server-side JavaScript engine (Jint) implements an ES3/ES5-era dialect and predates ES2015, so `Proxy` and `Reflect` are entirely absent. `Reflect` is `undefined`, and `new Proxy(target, handler)` throws `Unknown type: Proxy`.

## Status legend

| Icon | Meaning |
|------|---------|
| ❌ Missing | Not available (`typeof` is `"undefined"`) |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Proxy`](#proxy) | ES6 | ❌ Missing | No trap-based interception |
| [`Reflect`](#reflect) | ES6 | ❌ Missing | Use ES5 `Object` methods instead |

---

## Proxy {#proxy}

`(ES6)` — ❌ Missing. `Proxy` is **not defined** — `typeof Proxy === "undefined"` and `new Proxy({}, {})` throws `Unknown type: Proxy`. There is no way to intercept property access, assignment, or function calls with traps. Wrap objects in explicit accessor functions when you need mediated access.

## Reflect {#reflect}

`(ES6)` — ❌ Missing. `Reflect` is **not defined** — `typeof Reflect === "undefined"`. Use the ES5 equivalents on `Object` and direct operators instead:

| `Reflect` method | ES5 / operator equivalent |
|------------------|---------------------------|
| `Reflect.has(o, k)` | `k in o` (or `typeof o[k] != "undefined"`) |
| `Reflect.get(o, k)` | `o[k]` |
| `Reflect.set(o, k, v)` | `o[k] = v` |
| `Reflect.deleteProperty(o, k)` | `delete o[k]` |
| `Reflect.ownKeys(o)` | `Object.keys(o)` (string keys only; no symbols) |
| `Reflect.getPrototypeOf(o)` | `Object.getPrototypeOf(o)` |

```javascript
// Instead of Reflect.has(obj, "id"):
var obj = { id: 42 };
Write(typeof obj["id"] != "undefined" ? "has id" : "no id"); // "has id"
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/ecmascript-builtins/object-methods/">Object Methods</a></li>
  <li><a href="/ecmascript-builtins/symbol/">Symbol</a></li>
</ul>
</div>
