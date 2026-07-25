---
layout: page
title: Portfolio
parent: Core Library
parent_url: /core-library/
description: "Core library Portfolio — file / portfolio items (init, add, retrieve, update, remove). Deprecated — operates on legacy Classic Content / Classic Email Studio; prefer Content Builder assets for new work."
verification: verified
deprecated: true
requires_core_load: true
differs_from_docs: true
type_mapping:
  ssjs: "Portfolio"
  soap: "Portfolio"
  mcdev: "-"
  gui: "Portfolio"
---

{% include callout.html type="warning" content="**Deprecated.** `Portfolio` is a legacy **Classic Content** / **Classic Email Studio** feature. Salesforce retired classic content creation and editing (Classic Content reached end of life on 24 Apr 2023), and **Content Builder** is now the single cross-channel content repository. SOAP-era Portfolio integrations only operate on the old Classic tools — prefer **Content Builder** assets (Asset REST endpoints) for new development." %}

`Portfolio` manages **portfolio** file objects in the account (display name, file location, category, and so on). These are Classic Content items and do **not** manage Content Builder assets.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Portfolio.Init(key)`](#init) | PortfolioInstance | Bind by external key |
| [`Portfolio.Add(properties)`](#add) | string | Create a portfolio item |
| [`Portfolio.Retrieve([filter])`](#retrieve) | object[] | Query portfolio objects |
| [`<PortfolioInstance>.Update(properties)`](#instance-update) | string | ❌ Update the initialized item — no working runtime invocation |
| [`<PortfolioInstance>.Remove()`](#instance-remove) | string | Delete the item |

---

### Portfolio.Init {#init}

{% include method-status.html status="verified" %}

Initializes a `Portfolio` instance for the given external key.

#### Syntax

```javascript
Portfolio.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the portfolio item |

#### Return value

`PortfolioInstance`

{% include callout.html type="info" content="`Init` never checks whether the key exists — it hands back an instance carrying `Update` and `Remove` even for an unknown key, and even when called with no argument at all. Use [`Portfolio.Retrieve`](#retrieve) to test for existence. The instance is a host object: passing it to `String()` (or otherwise stringifying it) throws `Object reference not set to an instance of an object`, so only call its methods. Both the `CustomerKey` and the `ObjectID` of an item are accepted as the key." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
```

---

### Portfolio.Add {#add}

{% include method-status.html status="verified" differs=true %}

Creates a new portfolio item with the specified properties.

#### Syntax

```javascript
Portfolio.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `DisplayName`, `CustomerKey`, `CategoryID`, `FileName`, `FileLocation`, … |

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="The docs say failures throw — they do NOT. Calling `Add()` with no argument returns the plain string `\"Error\"` instead of throwing, so always compare the return value against `\"OK\"` rather than relying on `try`/`catch`." %}

{% include callout.html type="info" content="Runtime-verified: a payload of `DisplayName` + `CustomerKey` + `CategoryID` + `FileName` + `FileLocation` creates the item and returns `\"OK\"`. `CategoryID` must reference an existing media / portfolio folder, and `FileLocation` must be a reachable URL whose file type matches the `FileName` extension — a mismatched extension makes the call return `\"Error\"`. A surplus second argument is accepted and ignored, and re-adding the same `CustomerKey` returns `\"OK\"` without creating a duplicate." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var newPortfolio = {
    DisplayName: "SSJS Portfolio Object",
    CustomerKey: "myPortfolioCK",
    CategoryID: 12345,
    FileName: "logo.png",
    FileLocation: "http://www.example.com/Portals/0/images/global/logo_main.png"
};
var status = Portfolio.Add(newPortfolio);
```

---

### Portfolio.Retrieve {#retrieve}

{% include method-status.html status="verified" differs=true %}

Queries portfolio items matching the given filter criteria.

#### Syntax

```javascript
Portfolio.Retrieve([filter])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | No | WSProxy-style filter. Omit it to retrieve every item |

#### Return value

`object[]`

{% include differs-from-docs.html note="The returned collection is array-**like** but not a real JavaScript array: `instanceof Array` is `false` even though `.length`, `.push` and `.slice` are present and index access works. Avoid `instanceof` checks and iterate with a classic `for` loop over `.length`. The `filter` argument is also optional in practice — calling `Retrieve()` with no argument returns every item — but passing a non-object (for example a string) throws `Error Retrieving Portfolios`." %}

{% include callout.html type="info" content="A filter that matches nothing yields a zero-length collection rather than `null`, so test `.length` instead of truthiness. Each item is a SOAP `Portfolio` object exposing `Source`, `CategoryID`, `FileName`, `DisplayName`, `Description`, `FileSizeKB`, `FileURL`, `ThumbURL`, `Client`, `CreatedDate`, `ModifiedDate`, `ID`, `ObjectID`, `CustomerKey` and the matching `*Specified` booleans." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObjArr = Portfolio.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "PortfolioObjectKey"
});
```

---

### &lt;PortfolioInstance&gt;.Update {#instance-update}

{% include method-status.html status="blocked" differs=true %}

Updates the initialized portfolio item with the given properties.

#### Syntax

```javascript
<PortfolioInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change |

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="**This method does not work at runtime.** The docs describe a working update, but no invocation shape was found that mutates the stored record — every attempt either returned the string `\"Error\"` or threw `Error Updating Portfolio`, while `Init`, `Add`, `Retrieve` and `Remove` all succeed on the very same item. Attempts covered instances from `Init(CustomerKey)` and `Init(ObjectID)`, single-field payloads (`{DisplayName}`, `{Description}`), payloads repeating the identifying fields (`{CustomerKey, DisplayName, CategoryID}`), payloads carrying the `ObjectID`, the full `Add`-shaped payload including `FileName` + `FileLocation`, an array-wrapped payload, and a no-op update writing the current `DisplayName` back onto a pre-existing (non-probe) item. There is no static `Portfolio.Update` either — that identifier is `undefined`." %}

{% include callout.html type="warning" content="To change a portfolio item, [`Remove`](#instance-remove) it and [`Add`](#add) it again, or use the Content Builder Asset REST endpoints. See [Known Bugs](/engine-limitations/known-bugs/#portfolioinstance-update-no-working-invocation)." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
// returns "Error" — see the note above
var status = portObj.Update({ DisplayName: "Updated SSJS Image" });
```

---

### &lt;PortfolioInstance&gt;.Remove {#instance-remove}

{% include method-status.html status="verified" differs=true %}

Removes the initialized portfolio item.

#### Syntax

```javascript
<PortfolioInstance>.Remove()
```

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="The return value is not a reliable success signal. Deleting an existing item does return `\"OK\"`, but so does calling `Remove()` again on the already-deleted item, or on an instance built from a key that never existed — the docs' `\"OK\"`-or-throw contract does not hold. Confirm deletion with a follow-up [`Retrieve`](#retrieve) rather than trusting the return value. A surplus argument is accepted and ignored." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
var status = portObj.Remove();
```
