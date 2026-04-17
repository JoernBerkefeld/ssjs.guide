---
layout: category
title: Platform Functions
description: The Platform.Function.* API — Data Extension CRUD, string manipulation, date math, crypto, HTTP, SOAP helpers, and more. Available without Platform.Load.
---

All methods documented here are accessed as `Platform.Function.MethodName(...)`. No `Platform.Load` call is required.

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
  <a href="/platform-functions/dataextensionrowcount/" class="function-card"><div class="fn-name">DataExtensionRowCount</div><div class="fn-desc">Count all rows in a Data Extension.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/insertde/" class="function-card"><div class="fn-name">InsertDE</div><div class="fn-desc">Alias for InsertData.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/updatede/" class="function-card"><div class="fn-name">UpdateDE</div><div class="fn-desc">Alias for UpdateData.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/upsertde/" class="function-card"><div class="fn-name">UpsertDE</div><div class="fn-desc">Alias for UpsertData.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/deletede/" class="function-card"><div class="fn-name">DeleteDE</div><div class="fn-desc">Alias for DeleteData.</div><div class="fn-return">→ number</div></a>
</div>

## Strings {#strings}

<div class="function-grid">
  <a href="/platform-functions/substring/" class="function-card"><div class="fn-name">Substring</div><div class="fn-desc">Extract part of a string (1-based indexing).</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/trim/" class="function-card"><div class="fn-name">Trim</div><div class="fn-desc">Remove leading and trailing whitespace.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/replace/" class="function-card"><div class="fn-name">Replace</div><div class="fn-desc">Substitute all occurrences of a substring.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/indexof/" class="function-card"><div class="fn-name">IndexOf</div><div class="fn-desc">Zero-based position of the first substring occurrence.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/length/" class="function-card"><div class="fn-name">Length</div><div class="fn-desc">Number of characters in a string.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/uppercase/" class="function-card"><div class="fn-name">Uppercase</div><div class="fn-desc">Convert to uppercase.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/lowercase/" class="function-card"><div class="fn-name">Lowercase</div><div class="fn-desc">Convert to lowercase.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/propercase/" class="function-card"><div class="fn-name">ProperCase</div><div class="fn-desc">Convert to title case.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/char/" class="function-card"><div class="fn-name">Char</div><div class="fn-desc">Character for a given ASCII code.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/concat/" class="function-card"><div class="fn-name">Concat</div><div class="fn-desc">Join two or more strings.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/format/" class="function-card"><div class="fn-name">Format</div><div class="fn-desc">Format a value using a .NET format string.</div><div class="fn-return">→ string</div></a>
</div>

## Dates {#dates}

<div class="function-grid">
  <a href="/platform-functions/now/" class="function-card"><div class="fn-name">Now</div><div class="fn-desc">Current SFMC server date and time.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/dateadd/" class="function-card"><div class="fn-name">DateAdd</div><div class="fn-desc">Add an interval to a date.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/datediff/" class="function-card"><div class="fn-name">DateDiff</div><div class="fn-desc">Difference between two dates in a given interval.</div><div class="fn-return">→ number</div></a>
  <a href="/platform-functions/dateparse/" class="function-card"><div class="fn-name">DateParse</div><div class="fn-desc">Convert a string to a date object.</div><div class="fn-return">→ object</div></a>
  <a href="/platform-functions/formatdate/" class="function-card"><div class="fn-name">FormatDate</div><div class="fn-desc">Format a date into a string pattern.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/systemdatetolocaldate/" class="function-card"><div class="fn-name">SystemDateToLocalDate</div><div class="fn-desc">Convert system date to subscriber's local timezone.</div><div class="fn-return">→ string</div></a>
</div>

## Logic & Utility {#logic}

