---
layout: page
title: Differs from Official Docs
parent: Engine Limitations
parent_url: /engine-limitations/
description: Every SSJS function, object, and property whose runtime behavior in the SFMC engine differs from the official Salesforce documentation — return types, required arguments, null vs empty-string results, and more. Each entry is runtime-verified on a live CloudPage.
---

The official Salesforce SSJS documentation contains a number of inaccuracies: wrong return types, arguments listed as optional that are actually required, properties that exist but are undocumented, and members that behave differently than described. Every entry below has been **runtime-verified on a live CloudPage** and is flagged in the reference pages with a {% include callout.html type="warning" title="Differs from official Salesforce docs" content="…" %} note.

This page is the single, growing catalog of those discrepancies. Each row links to the method's main reference page, where the same discrepancy is documented inline.

{% include callout.html type="info" content="This differs from [Known Bugs](/engine-limitations/known-bugs/): entries here are cases where the docs are simply **inaccurate** about how a working feature behaves. Known Bugs covers features that are outright **broken** or that **do not exist at runtime** despite being documented." %}

## Globals

### Request (bare-name global) — more reliable than Platform.Request

[Reference: Request](/core-library/request/)

The bare-name global `Request` works after `Platform.Load("core", "1.1.5")` and is **more reliable than `Platform.Request` for `.URL()`**: `Request.URL()` returns the full request URL as a string, whereas `Platform.Request.URL()` throws *"Unable to retrieve security descriptor for this frame."* in CloudPages. Other members (`PagePath`, `Method`, `ApplicationID`, `PackageID`, `ApplicationBaseURL`) return CLR values (empty in a plain CloudPage GET, with `Method` = `"GET"`). Prefer the bare-name `Request` in CloudPages.

### Error — new Error("msg") does not expose .message

[Reference: Error](/ecmascript-builtins/error/)

Unlike standard JavaScript, a JS-constructed `new Error("msg")` in the SFMC Jint engine does **not** expose the message via `.message` — `err.message` reads back `undefined`, and `Stringify(err)` surfaces only a hidden `{jintException}` (the .NET stack), not the message. Recover the message with `String(err)` or `("" + err)` (both yield the constructor argument), or `err.toString()` (yields `"Error: undefined"`). This differs from **engine-raised** errors, which DO carry `.message` + `.description`. Do not rely on `new Error(...).message`.

### HTTPHeader (bare-name global) — separate inbound/outbound collections

[Reference: HTTPHeader](/core-library/httpheader/)

Available after `Platform.Load("core", ...)`. `GetValue` reads **inbound** request headers and returns `null` for a header you set via `SetValue` (separate inbound vs outbound collections). `Remove` returns `undefined`, not the `"OK"` string implied by some docs.

### Bare-name Core globals — only visible in the Platform.Load scope

[Reference: Redirect](/core-library/redirect/) · [Write](/core-library/write/) · [Stringify](/core-library/stringify/)

