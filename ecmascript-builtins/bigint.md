---
layout: page
title: BigInt
parent: ECMAScript Built-ins
parent_url: /ecmascript-builtins/
description: The ES2020 BigInt arbitrary-precision integer type is not available in SSJS — the SFMC Jint engine predates ES2020, so BigInt and bigint literals are unsupported.
verification: verified
test_scripts: complete
---

**`BigInt` is not available in SSJS.** The SFMC server-side JavaScript engine (Jint) predates ES2020, so the `BigInt` arbitrary-precision integer type is absent. `typeof BigInt` is `"undefined"`, and calling `BigInt(10)` throws `Object expected`. The `10n` literal syntax is also unsupported.

## Status legend

| Icon | Meaning |
|------|---------|
| ❌ Missing | Not available (or `undefined`) — no arbitrary-precision integers |

## Members

| Member | ES | Status | Notes |
|--------|----|--------|-------|
| [`BigInt(value)`](#bigint) | ES2020 | ❌ Missing | `typeof BigInt === "undefined"`; calling it throws |
| [`10n` literal](#bigint-literal) | ES2020 | ❌ Missing | Numeric BigInt literal syntax is unsupported |

---

## BigInt {#bigint}

`(ES2020)` — ❌ Missing. `BigInt` is **not defined** in the SFMC engine.

```javascript
(typeof BigInt === "undefined");   // true
// BigInt(10);                     // throws "Object expected: BigInt"
```

All numbers in SSJS are IEEE-754 doubles, so integers beyond `2^53 − 1` (`9007199254740991`) lose precision. When exact large-integer arithmetic is required, keep the value as a **string** and perform arithmetic digit-by-digit, or offload the computation to AMPscript/a Data Extension where feasible.

{% include test-script.html bundle="ecmascript-builtins--bigint" chapter="bigint" %}

## 10n literal {#bigint-literal}

`(ES2020)` — ❌ Missing. The `BigInt` numeric literal suffix (`10n`) is not part of the engine's grammar; using it is a syntax error. There is no literal form for large exact integers.

{% include test-script.html bundle="ecmascript-builtins--bigint" chapter="bigint-literal" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/engine-limitations/">Engine Limitations</a></li>
  <li><a href="/ecmascript-builtins/number-methods/">Number Methods</a></li>
</ul>
</div>
