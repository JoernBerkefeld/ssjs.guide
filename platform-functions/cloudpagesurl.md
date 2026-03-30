---
layout: function
title: CloudPagesURL
parent: Platform Functions
parent_url: /platform-functions/
description: Builds an encrypted URL for a CloudPages landing page with optional name/value parameters. Parameters are encrypted so they cannot be tampered with.
availability:
  email: true
  cloudpage: true
  automation: false
  triggered_send: true
syntax: "Platform.Function.CloudPagesURL(pageId [, param1, value1, param2, value2, ...])"
return_type: string
min_args: 1
max_args: Infinity
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pageId` | number | Yes | The page ID of the CloudPages landing page |
| `param1` | string | No | First parameter name |
| `value1` | string | No | First parameter value |
| `param2` | string | No | Second parameter name |
| `value2` | string | No | Second parameter value |

## Description

`CloudPagesURL` generates a URL for a CloudPages landing page. Parameters are **encrypted** by SFMC — they cannot be read or tampered with by the subscriber. The page reads them via `Platform.Request.GetQueryStringParameter()`.

This is the recommended way to pass sensitive data (like subscriber keys) in email links to CloudPages.

## Examples

### Basic CloudPages link

```javascript
var pageId = 12345;
var url = Platform.Function.CloudPagesURL(pageId);
Write('<a href="' + url + '">Visit your preferences</a>');
```

### With parameters

```javascript
var url = Platform.Function.CloudPagesURL(
    12345,
    "sk",    subscriberKey,
    "email", emailAddress
);
Write('<a href="' + url + '">Update preferences</a>');
```

### In an email context

```javascript
var preferencesUrl = Platform.Function.CloudPagesURL(
    99001,
    "sk",  _subscriberKey,
    "ref", "email_footer"
);
Variable.SetValue("@preferencesUrl", preferencesUrl);
```

Then in AMPscript/HTML:

```html
<a href="%%=v(@preferencesUrl)=%%">Manage Email Preferences</a>
```

### Reading the parameters on the CloudPage

```javascript
// On the CloudPage receiving the encrypted link:
var sk    = Platform.Request.GetQueryStringParameter("sk");
var email = Platform.Request.GetQueryStringParameter("email");
```

## Notes

- Parameters passed to `CloudPagesURL` are encrypted — subscribers cannot see or modify them
- The encryption key is tied to the SFMC account — links from one account won't decrypt in another
- Parameters are accessible via `Platform.Request.GetQueryStringParameter()` on the target page
- For non-encrypted parameters, just append them as a regular query string

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
  <li><a href="/platform-functions/micrositeurl/">MicrositeURL</a></li>
</ul>
</div>
