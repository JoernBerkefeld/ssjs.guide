---
layout: page
title: Send
parent: Core Library
parent_url: /core-library/
description: Core library Send — create and manage sends, cancel a send, and retrieve aggregate or per-send tracking.
---

The `Send` namespace covers **user-initiated sends**: creating sends from an email and lists, retrieving send rows, listing targeted lists, canceling a send, and accessing tracking (including static `Send.Tracking.Retrieve` and instance helpers on `send.Tracking`).

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Methods

### Send

| Method | Returns | Description |
|--------|---------|-------------|
| [`Send.Init(id)`](#init) | SendInstance | Bind to a send by numeric ID |
| [`Send.Add(emailKey, listIds, [options])`](#send-add) | string | Create a send |
| [`Send.Retrieve(filter)`](#send-retrieve) | object[] | Query sends |
| [`Send.RetrieveLists(filter)`](#send-retrievelists) | object[] | Lists targeted by matching sends |
| [`<SendInstance>.Remove()`](#remove) | string | Delete the bound send |
| [`<SendInstance>.CancelSend()`](#cancelsend) | string | Attempt to cancel the send |

### Tracking

| Method | Returns | Description |
|--------|---------|-------------|
| [`Send.Tracking.Retrieve(filter)`](#send-tracking-retrieve) | object[] | Tracking rows (static; no `Send.Init` required) |
| [`<SendInstance>.Tracking.ClickRetrieve(filter)`](#tracking-clickretrieve) | object[] | Click tracking for this send |
| [`<SendInstance>.Tracking.TotalByIntervalRetrieve(type, startDate, endDate, groupBy)`](#tracking-totalbyintervalretrieve) | object[] | Aggregated tracking by interval |

---

## Init

### Syntax

```javascript
Send.Init(id)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Numeric ID of the send |

### Return value

`SendInstance`

### Examples

```javascript
Platform.Load("core", "1");
var s = Send.Init(12345);
```

---

## Send.Add

### Syntax

```javascript
Send.Add(emailKey, listIds, [options])
```

Creates a send for the given email customer key and list IDs. Optional `options` can override From name, From address, subject, send time, etc.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailKey` | string | Yes | Customer key of the email |
| `listIds` | array | Yes | Array of list IDs |
| `options` | object | No | Send-time overrides |

### Return value

`"OK"` on success.

### Examples

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

## Send.Retrieve

### Syntax

```javascript
Send.Retrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter (simple or compound) |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var sends = Send.Retrieve({ Property: "ID", SimpleOperator: "equals", Value: 12345 });
```

---

## Send.RetrieveLists

### Syntax

```javascript
Send.RetrieveLists(filter)
```

Filter must restrict to specific send ID(s).

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | Filter on send ID(s) |

### Return value

`object[]` — list objects for matching sends.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var listsSentTo = Send.RetrieveLists({
    Property: "SendID",
    SimpleOperator: "equals",
    Value: 12345
});
```

---

## Remove

### Syntax

```javascript
<SendInstance>.Remove()
```

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var s = Send.Init(12345);
s.Remove();
```

---

## CancelSend

### Syntax

```javascript
<SendInstance>.CancelSend()
```

Attempts to cancel the bound send.

### Return value

`"OK"` on success.

### Examples

```javascript
Platform.Load("core", "1.1.5");
var mySend = Send.Init(12345);
var status = mySend.CancelSend();
```

---

## Send.Tracking.Retrieve

### Syntax

```javascript
Send.Tracking.Retrieve(filter)
```

Static tracking retrieval — **no** `Send.Init()` required.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | WSProxy-style filter |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var sendTracking = Send.Tracking.Retrieve({
    Property: "SendID",
    SimpleOperator: "equals",
    Value: 12345
});
```

---

## Tracking.ClickRetrieve

### Syntax

```javascript
<SendInstance>.Tracking.ClickRetrieve(filter)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | object | Yes | Restricts click rows |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var singleSend = Send.Init(12345);
var results = singleSend.Tracking.ClickRetrieve({
    Property: "ID",
    SimpleOperator: "equals",
    Value: 12345
});
```

---

## Tracking.TotalByIntervalRetrieve

### Syntax

```javascript
<SendInstance>.Tracking.TotalByIntervalRetrieve(type, startDate, endDate, groupBy)
```

Aggregates tracking by `type` over the date range, grouped by `groupBy` (`"day"` or `"hour"`). Dates use **MM-DD-YYYY**.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | string | Yes | `"Send"`, `"Open"`, `"Click"`, `"Bounce"`, or `"Unsubscribe"` |
| `startDate` | string | Yes | Start (MM-DD-YYYY) |
| `endDate` | string | Yes | End (MM-DD-YYYY) |
| `groupBy` | string | Yes | `"day"` or `"hour"` |

### Return value

`object[]`

### Examples

```javascript
Platform.Load("core", "1.1.5");
var singleSend = Send.Init(12345);
var results = singleSend.Tracking.TotalByIntervalRetrieve(
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
