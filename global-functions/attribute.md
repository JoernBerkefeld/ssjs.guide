---
layout: function
title: Attribute (Global Object)
parent: Global Functions
parent_url: /global-functions/
description: Global object providing access to subscriber attribute values in email send context.
availability:
  email: true
  cloudpage: false
  automation: false
  triggered_send: true
syntax: "Attribute.Value(attributeName)"
return_type: object
min_args: 1
max_args: 1
---

## Description

The global `Attribute` object provides access to subscriber attribute (profile attribute) values when SSJS runs in an email or triggered send context. It is not available in CloudPages.

For CloudPages use `Platform.Function.AttributeValue()` or look up subscriber data from a Data Extension via `Platform.Function.Lookup()`.

## Example

```javascript
var firstName = Attribute.Value("FirstName");
var city      = Attribute.Value("City");

if (firstName) {
    Write("<p>Hello, " + firstName + "!</p>");
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/attributevalue/">Platform.Function.AttributeValue</a></li>
  <li><a href="/platform-functions/lookup/">Platform.Function.Lookup</a></li>
</ul>
</div>
