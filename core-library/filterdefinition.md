---
layout: page
title: FilterDefinition
parent: Core Library
parent_url: /core-library/
description: Core library FilterDefinition — create and manage data filter definitions for lists or Data Extensions.
verification: in-progress
requires_core_load: true
differs_from_docs: "Runtime-verified on a live CloudPage: Init and Retrieve are confirmed. Retrieve returns an empty array on an equals no-match but null on isNotNull when no definitions exist. Add/Update/Remove return the string \"Error\" on failure (they do NOT throw, contrary to the docs' \"returns OK or throws\"); their success path is BLOCKED — a valid FilterDefinition could not be created on the test BU (audience/DataSource configuration the account could not satisfy)."
---

`FilterDefinition` manages **filter definitions** used for audiences and queries. `DataSource.Type` must be `"SubscriberList"` or `"DataExtension"`. The `Filter` property accepts simple or compound filter structures.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`FilterDefinition.Init(key)`](#init) | FilterDefinitionInstance | Bind by external key |
| [`FilterDefinition.Add(properties)`](#add) | string | Create a filter definition |
| [`FilterDefinition.Retrieve(filter)`](#retrieve) | object[] | Query definitions |
| [`<FilterDefinitionInstance>.Update(properties)`](#instance-update) | string | Update the initialized definition |
| [`<FilterDefinitionInstance>.Remove()`](#instance-remove) | string | Delete the definition |

---

### FilterDefinition.Init {#init}

{% include method-status.html status="verified" %}

Initializes a `FilterDefinition` instance for the given external key.

#### Syntax

```javascript
FilterDefinition.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key |

#### Return value

`FilterDefinitionInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var fd = FilterDefinition.Init("myFilterDef");
```

---

### FilterDefinition.Add {#add}

{% include method-status.html status="in-progress" differs=true %}

Creates a new filter definition with the specified properties.

#### Syntax

```javascript
FilterDefinition.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `Filter`, `DataSource`, … |

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="Runtime-verification of the success path is BLOCKED — a valid FilterDefinition could not be created on the test BU (creating one needs an audience/DataSource configuration the account could not satisfy). Confirmed behaviour: on failure `Add()` returns the string `\"Error\"` and does NOT throw, whereas the docs say it returns `\"OK\"` or throws." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var filterObj = { Property: "LuckyNumber", SimpleOperator: "equals", Value: 77 };
var newFD = {
    Name: "SSJS Filter Definition",
    CustomerKey: "myFilterDef",
    Filter: filterObj,
    DataSource: { Type: "SubscriberList", CustomerKey: "example_list_key" }
};
var status = FilterDefinition.Add(newFD);
```

---

### FilterDefinition.Retrieve {#retrieve}

{% include method-status.html status="verified" differs=true %}

Queries filter definitions matching the given filter criteria.

#### Syntax

```javascript
FilterDefinition.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

#### Return value

`object[]` — the list of matching filter definitions. May be `null` when none exist.

{% include differs-from-docs.html note="Runtime-verified on a CloudPage. The no-match return type is inconsistent: an `equals` filter that matches nothing returns an empty array (`.length === 0`), but an `isNotNull` filter returns `null` when no filter definitions exist on the account. Guard for both `null` and an empty array." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var results = FilterDefinition.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "myFilterDef"
});
```

---

### &lt;FilterDefinitionInstance&gt;.Update {#instance-update}

{% include method-status.html status="in-progress" differs=true %}

Updates the initialized filter definition with the given properties.

#### Syntax

```javascript
<FilterDefinitionInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change |

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="Runtime-verification is BLOCKED — no valid FilterDefinition could be created on the test BU (see Add), so Update could not be exercised against a real definition. Against a non-existent definition it returned the string `\"Error\"` and did NOT throw, whereas the docs say it returns `\"OK\"` or throws." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var fd = FilterDefinition.Init("myFilterDef");
var status = fd.Update({ Name: "Updated Name" });
```

---

### &lt;FilterDefinitionInstance&gt;.Remove {#instance-remove}

{% include method-status.html status="in-progress" differs=true %}

Removes the initialized filter definition.

#### Syntax

```javascript
<FilterDefinitionInstance>.Remove()
```

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="Runtime-verification is BLOCKED — no valid FilterDefinition could be created on the test BU (see Add), so Remove could not be exercised against a real definition. Against a non-existent definition it returned the string `\"Error\"` and did NOT throw, whereas the docs say it returns `\"OK\"` or throws." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myFD = FilterDefinition.Init("myFilterDef");
myFD.Remove();
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/querydefinition/">QueryDefinition</a></li>
  <li><a href="/core-library/senddefinition/">Send.Definition</a></li>
</ul>
</div>
