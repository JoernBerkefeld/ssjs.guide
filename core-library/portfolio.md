---
layout: page
title: Portfolio
parent: Core Library
parent_url: /core-library/
description: "Core library Portfolio — file / portfolio items (init, add, retrieve, update, remove). Deprecated — operates on legacy Classic Content / Classic Email Studio; prefer Content Builder assets for new work."
verification: in-progress
deprecated: true
requires_core_load: true
differs_from_docs: true
---

{% include callout.html type="warning" content="**Deprecated.** `Portfolio` is a legacy **Classic Content** / **Classic Email Studio** feature. Salesforce retired classic content creation and editing (Classic Content reached end of life on 24 Apr 2023), and **Content Builder** is now the single cross-channel content repository. SOAP-era Portfolio integrations only operate on the old Classic tools — prefer **Content Builder** assets (Asset REST endpoints) for new development." %}

`Portfolio` manages **portfolio** file objects in the account (display name, file location, category, and so on). These are Classic Content items and do **not** manage Content Builder assets.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Portfolio.Init(key)`](#init) | PortfolioInstance | Bind by external key |
| [`Portfolio.Add(properties)`](#add) | string | Create a portfolio item |
| [`Portfolio.Retrieve(filter)`](#retrieve) | object[] | Query portfolio objects |
| [`<PortfolioInstance>.Update(properties)`](#instance-update) | string | Update the initialized item |
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

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
```

---

### Portfolio.Add {#add}

{% include method-status.html status="in-progress" differs=true %}

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

{% include differs-from-docs.html note="Runtime-verification of the success path is BLOCKED — no portfolio item could be created on the test BU (no valid category/file to reference), so the success path could not be exercised. Every `Add()` attempt (including a full `DisplayName`/`CustomerKey`/`FileName`/`FileLocation` payload) returned the string `\"Error\"` and did NOT throw, whereas the docs say it returns `\"OK\"` or throws." %}

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

{% include method-status.html status="in-progress" differs=true %}

Queries portfolio items matching the given filter criteria.

#### Syntax

```javascript
Portfolio.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

#### Return value

`object[]`

{% include differs-from-docs.html note="Runtime-verification is BLOCKED — no portfolio item could be created on the test BU (no valid category/file to reference), so a populated array could not be produced. Against an empty account the call returned an `object` with no `.length` property (not a JS array), so the documented `object[]` shape could not be confirmed." %}

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

{% include method-status.html status="in-progress" differs=true %}

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

{% include differs-from-docs.html note="Runtime-verification of the success path is BLOCKED — no portfolio item could be created on the test BU (no valid category/file to reference), so Update could not be exercised against a real item. Against a non-existent key it returned the string `\"Error\"` and did NOT throw, whereas the docs say it returns `\"OK\"` or throws." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
var status = portObj.Update({ DisplayName: "Updated SSJS Image" });
```

---

### &lt;PortfolioInstance&gt;.Remove {#instance-remove}

{% include method-status.html status="in-progress" differs=true %}

Removes the initialized portfolio item.

#### Syntax

```javascript
<PortfolioInstance>.Remove()
```

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="Runtime-verification of the success path is BLOCKED — no portfolio item could be created on the test BU (no valid category/file to reference), so Remove could not be exercised against a real item. Against a non-existent key it returned the string `\"Error\"` and did NOT throw, whereas the docs say it returns `\"OK\"` or throws." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
var status = portObj.Remove();
```
