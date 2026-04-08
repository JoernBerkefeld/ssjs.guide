---
layout: page
title: Function Index
description: Complete A–Z index of every SSJS function, method, and object across all sections — global functions, Platform.Function, Core library, WSProxy, HTTP, and ECMAScript built-ins.
nav_order: 12
---

A comprehensive alphabetical listing of all SSJS functions and objects documented in this reference.

---

## A

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.AddObjectArrayItem(obj, prop, val)`](/platform-functions/addobjectarrayitem/) | Platform Functions | void | Append item to a SOAP API object array property |
| [`Attribute.Value(name)`](/global-functions/attribute/) | Global Object | string | Read subscriber attribute in email context |

---

## B

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.Base64Decode(value)`](/platform-functions/base64decode/) | Platform Functions | string | Decode Base64 string |
| [`Platform.Function.Base64Encode(value)`](/platform-functions/base64encode/) | Platform Functions | string | Encode string to Base64 |
| [`Platform.Function.BeginImpressionRegion(name)`](/platform-functions/beginimpressionregion/) | Platform Functions | void | Start a named impression region |

---

## C

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.Char(ascii)`](/platform-functions/char/) | Platform Functions | string | Get character from ASCII code |
| [`Platform.Function.CloudPagesURL(pageId, ...)`](/platform-functions/cloudpagesurl/) | Platform Functions | string | Generate encrypted CloudPages URL |
| [`Platform.Function.Concat(...values)`](/platform-functions/concat/) | Platform Functions | string | Concatenate strings |
| [`ContentAreaByKey(key)`](/global-functions/contentareabykey/) | Global Functions | string | Render classic content area |
| [`ContentBlockByID(id)`](/global-functions/contentblockbyid/) | Global Functions | string | Render Content Builder block by ID |
| [`ContentBlockByKey(key)`](/global-functions/contentblockbykey/) | Global Functions | string | Render Content Builder block by key |
| [`ContentBlockByName(path)`](/global-functions/contentblockbyname/) | Global Functions | string | Render Content Builder block by name |
| [`Platform.Function.ContentImageByID(id[, fallback])`](/platform-functions/contentimagebyid/) | Platform Functions | string | img tag for Content Builder image by ID |
| [`Platform.Function.ContentImageByKey(key[, fallback])`](/platform-functions/contentimagebykey/) | Platform Functions | string | img tag for Content Builder image by key |
| [`Platform.Function.CreateObject(type)`](/platform-functions/createobject/) | Platform Functions | object | Create SOAP API object (legacy) |

---

## D

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.DataExtensionRowCount(de)`](/platform-functions/dataextensionrowcount/) | Platform Functions | number | Count rows in a DE |
| [`Platform.Function.DateAdd(date, n, unit)`](/platform-functions/dateadd/) | Platform Functions | date | Add time to a date |
| [`Platform.Function.DateDiff(d1, d2, unit)`](/platform-functions/datediff/) | Platform Functions | number | Calculate date difference |
| [`Platform.Function.DateParse(str, fmt)`](/platform-functions/dateparse/) | Platform Functions | date | Parse date string |
| [`DataExtension.Init(key)`](/core-library/dataextension/) | Core Library | DataExtension | Initialize DE object |
| [`de.Rows.Add(obj)`](/core-library/dataextension-rows/) | Core Library | number | Insert DE row |
| [`de.Rows.Remove(col, val)`](/core-library/dataextension-rows/) | Core Library | number | Delete DE rows |
| [`de.Rows.Retrieve([filter])`](/core-library/dataextension-rows/) | Core Library | object[] | Read DE rows |
| [`de.Rows.Update(vals, keys, keyVals)`](/core-library/dataextension-rows/) | Core Library | number | Update DE rows |
| [`Platform.Function.DecryptAsymmetric(val, key)`](/platform-functions/decryptasymmetric/) | Platform Functions | string | Decrypt with private key |
| [`Platform.Function.DecryptSymmetric(val, alg, ...)`](/platform-functions/decryptsymmetric/) | Platform Functions | string | Decrypt symmetric cipher |
| [`Platform.Function.DeleteData(de, keys, vals)`](/platform-functions/deletedata/) | Platform Functions | number | Delete DE rows |
| [`DeleteDE(...)`](/platform-functions/deletede/) | Platform Functions | number | Alias for DeleteData |

---

