---
layout: page
title: Folder
parent: Core Library
parent_url: /core-library/
description: Core library Folder — create, query, update, and remove folders; bind instances by key or folder ID.
---

`Folder` manages **Content Builder / Email Studio folders**. Call `Folder.Init()` with no arguments when the folder has no external key, then **`SetID`** to bind by numeric folder ID.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Folder.Init([key])`](#init) | FolderInstance | Optional external key |
| [`Folder.Add(properties)`](#folder-add) | string | Create a child folder |
| [`Folder.Retrieve(filter)`](#folder-retrieve) | object[] | Query folders (simple or compound filters) |
| [`<FolderInstance>.Update(properties)`](#update) | string | Update folder attributes |
| [`<FolderInstance>.Remove()`](#remove) | string | Delete the folder |
| [`<FolderInstance>.SetID(id)`](#setid) | void | Bind instance to folder ID when no external key |

---

## Init

### Syntax

```javascript
Folder.Init([key])
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | No | External key; omit and use `SetID()` when none exists |

### Return value

`FolderInstance`

### Examples

```javascript
Platform.Load("core", "1");
var myFolder = Folder.Init("myFolder");
// When the folder has no external key:
var myIDFolder = Folder.Init();
myIDFolder.SetID(12345);
```

---

## Folder.Add

### Syntax

```javascript
Folder.Add(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `Description`, `ContentType`, `ParentFolderID`, … |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var newFolder = {
    Name: "Test Add Folder",
    CustomerKey: "test_folder_key",
    Description: "Test added",
    ContentType: "email",
    IsActive: "true",
    IsEditable: "true",
    AllowChildren: "false",
    ParentFolderID: 123456
};
var status = Folder.Add(newFolder);
```

---

## Folder.Retrieve

### Syntax

```javascript
Folder.Retrieve(filter)
```

Supports compound filters and dot notation (e.g. `ParentFolder.Name`).

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1");
var folders = Folder.Retrieve({
    Property: "ParentFolder.Name",
    SimpleOperator: "equals",
    Value: "RewardsProgram"
});
Write(Stringify(folders));
```

---

## Update

### Syntax

```javascript
<FolderInstance>.Update(properties)
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
var myFolder = Folder.Init("myFolder");
var status = myFolder.Update({ Name: "Updated Folder Name" });
```

---

## Remove

### Syntax

```javascript
<FolderInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myFolder = Folder.Init("myFolder");
myFolder.Remove();
```

---

## SetID

### Syntax

```javascript
<FolderInstance>.SetID(id)
```

Use after `Folder.Init()` with no key when targeting a folder that only has a numeric ID.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Folder ID |

### Return value

None (`void`).

### Examples

```javascript
Platform.Load("core", "1.1.5");
var myIDFolder = Folder.Init();
myIDFolder.SetID(12345);
```
