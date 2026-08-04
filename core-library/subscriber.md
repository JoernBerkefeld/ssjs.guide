---
layout: page
title: Subscriber
parent: Core Library
parent_url: /core-library/
description: Core library object for managing All Subscribers list entries — add, retrieve, upsert, update, remove, unsubscribe, and retrieve attributes and lists.
verification: verified
test_scripts: complete
differs_from_docs: true
requires_core_load: true
type_mapping:
  ssjs: "Subscriber"
  soap: "Subscriber"
  mcdev: "-"
  gui: "Subscriber"
---

The `Subscriber` Core library object manages entries in the All Subscribers list. Use it to create, look up, update, or unsubscribe subscribers, and to retrieve their attributes and list memberships.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Subscriber.Init(key)`](#init) | SubscriberInstance | Initialize a Subscriber instance by key |
| [`Subscriber.Add(properties)`](#add) | string | Create a new subscriber |
| [`Subscriber.Retrieve(filter)`](#retrieve) | object[] | Retrieve subscribers matching a filter |
| [`<SubscriberInstance>.Upsert(properties)`](#instance-upsert) | string | Create or update the initialized subscriber |
| [`<SubscriberInstance>.Statistics()`](#instance-statistics) | object | Retrieve statistics for the initialized subscriber |
| [`<SubscriberInstance>.Update(properties)`](#instance-update) | string | Update the initialized subscriber |
| [`<SubscriberInstance>.Remove()`](#instance-remove) | string | Delete the initialized subscriber |
| [`<SubscriberInstance>.Unsubscribe()`](#instance-unsubscribe) | string | Set the subscriber status to Unsubscribed |
| [`<SubscriberInstance>.Attributes.Retrieve()`](#instance-attributes-retrieve) | object[] | Retrieve attributes for the subscriber |
| [`<SubscriberInstance>.Lists.Retrieve()`](#instance-lists-retrieve) | object[] | Retrieve list memberships for the subscriber |

---

### Subscriber.Init {#init}

Initializes a Subscriber instance bound to the specified subscriber key. Required before invoking any instance method on the returned object.

#### Syntax

```javascript
Subscriber.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | Subscriber key |

#### Return value

`SubscriberInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var sub = Subscriber.Init("mySubscriber");
```

{% include test-script.html bundle="core-library--subscriber" chapter="init" %}

---

### Subscriber.Add {#add}

{% include callout.html type="note" content="Runtime-verified against a Parent BU session: `Subscriber.Add({EmailAddress, SubscriberKey})` returns the string `\"OK\"` and the new subscriber is retrievable afterwards. When the EmailAddress is on a spam-blocked domain (for example `@example.com`) the call returns the string `\"Error\"` instead — the underlying WSProxy create reports `ErrorCode 12002` (`TriggeredSpamFilter`). Use a deliverable domain when testing." %}

Creates a new subscriber from the supplied properties.

#### Syntax

```javascript
Subscriber.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `EmailAddress`, `SubscriberKey`, `EmailTypePreference`, `Attributes`, `Lists`, ... |

#### Return value

`"OK"` on success, or `"Error"` when the create is rejected (for example a spam-blocked EmailAddress domain).

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var newSubscriber = {
    EmailAddress: "test.008@example.com",
    SubscriberKey: "20100730001",
    EmailTypePreference: "Text",
    Attributes: { "First Name": "test.008", "Last Name": "test.008" },
    Lists: { Status: "Active", ID: 12345, Action: "Create" }
};
var status = Subscriber.Add(newSubscriber);
```

{% include test-script.html bundle="core-library--subscriber" chapter="add" %}

---

### Subscriber.Retrieve {#retrieve}

Returns an array of subscribers matching the specified filter.

#### Syntax

```javascript
Subscriber.Retrieve(filter)
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
var results = Subscriber.Retrieve({ Property: "SubscriberKey", SimpleOperator: "equals", Value: "MySubscriberKey" });
```

{% include test-script.html bundle="core-library--subscriber" chapter="retrieve" %}

---

### &lt;SubscriberInstance&gt;.Upsert {#instance-upsert}

{% include differs-from-docs.html note="The official docs document this as a **static** `Subscriber.Upsert(properties)`, but at runtime `Subscriber.Upsert` is `undefined` — the method lives on the **instance** (`Subscriber.Init(key).Upsert(properties)`)." %}

{% include callout.html type="note" content="Runtime-verified against a Parent BU session: `Subscriber.Init(key).Upsert({EmailAddress})` returns the string `\"OK\"` and the subscriber is retrievable by its key afterwards." %}

