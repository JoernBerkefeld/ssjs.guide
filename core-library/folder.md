---
layout: page
title: Folder
parent: Core Library
parent_url: /core-library/
description: Core library Folder — create, query, update, and remove folders; bind instances by key or folder ID.
verification: verified
test_scripts: complete
requires_core_load: true
type_mapping:
  ssjs: "Folder"
  soap: "DataFolder"
  mcdev: "folder"
  gui: "Folder"
---

`Folder` manages **Content Builder / Email Studio folders**. Call `Folder.Init()` with no arguments when the folder has no external key, then **`SetID`** to bind by numeric folder ID.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Folder.Init([key])`](#init) | FolderInstance | Optional external key |
| [`Folder.Add(properties)`](#add) | string | Create a child folder |
| [`Folder.Retrieve(filter)`](#retrieve) | object[] | Query folders (simple or compound filters) |
| [`<FolderInstance>.Update(properties)`](#instance-update) | string | Update folder attributes |
| [`<FolderInstance>.Remove()`](#instance-remove) | string | Delete the folder |
| [`<FolderInstance>.SetID(id)`](#instance-setid) | void | Bind instance to folder ID when no external key |

---

### Folder.Init {#init}

Initializes a `Folder` instance, optionally bound to an external key. Omit the key and call `SetID()` when the folder has no external key.

#### Syntax

```javascript
Folder.Init([key])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | No | External key; omit and use `SetID()` when none exists |

#### Return value

`FolderInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var myFolder = Folder.Init("myFolder");
// When the folder has no external key:
var myIDFolder = Folder.Init();
myIDFolder.SetID(12345);
```

{% include test-script.html bundle="core-library--folder" chapter="init" %}

---

### Folder.Add {#add}

Creates a new folder with the specified properties.

#### Syntax

```javascript
Folder.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | `Name`, `CustomerKey`, `Description`, `ContentType`, `ParentFolderID`, … |

#### Return value

`"OK"` on success.

#### Examples

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

{% include test-script.html bundle="core-library--folder" chapter="add" %}

---

### Folder.Retrieve {#retrieve}

Queries folders matching the given filter. Supports compound filters and dot notation (e.g. `ParentFolder.Name`).

#### Syntax

```javascript
Folder.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1");
var folders = Folder.Retrieve({
    Property: "ParentFolder.Name",
    SimpleOperator: "equals",
    Value: "RewardsProgram"
});
Write(Stringify(folders));
```

{% include test-script.html bundle="core-library--folder" chapter="retrieve" %}

---

### &lt;FolderInstance&gt;.Update {#instance-update}

Updates the initialized folder with the given properties.

#### Syntax

```javascript
<FolderInstance>.Update(properties)
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
var myFolder = Folder.Init("myFolder");
var status = myFolder.Update({ Name: "Updated Folder Name" });
```

{% include test-script.html bundle="core-library--folder" chapter="instance-update" %}

---

### &lt;FolderInstance&gt;.Remove {#instance-remove}

Removes the initialized folder.

#### Syntax

```javascript
<FolderInstance>.Remove()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myFolder = Folder.Init("myFolder");
myFolder.Remove();
```

{% include test-script.html bundle="core-library--folder" chapter="instance-remove" %}

---

### &lt;FolderInstance&gt;.SetID {#instance-setid}

Binds the instance to a folder by numeric ID. Use after `Folder.Init()` with no key when targeting a folder that only has a numeric ID.

#### Syntax

```javascript
<FolderInstance>.SetID(id)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string \| number | Yes | Folder ID |

#### Return value

None (`void`).

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myIDFolder = Folder.Init();
myIDFolder.SetID(12345);
```

{% include test-script.html bundle="core-library--folder" chapter="instance-setid" %}
