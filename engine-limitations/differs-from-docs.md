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
2. They list `emptyContentHandling`, `headerNames`, `headerValues`, and `statusVariable` as optional, but runtime testing shows **all six arguments are required**. Pass `null` for unused header arrays.

### Platform.Function.Base64Encode — standard interoperable Base64

[Reference: Platform.Function.Base64Encode](/platform-functions/base64encode/)

The official docs state the output "can only be decoded by the matching `Base64Decode()` function." Runtime testing shows the output is **standard, interoperable Base64** — any Base64 decoder (in any language) can decode it. There is nothing proprietary about the encoding.

### Platform.Function.Base64Decode — decodes any standard Base64

[Reference: Platform.Function.Base64Decode](/platform-functions/base64decode/)

The official docs imply this only decodes values produced by the matching `Base64Encode()` function. Runtime testing shows it **decodes any valid standard Base64 string**, regardless of how it was produced.

### Platform.Function.BeginImpressionRegion — name must be a literal

[Reference: Platform.Function.BeginImpressionRegion](/platform-functions/beginimpressionregion/)

The region name must be a **compile-time literal**. Passing a variable is rejected at runtime with a resolved-value (`ResolvedValueParameter`) error. The official docs describe the argument as an ordinary string and do not mention this literal-only restriction.

### Platform.Function.EndImpressionRegion — returns null, not void

[Reference: Platform.Function.EndImpressionRegion](/platform-functions/endimpressionregion/)

The official docs type the return as `void`, but at runtime the call always returns a genuine JS `null` (`typeof "object"`, strict `=== null` is `true`) — even when called with no matching `BeginImpressionRegion`. The optional `closeAll` argument accepts a boolean (string values are coerced).

### Platform.Function.AddObjectArrayItem — returns nothing

[Reference: Platform.Function.AddObjectArrayItem](/platform-functions/addobjectarrayitem/)

The official docs list a return value, but at runtime the call returns nothing (`undefined`). It appends the item to the object's array property **in place** — capture the mutated object, not a return value.

### Platform.Function.SetObjectProperty — returns null (not void), validates the property

[Reference: Platform.Function.SetObjectProperty](/platform-functions/setobjectproperty/)

The official docs type the return as `void`, but at runtime the call returns a genuine JS `null` (`typeof "object"`, strict `=== null` is `true`) on success. The property name is validated against the object's SOAP schema at set-time: setting an unknown property (or a value the property rejects) throws. The assigned property **cannot be read back from SSJS** — the object is a .NET **CLR host object** (`typeof "clr"`) and the engine blocks all introspection of it. Runtime-proven: dot and bracket property access both throw `Use of Common Language Runtime (CLR) is not allowed`, `for..in` yields zero keys, and both `Stringify()` and `String()` return only the type name (`"ExactTarget.Integration.WSDL.Subscriber"`) rather than the values. Pass the populated object straight into the consuming SOAP call instead.

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

### Platform.Function.InvokeRetrieve — returns object[] or null

[Reference: Platform.Function.InvokeRetrieve](/platform-functions/invokeretrieve/)

The official docs type the return value as an object, but at runtime the call returns an **array of result objects — or `null`** when the retrieve errors or matches no rows. The status message is written to `status[0]` and the request ID (a GUID) to `status[1]`. (The two-argument signature matches the docs; unlike its `InvokeExecute`/`InvokeExtract` siblings, the docs do not list an `options` argument here.)

### Platform.Function.InvokePerform — returns the OverallStatus string, not an object

[Reference: Platform.Function.InvokePerform](/platform-functions/invokeperform/)

The official docs type the return value as an object, but at runtime the call returns the **OverallStatus message as a string** (`"OK"` / `"Error: ..."`); the request details are written into the status array.

### Platform.Function.InvokeConfigure — returns the OverallStatus string, not an object

[Reference: Platform.Function.InvokeConfigure](/platform-functions/invokeconfigure/)

The official docs type the return value as an object, but at runtime the call returns the **OverallStatus message as a string** (`"OK"` / `"Error: ..."`); the request details are written into the status array.

### Platform.Function.InvokeExecute — undocumented arity, returns object[]

[Reference: Platform.Function.InvokeExecute](/platform-functions/invokeexecute/)