Every bare-name Core global (`Write`, `Stringify`, `Redirect`, `Base64Encode`, `Format`, …) is injected by `Platform.Load("core", ...)` **only into the scope where the load ran**. Inside nested helper-function bodies (or `eval()`) the bare name is `undefined`, even though the load already happened. The official docs show the top-scope example (`Platform.Load("Core", "1"); Redirect(...)`) but never mention this same-scope-only limitation. Use the `Platform.*` siblings (`Platform.Response.Write`, `Platform.Response.Redirect`, `Platform.Function.Stringify`, …) inside helpers — they work in any scope with no `Platform.Load`. (Detailed in [Known Bugs](/engine-limitations/known-bugs/#bare-name-redirect-does-not-exist).)

### ErrorUtil (bare-name global) — only in Core "1"

[Reference: ErrorUtil](/wsproxy/errorutil/)

`ErrorUtil` is provided **only** by `Platform.Load("Core", "1")`. Under newer Core versions (`"1.1.1"`, `"1.1.5"`, …) it is `undefined`. Effectively deprecated in Core > 1. Prefer checking `result.Status` and throwing `new Error(...)` instead of `ErrorUtil.ThrowWSProxyError`.

## Core Library bare-name functions

### Attribute.GetValue — works in CloudPages, returns "" when no recipient

[Reference: Attribute](/core-library/attribute/)

After `Platform.Load("Core", ...)` the `Attribute` object exists and `Attribute.GetValue(name)` executes and returns a string — it is **not** unavailable in CloudPages, contrary to what the docs imply. When no subscriber/attribute is in context (e.g. an anonymous CloudPage GET) it returns an **empty string** rather than throwing. In email/triggered-send/personalized contexts it returns the actual attribute value.

## Platform Functions

### Platform.Function.HTTPGet — returns the body, and all 6 args are required

[Reference: Platform.Function.HTTPGet](/platform-functions/httpget/)

The official docs are wrong on two counts:

1. They state this returns a **numeric status**, but it actually returns the **response body as a string**; the numeric status is written to the `statusVariable` out-parameter (`statusVariable[0]`).
2. They list `emptyContentHandling`, `headerNames`, `headerValues`, and `statusVariable` as optional, but runtime testing shows **all six arguments are required** — the call throws a security-descriptor error otherwise. Pass `null` for unused header arrays.

### Platform.Function.Base64Encode — standard interoperable Base64

[Reference: Platform.Function.Base64Encode](/platform-functions/base64encode/)

The official docs state the output "can only be decoded by the matching `Base64Decode()` function." Runtime testing shows the output is **standard, interoperable Base64** — any Base64 decoder (in any language) can decode it. There is nothing proprietary about the encoding.

### Platform.Function.Base64Decode — decodes any standard Base64

[Reference: Platform.Function.Base64Decode](/platform-functions/base64decode/)

The official docs imply this only decodes values produced by the matching `Base64Encode()` function. Runtime testing shows it **decodes any valid standard Base64 string**, regardless of how it was produced.

### Platform.Function.BeginImpressionRegion — name must be a literal

[Reference: Platform.Function.BeginImpressionRegion](/platform-functions/beginimpressionregion/)

The region name must be a **compile-time literal**. Passing a variable is rejected at runtime with a resolved-value (`ResolvedValueParameter`) error. The official docs describe the argument as an ordinary string and do not mention this literal-only restriction.

### Platform.Function.AddObjectArrayItem — returns nothing

[Reference: Platform.Function.AddObjectArrayItem](/platform-functions/addobjectarrayitem/)

The official docs list a return value, but at runtime the call returns nothing (`undefined`). It appends the item to the object's array property **in place** — capture the mutated object, not a return value.

### Platform.Function.Lookup — returns native types and null (not string / "")

[Reference: Platform.Function.Lookup](/platform-functions/lookup/)

The official docs type the return as a `string`, but at runtime `Lookup` returns the column's **native type**: Number/Decimal → `number`, Boolean → `boolean`, Date → a real `Date` object, Text/EmailAddress → `string`.

There are **three distinct empty-ish returns** — a strict `=== null` check catches only one of them:

| Situation | Value | `typeof` | `=== null` | `String()` |
|---|---|---|---|---|
| No matching row | genuine JS `null` | `object` | `true` | `"null"` |
| Row exists, field is empty/NULL | CLR null | `"clr"` | **`false`** | `""` |
| Field is populated | native value | native | `false` | value |

The empty/NULL-field case is the trap: it is **not** `=== null` and its `typeof` is the SFMC-only `"clr"`. Guard empty fields with a loose `== null` (which is `true` for both null forms) or a `String()`/truthiness coercion — never a strict `=== null`.

### Platform.Function.LookupRows / LookupOrderedRows — null on no-match, plus system fields

[Reference: LookupRows](/platform-functions/lookuprows/) · [LookupOrderedRows](/platform-functions/lookuporderedrows/)

Both return **`null`** (not an empty array `[]`) when no row matches — guard before reading `.length`. Each returned row object also carries two undocumented **system fields**: `_CustomObjectKey` (a `number`) and `_CreatedDate` (a `string`). When rows do match, the collection is a **genuine JavaScript `Array`** (`object[]`): `Array.isArray()` returns `true` and its **own** `.push`/`.slice`/`.sort` methods work — but `instanceof Array` is unreliable in the SFMC engine (it returns `false` even for a plain array literal), so test with the `Array.isArray` polyfill rather than `instanceof`. Note that **borrowed** `Array.prototype` methods fail on it: `Array.prototype.slice.call(rows)` throws *"Index was outside the bounds of the array."* — call the array's own `rows.slice(...)` instead.

### Platform.Function.InsertDE / UpdateDE / UpsertDE / DeleteDE — run on CloudPages, return null

[Reference: InsertDE](/platform-functions/insertde/) · [UpdateDE](/platform-functions/updatede/) · [UpsertDE](/platform-functions/upsertde/) · [DeleteDE](/platform-functions/deletede/)

The official docs restrict the `*DE` variants to **email contexts**, but at runtime all four **execute and commit** their write on a CloudPage too (verified within the same request and across requests). They return **`null`** rather than the affected-row count that the `*Data` variants return, so the `*Data` functions remain preferable outside email when you need the count.

### Platform.Function.UpsertData — no flat/variadic signature

[Reference: Platform.Function.UpsertData](/platform-functions/upsertdata/)

The official docs show a flat/variadic form (`UpsertData(deName, field1, value1, …, filterField, filterValue)`). That form is **not supported** — it throws at runtime. Only the array-based five-argument signature (`deName`, `whereFieldNames`, `whereFieldValues`, `fieldNames`, `fieldValues`) works.

### Data Extension functions — resolve by Name, not external key

[Reference: Lookup](/platform-functions/lookup/) · [LookupRows](/platform-functions/lookuprows/) · [LookupOrderedRows](/platform-functions/lookuporderedrows/) · [InsertData](/platform-functions/insertdata/) · [UpdateData](/platform-functions/updatedata/) · [UpsertData](/platform-functions/upsertdata/) · [DeleteData](/platform-functions/deletedata/) · [InsertDE](/platform-functions/insertde/) · [UpdateDE](/platform-functions/updatede/) · [UpsertDE](/platform-functions/upsertde/) · [DeleteDE](/platform-functions/deletede/)

All eleven `Platform.Function` Data Extension functions resolve the DE by its **Name** only. Passing the external key / CustomerKey throws *"A Data Extension of this name does not exist."* — verified per-function against a fixture whose CustomerKey deliberately differs from its Name. None of them accept the external key, and none accept both.

### Platform.Function.InvokeCreate — returns the OverallStatus string, not an object

[Reference: Platform.Function.InvokeCreate](/platform-functions/invokecreate/)

The official docs type the return value as an object, but at runtime the call returns the **OverallStatus message as a string** (`"OK"` / `"Error: ..."`). The request ID is written to `status[1]` and, on error, a numeric error code is written into the status array.

### Platform.Function.InvokeUpdate — returns the OverallStatus string, not an object

[Reference: Platform.Function.InvokeUpdate](/platform-functions/invokeupdate/)

The official docs type the return value as an object, but at runtime the call returns the **OverallStatus message as a string** (`"OK"` / `"Error: ..."`). The request ID is written to `status[1]` and, on error, a numeric error code is written into the status array.

### Platform.Function.InvokeDelete — returns the OverallStatus string, not an object

[Reference: Platform.Function.InvokeDelete](/platform-functions/invokedelete/)

The official docs type the return value as an object, but at runtime the call returns the **OverallStatus message as a string** (`"OK"` / `"Error: ..."`). The request ID is written to `status[1]` and, on error, a numeric error code is written into the status array.

### Platform.Function.InvokeRetrieve — 2 args, returns object[] or null

[Reference: Platform.Function.InvokeRetrieve](/platform-functions/invokeretrieve/)

The official docs type the return value as an object and list an optional third `options` argument, but at runtime the call takes **exactly two arguments** and returns an **array of result objects — or `null`** when the retrieve errors or matches no rows. The status message is written to `status[0]` and the request ID (a GUID) to `status[1]`.

### Platform.Function.InvokePerform — returns the OverallStatus string, not an object

[Reference: Platform.Function.InvokePerform](/platform-functions/invokeperform/)

The official docs type the return value as an object, but at runtime the call returns the **OverallStatus message as a string** (`"OK"` / `"Error: ..."`); the request details are written into the status array.

### Platform.Function.InvokeConfigure — returns the OverallStatus string, not an object

[Reference: Platform.Function.InvokeConfigure](/platform-functions/invokeconfigure/)

The official docs type the return value as an object, but at runtime the call returns the **OverallStatus message as a string** (`"OK"` / `"Error: ..."`); the request details are written into the status array.

### Platform.Function.InvokeExecute — 2 args, returns object[]

[Reference: Platform.Function.InvokeExecute](/platform-functions/invokeexecute/)

The official docs list an optional third `options` argument and type the return value as an object, but at runtime the call takes **exactly two arguments** and returns an **array of result objects**. Passing a third argument throws an *"Unable to retrieve security descriptor for this frame."* error.

### Platform.Function.InvokeExtract — 2 args, returns the OverallStatus string

[Reference: Platform.Function.InvokeExtract](/platform-functions/invokeextract/)

The official docs list an optional third `options` argument and type the return value as an object, but at runtime the call takes **exactly two arguments** and returns the **OverallStatus message as a string**. Passing a third argument throws an *"Unable to retrieve security descriptor for this frame."* error.

### Platform.Function.InvokeSchedule — statusArray required, returns the OverallStatus string

[Reference: Platform.Function.InvokeSchedule](/platform-functions/invokeschedule/)

The official docs type the return value as an object and imply `statusArray` is optional, but at runtime the call returns the **OverallStatus message as a string** and **requires** the `statusArray` argument — the request ID is written into it.

## Platform Objects

### Platform.Request.GetQueryStringParameter — returns null (not "") when absent

[Reference: Platform.Request](/platform-objects/platform-request/)

For an **absent** parameter this returns `null` (`typeof "object"`), **not** an empty string — the docs give no indication of the empty-vs-null behavior. A present parameter returns its string value. Guard reads with a truthiness / `!= null` check.

### Platform.Request.GetFormField — returns null (not "") when absent

[Reference: Platform.Request](/platform-objects/platform-request/)

For an **absent** field this returns `null` (`typeof "object"`), **not** an empty string.

### Platform.Request.GetCookieValue — returns null (not "") when absent

[Reference: Platform.Request](/platform-objects/platform-request/)

For an **absent** cookie this returns `null` (`typeof "object"`), **not** an empty string.

### Platform.Request.GetUserLanguages — throws in a plain CloudPage GET

[Reference: Platform.Request](/platform-objects/platform-request/)

Throws *"Unable to retrieve security descriptor for this frame."* in a plain CloudPage GET context. Wrap in `try/catch` or avoid; may only work in specific contexts.

### Platform.Variable.GetValue — returns null (not "") when never set

[Reference: Platform.Variable](/platform-objects/platform-variable/)

When the variable was **never set** this returns `null` (`typeof "object"`), **not** an empty string. A variable explicitly set to `""` returns `""`. The leading `@` is optional — `GetValue("v")` and `GetValue("@v")` return the same value. (The bare-name `Variable` alias only exists **after** `Platform.Load("core", ...)`.)

### Platform.Recipient.GetAttributeValue — returns "" outside a send, does not throw

[Reference: Platform.Recipient](/platform-objects/platform-recipient/)

Does **not** throw outside a send context — in a plain CloudPage it returns `""` (empty string, `typeof "string"`) for any attribute because no recipient is bound. The bare-name `Recipient` alias is **not** available even after `Platform.Load`; use `Platform.Recipient.GetAttributeValue(...)` (or `Attribute.GetValue(...)` after load).

## HTTP Functions

### Script.Util.HttpRequest.timeout — undocumented but works

[Reference: Script.Util.HttpRequest](/http/script-util-httprequest/)

Not listed as a configuration property in the official docs (which only mention that `send()` times out after 30 seconds), but the property exists and is applied at runtime.

### Script.Util.HttpRequest.emptyContentHandling — numeric, not boolean

[Reference: Script.Util.HttpRequest](/http/script-util-httprequest/)

The official docs type this as a **boolean**, but the runtime accepts only a **numeric** value (`0`/`1`/`2`) and rejects `true`/`false` — identical to `Script.Util.HttpGet`.

### Script.Util.HttpRequest response headers — not indexable

[Reference: Script.Util.HttpRequest](/http/script-util-httprequest/)

The official example reads a single header via `headers["..."]`, but that access throws *"Use of CLR is not allowed"* at runtime. Individual values are only readable by parsing the `for..in` enumeration keys (shaped `"[Name, Value]"`), not by indexing.

### Script.Util.HttpGet.timeout — undocumented but works

[Reference: Script.Util.HttpGet](/http/script-util-httpget/)

Not listed in the official docs, but the property exists and is applied end-to-end at runtime (same behavior as on `Script.Util.HttpRequest`).