<div class="function-grid">
  <a href="/platform-functions/parsejson/" class="function-card"><div class="fn-name">ParseJSON</div><div class="fn-desc">Parse a JSON string to a JavaScript object. SSJS equivalent of JSON.parse().</div><div class="fn-return">→ object</div></a>
  <a href="/platform-functions/guid/" class="function-card"><div class="fn-name">GUID</div><div class="fn-desc">Generate a new globally unique identifier string.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/isemailaddress/" class="function-card"><div class="fn-name">IsEmailAddress</div><div class="fn-desc">Validate a string as an email address format.</div><div class="fn-return">→ boolean</div></a>
  <a href="/platform-functions/isphonenumber/" class="function-card"><div class="fn-name">IsPhoneNumber</div><div class="fn-desc">Evaluate whether a string is a valid phone number.</div><div class="fn-return">→ boolean</div></a>
  <a href="/platform-functions/isnull/" class="function-card"><div class="fn-name">IsNull</div><div class="fn-desc">Check if a value is null.</div><div class="fn-return">→ boolean</div></a>
  <a href="/platform-functions/empty/" class="function-card"><div class="fn-name">Empty</div><div class="fn-desc">Check if a string is null, empty, or whitespace.</div><div class="fn-return">→ boolean</div></a>
  <a href="/platform-functions/iif/" class="function-card"><div class="fn-name">IIf</div><div class="fn-desc">Inline if — return one of two values based on a condition.</div><div class="fn-return">→ any</div></a>
  <a href="/platform-functions/urlencode/" class="function-card"><div class="fn-name">URLEncode</div><div class="fn-desc">URL-encode a string for safe use in query parameters.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/micrositeurl/" class="function-card"><div class="fn-name">MicrositeURL</div><div class="fn-desc">Generate a tracking URL for a microsite page.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/attributevalue/" class="function-card"><div class="fn-name">AttributeValue</div><div class="fn-desc">Safely retrieve a subscriber attribute value.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/raiseerror/" class="function-card"><div class="fn-name">RaiseError</div><div class="fn-desc">Stop execution and raise an error with optional skip-send.</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/redirect/" class="function-card"><div class="fn-name">Redirect</div><div class="fn-desc">Redirect the browser to a specified URL.</div><div class="fn-return">→ void</div></a>
</div>

## Encryption & Encoding {#crypto}

<div class="function-grid">
  <a href="/platform-functions/base64encode/" class="function-card"><div class="fn-name">Base64Encode</div><div class="fn-desc">Encode a string to Base64.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/base64decode/" class="function-card"><div class="fn-name">Base64Decode</div><div class="fn-desc">Decode a Base64-encoded string.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/sha256/" class="function-card"><div class="fn-name">SHA256</div><div class="fn-desc">Compute the SHA-256 hash of a string.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/sha512/" class="function-card"><div class="fn-name">SHA512</div><div class="fn-desc">Compute the SHA-512 hash of a string.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/md5/" class="function-card"><div class="fn-name">MD5</div><div class="fn-desc">Compute the MD5 hash of a string.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/encryptsymmetric/" class="function-card"><div class="fn-name">EncryptSymmetric</div><div class="fn-desc">Encrypt a string with AES or other symmetric algorithm.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/decryptsymmetric/" class="function-card"><div class="fn-name">DecryptSymmetric</div><div class="fn-desc">Decrypt a symmetrically encrypted string.</div><div class="fn-return">→ string</div></a>
</div>

## AMPscript Bridge {#ampscript}

<div class="function-grid">
  <a href="/platform-functions/getvalue/" class="function-card"><div class="fn-name">GetValue</div><div class="fn-desc">Retrieve the value of an AMPscript variable.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/setvalue/" class="function-card"><div class="fn-name">SetValue</div><div class="fn-desc">Assign a value to an AMPscript variable.</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/treatascontent/" class="function-card"><div class="fn-name">TreatAsContent</div><div class="fn-desc">Evaluate an AMPscript/HTML string and return rendered output.</div><div class="fn-return">→ string</div></a>
</div>

## SOAP API Helpers {#soap}

Low-level SOAP API wrappers. For most SOAP operations, prefer `WSProxy` instead.

