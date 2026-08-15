---
layout: page
title: AMPscript Bridge
parent: Recipes
parent_url: /recipes/
description: Patterns for passing data between AMPscript and SSJS — reading AMPscript variables, sharing computation results, and mixing AMPscript rendering with SSJS logic.
claims_verified: true
test_scripts: complete
---

## Reading AMPscript Variables in SSJS

```html
%%[
  SET @subscriberKey = _subscriberkey
  SET @emailAddr = emailaddr
  SET @firstName = FirstName
]%%

<script runat="server">
var subKey = Platform.Variable.GetValue("@subscriberKey");
var email = Platform.Variable.GetValue("@emailAddr");
var firstName = Platform.Variable.GetValue("@firstName");

// Now use these in SSJS logic
var score = Platform.Function.Lookup("LeadScores", "score", "email", email);
Platform.Variable.SetValue("@leadScore", score);
</script>

%%[ /* Render the SSJS-computed value in AMPscript */ ]%%
Lead score: %%=v(@leadScore)=%%
```

---

{% include test-script.html bundle="recipes--ampscript-bridge" chapter="reading-ampscript-variables-in-ssjs" %}

## Passing SSJS Results to AMPscript Rendering

```javascript
// SSJS computes complex logic
var tier = "standard";
if (parseInt(score, 10) > 80) tier = "premium";
if (parseInt(score, 10) > 95) tier = "vip";

Platform.Variable.SetValue("@tier", tier);
Platform.Variable.SetValue("@discountCode", discountCodes[tier]);
```

```html
%%[ IF @tier == "vip" THEN ]%%
  <div class="vip-banner">Welcome, VIP!</div>
  <p>Your exclusive code: %%=v(@discountCode)=%%</p>
%%[ ELSEIF @tier == "premium" THEN ]%%
  <p>Premium member discount: %%=v(@discountCode)=%%</p>
%%[ ELSE ]%%
  <p>Standard member</p>
%%[ ENDIF ]%%
```

---

{% include test-script.html bundle="recipes--ampscript-bridge" chapter="passing-ssjs-results-to-ampscript-rendering" %}

## Safe URL Encoding via AMPscript

AMPscript's `URLEncode` has more encoding options than SSJS:

```javascript
Variable.SetValue("@rawValue", userInput);
Platform.Function.TreatAsContent("%%[SET @encoded = URLEncode(@rawValue, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

---

{% include test-script.html bundle="recipes--ampscript-bridge" chapter="safe-url-encoding-via-ampscript" %}

## Using Platform.Function.TreatAsContent Safely

{% include callout.html type="warning" content="Never pass user input directly to `Platform.Function.TreatAsContent()`. Use `Variable.SetValue()` first so the value arrives as data and is never parsed as AMPscript **source**. This stops AMPscript injection — but it is **not** output encoding: `v()` encodes nothing and `TreatAsContent()` sanitises nothing, so `<script>alert(1)</script>` comes back byte-for-byte. HTML-encode the result yourself before writing it into a page — see [Security → Output Encoding](/best-practices/security/#6-output-encoding)." %}

```javascript
// Output encoder — canonical copy lives in Security → Output Encoding
function htmlEncode(str) {
    return (str + "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}

// SAFE against AMPscript injection
Variable.SetValue("@name", userName);
Variable.SetValue("@code", promoCode);
var rendered = Platform.Function.TreatAsContent("Hello, %%=v(@name)=%%. Your code is %%=v(@code)=%%.");

// Still unsafe to write raw — the rendered string is not HTML-encoded.
Write(htmlEncode(rendered));

// DANGEROUS — never do this:
// Platform.Function.TreatAsContent(userInput); // AMPscript injection!
```

---

{% include test-script.html bundle="recipes--ampscript-bridge" chapter="using-platform-function-treatascontent-safely" %}

## Reading Subscriber Attributes in SSJS

```html
%%[
  SET @city = AttributeValue("City")
  SET @language = AttributeValue("PreferredLanguage")
]%%

<script runat="server">
var city = Platform.Variable.GetValue("@city");
var language = Platform.Variable.GetValue("@language") || "en";

// Or use the global Attribute object directly
var city2 = Attribute.GetValue("City");
</script>
```

---

{% include test-script.html bundle="recipes--ampscript-bridge" chapter="reading-subscriber-attributes-in-ssjs" %}

## JSON Data Bridge

Pass complex data from AMPscript to SSJS via JSON strings:

```html
%%[
  SET @productJson = LookupRows("Products", "Category", "featured")
]%%

<script runat="server">
// Better: use SSJS to retrieve directly
var products = Platform.Function.LookupRows("Products", "Category", "featured");
// products is already an array in SSJS
</script>
```

For data computed in SSJS and consumed in AMPscript, use simple string variables since AMPscript doesn't parse JSON natively:

```javascript
// SSJS
Platform.Variable.SetValue("@productCount", products.length);
Platform.Variable.SetValue("@topProduct", products[0] ? products[0].Name : "");
```

```html
%%[ /* AMPscript */ ]%%
We have %%=v(@productCount)=%% featured products.
Top pick: %%=v(@topProduct)=%%
```

{% include test-script.html bundle="recipes--ampscript-bridge" chapter="json-data-bridge" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-variable/">Platform.Variable</a></li>
  <li><a href="/core-library/variable/">Variable (bare-name Core form)</a></li>
  <li><a href="/platform-functions/treatascontent/">Platform.Function.TreatAsContent</a></li>
  <li><a href="/getting-started/embedding-ssjs/">Embedding SSJS</a></li>
</ul>
</div>
