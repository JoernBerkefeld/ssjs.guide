---
layout: page
title: TriggeredSend
parent: Core Library
parent_url: /core-library/
description: Core library object for creating, managing, and sending Triggered Send Definitions (TSD) from SSJS.
verification: verified
differs_from_docs: true
requires_core_load: true
type_mapping:
  ssjs: "TriggeredSend"
  soap: "TriggeredSendDefinition"
  mcdev: "triggeredSend"
  gui: "Triggered Send"
---

The `TriggeredSend` Core library object is the recommended way to send transactional emails from SSJS. It provides full lifecycle management of Triggered Send Definitions — create, retrieve, update, start, pause, publish, send, and track.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use. TriggeredSend methods cannot be used in the context of an email message or email preview." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`TriggeredSend.Init(key)`](#init) | TriggeredSendInstance | Initialize a TriggeredSend object by external key |
| [`TriggeredSend.Add(properties)`](#add) | TriggeredSendInstance | Create a new Triggered Send Definition |
| [`TriggeredSend.Retrieve(filter)`](#retrieve) | object[] | Retrieve Triggered Send Definitions matching a filter |
| [`<TriggeredSendInstance>.Update([properties])`](#instance-update) | string | Update the initialized TSD (must not be Active) |
| [`<TriggeredSendInstance>.Start()`](#instance-start) | string | Start (reactivate) a paused TSD |
| [`<TriggeredSendInstance>.Pause()`](#instance-pause) | string | Pause an active TSD |
| [`<TriggeredSendInstance>.Publish()`](#instance-publish) | string | Publish a TSD to make it active |
| [`<TriggeredSendInstance>.Send(emailAddress, [sendTimeAttributes], [subscriberKey])`](#instance-send) | string | Send an email using the TSD |
| [`<TriggeredSendInstance>.Tracking.Retrieve([filter])`](#instance-tracking-retrieve) | object[] | Retrieve tracking data for the TSD |
| [`<TriggeredSendInstance>.Tracking.Clicks.Retrieve(filter)`](#instance-tracking-clicks-retrieve) | object[] | Retrieve click tracking data |
| [`<TriggeredSendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)`](#instance-tracking-totalbyinterval-retrieve) | object[] | Retrieve aggregated tracking data by interval |

---

### TriggeredSend.Init {#init}

Initializes a TriggeredSend instance bound to the specified external key. Required before invoking any instance method on the returned object.

#### Syntax

```javascript
TriggeredSend.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the Triggered Send Definition |

#### Return value

`TriggeredSendInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var triggeredSend = TriggeredSend.Init("support");
```

---

### TriggeredSend.Add {#add}

{% include method-status.html status="blocked" differs=true %}

{% include callout.html type="danger" content="<strong>Does not work at runtime.</strong> Every invocation throws the string <code>Error adding TSD.</code> — verified against a fully valid, publishable definition. Use WSProxy <code>createItem(\"TriggeredSendDefinition\", ...)</code> instead; with the identical payload it returns <code>Status: \"OK\"</code> and the resulting definition publishes, starts, sends, pauses and updates normally." %}

Creates a new triggered send definition from the supplied properties and returns an initialized TriggeredSend instance. Unlike most static `Add` methods, this returns a `TriggeredSendInstance`, not `"OK"`.

#### Syntax

```javascript
TriggeredSend.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `FromName`, `FromAddress`, `EmailID`, `SendClassificationID`, ... |

#### Return value

`TriggeredSendInstance` per the official documentation — never observed, see below.

#### Runtime behaviour

No working invocation exists. The method always throws the string `Error adding TSD.`, and `TriggeredSend.LastMessage` is then one of:

| Payload contains | `LastMessage` | `LastErrorCode` |
|---|---|---|
| Any nested object (`Email`, `List`, `SendClassification`) | `An error occurred when attempting to evaluate a SetObjectProperty function call.  See inner exception for details.` | `undefined` / `2` |
| Flat scalar properties only | `Error adding TSD.` | `17014` / `2` |
| A string, or two arguments | `Invalid cast from 'Char' to 'Double'.` | — |

Payload shapes swept, all failing: nested SOAP shape (`Email: {ID}`, `List: {ID}`, `SendClassification: {CustomerKey}` or `{ObjectID}`), the documented flat shape (`EmailID`, `ListID`, `SendClassificationID`), dotted keys (`"Email.ID"`), scalar-only payloads, typed Core Library objects (`Email.Init()`, `List.Init()`, `SendClassification.Init()`), and the CLR object returned by `TriggeredSend.Retrieve` with its `CustomerKey` mutated.

#### Working alternative

```javascript
Platform.Load("core", "1.1.5");
var api = new Script.Util.WSProxy();

var result = api.createItem("TriggeredSendDefinition", {
    CustomerKey: "ssjs_tsd_key",
    Name: "Test TSD",
    Description: "created via WSProxy",
    Email: { ID: 769268 },
    List: { ID: 72164 },
    SendClassification: { CustomerKey: "Default Transactional" },
    TriggeredSendType: "Continuous",
    AutoAddSubscribers: true,
    AutoUpdateSubscribers: false,
    BatchInterval: 0,
    IsMultipart: false,
    IsWrapped: true,
    FromName: "Test From Name",
    FromAddress: "me@example.com",
    EmailSubject: "Test"
});
// result.Status === "OK", result.Results[0].StatusMessage === "TriggeredSendDefinition created"

var tsd = TriggeredSend.Init("ssjs_tsd_key");
```

#### Examples

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
var tsd = TriggeredSend.Add(newTSD); // throws "Error adding TSD."
```

See also [Known Bugs](/engine-limitations/known-bugs/#triggeredsend-add-no-working-invocation) and [Differs from Official Docs](/engine-limitations/differs-from-docs/#triggeredsend-add).

---

### TriggeredSend.Retrieve {#retrieve}

Returns an array of triggered send definitions matching the specified filter.

#### Syntax

```javascript
TriggeredSend.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | PascalCase WSProxy-style filter object: `{Property, SimpleOperator, Value}` |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = TriggeredSend.Retrieve({ Property: "CustomerKey", SimpleOperator: "equals", Value: "ssjs_tsd_key" });
```

---

### &lt;TriggeredSendInstance&gt;.Update {#instance-update}

{% include callout.html type="warning" content="<strong>Cannot update an Active definition.</strong> Calling <code>Update</code> while the TSD is Active returns <code>\"Error\"</code> with <code>LastErrorCode</code> 17003 and <code>LastMessage</code> <code>An active TriggeredSendDefinition can not be updated or have it's content refreshed</code>. Call <code>Pause()</code> first, then <code>Start()</code> again afterwards." %}

Updates the previously initialized triggered send definition.

#### Syntax

```javascript
<TriggeredSendInstance>.Update([properties])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | No | Attributes to change on the triggered send definition. Officially required, but omitting it returns `"OK"` at runtime. |

{% include differs-from-docs.html note="The official docs list `properties` as required, but at runtime `Update()` with no argument returns \"OK\"." %}

{% include differs-from-docs.html note="The official docs do not mention any state requirement, but at runtime an Active definition rejects the update with \"Error\" and LastErrorCode 17003." %}

#### Return value

`"OK"` on success, `"Error"` when the definition is Active.

#### Runtime behaviour

| Call | Result |
|---|---|
| `Update({ Description: "..." })` on an Inactive TSD | `"OK"`, `LastMessage` `TriggeredSendDefinition updated` — change persisted |
| `Update({ ... })` on an Active TSD | `"Error"`, code `17003` |
| `Update()` — no arguments | `"OK"` (no change applied) |
| `Update("x")` — non-object | throws `Error Updating TSD.`, `LastMessage` `Invalid cast from 'Char' to 'Double'.` |

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var tsd = TriggeredSend.Init("triggeredSend");

tsd.Pause();                                        // required — cannot update while Active
var status = tsd.Update({ Name: "Updated TSD Name" }); // "OK"
tsd.Start();                                        // reactivate
```

---

### &lt;TriggeredSendInstance&gt;.Start {#instance-start}

Starts (reactivates) a paused triggered send definition. This is the call that actually sets `TriggeredSendStatus` to `Active` — see [Publish](#instance-publish).

#### Syntax

```javascript
<TriggeredSendInstance>.Start()
```

#### Return value

`"OK"` on success, with `LastMessage` `TriggeredSendDefinition updated`.

#### Runtime behaviour

Verified: the definition's `TriggeredSendStatus` becomes `Active` immediately afterwards. Surplus arguments are ignored rather than rejected — `Start("x")` also returns `"OK"`.

{% include differs-from-docs.html note="The official docs do not mention it, but surplus arguments are silently ignored — `Start(\"x\")` also returns \"OK\"." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var ts = TriggeredSend.Init("MY_TRIGGERED_SEND_KEY");
var result = ts.Start(); // "OK" -> status is now Active
```

---

### &lt;TriggeredSendInstance&gt;.Pause {#instance-pause}

Pauses an active triggered send definition. Required before [Update](#instance-update).

#### Syntax

```javascript
<TriggeredSendInstance>.Pause()
```

#### Return value

`"OK"` on success, with `LastMessage` `TriggeredSendDefinition updated`.

#### Runtime behaviour

Verified: the definition's `TriggeredSendStatus` becomes `Inactive` — note the resulting status is `Inactive`, not `Paused`. Surplus arguments are ignored rather than rejected — `Pause("x")` also returns `"OK"`.

{% include differs-from-docs.html note="The official docs describe this as pausing, but the resulting `TriggeredSendStatus` reads back as \"Inactive\", not \"Paused\"; surplus arguments are also silently ignored." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var ts = TriggeredSend.Init("MY_TRIGGERED_SEND_KEY");
var status = ts.Pause(); // "OK" -> status is now Inactive
```

---

### &lt;TriggeredSendInstance&gt;.Publish {#instance-publish}

{% include callout.html type="warning" content="<strong>Publish alone does not activate the definition.</strong> After <code>Publish()</code> returned <code>\"OK\"</code>, the definition's <code>TriggeredSendStatus</code> was still <code>New</code>. The follow-up <code>Start()</code> is what set it to <code>Active</code>. Always call <code>Publish()</code> then <code>Start()</code>." %}

Publishes a triggered send definition. The official documentation describes this as making the definition active and ready to accept sends; at runtime the status change to `Active` comes from [Start](#instance-start).

#### Syntax

```javascript
<TriggeredSendInstance>.Publish()
```

#### Return value

`"OK"` on success, with `LastMessage` `TriggeredSendDefinition updated`.

#### Runtime behaviour

Verified on a `New` definition: `Publish()` returned `"OK"` but a follow-up retrieve still reported `TriggeredSendStatus: "New"`; the subsequent `Start()` moved it to `Active`. Surplus arguments are ignored rather than rejected — `Publish("x")` also returns `"OK"`.

{% include differs-from-docs.html note="The official docs describe Publish as making the definition active, but at runtime the status stayed \"New\" until Start() was called." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var ts = TriggeredSend.Init("MY_TRIGGERED_SEND_KEY");
ts.Publish(); // "OK" - status still New
ts.Start();   // "OK" - status now Active
```

---

### &lt;TriggeredSendInstance&gt;.Send {#instance-send}

{% include callout.html type="info" content="A third argument is accepted at runtime: <code>Send(emailAddress, sendTimeAttributes, subscriberKey)</code>. The definition also does not have to be Active — a send against an <code>Inactive</code> definition still returned <code>\"OK\"</code>." %}

Sends an email using the previously initialized triggered send definition. On failure, inspect `<TriggeredSendInstance>.LastMessage` for error details.

#### Syntax

```javascript
<TriggeredSendInstance>.Send(emailAddress, [sendTimeAttributes], [subscriberKey])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string | Yes | Email address to send to. SubscriberKey is **not** supported here — use the third argument. |
| `sendTimeAttributes` | object | No | Dynamic attributes to include in the send |
| `subscriberKey` | string | No | Undocumented third argument accepted at runtime — subscriber key to associate with the send |

{% include differs-from-docs.html note="The official docs document only two parameters, but the runtime also accepts a third `subscriberKey` argument." %}

{% include differs-from-docs.html note="The official docs imply the definition must be active, but a send against an Inactive definition still returned \"OK\" with LastMessage \"Created TriggeredSend\"." %}

{% include differs-from-docs.html note="The official docs describe failures as errors, but an invalid address returns the string \"Error\" instead of throwing." %}

#### Return value

`"OK"` on success, with `LastMessage` `Created TriggeredSend`.

#### Runtime behaviour

| Call | Result |
|---|---|
| `Send("valid@example.com")` | `"OK"`, `LastMessage` `Created TriggeredSend`, mail delivered |
| `Send(addr, attrs, "subKey")` | `"OK"` — third argument accepted; a fourth is ignored |
| Definition is `Inactive` | still `"OK"` — active status is not enforced by this call |
| `Send("not-an-address")` | returns `"Error"` (does not throw), `LastMessage` `Unable to queue Triggered Send request.  There are no valid subscribers.` |
| `Send()` — no arguments | throws `Usage: Send(EmailAddress [, sendTimeAttributes])` |

`LastRequestID` was `0` after a successful send rather than a request GUID.

#### Examples

**Simple Send**

```javascript
Platform.Load("core", "1.1.5");
var ts = TriggeredSend.Init("triggeredSend");
var status = ts.Send("aruiz@example.com", { FirstName: "Angel", CouponCode: "AA1AF" });
if (status != "OK") { var message = ts.LastMessage; }
```

**Order Confirmation**

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

Platform.Response.ContentType = "application/json";
Write(Stringify({ status: status, order: order.orderNumber }));
```

## Notes

### Triggered Send Definition status

The official guidance is that the Triggered Send Definition must be in **Active** status in Email Studio (Interactions → Triggered Emails). At runtime this was not enforced by `Send` — a send against an `Inactive` definition still returned `"OK"` with `LastMessage` `Created TriggeredSend`. Keep the definition Active anyway; do not rely on the unenforced behaviour.

### Attributes are case-sensitive

The attribute keys in `sendTimeAttributes` must exactly match the AMPscript variable names used in the email template (without the `@` prefix).

---

### &lt;TriggeredSendInstance&gt;.Tracking.Retrieve {#instance-tracking-retrieve}

Returns tracking data for the previously initialized triggered send definition.

#### Syntax

```javascript
<TriggeredSendInstance>.Tracking.Retrieve([filter])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No | Optional WSProxy-style filter object |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var tsd = TriggeredSend.Init("MyTSDKey");
var tsdTracking = tsd.Tracking.Retrieve();
```

---

### &lt;TriggeredSendInstance&gt;.Tracking.Clicks.Retrieve {#instance-tracking-clicks-retrieve}

Returns click tracking information for the previously initialized triggered send definition.

#### Syntax

```javascript
<TriggeredSendInstance>.Tracking.Clicks.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter restricting click results |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var tsd = TriggeredSend.Init("MyTSDKey");
var results = tsd.Tracking.Clicks.Retrieve({ Property: "SendUrlID", SimpleOperator: "equals", Value: 12345 });
```

---

### &lt;TriggeredSendInstance&gt;.Tracking.TotalByInterval.Retrieve {#instance-tracking-totalbyinterval-retrieve}

Returns aggregated tracking data for the previously initialized triggered send. Aggregates by `type` over the date range, grouped by `groupBy`.

#### Syntax

```javascript
<TriggeredSendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | string | Yes | Type of data: `"Send"`, `"Open"`, `"Click"`, `"Bounce"`, `"Unsubscribe"` |
| `startDate` | string | Yes | Start date of the data period (MM-DD-YYYY) |
| `endDate` | string | Yes | End date of the data period (MM-DD-YYYY) |
| `groupBy` | string | Yes | Interval used to aggregate: `"day"` or `"hour"` |

#### Return value

`object[]`

#### Examples

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
