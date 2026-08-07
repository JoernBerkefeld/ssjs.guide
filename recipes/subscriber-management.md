---
layout: page
title: Subscriber Management
parent: Recipes
parent_url: /recipes/
description: Complete patterns for managing SFMC subscribers — subscribe, unsubscribe, update preferences, and handle global unsubscribes.
---

## Subscribe to a List

[`<ListInstance>.Subscribers.Add`](/core-library/list-subscribers/#instance-subscribers-add) takes a **single properties object** and reports failure by returning the plain string `"Error"` — it does not throw. Wrapping it in `try`/`catch` therefore hides every failure, so branch on the return value instead. Profile fields such as a first name belong on the subscriber record ([`<SubscriberInstance>.Update`](/core-library/subscriber/#instance-update)), not in the list-membership call.

```javascript
Platform.Load("core", "1.1.5");

var email = Platform.Request.GetFormField("email");
var firstName = Platform.Request.GetFormField("firstName");
var listKey = "MainNewsletter_PublicList";

Platform.Response.ContentType = "application/json";

if (!Platform.Function.IsEmailAddress(email)) {
    Write(Stringify({ status: 400, statusMessage: "Bad Request", error: "Invalid email" }));
} else {
    var list = List.Init(listKey);

    // Add returns the string "OK" or "Error" and never throws — check the return value
    var addStatus = String(list.Subscribers.Add({
        EmailAddress: email,
        SubscriberKey: email
    }));

    if (addStatus !== "OK") {
        Write(Stringify({ status: 500, statusMessage: "Internal Server Error", error: "Subscription failed" }));
    } else {
        // Profile attributes are written through the subscriber Update payload
        Subscriber.Init(email).Update({ Attributes: { FirstName: firstName } });

        // Mirror the opt-in into the preferences DE
        Platform.Function.UpsertData("EmailPreferences",
            ["Email"], [email],
            ["Newsletter", "SubscribedAt"],
            ["true", Platform.Function.Now()]
        );

        Write(Stringify({ status: "subscribed", email: email }));
    }
}
```

---

## Unsubscribe with Preference Center

There is **no** method that deletes a single list membership. [`<ListInstance>.Subscribers`](/core-library/list-subscribers/) exposes only `Add`, `Retrieve`, `Unsubscribe`, `Update`, `Upsert` and `Tracking.Retrieve` — `<ListInstance>.Remove()` deletes the *whole publication list*, not one member. The supported way to take somebody off a list is [`Unsubscribe`](/core-library/list-subscribers/#instance-subscribers-unsubscribe), which flips the membership status to `Unsubscribed` while the row itself stays in place. That is also what a preference centre wants: the opt-out has to remain on record. If you truly need the subscriber gone, the only Core route is deleting the subscriber outright with [`<SubscriberInstance>.Remove()`](/core-library/subscriber/#instance-remove) — that removes them from *every* list and from All Subscribers.

Like `Add`, `Unsubscribe` signals failure with the string `"Error"` rather than an exception, so check the return value here too.

```javascript
Platform.Load("core", "1.1.5");

var email = Platform.Request.GetFormField("email");
var newsletters = Platform.Request.GetFormField("unsubNewsletters") === "on";
var promotions = Platform.Request.GetFormField("unsubPromotions") === "on";
var all = Platform.Request.GetFormField("unsubAll") === "on";

var failed = [];

if (all) {
    // Global unsubscribe via WSProxy
    var proxy = new Script.Util.WSProxy();
    var globalResult = proxy.updateItem("Subscriber", {
        EmailAddress: email,
        SubscriberKey: email,
        Status: "Unsubscribed"
    });
    if (globalResult.Results[0].StatusCode !== "OK") {
        failed.push("all");
    }
} else {
    // List-specific unsubscribe — sets the membership status, the row stays on the list
    if (newsletters) {
        var list = List.Init("Newsletter_PublicList");
        if (String(list.Subscribers.Unsubscribe(email)) !== "OK") {
            failed.push("Newsletter_PublicList");
        }
    }
    if (promotions) {
        var promoList = List.Init("Promotions_PublicList");
        if (String(promoList.Subscribers.Unsubscribe(email)) !== "OK") {
            failed.push("Promotions_PublicList");
        }
    }
}

// Update preferences DE
Platform.Function.UpdateData("EmailPreferences",
    ["Email"], [email],
    ["Newsletter", "Promotions", "UpdatedAt"],
    [newsletters ? "false" : null, promotions ? "false" : null, Platform.Function.Now()]
);

if (failed.length > 0) {
    Write(Stringify({ status: 500, statusMessage: "Internal Server Error", failedLists: failed }));
} else {
    Write(Stringify({ status: "updated" }));
}
```

---

## Update Subscriber Attributes

`<SubscriberInstance>.Attributes` is read-only — [`Retrieve()`](/core-library/subscriber/#instance-attributes-retrieve) is its only method, and there is no per-attribute setter. Attributes are written by passing an `Attributes` object inside the [`<SubscriberInstance>.Update`](/core-library/subscriber/#instance-update) payload, in one call.

```javascript
Platform.Load("core", "1.1.5");

var rawBody = Platform.Request.GetPostData();
var updates = Platform.Function.ParseJSON(rawBody + "");

var sub = Subscriber.Init(updates.subscriberKey);

// Collect only the attributes present in the request
var attributes = {};
if (updates.firstName) attributes.FirstName = updates.firstName;
if (updates.lastName) attributes.LastName = updates.lastName;
if (updates.phone) attributes.Phone = updates.phone;
if (updates.city) attributes.City = updates.city;

// A single Update writes them all; "OK" means the change was applied
var updateStatus = String(sub.Update({ Attributes: attributes }));

if (updateStatus !== "OK") {
    Write(Stringify({ status: 500, statusMessage: "Internal Server Error", error: "Attribute update failed" }));
} else {
    // Update preferences DE in parallel
    Platform.Function.UpsertData("SubscriberPreferences",
        ["SubscriberKey"], [updates.subscriberKey],
        ["UpdatedAt", "PreferredChannel"],
        [Platform.Function.Now(), updates.preferredChannel || "email"]
    );

    Write(Stringify({ status: "updated", subscriberKey: updates.subscriberKey }));
}
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

        // No exception is raised on failure — the returned string is the only signal
        var addStatus = String(list.Subscribers.Add({
            EmailAddress: email,
            SubscriberKey: email
        }));

        if (addStatus !== "OK") {
            // Log the failure but keep going with the remaining lists
            Platform.Function.InsertData("ListErrors",
                ["email", "list", "error"],
                [email, listKeys[i], addStatus]
            );
        }
    }
}
Write(Stringify({ status: "subscribed" }));
```

---

## WSProxy: Update Subscriber in All Subscribers

```javascript
var proxy = new Script.Util.WSProxy();

var result = proxy.updateItem(
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
    }
);

if (result.Status !== "OK") {
    throw new Error("Subscriber update failed: " + result.Results[0].StatusMessage);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/subscriber/">Subscriber</a></li>
  <li><a href="/core-library/list/">List</a></li>
  <li><a href="/wsproxy/updateitem/">WSProxy.updateItem</a></li>
</ul>
</div>
