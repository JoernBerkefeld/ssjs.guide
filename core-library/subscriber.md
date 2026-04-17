---
layout: page
title: Subscriber
parent: Core Library
parent_url: /core-library/
description: Core library object for managing All Subscribers list entries — retrieve subscriber attributes, update status, add or remove from lists.
---

The `Subscriber` Core library object manages entries in the All Subscribers list. Use it to look up subscriber details, update attributes, or manage list membership.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Subscriber.Init(subscriberKey)`](#init) | Subscriber | Initialize a subscriber instance |
| [`sub.Attributes.Add(name, value)`](#attributesadd) | void | Add/update subscriber attribute |
| [`sub.Attributes.Remove(name)`](#attributesremove) | void | Remove subscriber attribute |
| [`sub.Lists.Add(listKey)`](#listsadd) | void | Add subscriber to a list |
| [`sub.Lists.Remove(listKey)`](#listsremove) | void | Remove subscriber from a list |

---

## Subscriber.Init

```javascript
var sub = Subscriber.Init(subscriberKey);
```

Initializes a Subscriber object for the given subscriber key.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriberKey` | string | Yes | Subscriber key (usually email or custom key) |

---

## Attributes.Add

```javascript
sub.Attributes.Add(attributeName, attributeValue)
```

Adds or updates a profile attribute on the subscriber.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var sub = Subscriber.Init("jane@example.com");
sub.Attributes.Add("FirstName", "Jane");
sub.Attributes.Add("LastName", "Doe");
sub.Attributes.Add("PreferredLanguage", "en");
```

---

## Attributes.Remove

```javascript
sub.Attributes.Remove(attributeName)
```

Removes a profile attribute from the subscriber.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var sub = Subscriber.Init("jane@example.com");
sub.Attributes.Remove("OutdatedField");
```

---

## Lists.Add

```javascript
sub.Lists.Add(listExternalKey)
```

Subscribes the subscriber to a publication list.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var sub = Subscriber.Init("jane@example.com");
sub.Lists.Add("Newsletter_PublicList");
```

---

## Lists.Remove

```javascript
sub.Lists.Remove(listExternalKey)
```

Unsubscribes the subscriber from a publication list.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var sub = Subscriber.Init("jane@example.com");
sub.Lists.Remove("Newsletter_PublicList");
```

---

## Complete Onboarding Pattern

```javascript
Platform.Load("core", "1.1.5");

var email = Platform.Request.GetFormField("email");
var firstName = Platform.Request.GetFormField("firstName");
var lastName = Platform.Request.GetFormField("lastName");

try {
    var sub = Subscriber.Init(email);
    sub.Attributes.Add("FirstName", firstName);
    sub.Attributes.Add("LastName", lastName);
    sub.Attributes.Add("SubscribedAt", Platform.Function.Now());
    sub.Lists.Add("MainNewsletter");

    Platform.Response.SetContentType("application/json");
    Write(Stringify({ status: "subscribed", email: email }));
} catch(e) {
    Write(Stringify({ status: 500, statusMessage: "Internal Server Error", error: "Subscription failed", message: e.message }));
}
```

## Notes

{% include callout.html type="note" content="For more advanced subscriber management (upsert to All Subscribers, manage multiple lists, set status), use WSProxy with the `Subscriber` SOAP object. See [WSProxy](/wsproxy/)." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/list/">List</a></li>
  <li><a href="/wsproxy/upsert/">WSProxy.upsert (Subscriber)</a></li>
</ul>
</div>