The official docs are wrong on two counts. **Signature:** they list a **third `options` argument**, but at runtime the function accepts **only two arguments** (`apiObject`, `status`) — passing a third throws an *"Unable to retrieve security descriptor for this frame"* error. **Return:** they type the return value as an object, but at runtime the call returns an **array of result objects**.

### Platform.Function.InvokeExtract — undocumented arity, returns the OverallStatus string

[Reference: Platform.Function.InvokeExtract](/platform-functions/invokeextract/)

The official docs are wrong on two counts. **Signature:** they list a **third `options` argument**, but at runtime the function accepts **only two arguments** (`apiObject`, `statusArray`) — passing a third throws an *"Unable to retrieve security descriptor for this frame"* error. **Return:** they type the return value as an object, but at runtime the call returns the **OverallStatus message as a string**.

### Platform.Function.InvokeSchedule — options argument optional (docs mark it required), returns the OverallStatus string

[Reference: Platform.Function.InvokeSchedule](/platform-functions/invokeschedule/)

The official docs are wrong on two counts. **Signature:** they mark the trailing **`options` argument as required** (five required arguments), but at runtime it is **optional** — a four-argument call (`apiObject`, `action`, `schedule`, `statusArray`) succeeds. **Return:** they type the return value as an object, but at runtime the call returns the **OverallStatus message as a string**; the request ID is written into the `statusArray`.

### Platform.Function.IsPhoneNumber — digits-only, no leading zero, no spaces

[Reference: Platform.Function.IsPhoneNumber](/platform-functions/isphonenumber/)

The official docs describe generic "valid phone number" validation, but at runtime the function enforces a stricter, specific format: **digits `0`–`9` only, no spaces, and no leading `0`**. To present any country's country code (including the US), you **omit** the leading `00`/`+` and write the country code as bare digits with no leading zero. Values containing spaces, a leading `0`, or a `+`/`00` international prefix return `false`. This is the **same** digits-only, no-leading-zero format that SFMC phone-number fields and the SMS (MobileConnect) service expect — a value that passes `IsPhoneNumber` is already in the shape those services accept.

### Platform.Function.LocalDateToSystemDate — returns a Date object, not a string

[Reference: Platform.Function.LocalDateToSystemDate](/platform-functions/localdatetosystemdate/)

The official docs type the return value as a `string`, but at runtime the call returns a genuine **`Date` object** (`typeof "object"`, `Object.prototype.toString` reports `[object Date]`, and `getFullYear()` / `getHours()` / `getTime()` all work). It only serializes to an ISO-like string (e.g. `2025-08-05T04:00:00.000`) when written or passed through `Stringify()`. The conversion strips daylight saving, so the same wall-clock local input yields a system hour one hour earlier in summer than in winter.

### Platform.Function.SystemDateToLocalDate — returns a Date object, not a string

[Reference: Platform.Function.SystemDateToLocalDate](/platform-functions/systemdatetolocaldate/)

The official docs type the return value as a `string`, but at runtime the call returns a genuine **`Date` object** (`typeof "object"`, `Object.prototype.toString` reports `[object Date]`, and `getFullYear()` / `getHours()` / `getTime()` all work) — symmetric with its sibling [`LocalDateToSystemDate`](/platform-functions/localdatetosystemdate/). It only serializes to an ISO-like string when written or passed through `Stringify()`. The conversion shifts system (Central, no daylight saving) time to the account/user local offset — the opposite direction to `LocalDateToSystemDate`.

### Platform.Function.Now — returns a Date object, not a string

[Reference: Platform.Function.Now](/platform-functions/now/)

The official docs describe the return as an RFC 2822-compliant date-time **string**, but at runtime the call returns a genuine **`Date` object** (`typeof "object"`, `Object.prototype.toString` reports `[object Date]`, and `getFullYear()` / `getMonth()` / `getTime()` all work). It only appears as the RFC 2822-style value (e.g. `Tue, 14 Jul 2026 17:59:40 GMT-06:00`) when coerced to a string during output. The time is in the account timezone (Central by default), not UTC. The optional `useContextTime` argument is truly optional (`Now()`, `Now(false)`, and `Now(true)` all work); outside a send context `Now(true)` equals `Now(false)`.

### Platform.Function.ParseJSON — string-only argument, returns string/null for scalars & invalid input

[Reference: Platform.Function.ParseJSON](/platform-functions/parsejson/)

The official docs are wrong on two counts:

1. They type the argument as `string or string[]` and describe passing an "array of strings". At runtime passing an array — or any non-string object — throws `System.InvalidOperationException` (*"Unable to retrieve security descriptor for this frame."*). Only a **single string argument** is accepted.
2. They give the return type as `object|object[]`. That is incomplete: JSON objects/arrays deserialise as expected, but a **scalar** JSON value (`"42"`, `'"hello"'`, `"true"`) is returned **unchanged as a string**, and **invalid**, **empty**, `null`, or `undefined` input returns a genuine JS **`null`** — it does **not** throw. Non-string scalar arguments (number, boolean) are coerced to their string form. The genuine throw case is a non-string object/array argument.

### Platform.Function.RaiseError — only message is required; errorCode/errorNumber not exposed on the caught error

[Reference: Platform.Function.RaiseError](/platform-functions/raiseerror/)

The official docs are wrong on two counts:

1. They mark `currentRecipientOnly`, `errorCode`, and `errorNumber` as **required**, but at runtime a single `message` argument raises correctly — those three are **optional** (`minArgs: 1`).
2. When the raised error is caught in a CloudPage `try`/`catch`, the exception exposes only `.message` (the passed text) and `.description` (an `ExactTarget.OMM.AMPScriptRaiseErrorException`); the `errorCode` and `errorNumber` values are **not** surfaced on the error object (`.errorCode` and `.number` read back `undefined`). The exception is a normal catchable object (`.name` is `"TypeError"`), so on a CloudPage `RaiseError` can be caught rather than fatally halting the page.

### Platform.Function.RedirectTo — returns the URL string, does not redirect from SSJS

[Reference: Platform.Function.RedirectTo](/platform-functions/redirectto/)

The official docs present `RedirectTo` as an email link-target helper with no documented return value. Proven at runtime from SSJS: it **returns the passed-in URL as a `string`** (not `void`); execution continues after the call and no HTTP redirect is issued in a CloudPage context. For CloudPage HTTP redirects use `Platform.Response.Redirect` instead.

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

## Core Library

### &lt;AccountInstance&gt;.Update — returns "Error", does not throw on failure

[Reference: Account](/core-library/account/)

The official docs state the call throws on failure, but at runtime `<AccountInstance>.Update(properties)` returns the plain string `"Error"` instead of throwing (the success return is the string `"OK"`).

### &lt;EmailInstance&gt;.Validate — Task.ValidationStatus is a string, not a boolean

[Reference: Email](/core-library/email/)

