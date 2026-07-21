---
layout: page
title: Differs from Official Docs
parent: Engine Limitations
parent_url: /engine-limitations/
verification: verified
description: Every SSJS function, object, and property whose runtime behavior in the SFMC engine differs from the official Salesforce documentation — return types, required arguments, null vs empty-string results, and more. Each entry is runtime-verified on a live CloudPage.
---

The official Salesforce SSJS documentation contains a number of inaccuracies: wrong return types, arguments listed as optional that are actually required, properties that exist but are undocumented, and members that behave differently than described. Every entry below has been **runtime-verified on a live CloudPage** and is flagged in the reference pages with such a note: {% include callout.html type="warning" title="Differs from official Salesforce docs" content="…" %}

This page is the single, growing catalog of those discrepancies. Each row links to the method's main reference page, where the same discrepancy is documented inline.

{% include callout.html type="info" content="This differs from [Known Bugs](/engine-limitations/known-bugs/): entries here are cases where the docs are simply **inaccurate** about how a working feature behaves. Known Bugs covers features that are outright **broken** or that **do not exist at runtime** despite being documented." %}

<style>
/* Hex literals mirror _sass/_variables.scss (SCSS vars are compile-time only). */
.dfd-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  margin: 1.5rem 0 0.5rem;
}
.dfd-control {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.dfd-control > label {
  font-size: 0.75rem;
  color: #8b949e;
}
.dfd-control select,
.dfd-control input[type="search"] {
  background: #161b22;
  color: #e6edf3;
  border: 1px solid #30363d;
  border-radius: 0.5rem;
  padding: 0.35em 0.6em;
  font-size: 0.85rem;
}
.dfd-control--search {
  flex: 1 1 16rem;
  min-width: 12rem;
}
.dfd-control--search input[type="search"] {
  width: 100%;
}
.dfd-count {
  color: #8b949e;
  font-size: 0.8rem;
  margin: 0.75rem 0 1.25rem;
}
.dfd-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}
.dfd-card.is-hidden {
  display: none;
}
.dfd-card__head {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
}
.dfd-card__head code {
  font-family: monospace;
}
.dfd-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
/* Severity badges — shaped like .verified-badge (which we reuse), colored per level. */
.dfd-sev--high {
  color: #f85149;
  background: rgba(248, 81, 73, 0.1);
  border-color: rgba(248, 81, 73, 0.3);
}
.dfd-sev--medium {
  color: #d29922;
  background: rgba(210, 153, 34, 0.1);
  border-color: rgba(210, 153, 34, 0.3);
}
.dfd-sev--low {
  color: #6e7681;
  background: #1c2433;
  border-color: #30363d;
}
/* Discrepancy-type icon — compact colored chip carrying the type code (A1..B3). */
.dfd-dtype {
  display: inline-flex;
  align-items: center;
  color: #fff;
  background: var(--c);
  border-radius: 0.35rem;
  padding: 0 0.35em;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: monospace;
  line-height: 1.6;
}
/* Plain-text description of the discrepancy-type code, shown next to its chip. */
.dfd-dtype-desc {
  font-size: 0.75rem;
  color: #8b949e;
}
/* Collapsible copy-paste test script that reproduces the discrepancy on a CloudPage. */
.dfd-card__testscript {
  margin: 0.5rem 0 0;
}
.dfd-card__testscript > summary {
  cursor: pointer;
  font-size: 0.72rem;
  color: #8b949e;
}
.dfd-card__testscript > summary:hover {
  color: #c9d1d9;
}
.dfd-card__testscript pre {
  margin: 0.5rem 0 0;
}
/* Placeholder note shown when a claim's test script still needs manual review. */
.dfd-card__testscript-note {
  margin: 0.5rem 0 0;
  font-size: 0.72rem;
  color: #8b949e;
}
/* Link to the representative official documentation page, at the card bottom. */
.dfd-card__ref {
  margin: 0.5rem 0 0;
  font-size: 0.72rem;
}
.dfd-card__ref a {
  color: #8b949e;
}
/* Category / ECMAScript-object label pill (no .tag class exists in the theme). */
.dfd-tag {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  padding: 0.15em 0.6em;
  border: 1px solid #30363d;
  border-radius: 9999px;
  background: #1c2433;
  color: #8b949e;
}
/* Discrepancy-type multi-select popover, doubling as the legend. */
.dfd-legend {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 0.5rem;
  font-size: 0.8rem;
}
.dfd-legend > summary {
  cursor: pointer;
  padding: 0.35em 0.75em;
  color: #e6edf3;
  list-style: none;
}
.dfd-legend > summary::-webkit-details-marker {
  display: none;
}
.dfd-legend__toggle {
  display: flex;
  gap: 0.5rem;
  padding: 0.5em 0.85em;
  border-top: 1px solid #21262d;
}
.dfd-legend__toggle button {
  cursor: pointer;
  font-size: 0.72rem;
  padding: 0.2em 0.7em;
  border: 1px solid #30363d;
  border-radius: 9999px;
  background: #1c2433;
  color: #c9d1d9;
}
.dfd-legend__toggle button:hover {
  background: #263041;
}
.dfd-legend__list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.5em 0.85em 0.85em;
  border-top: 1px solid #21262d;
}
.dfd-legend__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8b949e;
  cursor: pointer;
}
.dfd-legend__item input {
  margin: 0;
}
</style>

