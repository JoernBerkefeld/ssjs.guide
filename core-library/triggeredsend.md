---
layout: page
title: TriggeredSend
parent: Core Library
parent_url: /core-library/
description: Core library object for initiating a Triggered Send Definition (TSD) to deliver a transactional email with subscriber-specific attributes.
---

The `TriggeredSend` Core library object is the recommended way to send transactional emails from SSJS. It uses a predefined Triggered Send Definition that encapsulates the email template, from address, send classification, and other configuration.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`TriggeredSend.Init(externalKey)`](#init) | TriggeredSend | Initialize a TriggeredSend object |
| [`ts.Send(subscriber)`](#send) | number | Send to the subscriber |

---

## TriggeredSend.Init

```javascript
var ts = TriggeredSend.Init(triggeredSendExternalKey);
```

Initializes a TriggeredSend object for a specific Triggered Send Definition.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `triggeredSendExternalKey` | string | Yes | External key of the Triggered Send Definition |

---

## ts.Send

```javascript
ts.Send(subscriberObject)
```

Sends the triggered email to the specified subscriber.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriberObject` | object | Yes | Subscriber configuration (see below) |

### Subscriber Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `EmailAddress` | string | Yes | Recipient email address |
| `SubscriberKey` | string | Yes | Subscriber key |
| `Attributes` | object | No | Key-value personalization attributes |

### Examples

#### Simple Send

```javascript
Platform.Load("core", "1.1.5");

var ts = TriggeredSend.Init("WelcomeEmail_TSD");
ts.Send({
    EmailAddress: "jane@example.com",
    SubscriberKey: "sub_jane",
    Attributes: {
        FirstName: "Jane",
        ConfirmationNumber: "CONF-12345"
    }
});
```

#### Order Confirmation

```javascript
Platform.Load("core", "1.1.5");

var rawBody = Platform.Request.GetPostData();
var order = Platform.Function.ParseJSON(rawBody + "");

function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

var ts = TriggeredSend.Init("OrderConfirmation_TSD");
ts.Send({
    EmailAddress: order.email,
    SubscriberKey: order.customerId,
    Attributes: {
        OrderNumber: order.orderNumber,
        Total: order.total,
        ShippingAddress: order.shippingAddress,
        OrderDate: formatDate(Platform.Function.Now(), "MM/DD/YYYY", "en-US")
    }
});

Platform.Response.SetContentType("application/json");
Write(Stringify({ status: "sent", order: order.orderNumber }));
```

#### Password Reset

```javascript
Platform.Load("core", "1.1.5");

var email = Platform.Request.GetFormField("email");
var token = Platform.Function.GUID();
var expiry = dateAdd(Platform.Function.Now(), 1, "H");

function dateAdd(timestamp,intervalToAdd,intervalType) {
    Platform.Variable.SetValue("@dateAdd_ts",timestamp);
    Platform.Variable.SetValue("@dateAdd_add",intervalToAdd);
    Platform.Variable.SetValue("@dateAdd_type",intervalType);
    return TreatAsContent("%%=DateAdd(@dateAdd_ts, @dateAdd_add, @dateAdd_type)=%%");
}
function formatDate(dateString,dateFormat,timeFormat,isoLocale) {
    Platform.Variable.SetValue("@formatDate_string",dateString);
    Platform.Variable.SetValue("@formatDate_date",dateFormat);
    Platform.Variable.SetValue("@formatDate_time",timeFormat);
    Platform.Variable.SetValue("@formatDate_iso",isoLocale);
    return TreatAsContent("%%=FormatDate(@formatDate_string, @formatDate_date, @formatDate_time, @formatDate_iso)=%%");
}

// Store token
Platform.Function.InsertData(
    "PasswordResetTokens",
    ["Email", "Token", "Expires"],
    [email, token, formatDate(expiry, "MM/DD/YYYY HH:mm:ss")]
);

// Send reset email
var ts = TriggeredSend.Init("PasswordReset_TSD");
ts.Send({
    EmailAddress: email,
    SubscriberKey: email,
    Attributes: {
        ResetLink: "https://yourbrand.com/reset?token=" + token,
        ExpiryTime: "1 hour"
    }
});
```

## Notes

### Return Value

`ts.Send()` returns 1 on success. On failure, it throws an exception — wrap in `try`/`catch` for robust error handling.

### Triggered Send Definition must be active

The Triggered Send Definition must be in **Active** status in Email Studio (Interactions → Triggered Emails). If the TSD is paused or inactive, the send will fail.

### Attributes are case-sensitive

The `Attributes` keys must exactly match the AMPscript variable names used in the email template (without the `@` prefix).

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/email/">Email</a></li>
  <li><a href="/platform-functions/triggeredsend/">Platform.Function.TriggeredSend</a></li>
</ul>
</div>
