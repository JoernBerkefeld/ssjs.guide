---
layout: page
title: Subscriber Management
parent: Recipes
parent_url: /recipes/
description: Complete patterns for managing SFMC subscribers — subscribe, unsubscribe, update preferences, and handle global unsubscribes.
---

## Subscribe to a List

```javascript
Platform.Load("core", "1.1.5");

var email = Platform.Request.GetFormField("email");
var firstName = Platform.Request.GetFormField("firstName");
var listKey = "MainNewsletter_PublicList";

if (!Platform.Function.IsEmailAddress(email)) {
    Platform.Response.SetResponseCode(400, "Bad Request");
    Write(Stringify({ error: "Invalid email" }));
    return;
}

try {
    var list = List.Init(listKey);
    list.Subscribers.Add(email, {
        FirstName: firstName,
        SubscribedAt: Platform.Function.Now(),
        Source: "web_form"
    });

    // Also save to preferences DE
    Platform.Function.UpsertData("EmailPreferences",
        ["Email"], [email],
        ["Newsletter", "SubscribedAt"],
        ["true", Platform.Function.Now()]
    );

    Platform.Response.SetContentType("application/json");
    Write(Stringify({ status: "subscribed", email: email }));
} catch(e) {
    Platform.Response.SetResponseCode(500, "Server Error");
    Write(Stringify({ error: "Subscription failed" }));
}
```

---

## Unsubscribe with Preference Center

```javascript
Platform.Load("core", "1.1.5");

var email = Platform.Request.GetFormField("email");
var newsletters = Platform.Request.GetFormField("unsubNewsletters") === "on";
var promotions = Platform.Request.GetFormField("unsubPromotions") === "on";
var all = Platform.Request.GetFormField("unsubAll") === "on";

if (all) {
    // Global unsubscribe via WSProxy
    var proxy = new Script.Util.WSProxy();
    proxy.update("Subscriber", {
        EmailAddress: email,
        SubscriberKey: email,
        Status: "Unsubscribed"
    });
} else {
    // List-specific unsubscribe
    if (newsletters) {
        var list = List.Init("Newsletter_PublicList");
        list.Subscribers.Remove(email);
    }
    if (promotions) {
        var promoList = List.Init("Promotions_PublicList");
        promoList.Subscribers.Remove(email);
    }
}

// Update preferences DE
Platform.Function.UpdateData("EmailPreferences",
    ["Newsletter", "Promotions", "UpdatedAt"],
    [newsletters ? "false" : null, promotions ? "false" : null, Platform.Function.Now()],
    ["Email"], [email]
);

Write(Stringify({ status: "updated" }));
```

---

## Update Subscriber Attributes

```javascript
Platform.Load("core", "1.1.5");

var rawBody = Platform.Request.GetPostData();
var updates = Platform.Function.ParseJSON(rawBody + "");

var sub = Subscriber.Init(updates.subscriberKey);

// Update profile attributes
if (updates.firstName) sub.Attributes.Add("FirstName", updates.firstName);
if (updates.lastName) sub.Attributes.Add("LastName", updates.lastName);
if (updates.phone) sub.Attributes.Add("Phone", updates.phone);
if (updates.city) sub.Attributes.Add("City", updates.city);

// Update preferences DE in parallel
Platform.Function.UpsertData("SubscriberPreferences",
    ["SubscriberKey"], [updates.subscriberKey],
    ["UpdatedAt", "PreferredChannel"],
    [Platform.Function.Now(), updates.preferredChannel || "email"]
);

Write(Stringify({ status: "updated", subscriberKey: updates.subscriberKey }));
```

---

## Add Subscriber to Multiple Lists

```javascript
Platform.Load("core", "1.1.5");

var listKeys = ["Newsletter", "Promotions", "ProductUpdates"];
var email = Platform.Request.GetFormField("email");

for (var i = 0; i < listKeys.length; i++) {
    var listId = Platform.Request.GetFormField("list_" + listKeys[i]);
    if (listId === "on") {
        var list = List.Init(listKeys[i] + "_PublicList");
        try {
            list.Subscribers.Add(email);
        } catch(e) {
            // Log failure but continue with other lists
            Platform.Function.InsertData("ListErrors",
                ["email", "list", "error"],
                [email, listKeys[i], e.message]
            );
        }
    }
}
Write(Stringify({ status: "subscribed" }));
```

---

## WSProxy: Upsert Subscriber to All Subscribers

```javascript
var proxy = new Script.Util.WSProxy();

var result = proxy.update(
    "Subscriber",
    {
        EmailAddress: email,
        SubscriberKey: email,
        Status: "Active",
        Lists: [
            { ID: 12345, Status: "Active" },
            { ID: 67890, Status: "Active" }
        ],
        Attributes: [
            { Name: "FirstName", Value: firstName },
            { Name: "LastName", Value: lastName }
        ]
    },
    [{ SaveAction: "UpdateAdd" }]  // Upsert
);

if (result.Status !== "OK") {
    throw new Error("Subscriber upsert failed: " + result.Results[0].StatusMessage);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/subscriber/">Subscriber</a></li>
  <li><a href="/core-library/list/">List</a></li>
  <li><a href="/wsproxy/update-item/">WSProxy.update</a></li>
</ul>
</div>
