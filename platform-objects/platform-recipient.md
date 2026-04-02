---
layout: page
title: Platform.Recipient
parent: Platform Objects
parent_url: /platform-objects/
description: Read attribute values and sendable data extension field values for the current recipient during an email send.
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

Also accessible via the shorthand form `Recipient.GetAttributeValue(attributeName)`.

## Examples

```javascript
var email = Platform.Recipient.GetAttributeValue("EmailAddress");
var firstName = Platform.Recipient.GetAttributeValue("FirstName");
var subKey = Platform.Recipient.GetAttributeValue("_subscriberkey");

Platform.Response.Write("Sending to: " + firstName + " <" + email + ">");
```

Shorthand form:

```javascript
var email = Recipient.GetAttributeValue("EmailAddress");
```

## Notes

{% include callout.html type="note" content="`Platform.Recipient` is only populated during a send context (email send, triggered send, or journey send). In CloudPage or landing page contexts it is not available — use `Platform.Request.GetQueryStringParameter` to read URL parameters instead." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/attributevalue/">Platform.Function.AttributeValue</a></li>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
</ul>
</div>
