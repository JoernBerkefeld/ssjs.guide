---
layout: page
title: Function Index
description: Complete A–Z index of SSJS functions, methods, and objects documented in this reference — global functions, Platform.Function, Core library, WSProxy, HTTP, and Platform objects.
nav_order: 12
---

Alphabetical listing of APIs covered in this guide. **Instance-style Core and WSProxy calls** use placeholders such as `<WSProxyInstance>` for the variable you initialized (for example from `new Script.Util.WSProxy()`). That name is documentation shorthand — it is not a literal prefix like `proxy.` that you must type.

For category browsing, see [Platform Functions](/platform-functions/), [Global Functions](/global-functions/), [WSProxy](/wsproxy/), [HTTP](/http/), and [Core Library](/core-library/).

---

## A

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.AddObjectArrayItem(obj, prop, val)`](/platform-functions/addobjectarrayitem/) | Platform Functions | void | Append item to a SOAP API object array property |
| [`Attribute.GetValue(name)`](/global-functions/attribute/) | Global Object | string | Profile attribute in email / triggered send context |
| [`Account.Init(key)`](/core-library/account/) | Core Library | AccountInstance | Initialize Account |
| [`Account.Retrieve(filter)`](/core-library/account/) | Core Library | object[] | Retrieve accounts |
| [`Account.Tracking.Retrieve(filter)`](/core-library/account/) | Core Library | object[] | Account-level tracking |
| [`<AccountInstance>.Update(properties)`](/core-library/account/) | Core Library | string | Update account |

---

## B

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.BeginImpressionRegion(name)`](/platform-functions/beginimpressionregion/) | Platform Functions | void | Start a named impression region |
| [`BounceEvent.Retrieve(filter)`](/core-library/bounceevent/) | Core Library | object[] | Bounce tracking events |

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
| [`ClickEvent.Retrieve(filter)`](/core-library/clickevent/) | Core Library | object[] | Click tracking events |
| [`ContentAreaObj.Init(key)`](/core-library/contentareaobj/) | Core Library | ContentAreaObjInstance | Classic Content Area object (**deprecated**) |

---

## D

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`DateTime.TimeZone.Retrieve(filter)`](/platform-objects/datetime-timezone/) | Platform Object | object[] | Time zone definitions (requires Core load) |
| [`DataExtension.Init(key)`](/core-library/dataextension/) | Core Library | DataExtension | Initialize DE object |
| [`<DataExtensionInstance>.Rows.Add(rowData)`](/core-library/dataextension-rows/) | Core Library | string | Insert DE row(s) |
| [`<DataExtensionInstance>.Rows.Lookup(searchFieldNames, searchValues, [limit], [orderByFieldName])`](/core-library/dataextension-rows/) | Core Library | object[] | Lookup DE rows |
| [`<DataExtensionInstance>.Rows.Remove(columnNames, columnValues)`](/core-library/dataextension-rows/) | Core Library | number | Delete matching DE rows |
| [`<DataExtensionInstance>.Rows.Retrieve([filter])`](/core-library/dataextension-rows/) | Core Library | object[] | Read DE rows |
| [`<DataExtensionInstance>.Rows.Update(rowData, whereFieldNames, whereValues)`](/core-library/dataextension-rows/) | Core Library | string | Update DE rows |
| [`Platform.Function.DeleteData(...)`](/platform-functions/deletedata/) | Platform Functions | number | Delete DE rows |
| [`DeleteDE(...)`](/platform-functions/deletede/) | Platform Functions | number | Alias for DeleteData |

---

