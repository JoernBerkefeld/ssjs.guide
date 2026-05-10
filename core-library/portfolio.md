---
layout: page
title: Portfolio
parent: Core Library
parent_url: /core-library/
description: Core library Portfolio — file / portfolio items in Content Builder (init, add, retrieve, update, remove).
---

`Portfolio` manages **portfolio** file objects in the account (display name, file location, category, and so on).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Portfolio.Init(key)`](#init) | PortfolioInstance | Bind by external key |
| [`Portfolio.Add(properties)`](#portfolio-add) | string | Create a portfolio item |
| [`Portfolio.Retrieve(filter)`](#portfolio-retrieve) | object[] | Query portfolio objects |
| [`<PortfolioInstance>.Update(properties)`](#update) | string | Update the initialized item |
| [`<PortfolioInstance>.Remove()`](#remove) | string | Delete the item |

---

## Init

### Syntax

```javascript
Portfolio.Init(key)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the portfolio item |

### Return value

`PortfolioInstance`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
```

---

## Portfolio.Add

### Syntax

```javascript
Portfolio.Add(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `DisplayName`, `CustomerKey`, `CategoryID`, `FileName`, `FileLocation`, … |

### Return value

`"OK"` on success.

### Examples

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

## Portfolio.Retrieve

### Syntax

```javascript
Portfolio.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObjArr = Portfolio.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "PortfolioObjectKey"
});
```

---

## Update

### Syntax

```javascript
<PortfolioInstance>.Update(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
var status = portObj.Update({ DisplayName: "Updated SSJS Image" });
```

---

## Remove

### Syntax

```javascript
<PortfolioInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var portObj = Portfolio.Init("myPortfolioCK");
var status = portObj.Remove();
```