## E

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Email.Init(emailId)`](/core-library/email/) | Core Library | Email | Initialize email object |
| [`email.Send(sub, opts)`](/core-library/email/) | Core Library | number | Send email |
| [`Platform.Function.Empty(val)`](/platform-functions/empty/) | Platform Functions | boolean | Check null/empty/whitespace |
| [`Platform.Function.EncryptAsymmetric(val, key)`](/platform-functions/encryptasymmetric/) | Platform Functions | string | Encrypt with public key |
| [`Platform.Function.EncryptSymmetric(val, alg, ...)`](/platform-functions/encryptsymmetric/) | Platform Functions | string | Encrypt with symmetric cipher |
| [`Platform.Function.EndImpressionRegion([closeAll])`](/platform-functions/endimpressionregion/) | Platform Functions | void | End an impression region |
| [`Error(message)`](/global-functions/error/) | Global Functions | Error | Create Error object |
| [`Platform.Function.ExecuteFilter(name)`](/platform-functions/executefilter/) | Platform Functions | object[] | Execute saved DE filter |

---

## F

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.Format(val, fmt)`](/platform-functions/format/) | Platform Functions | string | Format number/string (.NET style) |
| [`Platform.Function.FormatDate(date, fmt, locale)`](/platform-functions/formatdate/) | Platform Functions | string | Format a date value |

---

## G

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.GUID()`](/platform-functions/guid/) | Platform Functions | string | Generate UUID v4 |

---

## H

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`HTTP.Get(url)`](/http/http-get/) | Core HTTP | string | Simple HTTP GET |
| [`HTTP.GetRequest(url, statusCode, ...)`](/http/http-getrequest/) | Core HTTP | string | HTTP GET with status code |
| [`Platform.Function.HTTPGet(url, ...)`](/platform-functions/httpget/) | Platform Functions | string | HTTP GET (no Core required) |
| [`Platform.Function.HTTPPost(url, ct, body, ...)`](/platform-functions/httppost/) | Platform Functions | string | HTTP POST (no Core required) |
| [`HTTP.Post(url, ct, body, ...)`](/http/http-post/) | Core HTTP | string | Simple HTTP POST |
| [`HTTP.PostRequest(url, ct, body, sc, ...)`](/http/http-postrequest/) | Core HTTP | string | HTTP POST with status code |
| [`Platform.Function.HMAC(alg, secret, msg)`](/platform-functions/hmac/) | Platform Functions | string | Compute HMAC signature |

---

## I

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.IIf(cond, t, f)`](/platform-functions/iif/) | Platform Functions | any | Inline conditional (ternary) |
| [`Platform.Function.IndexOf(val, sub)`](/platform-functions/indexof/) | Platform Functions | number | Find substring position |
| [`Platform.Function.InsertData(de, cols, vals)`](/platform-functions/insertdata/) | Platform Functions | number | Insert DE row |
| [`InsertDE(...)`](/platform-functions/insertde/) | Platform Functions | number | Alias for InsertData |
| [`Platform.Function.InvokeConfigure(obj, action, ...)`](/platform-functions/invokeconfigure/) | Platform Functions | string | SOAP Configure call (legacy) |
| [`Platform.Function.InvokeCreate(obj, ...)`](/platform-functions/invokecreate/) | Platform Functions | object | SOAP Create (legacy) |
| [`Platform.Function.InvokeDelete(obj, ...)`](/platform-functions/invokedelete/) | Platform Functions | object | SOAP Delete (legacy) |
| [`Platform.Function.InvokeExecute(obj, method, ...)`](/platform-functions/invokeexecute/) | Platform Functions | string | SOAP Execute call (legacy) |
| [`Platform.Function.InvokeExtract(obj, statusArr, ...)`](/platform-functions/invokeextract/) | Platform Functions | string | SOAP Extract call (legacy) |
| [`Platform.Function.InvokePerform(obj, action, ...)`](/platform-functions/invokeperform/) | Platform Functions | string | SOAP Perform action (legacy) |
| [`Platform.Function.InvokeRetrieve(obj)`](/platform-functions/invokeretrieve/) | Platform Functions | object[] | SOAP Retrieve (legacy) |
| [`Platform.Function.InvokeSchedule(obj, action, sched, ...)`](/platform-functions/invokeschedule/) | Platform Functions | string | SOAP Schedule call (legacy) |
| [`Platform.Function.InvokeUpdate(obj, ...)`](/platform-functions/invokeupdate/) | Platform Functions | object | SOAP Update (legacy) |
| [`Platform.Function.IsEmailAddress(val)`](/platform-functions/isemailaddress/) | Platform Functions | boolean | Validate email format |
| [`Platform.Function.IsPhoneNumber(val)`](/platform-functions/isphonenumber/) | Platform Functions | boolean | Validate phone number format |
| [`Platform.Function.IsNull(val)`](/platform-functions/isnull/) | Platform Functions | boolean | Check for null |

---

