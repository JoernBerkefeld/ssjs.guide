---
layout: page
title: FilterDefinition
parent: Core Library
parent_url: /core-library/
description: Core library FilterDefinition — create and manage data filter definitions for lists or Data Extensions.
---

`FilterDefinition` manages **filter definitions** used for audiences and queries. `DataSource.Type` must be `"SubscriberList"` or `"DataExtension"`. The `Filter` property accepts simple or compound filter structures.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`FilterDefinition.Init(key)`](#init) | FilterDefinitionInstance | Bind by external key |
| [`FilterDefinition.Add(properties)`](#filterdefinition-add) | string | Create a filter definition |
| [`FilterDefinition.Retrieve(filter)`](#filterdefinition-retrieve) | object[] | Query definitions |
| [`<FilterDefinitionInstance>.Update(properties)`](#update) | string | Update the initialized definition |
| [`<FilterDefinitionInstance>.Remove()`](#remove) | string | Delete the definition |

---

## Init

### Syntax

```javascript
FilterDefinition.Init(key)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key |

### Return value

`FilterDefinitionInstance`

### Examples

```javascript
Platform.Load("core", "1");
var fd = FilterDefinition.Init("myFilterDef");
```

---

## FilterDefinition.Add

### Syntax

```javascript
FilterDefinition.Add(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `Filter`, `DataSource`, … |

### Return value

`"OK"` on success.

### Examples

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

## FilterDefinition.Retrieve

### Syntax

```javascript
FilterDefinition.Retrieve(filter)
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
var results = FilterDefinition.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "myFilterDef"
});
```

---

## Update

### Syntax

```javascript
<FilterDefinitionInstance>.Update(properties)
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
var fd = FilterDefinition.Init("myFilterDef");
var status = fd.Update({ Name: "Updated Name" });
```

---

## Remove

### Syntax

```javascript
<FilterDefinitionInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

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
