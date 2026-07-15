---
layout: category
title: Platform Functions
description: The Platform.Function.* API — Data Extension CRUD, dates, HTTP helpers, SOAP wrappers, and content helpers. Most calls do not require Platform.Load.
verification: in-progress
differs_from_docs: true
---

Most methods here are invoked as `Platform.Function.MethodName(...)`.

## Data Extensions {#data-extensions}

Read and write rows in SFMC Data Extensions.

<div class="function-grid">
  <a href="/platform-functions/lookup/" class="function-card"><div class="fn-name">Lookup</div><div class="fn-desc">Get a single field value from a DE row matching filter criteria.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/lookuprows/" class="function-card"><div class="fn-name">LookupRows</div><div class="fn-desc">Get multiple rows from a DE matching filter criteria.</div><div class="fn-return">→ object[]</div></a>
  <a href="/platform-functions/lookuporderedrows/" class="function-card"><div class="fn-name">LookupOrderedRows</div><div class="fn-desc">Get sorted rows with a max count and filter.</div><div class="fn-return">→ object[]</div></a>
  <a href="/platform-functions/insertdata/" class="function-card"><div class="fn-name">InsertData</div><div class="fn-desc">Add a new row to a Data Extension.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/updatedata/" class="function-card"><div class="fn-name">UpdateData</div><div class="fn-desc">Modify existing rows matching filter criteria.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/upsertdata/" class="function-card"><div class="fn-name">UpsertData</div><div class="fn-desc">Insert or update a row based on filter match.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/deletedata/" class="function-card"><div class="fn-name">DeleteData</div><div class="fn-desc">Remove rows matching filter criteria.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/insertde/" class="function-card"><div class="fn-name">InsertDE</div><div class="fn-desc">Alias for InsertData.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/updatede/" class="function-card"><div class="fn-name">UpdateDE</div><div class="fn-desc">Alias for UpdateData.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/upsertde/" class="function-card"><div class="fn-name">UpsertDE</div><div class="fn-desc">Alias for UpsertData.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/deletede/" class="function-card"><div class="fn-name">DeleteDE</div><div class="fn-desc">Alias for DeleteData.</div><div class="fn-return">→ number</div></a>
</div>

## Dates {#dates}

<div class="function-grid">
  <a href="/platform-functions/now/" class="function-card"><div class="fn-name">Now</div><div class="fn-desc">Current SFMC server date and time.</div><div class="fn-return">→ Date</div></a>
  <a href="/platform-functions/systemdatetolocaldate/" class="function-card"><div class="fn-name">SystemDateToLocalDate</div><div class="fn-desc">Convert system date to subscriber local timezone (send contexts).</div><div class="fn-return">→ Date</div></a>
  <a href="/platform-functions/localdatetosystemdate/" class="function-card"><div class="fn-name">LocalDateToSystemDate</div><div class="fn-desc">Convert a local date value to the SFMC system date.</div><div class="fn-return">→ Date</div></a>
</div>

## URLs, redirects, and browser detection {#urls}

<div class="function-grid">
  <a href="/platform-functions/urlencode/" class="function-card"><div class="fn-name">UrlEncode</div><div class="fn-desc">Percent-encode a complete URL (optional reserved-character mode).</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/redirectto/" class="function-card"><div class="fn-name">RedirectTo</div><div class="fn-desc">Email href helper for attribute-driven redirect URLs (AMPscript/WS-FUEL).</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/ischtmlbrowser/" class="function-card"><div class="fn-name">IsCHTMLBrowser</div><div class="fn-desc">Detect HTML vs text email clients.</div><div class="fn-return">→ boolean</div></a>
</div>

## Logic and parsing {#logic}

<div class="function-grid">
  <a href="/platform-functions/parsejson/" class="function-card"><div class="fn-name">ParseJSON</div><div class="fn-desc">Parse a JSON string to a JavaScript object.</div><div class="fn-return">→ object</div></a>
  <a href="/platform-functions/guid/" class="function-card"><div class="fn-name">GUID</div><div class="fn-desc">Generate a new globally unique identifier string.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/isemailaddress/" class="function-card"><div class="fn-name">IsEmailAddress</div><div class="fn-desc">Validate a string as an email address format.</div><div class="fn-return">→ boolean</div></a>
  <a href="/platform-functions/isphonenumber/" class="function-card"><div class="fn-name">IsPhoneNumber</div><div class="fn-desc">Evaluate whether a string is a valid phone number.</div><div class="fn-return">→ boolean</div></a>
  <a href="/platform-functions/raiseerror/" class="function-card"><div class="fn-name">RaiseError</div><div class="fn-desc">Stop execution and raise an error with optional skip-send.</div><div class="fn-return">→ void</div></a>
</div>

## SOAP API helpers {#soap}

Low-level SOAP API wrappers. For most SOAP operations, prefer [WSProxy](/wsproxy/) instead.

