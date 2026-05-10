---
layout: function
title: RedirectTo
parent: Platform Functions
parent_url: /platform-functions/
description: Specifies the target of an email link as a complete URL from an attribute, data extension field, or variable. Use inside the href of HTML emails per WS-FUEL / AMPscript patterns.
availability:
  email: true
  cloudpage: false
  automation: false
  triggered_send: true
syntax: "Platform.Function.RedirectTo(url)"
return_type: void
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Complete URL to use as the link target |

## Example

```javascript
var email = "aruiz@example.com";
var firstName = "Angela";
var baseUrl = "https://example.com?email=";
var nameJoin = "&name=";
Platform.Function.RedirectTo(baseUrl.concat(email, nameJoin, firstName));
```

In HTML email content, use inside `href` as `%%=RedirectTo(...)=%%` per your sender setup.

For CloudPages HTTP redirects, use [`Platform.Response.Redirect`](/platform-objects/platform-response/) instead.
