---
layout: page
title: Send.Definition
parent: Core Library
parent_url: /core-library/
description: Core library namespace Send.Definition — create, configure, query, update, remove, and execute user-initiated send definitions.
verification: verified
deprecated: true
differs_from_docs: true
requires_core_load: true
type_mapping:
  ssjs: "Send.Definition"
  soap: "SendDefinition"
  mcdev: "-"
  gui: "Send Definition"
---

{% include callout.html type="warning" content="**Deprecated.** `SendDefinition` is a legacy **Classic Content** / **Classic Email Studio** feature. Salesforce retired classic content creation and editing (Classic Content reached end of life on 24 Apr 2023), and **Content Builder** is now the single cross-channel content repository. SOAP-era SendDefinition integrations only operate on the old Classic tools — prefer **Content Builder** assets (Asset REST endpoints) for new development." %}

`Send.Definition` is the Core library namespace for **Email Studio send definitions** (reusable send configurations). Call static methods without an instance, or use `Send.Definition.Init` when you need instance methods (`Update`, `Remove`, `Send`).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

{% include callout.html type="warning" content="Several methods on this namespace behave differently from the official documentation. <code>AddWithDE</code> only works when the documented fifth argument is <b>omitted</b>; <code>AddWithFilterDefinition</code> always throws even when it succeeds; <code>Update</code> only accepts scalar properties; and <code>Send</code> returns error text instead of throwing. See each method for details." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Send.Definition.Init(key)`](#init) | SendDefinitionInstance | Bind to a send definition by external key |
| [`Send.Definition.Add(esdParams, sendClassificationKey, emailKey, listIds)`](#add) | object | Create send definition (lists) |
| [`Send.Definition.AddWithDE(...)`](#addwithde) | object | Create send definition targeting a sendable DE |
| [`Send.Definition.AddWithFilterDefinition(...)`](#addwithfilterdefinition) | never | Create send definition using a filter definition |
| [`Send.Definition.Retrieve([filter])`](#retrieve) | object[] | Query send definitions |
| [`<SendDefinitionInstance>.Update(properties)`](#instance-update) | string | Update the initialized send definition |
| [`<SendDefinitionInstance>.Remove()`](#instance-remove) | string | Delete the send definition |
| [`<SendDefinitionInstance>.Send()`](#instance-send) | string | Execute the send |
| [`<SendDefinitionInstance>.TestSend([emailAddress])`](#instance-testsend) | string | Undocumented — no working invocation found |

---

### Send.Definition.Init {#init}

{% include method-status.html status="verified" %}

Initializes a send definition instance from its external key. Required before calling instance methods (`Update`, `Remove`, `Send`).

#### Syntax

```javascript
Send.Definition.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the send definition |

#### Return value

`SendDefinitionInstance`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esd = Send.Definition.Init("myESD");
```

---

### Send.Definition.Add {#add}

{% include method-status.html status="verified" differs=true %}

{% include callout.html type="warning" content="Returns a CLR object, not the documented string <code>\"OK\"</code>: <code>typeof</code> is <code>\"clr\"</code> and the value stringifies to <code>\"ExactTarget.Integration.WSDL.EmailSendDefinition\"</code>. On failure it throws a plain <b>string</b> (<code>\"Error adding EmailSendDefinition.\"</code>), so <code>ex.message</code> is <code>undefined</code> — catch it as a string. <code>listIds</code> must contain real list IDs; an unknown ID makes the call throw and nothing is created." %}

Creates a send definition. `esdParams` includes `CustomerKey`, `Name`, and `EmailSubject`.

#### Syntax

```javascript
Send.Definition.Add(esdParams, sendClassificationKey, emailKey, listIds)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `esdParams` | object | Yes | `CustomerKey`, `Name`, `EmailSubject` for the new send definition |
| `sendClassificationKey` | string | Yes | Customer key of the send classification |
| `emailKey` | string | Yes | Customer key of the email |
| `listIds` | array | Yes | Target list IDs — must exist |

#### Return value

A CLR `EmailSendDefinition` object. Throws the string `"Error adding EmailSendDefinition."` on failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esdParams = {
    CustomerKey: "example_esd",
    Name: "Example Send Definition",
    EmailSubject: "Sent By Example Send Definition"
};
var esd = Send.Definition.Add(esdParams, "example_sc_key", "example_email_key", [12345]);
```

---

### Send.Definition.AddWithDE {#addwithde}

{% include method-status.html status="verified" differs=true %}

{% include callout.html type="warning" content="The documented fifth argument <code>publicationListKey</code> must be <b>omitted</b>. Calling this method with four arguments succeeds; supplying any fifth argument throws <code>\"Error adding EmailSendDefinition.\"</code> and creates nothing — confirmed with a publication list name, a numeric list ID, and a Data Extension key. Like <code>Add</code>, a successful call returns a CLR object rather than <code>\"OK\"</code>." %}

Creates a send definition that sends to a **sendable Data Extension**.

#### Syntax

```javascript
Send.Definition.AddWithDE(esdParams, sendClassificationKey, emailKey, sendableDataExtensionKey)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `esdParams` | object | Yes | `CustomerKey`, `Name`, `EmailSubject` |
| `sendClassificationKey` | string | Yes | Send classification customer key |
| `emailKey` | string | Yes | Email customer key |
| `sendableDataExtensionKey` | string | Yes | Sendable DE customer key |
| `publicationListKey` | string | No | Documented as required, but passing it makes the call fail — omit it |

#### Return value

A CLR `EmailSendDefinition` object. Throws the string `"Error adding EmailSendDefinition."` on failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esdParams = {
    CustomerKey: "ssjs_de_esd_1c",
    Name: "SSJS DE Test ESD3",
    EmailSubject: "Third send By Test DE Send Definition"
};
// omit the documented publicationListKey - passing it makes the call throw
var esd = Send.Definition.AddWithDE(esdParams, "scKey", "test_email", "deKey");
```

---

### Send.Definition.AddWithFilterDefinition {#addwithfilterdefinition}

{% include method-status.html status="blocked" differs=true %}

{% include callout.html type="warning" content="This method <b>always throws</b> <code>\"Error adding EmailSendDefinition.\"</code> — but the send definition is created anyway and is immediately retrievable via <code>Send.Definition.Retrieve</code>. Because the throw happens whether or not the create succeeded, the only reliable success check is to retrieve the new key after catching. No invocation shape was found that returns normally: the list ID was tried as a number and as a single-element array, plus a publication list name, a Data Extension key, and omitting the fifth argument entirely." %}

Creates a send definition whose audience comes from a **filter definition**.

#### Syntax

```javascript
Send.Definition.AddWithFilterDefinition(esdParams, sendClassificationKey, emailKey, filterDefinitionKey, listId)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `esdParams` | object | Yes | `CustomerKey`, `Name`, `EmailSubject` |
| `sendClassificationKey` | string | Yes | Send classification customer key |
| `emailKey` | string | Yes | Email customer key |
| `filterDefinitionKey` | string | Yes | Filter definition customer key |
| `listId` | number | No | List ID the filter applies to |

#### Return value

Never returns normally — always throws the string `"Error adding EmailSendDefinition."`, including when the send definition was created successfully.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esdParams = {
    CustomerKey: "filterDef_esd",
    Name: "Example Filtered Send Definition",
    EmailSubject: "Sent By Filtered Send Definition"
};
try {
    Send.Definition.AddWithFilterDefinition(esdParams, "scKey", "test_email", "fdKey", 144);
} catch (ex) {
    // always throws "Error adding EmailSendDefinition." - check whether it was created anyway
}
var created = Send.Definition.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "filterDef_esd"
}).length > 0;
```

---

### Send.Definition.Retrieve {#retrieve}

{% include method-status.html status="verified" %}

Returns send definitions. Omit `filter` to return all definitions visible in context.

#### Syntax

```javascript
Send.Definition.Retrieve([filter])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No | Optional WSProxy-style filter |