<div class="dfd-controls">
  <div class="dfd-control dfd-control--search">
    <label for="dfd-search">Search</label>
    <input type="search" id="dfd-search" placeholder="Filter by name (e.g. Platform.begin)" autocomplete="off" spellcheck="false">
  </div>
  <div class="dfd-control">
    <label for="dfd-sort">Sort by</label>
    <select id="dfd-sort">
      <option value="severity" selected>Severity (High &rarr; Low)</option>
      <option value="object">Object</option>
      <option value="discrepancy">Discrepancy type</option>
    </select>
  </div>
  <div class="dfd-control">
    <label for="dfd-show">Issue type</label>
    <select id="dfd-show">
      <option value="both" selected>Show SFMC &amp; ECMAScript issues</option>
      <option value="sfmc">Show SFMC doc issues only</option>
      <option value="ecmascript">Show ECMAScript issues only</option>
    </select>
  </div>
  <div class="dfd-control">
    <label for="dfd-dtype-filter">Discrepancy type</label>
    <details class="dfd-legend" id="dfd-dtype-filter">
      <summary>Discrepancy type</summary>
      <div class="dfd-legend__toggle">
        <button type="button" id="dfd-dtype-all">Select all</button>
        <button type="button" id="dfd-dtype-none">Select none</button>
      </div>
      <div class="dfd-legend__list">
        <label class="dfd-legend__item"><input type="checkbox" value="A1" checked><span class="dfd-dtype" style="--c:#f85149">A1</span> wrong return type</label>
        <label class="dfd-legend__item"><input type="checkbox" value="A2" checked><span class="dfd-dtype" style="--c:#f0883e">A2</span> null/empty on absence</label>
        <label class="dfd-legend__item"><input type="checkbox" value="A3" checked><span class="dfd-dtype" style="--c:#d29922">A3</span> wrong arity/optionality</label>
        <label class="dfd-legend__item"><input type="checkbox" value="A4" checked><span class="dfd-dtype" style="--c:#a371f7">A4</span> wrong/renamed/relocated members</label>
        <label class="dfd-legend__item"><input type="checkbox" value="A5" checked><span class="dfd-dtype" style="--c:#58a6ff">A5</span> undocumented-but-real members</label>
        <label class="dfd-legend__item"><input type="checkbox" value="A6" checked><span class="dfd-dtype" style="--c:#3fb950">A6</span> context/availability differs</label>
        <label class="dfd-legend__item"><input type="checkbox" value="A7" checked><span class="dfd-dtype" style="--c:#0ea5e9">A7</span> encoding/format/validation semantics</label>
        <label class="dfd-legend__item"><input type="checkbox" value="B1" checked><span class="dfd-dtype" style="--c:#58a6ff">B1</span> reduced range/partial support</label>
        <label class="dfd-legend__item"><input type="checkbox" value="B2" checked><span class="dfd-dtype" style="--c:#a371f7">B2</span> documented member missing/undefined</label>
        <label class="dfd-legend__item"><input type="checkbox" value="B3" checked><span class="dfd-dtype" style="--c:#d29922">B3</span> broken behavior/off-spec runtime</label>
      </div>
    </details>
  </div>
</div>

<p class="dfd-count" id="dfd-count"></p>

{% assign dfd_data = site.data.differs_from_docs %}

