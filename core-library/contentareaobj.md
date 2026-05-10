---
layout: page
title: ContentAreaObj
parent: Core Library
parent_url: /core-library/
description: Legacy ContentAreaObj Core library (deprecated) — classic Content Areas; prefer Content Builder.
---

{% include callout.html type="warning" content="**Deprecated.** Classic Content Areas are retired for most accounts. These APIs may fail or be read-only. Prefer Content Builder and related assets." %}

`ContentAreaObj` targets **legacy Content Areas** (`Init`, `Add`, `Retrieve`, `Update`, `Remove`). Use only when you must support older assets; new development should use Content Builder.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`ContentAreaObj.Init(key)`](#init) | ContentAreaObjInstance | Bind by external key |
| [`ContentAreaObj.Add(properties)`](#contentareaobj-add) | string | Create a content area |
| [`ContentAreaObj.Retrieve(filter)`](#contentareaobj-retrieve) | object[] | Query content areas |
| [`<ContentAreaObjInstance>.Update(properties)`](#update) | string | Update the initialized content area |
| [`<ContentAreaObjInstance>.Remove()`](#remove) | string | Delete the content area |

---

## Init

### Syntax

```javascript
ContentAreaObj.Init(key)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key |

### Return value

`ContentAreaObjInstance`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var area = ContentAreaObj.Init("myCA");
```

---

## ContentAreaObj.Add

### Syntax

```javascript
ContentAreaObj.Add(properties)
```

May fail where Content Areas have been fully retired.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, `CategoryID`, `Layout`, `Content`, … |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var exampleArea = {
    CustomerKey: "exampleArea",
    Name: "SSJS Content Area Example",
    CategoryID: 123456,
    Layout: "RawText",
    LayoutSpecified: true,
    Content: "<b>This is example content</b>"
};
var status = ContentAreaObj.Add(exampleArea);
```

---

## ContentAreaObj.Retrieve

### Syntax

```javascript
ContentAreaObj.Retrieve(filter)
```

Typically **read-only** on accounts where creation/update is disabled.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = ContentAreaObj.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "myCA"
});
```

---

## Update

### Syntax

```javascript
<ContentAreaObjInstance>.Update(properties)
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
var obj = ContentAreaObj.Init("myCA");
var status = obj.Update({ Name: "Name Updated By SSJS" });
```

---

## Remove

### Syntax

```javascript
<ContentAreaObjInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var obj = ContentAreaObj.Init("myCA");
var status = obj.Remove();
```
