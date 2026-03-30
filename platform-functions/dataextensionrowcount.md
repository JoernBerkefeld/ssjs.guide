---
layout: function
title: DataExtensionRowCount
parent: Platform Functions
parent_url: /platform-functions/
description: Returns the total number of rows in a Data Extension.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.DataExtensionRowCount(deName)"
return_type: number
min_args: 1
max_args: 1
---

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension name or external key |

## Examples

```javascript
var count = Platform.Function.DataExtensionRowCount("Subscribers");
Write("Total subscribers: " + count);

// Check if DE is empty
if (count === 0) {
    Write("No data available.");
}
```

## Notes

Returns the total row count — not a filtered count. For a filtered count, retrieve rows with `LookupRows` and check `.length`.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/lookuprows/">LookupRows</a></li>
</ul>
</div>
