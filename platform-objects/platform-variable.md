---
layout: page
title: Platform.Variable
parent: Platform Objects
parent_url: /platform-objects/
description: The AMPscript–SSJS variable bridge. Read and write AMPscript variables from within SSJS script blocks.
verification: verified
differs_from_docs: true
test_scripts: complete
---

`Platform.Variable` bridges AMPscript and SSJS variables within the current page request. A value written by one language is available to server-side blocks that execute later in the document; values do not persist into a later request.

`Platform.Variable` does not require `Platform.Load`. The bare-name `Variable` alias is available after `Platform.Load("core", "1.1.5")` and shares the same variable state.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `Platform.Variable.GetValue(name)` | string, number, boolean, or null | Reads an AMPscript variable in the current request |
| `Platform.Variable.SetValue(name, value)` | null | Writes an AMPscript variable in the current request |

{% include test-script.html bundle="platform-objects--platform-variable" chapter="methods" %}

---

## GetValue

### Syntax

```javascript
Platform.Variable.GetValue(variableName)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `variableName` | string | Yes | AMPscript variable name; the leading `@` is optional |

Variable names are case-insensitive. When both `@name` and `@NAME` are assigned, the later assignment is the value returned through either spelling.

### Return Value

Returns the value in its current SSJS scalar type. AMPscript numeric values are numbers, SSJS booleans remain booleans in later SSJS blocks, and strings remain strings. A variable that was never set returns JavaScript `null` (`typeof "object"`); a variable explicitly set to `""` returns an empty string.

{% include differs-from-docs.html note="The official docs describe a string return, but the runtime preserves number and boolean values and returns JavaScript null for a variable that was never set." %}

### Examples

```javascript
var email = Platform.Variable.GetValue("@email");
var firstName = Platform.Variable.GetValue("firstName");
```

{% include test-script.html bundle="platform-objects--platform-variable" chapter="getvalue" %}

---

## SetValue

### Syntax

```javascript
Platform.Variable.SetValue(variableName, value)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `variableName` | string | Yes | AMPscript variable name; the leading `@` is optional |
| `value` | string, number, boolean, null, or undefined | Yes | Scalar value to assign |

### Return Value

Returns JavaScript `null`. Strings, numbers, booleans, and empty strings retain their SSJS scalar type when read by a later SSJS block. Values assigned as `null` or `undefined` read back as `null`. A later AMPscript block sees numbers and booleans through AMPscript's display representation and sees null-like values as empty.

{% include differs-from-docs.html note="The official docs document a string input and void return, but the runtime accepts SSJS scalar values and returns JavaScript null." %}

### Examples

```javascript
Platform.Variable.SetValue("@result", "processed");
Platform.Variable.SetValue("count", rows.length);
Platform.Variable.SetValue("@jsonPayload", Stringify(data));
```

After `SetValue`, a later AMPscript block on the same page can read the variable:

```html
%%[ /* AMPscript reading the value set above */ ]%%
Your result: %%=v(@result)=%%
```

{% include test-script.html bundle="platform-objects--platform-variable" chapter="setvalue" %}

---

## Common Patterns

### Pass SSJS computation to later AMPscript rendering

```javascript
var score = computeLeadScore(subscriberKey);
Platform.Variable.SetValue("@leadScore", score);
```

```html
%%[ IF @leadScore > 80 THEN ]%%
  <strong>High priority lead</strong>
%%[ ENDIF ]%%
```

### Read an earlier AMPscript value in SSJS

```html
%%[
  SET @subKey = _subscriberkey
  SET @email = emailaddr
]%%
<script runat="server">
  var subKey = Platform.Variable.GetValue("@subKey");
  var email = Platform.Variable.GetValue("@email");
</script>
```

Personalization strings such as `_subscriberkey` and `emailaddr` depend on send or subscriber context. `Platform.Variable` only transfers whatever value the earlier AMPscript block produced; it does not create that context on a plain CloudPage GET.

### Cross multiple server-side blocks

```html
<script runat="server">
  Platform.Variable.SetValue("@rawInput", userInput);
</script>
%%[ SET @encoded = URLEncode(@rawInput, 1, 1) ]%%
<script runat="server">
  var encoded = Platform.Variable.GetValue("@encoded");
</script>
```

{% include test-script.html bundle="platform-objects--platform-variable" chapter="common-patterns" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/core-library/variable/">Variable (bare-name Core form)</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent</a></li>
  <li><a href="/getting-started/embedding-ssjs/">Embedding SSJS</a></li>
</ul>
</div>
