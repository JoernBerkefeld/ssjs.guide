---
layout: page
title: Platform.Recipient
parent: Platform Objects
parent_url: /platform-objects/
description: Read attribute values and sendable data extension field values for the current recipient during an email send.
verification: verified
differs_from_docs: "Runtime-verified (CloudPage): Platform.Recipient.GetAttributeValue is available WITHOUT Platform.Load and does NOT throw outside a send context — in a plain CloudPage it returns \"\" (empty string) because no recipient is bound. The bare-name Recipient alias is NOT defined at runtime (undefined before and after Platform.Load); use Platform.Recipient.GetAttributeValue(...) or Attribute.GetValue(...) after Platform.Load instead."
---

`Platform.Recipient` provides access to subscriber attributes and sendable data extension fields for the contact being processed in the current send context.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `Platform.Recipient.GetAttributeValue(attributeName)` | string | Returns the value of a subscriber attribute or sendable DE field for the current recipient |

### GetAttributeValue(attributeName)

Returns the value of a subscriber attribute or sendable data extension field for the recipient currently being processed in the send context.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `attributeName` | string | Yes | Name of the subscriber attribute or sendable DE field to retrieve |

{% include callout.html type="warning" content="The bare-name `Recipient` global is **not defined at runtime** — it is `undefined` both before and after `Platform.Load`, contrary to older documentation. Always call `Platform.Recipient.GetAttributeValue(...)`, or use `Attribute.GetValue(name)` after `Platform.Load(\"core\", \"1.1.5\")`." %}

## Examples

```javascript
var email = Platform.Recipient.GetAttributeValue("EmailAddress");
var firstName = Platform.Recipient.GetAttributeValue("FirstName");
var subKey = Platform.Recipient.GetAttributeValue("_subscriberkey");

Platform.Response.Write("Sending to: " + firstName + " <" + email + ">");
```

After `Platform.Load`, the `Attribute` namespace offers an equivalent reader:

```javascript
Platform.Load("core", "1.1.5");
var email = Attribute.GetValue("EmailAddress");
```

## Notes

{% include callout.html type="note" content="`Platform.Recipient` is only *populated* during a send context (email send, triggered send, or journey send). The method itself does not throw in a CloudPage — it simply returns `\"\"` (empty string) because no recipient is bound. To read URL parameters in a CloudPage, use `Platform.Request.GetQueryStringParameter` instead." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/attributevalue/">Platform.Function.AttributeValue</a></li>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
</ul>
</div>
