---
layout: page
title: Email
parent: Core Library
parent_url: /core-library/
description: Core library object for managing Email Studio email messages — create, retrieve, update, remove, validate, and check content.
---

The `Email` Core library object provides programmatic management of email message assets in Email Studio. Use it to create, retrieve, update, remove, validate, and check content of email messages.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Email.Init(key)`](#init) | EmailInstance | Initialize an Email object by external key |
| [`Email.Add(properties)`](#add) | EmailInstance | Create a new email message |
| [`Email.Retrieve(filter)`](#retrieve) | object[] | Retrieve email messages matching a filter |
| [`<EmailInstance>.Update(properties)`](#update) | string | Update the initialized email message |
| [`<EmailInstance>.Remove()`](#remove) | string | Delete the initialized email message |
| [`<EmailInstance>.Validate()`](#validate) | object | Run validation checks on the email message |
| [`<EmailInstance>.CheckContent()`](#checkcontent) | object | Run content checks on the email message |

---

## Email.Init

### Syntax

```javascript
Email.Init(key)
```

Initializes an Email instance bound to the specified external key. Required before invoking any instance method on the returned object. External keys cannot be set in the UI — set one via SOAP API, or look up the value via `Email.Retrieve()`.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the email message |

### Return value

`EmailInstance`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
```

---

## Email.Add

### Syntax

```javascript
Email.Add(properties)
```

Creates a new email message from the supplied properties and returns an initialized email instance. Unlike most static `Add` methods, this returns an `EmailInstance`, not `"OK"`.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, optional `CategoryID`, `HTMLBody`, `TextBody`, `Subject`, `EmailType`, ... |

### Return value

`EmailInstance`

### Examples

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

---

## Email.Retrieve

### Syntax

```javascript
Email.Retrieve(filter)
```

Returns an array of email messages matching the specified filter.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | PascalCase WSProxy-style filter object: `{Property, SimpleOperator, Value}` |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = Email.Retrieve({ Property: "CustomerKey", SimpleOperator: "equals", Value: "myEmail" });
```

---

## &lt;EmailInstance&gt;.Update

### Syntax

```javascript
<EmailInstance>.Update(properties)
```

Updates the email message with the supplied attributes.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change on the email message |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
var status = myEmail.Update({ Name: "Updated Name", Subject: "Updated Email Subject" });
```

---

## &lt;EmailInstance&gt;.Remove

### Syntax

```javascript
<EmailInstance>.Remove()
```

Removes the previously initialized email message.

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
myEmail.Remove();
```

---

## &lt;EmailInstance&gt;.Validate

### Syntax

```javascript
<EmailInstance>.Validate()
```

Runs validation checks on the previously initialized email message. Returns a `{Task: {ValidationStatus: boolean, ValidationMessages: string}}` object.

### Return value

`object` — with `Task.ValidationStatus` (boolean) and `Task.ValidationMessages` (string).

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
var results = myEmail.Validate();
Write(results.Task.ValidationStatus);
Write(results.Task.ValidationMessages);
```

---

## &lt;EmailInstance&gt;.CheckContent

### Syntax

```javascript
<EmailInstance>.CheckContent()
```

Runs content checks on the previously initialized email message. Returns a `{Task: {CheckPassed: boolean, ResultMessage: string}}` object.

### Return value

`object` — with `Task.CheckPassed` (boolean) and `Task.ResultMessage` (string).

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myEmail = Email.Init("myEmail");
var results = myEmail.CheckContent();
Write(results.Task.CheckPassed);
Write(results.Task.ResultMessage);
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/triggeredsend/">TriggeredSend</a></li>
  <li><a href="/platform-functions/triggeredsend/">Platform.Function.TriggeredSend</a></li>
</ul>
</div>
