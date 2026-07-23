---
layout: page
title: Typed Arrays
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/typed-arrays/
description: Typed arrays and the binary-buffer objects — ArrayBuffer, DataView, the Int/Uint/Float TypedArray views, SharedArrayBuffer, and Atomics — are not available in SSJS. The SFMC Jint engine predates ES2015, so every one is undefined.
verification: pending
---

**Typed arrays and binary buffers are not available in SSJS.** The SFMC server-side JavaScript engine (Jint) implements an ES3/ES5-era dialect and predates ES2015, so `ArrayBuffer`, `DataView`, all the integer/float `TypedArray` views, `SharedArrayBuffer`, and `Atomics` are entirely absent. Each is `undefined`, so referencing it yields `undefined` and constructing it (`new Uint8Array()`) fails because the constructor does not exist.

There is no way to work with raw binary data as a byte buffer in SSJS. When you need byte-level handling, either move the work into an external service reached over `Platform.Function.HTTPRequest` / the `Script.Util.HttpRequest` API, or use `Platform.Function.Base64Encode` / `Base64Decode` to move opaque binary payloads around as strings.

## Status legend

| Icon | Meaning |
|------|---------|
| ❌ Missing | Not available (`typeof` is `"undefined"`) |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`ArrayBuffer`](#arraybuffer) | ES6 | ❌ Missing | No raw byte buffer type |
| [`SharedArrayBuffer`](#sharedarraybuffer) | ES2017 | ❌ Missing | No shared memory; engine is single-threaded |
| [`DataView`](#dataview) | ES6 | ❌ Missing | No structured buffer access |
| [`Atomics`](#atomics) | ES2017 | ❌ Missing | No shared-memory atomics |
| [`Int8Array`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`Uint8Array`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`Uint8ClampedArray`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`Int16Array`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`Uint16Array`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`Int32Array`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`Uint32Array`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`Float16Array`](#typedarray-views) | ES2025 | ❌ Missing | See TypedArray views |
| [`Float32Array`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`Float64Array`](#typedarray-views) | ES6 | ❌ Missing | See TypedArray views |
| [`BigInt64Array`](#typedarray-views) | ES2020 | ❌ Missing | See TypedArray views |
| [`BigUint64Array`](#typedarray-views) | ES2020 | ❌ Missing | See TypedArray views |

---

## ArrayBuffer {#arraybuffer}

`(ES6)` — ❌ Missing. `ArrayBuffer` is **not defined** — `typeof ArrayBuffer === "undefined"`. There is no fixed-length raw byte buffer in this engine. Use a regular `Array` of numbers if you only need an in-memory list, or Base64 strings for binary payloads.

## SharedArrayBuffer {#sharedarraybuffer}

`(ES2017)` — ❌ Missing. `SharedArrayBuffer` is **not defined** — `typeof SharedArrayBuffer === "undefined"`. The SSJS engine runs synchronously in a single thread, so there is no shared-memory concept to build on.

## DataView {#dataview}

`(ES6)` — ❌ Missing. `DataView` is **not defined** — `typeof DataView === "undefined"`. With no `ArrayBuffer`, there is nothing for a `DataView` to read or write.

## Atomics {#atomics}

`(ES2017)` — ❌ Missing. `Atomics` is **not defined** — `typeof Atomics === "undefined"`. Atomic operations only apply to shared memory, which does not exist here.

## TypedArray views {#typedarray-views}

All the concrete typed-array view constructors are **not defined** — each has `typeof === "undefined"`:

`Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `Float16Array`, `Float32Array`, `Float64Array`, `BigInt64Array`, `BigUint64Array`.

Because they depend on `ArrayBuffer` (also missing), there is no typed view over binary memory. Use a plain `Array` of JavaScript numbers when you need a numeric sequence:

```javascript
// Instead of: var bytes = new Uint8Array(4);
var bytes = [0, 0, 0, 0];
bytes[0] = 255;
Write(bytes[0]); // 255 (no 0–255 clamping — you must enforce ranges yourself)
```

A plain array does **not** enforce element types or byte widths, and `BigInt64Array` / `BigUint64Array` additionally require `BigInt`, which is also unavailable.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/ecmascript-builtins/array-methods/">Array Methods</a></li>
  <li><a href="/ecmascript-builtins/bigint/">BigInt</a></li>
</ul>
</div>
