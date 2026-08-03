---
layout: function
title: IsCHTMLBrowser
parent: Platform Functions
parent_url: /platform-functions/
description: Returns whether a user-agent string represents a CHTML browser (e.g. feature phones).
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.IsCHTMLBrowser(userAgentString)"
return_type: boolean
min_args: 1
max_args: 1
verification: verified
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userAgentString` | string | Yes | User-agent value to evaluate |

{% include test-script.html bundle="platform-functions--ischtmlbrowser" chapter="parameters" %}

## Example

```javascript
Platform.Response.Write(Platform.Request.UserAgent);
Platform.Response.Write("<br>Is CHTML: ");
Platform.Response.Write(
    Platform.Function.IsCHTMLBrowser(Platform.Request.UserAgent)
);
```

{% include test-script.html bundle="platform-functions--ischtmlbrowser" chapter="example" %}
