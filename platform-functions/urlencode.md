---
layout: function
title: UrlEncode
parent: Platform Functions
parent_url: /platform-functions/
description: Percent-encodes the query string of a complete URL. Optional mode controls whether reserved characters are encoded.
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
test_scripts: complete
differs_from_docs: true
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | The complete URL to encode. Only the query string is processed |
| `encodeReservedKeywords` | boolean | No | When `true`, encodes every character outside the passthrough set; spaces become `+`. When `false` (default), only spaces are encoded as `%20`. |

The flag is coerced the .NET way, not the JavaScript way: `1` and the string `"true"` select the reserved-encoding mode, while `0` and the string `"false"` select the default mode — even though a non-empty string is truthy in JavaScript. Passing `null` as the flag throws.

The `url` argument is coerced to a string: `null` and `undefined` both yield `""`, a number yields its digits, and a boolean yields the .NET forms `"True"` / `"False"`.

{% include test-script.html bundle="platform-functions--urlencode" chapter="parameters" %}

## Description

Only the substring **after the first `?`** is ever processed. A space in the path is left as a literal space, and a value containing no `?` at all is returned completely unchanged in both modes — which is why an arbitrary string cannot be encoded with this function.

**Default mode** (`encodeReservedKeywords` omitted or `false`) encodes only the space character, as `%20`. Everything else in the query string — including `&`, `=`, `+`, `;`, `/`, `?` and a literal `%` — is passed through untouched. That makes the default mode idempotent.

**Reserved-encoding mode** (`true`) encodes the space as `+` and percent-encodes everything outside this passthrough set:

| | Characters |
|---|---|
| Passed through | alphanumerics, `-` `_` `.` `!` `*` `(` `)` |
| Percent-encoded | `"` `#` `$` `%` `&` `'` `+` `,` `/` `:` `;` `<` `=` `>` `?` `@` `[` `\` `]` `^` `` ` `` `{` `|` `}` `~` |

Escapes use **lowercase** hex — `%3d`, not `%3D`. Because `%` itself becomes `%25`, reserved-encoding mode is **not** idempotent: applying it twice double-encodes its own output.

Non-ASCII input is left completely untouched in default mode. In reserved-encoding mode it is emitted as lowercase UTF-8 byte escapes — two bytes for an umlaut, three for the euro sign, four for an astral-plane emoji.

{% include differs-from-docs.html note="The official docs name one reserved set, but the runtime set differs in both directions: the exclamation mark, asterisk and both parentheses are never encoded despite being listed, while the double quote, percent sign, angle brackets, backslash, caret, backtick, braces, pipe and tilde all are, despite not being listed. Neither mode touches anything before the first question mark, and escapes use lowercase hex." %}

{% include test-script.html bundle="platform-functions--urlencode" chapter="reserved-set" label="Show test script — the runtime reserved set differs from the docs" %}

{% include test-script.html bundle="platform-functions--urlencode" chapter="encoding-rules" %}

## Comparison with the ECMAScript encoders

There is no bare-name `URLEncode` or `UrlEncode` global — neither before nor after `Platform.Load("core", …)`. Only the `Platform.Function.` form exists. The Annex-B `escape` is not defined in this engine either.

`Platform.Function.UrlEncode` is **not** equivalent to any JavaScript builtin:

| Input `a b/c?d=1&e=2+3;f` | Result |
|---|---|
| `Platform.Function.UrlEncode(s)` | `a b/c?d=1&e=2+3;f` |
| `Platform.Function.UrlEncode(s, true)` | `a b/c?d%3d1%26e%3d2%2b3%3bf` |
| `encodeURI(s)` | `a+b/c?d=1&e=2+3;f` |
| `encodeURIComponent(s)` | `a+b%2fc%3fd%3d1%26e%3d2%2b3%3bf` |

The ECMAScript encoders rewrite the whole string; `UrlEncode` never touches the scheme, host, path or the first `?`. In the other direction `UrlEncode` is stricter — it escapes `~`, which `encodeURIComponent` leaves alone.

{% include test-script.html bundle="platform-functions--urlencode" chapter="comparison" %}

## Examples

```javascript
var baseURL = "http://www.example.com?value=12+3 12;3";
var encodedDefault = Platform.Function.UrlEncode(baseURL);
var encodedFull = Platform.Function.UrlEncode(baseURL, true);
Write(encodedDefault); // "http://www.example.com?value=12+3%2012;3"
Write(encodedFull);    // "http://www.example.com?value%3d12%2b3+12%3b3"
```

{% include test-script.html bundle="platform-functions--urlencode" chapter="examples" %}

## Notes

Because this function only encodes a query string, it cannot encode an arbitrary value. For AMPscript-style `URLEncode` with the additional operands (not exposed on `Platform.Function.UrlEncode`), call AMPscript via `TreatAsContent` — and note that only the **three**-operand form encodes an arbitrary string:

```javascript
Variable.SetValue("@val", myValue);
Platform.Function.TreatAsContent("%%[Set @encoded = URLEncode(@val, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

{% include test-script.html bundle="platform-functions--urlencode" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/ecmascript-builtins/global-functions/">encodeURI / encodeURIComponent</a></li>
  <li><a href="/platform-functions/base64encode/">Platform.Function.Base64Encode</a></li>
</ul>
</div>
