---
layout: page
title: Send
parent: Core Library
parent_url: /core-library/
description: Core library Send — create and manage sends, cancel a send, and retrieve aggregate or per-send tracking.
verification: verified
differs_from_docs: true
requires_core_load: true
---

The `Send` namespace covers **user-initiated sends**: creating sends from an email and lists, retrieving send rows, listing targeted lists, canceling a send, and accessing tracking (including static `Send.Tracking.Retrieve` and instance helpers on `send.Tracking`).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

{% include callout.html type="info" content="Per-send click and interval tracking live on <strong>sub-objects</strong> of the instance `Tracking` property: <code>&lt;SendInstance&gt;.Tracking.Clicks.Retrieve(filter)</code> and <code>&lt;SendInstance&gt;.Tracking.TotalByInterval.Retrieve(...)</code>. The Salesforce-documented names <code>ClickRetrieve</code> / <code>TotalByIntervalRetrieve</code> are <code>undefined</code> at runtime — see <a href=\"/engine-limitations/differs-from-docs/\">Differs from docs</a>." %}

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| [`Send.Init(id)`](#init) | SendInstance | Bind to a send by numeric ID |
| [`Send.Add(emailKey, listIds[, options])`](#add) | string | Create a send |
| [`Send.Retrieve(filter)`](#retrieve) | object[] | Query sends |
| [`Send.RetrieveLists(filter)`](#retrievelists) | object[] | Lists targeted by matching sends |
| [`<SendInstance>.Remove()`](#instance-remove) | string | Delete the bound send |
| [`<SendInstance>.CancelSend()`](#instance-cancelsend) | string | Attempt to cancel the send |
| [`Send.Tracking.Retrieve(filter)`](#tracking-retrieve) | object[] | Tracking rows (static; no `Send.Init` required) |
| [`<SendInstance>.Tracking.Clicks.Retrieve(filter)`](#instance-tracking-clicks-retrieve) | object[] | Click tracking for this send |
| [`<SendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)`](#instance-tracking-totalbyinterval-retrieve) | object[] | Aggregated tracking by interval |

---

### Send.Init {#init}

Initializes a send instance from its numeric send ID. Required before calling instance methods such as `Remove()`, `CancelSend()`, or `Tracking.*`.

#### Syntax

```javascript
Send.Init(id)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Numeric ID of the send |

#### Return value

`SendInstance`

#### Examples

```javascript
Platform.Load("core", "1");
var s = Send.Init(12345);
```

---

### Send.Add {#add}

Creates a send for the given email customer key and list IDs. Optional `options` can override From name, From address, subject, send time, etc.

#### Syntax

```javascript
Send.Add(emailKey, listIds[, options])
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailKey` | string | Yes | Customer key of the email |
| `listIds` | array | Yes | Array of list IDs |
| `options` | object | No | Send-time overrides |

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var status = Send.Add("test_email", [12345, 12346]);
var options = {
    FromName: "JSON Specified Name",
    FromAddress: "aruiz@example.com",
    Subject: "JSON Test Mail"
};
var status2 = Send.Add("test_email", [12345, 12346], options);
```

---

### Send.Retrieve {#retrieve}

Returns send objects matching the supplied filter.

#### Syntax

```javascript
Send.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter (simple or compound) |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var sends = Send.Retrieve({ Property: "ID", SimpleOperator: "equals", Value: 12345 });
```

---

### Send.RetrieveLists {#retrievelists}

Returns the lists that were targeted by the sends matching the filter. The filter must restrict to specific send ID(s).

#### Syntax

```javascript
Send.RetrieveLists(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | Filter on send ID(s) |

#### Return value

`object[]` — list objects for matching sends.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var listsSentTo = Send.RetrieveLists({
    Property: "SendID",
    SimpleOperator: "equals",
    Value: 12345
});
```

---

### &lt;SendInstance&gt;.Remove {#instance-remove}

Deletes the send record bound to this instance.

#### Syntax

```javascript
<SendInstance>.Remove()
```

#### Return value

`"OK"` on success.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var s = Send.Init(12345);
s.Remove();
```

---

### &lt;SendInstance&gt;.CancelSend {#instance-cancelsend}

Attempts to cancel the bound send.

{% include differs-from-docs.html note="Runtime-verified: `CancelSend()` returns the literal string `\"status\"` on success, not the `\"OK\"` the official docs describe. Don't compare its return value against `\"OK\"`." %}

#### Syntax

```javascript
<SendInstance>.CancelSend()
```

#### Return value

`string` — returns the literal string `"status"` on success (not `"OK"`); throws on failure.

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var mySend = Send.Init(12345);
var status = mySend.CancelSend();
```

---

### Send.Tracking.Retrieve {#tracking-retrieve}

Static tracking retrieval — **no** `Send.Init()` required. Returns tracking rows matching the filter.

#### Syntax

```javascript
Send.Tracking.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var sendTracking = Send.Tracking.Retrieve({
    Property: "SendID",
    SimpleOperator: "equals",
    Value: 12345
});
```

---

### &lt;SendInstance&gt;.Tracking.Clicks.Retrieve {#instance-tracking-clicks-retrieve}

{% include callout.html type="warning" content="Salesforce docs call this <code>&lt;SendInstance&gt;.Tracking.ClickRetrieve(filter)</code>, but that name is <code>undefined</code> at runtime. The working member is <code>&lt;SendInstance&gt;.Tracking.Clicks.Retrieve(filter)</code> — a <code>Clicks</code> sub-object with a <code>Retrieve</code> method. See <a href=\"/engine-limitations/differs-from-docs/\">Differs from docs</a>." %}

Returns click-tracking rows for the bound send that match the filter.

#### Syntax

```javascript
<SendInstance>.Tracking.Clicks.Retrieve(filter)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | Restricts click rows |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var singleSend = Send.Init(12345);
var results = singleSend.Tracking.Clicks.Retrieve({
    Property: "ID",
    SimpleOperator: "equals",
    Value: 12345
});
```

---

### &lt;SendInstance&gt;.Tracking.TotalByInterval.Retrieve {#instance-tracking-totalbyinterval-retrieve}

{% include callout.html type="warning" content="Salesforce docs call this <code>&lt;SendInstance&gt;.Tracking.TotalByIntervalRetrieve(...)</code>, but that name is <code>undefined</code> at runtime. The working member is <code>&lt;SendInstance&gt;.Tracking.TotalByInterval.Retrieve(...)</code> — a <code>TotalByInterval</code> sub-object with a <code>Retrieve</code> method. See <a href=\"/engine-limitations/differs-from-docs/\">Differs from docs</a>." %}

Aggregates tracking by `type` over the date range, grouped by `groupBy` (`"day"` or `"hour"`). Dates use **MM-DD-YYYY**.

#### Syntax

```javascript
<SendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | string | Yes | `"Send"`, `"Open"`, `"Click"`, `"Bounce"`, or `"Unsubscribe"` |
| `startDate` | string | Yes | Start (MM-DD-YYYY) |
| `endDate` | string | Yes | End (MM-DD-YYYY) |
| `groupBy` | string | Yes | `"day"` or `"hour"` |

#### Return value

`object[]`

#### Examples

```javascript
Platform.Load("core", "1.1.5");
var singleSend = Send.Init(12345);
var results = singleSend.Tracking.TotalByInterval.Retrieve(
    "Click",
    "07-01-2010",
    "07-31-2010",
    "day"
);
```

## See also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/senddefinition/">Send.Definition</a></li>
  <li><a href="/core-library/email/">Email</a></li>
</ul>
</div>
