---
layout: page
title: Polyfills
parent: Engine Limitations
parent_url: /engine-limitations/
description: Ready-to-use polyfill implementations and helpers for the missing or broken Array, String, and Function methods in SFMC SSJS.
---

Copy the polyfills you need to the top of your SSJS script block (before any usage). Add only the ones you actually use — each one adds a small amount of overhead.

## Usage Pattern

```javascript
<script runat="server">
// 1. Add polyfills at the very top (before any code that uses them)
Array.prototype.forEach = Array.prototype.forEach || function(callback) {
    for (var i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

// 2. Now use the polyfilled methods normally
var emails = [];
rows.forEach(function(row) {
    emails.push(row["Email"]);
});
</script>
```

The `|| function(...)` guard prevents re-defining methods that may become available in future engine updates.

> **Important:** Some array method names (`indexOf`, `lastIndexOf`) are ambiguous with `String.prototype` methods of the same name. The polyfills below only add to `Array.prototype` — `String.prototype.indexOf` works correctly without polyfilling.

---

## Array Polyfills

### forEach

```javascript
Array.prototype.forEach = Array.prototype.forEach || function(callback) {
    if (typeof callback !== 'function') { return; }
    for (var i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};
```

### map

```javascript
Array.prototype.map = Array.prototype.map || function(callback) {
    if (typeof callback !== 'function') { return []; }
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};
```

### filter

```javascript
Array.prototype.filter = Array.prototype.filter || function(predicate) {
    if (typeof predicate !== 'function') { return []; }
    var result = [];
    for (var i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) { result.push(this[i]); }
    }
    return result;
};
```

### find

```javascript
Array.prototype.find = Array.prototype.find || function(predicate) {
    if (typeof predicate !== 'function') { return undefined; }
    for (var i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) { return this[i]; }
    }
    return undefined;
};
```

### findIndex

```javascript
Array.prototype.findIndex = Array.prototype.findIndex || function(predicate) {
    if (typeof predicate !== 'function') { return -1; }
    for (var i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) { return i; }
    }
    return -1;
};
```

### indexOf (Array)

Note: `String.prototype.indexOf` already works. This only polyfills `Array.prototype.indexOf`.

```javascript
Array.prototype.indexOf = Array.prototype.indexOf || function(searchValue, fromIndex) {
    var start = fromIndex || 0;
    for (var i = start; i < this.length; i++) {
        if (this[i] === searchValue) { return i; }
    }
    return -1;
};
```

### lastIndexOf (Array — broken, must override)

`Array.prototype.lastIndexOf` exists but always returns `-1`. Override it unconditionally:

```javascript
Array.prototype.lastIndexOf = function(searchValue, fromIndex) {
    var start = (fromIndex !== undefined) ? fromIndex : this.length - 1;
    for (var i = start; i >= 0; i--) {
        if (this[i] === searchValue) { return i; }
    }
    return -1;
};
```

### includes

```javascript
Array.prototype.includes = Array.prototype.includes || function(searchValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === searchValue) { return true; }
    }
    return false;
};
```

### some

```javascript
Array.prototype.some = Array.prototype.some || function(predicate) {
    if (typeof predicate !== 'function') { return false; }
    for (var i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) { return true; }
    }
    return false;
};
```

### every

```javascript
Array.prototype.every = Array.prototype.every || function(predicate) {
    if (typeof predicate !== 'function') { return true; }
    for (var i = 0; i < this.length; i++) {
        if (!predicate(this[i], i, this)) { return false; }
    }
    return true;
};
```

### reduce

```javascript
Array.prototype.reduce = Array.prototype.reduce || function(callback, initialValue) {
    if (typeof callback !== 'function') { return initialValue; }
    var accumulator = (arguments.length > 1) ? initialValue : this[0];
    var startIndex  = (arguments.length > 1) ? 0 : 1;
    for (var i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};
```

### reduceRight

```javascript
Array.prototype.reduceRight = Array.prototype.reduceRight || function(callback, initialValue) {
    if (typeof callback !== 'function') { return initialValue; }
    var accumulator = (arguments.length > 1) ? initialValue : this[this.length - 1];
    var startIndex  = (arguments.length > 1) ? this.length - 1 : this.length - 2;
    for (var i = startIndex; i >= 0; i--) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};
```

### fill

```javascript
Array.prototype.fill = Array.prototype.fill || function(value, startIndex, endIndex) {
    var start = startIndex || 0;
    var end = (!endIndex || endIndex > this.length) ? this.length : endIndex;
    for (var i = start; i < end; i++) {
        this[i] = value;
    }
    return this;
};
```

