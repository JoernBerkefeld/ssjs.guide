---
layout: page
title: Internationalization
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
permalink: /ecmascript-builtins/internationalization/
description: The Intl object and all its formatters are not available in SSJS, and the toLocaleString / toLocaleUpperCase family ignore locale arguments — they behave as plain, non-localized no-ops. Use AMPscript FormatNumber / FormatDate for real locale formatting.
verification: pending
differs_from_docs: true
---

**The `Intl` object is not available in SSJS, and the `toLocale*` methods do not actually localize.** The SFMC server-side JavaScript engine (Jint) does not expose the ECMAScript Internationalization API: `Intl` is `undefined`, so none of its formatters (`Intl.NumberFormat`, `Intl.DateTimeFormat`, `Intl.Collator`, …) exist. The `toLocaleString`, `toLocaleUpperCase`, `toLocaleLowerCase`, `toLocaleDateString`, and related methods **do** exist, but they **ignore any locale argument** and fall back to a fixed, non-localized representation.

For real locale-aware number and date formatting, use AMPscript's `FormatNumber` and `FormatDate` (callable from SSJS via `Platform.Function.FormatNumber` / `Platform.Function.FormatDate`).

## Status legend

| Icon | Meaning |
|------|---------|
| ❌ Missing | Not available (`typeof` is `"undefined"`) |
| ⚠️ No-op | Exists but ignores locale arguments (differs from spec) |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`Intl`](#intl) | ES2015 | ❌ Missing | Entire Internationalization API is absent |
| [`Number.prototype.toLocaleString`](#tolocalestring-family) | ES3 | ⚠️ No-op | Ignores locale; returns the plain number string |
| [`String.prototype.toLocaleUpperCase`](#tolocalestring-family) | ES3 | ⚠️ No-op | Behaves like `toUpperCase()` |
| [`String.prototype.toLocaleLowerCase`](#tolocalestring-family) | ES3 | ⚠️ No-op | Behaves like `toLowerCase()` |
| [`Date.prototype.toLocaleDateString`](#tolocalestring-family) | ES3 | ⚠️ No-op | Returns a fixed English-format string |

---

## Intl {#intl}

`(ES2015)` — ❌ Missing. `Intl` is **not defined** — `typeof Intl === "undefined"`. None of its formatter constructors (`Intl.NumberFormat`, `Intl.DateTimeFormat`, `Intl.Collator`, `Intl.PluralRules`, `Intl.RelativeTimeFormat`, `Intl.ListFormat`, `Intl.Locale`, `Intl.Segmenter`, `Intl.DisplayNames`) are available.

For locale-aware formatting, use AMPscript from SSJS:

```javascript
// Locale-aware number formatting (instead of Intl.NumberFormat)
var formatted = Platform.Function.FormatNumber(1234567.89, "N", "de-DE");
Write(formatted); // "1.234.567,89"
```

## toLocaleString family {#tolocalestring-family}

⚠️ **No-op.** These methods exist but ignore the locale argument. Runtime-verified behaviour:

```javascript
// Number.prototype.toLocaleString — ignores the locale, no grouping separators
Write((123456.789).toLocaleString());        // "123456.789"
Write((123456.789).toLocaleString("de-DE")); // "123456.789"  (locale ignored — no "123.456,789")

// String.prototype.toLocaleUpperCase — behaves like toUpperCase()
Write("abc".toLocaleUpperCase());             // "ABC"

// Date.prototype.toLocaleDateString — fixed English format, not locale-aware
var d = new Date(2020, 0, 15);
Write(d.toLocaleDateString());                // "Wed, 15 Jan 2020"
```

Because the locale argument is silently ignored, do **not** rely on `toLocaleString(locale)` to produce grouped numbers, localized month names, or locale-specific date order. Use `Platform.Function.FormatNumber` / `Platform.Function.FormatDate` with an explicit culture code instead.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/ecmascript-builtins/number-methods/">Number Methods</a></li>
  <li><a href="/ecmascript-builtins/date-methods/">Date Methods</a></li>
</ul>
</div>
