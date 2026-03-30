---
layout: page
title: Platform.Load
parent: Platform Objects
parent_url: /platform-objects/
description: Loads a named SSJS library namespace (e.g. Core) into the current script execution context. Must be called before using any Core library objects.
---

## Syntax

```javascript
Platform.Load(libraryName, version);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `libraryName` | string | Yes | Library to load. Currently: `"core"` |
| `version` | string | Yes | Version string. Use `"1.1.5"` for current Core |

## Examples

```javascript
// Must be the first statement in your script
Platform.Load("core", "1.1.5");

// Now you can use Core library objects
var de = DataExtension.Init("MyDE");
var rows = de.Rows.Retrieve();
```

## Available Libraries

| Library | Version | Namespace Objects |
|---------|---------|-------------------|
| `"core"` | `"1.1.5"` | `DataExtension`, `Subscriber`, `List`, `Email`, `TriggeredSend`, `HTTP`, `Script.Util` |

## Notes

### Call Order is Critical

`Platform.Load` **must** be the first statement in your `<script runat="server">` block. If you call any Core library functions before `Platform.Load`, you will get a runtime error.

```javascript
// WRONG — will throw "Object doesn't support this property or method"
var de = DataExtension.Init("MyDE");
Platform.Load("core", "1.1.5");

// CORRECT
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("MyDE");
```

### Multiple Script Blocks

Each `<script runat="server">` block shares variable scope, but `Platform.Load` only needs to be called once. However, the block where Core is first used must have it loaded. Best practice is to have `Platform.Load` in the very first script block on the page.

### Version Numbers

The version `"1.1.5"` is the correct production version. Do not use `"1"` or `"1.1"` — while these may work, they may resolve to older builds with subtle differences.

{% include callout.html type="warning" content="Using the wrong version string (e.g., `\"1.1\"`) may load a less stable or older Core build. Always specify `\"1.1.5\"` explicitly." %}

### What Loading Core Enables

Loading Core gives you access to the following objects:

- [`DataExtension`](/core-library/dataextension/) — CRUD operations on Data Extensions
- [`Subscriber`](/core-library/subscriber/) — Subscriber management
- [`List`](/core-library/list/) — List management
- [`Email`](/core-library/email/) — Email send operations
- [`TriggeredSend`](/core-library/triggeredsend/) — Triggered Send sends
- [`HTTP`](/http/http-get/) — HTTP GET and POST
- [`Script.Util`](/http/script-util-httprequest/) — Advanced HTTP with request objects

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/getting-started/platform-vs-core/">Platform.Function vs Core Library</a></li>
  <li><a href="/core-library/">Core Library Reference</a></li>
</ul>
</div>
