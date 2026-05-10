---
layout: page
title: List.Subscribers
parent: Core Library
parent_url: /core-library/
description: After List.Init, manage subscribers on that list — add, retrieve, unsubscribe, update, upsert, and optional tracking retrieval.
---

After [`List.Init`](/core-library/list/), use `list.Subscribers` to work with subscribers on that publication list.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`<ListInstance>.Subscribers.Add(properties)`](#subscribers-add) | string | Add a subscriber to the list |
| [`<ListInstance>.Subscribers.Retrieve([filter])`](#subscribers-retrieve) | object[] | Return subscribers (optional filter) |
| [`<ListInstance>.Subscribers.Unsubscribe(emailAddress)`](#subscribers-unsubscribe) | string | Remove subscriber from this list |
| [`<ListInstance>.Subscribers.Update(emailAddress, status)`](#subscribers-update) | string | Change subscriber status on the list |
| [`<ListInstance>.Subscribers.Upsert(emailAddress, attributes)`](#subscribers-upsert) | string | Add or update subscriber attributes |
| [`<ListInstance>.Subscribers.Tracking.Retrieve(filter)`](#subscribers-tracking-retrieve) | object[] | Tracking data for subscribers on the list |

---

## Subscribers.Add

### Syntax

```javascript
<ListInstance>.Subscribers.Add(properties)
```

Adds a subscriber to the initialized list. Properties typically include `EmailAddress` and `SubscriberKey`, plus optional list-specific fields.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Subscriber properties (`EmailAddress`, `SubscriberKey`, …) |

### Return value

`"OK"` on success, or throws on failure.

### Examples

```javascript
Platform.Load("core", "1");
var list = List.Init("MY_LIST_KEY");
var result = list.Subscribers.Add({
    EmailAddress: "test@example.com",
    SubscriberKey: "test@example.com"
});
Write(Stringify(result));
```

---

## Subscribers.Retrieve

### Syntax

```javascript
<ListInstance>.Subscribers.Retrieve([filter])
```

Returns subscribers on the list. Omit `filter` to return all subscribers on the list; pass a WSProxy-style filter to narrow results.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No | Optional filter object |

### Return value

`object[]` — subscriber rows.

### Examples

```javascript
Platform.Load("core", "1");
var list = List.Init("MY_LIST_KEY");
var subscribers = list.Subscribers.Retrieve();
```

---

## Subscribers.Unsubscribe

### Syntax

```javascript
<ListInstance>.Subscribers.Unsubscribe(emailAddress)
```

Removes the subscriber from this list. `emailAddress` may be a string or an object `{ EmailAddress, SubscriberKey }` identifying the subscriber.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string | Yes | Email or identifying object |

### Return value

`"OK"` on success, or throws on failure.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("myList");
var status = myList.Subscribers.Unsubscribe("aruiz@example.com");
```

---

## Subscribers.Update

### Syntax

```javascript
<ListInstance>.Subscribers.Update(emailAddress, status)
```

Updates the subscriber’s status for this list.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string | Yes | Email or `{ EmailAddress, SubscriberKey }` |
| `status` | string | Yes | New status on the list (e.g. `"Active"`) |

### Return value

`"OK"` on success, or throws on failure.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("myList");
var status = myList.Subscribers.Update("aruiz@example.com", "Active");
```

---

## Subscribers.Upsert

### Syntax

```javascript
<ListInstance>.Subscribers.Upsert(emailAddress, attributes)
```

Adds the subscriber if they are not on the list; otherwise updates the supplied attributes. If `attributes.Status` is set, the list status is updated accordingly.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string | Yes | Email or `{ EmailAddress, SubscriberKey }` |
| `attributes` | object | Yes | Attributes to set or merge |

### Return value

`"OK"` on success, or throws on failure.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("myList");
var status = myList.Subscribers.Upsert("aruiz@example.com", { ZipCode: "46202" });
```

---

## Subscribers.Tracking.Retrieve

### Syntax

```javascript
<ListInstance>.Subscribers.Tracking.Retrieve(filter)
```

Returns tracking rows for subscribers on this list that match the filter.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter (e.g. on `SubscriberKey`) |

### Return value

`object[]` — tracking records.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("MyList");
var results = myList.Subscribers.Tracking.Retrieve({
    Property: "SubscriberKey",
    SimpleOperator: "equals",
    Value: "MyKey"
});
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/list/">List</a></li>
  <li><a href="/core-library/subscriber/">Subscriber</a></li>
</ul>
</div>
