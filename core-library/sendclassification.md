---
layout: page
title: SendClassification
parent: Core Library
parent_url: /core-library/
description: Core library SendClassification — ties a sender profile and delivery profile for compliant sends.
---

`SendClassification` groups a **sender profile** and **delivery profile** for use when creating sends and send definitions. Updates must include **both** `SenderProfileKey` and `DeliveryProfileKey` in the properties object.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`SendClassification.Init(key)`](#init) | SendClassificationInstance | Bind by external key |
| [`SendClassification.Add(properties)`](#sendclassification-add) | string | Create a send classification |
| [`SendClassification.Retrieve(filter)`](#sendclassification-retrieve) | object[] | Query classifications |
| [`<SendClassificationInstance>.Update(properties)`](#update) | string | Update (requires sender + delivery keys) |
| [`<SendClassificationInstance>.Remove()`](#remove) | string | Delete the classification |

---

## Init

### Syntax

```javascript
SendClassification.Init(key)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key |

### Return value

`SendClassificationInstance`

### Examples

```javascript
Platform.Load("core", "1");
var sc = SendClassification.Init("mySendClassification");
```

---

## SendClassification.Add

### Syntax

```javascript
SendClassification.Add(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `CustomerKey`, `Name`, `Description`, `SenderProfileKey`, `DeliveryProfileKey` |

### Return value

`"OK"` on success.

### Examples

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

---

## SendClassification.Retrieve

### Syntax

```javascript
SendClassification.Retrieve(filter)
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
var results = SendClassification.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "mySendClassification"
});
```

---

## Update

### Syntax

```javascript
<SendClassificationInstance>.Update(properties)
```

You must include **both** `SenderProfileKey` and `DeliveryProfileKey` for the update to succeed.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Includes `SenderProfileKey` and `DeliveryProfileKey` |

### Return value

`"OK"` on success.

### Examples

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

---

## Remove

### Syntax

```javascript
<SendClassificationInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var sc = SendClassification.Init("mySendClassification");
var status = sc.Remove();
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/senddefinition/">Send.Definition</a></li>
  <li><a href="/core-library/senderprofile/">SenderProfile</a></li>
  <li><a href="/core-library/deliveryprofile/">DeliveryProfile</a></li>
</ul>
</div>
