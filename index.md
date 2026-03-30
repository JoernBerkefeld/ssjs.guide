---
layout: default
title: "ssjs.guide — Server-Side JavaScript for Salesforce Marketing Cloud"
description: "The complete reference for Server-Side JavaScript (SSJS) in Salesforce Marketing Cloud — functions, platform APIs, recipes, and best practices."
---

<div class="home-hero">
  <div class="hero-eyebrow">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect width="14" height="14" rx="3" fill="#0ea5e9"/><path d="M4 5l-2 2 2 2M10 5l2 2-2 2M8 3.5l-2 7" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Salesforce Marketing Cloud
  </div>
  <h1 class="hero-title">
    Server-Side JavaScript<br>
    <span>Reference Guide</span>
  </h1>
  <p class="hero-description">
    Everything you need to write, debug, and master SSJS in SFMC —
    global functions, Platform APIs, Core library, WSProxy, HTTP,
    engine limitations, and real-world recipes.
  </p>
  <div class="hero-actions">
    <a href="/getting-started/" class="btn btn--primary">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Get Started
    </a>
    <a href="/function-index/" class="btn btn--secondary">
      Function Index
    </a>
  </div>
</div>

<div class="section-heading">
  <span class="section-heading__line"></span>
  <span class="section-heading__label">Reference</span>
  <span class="section-heading__line"></span>
</div>

<div class="home-grid">
  <a href="/global-functions/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="card-title">Global Functions</div>
    <div class="card-description">Top-level functions available in every SSJS context: <code>Write</code>, <code>Stringify</code>, <code>TreatAsContent</code>, content blocks, and more.</div>
    <div class="card-count">12 functions</div>
  </a>

  <a href="/platform-functions/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 10h8M10 7v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="card-title">Platform Functions</div>
    <div class="card-description">The <code>Platform.Function.*</code> API surface — Data Extension CRUD, strings, dates, crypto, HTTP, AMPscript bridge, and SOAP helpers.</div>
    <div class="card-count">~55 functions</div>
  </a>

  <a href="/platform-objects/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3L3 7v6l7 4 7-4V7l-7-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    </div>
    <div class="card-title">Platform Objects</div>
    <div class="card-description"><code>Platform.Load</code>, <code>Platform.Variable</code>, <code>Platform.Response</code>, <code>Platform.Request</code>, and <code>Platform.ClientBrowser</code>.</div>
    <div class="card-count">5 objects · 22 methods</div>
  </a>

  <a href="/core-library/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M10 2v3M10 15v3M2 10h3M15 10h3M4.2 4.2l2.1 2.1M13.7 13.7l2.1 2.1M4.2 15.8l2.1-2.1M13.7 6.3l2.1-2.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="card-title">Core Library</div>
    <div class="card-description">SOAP-style object wrappers after <code>Platform.Load("core","1.1.5")</code> — DataExtension, Subscriber, Email, TriggeredSend, and 20+ more.</div>
    <div class="card-count">30 objects</div>
  </a>

  <a href="/wsproxy/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 14l-4-4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="card-title">WSProxy</div>
    <div class="card-description">The fastest way to call the SFMC SOAP API from SSJS. <code>new WSProxy()</code> with retrieve, create, update, delete, batch, and impersonation.</div>
    <div class="card-count">11 methods</div>
  </a>

  <a href="/http/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="card-title">HTTP & REST</div>
    <div class="card-description">All HTTP options compared: <code>HTTP.Get/Post</code>, <code>Platform.Function.HTTPGet</code>, and <code>Script.Util.HttpRequest</code> for full REST verb support.</div>
    <div class="card-count">3 approaches · 9 functions</div>
  </a>
</div>

<div class="section-heading">
  <span class="section-heading__line"></span>
  <span class="section-heading__label">Guides</span>
  <span class="section-heading__line"></span>
</div>

<div class="home-grid">
  <a href="/getting-started/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" stroke-width="1.5"/><path d="M7 8h6M7 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="card-title">Getting Started</div>
    <div class="card-description">What SSJS is, where it runs, how to embed script blocks, execution contexts, and the difference between Platform and Core.</div>
    <div class="card-count">5 pages</div>
  </a>

  <a href="/language/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 6l4-3 10 7-10 7-4-3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    </div>
    <div class="card-title">Language Guide</div>
    <div class="card-description">Variables, types, operators, control flow, loops, functions, objects, JSON, error handling — the ES3/5 subset that works in SFMC.</div>
    <div class="card-count">9 topics</div>
  </a>

  <a href="/engine-limitations/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3L2.5 16.5h15L10 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 9v4M10 14.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="card-title">Engine Limitations</div>
    <div class="card-description">24 ES6+ features that fail at runtime, broken Array methods, polyfills you need, and known platform bugs like the <code>switch default</code> issue.</div>
    <div class="card-count">4 topics · 20 polyfills</div>
  </a>

  <a href="/ecmascript-builtins/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h10M3 15h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="card-title">ECMAScript Builtins</div>
    <div class="card-description">Safe Array, String, and Math methods that work in the SFMC SSJS engine — tested and documented with examples.</div>
    <div class="card-count">31 safe methods</div>
  </a>

  <a href="/best-practices/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 14.4l-4.8 2.5.9-5.4L2.2 7.7l5.4-.8L10 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    </div>
    <div class="card-title">Best Practices</div>
    <div class="card-description">Debugging techniques, performance patterns, security considerations, style guide, and defensive coding for SFMC SSJS.</div>
    <div class="card-count">6 topics</div>
  </a>

  <a href="/recipes/" class="home-card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 3v3a4 4 0 008 0V3M3 17h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="card-title">Recipes</div>
    <div class="card-description">Copy-paste patterns for Cloud Page apps, AMPscript bridging, REST API calls, DE CRUD, subscribers, anti-CSRF, and encryption.</div>
    <div class="card-count">9 recipes</div>
  </a>
</div>

<div class="section-heading">
  <span class="section-heading__line"></span>
  <span class="section-heading__label">Quick Start</span>
  <span class="section-heading__line"></span>
</div>

<div class="prose">

A minimal SSJS CloudPage:

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

try {
    var subscriberKey = Platform.Request.GetQueryStringParameter("sk");

    if (subscriberKey) {
        var email = Platform.Function.Lookup(
            "Subscribers",
            "EmailAddress",
            "SubscriberKey",
            subscriberKey
        );
        Write("<p>Hello, " + email + "</p>");
    }
} catch (e) {
    Write("<p>Error: " + Stringify(e) + "</p>");
}
</script>
```

Key points:
- SSJS runs on the server inside `<script runat="server">` blocks
- `Platform.Load("core", "1.1.5")` must be called before using Core library objects
- The engine is roughly **ES3/5** — no arrow functions, `let`/`const`, template literals, or `async`/`await`
- Use `Write()` to output HTML, `Stringify()` to serialize objects, `Platform.Function.ParseJSON()` instead of `JSON.parse()`

→ [Read the full Getting Started guide](/getting-started/)

</div>