## L

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.Length(val)`](/platform-functions/length/) | Platform Functions | number | Get string length |
| [`List.Init(key)`](/core-library/list/) | Core Library | List | Initialize list object |
| [`list.Subscribers.Add(email, attrs)`](/core-library/list/) | Core Library | void | Add subscriber to list |
| [`list.Subscribers.Remove(email)`](/core-library/list/) | Core Library | void | Remove subscriber from list |
| [`Platform.Function.LogDataExtension(de, cols, vals)`](/platform-functions/logdataextension/) | Platform Functions | void | Log entry to DE |
| [`Platform.Function.Lookup(de, col, keyCol, keyVal)`](/platform-functions/lookup/) | Platform Functions | string | Single-value DE lookup |
| [`Platform.Function.LookupOrderedRows(de, count, sort, ...)`](/platform-functions/lookuporderedrows/) | Platform Functions | object[] | Sorted/limited DE rows |
| [`Platform.Function.LookupRows(de, col, val)`](/platform-functions/lookuprows/) | Platform Functions | object[] | Multiple DE rows |
| [`Platform.Function.Lowercase(val)`](/platform-functions/lowercase/) | Platform Functions | string | Convert to lowercase |

---

## M

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.MD5(val)`](/platform-functions/md5/) | Platform Functions | string | MD5 hash |

---

## N

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.Now()`](/platform-functions/now/) | Platform Functions | date | Current SFMC server date/time |

---

## P

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.ParseJSON(str)`](/platform-functions/parsejson/) | Platform Functions | object | Parse JSON string to object |
| [`Platform.ClientBrowser.Name`](/platform-objects/platform-clientbrowser/) | Platform Object | string | Browser name |
| [`Platform.Load(lib, version)`](/platform-objects/platform-load/) | Platform Object | void | Load Core library |
| [`Platform.Request.GetCookieValue(name)`](/platform-objects/platform-request/) | Platform Object | string | Read cookie |
| [`Platform.Request.GetFormField(name)`](/platform-objects/platform-request/) | Platform Object | string | Read form field |
| [`Platform.Request.GetPostData([encoding])`](/platform-objects/platform-request/) | Platform Object | string | Read raw POST body |
| [`Platform.Request.GetQueryStringParameter(name)`](/platform-objects/platform-request/) | Platform Object | string | Read URL query param |
| [`Platform.Request.GetRequestHeader(name)`](/platform-objects/platform-request/) | Platform Object | string | Read request header |
| [`Platform.Request.GetUserLanguages()`](/platform-objects/platform-request/) | Platform Object | string | Read Accept-Language header |
| [`Platform.Request.Method`](/platform-objects/platform-request/) | Platform Object | string | HTTP method (GET/POST) |
| [`Platform.Response.Redirect(url)`](/platform-objects/platform-response/) | Platform Object | void | Redirect browser |
| [`Platform.Response.SetContentType(mime)`](/platform-objects/platform-response/) | Platform Object | void | Set Content-Type |
| [`Platform.Response.SetCookie(name, val, ...)`](/platform-objects/platform-response/) | Platform Object | void | Set response cookie |
| [`Platform.Response.SetResponseCode(code)`](/platform-objects/platform-response/) | Platform Object | void | Set HTTP status code |
| [`Platform.Variable.GetValue(name)`](/platform-objects/platform-variable/) | Platform Object | string | Read AMPscript variable |
| [`Platform.Variable.SetValue(name, val)`](/platform-objects/platform-variable/) | Platform Object | void | Write AMPscript variable |
| [`Platform.Function.ProperCase(val)`](/platform-functions/propercase/) | Platform Functions | string | Title case a string |
| [`proxy.create(type, props)`](/wsproxy/create-item/) | WSProxy | object | SOAP Create |
| [`proxy.createBatch(type, arr)`](/wsproxy/create-batch/) | WSProxy | object | SOAP batch Create |
| [`proxy.delete(type, props)`](/wsproxy/delete-item/) | WSProxy | object | SOAP Delete |
| [`proxy.describe(objectType)`](/wsproxy/describe/) | WSProxy | object | Return SOAP object metadata |
| [`proxy.execute(type, props)`](/wsproxy/execute/) | WSProxy | object | SOAP Execute |
| [`proxy.getNextBatch(type, requestId)`](/wsproxy/getnextbatch/) | WSProxy | object | Next page after retrieve |
| [`proxy.perform(type, action, props)`](/wsproxy/perform/) | WSProxy | object | SOAP Perform |
| [`proxy.resetClientIds()`](/wsproxy/reset-client-ids/) | WSProxy | void | Clear BU context from setClientId |
| [`proxy.retrieve(type, cols, filter)`](/wsproxy/retrieve/) | WSProxy | object | SOAP Retrieve |
| [`proxy.retrieveBatch(type, cols, filter)`](/wsproxy/retrieve-all/) | WSProxy | object | SOAP Retrieve (paginated) |
| [`proxy.setClientId(clientId)`](/wsproxy/set-client-id/) | WSProxy | void | Set BU context |
| [`proxy.update(type, props, opts)`](/wsproxy/update-item/) | WSProxy | object | SOAP Update |
| [`proxy.updateBatch(type, arr, opts)`](/wsproxy/update-batch/) | WSProxy | object | SOAP batch Update |

