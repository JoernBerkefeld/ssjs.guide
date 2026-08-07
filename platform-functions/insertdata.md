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
syntax: "Platform.Function.InsertData(deName, fieldNames, fieldValues)"
return_type: number
min_args: 3
max_args: 3
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `fieldNames` | string[] | Yes | Array of column names to populate |
| `fieldValues` | array | Yes | Array of values aligned to `fieldNames` |

{% include test-script.html bundle="platform-functions--insertdata" chapter="parameters" %}

## Description

`InsertData` adds a new row to a Data Extension. Returns the number of affected rows (1 on success). The Data Extension is resolved by its **Name**, not the external key / CustomerKey.

{% include differs-from-docs.html note="`InsertData` resolves the Data Extension by its **Name** only — passing the external key / CustomerKey throws \"A Data Extension of this name does not exist.\" (runtime-verified)." %}

{% include test-script.html bundle="platform-functions--insertdata" chapter="resolved-by-name-only" label="Show test script — the Data Extension is resolved by Name, not by external key" %}

If the DE has a primary key and a row with the same key already exists, `InsertData` will **throw an error**. Use `UpsertData` for insert-or-update behavior.

{% include test-script.html bundle="platform-functions--insertdata" chapter="description" %}

## Examples

### Basic insert

```javascript
var rowsAffected = Platform.Function.InsertData(
    "FormSubmissions",
    ["SubscriberKey","Email","Name","Timestamp"], [subscriberKey, email, name,Now()]
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
        ["Email", "EventID", "Status"],
        [email, eventId, "registered"]
    );
} catch (e) {
    // Duplicate primary key or other error
    Write("Registration failed: " + e.message);
}
```

### Insert from form data

```javascript
Platform.Load("core", "1.1.5");

if (String(Platform.Request.Method) === "POST") {
    var email   = Platform.Request.GetFormField("email");
    var message = Platform.Request.GetFormField("message");

    if (Platform.Function.IsEmailAddress(email)) {
        Platform.Function.InsertData(
            "ContactForm",
            ["Email", "Message", "CreatedAt"],
            [email, message, Now()],
        );
        Platform.Response.Redirect("/thank-you", false);
    }
}
```

{% include test-script.html bundle="platform-functions--insertdata" chapter="examples" %}

## Notes

- `InsertData` always creates a new row — use `UpsertData` to avoid duplicate errors
- The `InsertDE` function performs the same insert, but it returns `null` instead of a row count. The official docs describe `InsertDE` as email-only, yet it was runtime-verified to run and commit on a CloudPage too — `InsertData` is still preferred outside email because it returns the affected-row count.
- Returns `1` on success, throws on failure

{% include test-script.html bundle="platform-functions--insertdata" chapter="notes" %}

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
