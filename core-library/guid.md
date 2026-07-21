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
syntax: "GUID()"
return_type: string
min_args: 0
max_args: 0
---

## Description

`GUID()` is the bare-name Core-library form of [`Platform.Function.GUID()`](/platform-functions/guid/). It requires `Platform.Load("core", "1.1.5")` before use — the bare name is `undefined` until the load has run.

It behaves **identically** to `Platform.Function.GUID()`: it generates a new globally unique identifier as a lowercase canonical UUID v4 string of 36 characters (e.g. `"f038aa14-708f-4392-a329-7dfa46abaf4b"`). Use the qualified [`Platform.Function.GUID()`](/platform-functions/guid/) form when you do not already have a `Platform.Load` call in scope.

## Return value

Returns a `string` — a lowercase canonical UUID v4 (36 characters, hyphen-separated).

## Example

```javascript
Platform.Load("core", "1.1.5");
var id = GUID(); // e.g. "f038aa14-708f-4392-a329-7dfa46abaf4b"
Write(id);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/guid/">Platform.Function.GUID — qualified form (no Platform.Load required)</a></li>
</ul>
</div>
