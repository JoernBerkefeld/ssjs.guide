---
layout: function
title: UpdateData
parent: Platform Functions
parent_url: /platform-functions/
description: Modifies existing rows in a Data Extension that match the filter criteria. Returns the number of rows updated.
availability:
  email: true
  cloudpage: true
  automation: true
  triggered_send: true
syntax: "Platform.Function.UpdateData(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)"
return_type: number
min_args: 5
max_args: 5
verification: verified
test_scripts: complete
differs_from_docs: true
---

{% include differs-from-docs.html note="`UpdateData` resolves the Data Extension by its **Name** only — passing the external key / CustomerKey throws \"A Data Extension of this name does not exist.\" (runtime-verified)." %}
{% include test-script.html bundle="platform-functions--updatedata" chapter="resolved-by-name-only" label="Show test script — Name-only resolution" %}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deName` | string | Yes | Data Extension **Name** (the external key / CustomerKey is **not** accepted — runtime-verified) |
| `whereFieldNames` | string[] | Yes | Array of column names used to identify rows; multiple columns use positional AND logic |
| `whereFieldValues` | array | Yes | Array of values positionally aligned to `whereFieldNames`; must have the same length |
| `fieldNames` | string[] | Yes | Array of column names to update |
| `fieldValues` | array | Yes | Array of new values aligned to `fieldNames`; must have the same length |

{% include differs-from-docs.html note="The official docs allow scalar strings for a single filter column and value, but the runtime requires arrays for all four filter and update name/value arguments; scalar forms throw." %}
{% include test-script.html bundle="platform-functions--updatedata" chapter="array-arguments-required" label="Show test script — array arguments required" %}

{% include test-script.html bundle="platform-functions--updatedata" chapter="parameters" %}

## Examples

### Update a single column

```javascript
var affected = Platform.Function.UpdateData(
    "Subscribers",
    ["SubscriberKey"],  [subscriberKey],     // filter: rows where SubscriberKey = subscriberKey
    ["Status"],         ["unsubscribed"]      // column to update
);
Write(affected + " row(s) updated.");
```

### Update multiple columns

```javascript
Platform.Function.UpdateData(
    "Subscribers",
    ["Email"],      [email],  // filter: update rows where Email = email
    ["LastLogin", "LoginCount", "Status"],
    [Now(), loginCount + 1, "active"]
);
```

### Update with error handling

```javascript
try {
    var updated = Platform.Function.UpdateData(
        "Orders",
        ["OrderID"],     [orderId],   // filter
        ["ShippedDate"], [Now()]      // data to update
    );
    if (updated === 0) {
        Write("No order found with ID: " + orderId);
    }
} catch (e) {
    Write("Update failed: " + e.message);
}
```

{% include test-script.html bundle="platform-functions--updatedata" chapter="examples" %}

## Notes

- If no rows match the filter, returns `0` (not an error)
- Resolves the DE by **Name**, not external key / CustomerKey
- `UpdateDE` performs the same update but returns `null` instead of a row count. The official docs describe `UpdateDE` as email-only, yet it was runtime-verified to run and commit on a CloudPage too — prefer `UpdateData` outside email for the affected-row count.
- For insert-or-update logic, use `UpsertData`

{% include test-script.html bundle="platform-functions--updatedata" chapter="notes" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/upsertdata/">UpsertData</a></li>
  <li><a href="/platform-functions/insertdata/">InsertData</a></li>
  <li><a href="/platform-functions/deletedata/">DeleteData</a></li>
  <li><a href="/platform-functions/updatede/">UpdateDE</a></li>
</ul>
</div>
