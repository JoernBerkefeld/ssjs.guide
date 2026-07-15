---
layout: page
title: Account
parent: Core Library
parent_url: /core-library/
description: Core library namespace for account-level settings and account tracking retrieval.
verification: in-progress
differs_from_docs: true
requires_core_load: true
---

The `Account` Core library namespace manages Marketing Cloud account configuration for the current context and exposes static helpers for account retrieval and updates.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Account.Init(key)`](#init) | AccountInstance | Bind to an account by external key |
| [`Account.Retrieve(filter)`](#retrieve) | object[] | Query accounts with a filter |
| [`<AccountInstance>.Update(properties)`](#instance-update) | string | Update the initialized account |
| [`Account.Tracking.Retrieve(filter)`](#tracking-retrieve) | object[] | Account-level send tracking data |

---

### Account.Init {#init}

{% include method-status.html status="verified" %}

Initializes an `Account` instance for the given external key. Call this before any instance method on the returned object.

#### Syntax

```javascript
Account.Init(key)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | Yes | External key of the account |

#### Return value

`AccountInstance` — an object bound to that account.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myAccount = Account.Init("MyCustomerKey");
```

---

### Account.Retrieve {#retrieve}

{% include method-status.html status="verified" %}

Retrieves account objects that match the filter (WSProxy-style `Property` / `SimpleOperator` / `Value` or a compatible filter object).

#### Syntax

```javascript
Account.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | Criteria used to search for the account |

#### Return value

`object[]` — a real array of account rows matching the filter. When nothing matches it returns an empty array (which is falsy in this engine, so guard with `.length` rather than truthiness).

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var getAcct = Account.Retrieve({ Property: "CustomerKey", SimpleOperator: "equals", Value: "MyAccount" });
```

---

### &lt;AccountInstance&gt;.Update {#instance-update}

{% include method-status.html status="in-progress" differs=true %}

Updates the account represented by the instance. If `properties` includes `TimeZoneID`, the account time zone is updated to that value.

#### Syntax

```javascript
<AccountInstance>.Update(properties)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | object | Yes | Account attributes to change |

#### Return value

`string` — `"OK"` on success. On failure the call returns the string `"Error"` (proven at runtime) instead of throwing.

{% include differs-from-docs.html note="The official docs state the call throws on failure, but at runtime it returns the plain string \"Error\" instead of throwing." %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myAccount = Account.Init("MyCustomerKey");
var status = myAccount.Update({ FromName: "Demo From Name" });
```

---

### Account.Tracking.Retrieve {#tracking-retrieve}

{% include method-status.html status="verified" %}

Returns tracking data for sends associated with accounts that match the filter. This is a static call on `Account.Tracking`; you do not need `Account.Init()` first.

#### Syntax

```javascript
Account.Tracking.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | Criteria used to narrow accounts / tracking rows |

#### Return value

`object[]` — tracking rows matching the filter. Each row exposes `Sends`, `Bounces`, `Clicks`, `Opens` and `Unsubscribes` counters (each an object such as `{ "Total": 0 }`).

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctTracking = Account.Tracking.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "MyAccount"
});
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/accountuser/">AccountUser</a></li>
</ul>
</div>
