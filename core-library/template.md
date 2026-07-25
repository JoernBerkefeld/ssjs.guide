---
layout: page
title: Template
parent: Core Library
parent_url: /core-library/
description: Core library Template — HTML templates for messages (init, add, retrieve, update, remove).
verification: verified
deprecated: true
requires_core_load: true
type_mapping:
  ssjs: "Template"
  soap: "Template"
  mcdev: "-"
  gui: "Template"
---

{% include callout.html type="warning" content="**Deprecated.** `Template` is a legacy **Classic Content** / **Classic Email Studio** feature. Salesforce retired classic content creation and editing (Classic Content reached end of life on 24 Apr 2023), and **Content Builder** is now the single cross-channel content repository. SOAP-era Template integrations only operate on the old Classic tools — prefer **Content Builder** assets (Asset REST endpoints) for new development." %}

`Template` manages **template** definitions (`TemplateName`, `LayoutHTML`, customer key, etc.). Use `Retrieve` with optional `QueryAllAccounts: true` to search across accessible accounts.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Template.Init(key)`](#init) | TemplateInstance | Bind by external key |
| [`Template.Add(properties)`](#add) | string | Create a template |
| [`Template.Retrieve(filter)`](#retrieve) | object[] | Query templates |
| [`<TemplateInstance>.Update(properties)`](#instance-update) | string | Update the initialized template |

---

### Template.Init {#init}

Initializes a `Template` instance for the given external key.

#### Syntax

```javascript
Template.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key |

#### Return value

`TemplateInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var t = Template.Init("myTemplate");
```

---

### Template.Add {#add}

Creates a new template with the specified properties.

#### Syntax

```javascript
Template.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `TemplateName`, `LayoutHTML`, … |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1");
var myTemp = {
    CustomerKey: "test_template",
    TemplateName: "SSJS Test Template",
    LayoutHTML: "this is some HTML"
};
var status = Template.Add(myTemp);
```

---

### Template.Retrieve {#retrieve}

Queries templates matching the given filter. Pass `{ Filter: { Property, SimpleOperator, Value }, QueryAllAccounts: true }` to search all accessible accounts.

#### Syntax

```javascript
Template.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter (optionally with `QueryAllAccounts`) |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var getTemplate = Template.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "MyTemplate"
});
```

---

### &lt;TemplateInstance&gt;.Update {#instance-update}

Updates the initialized template with the given properties.

#### Syntax

```javascript
<TemplateInstance>.Update(properties)
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
var myTemplate = Template.Init("myTemplateCK");
var status = myTemplate.Update({ TemplateName: "Edited Template" });
```
