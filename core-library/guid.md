---
layout: function
title: GUID
parent: Core Library
parent_url: /core-library/
permalink: /core-library/guid/
description: Bare-name Core form of Platform.Function.GUID — generates a lowercase UUID v4 string. Requires Platform.Load.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
requires_core_load: true
verification: verified
differs_from_docs: false
test_scripts: complete
syntax: "GUID()"
return_type: string
min_args: 0
max_args: 0
---

## Description

`GUID()` is the bare-name Core-library form of [`Platform.Function.GUID()`](/platform-functions/guid/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

It returns the same kind of value as `Platform.Function.GUID()`: a lowercase canonical UUID v4 string of 36 characters (e.g. `"f038aa14-708f-4392-a329-7dfa46abaf4b"`). Call it with no arguments. Surplus arguments are silently ignored on the bare form; the qualified form throws if any argument is passed. Prefer [`Platform.Function.GUID()`](/platform-functions/guid/) when you do not already have a `Platform.Load` call in scope.

{% include test-script.html bundle="core-library--guid" chapter="description" %}

## Return value

Returns a `string` — a lowercase canonical UUID v4 (36 characters, hyphen-separated).

{% include test-script.html bundle="core-library--guid" chapter="return-value" %}

## Example

```javascript
Platform.Load("core", "1.1.5");
var id = GUID(); // e.g. "f038aa14-708f-4392-a329-7dfa46abaf4b"
Write(id);
```

{% include test-script.html bundle="core-library--guid" chapter="example" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/guid/">Platform.Function.GUID — qualified form (no Platform.Load required)</a></li>
</ul>
</div>
