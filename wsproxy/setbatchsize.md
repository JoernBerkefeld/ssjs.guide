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
verification: in-progress
---

Sets the maximum number of rows/objects returned per SOAP page on subsequent [`retrieve`](/wsproxy/retrieve/) calls (default 2500). It only tunes the page size — it is **not** required to paginate: `retrieve` + [`getNextBatch`](/wsproxy/getnextbatch/) continuation happens naturally once a result set exceeds the 2500-row default page size.

{% include callout.html type="warning" content="**Do not confuse this with the `retrieveOptions.BatchSize` argument.** This page documents the throwing <code>setBatchSize()</code> **instance method**. To cap the page size at runtime, pass <code>{ BatchSize: n }</code> as the 4th argument of <a href=\"/wsproxy/retrieve/\"><code>retrieve</code></a> instead — that argument is runtime-verified to work in the anonymous CloudPage (it does **not** throw), and <code>props.ContinueRequest</code> continues the paging." %}

{% include callout.html type="note" content="**Verification in progress.** Runtime testing confirmed the method resolves on a `WSProxy` instance (<code>typeof proxy.setBatchSize</code> is <code>clrmethodinfo</code>), but calling <code>setBatchSize(n)</code> in the anonymous CloudPage context throws <code>System.InvalidOperationException: Unable to retrieve security descriptor for this frame</code> (mscorlib), so the method's effect on the per-page row count could not be runtime-proven here — it needs an authenticated context the anonymous page cannot supply. This is specific to the <code>setBatchSize()</code> **instance method**: the separate <code>retrieveOptions.BatchSize</code> argument of <code>retrieve</code> does **not** throw and pages cleanly (`Status: \"MoreDataAvailable\"`), and <code>getNextBatch</code> continuation also works without <code>setBatchSize</code> — both runtime-verified." %}

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `batchSize` | number | Yes | Max rows per page |

## Return Value

`void`

## Example

{% include callout.html type="warning" content="The <code>setBatchSize()</code> **instance method** below is shown for reference only — it throws <code>Unable to retrieve security descriptor for this frame</code> in the anonymous CloudPage context. **Do not** call it. Use the runtime-verified <code>retrieveOptions.BatchSize</code> argument of <a href=\"/wsproxy/retrieve/\"><code>retrieve</code></a> instead (shown in the second block)." %}

```javascript
// NOT RECOMMENDED — this instance method is runtime-blocked and throws in SFMC:
// var proxy = new Script.Util.WSProxy();
// proxy.setBatchSize(200);
// var result = proxy.retrieve("DataExtension", ["Name", "CustomerKey"], {});
```

Instead, cap the page size with the `retrieveOptions.BatchSize` argument (4th arg, `<=2500`) and continue paging with `props.ContinueRequest`:

```javascript
var prox = new Script.Util.WSProxy();
var cols = ["Name", "CustomerKey"];
var opts = { BatchSize: 200 };             // <=2500; higher is ignored
var props = { QueryAllAccounts: false };
var data = prox.retrieve("DataExtension", cols, null, opts, props);
do {
  // process data.Results ...
  if (data.HasMoreRows) {
    props.ContinueRequest = data.RequestID;
    data = prox.retrieve("DataExtension", cols, null, opts, props);
  }
} while (data.HasMoreRows);
```

## See Also

- [`proxy.retrieve`](/wsproxy/retrieve/)
- [`proxy.getNextBatch`](/wsproxy/getnextbatch/)
