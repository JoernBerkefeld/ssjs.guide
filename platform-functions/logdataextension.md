---
layout: function
title: LogDataExtension
parent: Platform Functions
parent_url: /platform-functions/
description: Logs an entry to a specified Data Extension. Similar to InsertData but designed for logging use cases.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.LogDataExtension(deName, columnNames, columnValues)"
return_type: void
min_args: 3
max_args: 3
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Name of the Data Extension to log to |
| `columnNames` | string[] | Yes | Array of column names |
| `columnValues` | string[] | Yes | Array of values (parallel to columnNames) |

## Examples

```javascript
Platform.Function.LogDataExtension(
    "ErrorLog",
    ["Timestamp", "Page", "Message", "SubscriberKey"],
    [
        Platform.Function.Now(),
        "checkout",
        "Payment processing failed",
        subscriberKey
    ]
);
```

## Notes

`LogDataExtension` is functionally equivalent to `InsertData` but semantically signals intent for append-only log tables. Consider using `InsertData` for clarity in new code.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/insertdata/">InsertData</a></li>
</ul>
</div>
