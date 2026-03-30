---
layout: page
title: HTTP.Get
parent: HTTP & REST APIs
parent_url: /http/
description: Core library simple HTTP GET — sends a GET request and returns the response body as a string. Requires Platform.Load.
---

`HTTP.Get` is a simple HTTP GET method from the Core library.

{% include callout.html type="warning" content="Requires `Platform.Load(\"core\", \"1.1.5\")` before use." %}

## Syntax

```javascript
var body = HTTP.Get(url);
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | Yes | Target URL |

## Return Value

Returns the response body as a string.

## Examples

```javascript
Platform.Load("core", "1.1.5");

var body = HTTP.Get("https://api.example.com/products");
var products = Platform.Function.ParseJSON(body + "");
for (var i = 0; i < products.length; i++) {
    Write(products[i].name + "<br>");
}
```

## Notes

`HTTP.Get` does not expose the HTTP status code. Use [`HTTP.GetRequest`](/http/http-getrequest/) if you need to inspect the response status.

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/http/http-getrequest/">HTTP.GetRequest</a></li>
  <li><a href="/http/http-post/">HTTP.Post</a></li>
  <li><a href="/http/script-util-httprequest/">Script.Util.HttpRequest</a></li>
  <li><a href="/platform-functions/httpget/">Platform.Function.HTTPGet</a></li>
</ul>
</div>
