---
layout: page
title: Function Index
description: Complete A–Z index of SSJS functions, methods, and objects documented in this reference — global functions, Platform.Function, Core library, WSProxy, HTTP, and Platform objects.
nav_order: 12
---

Alphabetical listing of APIs covered in this guide. For category browsing, see [Platform Functions](/platform-functions/), [Global Functions](/global-functions/), [WSProxy](/wsproxy/), and [HTTP](/http/).

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
| [`Platform.Function.BeginImpressionRegion(name)`](/platform-functions/beginimpressionregion/) | Platform Functions | void | Start a named impression region |

---

## C

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
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
| [`DateTime.TimeZone.Retrieve(filter)`](/platform-objects/datetime-timezone/) | Platform Object | object[] | Retrieve time zone definitions (requires Core load) |
| [`DataExtension.Init(key)`](/core-library/dataextension/) | Core Library | DataExtension | Initialize DE object |
| [`de.Rows.Add(obj)`](/core-library/dataextension-rows/) | Core Library | number | Insert DE row |
| [`de.Rows.Remove(col, val)`](/core-library/dataextension-rows/) | Core Library | number | Delete DE rows |
| [`de.Rows.Retrieve([filter])`](/core-library/dataextension-rows/) | Core Library | object[] | Read DE rows |
| [`de.Rows.Update(vals, keys, keyVals)`](/core-library/dataextension-rows/) | Core Library | number | Update DE rows |
| [`Platform.Function.DeleteData(...)`](/platform-functions/deletedata/) | Platform Functions | number | Delete DE rows |
| [`DeleteDE(...)`](/platform-functions/deletede/) | Platform Functions | number | Alias for DeleteData |

---

## E

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Email.Init(emailId)`](/core-library/email/) | Core Library | Email | Initialize email object |
| [`email.Send(sub, opts)`](/core-library/email/) | Core Library | number | Send email |
| [`Platform.Function.EndImpressionRegion([closeAll])`](/platform-functions/endimpressionregion/) | Platform Functions | void | End an impression region |
| [`Error(message)`](/global-functions/error/) | Global Functions | Error | Create Error object |
| [`ErrorUtil.ThrowWSProxyError(result)`](/platform-objects/errorutil/) | Platform Object | void | Throw when WSProxy status indicates failure |

---

## G

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.GUID()`](/platform-functions/guid/) | Platform Functions | string | Generate UUID v4 |

---

## H

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`HTTP.Get(url[, headerNames, headerValues])`](/http/http-get/) | Core HTTP | object | HTTP GET — structured status + body |
| [`HTTP.Post(url, ct, payload[, headerNames, headerValues])`](/http/http-post/) | Core HTTP | object | HTTP POST — structured status + body |
| [`HTTPHeader.GetValue(name)`](/platform-objects/httpheader/) | Platform Object | string | Read HTTP header value (Core load) |
| [`HTTPHeader.SetValue(name, value)`](/platform-objects/httpheader/) | Platform Object | void | Set HTTP header value (Core load) |
| [`HTTPHeader.Remove(headerName)`](/platform-objects/httpheader/) | Platform Object | string | Remove HTTP header (Core load) |
| [`Platform.Function.HTTPGet(url, ...)`](/platform-functions/httpget/) | Platform Functions | string | HTTP GET — body string only |
| [`Platform.Function.HTTPPost(url, ct, body, ...)`](/platform-functions/httppost/) | Platform Functions | string | HTTP POST — body string only |

---

## I

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.InsertData(...)`](/platform-functions/insertdata/) | Platform Functions | number | Insert DE row |
| [`InsertDE(...)`](/platform-functions/insertde/) | Platform Functions | number | Alias for InsertData |
| [`Platform.Function.InvokeConfigure(...)`](/platform-functions/invokeconfigure/) | Platform Functions | string | SOAP Configure call (legacy) |
| [`Platform.Function.InvokeCreate(...)`](/platform-functions/invokecreate/) | Platform Functions | object | SOAP Create (legacy) |
| [`Platform.Function.InvokeDelete(...)`](/platform-functions/invokedelete/) | Platform Functions | object | SOAP Delete (legacy) |
| [`Platform.Function.InvokeExecute(...)`](/platform-functions/invokeexecute/) | Platform Functions | string | SOAP Execute call (legacy) |
| [`Platform.Function.InvokeExtract(...)`](/platform-functions/invokeextract/) | Platform Functions | string | SOAP Extract call (legacy) |
| [`Platform.Function.InvokePerform(...)`](/platform-functions/invokeperform/) | Platform Functions | string | SOAP Perform action (legacy) |
| [`Platform.Function.InvokeRetrieve(...)`](/platform-functions/invokeretrieve/) | Platform Functions | object[] | SOAP Retrieve (legacy) |
| [`Platform.Function.InvokeSchedule(...)`](/platform-functions/invokeschedule/) | Platform Functions | string | SOAP Schedule call (legacy) |
| [`Platform.Function.InvokeUpdate(...)`](/platform-functions/invokeupdate/) | Platform Functions | object | SOAP Update (legacy) |
| [`Platform.Function.IsEmailAddress(val)`](/platform-functions/isemailaddress/) | Platform Functions | boolean | Validate email format |
| [`Platform.Function.IsPhoneNumber(val)`](/platform-functions/isphonenumber/) | Platform Functions | boolean | Validate phone number format |
| [`Platform.Function.IsCHTMLBrowser(ua)`](/platform-functions/ischtmlbrowser/) | Platform Functions | boolean | Detect CHTML / feature-phone browsers |

---

## L

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`List.Init(key)`](/core-library/list/) | Core Library | List | Initialize list object |
| [`list.Subscribers.Add(email, attrs)`](/core-library/list/) | Core Library | void | Add subscriber to list |
| [`list.Subscribers.Remove(email)`](/core-library/list/) | Core Library | void | Remove subscriber from list |
| [`Platform.Function.LocalDateToSystemDate(dateString)`](/platform-functions/localdatetosystemdate/) | Platform Functions | string | Local date/time to system CST |
| [`Platform.Function.Lookup(...)`](/platform-functions/lookup/) | Platform Functions | string | Single-value DE lookup |
| [`Platform.Function.LookupOrderedRows(...)`](/platform-functions/lookuporderedrows/) | Platform Functions | object[] | Sorted/limited DE rows |
| [`Platform.Function.LookupRows(...)`](/platform-functions/lookuprows/) | Platform Functions | object[] | Multiple DE rows |

---

## N

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.Now()`](/platform-functions/now/) | Platform Functions | string | Current SFMC server date/time |

