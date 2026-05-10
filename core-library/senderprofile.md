---
layout: page
title: SenderProfile
parent: Core Library
parent_url: /core-library/
description: Core library SenderProfile — from-name / from-address profiles (Core library has no Retrieve here).
---

`SenderProfile` manages **sender profiles** (From name, From address, etc.). **SenderProfile methods only run on CloudPages / landing pages** — they **cannot** run inside an email message at send time.

There is **no** `SenderProfile.Retrieve` in this Core namespace; use **Init** with a known key or query via WSProxy when you need discovery.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`SenderProfile.Init(key)`](#init) | SenderProfileInstance | Bind by external key |
| [`SenderProfile.Add(properties)`](#senderprofile-add) | string | Create a sender profile |
| [`<SenderProfileInstance>.Update(properties)`](#update) | string | Update the initialized profile |
| [`<SenderProfileInstance>.Remove()`](#remove) | string | Delete the profile |

---

## Init

### Syntax

```javascript
SenderProfile.Init(key)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key |

### Return value

`SenderProfileInstance`

### Examples

```javascript
Platform.Load("core", "1");
var myProfile = SenderProfile.Init("mySenderProfile");
```

---

## SenderProfile.Add

### Syntax

```javascript
SenderProfile.Add(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `Description`, `FromName`, `FromAddress`, … |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var newSP = {
    Name: "SSJS Added Send Profile",
    CustomerKey: "test_send_profile",
    Description: "An SSJS Added Profile",
    FromName: "Andrea Cruz",
    FromAddress: "acruz@example.com"
};
var status = SenderProfile.Add(newSP);
```

---

## Update

### Syntax

```javascript
<SenderProfileInstance>.Update(properties)
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
var myProfile = SenderProfile.Init("mySenderProfile");
var status = myProfile.Update({ Name: "SSJS Updated Sender Profile" });
```

---

## Remove

### Syntax

```javascript
<SenderProfileInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myProfile = SenderProfile.Init("mySenderProfile");
var status = myProfile.Remove();
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/deliveryprofile/">DeliveryProfile</a></li>
  <li><a href="/core-library/sendclassification/">SendClassification</a></li>
</ul>
</div>
