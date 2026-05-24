---
layout: page
title: Send.Definition
parent: Core Library
parent_url: /core-library/
description: Core library namespace Send.Definition — create, configure, query, update, remove, and execute user-initiated send definitions.
---

`Send.Definition` is the Core library namespace for **Email Studio send definitions** (reusable send configurations). Call static methods without an instance, or use `Send.Definition.Init` when you need instance methods (`Update`, `Remove`, `Send`).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Send.Definition.Init(key)`](#init) | SendDefinitionInstance | Bind to a send definition by external key |
| [`Send.Definition.Add(esdParams, sendClassificationKey, emailKey, listIds)`](#add) | string | Create send definition (lists) |
| [`Send.Definition.AddWithDE(...)`](#addwithde) | string | Create send definition targeting a sendable DE |
| [`Send.Definition.AddWithFilterDefinition(...)`](#addwithfilterdefinition) | string | Create send definition using a filter definition |
| [`Send.Definition.Retrieve([filter])`](#retrieve) | object[] | Query send definitions |
| [`<SendDefinitionInstance>.Update(properties)`](#instance-update) | string | Update the initialized send definition |
| [`<SendDefinitionInstance>.Remove()`](#instance-remove) | string | Delete the send definition |
| [`<SendDefinitionInstance>.Send()`](#instance-send) | string | Execute the send |

---

### Send.Definition.Init {#init}

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
| `listIds` | array | Yes | Target list IDs |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1");
var esdParams = {
    CustomerKey: "example_esd",
    Name: "Example Send Definition",
    EmailSubject: "Sent By Example Send Definition"
};
Send.Definition.Add(esdParams, "example_sc_key", "example_email_key", [12345, 12346]);
```

---

### Send.Definition.AddWithDE {#addwithde}

Creates a send definition that sends to a **sendable Data Extension**.

#### Syntax

```javascript
Send.Definition.AddWithDE(esdParams, sendClassificationKey, emailKey, sendableDataExtensionKey, publicationListKey)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `esdParams` | object | Yes | `CustomerKey`, `Name`, `EmailSubject` |
| `sendClassificationKey` | string | Yes | Send classification customer key |
| `emailKey` | string | Yes | Email customer key |
| `sendableDataExtensionKey` | string | Yes | Sendable DE customer key |
| `publicationListKey` | string | Yes | Publication list customer key |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esdParams = {
    CustomerKey: "ssjs_de_esd_1c",
    Name: "SSJS DE Test ESD3",
    EmailSubject: "Third send By Test DE Send Definition"
};
var status = Send.Definition.AddWithDE(esdParams, "scKey", "test_email", "deKey", "myPubList");
```

---

### Send.Definition.AddWithFilterDefinition {#addwithfilterdefinition}

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
| `listId` | number | Yes | List ID the filter applies to |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esdParams = {
    CustomerKey: "filterDef_esd",
    Name: "Example Filtered Send Definition",
    EmailSubject: "Sent By Filtered Send Definition"
};
var status = Send.Definition.AddWithFilterDefinition(esdParams, "scKey", "test_email", "fdKey", 144);
```

---

### Send.Definition.Retrieve {#retrieve}

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

`object[]`

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

Updates properties on the initialized send definition.

#### Syntax

```javascript
<SendDefinitionInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Properties to change |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var sendDef = Send.Definition.Init("MY_SEND_DEF_KEY");
var result = sendDef.Update({ Name: "Updated Send Definition Name" });
```

---

### &lt;SendDefinitionInstance&gt;.Remove {#instance-remove}

Deletes the send definition bound to this instance.

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

Sends using the lists or audience configured on this send definition.

#### Syntax

```javascript
<SendDefinitionInstance>.Send()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var esd = Send.Definition.Init("myESD");
var status = esd.Send();
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
