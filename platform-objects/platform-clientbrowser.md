---
layout: page
title: Platform.ClientBrowser
parent: Platform Objects
parent_url: /platform-objects/
description: Detect the client's browser type, version, and capabilities in email and CloudPage contexts.
---

`Platform.ClientBrowser` provides properties for detecting the subscriber's or visitor's browser. Most useful in email rendering contexts where HTML/CSS support varies.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `Platform.ClientBrowser.Name` | string | Browser name (e.g., `"IE"`, `"Chrome"`, `"Firefox"`) |
| `Platform.ClientBrowser.Version` | string | Browser version string |
| `Platform.ClientBrowser.Browser` | string | Full browser user agent string |
| `Platform.ClientBrowser.Platform` | string | OS platform (e.g., `"Win32"`, `"MacIntel"`) |
| `Platform.ClientBrowser.IsAOL` | boolean | Whether client is AOL |
| `Platform.ClientBrowser.IsIE` | boolean | Whether client is Internet Explorer |

## Examples

```javascript
var browser = Platform.ClientBrowser.Name;
var version = Platform.ClientBrowser.Version;
var ua = Platform.ClientBrowser.Browser;
var platform = Platform.ClientBrowser.Platform;

// Conditional rendering based on browser
if (Platform.ClientBrowser.IsIE) {
    Write('<div class="ie-notice">Please upgrade your browser.</div>');
}

// Log browser for analytics
Platform.Function.InsertData("BrowserLog",
    ["SubscriberKey", "Browser", "Version", "Platform", "Timestamp"],
    [subscriberKey, browser, version, platform, Platform.Function.Now()]
);
```

## Notes

{% include callout.html type="note" content="In modern SFMC deployments, most users access CloudPages via current browsers. `Platform.ClientBrowser` detection is more commonly used in email contexts where rendering discrepancies still matter." %}

Browser detection is based on the `User-Agent` header. It can be spoofed and should not be used for security decisions.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-objects/platform-request/">Platform.Request</a></li>
</ul>
</div>
