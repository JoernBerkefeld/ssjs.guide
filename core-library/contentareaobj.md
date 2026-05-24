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
| [`ContentAreaObj.Add(properties)`](#add) | string | Create a content area |
| [`ContentAreaObj.Retrieve(filter)`](#retrieve) | object[] | Query content areas |
| [`<ContentAreaObjInstance>.Update(properties)`](#instance-update) | string | Update the initialized content area |
| [`<ContentAreaObjInstance>.Remove()`](#instance-remove) | string | Delete the content area |

---

### ContentAreaObj.Init {#init}

Initializes a `ContentAreaObj` instance for the given external key.

#### Syntax

```javascript
ContentAreaObj.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key |

#### Return value

`ContentAreaObjInstance`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var area = ContentAreaObj.Init("myCA");
```

---

### ContentAreaObj.Add {#add}

Creates a new legacy Content Area with the specified properties. May fail where Content Areas have been fully retired.

#### Syntax

```javascript
ContentAreaObj.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, `CategoryID`, `Layout`, `Content`, … |

#### Return value

`"OK"` on success.

#### Examples

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

### ContentAreaObj.Retrieve {#retrieve}

Queries content areas matching the given filter. Typically **read-only** on accounts where creation/update is disabled.

#### Syntax

```javascript
ContentAreaObj.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = ContentAreaObj.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "myCA"
});
```

---

### &lt;ContentAreaObjInstance&gt;.Update {#instance-update}

Updates the initialized content area with the given properties.

#### Syntax

```javascript
<ContentAreaObjInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var obj = ContentAreaObj.Init("myCA");
var status = obj.Update({ Name: "Name Updated By SSJS" });
```

---

### &lt;ContentAreaObjInstance&gt;.Remove {#instance-remove}

Removes the initialized content area.

#### Syntax

```javascript
<ContentAreaObjInstance>.Remove()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var obj = ContentAreaObj.Init("myCA");
var status = obj.Remove();
```
