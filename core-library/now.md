---
layout: function
title: Now
parent: Core Library
parent_url: /core-library/
permalink: /core-library/now/
description: Bare-name Core form of Platform.Function.Now — returns the current server date/time as a Date object. Requires Platform.Load.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: true
test_scripts: complete
syntax: "Now([useContextTime])"
return_type: Date
min_args: 0
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `useContextTime` | string \| boolean \| number | No | When `true`, returns the time the triggering send or activity was initiated. When `false` or omitted, returns the current system clock time. Also accepts number `0` / `1` and the strings `"true"` / `"false"`. |

On a CloudPage there is no triggering send or activity timestamp, so `Now(true)` returns a current-time `Date` just like the omitted and `false` forms.

{% include test-script.html bundle="core-library--now" chapter="parameters" %}

## Description

`Now()` is the bare-name Core-library form of [`Platform.Function.Now()`](/platform-functions/now/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

It returns the same kind of value as `Platform.Function.Now()`: a `Date` object, with the same optional `useContextTime` parameter. Surplus arguments beyond the documented maximum of one are silently ignored on the bare form; the qualified form throws if more than one argument is passed. Prefer [`Platform.Function.Now()`](/platform-functions/now/) when you do not already have a `Platform.Load` call in scope.

{% include test-script.html bundle="core-library--now" chapter="description" %}

## Return value

Returns a **`Date` object** (runtime `typeof` is `"object"`, `Object.prototype.toString` reports `[object Date]`, `.constructor === Date`, with working `Date` accessors such as `getFullYear()`, `getMonth()`, and `getTime()` — identical to `new Date()`). The one anomaly is that `instanceof Date` returns `false`, due to the engine-wide `instanceof`-on-builtins bug — test with `.constructor === Date`, not `instanceof`. The time is in the SFMC account's configured timezone (Central by default). When concatenated to a string it coerces to an RFC 2822-style value such as `"Tue, 21 Jul 2026 10:18:24 GMT-06:00"`.

{% include differs-from-docs.html note="The official docs describe the return as an RFC 2822-compliant date-time string, but the runtime returns a Date object; it only appears as an RFC 2822 string when coerced during output." %}

{% include test-script.html bundle="core-library--now" chapter="return-value" %}

## Example

```javascript
Platform.Load("core", "1.1.5");
var current = Now();          // e.g. "Tue, 21 Jul 2026 10:18:24 GMT-06:00"
Write(current.getFullYear()); // 2026
```

{% include test-script.html bundle="core-library--now" chapter="example" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/now/">Platform.Function.Now — qualified form (no Platform.Load required)</a></li>
  <li><a href="/core-library/datetime/">DateTime — timezone conversion helpers</a></li>
  <li><a href="/recipes/date-and-time/">Date & Time recipes</a></li>
</ul>
</div>