---

## R

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.RaiseError(msg, skip)`](/platform-functions/raiseerror/) | Platform Functions | void | Halt execution with error |
| [`Platform.Function.Replace(val, search, rep)`](/platform-functions/replace/) | Platform Functions | string | Replace all occurrences |

---

## S

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Script.Util.HttpRequest`](/http/script-util-httprequest/) | HTTP | HttpRequest | Full HTTP request object |
| [`new Script.Util.WSProxy()`](/wsproxy/constructor/) | WSProxy | WSProxy | Create WSProxy instance |
| [`Platform.Function.SetObjectProperty(obj, name, val)`](/platform-functions/setobjectproperty/) | Platform Functions | void | Set SOAP object property (legacy) |
| [`Platform.Function.SHA256(val)`](/platform-functions/sha256/) | Platform Functions | string | SHA-256 hash |
| [`String(val)`](/global-functions/string/) | Global Functions | string | Convert CLR string to JS string |
| [`Stringify(obj)`](/global-functions/stringify/) | Global Functions | string | Object to JSON string |
| [`sub.Attributes.Add(name, val)`](/core-library/subscriber/) | Core Library | void | Add subscriber attribute |
| [`sub.Attributes.Remove(name)`](/core-library/subscriber/) | Core Library | void | Remove subscriber attribute |
| [`sub.Lists.Add(listKey)`](/core-library/subscriber/) | Core Library | void | Add subscriber to list |
| [`sub.Lists.Remove(listKey)`](/core-library/subscriber/) | Core Library | void | Remove subscriber from list |
| [`Subscriber.Init(key)`](/core-library/subscriber/) | Core Library | Subscriber | Initialize subscriber object |
| [`Platform.Function.Substring(val, start, len)`](/platform-functions/substring/) | Platform Functions | string | Extract substring (1-based) |
| [`Platform.Function.SystemDateToLocalDate(date)`](/platform-functions/systemdatetolocaldate/) | Platform Functions | date | Server to local timezone |

---

## T

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`TreatAsContent(str)`](/global-functions/treatascontent/) | Global Functions | void | Evaluate AMPscript in string |
| [`TreatAsContentArea(str)`](/global-functions/treatascontent-area/) | Global Functions | void | Evaluate classic content |
| [`Platform.Function.Trim(val)`](/platform-functions/trim/) | Platform Functions | string | Trim whitespace |
| [`TriggeredSend.Init(key)`](/core-library/triggeredsend/) | Core Library | TriggeredSend | Initialize TS object |
| [`ts.Send(subscriber)`](/core-library/triggeredsend/) | Core Library | number | Send triggered email |
| [`Platform.Function.TriggeredSend(key, email, subKey, attrs)`](/platform-functions/triggeredsend/) | Platform Functions | void | Fire a triggered send |

---

## U

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.UpdateData(de, cols, vals, keys, keyVals)`](/platform-functions/updatedata/) | Platform Functions | number | Update DE rows |
| [`UpdateDE(...)`](/platform-functions/updatede/) | Platform Functions | number | Alias for UpdateData |
| [`Platform.Function.Uppercase(val)`](/platform-functions/uppercase/) | Platform Functions | string | Convert to uppercase |
| [`Platform.Function.URLEncode(val)`](/platform-functions/urlencode/) | Platform Functions | string | URL-encode a string |
| [`Platform.Function.UpsertData(de, keys, keyVals, cols, vals)`](/platform-functions/upsertdata/) | Platform Functions | number | Insert or update DE row |
| [`UpsertDE(...)`](/platform-functions/upsertde/) | Platform Functions | number | Alias for UpsertData |

---

## V

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Variable.GetValue(name)`](/global-functions/variable/) | Global Object | string | Read AMPscript variable (alias) |
| [`Variable.SetValue(name, val)`](/global-functions/variable/) | Global Object | void | Write AMPscript variable (alias) |

---

## W

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Write(value)`](/global-functions/write/) | Global Functions | void | Output to page |
