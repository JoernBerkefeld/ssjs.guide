---
layout: function
title: TriggeredSend (Platform)
parent: Platform Functions
parent_url: /platform-functions/
description: Initiates a Triggered Send Definition to a subscriber with optional attributes. This is the Platform.Function wrapper for triggering sends.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.TriggeredSend(triggeredSendKey, emailAddress, subscriberKey [, subscriberAttributes])"
return_type: void
min_args: 3
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `triggeredSendKey` | string | Yes | External key of the Triggered Send Definition |
| `emailAddress` | string | Yes | Recipient email address |
| `subscriberKey` | string | Yes | Subscriber key |
| `subscriberAttributes` | object | No | Key-value object of personalization attributes |

## Examples

```javascript
Platform.Function.TriggeredSend(
    "WelcomeEmail_TSD",
    "jane@example.com",
    "sub_12345",
    {
        FirstName: "Jane",
        PromoCode: "WELCOME20"
    }
);
```

{% include callout.html type="note" content="For more control over triggered sends, including Data Extension attributes and publication lists, use the `TriggeredSend` Core library object." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/triggeredsend/">TriggeredSend (Core)</a></li>
</ul>
</div>
