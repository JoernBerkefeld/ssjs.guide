---
layout: function
title: <WSProxyInstance>.setBatchSize
parent: WSProxy
parent_url: /wsproxy/
permalink: /wsproxy/setbatchsize/
redirect_from:
  - /wsproxy/set-batch-size/
description: Limits how many rows/objects WSProxy returns per SOAP page on subsequent retrieve calls (default 2500).
syntax: "<WSProxyInstance>.setBatchSize(batchSize)"
return_type: void
min_args: 1
max_args: 1
---

Sets the maximum batch size for **retrieve** pagination on this WSProxy instance. Does not replace [`retrieve`](/wsproxy/retrieve/) + [`getNextBatch`](/wsproxy/getnextbatch/) — it changes page size for those calls.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `batchSize` | number | Yes | Max rows per page |

## Return Value

`void`

## Example

```javascript
var proxy = new Script.Util.WSProxy();
proxy.setBatchSize(200);
var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"], {});
```

## See Also

- [`proxy.retrieve`](/wsproxy/retrieve/)
- [`proxy.getNextBatch`](/wsproxy/getnextbatch/)
