---
layout: function
title: ExecuteFilter
parent: Platform Functions
parent_url: /platform-functions/
description: Executes a saved filter against a Data Extension and returns filtered results.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.ExecuteFilter(filterName)"
return_type: object[]
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filterName` | string | Yes | Name of the saved filter in SFMC |

## Examples

```javascript
var results = Platform.Function.ExecuteFilter("ActiveContacts");
for (var i = 0; i < results.length; i++) {
    Write(results[i].Email + "<br>");
}
```

## Notes

Saved filters are created in Contact Builder or the Data Extension filter editor. The filter must be saved and active before being called from SSJS.
