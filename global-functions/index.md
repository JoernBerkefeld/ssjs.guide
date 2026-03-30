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
  <a href="/global-functions/contentblockbykey/" class="function-card">
    <div class="fn-name">ContentBlockByKey()</div>
    <div class="fn-desc">Render a Content Builder asset by its customer key. Returns the rendered HTML.</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/contentblockbyname/" class="function-card">
    <div class="fn-name">ContentBlockByName()</div>
    <div class="fn-desc">Render a Content Builder asset by folder path and name.</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/contentblockbyid/" class="function-card">
    <div class="fn-name">ContentBlockByID()</div>
    <div class="fn-desc">Render a Content Builder asset by its numeric identifier.</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/contentareabykey/" class="function-card">
    <div class="fn-name">ContentAreaByKey()</div>
    <div class="fn-desc">Render a classic content area by its external key.</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/treatascontent/" class="function-card">
    <div class="fn-name">TreatAsContent()</div>
    <div class="fn-desc">Evaluate a string containing AMPscript or HTML and return the rendered result. Security note: never pass unvalidated user input.</div>
    <div class="fn-return">→ string</div>
  </a>
  <a href="/global-functions/treatascontent-area/" class="function-card">
    <div class="fn-name">TreatAsContentArea()</div>
    <div class="fn-desc">Render a classic content area stored in the system.</div>
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
</div>