<div class="function-grid">
  <a href="/platform-functions/createobject/" class="function-card"><div class="fn-name">CreateObject</div><div class="fn-desc">Instantiate a Marketing Cloud SOAP API object.</div><div class="fn-return">→ object</div></a>
  <a href="/platform-functions/setobjectproperty/" class="function-card"><div class="fn-name">SetObjectProperty</div><div class="fn-desc">Set a property on a SOAP API object.</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/addobjectarrayitem/" class="function-card"><div class="fn-name">AddObjectArrayItem</div><div class="fn-desc">Append an item to a SOAP API object array property.</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/invokecreate/" class="function-card"><div class="fn-name">InvokeCreate</div><div class="fn-desc">Execute a SOAP Create call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeretrieve/" class="function-card"><div class="fn-name">InvokeRetrieve</div><div class="fn-desc">Execute a SOAP Retrieve call.</div><div class="fn-return">→ object[]</div></a>
  <a href="/platform-functions/invokeupdate/" class="function-card"><div class="fn-name">InvokeUpdate</div><div class="fn-desc">Execute a SOAP Update call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokedelete/" class="function-card"><div class="fn-name">InvokeDelete</div><div class="fn-desc">Execute a SOAP Delete call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeperform/" class="function-card"><div class="fn-name">InvokePerform</div><div class="fn-desc">Execute a SOAP Perform action.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeconfigure/" class="function-card"><div class="fn-name">InvokeConfigure</div><div class="fn-desc">Execute a SOAP Configure call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeexecute/" class="function-card"><div class="fn-name">InvokeExecute</div><div class="fn-desc">Execute a SOAP Execute call.</div><div class="fn-return">→ object[]</div></a>
  <a href="/platform-functions/invokeextract/" class="function-card"><div class="fn-name">InvokeExtract</div><div class="fn-desc">Execute a SOAP Extract call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeschedule/" class="function-card"><div class="fn-name">InvokeSchedule</div><div class="fn-desc">Execute a SOAP Schedule call.</div><div class="fn-return">→ string</div></a>
</div>

## HTTP {#http}

Simple HTTP functions — for full REST control see [Script.Util.HttpRequest](/http/script-util-httprequest/).

<div class="function-grid">
  <a href="/platform-functions/httpget/" class="function-card"><div class="fn-name">HTTPGet</div><div class="fn-desc">Perform an HTTP GET request.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/httppost/" class="function-card"><div class="fn-name">HTTPPost</div><div class="fn-desc">Perform an HTTP POST with content type and payload.</div><div class="fn-return">→ string</div></a>
</div>

## Output helpers {#output}

`Platform.Function.Write` and `Platform.Function.Stringify` are documented alongside their bare-name Core forms under [Write](/core-library/write/) and [Stringify](/core-library/stringify/).

## Content {#content}

<div class="function-grid">
  <a href="/platform-functions/contentblockbykey/" class="function-card"><div class="fn-name">ContentBlockByKey</div><div class="fn-desc">Render a Content Builder asset by customer key.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/contentblockbyname/" class="function-card"><div class="fn-name">ContentBlockByName</div><div class="fn-desc">Render a Content Builder asset by folder path and name.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/contentblockbyid/" class="function-card"><div class="fn-name">ContentBlockByID</div><div class="fn-desc">Render a Content Builder asset by numeric ID.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/contentimagebykey/" class="function-card"><div class="fn-name">ContentImageByKey</div><div class="fn-desc">Output an img tag for a Content Builder image by key.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/contentimagebyid/" class="function-card"><div class="fn-name">ContentImageByID</div><div class="fn-desc">Output an img tag for a Content Builder image by ID.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/beginimpressionregion/" class="function-card"><div class="fn-name">BeginImpressionRegion</div><div class="fn-desc">Start a named impression tracking region.</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/endimpressionregion/" class="function-card"><div class="fn-name">EndImpressionRegion</div><div class="fn-desc">End an impression region.</div><div class="fn-return">→ null</div></a>
  <a href="/platform-functions/treatascontent/" class="function-card"><div class="fn-name">TreatAsContent</div><div class="fn-desc">Evaluate AMPscript/HTML server-side. Security: never pass unvalidated user input.</div><div class="fn-return">→ string</div></a>
</div>

## Encoding & Hashing {#encoding}

<div class="function-grid">
  <a href="/platform-functions/md5/" class="function-card"><div class="fn-name">MD5</div><div class="fn-desc">Returns an MD5 hash for a given string value.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/base64encode/" class="function-card"><div class="fn-name">Base64Encode</div><div class="fn-desc">Encode a string to Base64 with optional charset.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/base64decode/" class="function-card"><div class="fn-name">Base64Decode</div><div class="fn-desc">Decode a Base64-encoded string with optional charset.</div><div class="fn-return">→ string</div></a>
</div>
