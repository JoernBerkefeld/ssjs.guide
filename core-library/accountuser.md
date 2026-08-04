---
layout: page
title: AccountUser
parent: Core Library
parent_url: /core-library/
description: Core library AccountUser — manage users in the business unit (init, add, retrieve, update, activate, deactivate).
verification: verified
test_scripts: complete
requires_core_load: true
type_mapping:
  ssjs: "AccountUser"
  soap: "AccountUser"
  mcdev: "user"
  gui: "User"
---

`AccountUser` manages **Marketing Cloud users** in the account: creating users, querying them, updating profile fields, and activating or deactivating a user. User records cannot be deleted via SSJS — use **Deactivate** as the removal path.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`AccountUser.Init(targetUserKey, myClientID)`](#init) | AccountUserInstance | Bind to a user by key and MID |
| [`AccountUser.Add(properties)`](#add) | string | Create a user |
| [`AccountUser.Retrieve(filter)`](#retrieve) | object[] | Query users |
| [`<AccountUserInstance>.Update(properties)`](#instance-update) | string | Update the initialized user |
| [`<AccountUserInstance>.Activate()`](#instance-activate) | string | Activate the user |
| [`<AccountUserInstance>.Deactivate()`](#instance-deactivate) | string | Deactivate the user |

---

### AccountUser.Init {#init}

{% include method-status.html status="verified" %}

Initializes an `AccountUser` instance bound to the given user external key and business unit MID.

#### Syntax

```javascript
AccountUser.Init(targetUserKey, myClientID)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetUserKey` | string | Yes | External key of the user |
| `myClientID` | string \| number | Yes | MID of the business unit |

#### Return value

`AccountUserInstance`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctUser = AccountUser.Init("myAccountUser", 123456789);
```

{% include test-script.html bundle="core-library--accountuser" chapter="init" %}

---

### AccountUser.Add {#add}

{% include method-status.html status="blocked" differs=true %}

{% include callout.html type="warning" content="No working invocation found at runtime. Probed against a Parent BU session: a short payload and the documented payload both returned the plain string `\"Error\"`, while a payload carrying additional AccountUser fields (`CustomerKey`, a nested `Client`) — or a non-object argument — threw the plain string `\"Error adding AccountUser\"`. The equivalent WSProxy `createItem(\"AccountUser\", …)` returned SOAP fault `ErrorCode 11001`, `StatusMessage \"User 0 does not have permission to edit ACCOUNTUSERS on account &lt;Parent BU&gt;.\"`. In the same run `Subscriber.Add` returned `\"OK\"` and `DataExtension.Retrieve` succeeded, so this is specific to AccountUser writes from this session rather than a general write failure." %}

Creates a new Marketing Cloud user with the specified properties.

#### Syntax

```javascript
AccountUser.Add(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | User fields (`Name`, `UserID`, `Password`, `Email`, `ClientID`, `DefaultBusinessUnitKey`, `AssociatedBusinessUnits`, …) |

#### Return value

`"OK"` on success. Observed returning the plain string `"Error"`, or throwing the plain string `"Error adding AccountUser"` for payloads carrying additional AccountUser fields, when the write does not succeed. Because it can throw a plain string (not an `Error` instance, so the caught value has no `.message`), wrap the call in `try`/`catch` and treat any non-`"OK"` return — and any throw — as failure.

#### Examples

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

{% include test-script.html bundle="core-library--accountuser" chapter="add" %}

---

### AccountUser.Retrieve {#retrieve}

{% include method-status.html status="verified" %}

Retrieves user records matching the given filter criteria.

#### Syntax

```javascript
AccountUser.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | Search criteria |

#### Return value

`object[]` — an array-like collection of `AccountUser` SOAP rows. Proven at runtime it exposes `.length` and `.push`, but it is **not** an `instanceof Array` in this engine, so guard with a `.length` check before indexing. On no match the same shape is returned with `.length` of `0` and stringifies as `[]`.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var accountUser = AccountUser.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "MyAccount"
});
```

{% include test-script.html bundle="core-library--accountuser" chapter="retrieve" %}

---

### &lt;AccountUserInstance&gt;.Update {#instance-update}

{% include method-status.html status="blocked" differs=true %}

{% include callout.html type="warning" content="No working invocation found at runtime. Probed against a Parent BU session: the Core call returned the plain string `\"Error\"`, and the equivalent WSProxy update returned SOAP fault `ErrorCode 11001`, `StatusMessage \"User 0 does not have permission to edit ACCOUNTUSERS on account &lt;Parent BU&gt;.\"`. Other writes in the same run (`Subscriber.Add`) succeeded, so this is specific to AccountUser writes from this session." %}

Updates the initialized user's profile with the given properties.

#### Syntax

```javascript
<AccountUserInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Fields to change |

#### Return value

`"OK"` on success. Observed returning (not throwing) the plain string `"Error"` when the write does not succeed, so treat any non-`"OK"` return as failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctUser = AccountUser.Init("myAccountUser", 123456789);
var status = acctUser.Update({ Password: "XXXXX" });
```

{% include test-script.html bundle="core-library--accountuser" chapter="instance-update" %}

---

### &lt;AccountUserInstance&gt;.Activate {#instance-activate}

{% include method-status.html status="blocked" differs=true %}

{% include callout.html type="warning" content="No working invocation found at runtime. Probed against a Parent BU session: the Core call returned the plain string `\"Error\"`, and the equivalent WSProxy write returned SOAP fault `ErrorCode 11001`, `StatusMessage \"User 0 does not have permission to edit ACCOUNTUSERS on account &lt;Parent BU&gt;.\"`. Other writes in the same run (`Subscriber.Add`) succeeded, so this is specific to AccountUser writes from this session." %}

Activates the initialized user account.

#### Syntax

```javascript
<AccountUserInstance>.Activate()
```

#### Return value

`"OK"` on success. Observed returning (not throwing) the plain string `"Error"` when the write does not succeed, so treat any non-`"OK"` return as failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctUser = AccountUser.Init("myAccountUser", 123456789);
var status = acctUser.Activate();
```

{% include test-script.html bundle="core-library--accountuser" chapter="instance-activate" %}

---

### &lt;AccountUserInstance&gt;.Deactivate {#instance-deactivate}

{% include method-status.html status="blocked" differs=true %}

{% include callout.html type="warning" content="No working invocation found at runtime. Probed against a Parent BU session: the Core call returned the plain string `\"Error\"`, and the equivalent WSProxy write returned SOAP fault `ErrorCode 11001`, `StatusMessage \"User 0 does not have permission to edit ACCOUNTUSERS on account &lt;Parent BU&gt;.\"`. Other writes in the same run (`Subscriber.Add`) succeeded, so this is specific to AccountUser writes from this session." %}

Deactivates the initialized user. Account users **cannot** be deleted via SSJS; deactivation is the supported "offboarding" path.

#### Syntax

```javascript
<AccountUserInstance>.Deactivate()
```

#### Return value

`"OK"` on success. Observed returning (not throwing) the plain string `"Error"` when the write does not succeed, so treat any non-`"OK"` return as failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctUser = AccountUser.Init("myAccountUser", 123456789);
var status = acctUser.Deactivate();
```

{% include test-script.html bundle="core-library--accountuser" chapter="instance-deactivate" %}

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/account/">Account</a></li>
</ul>
</div>
