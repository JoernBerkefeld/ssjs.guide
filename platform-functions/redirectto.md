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
return_type: string
min_args: 1
max_args: 1
verification: verified
differs_from_docs: true
test_scripts: complete
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Complete URL to use as the link target |

There is no bare-name `RedirectTo` global in SSJS — call it as `Platform.Function.RedirectTo`, which needs no `Platform.Load`. Calling the bare name reports `Object expected: RedirectTo`.

The argument is coerced to a string: an empty string, `null` and `undefined` return an empty string; a number returns its decimal string and a boolean the capitalized .NET form `True` / `False`.

{% include test-script.html bundle="platform-functions--redirectto" chapter="parameters" %}

## Return value

Returns the passed-in URL as a `string`. When called from SSJS it does **not** issue an HTTP redirect and does not halt execution.

The URL is passed through untouched — no encoding and no validation are applied. Encode it yourself before calling.

{% include differs-from-docs.html note="The official docs imply RedirectTo has no return value, but at runtime it returns the passed-in URL as a string and does not perform an HTTP redirect or halt the script when called from SSJS." %}

{% include test-script.html bundle="platform-functions--redirectto" chapter="differs-no-redirect" label="Show test script — returns the URL and never redirects" %}

{% include test-script.html bundle="platform-functions--redirectto" chapter="return-value" %}

## Example

```javascript
var email = "aruiz@example.com";
var firstName = "Angela";
var baseUrl = "https://example.com?email=";
var nameJoin = "&name=";
Platform.Function.RedirectTo(baseUrl.concat(email, nameJoin, firstName));
```

In HTML email content, use inside `href` as `%%=RedirectTo(...)=%%` per your sender setup.

{% include test-script.html bundle="platform-functions--redirectto" chapter="example" %}

For CloudPages HTTP redirects, use [`Platform.Response.Redirect`](/platform-objects/platform-response/) instead.
