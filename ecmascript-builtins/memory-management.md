---
layout: page
title: Memory Management
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/memory-management/
description: The ES2021 memory-management objects WeakRef and FinalizationRegistry are not available in SSJS. The SFMC Jint engine predates them, so both are undefined.
verification: pending
---

**The ES2021 memory-management objects are not available in SSJS.** The SFMC server-side JavaScript engine (Jint) predates ES2021, so `WeakRef` and `FinalizationRegistry` are entirely absent. Each is `undefined`.

These objects only matter for long-lived programs that hold references to large objects and want to cooperate with the garbage collector. SSJS runs a short, synchronous request-scoped script and then tears the context down, so there is rarely a reason to need them — hold normal (strong) references and let the script end reclaim everything.

## Status legend

| Icon | Meaning |
|------|---------|
| ❌ Missing | Not available (`typeof` is `"undefined"`) |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`WeakRef`](#weakref) | ES2021 | ❌ Missing | No weak references; use normal variables |
| [`FinalizationRegistry`](#finalizationregistry) | ES2021 | ❌ Missing | No GC finalization callbacks |

---

## WeakRef {#weakref}

`(ES2021)` — ❌ Missing. `WeakRef` is **not defined** — `typeof WeakRef === "undefined"`. There is no weak-reference mechanism. Hold a normal variable reference; it is released automatically when the request-scoped script finishes.

## FinalizationRegistry {#finalizationregistry}

`(ES2021)` — ❌ Missing. `FinalizationRegistry` is **not defined** — `typeof FinalizationRegistry === "undefined"`. You cannot register a callback to run when an object is garbage-collected. Perform any needed cleanup explicitly at the end of your script instead.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/ecmascript-builtins/keyed-collections/">Keyed Collections</a></li>
</ul>
</div>