#### Return value

`object[]` — an empty array when nothing matches. It does not throw and does not return `null`.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esd = Send.Definition.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "ssjs_test_esd"
});
```

---

### &lt;SendDefinitionInstance&gt;.Update {#instance-update}

{% include method-status.html status="verified" differs=true %}

{% include callout.html type="warning" content="Only <b>scalar</b> properties can be updated. <code>Update({ Description: … })</code> and <code>Update({ TestEmailAddr: … })</code> return <code>\"OK\"</code> and persist. Nested properties throw <code>\"Error Updating ESD.\"</code> — observed for <code>Email</code> and <code>SendDefinitionList</code>. The equivalent WSProxy <code>updateItem</code> calls for those same nested properties return <code>Status: \"OK\"</code> with <code>\"EmailSendDefinition updated\"</code>, so the limit is specific to this method." %}

Updates properties on the initialized send definition.

#### Syntax

```javascript
<SendDefinitionInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Scalar properties to change |

#### Return value

`"OK"` when scalar properties are updated. Throws `"Error Updating ESD."` when the payload contains nested properties such as `Email` or `SendDefinitionList`.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var sendDef = Send.Definition.Init("MY_SEND_DEF_KEY");
var result = sendDef.Update({ Description: "Updated description" });

// nested properties throw - use WSProxy for those
// sendDef.Update({ Email: { ID: 12345 } });
```

---

### &lt;SendDefinitionInstance&gt;.Remove {#instance-remove}

{% include method-status.html status="verified" %}

Deletes the send definition bound to this instance. Returns `"OK"` and the record is gone afterwards — a follow-up `Send.Definition.Retrieve` for the same key returns an empty array. Confirmed against definitions created through `Add`, through `AddWithDE`, and through a WSProxy `createItem`.

#### Syntax

```javascript
<SendDefinitionInstance>.Remove()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esd = Send.Definition.Init("myESD");
var status = esd.Remove();
```

---

### &lt;SendDefinitionInstance&gt;.Send {#instance-send}

{% include method-status.html status="verified" differs=true %}

{% include callout.html type="warning" content="This method returns an error <b>string</b> instead of throwing when the send is rejected, so a <code>try/catch</code> alone will treat a rejected send as success. Always compare the return value to <code>\"OK\"</code>. Observed returns include <code>\"An EmailSendDefinition must have an audience to be sent.\"</code> and <code>\"The following email validation errors need addressed before the email can be sent.\"</code> followed by the offending tokens." %}

Sends using the lists or audience configured on this send definition. A WSProxy `performItem("EmailSendDefinition", …, "start")` control returned the identical validation text, confirming the Core method dispatches the same operation.

#### Syntax

```javascript
<SendDefinitionInstance>.Send()
```

#### Return value

`"OK"` when the send is accepted; otherwise a descriptive error string.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esd = Send.Definition.Init("myESD");
var status = esd.Send();
if (status !== "OK") {
    // Send() returns the error text instead of throwing
    Write("send rejected: " + status);
}
```

---

### &lt;SendDefinitionInstance&gt;.TestSend {#instance-testsend}

{% include method-status.html status="blocked" differs=true %}

{% include callout.html type="warning" content="Undocumented method that exists at runtime but for which no working invocation was found. With no arguments it returns <code>\"An EmailSendDefinition cannot be used in a test send to a list or group without a test email address.\"</code> even after a test address was stored on the record — set both via this object's own <code>Update({ TestEmailAddr: … })</code> (returned <code>\"OK\"</code>) and via a WSProxy <code>updateItem</code> control (returned <code>Status: \"OK\"</code>). Passing an address as an argument clears that message but then returns the same email validation error string as <code>Send()</code>." %}

Sends a test version of the initialized send definition.

#### Syntax

```javascript
<SendDefinitionInstance>.TestSend([emailAddress])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string | No | Address to receive the test send |

#### Return value

Expected to return `"OK"`. In testing it only ever returned error text.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esd = Send.Definition.Init("myESD");
var status = esd.TestSend("test@example.com");
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/send/">Send</a></li>
  <li><a href="/core-library/sendclassification/">SendClassification</a></li>
  <li><a href="/core-library/email/">Email</a></li>
</ul>
</div>
