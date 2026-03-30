---
layout: page
title: Anti-CSRF
parent: Recipes
parent_url: /recipes/
description: Protect Cloud Page forms against cross-site request forgery using a server-generated token stored in a Data Extension.
---

Cross-site request forgery (CSRF) attacks trick a user's browser into submitting an authenticated request to your Cloud Page without their knowledge. The standard defence is a server-generated, single-use token that is tied to the user's session and verified on submission.

---

## Pattern Overview

1. **Render phase** — generate a random token, store it alongside the subscriber key in a DE, embed it in the form as a hidden field.
2. **Submit phase** — read the submitted token, look it up in the DE, verify it matches the expected subscriber key, then delete it so it cannot be replayed.

---

## Setup: Token Storage DE

Create a Data Extension named `CSRFTokens` with these fields:

| Field | Type | Is Primary Key |
|-------|------|----------------|
| `Token` | Text (50) | Yes |
| `SubscriberKey` | Text (254) | No |
| `CreatedAt` | Date | No |

---

## Step 1 — Render the Form

```javascript
Platform.Load("core", "1.1.5");

var subKey = Platform.Variable.GetValue("@SubscriberKey");
if (!subKey) { subKey = "anon_" + Platform.Function.GUID(); }

// Generate a random token and store it
var token = Platform.Function.GUID();
Platform.Function.InsertData(
    "CSRFTokens",
    ["Token", "SubscriberKey", "CreatedAt"],
    [token, subKey, Platform.Function.Now()]
);
```

Embed the token in your form:

```html
<form method="post" action="%%=CloudPagesURL(123)=%%">
  <input type="hidden" name="csrfToken" value="%%=v(@token)=%%">
  <!-- other form fields -->
  <button type="submit">Submit</button>
</form>
```

> **Note:** The form value is set via AMPscript's `%%=v(@token)=%%` after assigning the SSJS variable to an AMPscript variable with `Variable.SetValue("@token", token)`.

```javascript
Platform.Variable.SetValue("@token", token);
```

---

## Step 2 — Validate on Submission

```javascript
Platform.Load("core", "1.1.5");

var submittedToken = Platform.Request.GetFormField("csrfToken");
var subKey = Platform.Variable.GetValue("@SubscriberKey");

if (!submittedToken) {
    Platform.Response.SetResponseCode(403, "Forbidden");
    Write("Missing security token.");
    Platform.Function.RaiseError("Missing CSRF token", true);
}

// Look up the token
var storedKey = Platform.Function.Lookup(
    "CSRFTokens", "SubscriberKey", "Token", submittedToken
);

if (!storedKey || storedKey !== subKey) {
    Platform.Response.SetResponseCode(403, "Forbidden");
    Write("Invalid or expired security token.");
    Platform.Function.RaiseError("CSRF token mismatch", true);
}

// Token is valid — delete it immediately (single-use)
Platform.Function.DeleteData("CSRFTokens", ["Token"], [submittedToken]);

// Continue with form processing...
```

---

## Cleanup: Expire Old Tokens

Tokens should not accumulate. Run this in an Automation on a schedule (e.g. hourly) to remove tokens older than 30 minutes:

```javascript
var proxy = new Script.Util.WSProxy();
var cutoff = Platform.Function.DateAdd(Platform.Function.Now(), -30, "MI");
var filter = {
    Property: "CreatedAt",
    SimpleOperator: "lessThan",
    Value: cutoff
};
var stale = proxy.retrieve("DataExtensionObject[CSRFTokens]", ["Token"], filter);
for (var i = 0; i < stale.Results.length; i++) {
    Platform.Function.DeleteData("CSRFTokens", ["Token"], [stale.Results[i].Token]);
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/best-practices/security/">Security Best Practices</a></li>
  <li><a href="/recipes/cloud-page-apps/">Cloud Page Apps</a></li>
  <li><a href="/platform-functions/guid/">GUID</a></li>
  <li><a href="/platform-functions/deletedata/">DeleteData</a></li>
</ul>
</div>
