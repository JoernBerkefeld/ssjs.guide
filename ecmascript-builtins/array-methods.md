---
layout: page
title: Array Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: Array prototype methods available in SSJS — which work natively, which need polyfills, and safe ES3/ES5 alternatives for missing methods.
---

## Modifying Arrays

### push / pop

```javascript
var arr = [1, 2, 3];
arr.push(4);       // [1, 2, 3, 4]
var last = arr.pop(); // 4, arr = [1, 2, 3]
```

### shift / unshift

```javascript
var arr = [1, 2, 3];
var first = arr.shift();   // 1, arr = [2, 3]
arr.unshift(0);            // arr = [0, 2, 3]
```

### splice

```javascript
var arr = ["a", "b", "c", "d"];
// Remove 1 element at index 1
arr.splice(1, 1);           // ["a", "c", "d"]

// Replace element
arr.splice(1, 1, "X");      // ["a", "X", "d"]

// Insert without removing
arr.splice(1, 0, "B");      // ["a", "B", "X", "d"]
```

### reverse / sort

```javascript
var arr = [3, 1, 4, 1, 5, 9];
arr.sort(function(a, b) { return a - b; });  // ascending
arr.reverse();  // descending
```

---

## Reading Arrays

### slice

```javascript
var arr = [0, 1, 2, 3, 4];
arr.slice(1, 3);  // [1, 2]
arr.slice(-2);    // [3, 4]
arr.slice();      // copy of arr
```

### join

```javascript
var parts = ["Hello", "World"];
parts.join(", ");   // "Hello, World"
parts.join("");     // "HelloWorld"
parts.join(" / ");  // "Hello / World"
```

### indexOf (may need polyfill)

```javascript
var arr = ["a", "b", "c"];
arr.indexOf("b");  // 1
arr.indexOf("z");  // -1
```

{% include callout.html type="warning" content="`Array.prototype.indexOf` may not be available without a polyfill. Add it if you rely on it. See [Polyfills](/engine-limitations/polyfills/)." %}

---

## Iteration (Use for loops)

In SSJS, `forEach`, `map`, `filter`, `reduce`, `some`, and `every` are **not available**. Use `for` loops instead.

### forEach equivalent

```javascript
// Instead of:  arr.forEach(function(item) { ... })
for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    // process item
}
```

### map equivalent

```javascript
// Instead of: var doubled = arr.map(function(x) { return x * 2; })
var doubled = [];
for (var i = 0; i < arr.length; i++) {
    doubled.push(arr[i] * 2);
}
```

### filter equivalent

```javascript
// Instead of: var evens = arr.filter(function(x) { return x % 2 === 0; })
var evens = [];
for (var i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
        evens.push(arr[i]);
    }
}
```

### reduce equivalent

```javascript
// Instead of: var sum = arr.reduce(function(acc, x) { return acc + x; }, 0)
var sum = 0;
for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
}
```

### find equivalent

```javascript
// Instead of: var found = arr.find(function(x) { return x.id === targetId; })
var found = null;
for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === targetId) {
        found = arr[i];
        break;
    }
}
```

### some/every equivalent

```javascript
// Instead of: arr.some(function(x) { return x > 10; })
var hasLarge = false;
for (var i = 0; i < arr.length; i++) {
    if (arr[i] > 10) { hasLarge = true; break; }
}

// Instead of: arr.every(function(x) { return x > 0; })
var allPositive = true;
for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= 0) { allPositive = false; break; }
}
```

---

## Array.isArray

`Array.isArray()` is not available. Use this pattern:

```javascript
function isArray(val) {
    return val !== null && typeof val === "object" && typeof val.length === "number";
}
```

---

## Flattening / Concatenation

`Array.prototype.flat()` and `Array.prototype.flatMap()` are ES6+ and not available. Use:

```javascript
// Concat arrays
var combined = arr1.concat(arr2);

// Manual flatten (one level)
function flatten(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "object" && arr[i].length !== undefined) {
            for (var j = 0; j < arr[i].length; j++) {
                result.push(arr[i][j]);
            }
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/engine-limitations/missing-methods/">Missing Methods</a></li>
  <li><a href="/language/loops/">Loops</a></li>
</ul>
</div>
