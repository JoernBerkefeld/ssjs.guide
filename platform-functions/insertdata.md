---
layout: function
title: InsertData
parent: Platform Functions
parent_url: /platform-functions/
description: Adds a new row to a Data Extension. Fails if a row with the same primary key already exists.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.InsertData(deName, field1, value1 [, field2, value2, ...])"
return_type: number
min_args: 4
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |
| `field1` | string | Yes | First column name |
| `value1` | string | Yes | Value for the first column |
| `field2` | string | No | Second column name |
| `value2` | string | No | Value for the second column |

Additional field/value pairs can be provided to set more columns.

## Description

`InsertData` adds a new row to a Data Extension. Returns the number of affected rows (1 on success).

If the DE has a primary key and a row with the same key already exists, `InsertData` will **throw an error**. Use `UpsertData` for insert-or-update behavior.

## Examples

### Basic insert

```javascript
var rowsAffected = Platform.Function.InsertData(
    "FormSubmissions",
    "SubscriberKey", subscriberKey,
    "Email",         email,
    "Name",          name,
    "Timestamp",     Platform.Function.Now()
);

if (rowsAffected === 1) {
    Write("Submission saved.");
}
```

### Insert with error handling

```javascript
try {
    Platform.Function.InsertData(
        "EventRegistrations",
        "Email",   email,
        "EventID", eventId,
        "Status",  "registered"
    );
} catch (e) {
    // Duplicate primary key or other error
    Write("Registration failed: " + e.message);
}
```

### Insert from form data

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

if (Platform.Request.Method === "POST") {
    var email   = Platform.Request.GetFormData("email");
    var message = Platform.Request.GetFormData("message");

    if (Platform.Function.IsEmailAddress(email)) {
        Platform.Function.InsertData(
            "ContactForm",
            "Email",     email,
            "Message",   message,
            "CreatedAt", Platform.Function.Now()
        );
        Platform.Response.Redirect("/thank-you");
    }
}
</script>
```

## Notes

- `InsertData` always creates a new row — use `UpsertData` to avoid duplicate errors
- The `InsertDE` function is an alias with identical behavior
- Returns `1` on success, throws on failure

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/upsertdata/">UpsertData</a></li>
  <li><a href="/platform-functions/updatedata/">UpdateData</a></li>
  <li><a href="/platform-functions/deletedata/">DeleteData</a></li>
  <li><a href="/platform-functions/insertde/">InsertDE</a></li>
  <li><a href="/recipes/de-crud-patterns/">DE CRUD Patterns</a></li>
</ul>
</div>
