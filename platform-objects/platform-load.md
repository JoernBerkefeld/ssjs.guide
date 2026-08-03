---
layout: page
title: Platform.Load
parent: Platform Objects
parent_url: /platform-objects/
description: Loads a named SSJS library namespace (e.g. Core) into the current script execution context. Must be called before using any Core library objects.
verification: verified
differs_from_docs: true
test_scripts: complete
---

### Platform.Load {#load}

Loads a named SSJS library namespace (for example Core) into the current script execution context. Must be called before using any Core library objects.

## Syntax

```javascript
Platform.Load(libraryName, version);
```

There is no bare-name `Load` global; `Platform.Load` is the only form.

{% include callout.html type="warning" content="`Platform.Load` returns the literal `null`, **not** `undefined` — despite being documented as a `void` function. Never test its result to decide whether the load succeeded; a failed load *throws* instead. See the note below." %}

{% include differs-from-docs.html note="The official documentation and this page's own earlier revision described `Platform.Load` as returning nothing (`void`). Runtime-verified: it returns the literal `null` — `typeof` is `\"object\"` and `result === null` is `true`." %}

{% include test-script.html bundle="platform-objects--platform-load" chapter="syntax" %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `libraryName` | string | Yes | Library to load. Currently: `"core"`. Matched case-insensitively (`"Core"` and `"CORE"` also work) |
| `version` | string | Yes | Version string. Use `"1.1.5"` for current Core |

An unknown `libraryName` throws, and the message echoes the name plus the parsed major/minor/revision numbers — useful when debugging a typo:

```
The requested JavaScript library version does not exist. Please check that the
library name and version information are valid.
  Library: bogus
  Major Version Number: 1
  Minor Version Number: 1
  Revision Version Number: 5
```

The `version` argument is validated in two stages, each with its own message: a non-numeric string such as `"latest"` fails the short-value parse, while an empty or `null` version fails an earlier "at least the major version number" check.

{% include differs-from-docs.html note="`libraryName` is documented as **Required**, but an empty string and `null` are both accepted *silently* — the call succeeds and becomes a no-op instead of raising an error. A typo that evaluates to `\"\"` or `null` is therefore swallowed, and the Core aliases simply never appear. Always pass a literal `\"core\"`." %}

{% include test-script.html bundle="platform-objects--platform-load" chapter="parameters" %}

## Examples

```javascript
// Must be the first statement in your script
Platform.Load("core", "1.1.5");

// Now you can use Core library objects
var de = DataExtension.Init("MyDE");
var rows = de.Rows.Retrieve();
```

{% include test-script.html bundle="platform-objects--platform-load" chapter="examples" %}

## Available Without Loading

{% include callout.html type="note" content="Runtime-verified: the `Platform.*` objects (`Platform.Request`, `Platform.Response`, `Platform.Variable`, `Platform.Recipient`, `Platform.Function.*`) are available **without** calling `Platform.Load`. Only the bare-name Core aliases (`DataExtension`, `Variable`, `Attribute`, `HTTP`, `Script.Util`, …) require it." %}

These objects report `typeof` `"clr"` (and `Platform.Load` itself reports `"clrmethodinfo"`) rather than the `"object"` / `"function"` a reader might expect — they are CLR host objects, not plain JavaScript values.

{% include test-script.html bundle="platform-objects--platform-load" chapter="available-without-load" %}

## Available Libraries

| Library | Version | Namespace Objects |
|---------|---------|-------------------|
| `"core"` | `"1.1.5"` | `DataExtension`, `Subscriber`, `List`, `Email`, `TriggeredSend`, `HTTP`, `Script.Util` |

`"core"` really is the only library — `"platform"` and `"wsproxy"` are both rejected.

{% include callout.html type="note" content="`Script` and `Script.Util` themselves report `typeof \"undefined\"` even when Core **is** loaded — only the leaf member (`Script.Util.HttpRequest`) reports a real type. A `typeof Script.Util` guard is therefore useless; probe the leaf member instead." %}

{% include test-script.html bundle="platform-objects--platform-load" chapter="available-libraries" %}

## Notes

### Call Order is Critical

`Platform.Load` must run **before the first use of any Core library object**. Call a Core alias before it and the bare name is simply not defined yet, so the call throws.

```javascript
// WRONG — DataExtension does not exist yet; throws "Object expected: Init"
var de = DataExtension.Init("MyDE");
Platform.Load("core", "1.1.5");

// CORRECT
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("MyDE");
```

The error names the member being reached for — `Object expected: Init` above, or `Object expected: Stringify` for a bare Core function. It is an ordinary catchable exception, so a pre-load call does not abort the page, and a later `Platform.Load` still works.

{% include callout.html type="note" content="`Platform.Load` does **not** have to be the literal first statement of the block — an earlier revision of this page said it did. Any number of non-Core statements (and even a failed Core call) may precede it. What matters is only that it precedes the first *successful* use of a Core alias. Putting it first is still the clearest habit." %}

{% include test-script.html bundle="platform-objects--platform-load" chapter="call-order-is-critical" %}

### Multiple Script Blocks

`Platform.Load` takes effect for the whole **request**, not just the block it appears in. Load Core in the first `<script runat="server">` block and every later block on the page can use the Core aliases with no load of its own. Variable and function scope is shared across the blocks too, and a redundant second `Platform.Load` is harmless.

{% include test-script.html bundle="platform-objects--platform-load" chapter="multiple-script-blocks" %}

### Version Numbers

Use `"1.1.5"` — it is the recommended production version. Several other strings are accepted as well: `"1"`, `"1.0"`, `"1.1"`, `"1.0.0"` and every revision from `"1.1.0"` through `"1.1.6"`. Anything above the highest published revision is rejected: `"1.1.7"` and up, `"1.2"` and `"1.3"` all throw, as do other major versions such as `"0"` and `"2"`.

A rejected load is **inert** — it throws, changes nothing, and never aborts the page. If Core was already loaded it stays fully usable, and loading the same library twice in one request is safe and idempotent.

{% include callout.html type="note" content="`32767` (the maximum `short` value) acts as a wildcard \"newest\" sentinel in the *minor* and *revision* slots — `\"1.1.32767\"`, `\"1.32767\"` and `\"1.0.32767\"` all load. It does **not** work in the major slot: `\"32767\"` alone is rejected like any other unknown major version. Relying on this is not recommended; pin `\"1.1.5\"` instead." %}

{% include callout.html type="warning" content="Prefer the explicit `\"1.1.5\"`. A short form such as `\"1\"` or `\"1.1\"` loads successfully but leaves the exact Core build unpinned, so the same script can resolve to a different revision over time." %}

{% include test-script.html bundle="platform-objects--platform-load" chapter="version-numbers" %}

### What Loading Core Enables

Loading Core gives you access to the following objects:

- [`DataExtension`](/core-library/dataextension/) — CRUD operations on Data Extensions
- [`Subscriber`](/core-library/subscriber/) — Subscriber management
- [`List`](/core-library/list/) — List management
- [`Email`](/core-library/email/) — Email send operations
- [`TriggeredSend`](/core-library/triggeredsend/) — Triggered Send sends
- [`HTTP`](/http/get/) — HTTP GET and POST
- [`Script.Util`](/http/script-util-httprequest/) — Advanced HTTP with request objects

The same load also enables members this list does not name, including `Attribute`, `Variable` and the bare-name aliases of the Platform functions (`Stringify`, `Now`, …).

{% include test-script.html bundle="platform-objects--platform-load" chapter="what-loading-core-enables" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/getting-started/platform-vs-core/">Platform.Function vs Core Library</a></li>
  <li><a href="/core-library/">Core Library Reference</a></li>
</ul>
</div>
