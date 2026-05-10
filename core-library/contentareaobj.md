---
layout: page
title: ContentAreaObj
parent: Core Library
parent_url: /core-library/
description: Deprecated Core library object for classic Content Areas (not Platform.Function.ContentArea).
---

{% include callout.html type="warning" content="**Deprecated.** Content Areas are deprecated in SFMC; new content areas cannot be created or updated. Existing content areas may remain readable on older accounts only." %}

`ContentAreaObj` is the Core library **object** for classic content areas. It is **not** the same as the global `ContentArea` / `Platform.Function.ContentArea` deprecated helper used elsewhere.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Summary

Manages classic content area objects.

## Methods

`Init`, `Add`, `Retrieve`, `Update`, `Remove`
