---
layout: page
title: proxy.perform
parent: WSProxy
parent_url: /wsproxy/
description: Perform a lifecycle action on an SFMC object — start, pause, stop, or resume automation, journeys, and other objects.
---

## Syntax

```javascript
var result = proxy.perform(objectType, action, properties);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | string | Yes | SOAP API object type |
| `action` | string | Yes | Action to perform: `"start"`, `"pause"`, `"stop"`, `"resume"`, `"publish"` |
| `properties` | object | Yes | Object identifying the target |

## Examples

### Start an Automation

```javascript
var proxy = new Script.Util.WSProxy();
var result = proxy.perform("Automation", "start", {
    CustomerKey: "MyAutomation_Key"
});
if (result.Status === "OK") {
    Write("Automation started.");
}
```

### Pause a Triggered Send Definition

```javascript
var proxy = new Script.Util.WSProxy();
proxy.perform("TriggeredSendDefinition", "pause", {
    CustomerKey: "WelcomeEmail_TSD"
});
```

### Start a Triggered Send Definition

```javascript
var proxy = new Script.Util.WSProxy();
proxy.perform("TriggeredSendDefinition", "start", {
    CustomerKey: "WelcomeEmail_TSD"
});
```

## Common action/objectType Combinations

| Object Type | Actions |
|-------------|---------|
| `"Automation"` | `"start"`, `"pause"`, `"stop"`, `"resume"` |
| `"TriggeredSendDefinition"` | `"start"`, `"pause"` |

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/wsproxy/execute/">proxy.execute</a></li>
</ul>
</div>
