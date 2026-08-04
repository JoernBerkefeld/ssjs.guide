---
layout: page
title: List.Subscribers
parent: Core Library
parent_url: /core-library/
description: After List.Init, manage subscribers on that list — add, retrieve, unsubscribe, update, upsert, and optional tracking retrieval.
verification: verified
differs_from_docs: true
test_scripts: complete
requires_core_load: true
---

After [`List.Init`](/core-library/list/), use `list.Subscribers` to work with subscribers on that publication list.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`<ListInstance>.Subscribers.Add(properties)`](#instance-subscribers-add) | string | Add a subscriber to the list |
| [`<ListInstance>.Subscribers.Retrieve([filter])`](#instance-subscribers-retrieve) | object[] | Return subscribers (optional filter) |
| [`<ListInstance>.Subscribers.Unsubscribe(emailAddress)`](#instance-subscribers-unsubscribe) | string | Set list status to Unsubscribed |
| [`<ListInstance>.Subscribers.Update(emailAddress, status)`](#instance-subscribers-update) | string | Change subscriber status on the list |
| [`<ListInstance>.Subscribers.Upsert(emailAddress, attributes)`](#instance-subscribers-upsert) | string | Add or update subscriber attributes |
| [`<ListInstance>.Subscribers.Tracking.Retrieve(filter)`](#instance-subscribers-tracking-retrieve) | object[] | Tracking data for subscribers on the list |

---

### &lt;ListInstance&gt;.Subscribers.Add {#instance-subscribers-add}

Adds a subscriber to the initialized list. Properties typically include `EmailAddress` and `SubscriberKey`, plus optional list-specific fields.

#### Syntax

```javascript
<ListInstance>.Subscribers.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Subscriber properties (`EmailAddress`, `SubscriberKey`, …) |

#### Return value

`"OK"` on success. Invalid or incomplete properties return the plain string `"Error"` (does not throw).

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: failed Add returns the plain string `\"Error\"` rather than throwing. Official docs claim Add returns `\"OK\"` or throws — callers must check the return value; `try`/`catch` alone is not enough." %}

#### Examples

```javascript
Platform.Load("core", "1");
var list = List.Init("MY_LIST_KEY");
var result = list.Subscribers.Add({
    EmailAddress: "test@example.com",
    SubscriberKey: "test@example.com"
});
Write(Stringify(result));
```

{% include test-script.html bundle="core-library--list-subscribers" chapter="instance-subscribers-add" %}

---

### &lt;ListInstance&gt;.Subscribers.Retrieve {#instance-subscribers-retrieve}

Returns subscribers on the list. Omit `filter` to return all subscribers on the list; pass a WSProxy-style filter to narrow results. Filter on `SubscriberKey` — a filter on `EmailAddress` returns an empty array even when the row exists.

#### Syntax

```javascript
<ListInstance>.Subscribers.Retrieve([filter])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No | Optional filter object (`SubscriberKey` works; `EmailAddress` does not) |

#### Return value

`object[]` — subscriber rows.

{% include callout.html type="bug" content="A WSProxy-style filter on `EmailAddress` returns an empty array even when the subscriber is on the list. Filter on `SubscriberKey` instead." %}

#### Examples

```javascript
Platform.Load("core", "1");
var list = List.Init("MY_LIST_KEY");
var subscribers = list.Subscribers.Retrieve();
```

{% include test-script.html bundle="core-library--list-subscribers" chapter="instance-subscribers-retrieve" %}

---

### &lt;ListInstance&gt;.Subscribers.Unsubscribe {#instance-subscribers-unsubscribe}

Sets the subscriber's status on this list to `Unsubscribed`. The membership row remains on the list (it is not deleted). `emailAddress` may be a string or an object `{ EmailAddress, SubscriberKey }` identifying the subscriber.

#### Syntax

```javascript
<ListInstance>.Subscribers.Unsubscribe(emailAddress)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string \| object | Yes | Email or identifying object |

#### Return value

`"OK"` on success. A missing subscriber returns the plain string `"Error"` (does not throw).

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: a missing subscriber returns the plain string `\"Error\"` rather than throwing. Official docs claim Unsubscribe returns `\"OK\"` or throws — callers must check the return value." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("myList");
var status = myList.Subscribers.Unsubscribe("aruiz@example.com");
```

{% include test-script.html bundle="core-library--list-subscribers" chapter="instance-subscribers-unsubscribe" %}

---

### &lt;ListInstance&gt;.Subscribers.Update {#instance-subscribers-update}

Updates the subscriber's status for this list. A bare email string works when `EmailAddress` equals `SubscriberKey`; otherwise pass `{ EmailAddress, SubscriberKey }`.

#### Syntax

```javascript
<ListInstance>.Subscribers.Update(emailAddress, status)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string \| object | Yes | Email or `{ EmailAddress, SubscriberKey }` |
| `status` | string | Yes | New status on the list (e.g. `"Active"`, `"Unsubscribed"`) |

#### Return value

`"OK"` on success. A missing subscriber or unresolved string identity returns the plain string `"Error"` (does not throw).

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: failed Update returns the plain string `\"Error\"` rather than throwing. Official docs claim Update returns `\"OK\"` or throws." %}

{% include callout.html type="bug" content="When `SubscriberKey` differs from `EmailAddress`, `Update(emailString, status)` returns `\"Error\"` and leaves Status unchanged. Pass `{ EmailAddress, SubscriberKey }` instead." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("myList");
var status = myList.Subscribers.Update("aruiz@example.com", "Active");
```

{% include test-script.html bundle="core-library--list-subscribers" chapter="instance-subscribers-update" %}

---

### &lt;ListInstance&gt;.Subscribers.Upsert {#instance-subscribers-upsert}

Adds the subscriber if they are not on the list; otherwise updates the supplied attributes. If `attributes.Status` is set, the list status is updated accordingly.

#### Syntax

```javascript
<ListInstance>.Subscribers.Upsert(emailAddress, attributes)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string \| object | Yes | Email or `{ EmailAddress, SubscriberKey }` |
| `attributes` | object | Yes | Attributes to set or merge |

#### Return value

`"OK"` on success. Invalid calls return the plain string `"Error"` (does not throw).

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: failed Upsert returns the plain string `\"Error\"` rather than throwing. Official docs claim Upsert returns `\"OK\"` or throws." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("myList");
var status = myList.Subscribers.Upsert("aruiz@example.com", { ZipCode: "46202" });
```

{% include test-script.html bundle="core-library--list-subscribers" chapter="instance-subscribers-upsert" %}

---

### &lt;ListInstance&gt;.Subscribers.Tracking.Retrieve {#instance-subscribers-tracking-retrieve}

Returns tracking rows for subscribers on this list that match the filter.

#### Syntax

```javascript
<ListInstance>.Subscribers.Tracking.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter (e.g. on `SubscriberKey`) |

#### Return value

`object[]` — tracking records.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("MyList");
var results = myList.Subscribers.Tracking.Retrieve({
    Property: "SubscriberKey",
    SimpleOperator: "equals",
    Value: "MyKey"
});
```

{% include test-script.html bundle="core-library--list-subscribers" chapter="instance-subscribers-tracking-retrieve" %}

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/list/">List</a></li>
  <li><a href="/core-library/subscriber/">Subscriber</a></li>
</ul>
</div>
