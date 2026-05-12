---
layout: page
title: TriggeredSend
parent: Core Library
parent_url: /core-library/
description: Core library object for creating, managing, and sending Triggered Send Definitions (TSD) from SSJS.
---

The `TriggeredSend` Core library object is the recommended way to send transactional emails from SSJS. It provides full lifecycle management of Triggered Send Definitions — create, retrieve, update, start, pause, publish, send, and track.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use. TriggeredSend methods cannot be used in the context of an email message or email preview." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`TriggeredSend.Init(key)`](#init) | TriggeredSendInstance | Initialize a TriggeredSend object by external key |
| [`TriggeredSend.Add(properties)`](#add) | TriggeredSendInstance | Create a new Triggered Send Definition |
| [`TriggeredSend.Retrieve(filter)`](#retrieve) | object[] | Retrieve Triggered Send Definitions matching a filter |
| [`<TriggeredSendInstance>.Update(properties)`](#update) | string | Update the initialized TSD |
| [`<TriggeredSendInstance>.Start()`](#start) | string | Start (reactivate) a paused TSD |
| [`<TriggeredSendInstance>.Pause()`](#pause) | string | Pause an active TSD |
| [`<TriggeredSendInstance>.Publish()`](#publish) | string | Publish a TSD to make it active |
| [`<TriggeredSendInstance>.Send(emailAddress, [sendTimeAttributes])`](#send) | string | Send an email using the TSD |
| [`<TriggeredSendInstance>.Tracking.Retrieve([filter])`](#trackingretrieve) | object[] | Retrieve tracking data for the TSD |
| [`<TriggeredSendInstance>.Tracking.Clicks.Retrieve(filter)`](#trackingclicksretrieve) | object[] | Retrieve click tracking data |
| [`<TriggeredSendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)`](#trackingtotalbyintervalretrieve) | object[] | Retrieve aggregated tracking data by interval |

---

## TriggeredSend.Init

### Syntax

```javascript
TriggeredSend.Init(key)
```

Initializes a TriggeredSend instance bound to the specified external key. Required before invoking any instance method on the returned object.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the Triggered Send Definition |

### Return value

`TriggeredSendInstance`

### Examples

```javascript
Platform.Load("core", "1");
var triggeredSend = TriggeredSend.Init("support");
```

---

## TriggeredSend.Add

### Syntax

```javascript
TriggeredSend.Add(properties)
```

Creates a new triggered send definition from the supplied properties and returns an initialized TriggeredSend instance. Unlike most static `Add` methods, this returns a `TriggeredSendInstance`, not `"OK"`.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `FromName`, `FromAddress`, `EmailID`, `SendClassificationID`, ... |

### Return value

`TriggeredSendInstance`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var newTSD = {
    Name: "Test TSD",
    CustomerKey: "ssjs_tsd_key",
    FromName: "Test From Name",
    FromAddress: "me@example.com",
    EmailID: 12345,
    SendClassificationID: 54321
};
var tsd = TriggeredSend.Add(newTSD);
```

---

## TriggeredSend.Retrieve

### Syntax

```javascript
TriggeredSend.Retrieve(filter)
```

Returns an array of triggered send definitions matching the specified filter.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | PascalCase WSProxy-style filter object: `{Property, SimpleOperator, Value}` |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = TriggeredSend.Retrieve({ Property: "CustomerKey", SimpleOperator: "equals", Value: "ssjs_tsd_key" });
```

---

## &lt;TriggeredSendInstance&gt;.Update

### Syntax

```javascript
<TriggeredSendInstance>.Update(properties)
```

Updates the previously initialized triggered send definition.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change on the triggered send definition |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var tsd = TriggeredSend.Init("triggeredSend");
var status = tsd.Update({ Name: "Updated TSD Name" });
```

---

## &lt;TriggeredSendInstance&gt;.Start

### Syntax

```javascript
<TriggeredSendInstance>.Start()
```

Starts (reactivates) a paused triggered send definition.

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var ts = TriggeredSend.Init("MY_TRIGGERED_SEND_KEY");
var result = ts.Start();
```

---

## &lt;TriggeredSendInstance&gt;.Pause

### Syntax

```javascript
<TriggeredSendInstance>.Pause()
```

Pauses an active triggered send definition.

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var ts = TriggeredSend.Init("MY_TRIGGERED_SEND_KEY");
var status = ts.Pause();
```

---

## &lt;TriggeredSendInstance&gt;.Publish

### Syntax

```javascript
<TriggeredSendInstance>.Publish()
```

Publishes a triggered send definition, making it active and ready to accept sends. Use this to move a definition from Draft / Inactive to Active.

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var ts = TriggeredSend.Init("MY_TRIGGERED_SEND_KEY");
var result = ts.Publish();
```

---

## &lt;TriggeredSendInstance&gt;.Send

### Syntax

```javascript
<TriggeredSendInstance>.Send(emailAddress, [sendTimeAttributes])
```

Sends an email using the previously initialized triggered send definition. On failure, inspect `<TriggeredSendInstance>.LastMessage` for error details.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string | Yes | Email address to send to. SubscriberKey is **not** supported. |
| `sendTimeAttributes` | object | No | Dynamic attributes to include in the send |

### Return value

`"OK"` on success or `"Error"`; throws on a hard failure.

### Examples

#### Simple Send

```javascript
Platform.Load("core", "1.1.5");
var ts = TriggeredSend.Init("triggeredSend");
var status = ts.Send("aruiz@example.com", { FirstName: "Angel", CouponCode: "AA1AF" });
if (status != "OK") { var message = ts.LastMessage; }
```

#### Order Confirmation

```javascript
Platform.Load("core", "1.1.5");

var rawBody = Platform.Request.GetPostData();
var order = Platform.Function.ParseJSON(rawBody + "");

var ts = TriggeredSend.Init("OrderConfirmation_TSD");
var status = ts.Send(order.email, {
    OrderNumber: order.orderNumber,
    Total: order.total,
    ShippingAddress: order.shippingAddress
});

Platform.Response.SetContentType("application/json");
Write(Stringify({ status: status, order: order.orderNumber }));
```

## Notes

### Triggered Send Definition must be active

The Triggered Send Definition must be in **Active** status in Email Studio (Interactions → Triggered Emails). If the TSD is paused or inactive, the send will fail.

### Attributes are case-sensitive

The attribute keys in `sendTimeAttributes` must exactly match the AMPscript variable names used in the email template (without the `@` prefix).

---

## &lt;TriggeredSendInstance&gt;.Tracking.Retrieve

### Syntax

```javascript
<TriggeredSendInstance>.Tracking.Retrieve([filter])
```

Returns tracking data for the previously initialized triggered send definition.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No | Optional WSProxy-style filter object |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var tsd = TriggeredSend.Init("MyTSDKey");
var tsdTracking = tsd.Tracking.Retrieve();
```

---

## &lt;TriggeredSendInstance&gt;.Tracking.Clicks.Retrieve

### Syntax

```javascript
<TriggeredSendInstance>.Tracking.Clicks.Retrieve(filter)
```

Returns click tracking information for the previously initialized triggered send definition.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter restricting click results |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var tsd = TriggeredSend.Init("MyTSDKey");
var results = tsd.Tracking.Clicks.Retrieve({ Property: "SendUrlID", SimpleOperator: "equals", Value: 12345 });
```

---

## &lt;TriggeredSendInstance&gt;.Tracking.TotalByInterval.Retrieve

### Syntax

```javascript
<TriggeredSendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)
```

Returns aggregated tracking data for the previously initialized triggered send. Aggregates by `type` over the date range, grouped by `groupBy`.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | string | Yes | Type of data: `"Send"`, `"Open"`, `"Click"`, `"Bounce"`, `"Unsubscribe"` |
| `startDate` | string | Yes | Start date of the data period (MM-DD-YYYY) |
| `endDate` | string | Yes | End date of the data period (MM-DD-YYYY) |
| `groupBy` | string | Yes | Interval used to aggregate: `"day"` or `"hour"` |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var tsd = TriggeredSend.Init("MyTSDKey");
var results = tsd.Tracking.TotalByInterval.Retrieve("Click", "07-01-2010", "07-31-2010", "day");
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/email/">Email</a></li>
  <li><a href="/platform-functions/triggeredsend/">Platform.Function.TriggeredSend</a></li>
</ul>
</div>
