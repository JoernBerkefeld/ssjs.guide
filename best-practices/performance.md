---
layout: page
title: Performance
parent: Best Practices
parent_url: /best-practices/
description: SSJS performance best practices — minimize API calls, optimize DE operations, avoid timeout traps, and write efficient loops.
---

SFMC enforces execution time limits on SSJS scripts. CloudPages typically have a **30-second timeout**, and Automation Studio scripts have a **30-minute limit** (but individual script activities may have shorter limits). Understanding and working within these limits is critical.

## 1. Minimize DE Round-Trips

Every `Platform.Function.Lookup`, `de.Rows.Retrieve`, and WSProxy call involves a network round-trip to SFMC servers. Minimize them.

### Batch reads instead of per-row lookups

```javascript
// SLOW — one lookup per row
for (var i = 0; i < ids.length; i++) {
    var record = Platform.Function.Lookup("DE", "data", "id", ids[i]);
    // process record
}

// FASTER — retrieve all needed rows at once
var rows = Platform.Function.LookupRows("DE", "Status", "active");
var lookupMap = {};
for (var i = 0; i < rows.length; i++) {
    lookupMap[rows[i].id] = rows[i];
}

// Then use lookupMap[id] instead of a per-row Lookup
```

### Use LookupOrderedRows with a limit

```javascript
// Get only what you need
var recent = Platform.Function.LookupOrderedRows(
    "Events", 10, "Timestamp desc",
    "UserId", userId
);
```

---

## 2. Cache Expensive Results

If you need to use the same DE data multiple times, load it once at the top of the script:

```javascript
Platform.Load("core", "1.1.5");

// Load config once
var config = {};
var configRows = Platform.Function.LookupRows("AppConfig", "Active", "true");
for (var i = 0; i < configRows.length; i++) {
    config[configRows[i].Key] = configRows[i].Value;
}

// Use config throughout without further lookups
var timeout = config["requestTimeout"] || "30000";
var apiKey = config["apiKey"];
```

---

## 3. Efficient Loops

Cache array length before looping:

```javascript
// CORRECT — length evaluated once
var len = items.length;
for (var i = 0; i < len; i++) {
    process(items[i]);
}

// LESS EFFICIENT — length re-evaluated each iteration
for (var i = 0; i < items.length; i++) {
    process(items[i]);
}
```

Break early when possible:

```javascript
var found = null;
for (var i = 0; i < rows.length; i++) {
    if (rows[i].Id === targetId) {
        found = rows[i];
        break;  // stop scanning
    }
}
```

---

## 4. HTTP Calls Are Expensive

Each HTTP request (to external APIs, SFMC REST API, etc.) adds significant latency. Minimize calls:

```javascript
// BAD — multiple calls for same data
var name = callApi("/user/" + id + "/name");
var email = callApi("/user/" + id + "/email");
var prefs = callApi("/user/" + id + "/prefs");

// BETTER — single call
var user = callApi("/user/" + id);
var name = user.name;
var email = user.email;
var prefs = user.prefs;
```

Cache auth tokens in a DE rather than fetching a new token on every page load:

```javascript
function dateAdd(timestamp,intervalToAdd,intervalType) {
    Platform.Variable.SetValue("@dateAdd_ts",timestamp);
    Platform.Variable.SetValue("@dateAdd_add",intervalToAdd);
    Platform.Variable.SetValue("@dateAdd_type",intervalType);
    return TreatAsContent("%%=DateAdd(@dateAdd_ts, @dateAdd_add, @dateAdd_type)=%%");
}

function getAccessToken() {
    // Check for valid cached token
    var cached = Platform.Function.Lookup("TokenCache", "token",
        "service", "sfmcRest");
    var expiry = Platform.Function.Lookup("TokenCache", "expires",
        "service", "sfmcRest");

    if (cached && expiry && new Date(expiry) > new Date()) {
        return cached;
    }

    // Fetch new token
    var resp = Platform.Function.HTTPPost(authUrl, "application/json",
        Stringify({ grant_type: "client_credentials",
                    client_id: clientId, client_secret: clientSecret }));
    var token = Platform.Function.ParseJSON(resp + "");

    // Cache it
    Platform.Function.UpsertData("TokenCache",
        ["service"], ["sfmcRest"],
        ["token", "expires"],
        [token.access_token, Platform.Function.FormatDate(
            dateAdd(Now(), token.expires_in - 60, "S"),
            "MM/DD/YYYY HH:mm:ss")]
    );

    return token.access_token;
}
```

---

## 5. Automation Studio Timeout Guard

Long-running automations can time out mid-loop. Add a time guard:

```javascript
var startTime = new Date().getTime();
var MAX_RUNTIME_MS = 25 * 60 * 1000; // 25 minutes

for (var i = 0; i < rows.length; i++) {
    var elapsed = new Date().getTime() - startTime;
    if (elapsed > MAX_RUNTIME_MS) {
        // Save progress marker and exit gracefully
        Platform.Function.UpsertData("ProcessingState",
            ["jobId"], [jobId],
            ["lastProcessed", "status"],
            [rows[i].id, "paused"]
        );
        break;
    }
    processRow(rows[i]);
}
```

---

## 6. String Concatenation in Loops

Building large strings with `+=` in a loop is slow for very large outputs. For large HTML generation:

```javascript
// For moderate output (< a few thousand characters), += is fine
var html = "";
for (var i = 0; i < items.length; i++) {
    html += "<li>" + items[i].name + "</li>";
}
Write(html);
```

For very large outputs (thousands of items), use `Write()` directly in the loop to avoid a large string in memory:

```javascript
Write("<ul>");
for (var i = 0; i < items.length; i++) {
    Write("<li>" + items[i].name + "</li>");
}
Write("</ul>");
```

---

## 7. Avoid Unnecessary Platform.Load

`Platform.Load("core", "1.1.5")` has a small overhead. Call it once per page, not multiple times:

```javascript
// CORRECT — called once
Platform.Load("core", "1.1.5");

// WRONG — redundant calls add overhead
Platform.Load("core", "1.1.5");
var de = DataExtension.Init("DE1");
Platform.Load("core", "1.1.5"); // don't call again
var sub = Subscriber.Init("sub_123");
```

---

## 8. Prefer Platform.Function for Single Lookups

For single-row lookups, `Platform.Function.Lookup` is faster than `DataExtension.Init` + `Rows.Retrieve`:

```javascript
// Faster for single value
var email = Platform.Function.Lookup("Contacts", "Email", "Id", contactId);

// Slower for single value (Core initializes more objects)
var de = DataExtension.Init("Contacts");
var rows = de.Rows.Retrieve({ Property: "Id", SimpleOperator: "equals", Value: contactId });
var email = rows[0] ? rows[0].Email : "";
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/language/loops/">Loops</a></li>
  <li><a href="/best-practices/debugging/">Debugging</a></li>
  <li><a href="/getting-started/platform-vs-core/">Platform.Function vs Core Library</a></li>
</ul>
</div>
