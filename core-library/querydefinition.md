---
layout: page
title: QueryDefinition
parent: Core Library
parent_url: /core-library/
description: Core library QueryDefinition — SQL query activities (add, retrieve, update, remove, perform).
---

`QueryDefinition` manages **Query Activities**: SQL text, target Data Extension, update type, and execution via **`Perform("start")`**.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`QueryDefinition.Init(key)`](#init) | QueryDefinitionInstance | Bind by external key |
| [`QueryDefinition.Add(properties)`](#querydefinition-add) | string | Create a query definition |
| [`QueryDefinition.Retrieve(filter)`](#querydefinition-retrieve) | object[] | Query definitions (simple or compound filters) |
| [`<QueryDefinitionInstance>.Update(properties)`](#update) | string | Update the initialized definition |
| [`<QueryDefinitionInstance>.Remove()`](#remove) | string | Delete the definition |
| [`<QueryDefinitionInstance>.Perform(action)`](#perform) | string | Run the query (`action`: `"start"`) |

---

## Init

### Syntax

```javascript
QueryDefinition.Init(key)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the query definition |

### Return value

`QueryDefinitionInstance`

### Examples

```javascript
Platform.Load("core", "1");
var qd = QueryDefinition.Init("myQueryDef");
```

---

## QueryDefinition.Add

### Syntax

```javascript
QueryDefinition.Add(properties)
```

Optional `CategoryID` places the query in a folder.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `TargetUpdateType`, `TargetType`, `Target`, `QueryText`, … |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var queryDef = {
    Name: "Example Query Definition",
    CustomerKey: "myQueryDef",
    TargetUpdateType: "Overwrite",
    TargetType: "DE",
    Target: { Name: "Example Target DE", CustomerKey: "example_target_de" },
    QueryText: "SELECT SubKey, Email, Name FROM [Example Target DE] where FavoriteItemID=77"
};
var status = QueryDefinition.Add(queryDef);
```

---

## QueryDefinition.Retrieve

### Syntax

```javascript
QueryDefinition.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

### Return value

`object[]` — may include nested `DataExtensionTarget` information.

### Examples

```javascript
Platform.Load("Core", "1");
var result = QueryDefinition.Retrieve({
    Property: "Status",
    SimpleOperator: "equals",
    Value: "Active"
});
Write(Stringify(result));
```

---

## Update

### Syntax

```javascript
<QueryDefinitionInstance>.Update(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change (including `QueryText`) |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var qd = QueryDefinition.Init("myQueryDef");
var status = qd.Update({
    Name: "Updated Query Definition Name",
    QueryText: "SELECT SubKey, Email, Name FROM [Example Target DE] where FavoriteItemID=12"
});
```

---

## Remove

### Syntax

```javascript
<QueryDefinitionInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var qd = QueryDefinition.Init("myQueryDef");
var status = qd.Remove();
```

---

## Perform

### Syntax

```javascript
<QueryDefinitionInstance>.Perform(action)
```

Runs the SQL and writes results to the configured target Data Extension. Use **`"start"`** as the action.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `action` | string | Yes | `"start"` |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1");
var qd = QueryDefinition.Init("MY_QUERY_KEY");
var result = qd.Perform("start");
Write(Stringify(result));
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/dataextension/">DataExtension</a></li>
</ul>
</div>
