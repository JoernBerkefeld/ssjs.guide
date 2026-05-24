---
layout: page
title: List
parent: Core Library
parent_url: /core-library/
description: Core library object for publication lists — create and query lists, remove a list instance, and work with list subscribers.
---

The `List` Core library object provides an object-oriented interface for SFMC publication lists: static methods create or look up lists, an initialized instance can delete itself, and the [`Subscribers`](/core-library/list-subscribers/) namespace manages membership on that instance.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`List.Init(key)`](#init) | ListInstance | Bind to a list by external key |
| [`List.Add(properties)`](#add) | ListInstance | Create a new list from properties |
| [`List.Retrieve(filter)`](#retrieve) | object[] | Query lists with a filter |
| [`<ListInstance>.Remove()`](#instance-remove) | string | Delete the list represented by the instance |
| [`<ListInstance>.Subscribers.*`](/core-library/list-subscribers/) | — | Add, retrieve, unsubscribe, update, upsert subscribers (see dedicated page) |

---

### List.Init {#init}

Initializes a list instance using the list external key. Required before calling instance methods such as `Remove()` or `Subscribers.*`.

#### Syntax

```javascript
List.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the publication list |

#### Return value

`ListInstance` — object bound to that list.

#### Examples

```javascript
Platform.Load("core", "1");
var myList = List.Init("myList");
```

---

### List.Add {#add}

Creates a new list from the supplied JSON properties (`CustomerKey`, `Name`, `Description`, …). Unlike many Core `Add` methods, this returns an initialized `ListInstance`, not `"OK"`.

#### Syntax

```javascript
List.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Object describing the new list |

#### Return value

`ListInstance` — handle for the newly created list.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myNewList = List.Add({
    CustomerKey: "libList",
    Name: "testLib",
    Description: "desc"
});
```

---

### List.Retrieve {#retrieve}

Returns array of list objects matching the WSProxy-style filter.

#### Syntax

```javascript
List.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | `{ Property, SimpleOperator, Value }` (or compatible compound filter) |

#### Return value

`object[]` — matching lists.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var lists = List.Retrieve({
    Property: "ListName",
    SimpleOperator: "equals",
    Value: "BirthdayList"
});
```

---

### &lt;ListInstance&gt;.Remove {#instance-remove}

Deletes the list bound to this instance (the publication list itself).

#### Syntax

```javascript
<ListInstance>.Remove()
```

#### Return value

`"OK"` on success, or throws on failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myList = List.Init("myList");
var status = myList.Remove();
```

---

## Subscribers

Subscriber membership operations are invoked on `list.Subscribers` after `List.Init`. See **[List.Subscribers](/core-library/list-subscribers/)** for `Add`, `Retrieve`, `Unsubscribe`, `Update`, `Upsert`, and `Subscribers.Tracking.Retrieve`.

---

## Subscribe / unsubscribe pattern

```javascript
Platform.Load("core", "1.1.5");

var action = Platform.Request.GetFormField("action"); // "subscribe" or "unsubscribe"
var email = Platform.Request.GetFormField("email");
var listKey = "Newsletter_PublicList";

if (!Platform.Function.IsEmailAddress(email)) {
    Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "Invalid email" }));
} else {
    var list = List.Init(listKey);
    try {
        if (action === "subscribe") {
            list.Subscribers.Upsert(email, {
                SubscribedAt: Platform.Function.Now()
            });
            Write(Stringify({ status: "subscribed" }));
        } else if (action === "unsubscribe") {
            list.Subscribers.Unsubscribe(email);
            Write(Stringify({ status: "unsubscribed" }));
        }
    } catch (e) {
        Write(Stringify({ status: 500, statusMessage: "Internal Server Error", error: e.message }));
    }
}
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/list-subscribers/">List.Subscribers</a></li>
  <li><a href="/core-library/subscriber/">Subscriber</a></li>
</ul>
</div>
