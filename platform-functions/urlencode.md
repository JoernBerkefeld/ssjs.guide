---
layout: function
title: UrlEncode
parent: Platform Functions
parent_url: /platform-functions/
description: Percent-encodes a complete URL. Optional mode controls whether URL-reserved characters are encoded.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.UrlEncode(url[, encodeReservedKeywords])"
return_type: string
min_args: 1
max_args: 2
verification: verified
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | The complete URL to encode |
| `encodeReservedKeywords` | boolean | No | When `true`, encodes reserved characters; spaces become `+`. When `false` (default), only spaces are encoded as `%20`. |

## Examples

```javascript
var baseURL = "http://www.example.com?value=12+3 12;3";
var encodedDefault = Platform.Function.UrlEncode(baseURL);
var encodedFull = Platform.Function.UrlEncode(baseURL, true);
Write(encodedDefault);
Write(encodedFull);
```

## Notes

For AMPscript-style `URLEncode` with additional operands (not exposed on `Platform.Function.UrlEncode`), call AMPscript via `TreatAsContent`:

```javascript
Variable.SetValue("@val", myValue);
Platform.Function.TreatAsContent("%%[Set @encoded = URLEncode(@val, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```
