---
layout: page
title: QueryDefinition
parent: Core Library
parent_url: /core-library/
description: Core library QueryDefinition — SQL query activities (add, retrieve, update, remove, perform).
verification: verified
requires_core_load: true
differs_from_docs: true
test_scripts: complete
type_mapping:
  ssjs: "QueryDefinition"
  soap: "QueryDefinition"
  mcdev: "query"
  gui: "SQL Query"
---

`QueryDefinition` manages **Query Activities**: SQL text, target Data Extension, update type, and execution via **`Perform("start")`**.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`QueryDefinition.Init(key)`](#init) | QueryDefinitionInstance | Bind by external key |
| [`QueryDefinition.Add(properties)`](#add) | string | Create a query definition |
| [`QueryDefinition.Retrieve(filter)`](#retrieve) | object[] | Query definitions (simple or compound filters) |
| [`<QueryDefinitionInstance>.Update(properties)`](#instance-update) | string | Update the initialized definition |
| [`<QueryDefinitionInstance>.Remove()`](#instance-remove) | string | Delete the definition |
| [`<QueryDefinitionInstance>.Perform(action)`](#instance-perform) | string | Run the query (`action`: `"start"`); returns `"QueryDefinition perform called successfully"`, not `"OK"` |

---

### QueryDefinition.Init {#init}

Initializes a QueryDefinition instance from its external key. Required before calling instance methods (`Update`, `Remove`, `Perform`).

#### Syntax

```javascript
QueryDefinition.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the query definition |

#### Return value

`QueryDefinitionInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var qd = QueryDefinition.Init("myQueryDef");
```

{% include test-script.html bundle="core-library--querydefinition" chapter="init" %}

---

### QueryDefinition.Add {#add}

{% include method-status.html status="verified" differs=true %}

Creates a new Query Activity. Optional `CategoryID` places the query in a folder.

{% include callout.html type="warning" content="With `TargetUpdateType: \"Overwrite\"`, the target Data Extension must **not** appear in the `QueryText` FROM clause — the official sample selects from the same DE used as `Target` and returns `\"Error\"` at runtime. Use a different source DE for Overwrite, or use `TargetUpdateType: \"Update\"` when reading and writing the same DE (the target DE must have at least one non-primary-key field)." %}

#### Syntax

```javascript
QueryDefinition.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `TargetUpdateType`, `TargetType`, `Target`, `QueryText`, … |

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="The official docs say failures throw. Runtime-verified: invalid payloads return the plain string `\"Error\"` instead of throwing — including the docs' Overwrite sample that SELECTs from the same Data Extension used as `Target`. Always compare the return value against `\"OK\"`." %}

{% include test-script.html bundle="core-library--querydefinition" chapter="add-returns-error" label="Show test script — Add failures return Error" %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var queryDef = {
    Name: "Example Query Definition",
    CustomerKey: "myQueryDef",
    TargetUpdateType: "Overwrite",
    TargetType: "DE",
    Target: { Name: "Example Target DE", CustomerKey: "example_target_de" },
    QueryText: "SELECT Pk FROM [SSJSGUIDE_TYPES]"
};
var status = QueryDefinition.Add(queryDef);
```

{% include test-script.html bundle="core-library--querydefinition" chapter="add" %}

---

### QueryDefinition.Retrieve {#retrieve}

Returns query definitions matching the filter.

#### Syntax

```javascript
QueryDefinition.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

#### Return value

`object[]` — may include nested `DataExtensionTarget` information.

#### Examples

```javascript
Platform.Load("Core", "1");
var result = QueryDefinition.Retrieve({
    Property: "Status",
    SimpleOperator: "equals",
    Value: "Active"
});
Write(Stringify(result));
```

{% include test-script.html bundle="core-library--querydefinition" chapter="retrieve" %}

---

### &lt;QueryDefinitionInstance&gt;.Update {#instance-update}

{% include method-status.html status="verified" differs=true %}

Updates attributes on the initialized query definition, including `QueryText`.

#### Syntax

```javascript
<QueryDefinitionInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Attributes to change (including `QueryText`) |

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="The official docs say failures throw. Runtime-verified: Update on a key that does not resolve returns the plain string `\"Error\"` instead of throwing. Always compare the return value against `\"OK\"`." %}

{% include test-script.html bundle="core-library--querydefinition" chapter="update-returns-error" label="Show test script — Update failures return Error" %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var qd = QueryDefinition.Init("myQueryDef");
var status = qd.Update({
    Name: "Updated Query Definition Name",
    QueryText: "SELECT Pk FROM [SSJSGUIDE_TYPES]"
});
```

{% include test-script.html bundle="core-library--querydefinition" chapter="instance-update" %}

---

### &lt;QueryDefinitionInstance&gt;.Remove {#instance-remove}

{% include method-status.html status="verified" differs=true %}

Deletes the query definition bound to this instance.

#### Syntax

```javascript
<QueryDefinitionInstance>.Remove()
```

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="The official docs say failures throw. Runtime-verified: Remove on a key that never existed returns the plain string `\"Error\"` instead of throwing. Confirm deletion with a follow-up Retrieve." %}

{% include test-script.html bundle="core-library--querydefinition" chapter="remove-returns-error" label="Show test script — Remove failures return Error" %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var qd = QueryDefinition.Init("myQueryDef");
var status = qd.Remove();
```

{% include test-script.html bundle="core-library--querydefinition" chapter="instance-remove" %}

---

### &lt;QueryDefinitionInstance&gt;.Perform {#instance-perform}

{% include method-status.html status="verified" differs=true %}

Runs the SQL and writes results to the configured target Data Extension. Use **`"start"`** as the action. The run is queued **asynchronously** — `Perform` returns as soon as the run is accepted, not when the query finishes.

#### Syntax

```javascript
<QueryDefinitionInstance>.Perform(action)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `action` | string | Yes | `"start"` |

#### Return value

`string` — `"QueryDefinition perform called successfully"` when the run is accepted. On failure returns an Exception string (does **not** throw).

{% include differs-from-docs.html note="The official docs annotate Perform as `@returns {Enum(\"OK\")}` and say failures throw. Runtime-verified on a live CloudPage: it returns the string `\"QueryDefinition perform called successfully\"` (not `\"OK\"`) when the run is accepted. The call queues the query asynchronously and returns immediately — the string only confirms acceptance, not completion. On an invalid / non-existent key it does **not** throw: it returns a failure string of the form `\"Exception occurred during [Schedule::Start] ErrorID = <number>\"`. Detect failure by inspecting the returned string, not by string-matching `\"OK\"` and not by relying on try/catch." %}

{% include test-script.html bundle="core-library--querydefinition" chapter="perform-returns-status" label="Show test script — Perform status string (not OK / not throw)" %}

#### Examples

```javascript
Platform.Load("core", "1");
var qd = QueryDefinition.Init("MY_QUERY_KEY");
var result = qd.Perform("start");
Write(Stringify(result)); // "QueryDefinition perform called successfully"
```

{% include test-script.html bundle="core-library--querydefinition" chapter="instance-perform" %}

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/dataextension/">DataExtension</a></li>
</ul>
</div>
