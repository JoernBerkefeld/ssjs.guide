---
layout: page
title: SendClassification
parent: Core Library
parent_url: /core-library/
description: Core library SendClassification — ties a sender profile and delivery profile for compliant sends.
verification: verified
test_scripts: complete
differs_from_docs: true
requires_core_load: true
type_mapping:
  ssjs: "SendClassification"
  soap: "SendClassification"
  mcdev: "sendClassification"
  gui: "Send Classification"
---

`SendClassification` groups a **sender profile** and **delivery profile** for use when creating sends and send definitions. Updates must include **both** `SenderProfileKey` and `DeliveryProfileKey` in the properties object.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`SendClassification.Init(key)`](#init) | SendClassificationInstance | Bind by external key |
| [`SendClassification.Add(properties)`](#add) | object | Create a send classification |
| [`SendClassification.Retrieve(filter)`](#retrieve) | object[] | Query classifications |
| [`<SendClassificationInstance>.Update(properties)`](#instance-update) | string | Update (requires sender + delivery keys) |
| [`<SendClassificationInstance>.Remove()`](#instance-remove) | string | Delete the classification |

---

### SendClassification.Init {#init}

{% include method-status.html status="verified" %}

Initializes a `SendClassification` instance for the given external key.

#### Syntax

```javascript
SendClassification.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key |

#### Return value

`SendClassificationInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var sc = SendClassification.Init("mySendClassification");
```

{% include test-script.html bundle="core-library--sendclassification" chapter="init" %}

---

### SendClassification.Add {#add}

Creates a new send classification with the specified properties.

#### Syntax

```javascript
SendClassification.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, `Description`, `SenderProfileKey`, `DeliveryProfileKey` |

The `SenderProfileKey` and `DeliveryProfileKey` must reference existing profiles by external key; an unresolvable profile key makes the Add fail.

#### Return value

`object` — a CLR object on success. Its properties are not readable from SSJS; treat a non-throwing return as success and read the created record back with `SendClassification.Retrieve`.

{% include differs-from-docs.html note="Runtime-verified on a live CloudPage against real, owned `ssjs-senderprofile` + `ssjs-deliveryprofile` keys: `Add()` creates the record and returns a CLR object (`typeof` is `clr`; it stringifies to `ExactTarget.Integration.WSDL.SenderProfile`), not the string `\"OK\"` the docs imply. Enumerating its keys with `for..in` yields none and reading a property throws *\"Use of Common Language Runtime (CLR) is not allowed\"*. Treat any non-throwing return as success; a `SendClassification.Retrieve` immediately after Add returned the new record. This mirrors DeliveryProfile.Add and SenderProfile.Add." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var newSC = {
    CustomerKey: "mySCKey",
    Name: "SSJS Test SC",
    Description: "Test SSJS description",
    SenderProfileKey: "mySPKey",
    DeliveryProfileKey: "myDPKey"
};
SendClassification.Add(newSC);
```

{% include test-script.html bundle="core-library--sendclassification" chapter="add" %}

---

### SendClassification.Retrieve {#retrieve}

{% include method-status.html status="verified" %}

Queries send classifications matching the given filter criteria.

#### Syntax

```javascript
SendClassification.Retrieve(filter)
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
var results = SendClassification.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "mySendClassification"
});
```

{% include test-script.html bundle="core-library--sendclassification" chapter="retrieve" %}

---

### &lt;SendClassificationInstance&gt;.Update {#instance-update}

Updates the initialized send classification. You must include **both** `SenderProfileKey` and `DeliveryProfileKey` for the update to succeed.

{% include callout.html type="info" content="Runtime-verified on a live CloudPage against a real, owned send classification with both `SenderProfileKey` and `DeliveryProfileKey` supplied: `Update()` returned `\"OK\"` and a follow-up `SendClassification.Retrieve` confirmed the changed Description persisted. Both profile keys must resolve; calling `Update()` with no arguments or with unresolvable profile keys returns the string `\"Error\"` (not a throw)." %}

#### Syntax

```javascript
<SendClassificationInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Includes `SenderProfileKey` and `DeliveryProfileKey` |

#### Return value

`"OK"` on success; the string `"Error"` (not a throw) on failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var sc = SendClassification.Init("mySendClassification");
var updatedSC = {
    Name: "Updated Send Classification",
    SenderProfileKey: "mySPKey",
    DeliveryProfileKey: "myDPKey"
};
var status = sc.Update(updatedSC);
```

{% include test-script.html bundle="core-library--sendclassification" chapter="instance-update" %}

---

### &lt;SendClassificationInstance&gt;.Remove {#instance-remove}

Removes the initialized send classification.

{% include callout.html type="info" content="Runtime-verified on a live CloudPage: a throwaway send classification was created with `SendClassification.Add`, then `Remove()` returned `\"OK\"` and a follow-up `SendClassification.Retrieve` returned an empty array, confirming the record was deleted. Against a non-existent init'd key, `Remove()` returns the string `\"Error\"` (not a throw)." %}

#### Syntax

```javascript
<SendClassificationInstance>.Remove()
```

#### Return value

`"OK"` on success; the string `"Error"` (not a throw) on failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var sc = SendClassification.Init("mySendClassification");
var status = sc.Remove();
```

{% include test-script.html bundle="core-library--sendclassification" chapter="instance-remove" %}

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/senddefinition/">Send.Definition</a></li>
  <li><a href="/core-library/senderprofile/">SenderProfile</a></li>
  <li><a href="/core-library/deliveryprofile/">DeliveryProfile</a></li>
</ul>
</div>
