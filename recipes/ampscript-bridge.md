---
layout: page
title: AMPscript Bridge
parent: Recipes
parent_url: /recipes/
description: Patterns for passing data between AMPscript and SSJS — reading AMPscript variables, sharing computation results, and mixing AMPscript rendering with SSJS logic.
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

## Safe URL Encoding via AMPscript

AMPscript's `URLEncode` has more encoding options than SSJS:

```javascript
Variable.SetValue("@rawValue", userInput);
TreatAsContent("%%[SET @encoded = URLEncode(@rawValue, 1, 1)]%%");
var encoded = Variable.GetValue("@encoded");
```

---

## Using TreatAsContent Safely

{% include callout.html type="warning" content="Never pass user input directly to `TreatAsContent()`. Use `Variable.SetValue()` first — the AMPscript `v()` function output-encodes values preventing injection." %}

```javascript
// SAFE pattern
Variable.SetValue("@name", userName);
Variable.SetValue("@code", promoCode);
TreatAsContent("Hello, %%=v(@name)=%%. Your code is %%=v(@code)=%%.");

// DANGEROUS — never do this:
// TreatAsContent(userInput); // AMPscript injection!
```

---

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
var city2 = Attribute.Value("City");
</script>
```

---

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

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-variable/">Platform.Variable</a></li>
  <li><a href="/global-functions/variable/">Variable (global)</a></li>
  <li><a href="/global-functions/treatascontent/">TreatAsContent</a></li>
  <li><a href="/getting-started/embedding-ssjs/">Embedding SSJS</a></li>
</ul>
</div>