<div class="function-grid">
  <a href="/platform-functions/createobject/" class="function-card"><div class="fn-name">CreateObject</div><div class="fn-desc">Instantiate a Marketing Cloud SOAP API object.</div><div class="fn-return">→ object</div></a>
  <a href="/platform-functions/setobjectproperty/" class="function-card"><div class="fn-name">SetObjectProperty</div><div class="fn-desc">Set a property on a SOAP API object.</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/addobjectarrayitem/" class="function-card"><div class="fn-name">AddObjectArrayItem</div><div class="fn-desc">Append an item to a SOAP API object array property.</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/invokecreate/" class="function-card"><div class="fn-name">InvokeCreate</div><div class="fn-desc">Execute a SOAP Create call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeretrieve/" class="function-card"><div class="fn-name">InvokeRetrieve</div><div class="fn-desc">Execute a SOAP Retrieve call.</div><div class="fn-return">→ object</div></a>
  <a href="/platform-functions/invokeupdate/" class="function-card"><div class="fn-name">InvokeUpdate</div><div class="fn-desc">Execute a SOAP Update call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokedelete/" class="function-card"><div class="fn-name">InvokeDelete</div><div class="fn-desc">Execute a SOAP Delete call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeperform/" class="function-card"><div class="fn-name">InvokePerform</div><div class="fn-desc">Execute a SOAP Perform action.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeconfigure/" class="function-card"><div class="fn-name">InvokeConfigure</div><div class="fn-desc">Execute a SOAP Configure call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeexecute/" class="function-card"><div class="fn-name">InvokeExecute</div><div class="fn-desc">Execute a SOAP Execute call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeextract/" class="function-card"><div class="fn-name">InvokeExtract</div><div class="fn-desc">Execute a SOAP Extract call.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/invokeschedule/" class="function-card"><div class="fn-name">InvokeSchedule</div><div class="fn-desc">Execute a SOAP Schedule call.</div><div class="fn-return">→ string</div></a>
</div>

## HTTP {#http}

Simple HTTP functions — for full REST support see [Script.Util.HttpRequest](/http/script-util-httprequest/).

<div class="function-grid">
  <a href="/platform-functions/httpget/" class="function-card"><div class="fn-name">HTTPGet</div><div class="fn-desc">Perform an HTTP GET request. Supports custom headers.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/httppost/" class="function-card"><div class="fn-name">HTTPPost</div><div class="fn-desc">Perform an HTTP POST with content type and payload.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/httprequestheader/" class="function-card"><div class="fn-name">HTTPRequestHeader</div><div class="fn-desc">Get the value of an incoming HTTP request header.</div><div class="fn-return">→ string</div></a>
</div>

## Content {#content}

<div class="function-grid">
  <a href="/global-functions/contentblockbykey/" class="function-card"><div class="fn-name">ContentBlockByKey</div><div class="fn-desc">Render a Content Builder asset by customer key (global).</div><div class="fn-return">→ string</div></a>
  <a href="/global-functions/contentblockbyname/" class="function-card"><div class="fn-name">ContentBlockByName</div><div class="fn-desc">Render a Content Builder asset by folder path and name (global).</div><div class="fn-return">→ string</div></a>
  <a href="/global-functions/contentblockbyid/" class="function-card"><div class="fn-name">ContentBlockByID</div><div class="fn-desc">Render a Content Builder asset by numeric ID (global).</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/contentimagebykey/" class="function-card"><div class="fn-name">ContentImageByKey</div><div class="fn-desc">Output an img tag for a Content Builder image by external key.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/contentimagebyid/" class="function-card"><div class="fn-name">ContentImageByID</div><div class="fn-desc">Output an img tag for a Content Builder image by numeric ID.</div><div class="fn-return">→ string</div></a>
  <a href="/platform-functions/beginimpressionregion/" class="function-card"><div class="fn-name">BeginImpressionRegion</div><div class="fn-desc">Start a named impression tracking region.</div><div class="fn-return">→ void</div></a>
  <a href="/platform-functions/endimpressionregion/" class="function-card"><div class="fn-name">EndImpressionRegion</div><div class="fn-desc">End an impression region (optionally close all nested).</div><div class="fn-return">→ void</div></a>
</div>