### copyWithin

```javascript
Array.prototype.copyWithin = Array.prototype.copyWithin || function(targetIndex, startIndex, count) {
    var n = count || 1;
    for (var i = 0; i < n; i++) {
        this[targetIndex + i] = this[startIndex + i];
    }
    return this;
};
```

### entries

```javascript
Array.prototype.entries = Array.prototype.entries || function() {
    var index = 0;
    var arr = this;
    return {
        next: function() {
            if (index < arr.length) {
                return { value: [index, arr[index++]], done: false };
            }
            return { done: true };
        }
    };
};
```

### splice (partially broken — override only if you insert items)

`Array.prototype.splice(start[, deleteCount[, item1 … itemN]])` works correctly in SFMC SSJS for the **delete-only** form (`splice(start)` and `splice(start, deleteCount)`). The bug surfaces **only when you insert items**: as soon as a third argument (`item1`) is passed, the engine ignores `start` and `deleteCount` and just overwrites from the left with the items to insert. If you ever call the insert form (with one or more `item1 … itemN`), override it unconditionally:

```javascript
Array.prototype.splice = function(start, deleteCount) {
    var arr = this;
    var len = arr.length;
    start = start < 0 ? (len + start < 0 ? 0 : len + start) : (start > len ? len : start);
    var removeCount = arguments.length < 2 ? len - start : (deleteCount < 0 ? 0 : deleteCount);
    if (removeCount > len - start) { removeCount = len - start; }
    var endIndex = start + removeCount;
    var before = [];
    var removed = [];
    var after = [];
    for (var i = 0; i < len; i++) {
        if (i < start)         { before.push(arr[i]); }
        else if (i < endIndex) { removed.push(arr[i]); }
        else                   { after.push(arr[i]); }
    }
    // item1 … itemN — unlimited additional items to insert at start
    for (var j = 2; j < arguments.length; j++) {
        before.push(arguments[j]);
    }
    var merged = before.concat(after);
    var maxLen = arr.length > merged.length ? arr.length : merged.length;
    for (var k = 0; k < maxLen; k++) {
        if (k < merged.length) { arr[k] = merged[k]; }
        else                   { arr.pop(); }
    }
    return removed;
};
```

### Array.isArray (static)

```javascript
Array.isArray = Array.isArray || function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
};
```

### Array.of (static)

```javascript
Array.of = Array.of || function() {
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
        result.push(arguments[i]);
    }
    return result;
};
```

---

## String Polyfills

### trim

```javascript
String.prototype.trim = String.prototype.trim || function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
```

### startsWith

```javascript
String.prototype.startsWith = String.prototype.startsWith || function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
};
```

### endsWith

> **Two engine quirks to respect (both verified on a CloudPage):**
>
> 1. **Never name the second parameter `length`.** A function parameter literally named `length` collides with the engine's internal length intrinsic and throws `invalid length` at runtime. Name it `endPosition` instead.
> 2. **Short-circuit an empty search string to `true`.** `substring(len, len)` does not reliably yield `''` on this engine, so `'x'.endsWith('')` returns `false` without the guard. The ECMAScript spec requires an empty search string to always return `true`.

```javascript
String.prototype.endsWith = String.prototype.endsWith || function(searchString, endPosition) {
    var str = String(this);
    var search = String(searchString);
    if (search.length === 0) { return true; }
    var strLen = str.length;
    var end = (endPosition === undefined || endPosition > strLen) ? strLen : Number(endPosition);
    if (end < 0) { end = 0; }
    var start = end - search.length;
    if (start < 0) { return false; }
    return str.substring(start, end) === search;
};
```

---

## Function Helpers

`Function.prototype.call` and `Function.prototype.apply` are **ES3 and work natively** in SFMC SSJS — no polyfill is needed for either.

`Function.prototype.bind` (ES5) is **not** available, and unlike `Array.prototype` / `String.prototype`, **`Function.prototype` is sealed** — assigning `Function.prototype.bind = …` silently has no effect. Use a standalone helper instead of a prototype polyfill.

### bindFn (standalone helper — `bind` cannot be installed on the prototype)

```javascript
function bindFn(fn, thisArg) {
    var preArgs = [];
    for (var i = 2; i < arguments.length; i++) { preArgs.push(arguments[i]); }
    return function () {
        var callArgs = [];
        for (var a = 0; a < preArgs.length; a++) { callArgs.push(preArgs[a]); }
        for (var b = 0; b < arguments.length; b++) { callArgs.push(arguments[b]); }
        return fn.apply(thisArg, callArgs);
    };
}
```