The official docs (and this page's earlier return-value table) type `Task.ValidationStatus` as a **boolean**, but at runtime `<EmailInstance>.Validate()` returns it as a **string** (e.g. `"Fail"`). Compare against string values, not `true`/`false`. The whole classic `Email` object (Init/Add/Retrieve/Update/Remove/Validate/CheckContent) is runtime-proven to work on a live CloudPage — it is **deprecated** (legacy classic Email Studio type) but not broken.

### ContentAreaObj.Add — returns an initialized instance, not "OK"

[Reference: ContentAreaObj](/core-library/contentareaobj/)

The official `Add` reference annotates the return as `@returns {Enum("OK")}`, but at runtime `ContentAreaObj.Add(properties)` returns an **initialized `ContentAreaObjInstance`** — an object exposing `Update`/`Remove`, identical in shape to `ContentAreaObj.Init`. This matches the doc's own H1 summary ("returns an initialized object") rather than the `@returns` annotation. Sibling methods `Retrieve` returns a host array (`[object Array]` with `.length`, but `instanceof Array` is `false`); `Update`/`Remove` return the string `"OK"`.

### Portfolio.Add / Update / Remove — return "Error", do not throw; Retrieve is not a JS array

[Reference: Portfolio](/core-library/portfolio/)

`Portfolio` is a legacy Classic file feature. The official docs state `Add`/`Update`/`Remove` return `"OK"` on success or throw on failure; at runtime, on the Content Builder-era test BU they return the plain string **`"Error"`** and do **not** throw. Their success path is **BLOCKED** for verification — no portfolio item could be created on the BU (every `Add` with a full payload returned `"Error"`). `Portfolio.Retrieve` returns an `object` with **no `.length`** property (not the documented `object[]` array) when the account has no portfolio items, so the array shape could not be confirmed. `Portfolio.Init` binds a key and returns a working instance object as documented. Treat any non-`"OK"` return as failure.

### &lt;QueryDefinitionInstance&gt;.Perform — returns a status string, not "OK"

[Reference: QueryDefinition](/core-library/querydefinition/)

The official docs annotate `<QueryDefinitionInstance>.Perform(action)` as `@returns {Enum("OK")}`, but at runtime `Perform("start")` returns the string **`"QueryDefinition perform called successfully"`** (not `"OK"`). The call **queues the query run asynchronously** and returns immediately — the string only confirms the run was accepted, not that the query finished. Detect failure via a thrown error, not by string-matching `"OK"`. The full `QueryDefinition` lifecycle (`Add` → `Retrieve` → `Update` → `Perform` → `Remove`) is runtime-proven on a live CloudPage; `Add`/`Update`/`Remove` return `"OK"` and `Retrieve` returns a real JS array (`[object Array]` with `.length`) as documented.

### DeliveryProfile.Add — returns a CLR object, not "OK"

[Reference: DeliveryProfile](/core-library/deliveryprofile/)

The official docs annotate `DeliveryProfile.Add(properties)` as returning the string `"OK"`. At runtime it returns a **CLR object** (`typeof` is `clr`; it stringifies to `ExactTarget.Integration.WSDL.DeliveryProfile`). Reading any property off it throws *"Use of Common Language Runtime (CLR) is not allowed"*, so the object is opaque from SSJS — treat any non-throwing return as success. Sibling instance methods `<DeliveryProfileInstance>.Update(properties)` and `<DeliveryProfileInstance>.Remove()` do return the string `"OK"` as documented. `DeliveryProfile.Retrieve` does not exist (`undefined`).

### SenderProfile.Add — returns a CLR object, not "OK"

[Reference: SenderProfile](/core-library/senderprofile/)

The official docs annotate `SenderProfile.Add(properties)` as returning the string `"OK"`. Runtime-verified on a live CloudPage: it returns a **CLR object** (`typeof` is `clr`; it stringifies to `ExactTarget.Integration.WSDL.SenderProfile`), not `"OK"`. Reading any property off it throws *"Use of Common Language Runtime (CLR) is not allowed"*, so the object is opaque from SSJS — treat any non-throwing return as success. This mirrors `DeliveryProfile.Add`. Sibling instance methods `<SenderProfileInstance>.Update(properties)` and `<SenderProfileInstance>.Remove()` return the string `"OK"` as documented; `SenderProfile.Init` binds a key and returns a working instance.

### DataExtension.Retrieve — filter is optional at runtime

[Reference: DataExtension](/core-library/dataextension/)

The official docs list the `filter` argument as **required**, but at runtime it is **optional**: calling `DataExtension.Retrieve()` with no arguments does not throw — it returns the full list of data extensions. A filter that matches nothing returns a **real empty array** (`Object.prototype.toString` reports `[object Array]`, `typeof .length` is `number`, `.length === 0`, zero enumerable keys) — not `null` and not `undefined`. Note the SFMC engine quirk that an empty array is **falsy** here, so guard on `.length` (`results.length > 0`) rather than truthiness of the array itself.

### &lt;DataExtensionInstance&gt;.Rows.Add / Update — return a row count, not "OK"

[Reference: DataExtension.Rows](/core-library/dataextension-rows/)

The official docs annotate `<DataExtensionInstance>.Rows.Add(rowData)` and `<DataExtensionInstance>.Rows.Update(rowData, whereFieldNames, whereValues)` as returning the string `"OK"`. At runtime both return a **number** — the count of rows added / updated. `Update` returns **`0` and does not throw** when the WHERE clause matches no rows (the docs imply it throws). `Add` also accepts a **single row object** in addition to an array of objects.

### &lt;DataExtensionInstance&gt;.Rows.Retrieve / Lookup — string vs typed values, empty-array vs null, and Retrieve works on CloudPages

[Reference: DataExtension.Rows](/core-library/dataextension-rows/)

Runtime-verified on a live CloudPage:

1. `<DataExtensionInstance>.Rows.Retrieve()` **without a filter DOES work on CloudPages** and returns all rows — the widely-repeated "returns empty on CloudPages" bug could not be reproduced.
2. `Retrieve` returns **every field value as a string** (even Number/Boolean/Date columns); `Lookup` returns **typed values**.
3. On no match, `Retrieve` returns an **empty array** (`.length === 0`) while `Lookup` returns **`null`**.
4. Both `Retrieve` and `Lookup` results are **host arrays**: `Object.prototype.toString` reports `[object Array]` and `.length` / index access work, but `instanceof Array` is `false`.

### &lt;DataExtensionInstance&gt;.Fields.Retrieve — field objects include an undocumented ObjectID

[Reference: DataExtension.Fields](/core-library/dataextension-fields/)

The official docs example response lists only `Name`, `FieldType`, `IsPrimaryKey`, `MaxLength`, `Ordinal`, and `DefaultValue`. At runtime each returned field object also carries an undocumented **`ObjectID`** (`string`) property. The collection is a genuine JS `Array` (`[object Array]`). Sibling methods `<DataExtensionInstance>.Fields.Add` and `<DataExtensionInstance>.Fields.UpdateSendableField` return the string `"OK"` on success and the string `"Error"` on failure — they do **not** throw, contrary to the docs' "throws on failure" wording.

### FilterDefinition.Add / Update / Remove — return "Error", do not throw on failure

[Reference: FilterDefinition](/core-library/filterdefinition/)

The official docs state these return `"OK"` on success or throw on failure. At runtime, on failure they return the plain string **`"Error"`** and do **not** throw. Their success path is **BLOCKED** for verification — a valid `FilterDefinition` could not be created on the test BU (creating one requires an audience/DataSource configuration the test account could not satisfy; every `Add` attempt with SubscriberList and DataExtension DataSources returned `"Error"`, and a direct WSProxy `createItem("FilterDefinition")` throws a SOAP inner exception *"Invalid property name: Type"* on `DataSource`). Treat a non-`"OK"` return as failure rather than relying on a thrown exception.

### FilterDefinition.Retrieve — empty array vs null on no-match is inconsistent

[Reference: FilterDefinition](/core-library/filterdefinition/)

Runtime-verified on a live CloudPage: `FilterDefinition.Retrieve(filter)` executes and returns a host array of matching definitions. The no-match return type is **inconsistent** — an `equals` filter that matches nothing returns an **empty array** (`.length === 0`), but an `isNotNull` filter returns **`null`** when no filter definitions exist on the account. Guard for both `null` and an empty array before reading `.length`.

### &lt;SendInstance&gt;.Tracking click & interval retrieval — Clicks.Retrieve / TotalByInterval.Retrieve, not ClickRetrieve / TotalByIntervalRetrieve

[Reference: Send](/core-library/send/)

The official docs document per-send tracking as `<SendInstance>.Tracking.ClickRetrieve(filter)` and `<SendInstance>.Tracking.TotalByIntervalRetrieve(type, startDate, endDate, groupBy)`. At runtime both of those names are `undefined`. The instance `Tracking` property is an object exposing two **sub-objects** — `Clicks` and `TotalByInterval` — each with a `Retrieve` method. The working calls are `<SendInstance>.Tracking.Clicks.Retrieve(filter)` and `<SendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)`. This mirrors the `TriggeredSend.Tracking.Clicks` / `TriggeredSend.Tracking.TotalByInterval` shape. The static `Send.Tracking.Retrieve(filter)` (no `Send.Init` required) is unaffected.

### &lt;SendInstance&gt;.CancelSend — returns "status", not "OK"

[Reference: Send](/core-library/send/)

The official docs describe `<SendInstance>.CancelSend()` as returning `"OK"` on success, but at runtime it returns the literal string **`"status"`** (runtime-verified on a live CloudPage — the send was cancelled successfully). Do not compare its return value against `"OK"`; treat any non-throwing return as success.

### Subscriber.Upsert / Subscriber.Statistics — instance methods, not static

[Reference: Subscriber](/core-library/subscriber/)

The official docs present `Subscriber.Upsert(properties)` and `Subscriber.Statistics(subscriberKey)` as **static** members of `Subscriber`. At runtime the static names are `undefined` (`typeof Subscriber.Upsert === "undefined"`, `typeof Subscriber.Statistics === "undefined"`). Both are actually **instance** methods on the object returned by `Subscriber.Init(subscriberKey)`: `<SubscriberInstance>.Upsert(properties)` and `<SubscriberInstance>.Statistics()` (the subscriber key comes from `Init`, so `Statistics` takes no argument).
