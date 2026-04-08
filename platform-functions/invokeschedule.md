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
syntax: "Platform.Function.InvokeSchedule(apiObject, action, schedule[, statusArray, options])"
return_type: string
min_args: 3
max_args: 5
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiObject` | object | Yes | SOAP API object built with `CreateObject` and configured with `SetObjectProperty` |
| `action` | string | Yes | Action to perform on the object (e.g. `"start"`) |
| `schedule` | object | Yes | Schedule definition object specifying timing and recurrence |
| `statusArray` | array | No | Array that receives the status and RequestID of the API call |
| `options` | object | No | Additional API options; may be null |

## Examples

```javascript
var sendDef = Platform.Function.CreateObject("EmailSendDefinition");
Platform.Function.SetObjectProperty(sendDef, "CustomerKey", "MySendDef");

var scheduleDef = Platform.Function.CreateObject("ScheduleDefinition");
Platform.Function.SetObjectProperty(scheduleDef, "RecurrenceType", "Daily");
Platform.Function.SetObjectProperty(scheduleDef, "Occurrences", "1");

var statusArr = [];
var result = Platform.Function.InvokeSchedule(sendDef, "start", scheduleDef, statusArr, null);
Write("Result: " + result);
```

{% include callout.html type="note" content="WSProxy is the recommended approach for most SOAP API interactions. Use InvokeSchedule only when the Schedule SOAP verb is specifically required." %}

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
