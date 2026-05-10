---
layout: page
title: DataExtension.Fields
parent: Core Library
parent_url: /core-library/
description: After DataExtension.Init — add fields, retrieve field definitions, update the sendable field mapping.
---

Use **`DataExtension.Init`** first, then **`de.Fields`** to manage columns: add fields, list definitions, or change which field maps to subscribers for sendable DEs.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`<DataExtensionInstance>.Fields.Add(properties)`](#fields-add) | string | Add a column |
| [`<DataExtensionInstance>.Fields.Retrieve()`](#fields-retrieve) | object[] | Field definitions |
| [`<DataExtensionInstance>.Fields.UpdateSendableField(deFieldName, subscriberField)`](#fields-updatesendablefield) | string | Map DE field to subscriber attribute |

---

## Fields.Add

### Syntax

```javascript
<DataExtensionInstance>.Fields.Add(properties)
```

`properties.Name` is required. `FieldType` accepts values such as `'Boolean'`, `'Date'`, `'Decimal'`, `'EmailAddress'`, `'Locale'`, `'Number'`, `'Phone'`, `'Text'`.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Field definition (`Name`, `CustomerKey`, `FieldType`, `MaxLength`, …) |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("SSJSTest");
var newField = {
    Name: "NewFieldV2",
    CustomerKey: "CustomerKey",
    FieldType: "Number",
    IsRequired: true,
    DefaultValue: "100"
};
var status = de.Fields.Add(newField);
```

---

## Fields.Retrieve

### Syntax

```javascript
<DataExtensionInstance>.Fields.Retrieve()
```

### Return value

`object[]` — field metadata for this Data Extension.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var birthdayDE = DataExtension.Init("birthdayDE");
var fields = birthdayDE.Fields.Retrieve();
```

---

## Fields.UpdateSendableField

### Syntax

```javascript
<DataExtensionInstance>.Fields.UpdateSendableField(deFieldName, subscriberField)
```

Updates which DE column relates the extension to **All Subscribers** for sending. `subscriberField` is **`"Subscriber Key"`** or **`"Subscriber Id"`**.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deFieldName` | string | Yes | Data extension field name to use for the relationship |
| `subscriberField` | string | Yes | `"Subscriber Key"` or `"Subscriber Id"` |

### Return value

`"OK"` on success (or throws on failure).

### Examples

```javascript
Platform.Load("core", "1.1.5");
var updateDE = DataExtension.Init("sendableDataExtension");
var status = updateDE.Fields.UpdateSendableField("DifferentSubKey", "Subscriber Key");
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/dataextension/">DataExtension</a></li>
  <li><a href="/core-library/dataextension-rows/">DataExtension rows</a></li>
</ul>
</div>
