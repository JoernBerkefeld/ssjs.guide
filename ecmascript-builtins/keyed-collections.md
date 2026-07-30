---
layout: page
title: Keyed Collections
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/keyed-collections/
description: The ES6 keyed collections — Map, Set, WeakMap, and WeakSet — are not available in SSJS. The SFMC Jint engine predates ES2015, so all four are undefined and cannot be constructed.
verification: verified
test_scripts: complete
---

**The ES6 keyed collections are not available in SSJS.** The SFMC server-side JavaScript engine (Jint) implements an ES3/ES5-era dialect and predates ES2015, so `Map`, `Set`, `WeakMap`, and `WeakSet` are entirely absent. Each is `undefined`, and `new Map()` (etc.) throws `Unknown type: Map`.

## Status legend

| Icon | Meaning |
|------|---------|
| ❌ Missing | Not available (`typeof` is `"undefined"`; `new` throws `Unknown type`) |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Map`](#map) | ES6 | ❌ Missing | Use a plain object as a string-keyed dictionary |
| [`Set`](#set) | ES6 | ❌ Missing | Use a plain object whose keys are the members |
| [`WeakMap`](#weakmap) | ES6 | ❌ Missing | No weak-reference collections exist |
| [`WeakSet`](#weakset) | ES6 | ❌ Missing | No weak-reference collections exist |

---

## Map {#map}

`(ES6)` — ❌ Missing. `Map` is **not defined** — `typeof Map === "undefined"` and `new Map()` throws `Unknown type: Map`.

For string-keyed lookups, use a **plain object** as a dictionary:

```javascript
// Instead of: var m = new Map(); m.set("a", 1);
var m = {};
m["a"] = 1;
Write(m["a"]);              // 1
Write("a" in m ? "has" : "no"); // note: the `in` operator is unsafe in CloudPages —
// prefer: (typeof m["a"] != "undefined")
```

Object keys are always coerced to strings, so a plain object cannot key by object identity or preserve insertion order the way a real `Map` does. In this engine, using an object as a key does not even reach the string-coercion step — `obj[objectKey] = value` throws `Object reference not set to an instance of an object.`

{% include test-script.html bundle="ecmascript-builtins--keyed-collections" chapter="map" %}

## Set {#set}

`(ES6)` — ❌ Missing. `Set` is **not defined** — `typeof Set === "undefined"` and `new Set()` throws `Unknown type: Set`.

Emulate a set of strings with a plain object whose keys are the members:

```javascript
// Instead of: var s = new Set(); s.add("x");
var s = {};
s["x"] = true;
Write(typeof s["x"] != "undefined" ? "member" : "absent"); // "member"
```

{% include test-script.html bundle="ecmascript-builtins--keyed-collections" chapter="set" %}

## WeakMap {#weakmap}

`(ES6)` — ❌ Missing. `WeakMap` is **not defined** — `typeof WeakMap === "undefined"` and `new WeakMap()` throws `Unknown type: WeakMap`. There is no weak-reference mechanism in this engine; use a plain object dictionary (which holds strong references) and delete keys manually when done.

{% include test-script.html bundle="ecmascript-builtins--keyed-collections" chapter="weakmap" %}

## WeakSet {#weakset}

`(ES6)` — ❌ Missing. `WeakSet` is **not defined** — `typeof WeakSet === "undefined"` and `new WeakSet()` throws `Unknown type: WeakSet`. As with `WeakMap`, no weak-reference collection is available.

{% include test-script.html bundle="ecmascript-builtins--keyed-collections" chapter="weakset" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/ecmascript-builtins/object-methods/">Object Methods</a></li>
  <li><a href="/ecmascript-builtins/array-methods/">Array Methods</a></li>
</ul>
</div>
