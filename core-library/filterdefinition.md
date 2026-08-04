---
layout: page
title: FilterDefinition
parent: Core Library
parent_url: /core-library/
description: Core library FilterDefinition — create and manage data filter definitions for lists or Data Extensions.
verification: verified
requires_core_load: true
differs_from_docs: true
test_scripts: complete
type_mapping:
  ssjs: "FilterDefinition"
  soap: "FilterDefinition"
  mcdev: "dataFilter"
  gui: "Data Filter"
---

`FilterDefinition` manages **filter definitions** used for audiences and queries. The read path (`Init`, `Retrieve`) is verified working. No working invocation of the write methods (`Add`, `Update`, `Remove`) was found in our CloudPage tests — they return the string `"Error"` or throw raw error strings regardless of payload shape. Create and manage filter definitions via mcdev (`dataFilter`), the REST endpoint `/email/v1/filters/filterdefinition/`, or a SOAP create instead.

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

{% include test-script.html bundle="core-library--filterdefinition" chapter="init" %}

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

Documented as `"OK"` on success. At runtime no working invocation was found: the documented simple-filter payload returns the string `"Error"` and creates nothing; a `DataFilter` property (instead of `Filter`) throws the raw string `"Error adding FilterDefinition"`.

{% include differs-from-docs.html note="No working invocation of `FilterDefinition.Add` was found on the QA CloudPage, even with payloads modelled on the working mcdev/REST implementation. With the owned source DE `SSJSGUIDE_TYPES` present, the documented simple-filter payload (`Filter: {Property, SimpleOperator, Value}` + `DataSource: {Type, CustomerKey}`) returns the plain string \"Error\" (`typeof === \"string\"`) and does not create a retrievable definition. The same \"Error\" return was observed with `CategoryID`, a capitalized `Equals` operator, a field-ObjectID `Property`, a `DataSource` given by ObjectID, a full `DataSource` object, and the docs' `SubscriberList` shape. REST-style payloads derived from the working mcdev `dataFilter` create call (`key`/`name`/`categoryId`/`filterDefinitionXml`/`derivedFromType`/`derivedFromObjectId`, and a PascalCase `FilterDefinitionXml` variant) THROW the raw string \"Error adding FilterDefinition\", as does any payload containing a `DataFilter` property. A LeftOperand/LogicalOperator/RightOperand complex `Filter` also returns \"Error\" (does not throw). The `Platform.Function.CreateObject(\"FilterDefinition\")` + `InvokeCreate` SOAP path fails in this context too (`Error` / \"The user does not have permission to perform this operation.\"). Filters can still be created outside Core, e.g. mcdev `dataFilter` deploy or the REST endpoint `/email/v1/filters/filterdefinition/` (create expects `key`, `name`, `categoryId`, `description`, `filterDefinitionXml`, `derivedFromType: 2`, `derivedFromObjectId`). The official docs imply Add returns \"OK\" or throws; the success path could not be reproduced. Note: `Add` is a STATIC method on `FilterDefinition`; the instance returned by `Init()` exposes only `Update` and `Remove`." %}

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

{% include test-script.html bundle="core-library--filterdefinition" chapter="add" %}

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

{% include test-script.html bundle="core-library--filterdefinition" chapter="retrieve" %}

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

{% include test-script.html bundle="core-library--filterdefinition" chapter="instance-update" %}

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

{% include test-script.html bundle="core-library--filterdefinition" chapter="instance-remove" %}

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/querydefinition/">QueryDefinition</a></li>
  <li><a href="/core-library/senddefinition/">Send.Definition</a></li>
</ul>
</div>
