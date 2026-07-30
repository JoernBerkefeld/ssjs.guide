---
layout: page
title: Promises & Iteration
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/promises-iteration/
description: Promises, generators, async functions, and the ES6 iteration protocol are not available in SSJS. The SFMC Jint engine predates ES2015 and runs synchronously, so Promise, Iterator, Generator, and all async variants are undefined.
verification: verified
test_scripts: complete
---

**Promises, generators, async functions, and the iteration protocol are not available in SSJS.** The SFMC server-side JavaScript engine (Jint) implements an ES3/ES5-era dialect, predates ES2015, and executes **synchronously** — there is no event loop or microtask queue. `Promise`, `Iterator`, `Generator`, `GeneratorFunction`, and every async variant are `undefined`, and `new Promise(...)` throws `Unknown type: Promise`.

## Status legend

| Icon | Meaning |
|------|---------|
| ❌ Missing | Not available (`typeof` is `"undefined"`; construction throws) |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Promise`](#promise) | ES6 | ❌ Missing | Engine is synchronous — no `.then`/`await` |
| [`Iterator`](#iterator) | ES6 | ❌ Missing | No iteration protocol; use index loops |
| [`Generator`](#generator) | ES6 | ❌ Missing | `function*` syntax is not supported |
| [`GeneratorFunction`](#generatorfunction) | ES6 | ❌ Missing | — |
| [`AsyncFunction`](#async-variants) | ES2017 | ❌ Missing | `async`/`await` unsupported |
| [`AsyncGenerator`](#async-variants) | ES2018 | ❌ Missing | — |
| [`AsyncGeneratorFunction`](#async-variants) | ES2018 | ❌ Missing | — |
| [`AsyncIterator`](#async-variants) | ES2018 | ❌ Missing | — |

---

## Promise {#promise}

`(ES6)` — ❌ Missing. `Promise` is **not defined** — `typeof Promise === "undefined"` and `new Promise(function(resolve){ resolve(1); })` throws `Unknown type: Promise`.

The SSJS engine runs synchronously, so asynchronous flow control is neither needed nor available. All Platform and HTTP calls are **blocking** — write straight-line code and read return values directly:

```javascript
// No Promise/await — HTTP calls return synchronously.
var resp = HTTP.Get("https://postman-echo.com/get");
Write(resp.Status);   // available immediately
```

{% include test-script.html bundle="ecmascript-builtins--promises-iteration" chapter="promise" %}

## Iterator {#iterator}

`(ES6)` — ❌ Missing. `Iterator` is **not defined**. Because `Symbol` is also absent, there are **no well-known symbols** and therefore no iterator protocol — `for…of`, spread, and destructuring over iterables are unavailable. Iterate arrays with a classic index loop:

```javascript
for (var i = 0; i < arr.length; i++) {
    Write(arr[i] + "\n");
}
```

{% include test-script.html bundle="ecmascript-builtins--promises-iteration" chapter="iterator" %}

## Generator {#generator}

`(ES6)` — ❌ Missing. `Generator` is **not defined**, and the `function*` / `yield` generator syntax is not supported by the engine's parser. Return a fully-materialised array instead of yielding lazily.

{% include test-script.html bundle="ecmascript-builtins--promises-iteration" chapter="generator" %}

## GeneratorFunction {#generatorfunction}

`(ES6)` — ❌ Missing. `GeneratorFunction` (the hidden constructor of generator functions) is **not defined**.

{% include test-script.html bundle="ecmascript-builtins--promises-iteration" chapter="generatorfunction" %}

## Async variants {#async-variants}

`(ES2017+)` — ❌ Missing. `AsyncFunction`, `AsyncGenerator`, `AsyncGeneratorFunction`, and `AsyncIterator` are all **not defined**. The `async` / `await` keywords are not supported. Since the engine is synchronous, model any "async" work as ordinary blocking calls.

{% include test-script.html bundle="ecmascript-builtins--promises-iteration" chapter="async-variants" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/ecmascript-builtins/symbol/">Symbol</a></li>
  <li><a href="/http/">HTTP Functions</a></li>
</ul>
</div>
