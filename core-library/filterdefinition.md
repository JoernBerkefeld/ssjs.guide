---
layout: page
title: FilterDefinition
parent: Core Library
parent_url: /core-library/
description: Core library FilterDefinition — create and manage data filter definitions for lists or Data Extensions.
verification: verified
requires_core_load: true
differs_from_docs: true
type_mapping:
  ssjs: "FilterDefinition"
  soap: "FilterDefinition"
  mcdev: "dataFilter"
  gui: "Data Filter"
---

`FilterDefinition` manages **filter definitions** used for audiences and queries. For a simple (single-property) filter, supply a `Filter` field with `{Property, SimpleOperator, Value}` plus a top-level `DataSource: { Type: "DataExtension", CustomerKey }`. Complex, multi-condition filters (`{LeftOperand, LogicalOperator, RightOperand}`) are not supported by the Core `Add()` method and must be built via `Platform.Function.CreateObject("ComplexFilterPart"…)` + `InvokeCreate`, or via a SOAP create over `HTTP.Post`.

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

{% include method-status.html status="verified" differs=true %}

Creates a new filter definition with the specified properties.

#### Syntax

```javascript
FilterDefinition.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, a simple `Filter: {Property, SimpleOperator, Value}`, and `DataSource: {Type, CustomerKey}` |

`Add` is a **static** method on `FilterDefinition`. The instance returned by `Init()` exposes only `Update` and `Remove`.

#### Return value

`"OK"` on success — confirmed working at runtime with the simple-filter shape (`Filter: {Property, SimpleOperator, Value}` + a top-level `DataSource: {Type, CustomerKey}`). An unsupported complex/multi-condition payload throws the raw string `"Error adding FilterDefinition"` instead.

{% include differs-from-docs.html note="Runtime-verified against a real, owned source DE (`SSJSGUIDE_TYPES`) on the QA BU. `Add` is CONFIRMED WORKING at runtime with the SIMPLE-filter shape: a `Filter` field with `{Property, SimpleOperator, Value}` plus a top-level `DataSource: { Type: \"DataExtension\", CustomerKey }`. In that shape `FilterDefinition.Add()` creates the object and returns the string \"OK\". COMPLEX/multi-condition filters (conditions joined by `LeftOperand`/`LogicalOperator`/`RightOperand`, i.e. a `DataFilter`/`ComplexFilterPart` shape) are NOT supported by this Core method: at runtime `FilterDefinition.Add()` throws a raw string thrown value — `typeof e === \"string\"` with `String(e) === \"Error adding FilterDefinition\"` (no `.message`, `.description`, or `.name`). Build complex filters via `Platform.Function.CreateObject(\"SimpleFilterPart\"/\"ComplexFilterPart\"/\"FilterDefinition\")` + `SetObjectProperty` + `InvokeCreate(filterDef, result, null)`, or via a hand-rolled SOAP create over `HTTP.Post`. Confirmed discrepancy vs docs: the return/throw contract is shape-dependent. For a valid simple-filter payload `Add()` returns the string \"OK\"; for an unsupported complex shape it throws the plain string \"Error adding FilterDefinition\" rather than returning \"OK\" or throwing an Error object as the docs imply. Note: `Add` is a STATIC method on `FilterDefinition`; the instance returned by `Init()` exposes only `Update` and `Remove`." %}

#### Examples

```javascript
Platform.Load("core", "1");
var newFD = {
    Name: "SSJS Filter Definition",
    CustomerKey: "myFilterDef",
    Filter: { Property: "Pk", SimpleOperator: "equals", Value: "test" },
    DataSource: { Type: "DataExtension", CustomerKey: "SSJSGUIDE_TYPES" }
};
var status = FilterDefinition.Add(newFD);
```

---

### FilterDefinition.Retrieve {#retrieve}

{% include method-status.html status="verified" %}

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

`object[]` — the list of matching filter definitions; an empty array when nothing matches.

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

{% include method-status.html status="blocked" differs=true %}

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

`"OK"` on success. On failure the Core library returns the string `"Error"` for a metadata-only payload, or throws the raw string `"Error updating FilterDefinition"` when the payload includes a `Filter`.

{% include differs-from-docs.html note="Read path verified: `FilterDefinition.Init(\"ssjs-datafilter-test\")` returns an instance that exposes `Update` (`typeof === \"function\"`). No working invocation of `Update` was found: in our runtime tests the write method does not work. Runtime-tested against the OWNED, existing filter `ssjs-datafilter-test` with three payload shapes — so the failure is not a single malformed/incomplete payload; the method simply did not succeed with any shape tried: (1) a FULL Add-style payload (Name + CustomerKey + Description + `Filter: {Property, SimpleOperator, Value}` + `DataSource: {Type, CustomerKey}`) THREW the raw string \"Error updating FilterDefinition\" (`typeof === \"string\"`); (2) the same payload WITHOUT `DataSource` also THREW the raw string \"Error updating FilterDefinition\"; (3) a metadata-only payload (Name + CustomerKey + Description, no Filter/DataSource) returned the string \"Error\" (`typeof === \"string\"`, no throw). After each attempt a follow-up `FilterDefinition.Retrieve` confirmed Description was NOT changed (stayed empty) and the ObjectID was unchanged. Observed WSProxy fact (reported, not interpreted as a cause): the equivalent `updateItem(\"FilterDefinition\", { CustomerKey: \"ssjs-datafilter-test\", Description: \"...\" })` returned `Status=\"Error\"`. Note the SOAP describe (`mcdev soap FilterDefinition`) reports Name/Description/CustomerKey/DataFilter as `IsUpdatable: true`, i.e. the SOAP schema marks these fields editable, yet no working `Update` invocation was reproduced at runtime. The official docs imply Update returns \"OK\" or throws; the success (\"OK\") path could not be reproduced in our tests. On failure the return form varies: a payload containing `Filter` throws the raw string \"Error updating FilterDefinition\", while a metadata-only payload returns the string \"Error\"." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var fd = FilterDefinition.Init("ssjs-datafilter-test");
var status = fd.Update({ Description: "Updated description" });
```

---

### &lt;FilterDefinitionInstance&gt;.Remove {#instance-remove}

{% include method-status.html status="blocked" differs=true %}

Removes the initialized filter definition.

#### Syntax

```javascript
<FilterDefinitionInstance>.Remove()
```

#### Return value

`"OK"` on success. On failure the Core library returns the string `"Error"` (it does **not** throw).

{% include differs-from-docs.html note="Read path verified: `FilterDefinition.Init(\"ssjs-datafilter-test\")` returns an instance that exposes `Remove` (`typeof === \"function\"`). No working invocation of `Remove` was found: in our runtime tests the write method does not work. Runtime-tested against the OWNED, existing filter `ssjs-datafilter-test`: `<instance>.Remove()` returns the string \"Error\" (`typeof === \"string\"`) and does NOT throw, and a follow-up `FilterDefinition.Retrieve` confirms the object was NOT deleted (still returned, same ObjectID). The object was then restored from mcdev source to its original `Pk Equals \"test\"` condition. Observed WSProxy fact (reported, not interpreted as a cause): the equivalent `deleteItem(\"FilterDefinition\", …)` returned `Status=\"Error\"`. The success (\"OK\") path could not be reproduced in our tests. Consistent with the sibling write methods, failure surfaces as the string \"Error\" rather than the docs' \"OK\"/throw." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myFD = FilterDefinition.Init("ssjs-datafilter-test");
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
