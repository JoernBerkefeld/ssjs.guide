---
layout: function
title: InvokeSchedule
parent: Platform Functions
parent_url: /platform-functions/
description: Invokes the SOAP API Schedule method on a configured API object. Used to schedule recurring or one-time operations on SOAP objects.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokeSchedule(apiObject, action, schedule, statusArray[, options])"
return_type: string
min_args: 4
max_args: 5
verification: verified
differs_from_docs: true
test_scripts: complete
---

{% include differs-from-docs.html note="The official docs type the return value as an object and imply `statusArray` is optional. At runtime the call returns the OverallStatus value as a **string** — `\"OK\"` on success, `\"Error\"` on failure — and `statusArray` is **required**: the 3-argument call throws. No RequestID is ever written into it: `statusArray[0]` receives the status *message*, `statusArray[1]` a *numeric* error code (`0` on success) and `statusArray[2]` a string." %}

{% include test-script.html bundle="platform-functions--invokeschedule" chapter="differs-from-docs" label="Show test script — string return value, the required statusArray, the numeric error code and the pre-sized-vs-empty status control" %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP API object built with `CreateObject` and configured with `SetObjectProperty`. Address it by `ObjectID` — `CustomerKey` is not a working addressing shape for this verb |
| `action` | string | Yes | Action to perform. `"start"` is the only supported action; the name is case-insensitive |
| `schedule` | object | Yes | `ScheduleDefinition` object. `StartDateTime` is mandatory |
| `statusArray` | array | Yes | Out-parameter that receives the status message (`statusArray[0]`), a numeric error code (`statusArray[1]`, `0` on success) and a string (`statusArray[2]`). Pass a pre-sized array — `[0, 0, 0]` |
| `options` | object | No | Additional API options; may be null or omitted entirely |

The `statusArray` is a true out parameter, but it is never grown: only the slots it already has are written. Pass `[0, 0, 0]` — an empty `[]` stays empty and reads back `undefined`, and a `[0, 0]` leaves `statusArray[2]` undefined.

A `null` `apiObject` does not throw: the call returns `null` and leaves the `statusArray` untouched, because no SOAP call is made. A plain JavaScript object or a string as `apiObject` throws, and so do a `null` `action`, a `null` `schedule`, a plain JavaScript object as `schedule`, and a non-array `statusArray`.

Only `StartDateTime`, `EndDateTime`, `RecurrenceType`, `RecurrenceRangeType` and `Occurrences` are writable on a `ScheduleDefinition` — `TimeZone`, `TimeZoneID` and `Recurrence` all reject `SetObjectProperty`.

The Schedule verb accepts very few object types. `QueryDefinition`, `TriggeredSendDefinition`, `FileTransferActivity` and `ImportDefinition` are all refused outright with `Cannot perform Schedule on objects of type <T>` and error code `5`. An `Automation` addressed by `ObjectID` is the shape that round-trips.

{% include test-script.html bundle="platform-functions--invokeschedule" chapter="parameters" %}

## Examples

```javascript
var automation = Platform.Function.CreateObject("Automation");
Platform.Function.SetObjectProperty(automation, "ObjectID", automationObjectId);

var scheduleDef = Platform.Function.CreateObject("ScheduleDefinition");
Platform.Function.SetObjectProperty(scheduleDef, "StartDateTime", "2027-03-01T09:00:00");
Platform.Function.SetObjectProperty(scheduleDef, "RecurrenceType", "Daily");
Platform.Function.SetObjectProperty(scheduleDef, "RecurrenceRangeType", "EndAfter");
Platform.Function.SetObjectProperty(scheduleDef, "Occurrences", "1");

var statusArr = [0, 0, 0];
var result = Platform.Function.InvokeSchedule(automation, "start", scheduleDef, statusArr, null);

if (result !== "OK") {
    // the schedule failed - statusArr[0] carries the reason, statusArr[1] the error code
}
```

Guard on the **return value**, not on `statusArr[0]`: `statusArr[0]` holds the status *message* (`"Program scheduled."` on success), so a `statusArr[0] !== "OK"` guard would fire on every successful call.

{% include callout.html type="note" content="WSProxy is the recommended approach for most SOAP API interactions. Use InvokeSchedule only when the Schedule SOAP verb is specifically required." %}

{% include test-script.html bundle="platform-functions--invokeschedule" chapter="examples" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/setobjectproperty/">SetObjectProperty</a></li>
  <li><a href="/platform-functions/invokeconfigure/">InvokeConfigure</a></li>
  <li><a href="/platform-functions/invokeextract/">InvokeExtract</a></li>
  <li><a href="/platform-functions/invokeperform/">InvokePerform</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
