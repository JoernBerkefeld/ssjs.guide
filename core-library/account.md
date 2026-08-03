---
layout: page
title: Account
parent: Core Library
parent_url: /core-library/
description: Core library namespace for account-level settings and account tracking retrieval.
verification: verified
test_scripts: complete
differs_from_docs: true
requires_core_load: true
type_mapping:
  ssjs: "Account"
  soap: "Account"
  mcdev: "-"
  gui: "Business Unit"
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

`AccountInstance` — an object. Proven at runtime, the returned instance exposes a single enumerable member, the `Update` method, and stringifies as `{"Update":"function"}`. It carries no readable account fields — `inst.ID`, `inst.Name` and `inst.CustomerKey` all read back `undefined` — and the same stub is returned for **any** key value (a valid account CustomerKey, a numeric MID, an account Name, or even a nonsense string). Use the returned instance to call [`<AccountInstance>.Update(...)`](#instance-update); to read account fields use [`Account.Retrieve`](#retrieve).

{% include differs-from-docs.html note="Proven at runtime: Account.Init returns the same Update-only stub regardless of the key passed — a CustomerKey GUID, a numeric MID, a Name, or a nonsense key all yield an identical stub — so Init alone does not confirm whether a key resolves to a real account." %}

{% include test-script.html bundle="core-library--account" chapter="init" label="Show test script — the same Update-only stub is returned for any key" %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myAccount = Account.Init("MyCustomerKey");
var status = myAccount.Update({ FromName: "Demo From Name" });
```

{% include test-script.html bundle="core-library--account" chapter="init" %}

---

### Account.Retrieve {#retrieve}

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

`object[]` — on a match, an array-like collection of account rows. Proven at runtime, a match exposes `.length` and `.push` and stringifies as a JSON array (length `1`), but it is **not** an `instanceof Array` in this engine, so guard with a `.length` check before indexing. On no match the call returns the same array-like shape with `.length` of `0`; it still exposes `.push`, stringifies as `[]` and has no enumerable keys.

Proven at runtime, `Account.Retrieve` resolves **only the running session's own account**. Filtering it by `Property: "Name"` (equals the account name), `"ID"` (equals the account ID as either a numeric or a string form, or `greaterThan 0`), or `"CustomerKey"` (equals the account CustomerKey) each returns the running business unit's own row. Filtering for any **other** (child) business unit — by `Name`, by `ID`, or by `CustomerKey` (whether a GUID or a plain-string key) — returns the empty `[]` shape, as do the unrecognized properties `"MID"`, `"AccountID"` and `"BusinessUnitID"`.

A matched row is the full Account SOAP object. Observed fields include `Name`, `ID`, `CustomerKey`, `AccountType`, `ParentID`, `BrandID`, `PrivateLabelID`, `ReportingParentID`, `Email`, `FromName`, `BusinessName`, `Phone`, `Address`, `Fax`, `City`, `State`, `Zip`, `Country`, `IsActive`, `IsTestAccount`, `OrgID`, `DBID`, `ParentName`, `CustomerID`, `DeletedDate`, `EditionID`, `Children`, `Subscription`, `PrivateLabels`, `BusinessRules`, `AccountUsers`, `InheritAddress`, `IsTrialAccount`, `Locale`, `ParentAccount`, `TimeZone` (a nested object with `ID`/`Name`/`CustomerKey`), `Roles`, `StackID`, `SalesForceID`, `LanguageLocale`, `IndustryCode`, `Edition`, `SalesforceOrgID`, `AccountState`, `SubscriptionRestrictionFlags`, `Client`, `PartnerKey`, `PartnerProperties`, `CreatedDate`, `ModifiedDate`, `ObjectID`, `Owner`, `CorrelationID`, `ObjectState` and `IsPlatformObject`, plus a `*Specified` boolean companion for many numeric/date fields (for example `IDSpecified`, `ParentIDSpecified`, `CreatedDateSpecified`).

{% include differs-from-docs.html note="Proven at runtime: Account.Retrieve resolves only the running session's own account (via Name, ID as numeric or string, or CustomerKey). Requests for other business units returned a zero-length collection for every property and value tried, including child BUs by Name, ID, and CustomerKey. The properties MID, AccountID and BusinessUnitID are not recognized. Neither the matched nor the empty collection is an instanceof Array in this engine, so guard with a .length check before indexing." %}

{% include test-script.html bundle="core-library--account" chapter="retrieve" label="Show test script — only the own account resolves; the collection is not a real Array" %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
// Resolves the running session's own account by Name, ID, or CustomerKey
var getAcct = Account.Retrieve({ Property: "CustomerKey", SimpleOperator: "equals", Value: "MyAccountCustomerKey" });
if (getAcct && getAcct.length) {
    Platform.Response.Write(getAcct[0].Name);
}
```

{% include test-script.html bundle="core-library--account" chapter="retrieve" %}

---

### &lt;AccountInstance&gt;.Update {#instance-update}

{% include method-status.html status="blocked" differs=true %}

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

`string`. On failure the call **returns** the plain string `"Error"`; for one payload shape it instead **throws** the plain string `"Error Updating Account."` — proven at runtime; which one occurs depends on the payload. The documented success return is the string `"OK"`, but a success return was not reproduced at runtime in this project, and set→re-read cycles on the running BU showed no change persisted. Because it can throw a plain string (not an `Error` instance, so the caught value has no `.message`), wrap the call in `try`/`catch` and treat any non-`"OK"` return — and any throw — as failure.

{% include differs-from-docs.html note="Proven at runtime on the running session's own account (resolved via Account.Init(<self CustomerKey GUID>)): <AccountInstance>.Update returned typeof \"string\" value \"Error\" for every real single-field payload tried — CustomerKey, FromName, BusinessName, a CustomerKey-only object, an empty object {}, and an ID+CustomerKey object — and none of these writes persisted on re-read by ID (CustomerKey, FromName and BusinessName all kept their original values). CustomerKey was tested as a known-updatable field and still returned \"Error\" without persisting. The only object exposing an Update method is the Account.Init(...) stub; rows returned by Account.Retrieve have no Update method (typeof row.Update is \"undefined\", and calling it throws a Jint \"Object expected: Update\"). A Description payload throws the plain string \"Error Updating Account.\" (Description is not a real SOAP Account field). The \"OK\" success return was not reproduced." %}

{% include test-script.html bundle="core-library--account" chapter="instance-update" label="Show test script — every payload returns \"Error\" or throws, and nothing persists" %}

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var myAccount = Account.Init("MyCustomerKey");
var status = myAccount.Update({ FromName: "Demo From Name" });
```

{% include test-script.html bundle="core-library--account" chapter="instance-update" %}

---

### Account.Tracking.Retrieve {#tracking-retrieve}

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

`object[]` — an array-like collection of tracking rows matching the filter. Proven at runtime, each row exposes `Sends`, `Bounces`, `Clicks`, `Opens` and `Unsubscribes` counter objects, for example:

```json
[{"Sends":{"Total":0},"Bounces":{"Total":0,"HardBounces":0,"SoftBounces":0,"BlockBounces":0,"TechnicalBounces":0,"UnknownBounces":0},"Clicks":{"Total":0,"Unique":0},"Opens":{"Total":0,"Unique":0},"Unsubscribes":{"Unique":0}}]
```

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var acctTracking = Account.Tracking.Retrieve({
    Property: "CustomerKey",
    SimpleOperator: "equals",
    Value: "MyAccount"
});
```

{% include test-script.html bundle="core-library--account" chapter="tracking-retrieve" %}

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/accountuser/">AccountUser</a></li>
</ul>
</div>