<div class="dfd-chapter" data-part="all">
{% assign sevs = "high,medium,low" | split: "," %}
{% for sev in sevs %}
{% for r in dfd_data %}
{% if r.severity == sev %}
{% case r.discrepancy %}
{% when "A1" %}{% assign dhex = "#f85149" %}{% assign dlabel = "A1 wrong return type" %}
{% when "A2" %}{% assign dhex = "#f0883e" %}{% assign dlabel = "A2 null/empty on absence" %}
{% when "A3" %}{% assign dhex = "#d29922" %}{% assign dlabel = "A3 wrong arity/optionality" %}
{% when "A4" %}{% assign dhex = "#a371f7" %}{% assign dlabel = "A4 wrong/renamed/relocated members" %}
{% when "A5" %}{% assign dhex = "#58a6ff" %}{% assign dlabel = "A5 undocumented-but-real members" %}
{% when "A6" %}{% assign dhex = "#3fb950" %}{% assign dlabel = "A6 context/availability differs" %}
{% when "A7" %}{% assign dhex = "#0ea5e9" %}{% assign dlabel = "A7 encoding/format/validation semantics" %}
{% when "B1" %}{% assign dhex = "#58a6ff" %}{% assign dlabel = "B1 reduced range/partial support" %}
{% when "B2" %}{% assign dhex = "#a371f7" %}{% assign dlabel = "B2 documented member missing/undefined" %}
{% when "B3" %}{% assign dhex = "#d29922" %}{% assign dlabel = "B3 broken behavior/off-spec runtime" %}
{% else %}{% assign dhex = "#6e7681" %}{% assign dlabel = r.discrepancy %}
{% endcase %}
{% assign ddesc = dlabel | remove_first: r.discrepancy | strip %}
<div class="dfd-card" data-part="{{ r.part }}" data-severity="{{ r.severity }}" data-dtype="{{ r.discrepancy }}" data-category="{{ r.category | default: r.object }}" data-object="{{ r.object | default: r.category | escape }}" data-name="{{ r.name | escape }}" id="{{ r.anchor }}">
  <h3 class="dfd-card__head">{% if r.url %}<a href="{{ r.url }}"><code>{{ r.name }}</code></a>{% else %}<code>{{ r.name }}</code>{% endif %}{% if r.tagline != "" %} — {{ r.tagline }}{% endif %}</h3>
  <div class="dfd-card__meta">
    <span class="verified-badge dfd-sev--{{ r.severity }}" title="Severity: {{ r.severity }}">{{ r.severity | capitalize }}</span>
    <span class="dfd-dtype" style="--c:{{ dhex }}" title="{{ dlabel }}">{{ r.discrepancy }}</span>
    <span class="dfd-dtype-desc">{{ ddesc }}</span>
    <span class="dfd-tag">{% if r.part == "ecmascript" %}ECMAScript {{ r.object }}{% else %}{{ r.category }}{% endif %}</span>
  </div>
  <div class="dfd-card__body">{{ r.body | markdownify }}</div>
  {% if r.testScript %}{% if r.testScript == "needs review" %}<p class="dfd-card__testscript-note"><em>Test script: needs review.</em></p>{% else %}<details class="dfd-card__testscript"><summary>Show test script</summary>{{ '```html' | append: '
' | append: r.testScript | append: '
```' | markdownify }}</details>{% endif %}{% endif %}
  {% if r.officialUrl %}<p class="dfd-card__ref"><a href="{{ r.officialUrl }}" target="_blank" rel="noopener">Official documentation</a></p>{% endif %}
</div>
{% endif %}
{% endfor %}
{% endfor %}
</div>

<script>
(function () {
  "use strict";
  var TOTAL = 84;
  var sortSel = document.getElementById("dfd-sort");
  var showSel = document.getElementById("dfd-show");
  var dtypeBox = document.getElementById("dfd-dtype-filter");
  var searchInput = document.getElementById("dfd-search");
  var countEl = document.getElementById("dfd-count");
  var containers = {};
  var i, el;
  var containerNodes = document.querySelectorAll(".dfd-chapter");
  for (i = 0; i < containerNodes.length; i++) {
    containers[containerNodes[i].getAttribute("data-part")] = containerNodes[i];
  }
  var cards = Array.prototype.slice.call(document.querySelectorAll(".dfd-card"));
  var checkboxes = dtypeBox
    ? Array.prototype.slice.call(dtypeBox.querySelectorAll('input[type="checkbox"]'))
    : [];

  var SEV_ORDER = { high: 0, medium: 1, low: 2 };
  var DTYPE_ORDER = {
    A1: 0, A2: 1, A3: 2, A4: 3, A5: 4, A6: 5, A7: 6,
    B1: 7, B2: 8, B3: 9
  };

  function activeDtypes() {
    var set = {};
    for (var j = 0; j < checkboxes.length; j++) {
      if (checkboxes[j].checked) {
        set[checkboxes[j].value] = true;
      }
    }
    return set;
  }

  // VS Code-style subsequence match: every query char must appear in order
  // within the haystack, but not necessarily contiguously. Both are lowercased.
  function fuzzyMatch(query, haystack) {
    if (!query) { return true; }
    var qi = 0;
    for (var hi = 0; hi < haystack.length && qi < query.length; hi++) {
      if (haystack.charAt(hi) === query.charAt(qi)) { qi += 1; }
    }
    return qi === query.length;
  }

  function apply() {
    var show = showSel ? showSel.value : "both";
    var dtypes = activeDtypes();
    var query = searchInput ? searchInput.value.toLowerCase() : "";
    var total = 0;
    var k, card, part, dtype, name, visible;

    for (k = 0; k < cards.length; k++) {
      card = cards[k];
      part = card.getAttribute("data-part");
      dtype = card.getAttribute("data-dtype");
      name = (card.getAttribute("data-name") || "").toLowerCase();
      visible = true;
      if (show === "sfmc" && part !== "sfmc") { visible = false; }
      if (show === "ecmascript" && part !== "ecmascript") { visible = false; }
      if (visible && !dtypes[dtype]) { visible = false; }
      if (visible && !fuzzyMatch(query, name)) { visible = false; }
      if (visible) {
        card.classList.remove("is-hidden");
        total += 1;
      } else {
        card.classList.add("is-hidden");
      }
    }

    if (countEl) {
      countEl.textContent = "Showing " + total + " of " + TOTAL + " entries";
    }
  }

  function sortKey(card, mode, seenCats) {
    if (mode === "severity") {
      var s = SEV_ORDER[card.getAttribute("data-severity")];
      return s === undefined ? 99 : s;
    }
    if (mode === "discrepancy") {
      var d = DTYPE_ORDER[card.getAttribute("data-dtype")];
      return d === undefined ? 99 : d;
    }
    return 0; // object handled separately (grouped)
  }

  function cardName(card) {
    return (card.getAttribute("data-name") || "").toLowerCase();
  }

  function byName(a, b) {
    var na = cardName(a), nb = cardName(b);
    return na < nb ? -1 : na > nb ? 1 : 0;
  }

  function sortCards() {
    var mode = sortSel ? sortSel.value : "severity";
    var parts = ["all"];
    for (var p = 0; p < parts.length; p++) {
      var container = containers[parts[p]];
      if (!container) { continue; }
      var group = Array.prototype.slice.call(
        container.querySelectorAll(".dfd-card")
      );
      var ordered;
      if (mode === "object") {
        // Group by data-object (alphabetically), then sort by name within
        // each object bucket.
        var objOrder = [];
        var buckets = {};
        for (var g = 0; g < group.length; g++) {
          var obj = group[g].getAttribute("data-object") || "";
          if (!buckets[obj]) { buckets[obj] = []; objOrder.push(obj); }
          buckets[obj].push(group[g]);
        }
        objOrder.sort(function (a, b) {
          var la = a.toLowerCase(), lb = b.toLowerCase();
          return la < lb ? -1 : la > lb ? 1 : 0;
        });
        ordered = [];
        for (var c = 0; c < objOrder.length; c++) {
          buckets[objOrder[c]].sort(byName);
          ordered = ordered.concat(buckets[objOrder[c]]);
        }
      } else {
        // Primary numeric key (severity or discrepancy), secondary by name.
        var decorated = [];
        for (var m = 0; m < group.length; m++) {
          decorated.push({ card: group[m], key: sortKey(group[m], mode) });
        }
        decorated.sort(function (a, b) {
          return a.key - b.key || byName(a.card, b.card);
        });
        ordered = [];
        for (var n = 0; n < decorated.length; n++) {
          ordered.push(decorated[n].card);
        }
      }
      for (var o = 0; o < ordered.length; o++) {
        container.appendChild(ordered[o]);
      }
    }
    // Rebuild the master card list to reflect new DOM order.
    cards = Array.prototype.slice.call(document.querySelectorAll(".dfd-card"));
  }

  function refresh() {
    sortCards();
    apply();
  }

  if (sortSel) { sortSel.addEventListener("change", refresh); }
  if (showSel) { showSel.addEventListener("change", apply); }
  if (searchInput) { searchInput.addEventListener("input", apply); }
  for (i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", apply);
  }

  function setAllDtypes(state) {
    for (var j = 0; j < checkboxes.length; j++) {
      checkboxes[j].checked = state;
    }
    apply();
  }
  var allBtn = document.getElementById("dfd-dtype-all");
  var noneBtn = document.getElementById("dfd-dtype-none");
  if (allBtn) {
    allBtn.addEventListener("click", function () { setAllDtypes(true); });
  }
  if (noneBtn) {
    noneBtn.addEventListener("click", function () { setAllDtypes(false); });
  }

  refresh();
})();
</script>
