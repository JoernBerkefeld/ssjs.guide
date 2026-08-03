---
layout: function
title: GUID
parent: Platform Functions
parent_url: /platform-functions/
description: Generates a new globally unique identifier (UUID v4 format) string.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.GUID()"
return_type: string
min_args: 0
max_args: 0
verification: verified
test_scripts: complete
---

## Description

Generates a new GUID (Globally Unique Identifier) in standard UUID v4 format, e.g. `"550e8400-e29b-41d4-a716-446655440000"`.

{% include test-script.html bundle="platform-functions--guid" chapter="description" %}

## Examples

```javascript
var id = Platform.Function.GUID();
Write(id); // e.g. "550e8400-e29b-41d4-a716-446655440000"

// Use as a unique session token
var sessionToken = Platform.Function.GUID();
Platform.Response.SetCookie("session_id", sessionToken, expiryStr, true);

// Use as a row ID for a DE without a natural key
Platform.Function.InsertData(
    "Submissions",
    "ID",        Platform.Function.GUID(),
    "Email",     email,
    "Timestamp", Platform.Function.Now()
);
```

{% include test-script.html bundle="platform-functions--guid" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/guid/">GUID — bare-name Core form (requires Platform.Load)</a></li>
</ul>
</div>
