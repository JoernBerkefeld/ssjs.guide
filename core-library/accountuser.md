---
layout: page
title: AccountUser
parent: Core Library
parent_url: /core-library/
description: Core library AccountUser — manage users in the business unit (init, add, retrieve, update, activate, deactivate).
---

`AccountUser` manages **Marketing Cloud users** in the account: creating users, querying them, updating profile fields, and activating or deactivating a user. User records cannot be deleted via SSJS — use **Deactivate** as the removal path.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`AccountUser.Init(targetUserKey, myClientID)`](#init) | AccountUserInstance | Bind to a user by key and MID |
| [`AccountUser.Add(properties)`](#accountuser-add) | string | Create a user |
| [`AccountUser.Retrieve(filter)`](#accountuser-retrieve) | object[] | Query users |
| [`<AccountUserInstance>.Update(properties)`](#update) | string | Update the initialized user |
| [`<AccountUserInstance>.Activate()`](#activate) | string | Activate the user |
| [`<AccountUserInstance>.Deactivate()`](#deactivate) | string | Deactivate the user |

---

## Init

### Syntax

```javascript
AccountUser.Init(targetUserKey, myClientID)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetUserKey` | string | Yes | External key of the user |
| `myClientID` | number | Yes | MID of the business unit |

### Return value

`AccountUserInstance`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctUser = AccountUser.Init("myAccountUser", 123456789);
```

---

## AccountUser.Add

### Syntax

```javascript
AccountUser.Add(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | User fields (`Name`, `UserID`, `Password`, `Email`, `ClientID`, `DefaultBusinessUnitKey`, `AssociatedBusinessUnits`, …) |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var newUser = {
    Name: "Andrea Cruz",
    UserID: "acruz",
    Password: "insert new password here",
    Email: "acruz@example.com",
    ClientID: 123456789,
    DefaultBusinessUnitKey: "childBUKey",
    AssociatedBusinessUnits: ["childBUKey", "grandchildBUKey"]
};
var status = AccountUser.Add(newUser);
```

---

## AccountUser.Retrieve

### Syntax

```javascript
AccountUser.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | Search criteria |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var accountUser = AccountUser.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "MyAccount"
});
```

---

## Update

### Syntax

```javascript
<AccountUserInstance>.Update(properties)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Fields to change |

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctUser = AccountUser.Init("myAccountUser", 123456789);
var status = acctUser.Update({ Password: "XXXXX" });
```

---

## Activate

### Syntax

```javascript
<AccountUserInstance>.Activate()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctUser = AccountUser.Init("myAccountUser", 123456789);
var status = acctUser.Activate();
```

---

## Deactivate

### Syntax

```javascript
<AccountUserInstance>.Deactivate()
```

Account users **cannot** be deleted via SSJS; deactivation is the supported “offboarding” path.

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctUser = AccountUser.Init("myAccountUser", 123456789);
var status = acctUser.Deactivate();
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/account/">Account</a></li>
</ul>
</div>
