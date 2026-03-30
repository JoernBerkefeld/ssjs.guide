---
layout: page
title: Loops
parent: Language Guide
parent_url: /language/
description: for, while, do...while, for...in, performance tips, and loop patterns for SFMC SSJS.
---

## for Loop

The classic `for` loop is the most common in SSJS:

```javascript
var rows = Platform.Function.LookupRows("MyDE", "Status", "active");

for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    Write(row["Email"] + "<br>");
}
```

### Cache the Length

**Always cache `arr.length` in a variable before the loop.** The SSJS engine re-evaluates the condition expression on every iteration. For arrays from Platform functions this is a real performance difference:

```javascript
// ⚠️ Slow — length re-evaluated on each iteration
for (var i = 0; i < rows.length; i++) { ... }

// ✅ Fast — length cached once
var len = rows.length;
for (var i = 0; i < len; i++) { ... }
```

### Reverse Loop (when order doesn't matter)

Slightly more efficient because it only compares against `0`:

```javascript
var len = items.length;
for (var i = len - 1; i >= 0; i--) {
    process(items[i]);
}
```

## while Loop

Use when the number of iterations is not known upfront:

```javascript
var page = 1;
var hasMore = true;

while (hasMore) {
    var result = fetchPage(page);
    processResults(result.items);

    if (result.items.length < 200) {
        hasMore = false;
    } else {
        page++;
    }
}
```

## do...while Loop

Executes the body at least once before checking the condition:

```javascript
var attempts = 0;
var success = false;

do {
    success = tryOperation();
    attempts++;
} while (!success && attempts < 3);
```

## for...in Loop

Iterates over the enumerable properties of an object. **Always use `hasOwnProperty`** to skip inherited properties:

```javascript
var config = { timeout: 30, retries: 3, debug: false };

for (var key in config) {
    if (config.hasOwnProperty(key)) {
        Write(key + " = " + config[key] + "<br>");
    }
}
```

**Do not use `for...in` to iterate arrays** — it iterates property names (indices as strings), not values, and inherited Array prototype properties may appear:

```javascript
// ❌ Bad: for...in on arrays
var arr = [10, 20, 30];
for (var k in arr) {
    Write(arr[k]); // Works accidentally, but fragile
}

// ✅ Good: for loop on arrays
for (var i = 0; i < arr.length; i++) {
    Write(arr[i]);
}
```

## for...of — NOT SUPPORTED

`for...of` is ES6 and **not available in SSJS**. The linter will flag it.

```javascript
// ❌ Not supported
for (var item of items) { }

// ✅ Use for loop instead
for (var i = 0; i < items.length; i++) {
    var item = items[i];
}
```

## break and continue

```javascript
// break — exit the loop
for (var i = 0; i < 100; i++) {
    if (found) { break; }
}

// continue — skip to next iteration
for (var i = 0; i < items.length; i++) {
    if (!items[i].active) { continue; } // skip inactive
    processItem(items[i]);
}

// Labeled break (exit outer loop from inner)
outer: for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < cols.length; j++) {
        if (found) { break outer; }
    }
}
```

## Automation Timeout Guard

Script Activities in Automation Studio have a **30-minute hard timeout**. For long-running batch processes, monitor elapsed time and break:

```javascript
<script runat="server">
Platform.Load("core", "1.1.5");

var startTime = new Date();
var MAX_MINUTES = 25;

var proxy = new WSProxy();
var result = proxy.retrieve("DataExtension", ["CustomerKey", "Name"]);
var allDEs = result.Results;

var processed = 0;
var len = allDEs.length;

for (var i = 0; i < len; i++) {
    var elapsed = (new Date() - startTime) / 60000;
    if (elapsed >= MAX_MINUTES) {
        Write("Time limit reached. Processed " + processed + " of " + len);
        break;
    }

    // Process each DE
    processDE(allDEs[i]);
    processed++;
}

Write("Done: " + processed + " processed.");
</script>
```

## Performance Tips

1. **Cache loop length** — `var len = arr.length;`
2. **Cache repeated property accesses** — `var name = person.profile.name;` before the loop
3. **Avoid creating objects inside tight loops** when possible
4. **WSProxy batching** — use `createBatch`/`updateBatch` instead of looping over individual creates/updates
5. **Limit DE row retrieval** — use `LookupOrderedRows` with a `sortCount` limit instead of retrieving all rows

```javascript
// Retrieve only the first 100 rows, newest first
var rows = Platform.Function.LookupOrderedRows(
    "MyDE",
    100,           // max rows
    "CreatedDate", // sort field
    "DESC",        // sort direction
    "Active",      // filter field
    "1"            // filter value
);
```