---

## P

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.ParseJSON(str)`](/platform-functions/parsejson/) | Platform Functions | object | Parse JSON string to object |
| [`Platform.Load(lib, version)`](/platform-objects/platform-load/) | Platform Object | void | Load Core library |
| [`Platform.Request.*`](/platform-objects/platform-request/) | Platform Object | various | HTTP request (query, POST, headers, cookies) |
| [`Platform.Response.*`](/platform-objects/platform-response/) | Platform Object | various | HTTP response (redirect, cookies, content type) |
| [`Platform.Variable.*`](/platform-objects/platform-variable/) | Platform Object | various | AMPscript variable bridge |
| [`Platform.Recipient.*`](/platform-objects/platform-recipient/) | Platform Object | various | Current-recipient attributes |
| [`proxy.createItem(...)`](/wsproxy/create-item/) | WSProxy | object | SOAP Create |
| [`proxy.updateItem(...)`](/wsproxy/update-item/) | WSProxy | object | SOAP Update |
| [`proxy.deleteItem(...)`](/wsproxy/delete-item/) | WSProxy | object | SOAP Delete |
| [`proxy.createBatch(...)`](/wsproxy/create-batch/) | WSProxy | object | SOAP batch Create |
| [`proxy.updateBatch(...)`](/wsproxy/update-batch/) | WSProxy | object | SOAP batch Update |
| [`proxy.deleteBatch(...)`](/wsproxy/delete-batch/) | WSProxy | object | SOAP batch Delete |
| [`proxy.describe(...)`](/wsproxy/describe/) | WSProxy | object | SOAP object metadata |
| [`proxy.execute(...)`](/wsproxy/execute/) | WSProxy | object | SOAP Execute |
| [`proxy.getNextBatch(...)`](/wsproxy/getnextbatch/) | WSProxy | object | Next retrieve page |
| [`proxy.performItem(...)`](/wsproxy/perform/) | WSProxy | object | SOAP Perform (single) |
| [`proxy.performBatch(...)`](/wsproxy/perform-batch/) | WSProxy | object | SOAP Perform (batch) |
| [`proxy.resetClientIds()`](/wsproxy/reset-client-ids/) | WSProxy | void | Clear BU override |
| [`proxy.retrieve(...)`](/wsproxy/retrieve/) | WSProxy | object | SOAP Retrieve |
| [`proxy.setBatchSize(...)`](/wsproxy/set-batch-size/) | WSProxy | void | Retrieve page size |
| [`proxy.setClientId(...)`](/wsproxy/set-client-id/) | WSProxy | void | Target another BU |

---

## R

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.RaiseError(msg, skip)`](/platform-functions/raiseerror/) | Platform Functions | void | Halt execution with error |
| [`Platform.Function.RedirectTo(url)`](/platform-functions/redirectto/) | Platform Functions | void | Email href redirect helper |

---

## S

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Script.Util.HttpRequest`](/http/script-util-httprequest/) | HTTP | HttpRequest | Full HTTP request object |
| [`new Script.Util.WSProxy()`](/wsproxy/constructor/) | WSProxy | WSProxy | Create WSProxy instance |
| [`Platform.Function.SetObjectProperty(...)`](/platform-functions/setobjectproperty/) | Platform Functions | void | Set SOAP object property (legacy) |
| [`String(val)`](/global-functions/string/) | Global Functions | string | Convert CLR string to JS string |
| [`Stringify(obj)`](/global-functions/stringify/) | Global Functions | string | Object to JSON string |
| [`Subscriber.Init(key)`](/core-library/subscriber/) | Core Library | Subscriber | Initialize subscriber object |
| [`Platform.Function.SystemDateToLocalDate(date)`](/platform-functions/systemdatetolocaldate/) | Platform Functions | string | Server to subscriber local time |

---

## T

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`TreatAsContent(str)`](/global-functions/treatascontent/) | Global Functions | string | Evaluate AMPscript/HTML via SSJS |
| [`TriggeredSend.Init(key)`](/core-library/triggeredsend/) | Core Library | TriggeredSend | Initialize TS object |
| [`ts.Send(subscriber)`](/core-library/triggeredsend/) | Core Library | number | Send triggered email |

---

## U

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.UpdateData(...)`](/platform-functions/updatedata/) | Platform Functions | number | Update DE rows |
| [`UpdateDE(...)`](/platform-functions/updatede/) | Platform Functions | number | Alias for UpdateData |
| [`Platform.Function.UrlEncode(url[, encodeReservedKeywords])`](/platform-functions/urlencode/) | Platform Functions | string | Percent-encode a full URL |
| [`Platform.Function.UpsertData(...)`](/platform-functions/upsertdata/) | Platform Functions | number | Insert or update DE row |
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
