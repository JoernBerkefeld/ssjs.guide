---
layout: page
title: Email
parent: Core Library
parent_url: /core-library/
description: "Core library object for managing classic Email Studio email messages — create, retrieve, update, remove, validate, and check content. Deprecated — operates on the classic (legacy) email type; prefer Content Builder htmlemail assets for new work."
verification: verified
deprecated: true
requires_core_load: true
differs_from_docs: true
test_scripts: complete
type_mapping:
  ssjs: "Email"
  soap: "Email"
  mcdev: "email"
  gui: "E-Mail"
---

{% include callout.html type="warning" content="**Deprecated.** `Email` is a legacy **Classic Content** / **Classic Email Studio** feature. Salesforce retired classic content creation and editing (Classic Content reached end of life on 24 Apr 2023), and **Content Builder** is now the single cross-channel content repository. SOAP-era Email integrations only operate on the old Classic tools — prefer **Content Builder** assets (Asset REST endpoints) for new development." %}

The `Email` Core library object provides programmatic management of classic Email Studio email message assets. Use it to create, retrieve, update, remove, validate, and check content of classic email messages. It does **not** manage Content Builder `htmlemail` assets.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Email.Init(key)`](#init) | EmailInstance | Initialize an Email object by external key |
| [`Email.Add(properties)`](#add) | EmailInstance | Create a new email message |
| [`Email.Retrieve(filter)`](#retrieve) | object[] | Retrieve email messages matching a filter |
| [`<EmailInstance>.Update(properties)`](#instance-update) | string | Update the initialized email message |
| [`<EmailInstance>.Remove()`](#instance-remove) | string | Delete the initialized email message |
| [`<EmailInstance>.Validate()`](#instance-validate) | object | Run validation checks on the email message |
| [`<EmailInstance>.CheckContent()`](#instance-checkcontent) | object | Run content checks on the email message |

---

### Email.Init {#init}

Initializes an Email instance bound to the specified external key. Required before invoking any instance method on the returned object. External keys cannot be set in the UI — set one via SOAP API, or look up the value via `Email.Retrieve()`.

#### Syntax

```javascript
Email.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the email message |

#### Return value

`EmailInstance`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
```

{% include test-script.html bundle="core-library--email" chapter="init" %}

---

### Email.Add {#add}

Creates a new classic email message from the supplied properties and returns an initialized email instance. Unlike most static `Add` methods, this returns an `EmailInstance`, not `"OK"`.

#### Syntax

```javascript
Email.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, optional `CategoryID`, `HTMLBody`, `TextBody`, `Subject`, `EmailType`, ... |

#### Return value

`EmailInstance`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var newMail = {
    CustomerKey: "test_email_key",
    Name: "Test Email",
    HTMLBody: "<b>This is a test email</b>",
    TextBody: "This is a test email",
    Subject: "Test Email Subject",
    EmailType: "HTML",
    CharacterSet: "US-ASCII"
};
var myEmail = Email.Add(newMail);
```

{% include test-script.html bundle="core-library--email" chapter="add" %}

---

### Email.Retrieve {#retrieve}

Returns an array of email messages matching the specified filter.

#### Syntax

```javascript
Email.Retrieve(filter)
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
var results = Email.Retrieve({ Property: "CustomerKey", SimpleOperator: "equals", Value: "myEmail" });
```

{% include test-script.html bundle="core-library--email" chapter="retrieve" %}

---

### &lt;EmailInstance&gt;.Update {#instance-update}

Updates the classic email message with the supplied attributes.

#### Syntax

```javascript
<EmailInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change on the email message |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
var status = myEmail.Update({ Name: "Updated Name", Subject: "Updated Email Subject" });
```

{% include test-script.html bundle="core-library--email" chapter="instance-update" %}

---

### &lt;EmailInstance&gt;.Remove {#instance-remove}

Removes the previously initialized classic email message.

#### Syntax

```javascript
<EmailInstance>.Remove()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
myEmail.Remove();
```

{% include test-script.html bundle="core-library--email" chapter="instance-remove" %}

---

### &lt;EmailInstance&gt;.Validate {#instance-validate}

Runs validation checks on the previously initialized classic email message. Returns a `{Task: {ValidationStatus: string, ValidationMessages: object[]|null}}` object. Initialize with the email's `CustomerKey` string — `Init` with a numeric ID throws before returning a Task.

{% include differs-from-docs.html note="The official docs type `Task.ValidationStatus` as a boolean and `Task.ValidationMessages` as a string, but at runtime `ValidationStatus` is a string (e.g. `\"Pass\"` / `\"Fail\"`) and `ValidationMessages` is `null` on Pass or an array of `{Location, Message, Description}` objects on Fail — compare the status against string values, not `true`/`false`." %}

{% include test-script.html bundle="core-library--email" chapter="validation-status-is-string" label="Show test script — ValidationStatus is a string" %}

#### Syntax

```javascript
<EmailInstance>.Validate()
```

#### Return value

`object` — with `Task.ValidationStatus` (string, e.g. `"Pass"` / `"Fail"`) and `Task.ValidationMessages` (`null` on Pass, or an array of `{Location, Message, Description}` on Fail).

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
var results = myEmail.Validate();
Write(results.Task.ValidationStatus);
Write(results.Task.ValidationMessages);
```

{% include test-script.html bundle="core-library--email" chapter="instance-validate" %}

---

### &lt;EmailInstance&gt;.CheckContent {#instance-checkcontent}

Runs content checks on the previously initialized classic email message. Returns a `{Task: {CheckPassed: boolean, ResultMessage: string}}` object.

#### Syntax

```javascript
<EmailInstance>.CheckContent()
```

#### Return value

`object` — with `Task.CheckPassed` (boolean) and `Task.ResultMessage` (string).

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
var results = myEmail.CheckContent();
Write(results.Task.CheckPassed);
Write(results.Task.ResultMessage);
```

{% include test-script.html bundle="core-library--email" chapter="instance-checkcontent" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/triggeredsend/">TriggeredSend</a></li>
</ul>
</div>
