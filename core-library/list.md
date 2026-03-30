---
layout: page
title: List
parent: Core Library
parent_url: /core-library/
description: Core library object for managing publication lists — initialize a list and manage subscriber membership.
---

The `List` Core library object provides an object-oriented interface for working with SFMC publication lists.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`List.Init(listKey)`](#init) | List | Initialize a list object |
| [`list.Subscribers.Add(email, attributes)`](#subscribersadd) | void | Add a subscriber to the list |
| [`list.Subscribers.Remove(email)`](#subscribersremove) | void | Remove a subscriber from the list |

---

## List.Init

```javascript
var list = List.Init(listExternalKey);
```

Initializes a List object using the list's External Key.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listExternalKey` | string | Yes | External key of the publication list |

---

## Subscribers.Add

```javascript
list.Subscribers.Add(emailAddress, attributes)
```

Adds a subscriber to the list. Creates the subscriber in All Subscribers if they don't exist.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailAddress` | string | Yes | Email address |
| `attributes` | object | No | Key-value object of profile attributes |

### Examples

```javascript
Platform.Load("core", "1.1.5");
var list = List.Init("WelcomeSeries_List");
list.Subscribers.Add("jane@example.com", {
    FirstName: "Jane",
    LastName: "Doe"
});
```

---

## Subscribers.Remove

```javascript
list.Subscribers.Remove(emailAddress)
```

Removes a subscriber from the list (unsubscribes them from this list only).

### Examples

```javascript
Platform.Load("core", "1.1.5");
var list = List.Init("WelcomeSeries_List");
list.Subscribers.Remove("jane@example.com");
```

---

## Complete Subscribe/Unsubscribe Pattern

```javascript
Platform.Load("core", "1.1.5");

var action = Platform.Request.GetFormField("action"); // "subscribe" or "unsubscribe"
var email = Platform.Request.GetFormField("email");
var listKey = "Newsletter_PublicList";

if (!Platform.Function.IsEmailAddress(email)) {
    Platform.Response.SetResponseCode(400, "Bad Request");
    Write(Stringify({ error: "Invalid email" }));
} else {
    var list = List.Init(listKey);
    try {
        if (action === "subscribe") {
            list.Subscribers.Add(email, {
                SubscribedAt: Platform.Function.Now()
            });
            Write(Stringify({ status: "subscribed" }));
        } else if (action === "unsubscribe") {
            list.Subscribers.Remove(email);
            Write(Stringify({ status: "unsubscribed" }));
        }
    } catch(e) {
        Platform.Response.SetResponseCode(500, "Server Error");
        Write(Stringify({ error: e.message }));
    }
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/subscriber/">Subscriber</a></li>
</ul>
</div>