Usage — `bindFn(fn, thisArg[, ...preArgs])` returns a new function with `this` and any leading arguments pre-bound:

```javascript
var greet = function (greeting, name) { return greeting + ', ' + name + '!'; };
var sayHi = bindFn(greet, null, 'Hi');
sayHi('Ada'); // "Hi, Ada!"
```

---

## Complete Polyfill Bundle

If you want all polyfills at once, paste this block at the top of your script:

```javascript
// SFMC SSJS Polyfill Bundle — add only what you need
Array.prototype.forEach   = Array.prototype.forEach   || function(cb) { if (typeof cb!=='function') return; for (var i=0;i<this.length;i++) cb(this[i],i,this); };
Array.prototype.map       = Array.prototype.map       || function(cb) { if (typeof cb!=='function') return []; var r=[]; for (var i=0;i<this.length;i++) r.push(cb(this[i],i,this)); return r; };
Array.prototype.filter    = Array.prototype.filter    || function(cb) { if (typeof cb!=='function') return []; var r=[]; for (var i=0;i<this.length;i++) if (cb(this[i],i,this)) r.push(this[i]); return r; };
Array.prototype.find      = Array.prototype.find      || function(cb) { if (typeof cb!=='function') return; for (var i=0;i<this.length;i++) if (cb(this[i],i,this)) return this[i]; };
Array.prototype.findIndex = Array.prototype.findIndex || function(cb) { if (typeof cb!=='function') return -1; for (var i=0;i<this.length;i++) if (cb(this[i],i,this)) return i; return -1; };
Array.prototype.indexOf   = Array.prototype.indexOf   || function(v,f) { for (var i=f||0;i<this.length;i++) if (this[i]===v) return i; return -1; };
Array.prototype.includes  = Array.prototype.includes  || function(v) { for (var i=0;i<this.length;i++) if (this[i]===v) return true; return false; };
Array.prototype.some      = Array.prototype.some      || function(cb) { if (typeof cb!=='function') return false; for (var i=0;i<this.length;i++) if (cb(this[i],i,this)) return true; return false; };
Array.prototype.every     = Array.prototype.every     || function(cb) { if (typeof cb!=='function') return true; for (var i=0;i<this.length;i++) if (!cb(this[i],i,this)) return false; return true; };
Array.prototype.lastIndexOf = function(v,f) { var s=(f!==undefined)?f:this.length-1; for (var i=s;i>=0;i--) if (this[i]===v) return i; return -1; }; // broken native — always override
Array.prototype.fill      = Array.prototype.fill      || function(v,s,e) { var start=s||0; var end=(!e||e>this.length)?this.length:e; for (var i=start;i<end;i++) this[i]=v; return this; };
Array.prototype.copyWithin = Array.prototype.copyWithin || function(t,s,c) { var n=c||1; for (var i=0;i<n;i++) this[t+i]=this[s+i]; return this; };
Array.prototype.entries   = Array.prototype.entries   || function() { var idx=0; var a=this; return { next: function() { return idx<a.length ? {value:[idx,a[idx++]],done:false} : {done:true}; } }; };
String.prototype.trim     = String.prototype.trim     || function() { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,''); };
String.prototype.startsWith = String.prototype.startsWith || function(s,p) { p=p||0; return this.indexOf(s,p)===p; };
String.prototype.endsWith   = String.prototype.endsWith   || function(searchString,endPosition) { var str=String(this); var search=String(searchString); if (search.length===0) return true; var strLen=str.length; var end=(endPosition===undefined||endPosition>strLen)?strLen:Number(endPosition); if (end<0) end=0; var start=end-search.length; if (start<0) return false; return str.substring(start,end)===search; };
Array.isArray = Array.isArray || function(v) { return Object.prototype.toString.call(v)==='[object Array]'; };
// Function.prototype.bind is unavailable AND the prototype is sealed — use this standalone helper instead:
function bindFn(fn,thisArg) { var preArgs=[]; for (var i=2;i<arguments.length;i++) preArgs.push(arguments[i]); return function() { var callArgs=[]; for (var a=0;a<preArgs.length;a++) callArgs.push(preArgs[a]); for (var b=0;b<arguments.length;b++) callArgs.push(arguments[b]); return fn.apply(thisArg,callArgs); }; }
```
