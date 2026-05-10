---
layout: page
title: DeliveryProfile
parent: Core Library
parent_url: /core-library/
description: Core library DeliveryProfile — create, update, and remove delivery profiles (no Retrieve in this namespace).
---

`DeliveryProfile` manages **delivery profiles** (routing / delivery settings used with send classifications). The Core library exposes `Init`, `Add`, `Update`, and `Remove` — there is **no** `DeliveryProfile.Retrieve` in this namespace; query profiles with WSProxy or another API if you need read access outside an instance.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`DeliveryProfile.Init(key)`](#init) | DeliveryProfileInstance | Bind by external key |
| [`DeliveryProfile.Add(properties)`](#deliveryprofile-add) | string | Create a delivery profile |
| [`<DeliveryProfileInstance>.Update(properties)`](#update) | string | Update the initialized profile |
| [`<DeliveryProfileInstance>.Remove()`](#remove) | string | Delete the profile |

---

## Init

### Syntax

```javascript
DeliveryProfile.Init(key)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the delivery profile |

### Return value

`DeliveryProfileInstance`

### Examples

```javascript
Platform.Load("core", "1");
var myProfile = DeliveryProfile.Init("myDeliveryProfile");
```

---

## DeliveryProfile.Add

### Syntax

```javascript
DeliveryProfile.Add(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | New profile (`Name`, `CustomerKey`, `Description`, `SourceAddressType`, …) |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var newDP = {
    Name: "SSJS Added Delivery Profile",
    CustomerKey: "test_delivery_profile",
    Description: "An SSJS Added Profile",
    SourceAddressType: "DefaultPrivateIPAddress"
};
var status = DeliveryProfile.Add(newDP);
```

---

## Update

### Syntax

```javascript
<DeliveryProfileInstance>.Update(properties)
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
var myProfile = DeliveryProfile.Init("myDeliveryProfile");
var status = myProfile.Update({ Name: "SSJS Updated Delivery Profile" });
```

---

## Remove

### Syntax

```javascript
<DeliveryProfileInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myProfile = DeliveryProfile.Init("myDeliveryProfile");
var status = myProfile.Remove();
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/senderprofile/">SenderProfile</a></li>
  <li><a href="/core-library/sendclassification/">SendClassification</a></li>
</ul>
</div>