Creates a new subscriber, or updates the initialized one matched by `EmailAddress` / `SubscriberKey`.

#### Syntax

```javascript
<SubscriberInstance>.Upsert(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `EmailAddress`, `SubscriberKey`, `Attributes`, ... |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("test@example.com");
var result = subObj.Upsert({
    EmailAddress: "test@example.com",
    SubscriberKey: "test@example.com",
    Attributes: [ { Name: "FirstName", Value: "Jane" } ]
});
```

{% include test-script.html bundle="core-library--subscriber" chapter="instance-upsert" %}

---

### &lt;SubscriberInstance&gt;.Statistics {#instance-statistics}

{% include differs-from-docs.html note="The official docs document this as a **static** `Subscriber.Statistics(subscriberKey)`, but at runtime `Subscriber.Statistics` is `undefined` — the method lives on the **instance** (`Subscriber.Init(key).Statistics()`)." %}

Retrieves statistical data for the initialized subscriber (sends, opens, clicks, bounces, unsubscribes).

#### Syntax

```javascript
<SubscriberInstance>.Statistics()
```

#### Return value

`object` — a single object with subscriber statistics (not an array).

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("test@example.com");
var stats = subObj.Statistics();
```

{% include test-script.html bundle="core-library--subscriber" chapter="instance-statistics" %}

---

### &lt;SubscriberInstance&gt;.Update {#instance-update}

{% include callout.html type="note" content="Runtime-verified against a Parent BU session: on an existing subscriber both the 0-argument `Update()` and the object-argument `Update({EmailAddress})` form return the string `\"OK\"`." %}

Updates the previously initialized subscriber with the supplied attributes.

#### Syntax

```javascript
<SubscriberInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Subscriber properties to change |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var status = subObj.Update({ EmailTypePreference: "HTML", Attributes: { "First Name": "Test", "Last Name": "User" } });
```

{% include test-script.html bundle="core-library--subscriber" chapter="instance-update" %}

---

### &lt;SubscriberInstance&gt;.Remove {#instance-remove}

{% include callout.html type="note" content="Runtime-verified against a Parent BU session: `Subscriber.Init(key).Remove()` returns the string `\"OK\"` and a follow-up `Subscriber.Retrieve` by that key returns zero rows, confirming deletion." %}

Deletes the previously initialized subscriber.

#### Syntax

```javascript
<SubscriberInstance>.Remove()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var status = subObj.Remove();
```

{% include test-script.html bundle="core-library--subscriber" chapter="instance-remove" %}

---

### &lt;SubscriberInstance&gt;.Unsubscribe {#instance-unsubscribe}

{% include callout.html type="note" content="Runtime-verified against a Parent BU session: `Subscriber.Init(key).Unsubscribe()` returns the string `\"OK\"` and a follow-up `Subscriber.Retrieve` shows the subscriber's `Status` is `\"Unsubscribed\"`." %}

Sets the previously initialized subscriber's status to `"Unsubscribed"`.

#### Syntax

```javascript
<SubscriberInstance>.Unsubscribe()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var status = subObj.Unsubscribe();
```

{% include test-script.html bundle="core-library--subscriber" chapter="instance-unsubscribe" %}

---

### &lt;SubscriberInstance&gt;.Attributes.Retrieve {#instance-attributes-retrieve}

Returns an array of attributes associated with the previously initialized subscriber.

#### Syntax

```javascript
<SubscriberInstance>.Attributes.Retrieve()
```

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var attributes = subObj.Attributes.Retrieve();
```

{% include test-script.html bundle="core-library--subscriber" chapter="instance-attributes-retrieve" %}

---

### &lt;SubscriberInstance&gt;.Lists.Retrieve {#instance-lists-retrieve}

Returns the lists the previously initialized subscriber is a member of.

#### Syntax

```javascript
<SubscriberInstance>.Lists.Retrieve()
```

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var listArray = subObj.Lists.Retrieve();
```

{% include test-script.html bundle="core-library--subscriber" chapter="instance-lists-retrieve" %}

## Notes

{% include callout.html type="note" content="For more advanced subscriber management (batch operations, SOAP object access), use WSProxy with the `Subscriber` SOAP object. See [WSProxy](/wsproxy/)." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/list/">List</a></li>
  <li><a href="/wsproxy/upsert/">WSProxy.upsert (Subscriber)</a></li>
</ul>
</div>
