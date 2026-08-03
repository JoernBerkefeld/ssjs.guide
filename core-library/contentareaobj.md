---
layout: page
title: ContentAreaObj
parent: Core Library
parent_url: /core-library/
description: Legacy ContentAreaObj Core library (deprecated) — classic Content Areas; prefer Content Builder.
requires_core_load: true
verification: verified
test_scripts: complete
deprecated: true
differs_from_docs: true
type_mapping:
  ssjs: "ContentAreaObj"
  soap: "ContentArea"
  mcdev: "contentArea"
  gui: "Content Area"
---

{% include callout.html type="warning" content="**Deprecated.** `ContentAreaObj` is a legacy **Classic Content** / **Classic Email Studio** feature. Salesforce retired classic content creation and editing (Classic Content reached end of life on 24 Apr 2023), and **Content Builder** is now the single cross-channel content repository. SOAP-era ContentAreaObj integrations only operate on the old Classic tools — prefer **Content Builder** assets (Asset REST endpoints) for new development." %}

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

{% include test-script.html bundle="core-library--contentareaobj" chapter="init" %}

---

### ContentAreaObj.Add {#add}

Creates a new legacy Content Area with the specified properties and returns an initialized `ContentAreaObjInstance` bound to it.

{% include differs-from-docs.html note="The official reference annotates `Add` as `@returns {Enum(\"OK\")}`, but runtime returns an **initialized `ContentAreaObjInstance`** (an object exposing `Update`/`Remove`, identical in shape to `Init`) — matching the doc's own H1 summary (\"returns an initialized object\"), not the `@returns` annotation." %}

{% include test-script.html bundle="core-library--contentareaobj" chapter="add-returns-instance" label="Show test script — Add returns a working instance, never \"OK\"" %}

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

{% include test-script.html bundle="core-library--contentareaobj" chapter="add" %}

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

{% include test-script.html bundle="core-library--contentareaobj" chapter="retrieve" %}

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

`"OK"` on success, `"Error"` on failure — the call returns a status string rather than throwing.

{% include callout.html type="warning" content="**Calling `Update` on a key that does not exist is not a no-op.** It returns `\"Error\"` **and still creates an empty content area** under that external key, which you then have to `Remove` explicitly. (`<ContentAreaObjInstance>.Remove` creates nothing when it fails the same way.) Confirm the key resolves via `ContentAreaObj.Retrieve` before calling `Update`." %}

#### Examples

```javascript
Platform.Load("core", "1.1.1");
var obj = ContentAreaObj.Init("myCA");
var status = obj.Update({ Name: "Name Updated By SSJS" });
```

{% include test-script.html bundle="core-library--contentareaobj" chapter="instance-update" %}

---

### &lt;ContentAreaObjInstance&gt;.Remove {#instance-remove}

Removes the initialized content area.

#### Syntax

```javascript
<ContentAreaObjInstance>.Remove()
```

#### Return value

`"OK"` on success, `"Error"` on failure — the call returns a status string rather than throwing.

#### Examples

```javascript
Platform.Load("core", "1.1.1");
var obj = ContentAreaObj.Init("myCA");
var status = obj.Remove();
```

{% include test-script.html bundle="core-library--contentareaobj" chapter="instance-remove" %}
