---
layout: page
title: Platform.Variable
parent: Platform Objects
parent_url: /platform-objects/
description: The AMPscript–SSJS variable bridge. Read and write AMPscript variables from within SSJS script blocks.
verification: verified
differs_from_docs: "Runtime-verified (CloudPage): Platform.Variable is available WITHOUT Platform.Load. GetValue returns null (typeof \"object\") when the variable was NEVER set — not an empty string; a variable explicitly set to \"\" returns \"\". The leading @ is optional (auto-added): GetValue(\"v\") and GetValue(\"@v\") are equivalent. The bare-name Variable alias only exists AFTER Platform.Load(\"core\", ...)."
---

`Platform.Variable` provides two methods for bridging between AMPscript and SSJS execution contexts. Any variable set in AMPscript can be read in SSJS, and vice versa.

Does not require `Platform.Load`. The bare-name `Variable` alias, however, only exists **after** `Platform.Load("core", "1.1.5")`.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `Platform.Variable.GetValue(name)` | string | Reads the value of an AMPscript variable |
| `Platform.Variable.SetValue(name, value)` | void | Writes a value to an AMPscript variable |

---

## GetValue

### Syntax

```javascript
Platform.Variable.GetValue(variableName)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `variableName` | string | Yes | AMPscript variable name. The leading `@` is optional — it is added automatically |

### Return Value

Returns the variable's value as a string. Returns **`null`** (typeof `"object"`) when the variable was never set — not an empty string. A variable explicitly set to `""` returns `""`, so you can distinguish "never set" (`null`) from "set to empty" (`""`).

### Examples

```javascript
// Read an AMPscript variable
var email = Platform.Variable.GetValue("@email");
var firstName = Platform.Variable.GetValue("@firstName");
```

---

## SetValue

### Syntax

```javascript
Platform.Variable.SetValue(variableName, value)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `variableName` | string | Yes | AMPscript variable name. The leading `@` is optional — it is added automatically |
| `value` | any | Yes | Value to assign |

### Examples

```javascript
Platform.Variable.SetValue("@result", "processed");
Platform.Variable.SetValue("@count", rows.length);
Platform.Variable.SetValue("@jsonPayload", Stringify(data));
```

After `SetValue`, the variable is accessible in subsequent AMPscript expressions on the same page:

```html
%%[ /* AMPscript reading the value set above */ ]%%
Your result: %%=v(@result)=%%
```

---

## Common Patterns

### Pass SSJS computation to AMPscript rendering

```javascript
// Compute in SSJS
var score = computeLeadScore(subscriberKey);
Platform.Variable.SetValue("@leadScore", score);
```

```html
%%[ /* Use in AMPscript conditional block */ ]%%
%%[ IF @leadScore > 80 THEN ]%%
  <strong>High priority lead</strong>
%%[ ENDIF ]%%
```

### Read AMPscript personalization in SSJS

```html
%%[
  SET @subKey = _subscriberkey
  SET @email = emailaddr
]%%
<script runat="server">
  var subKey = Platform.Variable.GetValue("@subKey");
  var email = Platform.Variable.GetValue("@email");
  // use subKey and email in SSJS logic
</script>
```

### Safe encoding via AMPscript

```javascript
Variable.SetValue("@rawInput", userInput);
Platform.Function.TreatAsContent("%%[SET @encoded = URLEncode(@rawInput, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

{% include callout.html type="note" content="The global `Variable` object is an alias for `Platform.Variable`. Both `Variable.GetValue()` and `Platform.Variable.GetValue()` are equivalent." %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/global-functions/variable/">Variable (global alias)</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent</a></li>
  <li><a href="/getting-started/embedding-ssjs/">Embedding SSJS</a></li>
</ul>
</div>
