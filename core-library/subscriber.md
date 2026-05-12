---
layout: page
title: Subscriber
parent: Core Library
parent_url: /core-library/
description: Core library object for managing All Subscribers list entries — add, retrieve, upsert, update, remove, unsubscribe, and retrieve attributes and lists.
---

The `Subscriber` Core library object manages entries in the All Subscribers list. Use it to create, look up, update, or unsubscribe subscribers, and to retrieve their attributes and list memberships.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Subscriber.Init(key)`](#init) | SubscriberInstance | Initialize a Subscriber instance by key |
| [`Subscriber.Add(properties)`](#add) | string | Create a new subscriber |
| [`Subscriber.Retrieve(filter)`](#retrieve) | object[] | Retrieve subscribers matching a filter |
| [`Subscriber.Upsert(properties)`](#upsert) | string | Create or update a subscriber |
| [`Subscriber.Statistics(subscriberKey)`](#statistics) | object | Retrieve statistics for a subscriber |
| [`<SubscriberInstance>.Update(properties)`](#update) | string | Update the initialized subscriber |
| [`<SubscriberInstance>.Remove()`](#remove) | string | Delete the initialized subscriber |
| [`<SubscriberInstance>.Unsubscribe()`](#unsubscribe) | string | Set the subscriber status to Unsubscribed |
| [`<SubscriberInstance>.Attributes.Retrieve()`](#attributesretrieve) | object[] | Retrieve attributes for the subscriber |
| [`<SubscriberInstance>.Lists.Retrieve()`](#listsretrieve) | object[] | Retrieve list memberships for the subscriber |

---

## Subscriber.Init

### Syntax

```javascript
Subscriber.Init(key)
```

Initializes a Subscriber instance bound to the specified subscriber key. Required before invoking any instance method on the returned object.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | Subscriber key |

### Return value

`SubscriberInstance`

### Examples

```javascript
Platform.Load("core", "1");
var sub = Subscriber.Init("mySubscriber");
```

---

## Subscriber.Add

### Syntax

```javascript
Subscriber.Add(properties)
```

Creates a new subscriber from the supplied properties.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `EmailAddress`, `SubscriberKey`, `EmailTypePreference`, `Attributes`, `Lists`, ... |

### Return value

`"OK"` on success.

### Examples

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

---

## Subscriber.Retrieve

### Syntax

```javascript
Subscriber.Retrieve(filter)
```

Returns an array of subscribers matching the specified filter.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | PascalCase WSProxy-style filter object: `{Property, SimpleOperator, Value}` |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = Subscriber.Retrieve({ Property: "SubscriberKey", SimpleOperator: "equals", Value: "MySubscriberKey" });
```

---

## Subscriber.Upsert

### Syntax

```javascript
Subscriber.Upsert(properties)
```

Creates a new subscriber, or updates an existing one matched by `EmailAddress` / `SubscriberKey`.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `EmailAddress`, `SubscriberKey`, `Attributes`, ... |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1");
var sub = {
    EmailAddress: "test@example.com",
    SubscriberKey: "test@example.com",
    Attributes: [ { Name: "FirstName", Value: "Jane" } ]
};
var result = Subscriber.Upsert(sub);
Write(Stringify(result));
```

---

## Subscriber.Statistics

### Syntax

```javascript
Subscriber.Statistics(subscriberKey)
```

Retrieves statistical data for the specified subscriber (sends, opens, clicks, bounces, unsubscribes).

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriberKey` | string | Yes | The subscriber key identifying the subscriber |

### Return value

`object` — a single object with subscriber statistics (not an array).

### Examples

```javascript
Platform.Load("core", "1");
var stats = Subscriber.Statistics("test@example.com");
Write(Stringify(stats));
```

---

## &lt;SubscriberInstance&gt;.Update

### Syntax

```javascript
<SubscriberInstance>.Update(properties)
```

Updates the previously initialized subscriber with the supplied attributes.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Subscriber properties to change |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var status = subObj.Update({ EmailTypePreference: "HTML", Attributes: { "First Name": "Test", "Last Name": "User" } });
```

---

## &lt;SubscriberInstance&gt;.Remove

### Syntax

```javascript
<SubscriberInstance>.Remove()
```

Deletes the previously initialized subscriber.

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var status = subObj.Remove();
```

---

## &lt;SubscriberInstance&gt;.Unsubscribe

### Syntax

```javascript
<SubscriberInstance>.Unsubscribe()
```

Sets the previously initialized subscriber's status to `"Unsubscribed"`.

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var status = subObj.Unsubscribe();
```

---

## &lt;SubscriberInstance&gt;.Attributes.Retrieve

### Syntax

```javascript
<SubscriberInstance>.Attributes.Retrieve()
```

Returns an array of attributes associated with the previously initialized subscriber.

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var attributes = subObj.Attributes.Retrieve();
```

---

## &lt;SubscriberInstance&gt;.Lists.Retrieve

### Syntax

```javascript
<SubscriberInstance>.Lists.Retrieve()
```

Returns the lists the previously initialized subscriber is a member of.

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var subObj = Subscriber.Init("SubKey");
var listArray = subObj.Lists.Retrieve();
```

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
