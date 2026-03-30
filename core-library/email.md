---
layout: page
title: Email
parent: Core Library
parent_url: /core-library/
description: Core library object for sending emails programmatically from SSJS — send a specific email to a subscriber using a send definition.
---

The `Email` Core library object allows you to send an email to a subscriber directly from SSJS without requiring a Triggered Send Definition.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Email.Init(emailId)`](#init) | Email | Initialize an Email object |
| [`email.Send(subscriberObject, sendOptions)`](#send) | number | Send the email |

---

## Email.Init

```javascript
var email = Email.Init(emailId);
```

Initializes an Email object for a specific email asset.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | number | Yes | Numeric ID of the email in Content Builder or Email Studio |

---

## email.Send

```javascript
email.Send(subscriberObject, sendOptions)
```

Sends the email to the specified subscriber.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriberObject` | object | Yes | Subscriber configuration object |
| `sendOptions` | object | Yes | Send configuration including from address, etc. |

### Subscriber Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `EmailAddress` | string | Yes | Recipient email address |
| `SubscriberKey` | string | Yes | Subscriber key |
| `Attributes` | object | No | Key-value personalization attributes |

### Send Options Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `FromAddress` | string | No | From email address |
| `FromName` | string | No | From display name |

### Examples

```javascript
Platform.Load("core", "1.1.5");

var email = Email.Init(12345); // Content Builder email ID

email.Send(
    {
        EmailAddress: "jane@example.com",
        SubscriberKey: "sub_jane",
        Attributes: {
            FirstName: "Jane",
            OrderNumber: "ORD-789"
        }
    },
    {
        FromAddress: "orders@yourbrand.com",
        FromName: "Your Brand Orders"
    }
);
```

## Notes

{% include callout.html type="note" content="For most transactional email use cases, `TriggeredSend` is preferred because it uses a predefined Triggered Send Definition with tracking, opt-outs, and send logging configured. Use `Email.Send()` when you need full programmatic control." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/triggeredsend/">TriggeredSend</a></li>
  <li><a href="/platform-functions/triggeredsend/">Platform.Function.TriggeredSend</a></li>
</ul>
</div>
