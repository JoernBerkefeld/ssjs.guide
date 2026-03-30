---
layout: function
title: InvokeCreate
parent: Platform Functions
parent_url: /platform-functions/
description: Executes a SOAP Create operation on a fully configured SOAP API object. Use with CreateObject and SetObjectProperty.
availability:
  email: false
  cloudpage: true
  automation: true
  triggered_send: false
syntax: "Platform.Function.InvokeCreate(object, statusMsg, errorCode, errorMsg)"
return_type: object
min_args: 4
max_args: 4
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `object` | object | Yes | SOAP object built with CreateObject/SetObjectProperty |
| `statusMsg` | string | Yes | Variable (passed by ref) that receives the status |
| `errorCode` | string | Yes | Variable (passed by ref) that receives error code |
| `errorMsg` | string | Yes | Variable (passed by ref) that receives error message |

## Examples

```javascript
var status = "";
var code = "";
var message = "";
var result = Platform.Function.InvokeCreate(deObject, status, code, message);
if (code !== "0") {
    Write("Error: " + message);
}
```

{% include callout.html type="note" content="WSProxy is recommended over InvokeCreate for most use cases — it is simpler, uses native JS objects, and handles serialization automatically." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/createobject/">CreateObject</a></li>
  <li><a href="/platform-functions/invokeretrieve/">InvokeRetrieve</a></li>
  <li><a href="/platform-functions/invokeupdate/">InvokeUpdate</a></li>
  <li><a href="/platform-functions/invokedelete/">InvokeDelete</a></li>
  <li><a href="/wsproxy/">WSProxy</a></li>
</ul>
</div>
