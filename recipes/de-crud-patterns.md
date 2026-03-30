---
layout: page
title: DE CRUD Patterns
parent: Recipes
parent_url: /recipes/
description: Complete Data Extension Create, Read, Update, Delete patterns using both Platform.Function and Core library approaches.
---

## Platform.Function Approach

### Create (Insert)

```javascript
// Single row insert
var rowsAdded = Platform.Function.InsertData(
    "UserProfiles",
    ["SubscriberKey", "Email", "FirstName", "LastName", "CreatedAt", "Status"],
    [subscriberKey, email, firstName, lastName, Platform.Function.Now(), "active"]
);
// rowsAdded === 1 on success; throws on primary key conflict
```

### Read (Lookup)

```javascript
// Single field, single row
var email = Platform.Function.Lookup("UserProfiles", "Email", "SubscriberKey", subKey);

// Multiple rows
var rows = Platform.Function.LookupRows("Orders", "Status", "pending");
for (var i = 0; i < rows.length; i++) {
    var order = rows[i];
    Write(order.OrderId + ": " + order.Total + "<br>");
}

// Multiple rows with sort and limit
var recentOrders = Platform.Function.LookupOrderedRows(
    "Orders", 10, "CreatedAt desc",
    "SubscriberKey", subKey
);
```

### Update

```javascript
// Update rows matching a filter
var rowsUpdated = Platform.Function.UpdateData(
    "UserProfiles",
    ["Status", "UpdatedAt"],
    ["inactive", Platform.Function.Now()],
    ["SubscriberKey"],
    [subKey]
);
// rowsUpdated === 0 if no match (no error thrown)
```

### Upsert

```javascript
// Insert or update based on primary key
Platform.Function.UpsertData(
    "UserProfiles",
    ["SubscriberKey"],        // key columns
    [subKey],                 // key values
    ["Email", "FirstName", "Status", "UpdatedAt"], // data columns
    [email, firstName, "active", Platform.Function.Now()] // data values
);
```

### Delete

```javascript
var rowsDeleted = Platform.Function.DeleteData(
    "UserProfiles",
    ["SubscriberKey"],
    [subKey]
);
```

---

## Core Library Approach

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("UserProfiles");

// Create
de.Rows.Add({
    SubscriberKey: subKey,
    Email: email,
    FirstName: firstName,
    Status: "active",
    CreatedAt: Platform.Function.Now()
});

// Read (with filter — required on CloudPages)
var rows = de.Rows.Retrieve({
    Property: "SubscriberKey",
    SimpleOperator: "equals",
    Value: subKey
});
var profile = rows.length > 0 ? rows[0] : null;

// Update
de.Rows.Update(
    { Status: "inactive", UpdatedAt: Platform.Function.Now() },
    ["SubscriberKey"],
    [subKey]
);

// Delete
de.Rows.Remove("SubscriberKey", subKey);
```

---

## Pattern: Safe Upsert with Existence Check

```javascript
var existing = Platform.Function.Lookup(
    "UserProfiles", "SubscriberKey", "SubscriberKey", subKey);

if (Platform.Function.Empty(existing)) {
    // Insert
    Platform.Function.InsertData("UserProfiles",
        ["SubscriberKey", "Email", "CreatedAt"],
        [subKey, email, Platform.Function.Now()]
    );
} else {
    // Update
    Platform.Function.UpdateData("UserProfiles",
        ["Email", "UpdatedAt"],
        [email, Platform.Function.Now()],
        ["SubscriberKey"], [subKey]
    );
}
```

---

## Pattern: Bulk Insert from Array

```javascript
var submissions = Platform.Function.ParseJSON(rawBody + "");

var inserted = 0;
var errors = [];
for (var i = 0; i < submissions.length; i++) {
    var sub = submissions[i];
    if (!Platform.Function.IsEmailAddress(sub.email)) {
        errors.push({ index: i, reason: "invalid email" });
        continue;
    }
    try {
        Platform.Function.UpsertData("Leads",
            ["Email"], [sub.email],
            ["FirstName", "Source", "CreatedAt"],
            [sub.firstName || "", sub.source || "api", Platform.Function.Now()]
        );
        inserted++;
    } catch(e) {
        errors.push({ index: i, reason: e.message });
    }
}

Write(Stringify({ inserted: inserted, errors: errors }));
```

---

## Pattern: Soft Delete (Status Flag)

Prefer marking records inactive over deleting them:

```javascript
// Soft delete — sets Status = "deleted", preserves record
Platform.Function.UpdateData(
    "Orders",
    ["Status", "DeletedAt"],
    ["deleted", Platform.Function.Now()],
    ["OrderId"], [orderId]
);

// When reading, filter out deleted records
var active = Platform.Function.LookupRows("Orders", "Status", "active");
```

---

## Pattern: Pagination with LookupOrderedRows

```javascript
var PAGE_SIZE = 25;
var pageNum = parseInt(Platform.Request.GetQueryStringParameter("page") || "1", 10);
var offset = (pageNum - 1) * PAGE_SIZE;

// SSJS has no OFFSET support — get more rows and slice
var all = Platform.Function.LookupOrderedRows(
    "Products",
    offset + PAGE_SIZE, // get enough rows
    "Name asc",
    "Status", "active"
);

var page = [];
for (var i = offset; i < Math.min(offset + PAGE_SIZE, all.length); i++) {
    page.push(all[i]);
}

Write(Stringify({
    page: pageNum,
    pageSize: PAGE_SIZE,
    items: page,
    hasMore: all.length > offset + PAGE_SIZE
}));
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/lookup/">Platform.Function.Lookup</a></li>
  <li><a href="/platform-functions/insertdata/">Platform.Function.InsertData</a></li>
  <li><a href="/core-library/dataextension-rows/">DataExtension.Rows</a></li>
  <li><a href="/wsproxy/retrieve/">WSProxy.retrieve</a></li>
</ul>
</div>
