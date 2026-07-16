---
layout: page
title: Subscriber
parent: Core Library
parent_url: /core-library/
description: Core library object for managing All Subscribers list entries — add, retrieve, upsert, update, remove, unsubscribe, and retrieve attributes and lists.
verification: in-progress
requires_core_load: true
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

{% include method-status.html status="verified" %}

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

---

### Subscriber.Add {#add}

{% include method-status.html status="in-progress" %}

{% include callout.html type="info" content="Verification blocked by a BU-level guardrail: on the QA test BU, programmatic subscriber creation is rejected by the spam filter — a live round-trip returned SOAP `StatusMessage: \"TriggeredSpamFilter\"` (`ErrorCode 12002`). Presence and signature are runtime-proven (`typeof Subscriber.Add === \"function\"`), but the create path cannot complete on this BU. Verify on a BU whose spam-filter policy allows programmatic subscriber writes." %}

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

`"OK"` on success.

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

---

### Subscriber.Retrieve {#retrieve}

{% include method-status.html status="verified" %}

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

---

### &lt;SubscriberInstance&gt;.Upsert {#instance-upsert}

{% include method-status.html status="in-progress" %}

{% include callout.html type="warning" title="Differs from official Salesforce docs" content="The official docs document this as a **static** `Subscriber.Upsert(properties)`, but at runtime `Subscriber.Upsert` is `undefined` — the method lives on the **instance** (`Subscriber.Init(key).Upsert(properties)`). See [Differs from Official Docs](/engine-limitations/differs-from-docs/#subscriber-upsert--statistics--instance-methods-not-static)." %}

{% include callout.html type="info" content="Verification blocked by a BU-level guardrail: on the QA test BU, programmatic subscriber writes are rejected by the spam filter (SOAP `TriggeredSpamFilter`, `ErrorCode 12002`). Presence and signature are runtime-proven (`typeof Subscriber.Init(key).Upsert === \"function\"`), but the upsert path cannot complete on this BU. Verify on a BU whose spam-filter policy allows programmatic subscriber writes." %}

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

---

### &lt;SubscriberInstance&gt;.Statistics {#instance-statistics}

{% include method-status.html status="verified" %}

{% include callout.html type="warning" title="Differs from official Salesforce docs" content="The official docs document this as a **static** `Subscriber.Statistics(subscriberKey)`, but at runtime `Subscriber.Statistics` is `undefined` — the method lives on the **instance** (`Subscriber.Init(key).Statistics()`). See [Differs from Official Docs](/engine-limitations/differs-from-docs/#subscriber-upsert--statistics--instance-methods-not-static)." %}

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

---

### &lt;SubscriberInstance&gt;.Update {#instance-update}

{% include method-status.html status="in-progress" %}

{% include callout.html type="info" content="Verification blocked by a BU-level guardrail: on the QA test BU, programmatic subscriber writes are rejected by the spam filter (SOAP `TriggeredSpamFilter`, `ErrorCode 12002`), so the modify path cannot complete. Presence and signature are runtime-proven (`typeof Subscriber.Init(key).Update === \"function\"`). Verify on a BU whose spam-filter policy allows programmatic subscriber writes." %}

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

---

### &lt;SubscriberInstance&gt;.Remove {#instance-remove}

{% include method-status.html status="in-progress" %}

{% include callout.html type="info" content="Verification blocked by a BU-level guardrail: on the QA test BU, programmatic subscriber writes are rejected by the spam filter (SOAP `TriggeredSpamFilter`, `ErrorCode 12002`), so a throwaway subscriber cannot be created to then delete. Presence and signature are runtime-proven (`typeof Subscriber.Init(key).Remove === \"function\"`). Verify on a BU whose spam-filter policy allows programmatic subscriber writes." %}

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

---

### &lt;SubscriberInstance&gt;.Unsubscribe {#instance-unsubscribe}

{% include method-status.html status="in-progress" %}

{% include callout.html type="info" content="Verification blocked by a BU-level guardrail: on the QA test BU, programmatic subscriber writes are rejected by the spam filter (SOAP `TriggeredSpamFilter`, `ErrorCode 12002`), so a throwaway subscriber cannot be created to then unsubscribe. Presence and signature are runtime-proven (`typeof Subscriber.Init(key).Unsubscribe === \"function\"`). Verify on a BU whose spam-filter policy allows programmatic subscriber writes." %}

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

---

### &lt;SubscriberInstance&gt;.Attributes.Retrieve {#instance-attributes-retrieve}

{% include method-status.html status="verified" %}

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

---

### &lt;SubscriberInstance&gt;.Lists.Retrieve {#instance-lists-retrieve}

{% include method-status.html status="verified" %}

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
