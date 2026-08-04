---
layout: page
title: DeliveryProfile
parent: Core Library
parent_url: /core-library/
description: Core library DeliveryProfile — create, update, and remove delivery profiles (no Retrieve in this namespace).
verification: verified
test_scripts: complete
requires_core_load: true
differs_from_docs: true
type_mapping:
  ssjs: "DeliveryProfile"
  soap: "DeliveryProfile"
  mcdev: "deliveryProfile"
  gui: "Delivery Profile"
---

`DeliveryProfile` manages **delivery profiles** (routing / delivery settings used with send classifications). The Core library exposes `Init`, `Add`, `Update`, and `Remove` — there is **no** `DeliveryProfile.Retrieve` in this namespace; query profiles with WSProxy or another API if you need read access outside an instance.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`DeliveryProfile.Init(key)`](#init) | DeliveryProfileInstance | Bind by external key |
| [`DeliveryProfile.Add(properties)`](#add) | object | Create a delivery profile |
| [`<DeliveryProfileInstance>.Update(properties)`](#instance-update) | string | Update the initialized profile |
| [`<DeliveryProfileInstance>.Remove()`](#instance-remove) | string | Delete the profile |

---

### DeliveryProfile.Init {#init}

Initializes a `DeliveryProfile` instance for the given external key.

#### Syntax

```javascript
DeliveryProfile.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the delivery profile |

#### Return value

`DeliveryProfileInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var myProfile = DeliveryProfile.Init("myDeliveryProfile");
```

{% include test-script.html bundle="core-library--deliveryprofile" chapter="init" %}

---

### DeliveryProfile.Add {#add}

Creates a new delivery profile with the specified properties.

#### Syntax

```javascript
DeliveryProfile.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | New profile (`Name`, `CustomerKey`, `Description`, `SourceAddressType`, …) |

#### Return value

`object` — a CLR `DeliveryProfile` object on success. Its properties are not readable from SSJS; treat a non-throwing return as success.

{% include differs-from-docs.html note="Runtime-verified on a CloudPage: `Add()` returns a CLR object (`ExactTarget.Integration.WSDL.DeliveryProfile`), not the string `\"OK\"`. Reading a property off it throws *\"Use of Common Language Runtime (CLR) is not allowed\"*. Treat any non-throwing return as success." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var newDP = {
    Name: "SSJS Added Delivery Profile",
    CustomerKey: "test_delivery_profile",
    Description: "An SSJS Added Profile",
    SourceAddressType: "DefaultPrivateIPAddress"
};
var result = DeliveryProfile.Add(newDP);
```

{% include test-script.html bundle="core-library--deliveryprofile" chapter="add" %}

---

### &lt;DeliveryProfileInstance&gt;.Update {#instance-update}

Updates the initialized delivery profile with the given properties.

#### Syntax

```javascript
<DeliveryProfileInstance>.Update(properties)
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
var myProfile = DeliveryProfile.Init("myDeliveryProfile");
var status = myProfile.Update({ Name: "SSJS Updated Delivery Profile" });
```

{% include test-script.html bundle="core-library--deliveryprofile" chapter="instance-update" %}

---

### &lt;DeliveryProfileInstance&gt;.Remove {#instance-remove}

Removes the initialized delivery profile.

#### Syntax

```javascript
<DeliveryProfileInstance>.Remove()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myProfile = DeliveryProfile.Init("myDeliveryProfile");
var status = myProfile.Remove();
```

{% include test-script.html bundle="core-library--deliveryprofile" chapter="instance-remove" %}

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/senderprofile/">SenderProfile</a></li>
  <li><a href="/core-library/sendclassification/">SendClassification</a></li>
</ul>
</div>