## E

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Email.Init(key)`](/core-library/email/) | Core Library | EmailInstance | Initialize email definition |
| [`Email.Add(properties)`](/core-library/email/) | Core Library | EmailInstance | Create email definition |
| [`Email.Retrieve(filter)`](/core-library/email/) | Core Library | object[] | Retrieve email definitions |
| [`<EmailInstance>.Update(properties)`](/core-library/email/) | Core Library | string | Update email definition |
| [`<EmailInstance>.Remove()`](/core-library/email/) | Core Library | string | Remove email definition |
| [`<EmailInstance>.Validate()`](/core-library/email/) | Core Library | object | Validate email |
| [`<EmailInstance>.CheckContent()`](/core-library/email/) | Core Library | object | Content checks |
| [Programmatic send (subscriber + options)](/core-library/email/) | Core Library | — | Send flow documented on Email page (Content Builder ID + `Send`) |
| [`Platform.Function.EndImpressionRegion([closeAll])`](/platform-functions/endimpressionregion/) | Platform Functions | void | End an impression region |
| [`Error(message)`](/global-functions/error/) | Global Functions | Error | Create Error object |
| [`ErrorUtil.ThrowWSProxyError(result)`](/platform-objects/errorutil/) | Platform Object | void | Throw when WSProxy status indicates failure |

---

## F

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`FilterDefinition.Init(key)`](/core-library/filterdefinition/) | Core Library | FilterDefinitionInstance | Initialize filter definition |
| [`ForwardedEmailEvent.Retrieve(filter)`](/core-library/forwardedemailevent/) | Core Library | object[] | Forwarded-email events |
| [`ForwardedEmailOptInEvent.Retrieve(filter)`](/core-library/forwardedemailoptinevent/) | Core Library | object[] | Forwarded opt-in events |

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
| [`HTTPHeader.GetValue(name)`](/platform-objects/httpheader/) | Platform Object | string | Read HTTP request header (Core load) |
| [`HTTPHeader.SetValue(name, value)`](/platform-objects/httpheader/) | Platform Object | void | Set HTTP request header (Core load) |
| [`HTTPHeader.Remove(headerName)`](/platform-objects/httpheader/) | Platform Object | string | Remove HTTP request header (Core load) |
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
| [`Platform.Function.InvokeUpdate(...)`](/platform-functions/invokeupdate/) | Platform Functions | string | SOAP Update (legacy) |
| [`Platform.Function.IsEmailAddress(val)`](/platform-functions/isemailaddress/) | Platform Functions | boolean | Validate email format |
| [`Platform.Function.IsPhoneNumber(val)`](/platform-functions/isphonenumber/) | Platform Functions | boolean | Validate phone number format |
| [`Platform.Function.IsCHTMLBrowser(ua)`](/platform-functions/ischtmlbrowser/) | Platform Functions | boolean | Detect CHTML / feature-phone browsers |

---

## L

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`List.Init(key)`](/core-library/list/) | Core Library | ListInstance | Initialize list object |
| [`<ListInstance>.Subscribers.Add(properties)`](/core-library/list-subscribers/) | Core Library | string | Add subscriber to list |
| [`<ListInstance>.Subscribers.Retrieve([filter])`](/core-library/list-subscribers/) | Core Library | object[] | Subscribers on list |
| [`<ListInstance>.Subscribers.Unsubscribe(emailAddress)`](/core-library/list-subscribers/) | Core Library | string | Unsubscribe on list |
| [`<ListInstance>.Subscribers.Update(emailAddress, status)`](/core-library/list-subscribers/) | Core Library | string | Update subscriber on list |
| [`<ListInstance>.Subscribers.Upsert(emailAddress, attributes)`](/core-library/list-subscribers/) | Core Library | string | Upsert subscriber on list |
| [`<ListInstance>.Subscribers.Tracking.Retrieve(filter)`](/core-library/list-subscribers/) | Core Library | object[] | List subscriber tracking |
| [`Platform.Function.LocalDateToSystemDate(dateString)`](/platform-functions/localdatetosystemdate/) | Platform Functions | string | Local date/time to system CST |
| [`Platform.Function.Lookup(...)`](/platform-functions/lookup/) | Platform Functions | string | Single-value DE lookup |
| [`Platform.Function.LookupOrderedRows(...)`](/platform-functions/lookuporderedrows/) | Platform Functions | object[] | Sorted/limited DE rows |
| [`Platform.Function.LookupRows(...)`](/platform-functions/lookuprows/) | Platform Functions | object[] | Multiple DE rows |

---

## N

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`NotSentEvent.Retrieve(filter)`](/core-library/notsentevent/) | Core Library | object[] | Not-sent events |
| [`Platform.Function.Now()`](/platform-functions/now/) | Platform Functions | string | Current SFMC server date/time |

---

## O

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`OpenEvent.Retrieve(filter)`](/core-library/openevent/) | Core Library | object[] | Open tracking events |

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
| [`<WSProxyInstance>.createItem(objectType, properties)`](/wsproxy/create-item/) | WSProxy | object | SOAP Create |
| [`<WSProxyInstance>.updateItem(objectType, properties)`](/wsproxy/update-item/) | WSProxy | object | SOAP Update |
| [`<WSProxyInstance>.deleteItem(objectType, properties)`](/wsproxy/delete-item/) | WSProxy | object | SOAP Delete |
| [`<WSProxyInstance>.createBatch(objectType, propertiesArray)`](/wsproxy/create-batch/) | WSProxy | object | SOAP batch Create |
| [`<WSProxyInstance>.updateBatch(objectType, propertiesArray)`](/wsproxy/update-batch/) | WSProxy | object | SOAP batch Update |
| [`<WSProxyInstance>.deleteBatch(objectType, propertiesArray)`](/wsproxy/delete-batch/) | WSProxy | object | SOAP batch Delete |
| [`<WSProxyInstance>.describe(objectType)`](/wsproxy/describe/) | WSProxy | object | SOAP object metadata |
| [`<WSProxyInstance>.execute(objectType, requestName)`](/wsproxy/execute/) | WSProxy | object | SOAP Execute |
| [`<WSProxyInstance>.getNextBatch(objectType, requestId)`](/wsproxy/getnextbatch/) | WSProxy | object | Next retrieve page |
| [`<WSProxyInstance>.performItem(objectType, properties, action[, performOptions])`](/wsproxy/perform/) | WSProxy | object | SOAP Perform (single) |
| [`<WSProxyInstance>.performBatch(objectType, propertiesArray, action[, performOptions])`](/wsproxy/perform-batch/) | WSProxy | object | SOAP Perform (batch) |
| [`<WSProxyInstance>.resetClientIds()`](/wsproxy/reset-client-ids/) | WSProxy | void | Clear BU override |
| [`<WSProxyInstance>.retrieve(objectType, columns[, filter[, retrieveOptions[, requestProps]]])`](/wsproxy/retrieve/) | WSProxy | object | SOAP Retrieve |
| [`<WSProxyInstance>.setBatchSize(batchSize)`](/wsproxy/set-batch-size/) | WSProxy | void | Retrieve page size |
| [`<WSProxyInstance>.setClientId(clientId)`](/wsproxy/set-client-id/) | WSProxy | void | Target another BU |

---

## Q

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`QueryDefinition.Init(key)`](/core-library/querydefinition/) | Core Library | QueryDefinitionInstance | Initialize query activity |
| [`<QueryDefinitionInstance>.Perform(action)`](/core-library/querydefinition/) | Core Library | object | Run / manage query |

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
| [`Send.Init(id)`](/core-library/send/) | Core Library | SendInstance | Initialize send |
| [`Send.Add(emailKey, listIds, [options])`](/core-library/send/) | Core Library | SendInstance | Create send |
| [`Send.Retrieve(filter)`](/core-library/send/) | Core Library | object[] | Retrieve sends |
| [`Send.RetrieveLists(filter)`](/core-library/send/) | Core Library | object[] | Lists for send |
| [`<SendInstance>.CancelSend()`](/core-library/send/) | Core Library | string | Cancel send |
| [`<SendInstance>.Remove()`](/core-library/send/) | Core Library | string | Remove send |
| [`Send.Tracking.Retrieve(filter)`](/core-library/send/) | Core Library | object[] | Send tracking |
| [`<SendInstance>.Tracking.ClickRetrieve(filter)`](/core-library/send/) | Core Library | object[] | Click tracking for send |
| [`<SendInstance>.Tracking.TotalByIntervalRetrieve(type, startDate, endDate, groupBy)`](/core-library/send/) | Core Library | object[] | Aggregated send tracking |
| [`Send.Definition.Init(key)`](/core-library/senddefinition/) | Core Library | SendDefinitionInstance | Initialize send definition |
| [`Send.Definition.Add(esdParams, sendClassificationKey, emailKey, listIds)`](/core-library/senddefinition/) | Core Library | SendDefinitionInstance | Create send definition |
| [`<SendDefinitionInstance>.Send()`](/core-library/senddefinition/) | Core Library | string | Execute send definition |
| [`SentEvent.Retrieve(filter)`](/core-library/sentevent/) | Core Library | object[] | Sent events |
| [`SurveyEvent.Retrieve(filter)`](/core-library/surveyevent/) | Core Library | object[] | Survey events |
| [`Platform.Function.SystemDateToLocalDate(date)`](/platform-functions/systemdatetolocaldate/) | Platform Functions | string | Server to subscriber local time |

---

## T

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`TreatAsContent(str)`](/global-functions/treatascontent/) | Global Functions | string | Evaluate AMPscript/HTML via SSJS |
| [`Template.Init(key)`](/core-library/template/) | Core Library | TemplateInstance | Initialize template |
| [`TriggeredSend.Init(key)`](/core-library/triggeredsend/) | Core Library | TriggeredSend | Initialize TS definition |
| [`TriggeredSend.Add(properties)`](/core-library/triggeredsend/) | Core Library | TriggeredSend | Create TS definition |
| [`TriggeredSend.Retrieve(filter)`](/core-library/triggeredsend/) | Core Library | object[] | Retrieve TS definitions |
| [`<TriggeredSendInstance>.Update(properties)`](/core-library/triggeredsend/) | Core Library | string | Update TS definition |
| [`<TriggeredSendInstance>.Start()`](/core-library/triggeredsend/) | Core Library | string | Start TS definition |
| [`<TriggeredSendInstance>.Pause()`](/core-library/triggeredsend/) | Core Library | string | Pause TS definition |
| [`<TriggeredSendInstance>.Publish()`](/core-library/triggeredsend/) | Core Library | string | Publish TS definition |
| [`<TriggeredSendInstance>.Send(emailAddress, [sendTimeAttributes])`](/core-library/triggeredsend/) | Core Library | string | Fire triggered send |
| [`<TriggeredSendInstance>.Tracking.Retrieve([filter])`](/core-library/triggeredsend/) | Core Library | object[] | TS tracking |
| [`<TriggeredSendInstance>.Tracking.Clicks.Retrieve(filter)`](/core-library/triggeredsend/) | Core Library | object[] | TS click tracking |
| [`<TriggeredSendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)`](/core-library/triggeredsend/) | Core Library | object[] | TS aggregated tracking |

---

## U

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`UnsubEvent.Retrieve(filter)`](/core-library/unsubevent/) | Core Library | object[] | Unsubscribe events |
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

---

## More Core namespaces

| Namespace | Page |
|-----------|------|
| [`AccountUser`](/core-library/accountuser/) | Business unit users |
| [`Portfolio`](/core-library/portfolio/) | File portfolio assets |
| [`Folder`](/core-library/folder/) | Content folders |
| [`DeliveryProfile`](/core-library/deliveryprofile/) | Delivery profiles |
| [`SenderProfile`](/core-library/senderprofile/) | Sender profiles |
| [`SendClassification`](/core-library/sendclassification/) | Send classifications |
| [`FilterDefinition`](/core-library/filterdefinition/) | Filter definitions |
| [`DataExtension.Fields`](/core-library/dataextension-fields/) | DE field schema |

Subscriber nested APIs (`Subscriber.Attributes`, `Subscriber.Lists`) are covered on the [Subscriber](/core-library/subscriber/) page.
