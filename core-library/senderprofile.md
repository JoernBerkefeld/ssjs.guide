---
layout: page
title: SenderProfile
parent: Core Library
parent_url: /core-library/
description: Manages sender profile definitions (Core library).
---

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Summary

Manages sender profile definitions. `SenderProfile.Retrieve()` does not exist. These methods only work on landing pages — not inside email messages at send time.

## Methods

`Init`, `Add`, `Update`, `Remove`
