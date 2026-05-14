---
layout: category
title: Global Functions
description: Top-level functions and objects available in every SSJS execution context without any import or Platform.Load call.
---

These functions and objects are available globally in any SSJS script block without requiring `Platform.Load` or any other initialization.

<div class="function-grid">
  <a href="/global-functions/write/" class="function-card">
    <div class="fn-name">Write()</div>
    <div class="fn-desc">Output a string to the rendered page. The primary output mechanism for SSJS.</div>
    <div class="fn-return">→ void</div>
  </a>
  <a href="/global-functions/stringify/" class="function-card">
    <div class="fn-name">Stringify()</div>
    <div class="fn-desc">Serialize any object to its JSON string representation. SFMC's equivalent of JSON.stringify().</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/string/" class="function-card">
    <div class="fn-name">String()</div>
    <div class="fn-desc">Convert any value to a string, including CLR/.NET response objects from Script.Util.HttpRequest.</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/error/" class="function-card">
    <div class="fn-name">Error()</div>
    <div class="fn-desc">Native Error constructor for creating throwable error objects with a message property.</div>
    <div class="fn-return">→ object</div>
  </a>
  <a href="/global-functions/base64encode/" class="function-card">
    <div class="fn-name">Base64Encode()</div>
    <div class="fn-desc">Encode plain text to a Base64 string. Requires Platform.Load. For charset control use Platform.Function.Base64Encode().</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/base64decode/" class="function-card">
    <div class="fn-name">Base64Decode()</div>
    <div class="fn-desc">Decode a Base64 string to plain text. Requires Platform.Load. For charset control use Platform.Function.Base64Decode().</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/variable/" class="function-card">
    <div class="fn-name">Variable</div>
    <div class="fn-desc">Global object providing access to AMPscript variables. Use Variable.GetValue() and Variable.SetValue().</div>
    <div class="fn-return">object</div>
  </a>
  <a href="/global-functions/attribute/" class="function-card">
    <div class="fn-name">Attribute</div>
    <div class="fn-desc">Global object providing access to subscriber attribute values.</div>
    <div class="fn-return">object</div>
  </a>
  <a href="/global-functions/format/" class="function-card">
    <div class="fn-name">Format()</div>
    <div class="fn-desc">Format numbers (currency, decimals, percentages) and dates (ISO 8601, RFC 1123, custom patterns). Requires Platform.Load.</div>
    <div class="fn-return">→ string</div>
  </a>
</div>
