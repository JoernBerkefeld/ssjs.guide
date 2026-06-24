---
layout: page
title: Array Methods
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: Array prototype methods and statics in SSJS — which work natively, which are partial, and which are missing, with safe ES3/ES5 alternatives and polyfill links.
---

Each member below is tagged with the ECMAScript edition that standardized it: `(ES3)`, `(ES5)`, or `(ES6)`. Methods that need a polyfill link to [Polyfills](/engine-limitations/polyfills/).

## Status legend

| Icon | Meaning |
|------|---------|
| ✅ Works | Available and behaves as expected |
| ⚠️ Partial | Available but with a documented caveat or bug |
| ❌ Missing | Not available — use the workaround / polyfill |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`push(...items)`](#push) | ES3 | ✅ Works | |
| [`pop()`](#pop) | ES3 | ✅ Works | |
| [`shift()`](#shift) | ES3 | ✅ Works | |
| [`unshift(...items)`](#unshift) | ES3 | ✅ Works | |
| [`concat(...arrays)`](#concat) | ES3 | ✅ Works | |
| [`join(separator)`](#join) | ES3 | ✅ Works | |
| [`reverse()`](#reverse) | ES3 | ✅ Works | |
| [`length`](#length) | ES3 | ✅ Works | |
| [`toLocaleString()`](#tolocalestring) | ES3 | ✅ Works | |
| [`slice(start, end)`](#slice) | ES3 | ⚠️ Partial | Negative indices unreliable — see Polyfills |
| [`sort(compareFn)`](#sort) | ES3 | ⚠️ Partial | Comparator behavior unreliable — see Polyfills |
| [`splice(start, deleteCount, ...items)`](#splice) | ES3 | ⚠️ Partial | Delete form works; insert form (3rd+ arg) ignores `start`/`deleteCount` — see Polyfills |
| [`indexOf(searchValue, fromIndex)`](#indexof) | ES5 | ❌ Missing | See Polyfills |
| [`lastIndexOf(searchValue, fromIndex)`](#lastindexof) | ES5 | ⚠️ Partial | Broken — always returns -1; see Polyfills |
| [`forEach(fn)`](#foreach) | ES5 | ❌ Missing | Use a `for` loop or the polyfill |
| [`map(fn)`](#map) | ES5 | ❌ Missing | Use a `for` loop or the polyfill |
| [`filter(fn)`](#filter) | ES5 | ❌ Missing | Use a `for` loop or the polyfill |
| [`reduce(fn, initial)`](#reduce) | ES5 | ❌ Missing | Use a `for` loop or the polyfill |
| [`reduceRight(fn, initial)`](#reduceright) | ES5 | ❌ Missing | Use a `for` loop or the polyfill |
| [`some(fn)`](#some) | ES5 | ❌ Missing | Use a `for` loop or the polyfill |
| [`find(fn)`](#find) | ES6 | ❌ Missing | Use a `for` loop or the polyfill |
| [`findIndex(fn)`](#findindex) | ES6 | ❌ Missing | Use a `for` loop or the polyfill |
| [`includes(searchValue)`](#includes) | ES6 | ❌ Missing | Use `indexOf(x) !== -1` or the polyfill |
| [`fill(value, start, end)`](#fill) | ES6 | ❌ Missing | See Polyfills |
| [`copyWithin(target, start, count)`](#copywithin) | ES6 | ❌ Missing | See Polyfills |
| [`entries()`](#entries) | ES6 | ❌ Missing | See Polyfills |
| [`keys()`](#keys) | ES6 | ❌ Missing | Use a standard index `for` loop |
| [`values()`](#values) | ES6 | ❌ Missing | Use a standard index `for` loop |
| [`at(index)`](#at) | ES6 | ❌ Missing | Use `arr[i]` (and `arr[arr.length + i]` for negative `i`) |
| [`flat(depth)`](#flat) | ES6 | ❌ Missing | Concatenate nested arrays manually in a loop |
| [`flatMap(fn)`](#flatmap) | ES6 | ❌ Missing | Build the result with a `for` loop and `push` |
| [`findLast(fn)`](#findlast) | ES6 | ❌ Missing | Iterate from the end with a `for` loop |
| [`Array.isArray(value)`](#isarray) | ES5 | ❌ Missing | See Polyfills |
| [`Array.of(...items)`](#of) | ES6 | ❌ Missing | See Polyfills |
| [`Array.from(source)`](#from) | ES6 | ❌ Missing | Build the array with a `for` loop over the source |

---

## push {#push}

`(ES3)` — ✅ Works. Appends one or more items to the end of the array and returns the new length.

```javascript
var arr = [1, 2, 3];
arr.push(4);   // [1, 2, 3, 4]
```

## pop {#pop}

`(ES3)` — ✅ Works. Removes and returns the last item.

```javascript
var arr = [1, 2, 3];
var last = arr.pop();   // 3, arr = [1, 2]
```

## shift {#shift}

`(ES3)` — ✅ Works. Removes and returns the first item.

```javascript
var arr = [1, 2, 3];
var first = arr.shift();   // 1, arr = [2, 3]
```

## unshift {#unshift}

`(ES3)` — ✅ Works. Prepends one or more items and returns the new length.

```javascript
var arr = [1, 2, 3];
arr.unshift(0);   // arr = [0, 1, 2, 3]
```

## concat {#concat}

`(ES3)` — ✅ Works. Returns a new array combining the array with the given arrays/values.

```javascript
var combined = [1, 2].concat([3, 4]);   // [1, 2, 3, 4]
```

## join {#join}

`(ES3)` — ✅ Works. Joins all elements into a string using the given separator.

```javascript
["Hello", "World"].join(", ");   // "Hello, World"
```

## reverse {#reverse}

`(ES3)` — ✅ Works. Reverses the array in place.

```javascript
var arr = [1, 2, 3];
arr.reverse();   // [3, 2, 1]
```

## length {#length}

`(ES3)` — ✅ Works. The number of elements in the array.

```javascript
[1, 2, 3].length;   // 3
```

## toLocaleString {#tolocalestring}

`(ES3)` — ✅ Works. Returns a locale-specific string representation.

```javascript
[1, 2, 3].toLocaleString();   // "1,2,3"
```

## slice {#slice}

`(ES3)` — ⚠️ Partial. Returns a shallow copy of a portion of the array. Negative indices are unreliable in SFMC; apply the [polyfill](/engine-limitations/polyfills/#array-prototype-slice) for full ES5 behavior.

```javascript
var arr = [0, 1, 2, 3, 4];
arr.slice(1, 3);   // [1, 2]
arr.slice();       // copy of arr
// arr.slice(-2) — negative indices unreliable; use the polyfill
```

## sort {#sort}

`(ES3)` — ⚠️ Partial. Sorts in place. The comparator behavior is unreliable in SFMC; apply the [polyfill](/engine-limitations/polyfills/#array-prototype-sort) for predictable results.

```javascript
var arr = [3, 1, 4, 1, 5];
arr.sort(function (a, b) { return a - b; });   // ascending
```

## splice {#splice}

`(ES3)` — ⚠️ Partial. Signature: `splice(start[, deleteCount[, item1[, ...itemN]]])`.

{% include callout.html type="warning" content="The delete-only form — `splice(start)` and `splice(start, deleteCount)` — works correctly. The bug surfaces **only when you insert items**: as soon as a third argument is passed, the engine ignores `start` and `deleteCount` and overwrites from the left. Apply the polyfill from [Polyfills](/engine-limitations/polyfills/#array-prototype-splice) if you use the insert form." %}

```javascript
// Delete-only form works natively:
var arr = ["a", "b", "c", "d"];
arr.splice(1, 1);   // ["a", "c", "d"]
arr.splice(2);      // ["a", "c"]

// Insert form REQUIRES the polyfill:
var arr2 = ["a", "b", "c", "d"];
arr2.splice(1, 1, "X");        // ["a", "X", "c", "d"]
arr2.splice(1, 0, "B", "C");   // insert without removing
```

## indexOf {#indexof}

`(ES5)` — ❌ Missing. Not available in SFMC. Apply the [polyfill](/engine-limitations/polyfills/#array-prototype-indexof), or scan with a `for` loop.

```javascript
function indexOf(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) { return i; }
    }
    return -1;
}
```

## lastIndexOf {#lastindexof}

`(ES5)` — ⚠️ Partial. Present but broken — always returns `-1`. Apply the [polyfill](/engine-limitations/polyfills/#array-prototype-lastindexof), or scan from the end with a `for` loop.

```javascript
function lastIndexOf(arr, value) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === value) { return i; }
    }
    return -1;
}
```

## forEach {#foreach}

`(ES5)` — ❌ Missing. Use a `for` loop or the [polyfill](/engine-limitations/polyfills/#array-prototype-foreach).

```javascript
for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    // process item
}
```

## map {#map}

`(ES5)` — ❌ Missing. Use a `for` loop or the [polyfill](/engine-limitations/polyfills/#array-prototype-map).

```javascript
var doubled = [];
for (var i = 0; i < arr.length; i++) {
    doubled.push(arr[i] * 2);
}
```

## filter {#filter}

`(ES5)` — ❌ Missing. Use a `for` loop or the [polyfill](/engine-limitations/polyfills/#array-prototype-filter).

```javascript
var evens = [];
for (var i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) { evens.push(arr[i]); }
}
```

## reduce {#reduce}

`(ES5)` — ❌ Missing. Use a `for` loop or the [polyfill](/engine-limitations/polyfills/#array-prototype-reduce).

```javascript
var sum = 0;
for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
}
```

## reduceRight {#reduceright}

`(ES5)` — ❌ Missing. Use a reverse `for` loop or the [polyfill](/engine-limitations/polyfills/#array-prototype-reduceright).

```javascript
var sum = 0;
for (var i = arr.length - 1; i >= 0; i--) {
    sum += arr[i];
}
```

## some {#some}

`(ES5)` — ❌ Missing. Use a `for` loop or the [polyfill](/engine-limitations/polyfills/#array-prototype-some).

```javascript
var hasLarge = false;
for (var i = 0; i < arr.length; i++) {
    if (arr[i] > 10) { hasLarge = true; break; }
}
```

## find {#find}

`(ES6)` — ❌ Missing. Use a `for` loop or the [polyfill](/engine-limitations/polyfills/#array-prototype-find).

```javascript
var found = null;
for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === targetId) { found = arr[i]; break; }
}
```

## findIndex {#findindex}

`(ES6)` — ❌ Missing. Use a `for` loop or the [polyfill](/engine-limitations/polyfills/#array-prototype-findindex).

```javascript
var idx = -1;
for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === targetId) { idx = i; break; }
}
```

## includes {#includes}

`(ES6)` — ❌ Missing. Use the polyfilled `indexOf` (`indexOf(x) !== -1`) or the [polyfill](/engine-limitations/polyfills/#array-prototype-includes).

```javascript
function includes(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) { return true; }
    }
    return false;
}
```

## fill {#fill}

`(ES6)` — ❌ Missing. Apply the [polyfill](/engine-limitations/polyfills/#array-prototype-fill), or assign in a loop.

```javascript
var arr = [];
for (var i = 0; i < 5; i++) { arr.push(0); }   // [0,0,0,0,0]
```

## copyWithin {#copywithin}

`(ES6)` — ❌ Missing. Apply the [polyfill](/engine-limitations/polyfills/#array-prototype-copywithin).

## entries {#entries}

`(ES6)` — ❌ Missing. Apply the [polyfill](/engine-limitations/polyfills/#array-prototype-entries), or iterate with an index `for` loop reading `i` and `arr[i]`.

## keys {#keys}

`(ES6)` — ❌ Missing. Use a standard index `for` loop (`for (var i = 0; i < arr.length; i++)`).

## values {#values}

`(ES6)` — ❌ Missing. Use a standard index `for` loop reading `arr[i]`.

## at {#at}

`(ES6)` — ❌ Missing. Use `arr[i]`, and `arr[arr.length + i]` for negative `i`.

```javascript
var arr = [10, 20, 30];
arr[0];                   // 10  (arr.at(0))
arr[arr.length - 1];      // 30  (arr.at(-1))
```

## flat {#flat}

`(ES6)` — ❌ Missing. Concatenate nested arrays manually in a loop.

```javascript
function flatten(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "object" && arr[i].length !== undefined) {
            for (var j = 0; j < arr[i].length; j++) { result.push(arr[i][j]); }
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
```

## flatMap {#flatmap}

`(ES6)` — ❌ Missing. Build the result with a `for` loop and `push`.

```javascript
var result = [];
for (var i = 0; i < arr.length; i++) {
    var mapped = transform(arr[i]);   // returns an array
    for (var j = 0; j < mapped.length; j++) { result.push(mapped[j]); }
}
```

## findLast {#findlast}

`(ES6)` — ❌ Missing. Iterate from the end with a `for` loop.

```javascript
var found = null;
for (var i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) { found = arr[i]; break; }
}
```

## Array.isArray {#isarray}

`(ES5)` — ❌ Missing. Apply the [polyfill](/engine-limitations/polyfills/#array-isarray).

```javascript
function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
}
```

## Array.of {#of}

`(ES6)` — ❌ Missing. Apply the [polyfill](/engine-limitations/polyfills/#array-of), or build an array literal directly.

## Array.from {#from}

`(ES6)` — ❌ Missing. Build the array with a `for` loop over the source.

```javascript
var arr = [];
for (var i = 0; i < source.length; i++) { arr.push(source[i]); }
```

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/polyfills/">Polyfills</a></li>
  <li><a href="/ecmascript-builtins/">ECMAScript Built-ins</a></li>
  <li><a href="/language/loops/">Loops</a></li>
</ul>
</div>
