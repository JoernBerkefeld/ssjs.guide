---
layout: page
title: ContentAreaObj
parent: Core Library
parent_url: /core-library/
description: Legacy ContentAreaObj Core library (deprecated) — classic Content Areas; prefer Content Builder.
requires_core_load: true
verification: verified
differs_from_docs: "Runtime-verified: ContentAreaObj.Add returns an initialized ContentAreaObjInstance (an object exposing Update/Remove, identical in shape to Init) — matching the docs' H1 summary (\"returns an initialized object\") but NOT the @returns {Enum(\"OK\")} annotation. Retrieve returns a host array ([object Array] with .length, but instanceof Array is false). Init/Add/Retrieve/Update/Remove all work at runtime after Platform.Load(\"core\",\"1.1.1\")."
---

{% include callout.html type="warning" content="**Deprecated.** Content Areas are a legacy Classic Content feature. Prefer Content Builder assets for new development." %}

`ContentAreaObj` targets **legacy Content Areas** (`Init`, `Add`, `Retrieve`, `Update`, `Remove`). Use only when you must support older assets; new development should use Content Builder.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.1\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`ContentAreaObj.Init(key)`](#init) | ContentAreaObjInstance | Bind by external key |
| [`ContentAreaObj.Add(properties)`](#add) | ContentAreaObjInstance | Create a content area |
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
Platform.Load("core", "1.1.1");
var area = ContentAreaObj.Init("myCA");
```

---

### ContentAreaObj.Add {#add}

Creates a new legacy Content Area with the specified properties and returns an initialized `ContentAreaObjInstance` bound to it.

{% include callout.html type="info" content="**Differs from official docs.** The official reference annotates `Add` as `@returns {Enum(\"OK\")}`, but runtime returns an **initialized `ContentAreaObjInstance`** (an object exposing `Update`/`Remove`, identical in shape to `Init`) — matching the doc's own H1 summary (\"returns an initialized object\"), not the `@returns` annotation." %}

#### Syntax

```javascript
ContentAreaObj.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, `CategoryID`, `Layout`, `Content`, … |

#### Return value

`ContentAreaObjInstance` — an initialized instance bound to the newly created content area (exposes `Update`/`Remove`). **Not** the string `"OK"`.

#### Examples

```javascript
Platform.Load("core", "1.1.1");
var exampleArea = {
    CustomerKey: "exampleArea",
    Name: "SSJS Content Area Example",
    CategoryID: 123456,
    Layout: "RawText",
    LayoutSpecified: true,
    Content: "<b>This is example content</b>"
};
var area = ContentAreaObj.Add(exampleArea);
```

---

### ContentAreaObj.Retrieve {#retrieve}

Queries content areas matching the given filter and returns them as an array.

#### Syntax

```javascript
ContentAreaObj.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

#### Return value

`object[]` — a host array of matching content areas (empty array when none match). It reports as `[object Array]` and exposes `.length`, but `instanceof Array` is `false` (host-backed collection).

#### Examples

```javascript
Platform.Load("core", "1.1.1");
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
Platform.Load("core", "1.1.1");
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
Platform.Load("core", "1.1.1");
var obj = ContentAreaObj.Init("myCA");
var status = obj.Remove();
```
