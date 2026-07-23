---
layout: function
title: Attribute
parent: Core Library
parent_url: /core-library/
permalink: /core-library/attribute/
redirect_from:
  - /global-functions/attribute/
description: Global object providing access to subscriber attribute values in email send context.
requires_core_load: true
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
verification: verified
differs_from_docs: true
syntax: "Attribute.GetValue(name)"
return_type: string
min_args: 1
max_args: 1
---

## Description

The global `Attribute` object provides access to subscriber attribute (profile attribute) values for the current recipient. It requires `Platform.Load("Core", ...)` before use.

{% include differs-from-docs.html note="The docs imply `Attribute.GetValue` is unavailable in CloudPages, but after `Platform.Load(\"Core\", ...)` it works there too — and when no recipient is in context (e.g. a plain CloudPage GET) it returns an empty string `\"\"` instead of throwing." %}

### Attribute.GetValue {#getvalue}

Returns the value of the specified subscriber attribute or sendable data extension field for the current recipient. Preferred over `Platform.Recipient.GetAttributeValue()` — the two are equivalent.

`Attribute.GetValue(name)` is available in CloudPages: after the Core library is loaded, the `Attribute` object exists and `GetValue` executes and returns a string. When there is no recipient/attribute context (for example a published CloudPage GET with no subscriber), it returns an **empty string** rather than throwing. In email, triggered send, and personalized (recipient-aware) contexts it returns the actual attribute value.

In non-recipient CloudPage scenarios where you need subscriber data, read it from a Data Extension via `Platform.Function.Lookup()` / `Platform.Function.LookupRows()`, or use [`Platform.Recipient.GetAttributeValue`](/platform-objects/platform-recipient/) (equivalent to `Attribute.GetValue`).

The AMPscript parallel is `AttributeValue()` (different language); SSJS uses `Attribute.GetValue(name)`.

## Example

```javascript
Platform.Load("Core", "1.1.1");

var firstName = Attribute.GetValue("FirstName");
var city      = Attribute.GetValue("City");

if (firstName) {
    Write("<p>Hello, " + firstName + "!</p>");
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/lookup/">Platform.Function.Lookup</a></li>
  <li><a href="/platform-objects/platform-recipient/">Platform.Recipient</a></li>
</ul>
</div>
