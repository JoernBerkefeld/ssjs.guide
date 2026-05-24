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
| [`Platform.Function.AddObjectArrayItem(apiObject, propertyName, value)`](/platform-functions/addobjectarrayitem/) | Platform Functions | void | Append item to a SOAP API object array property |
| [`Attribute.GetValue(name)`](/global-functions/attribute/) | Global Object | string | Profile attribute in email / triggered send context |
| [`Account.Init(key)`](/core-library/account/#init) | Core Library | AccountInstance | Initialize Account |
| [`Account.Retrieve(filter)`](/core-library/account/#retrieve) | Core Library | object[] | Retrieve accounts |
| [`Account.Tracking.Retrieve(filter)`](/core-library/account/#tracking-retrieve) | Core Library | object[] | Account-level tracking |
| [`<AccountInstance>.Update(properties)`](/core-library/account/#instance-update) | Core Library | string | Update account |
| [`AccountUser.Init(targetUserKey, myClientID)`](/core-library/accountuser/#init) | Core Library | AccountUserInstance | Initialize AccountUser |
| [`AccountUser.Add(properties)`](/core-library/accountuser/#add) | Core Library | string | Create AccountUser |
| [`AccountUser.Retrieve(filter)`](/core-library/accountuser/#retrieve) | Core Library | object[] | Retrieve AccountUsers |
| [`<AccountUserInstance>.Update(properties)`](/core-library/accountuser/#instance-update) | Core Library | string | Update AccountUser |
| [`<AccountUserInstance>.Activate()`](/core-library/accountuser/#instance-activate) | Core Library | string | Activate AccountUser |
| [`<AccountUserInstance>.Deactivate()`](/core-library/accountuser/#instance-deactivate) | Core Library | string | Deactivate AccountUser |
| [`<ArrayInstance>.concat(value[, ...])`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | array | Merge arrays |
| [`<ArrayInstance>.join([separator])`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | string | Join elements to string |
| [`<ArrayInstance>.length`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | number | Number of elements |
| [`<ArrayInstance>.pop()`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | any | Remove and return last element |
| [`<ArrayInstance>.push(element[, ...])`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | number | Add elements to end; return new length |
| [`<ArrayInstance>.reverse()`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | array | Reverse array in place |
| [`<ArrayInstance>.shift()`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | any | Remove and return first element |
| [`<ArrayInstance>.slice([start[, end]])`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | array | Shallow copy of a portion |
| [`<ArrayInstance>.sort([compareFn])`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | array | Sort in place |
| [`<ArrayInstance>.splice(start[, deleteCount[, item1[, ...]]])`](/engine-limitations/polyfills/) | ECMAScript Builtins | array | ⚠️ Broken in SFMC SSJS — see polyfills |
| [`<ArrayInstance>.unshift(element[, ...])`](/ecmascript-builtins/array-methods/) | ECMAScript Builtins | number | Add elements to start; return new length |

---

## B

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Base64Decode(encodedString)`](/global-functions/base64decode/) | Global Functions | string | Decode Base64 string to plain text (requires Platform.Load) |
| [`Platform.Function.Base64Decode(encodedString[, charset])`](/platform-functions/base64decode/) | Platform Functions | string | Decode a Base64-encoded string |
| [`Base64Encode(string)`](/global-functions/base64encode/) | Global Functions | string | Encode plain text to Base64 (requires Platform.Load) |
| [`Platform.Function.Base64Encode(string[, charset])`](/platform-functions/base64encode/) | Platform Functions | string | Encode a string to Base64 |
| [`Platform.Function.BeginImpressionRegion(name)`](/platform-functions/beginimpressionregion/) | Platform Functions | void | Start a named impression region |
| [`BounceEvent.Retrieve(filter)`](/core-library/events/#bounce-event) | Core Library | object[] | Bounce tracking events |

---

## C

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.ContentBlockByID(id[, regionName, stopOnError, fallbackContent])`](/platform-functions/contentblockbyid/) | Platform Functions | string | Render Content Builder block by ID |
| [`Platform.Function.ContentBlockByKey(customerKey[, regionName, stopOnError, fallbackContent])`](/platform-functions/contentblockbykey/) | Platform Functions | string | Render Content Builder block by key |
| [`Platform.Function.ContentBlockByName(name[, regionName, stopOnError, fallbackContent, statusVariable])`](/platform-functions/contentblockbyname/) | Platform Functions | string | Render Content Builder block by name |
| [`Platform.Function.ContentImageByID(id[, fallbackId])`](/platform-functions/contentimagebyid/) | Platform Functions | string | img tag for Content Builder image by ID |
| [`Platform.Function.ContentImageByKey(key[, fallbackId])`](/platform-functions/contentimagebykey/) | Platform Functions | string | img tag for Content Builder image by key |
| [`Platform.Function.CreateObject(objectType)`](/platform-functions/createobject/) | Platform Functions | object | Create SOAP API object (legacy) |
| [`ClickEvent.Retrieve(filter)`](/core-library/events/#click-event) | Core Library | object[] | Click tracking events |
| [`ContentAreaObj.Init(key)`](/core-library/contentareaobj/#init) | Core Library | ContentAreaObjInstance | Classic Content Area object (**deprecated**) |
| [`ContentAreaObj.Add(properties)`](/core-library/contentareaobj/#add) | Core Library | string | Create Content Area (**deprecated**) |
| [`ContentAreaObj.Retrieve(filter)`](/core-library/contentareaobj/#retrieve) | Core Library | object[] | Retrieve Content Areas (**deprecated**) |
| [`<ContentAreaObjInstance>.Update(properties)`](/core-library/contentareaobj/#instance-update) | Core Library | string | Update Content Area (**deprecated**) |
| [`<ContentAreaObjInstance>.Remove()`](/core-library/contentareaobj/#instance-remove) | Core Library | string | Remove Content Area (**deprecated**) |

---

## D

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`DateTime.TimeZone.Retrieve(filter)`](/platform-objects/datetime-timezone/) | Platform Object | object[] | Time zone definitions (requires Core load) |
| [`DataExtension.Init(key)`](/core-library/dataextension/#init) | Core Library | DataExtensionInstance | Initialize DE object |
| [`DataExtension.Add(properties)`](/core-library/dataextension/#add) | Core Library | DataExtensionInstance | Create data extension |
| [`DataExtension.Retrieve(filter, [queryAllAccounts])`](/core-library/dataextension/#retrieve) | Core Library | object[] | Retrieve data extensions |
| [`<DataExtensionInstance>.Fields.Add(properties)`](/core-library/dataextension-fields/#instance-fields-add) | Core Library | string | Add field to DE |
| [`<DataExtensionInstance>.Fields.Retrieve()`](/core-library/dataextension-fields/#instance-fields-retrieve) | Core Library | object[] | Retrieve DE field definitions |
| [`<DataExtensionInstance>.Fields.UpdateSendableField(deFieldName, subscriberField)`](/core-library/dataextension-fields/#instance-fields-updatesendablefield) | Core Library | string | Update sendable field mapping |
| [`<DataExtensionInstance>.Rows.Add(rowData)`](/core-library/dataextension-rows/#instance-rows-add) | Core Library | string | Insert DE row(s) |
| [`<DataExtensionInstance>.Rows.Lookup(searchFieldNames, searchValues, [limit], [orderByFieldName])`](/core-library/dataextension-rows/#instance-rows-lookup) | Core Library | object[] | Lookup DE rows |
| [`<DataExtensionInstance>.Rows.Remove(columnNames, columnValues)`](/core-library/dataextension-rows/#instance-rows-remove) | Core Library | number | Delete matching DE rows |
| [`<DataExtensionInstance>.Rows.Retrieve([filter])`](/core-library/dataextension-rows/#instance-rows-retrieve) | Core Library | object[] | Read DE rows |
| [`<DataExtensionInstance>.Rows.Update(rowData, whereFieldNames, whereValues)`](/core-library/dataextension-rows/#instance-rows-update) | Core Library | string | Update DE rows |
| [`DeliveryProfile.Init(key)`](/core-library/deliveryprofile/#init) | Core Library | DeliveryProfileInstance | Initialize DeliveryProfile |
| [`DeliveryProfile.Add(properties)`](/core-library/deliveryprofile/#add) | Core Library | string | Create DeliveryProfile |
| [`<DeliveryProfileInstance>.Update(properties)`](/core-library/deliveryprofile/#instance-update) | Core Library | string | Update DeliveryProfile |
| [`<DeliveryProfileInstance>.Remove()`](/core-library/deliveryprofile/#instance-remove) | Core Library | string | Remove DeliveryProfile |
| [`Platform.Function.DeleteData(deName, whereFieldNames, whereFieldValues)`](/platform-functions/deletedata/) | Platform Functions | number | Delete DE rows |
| [`DeleteDE(deName, whereFieldNames, whereFieldValues)`](/platform-functions/deletede/) | Platform Functions | number | Alias for DeleteData |

---

## E

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Email.Init(key)`](/core-library/email/#init) | Core Library | EmailInstance | Initialize email definition |
| [`Email.Add(properties)`](/core-library/email/#add) | Core Library | EmailInstance | Create email definition |
| [`Email.Retrieve(filter)`](/core-library/email/#retrieve) | Core Library | object[] | Retrieve email definitions |
| [`<EmailInstance>.Update(properties)`](/core-library/email/#instance-update) | Core Library | string | Update email definition |
| [`<EmailInstance>.Remove()`](/core-library/email/#instance-remove) | Core Library | string | Remove email definition |
| [`<EmailInstance>.Validate()`](/core-library/email/#instance-validate) | Core Library | object | Validate email |
| [`<EmailInstance>.CheckContent()`](/core-library/email/#instance-checkcontent) | Core Library | object | Content checks |
| [`Platform.Function.EndImpressionRegion([closeAll])`](/platform-functions/endimpressionregion/) | Platform Functions | void | End an impression region |
| [`Error(message)`](/global-functions/error/) | Global Functions | Error | Create Error object (`new Error([message])`) |
| [`ErrorUtil.ThrowWSProxyError(result)`](/platform-objects/errorutil/) | Platform Object | void | Throw when WSProxy status indicates failure |

---

## F

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`FilterDefinition.Init(key)`](/core-library/filterdefinition/#init) | Core Library | FilterDefinitionInstance | Initialize filter definition |
| [`FilterDefinition.Add(properties)`](/core-library/filterdefinition/#add) | Core Library | string | Create filter definition |
| [`FilterDefinition.Retrieve(filter)`](/core-library/filterdefinition/#retrieve) | Core Library | object[] | Retrieve filter definitions |
| [`<FilterDefinitionInstance>.Update(properties)`](/core-library/filterdefinition/#instance-update) | Core Library | string | Update filter definition |
| [`<FilterDefinitionInstance>.Remove()`](/core-library/filterdefinition/#instance-remove) | Core Library | string | Remove filter definition |
| [`Folder.Init([key])`](/core-library/folder/#init) | Core Library | FolderInstance | Initialize Folder |
| [`Folder.Add(properties)`](/core-library/folder/#add) | Core Library | string | Create folder |
| [`Folder.Retrieve(filter)`](/core-library/folder/#retrieve) | Core Library | object[] | Retrieve folders |
| [`<FolderInstance>.Update(properties)`](/core-library/folder/#instance-update) | Core Library | string | Update folder |
| [`<FolderInstance>.Remove()`](/core-library/folder/#instance-remove) | Core Library | string | Remove folder |
| [`<FolderInstance>.SetID(id)`](/core-library/folder/#instance-setid) | Core Library | void | Set folder ID |
| [`Format(textToFormat, formatCode)`](/global-functions/format/) | Global Functions | string | Format a date/number string |
| [`ForwardedEmailEvent.Retrieve(filter)`](/core-library/events/#forwarded-email-event) | Core Library | object[] | Forwarded-email events |
| [`ForwardedEmailOptInEvent.Retrieve(filter)`](/core-library/events/#forwarded-email-opt-in-event) | Core Library | object[] | Forwarded opt-in events |

---

## G

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.GUID()`](/platform-functions/guid/) | Platform Functions | string | Generate UUID v4 |
| [`Platform.Recipient.GetAttributeValue(attributeName)`](/platform-objects/platform-recipient/) | Platform Functions | string | Returns the value of a subscriber attribute or sendable DE field for the current recipient |
| [`Platform.Request.GetCookieValue(name)`](/platform-objects/platform-request/) | Platform Functions | string | Read a cookie value |
| [`Platform.Request.GetFormField(name)`](/platform-objects/platform-request/) | Platform Functions | string | Read a form field (POST or GET) |
| [`Platform.Request.GetPostData([encoding])`](/platform-objects/platform-request/) | Platform Functions | string | Read raw POST body (optional character encoding) |
| [`Platform.Request.GetQueryStringParameter(name)`](/platform-objects/platform-request/) | Platform Functions | string | Read a URL query parameter |
| [`Platform.Request.GetRequestHeader(name)`](/platform-objects/platform-request/) | Platform Functions | string | Read a request header |
| [`Platform.Request.GetUserLanguages()`](/platform-objects/platform-request/) | Platform Functions | string | Read the browser `Accept-Language` header value |

---

## H

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`HTTP.Get(url[, headerNames, headerValues])`](/http/get/) | Core HTTP | object | HTTP GET — structured status + body |
| [`HTTP.Post(url, contentType, payload, headerNames, headerValues)`](/http/post/) | Core HTTP | object | HTTP POST — structured status + body |
| [`HTTPHeader.GetValue(name)`](/platform-objects/httpheader/) | Platform Object | string | Read HTTP request header (Core load) |
| [`HTTPHeader.SetValue(name, value)`](/platform-objects/httpheader/) | Platform Object | void | Set HTTP request header (Core load) |
| [`HTTPHeader.Remove(headerName)`](/platform-objects/httpheader/) | Platform Object | string | Remove HTTP request header (Core load) |
| [`Platform.Function.HTTPGet(url, continueOnError[, emptyContentHandling, headerNames, headerValues, statusVariable])`](/platform-functions/httpget/) | Platform Functions | string | HTTP GET — body string only |
| [`Platform.Function.HTTPPost(url, contentType, payload[, headerNames, headerValues, response])`](/platform-functions/httppost/) | Platform Functions | string | HTTP POST — body string only |

---

## I

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.InsertData(deName, fieldNames, fieldValues)`](/platform-functions/insertdata/) | Platform Functions | number | Insert DE row |
| [`InsertDE(deName, fieldNames, fieldValues)`](/platform-functions/insertde/) | Platform Functions | number | Alias for InsertData |
| [`Platform.Function.InvokeConfigure(apiObject, method, status, options)`](/platform-functions/invokeconfigure/) | Platform Functions | string | SOAP Configure call (legacy) |
| [`Platform.Function.InvokeCreate(apiObject, status, options)`](/platform-functions/invokecreate/) | Platform Functions | object | SOAP Create (legacy) |
| [`Platform.Function.InvokeDelete(apiObject, status, options)`](/platform-functions/invokedelete/) | Platform Functions | object | SOAP Delete (legacy) |
| [`Platform.Function.InvokeExecute(apiObject, status, options)`](/platform-functions/invokeexecute/) | Platform Functions | string | SOAP Execute call (legacy) |
| [`Platform.Function.InvokeExtract(apiObject, statusArray[, options])`](/platform-functions/invokeextract/) | Platform Functions | string | SOAP Extract call (legacy) |
| [`Platform.Function.InvokePerform(apiObject, method, status, options)`](/platform-functions/invokeperform/) | Platform Functions | string | SOAP Perform action (legacy) |
| [`Platform.Function.InvokeRetrieve(apiObject, status)`](/platform-functions/invokeretrieve/) | Platform Functions | object[] | SOAP Retrieve (legacy) |
| [`Platform.Function.InvokeSchedule(apiObject, action, schedule[, statusArray, options])`](/platform-functions/invokeschedule/) | Platform Functions | string | SOAP Schedule call (legacy) |
| [`Platform.Function.InvokeUpdate(apiObject, status, options)`](/platform-functions/invokeupdate/) | Platform Functions | string | SOAP Update (legacy) |
| [`Platform.Function.IsEmailAddress(value)`](/platform-functions/isemailaddress/) | Platform Functions | boolean | Validate email format |
| [`Platform.Function.IsPhoneNumber(value)`](/platform-functions/isphonenumber/) | Platform Functions | boolean | Validate phone number format |
| [`Platform.Function.IsCHTMLBrowser(userAgentString)`](/platform-functions/ischtmlbrowser/) | Platform Functions | boolean | Detect CHTML / feature-phone browsers |
| [`isFinite(value)`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | boolean | Test if value is finite |
| [`isNaN(value)`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | boolean | Test if value is NaN |

---

## L

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`List.Init(key)`](/core-library/list/#init) | Core Library | ListInstance | Initialize list object |
| [`List.Add(properties)`](/core-library/list/#add) | Core Library | string | Create list |
| [`List.Retrieve(filter)`](/core-library/list/#retrieve) | Core Library | object[] | Retrieve lists |
| [`<ListInstance>.Remove()`](/core-library/list/#instance-remove) | Core Library | string | Remove list |
| [`<ListInstance>.Subscribers.Add(properties)`](/core-library/list-subscribers/#instance-subscribers-add) | Core Library | string | Add subscriber to list |
| [`<ListInstance>.Subscribers.Retrieve([filter])`](/core-library/list-subscribers/#instance-subscribers-retrieve) | Core Library | object[] | Subscribers on list |
| [`<ListInstance>.Subscribers.Unsubscribe(emailAddress)`](/core-library/list-subscribers/#instance-subscribers-unsubscribe) | Core Library | string | Unsubscribe on list |
| [`<ListInstance>.Subscribers.Update(emailAddress, status)`](/core-library/list-subscribers/#instance-subscribers-update) | Core Library | string | Update subscriber on list |
| [`<ListInstance>.Subscribers.Upsert(emailAddress, attributes)`](/core-library/list-subscribers/#instance-subscribers-upsert) | Core Library | string | Upsert subscriber on list |
| [`<ListInstance>.Subscribers.Tracking.Retrieve(filter)`](/core-library/list-subscribers/#instance-subscribers-tracking-retrieve) | Core Library | object[] | List subscriber tracking |
| [`Platform.Function.LocalDateToSystemDate(dateValue)`](/platform-functions/localdatetosystemdate/) | Platform Functions | string | Local date/time to system CST |
| [`Platform.Function.Lookup(deName, returnField, whereFieldNames, whereFieldValues)`](/platform-functions/lookup/) | Platform Functions | string | Single-value DE lookup |
| [`Platform.Function.LookupOrderedRows(deName, count, orderBy, whereFieldNames, whereFieldValues)`](/platform-functions/lookuporderedrows/) | Platform Functions | object[] | Sorted/limited DE rows |
| [`Platform.Function.LookupRows(deName, whereFieldNames, whereFieldValues)`](/platform-functions/lookuprows/) | Platform Functions | object[] | Multiple DE rows |

---

## M

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Math.abs(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Absolute value |
| [`Math.acos(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Arccosine |
| [`Math.asin(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Arcsine |
| [`Math.atan(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Arctangent |
| [`Math.atan2(y, x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Arctangent of quotient |
| [`Math.ceil(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Round up |
| [`Math.cos(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Cosine |
| [`Math.E`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Euler's number (~2.718) |
| [`Math.exp(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | e to the power of x |
| [`Math.floor(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Round down |
| [`Math.LN2`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Natural logarithm of 2 |
| [`Math.LN10`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Natural logarithm of 10 |
| [`Math.log(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Natural logarithm |
| [`Math.LOG10E`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Base-10 log of e |
| [`Math.LOG2E`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Base-2 log of e |
| [`Math.max(value1[, value2, ...])`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Largest value |
| [`Math.min(value1[, value2, ...])`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Smallest value |
| [`Math.PI`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Pi (~3.14159) |
| [`Math.pow(base, exponent)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Base to the power of exponent |
| [`Math.random()`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Random number [0, 1) |
| [`Math.round(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Round to nearest integer |
| [`Math.sin(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Sine |
| [`Math.sqrt(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Square root |
| [`Math.SQRT1_2`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Square root of 1/2 |
| [`Math.SQRT2`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Square root of 2 |
| [`Math.tan(x)`](/ecmascript-builtins/math/) | ECMAScript Builtins | number | Tangent |
| [`Platform.Function.MD5(string[, charset])`](/platform-functions/md5/) | Platform Functions | string | MD5 hash of a string |

---

## N

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`NotSentEvent.Retrieve(filter)`](/core-library/events/#not-sent-event) | Core Library | object[] | Not-sent events |
| [`Number.toExponential([fractionDigits])`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | string | Exponential notation string |
| [`Number.toFixed([fractionDigits])`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | string | Fixed-point notation string |
| [`Number.toPrecision([precision])`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | string | Precision notation string |
| [`Platform.Function.Now([useContextTime])`](/platform-functions/now/) | Platform Functions | string | Current SFMC server date/time |

---

## O

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Object.hasOwnProperty(v)`](/ecmascript-builtins/object-methods/) | ECMAScript Builtins | boolean | Test if object has own property |
| [`OpenEvent.Retrieve(filter)`](/core-library/events/#open-event) | Core Library | object[] | Open tracking events |

---

## P

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`parseFloat(string)`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | number | Parse float from string |
| [`parseInt(string[, radix])`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | number | Parse integer from string |
| [`Platform.Function.ParseJSON(jsonString)`](/platform-functions/parsejson/) | Platform Functions | object | Parse JSON string to object |
| [`Platform.Load(libraryName, version)`](/platform-objects/platform-load/) | Platform Object | void | Load Core library |
| [`Platform.Request.*`](/platform-objects/platform-request/) | Platform Object | various | HTTP request (query, POST, headers, cookies) |
| [`Platform.Response.*`](/platform-objects/platform-response/) | Platform Object | various | HTTP response (redirect, cookies, content type) |
| [`Platform.Variable.*`](/platform-objects/platform-variable/) | Platform Object | various | AMPscript variable bridge |
| [`Platform.Recipient.*`](/platform-objects/platform-recipient/) | Platform Object | various | Current-recipient attributes |
| [`Portfolio.Init(key)`](/core-library/portfolio/#init) | Core Library | PortfolioInstance | Initialize Portfolio |
| [`Portfolio.Add(properties)`](/core-library/portfolio/#add) | Core Library | string | Create portfolio asset |
| [`Portfolio.Retrieve(filter)`](/core-library/portfolio/#retrieve) | Core Library | object[] | Retrieve portfolio assets |
| [`<PortfolioInstance>.Update(properties)`](/core-library/portfolio/#instance-update) | Core Library | string | Update portfolio asset |
| [`<PortfolioInstance>.Remove()`](/core-library/portfolio/#instance-remove) | Core Library | string | Remove portfolio asset |
| [`<WSProxyInstance>.createItem(objectType, properties)`](/wsproxy/createitem/) | WSProxy | object | SOAP Create |
| [`<WSProxyInstance>.updateItem(objectType, properties)`](/wsproxy/updateitem/) | WSProxy | object | SOAP Update |
| [`<WSProxyInstance>.deleteItem(objectType, properties)`](/wsproxy/deleteitem/) | WSProxy | object | SOAP Delete |
| [`<WSProxyInstance>.createBatch(objectType, propertiesArray)`](/wsproxy/createbatch/) | WSProxy | object | SOAP batch Create |
| [`<WSProxyInstance>.updateBatch(objectType, propertiesArray)`](/wsproxy/updatebatch/) | WSProxy | object | SOAP batch Update |
| [`<WSProxyInstance>.deleteBatch(objectType, propertiesArray)`](/wsproxy/deletebatch/) | WSProxy | object | SOAP batch Delete |
| [`<WSProxyInstance>.describe(objectType)`](/wsproxy/describe/) | WSProxy | object | SOAP object metadata |
| [`<WSProxyInstance>.execute(objectType, requestName)`](/wsproxy/execute/) | WSProxy | object | SOAP Execute |
| [`<WSProxyInstance>.getNextBatch(objectType, requestId)`](/wsproxy/getnextbatch/) | WSProxy | object | Next retrieve page |
| [`<WSProxyInstance>.performItem(objectType, properties, action[, performOptions])`](/wsproxy/performitem/) | WSProxy | object | SOAP Perform (single) |
| [`<WSProxyInstance>.performBatch(objectType, propertiesArray, action[, performOptions])`](/wsproxy/performbatch/) | WSProxy | object | SOAP Perform (batch) |
| [`<WSProxyInstance>.resetClientIds()`](/wsproxy/resetclientids/) | WSProxy | void | Clear BU override |
| [`<WSProxyInstance>.retrieve(objectType, columns[, filter[, retrieveOptions[, requestProps]]])`](/wsproxy/retrieve/) | WSProxy | object | SOAP Retrieve |
| [`<WSProxyInstance>.setBatchSize(batchSize)`](/wsproxy/setbatchsize/) | WSProxy | void | Retrieve page size |
| [`<WSProxyInstance>.setClientId(clientId)`](/wsproxy/setclientid/) | WSProxy | void | Target another BU |

---

## Q

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`QueryDefinition.Init(key)`](/core-library/querydefinition/#init) | Core Library | QueryDefinitionInstance | Initialize query activity |
| [`QueryDefinition.Add(properties)`](/core-library/querydefinition/#add) | Core Library | string | Create query activity |
| [`QueryDefinition.Retrieve(filter)`](/core-library/querydefinition/#retrieve) | Core Library | object[] | Retrieve query activities |
| [`<QueryDefinitionInstance>.Update(properties)`](/core-library/querydefinition/#instance-update) | Core Library | string | Update query activity |
| [`<QueryDefinitionInstance>.Remove()`](/core-library/querydefinition/#instance-remove) | Core Library | string | Remove query activity |
| [`<QueryDefinitionInstance>.Perform(action)`](/core-library/querydefinition/#instance-perform) | Core Library | object | Run / manage query |

---

## R

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.RaiseError(message[, currentRecipientOnly[, errorCode[, errorNumber]]])`](/platform-functions/raiseerror/) | Platform Functions | void | Halt execution with error |
| [`Platform.Function.RedirectTo(url)`](/platform-functions/redirectto/) | Platform Functions | void | Email href redirect helper |
| [`Platform.Response.Redirect(url, movedPermanently)`](/platform-objects/platform-response/#redirect) | Platform Response | void | Redirect the browser |
| [`Platform.Response.RemoveCookie(name)`](/platform-objects/platform-response/#removecookie) | Platform Response | void | Remove a cookie |
| [`Platform.Response.RemoveResponseHeader(headerName)`](/platform-objects/platform-response/#removeresponseheader) | Platform Response | void | Remove a response header |

---

## S

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`new Script.Util.HttpRequest(url)`](/http/script-util-httprequest/) | HTTP | HttpRequestInstance | Full HTTP request object |
| [`new Script.Util.HttpGet(url)`](/http/script-util-httpget/) | HTTP | HttpRequestInstance | HTTP GET shorthand |
| [`<HttpRequestInstance>.send()`](/http/request-methods/#send) | HTTP | object | Execute HTTP request |
| [`<HttpRequestInstance>.setHeader(name, value)`](/http/request-methods/#setheader) | HTTP | void | Set request header |
| [`<HttpRequestInstance>.clearHeaders()`](/http/request-methods/#clearheaders) | HTTP | void | Clear all custom headers |
| [`<HttpRequestInstance>.removeHeader(name)`](/http/request-methods/#removeheader) | HTTP | void | Remove one header |
| [`new Script.Util.WSProxy()`](/wsproxy/constructor/) | WSProxy | WSProxyInstance | Create WSProxy instance |
| [`Platform.Function.SetObjectProperty(apiObject, propertyName, value)`](/platform-functions/setobjectproperty/) | Platform Functions | void | Set SOAP object property (legacy) |
| [`String(value)`](/global-functions/string/) | Global Functions | string | Convert CLR object to JS string |
| [`Platform.Function.Stringify(object)`](/platform-functions/stringify/) | Global Functions | string | Object to JSON string |
| [`Subscriber.Init(key)`](/core-library/subscriber/#init) | Core Library | SubscriberInstance | Initialize subscriber |
| [`Subscriber.Add(properties)`](/core-library/subscriber/#add) | Core Library | string | Create subscriber |
| [`Subscriber.Retrieve(filter)`](/core-library/subscriber/#retrieve) | Core Library | object[] | Retrieve subscribers |
| [`Subscriber.Upsert(properties)`](/core-library/subscriber/#upsert) | Core Library | string | Insert or update subscriber |
| [`Subscriber.Statistics(subscriberKey)`](/core-library/subscriber/#statistics) | Core Library | object | Subscriber statistics |
| [`<SubscriberInstance>.Update(properties)`](/core-library/subscriber/#instance-update) | Core Library | string | Update subscriber |
| [`<SubscriberInstance>.Remove()`](/core-library/subscriber/#instance-remove) | Core Library | string | Remove subscriber |
| [`<SubscriberInstance>.Unsubscribe()`](/core-library/subscriber/#instance-unsubscribe) | Core Library | string | Unsubscribe from all |
| [`<SubscriberInstance>.Attributes.Retrieve()`](/core-library/subscriber/#instance-attributes-retrieve) | Core Library | object[] | Retrieve subscriber attributes |
| [`<SubscriberInstance>.Lists.Retrieve()`](/core-library/subscriber/#instance-lists-retrieve) | Core Library | object[] | Retrieve subscriber lists |
| [`SenderProfile.Init(key)`](/core-library/senderprofile/#init) | Core Library | SenderProfileInstance | Initialize sender profile |
| [`SenderProfile.Add(properties)`](/core-library/senderprofile/#add) | Core Library | string | Create sender profile |
| [`<SenderProfileInstance>.Update(properties)`](/core-library/senderprofile/#instance-update) | Core Library | string | Update sender profile |
| [`<SenderProfileInstance>.Remove()`](/core-library/senderprofile/#instance-remove) | Core Library | string | Remove sender profile |
| [`SendClassification.Init(key)`](/core-library/sendclassification/#init) | Core Library | SendClassificationInstance | Initialize send classification |
| [`SendClassification.Add(properties)`](/core-library/sendclassification/#add) | Core Library | string | Create send classification |
| [`SendClassification.Retrieve(filter)`](/core-library/sendclassification/#retrieve) | Core Library | object[] | Retrieve send classifications |
| [`<SendClassificationInstance>.Update(properties)`](/core-library/sendclassification/#instance-update) | Core Library | string | Update send classification |
| [`<SendClassificationInstance>.Remove()`](/core-library/sendclassification/#instance-remove) | Core Library | string | Remove send classification |
| [`Send.Definition.Init(key)`](/core-library/senddefinition/#init) | Core Library | SendDefinitionInstance | Initialize send definition |
| [`Send.Definition.Add(esdParams, sendClassificationKey, emailKey, listIds)`](/core-library/senddefinition/#add) | Core Library | SendDefinitionInstance | Create send definition |
| [`Send.Definition.AddWithDE(esdParams, sendClassificationKey, emailKey, sendableDataExtensionKey, publicationListKey)`](/core-library/senddefinition/#addwithde) | Core Library | SendDefinitionInstance | Create send def with DE |
| [`Send.Definition.AddWithFilterDefinition(esdParams, sendClassificationKey, emailKey, filterDefinitionKey, listId)`](/core-library/senddefinition/#addwithfilterdefinition) | Core Library | SendDefinitionInstance | Create send def with filter |
| [`Send.Definition.Retrieve([filter])`](/core-library/senddefinition/#retrieve) | Core Library | object[] | Retrieve send definitions |
| [`<SendDefinitionInstance>.Update(properties)`](/core-library/senddefinition/#instance-update) | Core Library | string | Update send definition |
| [`<SendDefinitionInstance>.Remove()`](/core-library/senddefinition/#instance-remove) | Core Library | string | Remove send definition |
| [`<SendDefinitionInstance>.Send()`](/core-library/senddefinition/#instance-send) | Core Library | string | Execute send definition |
| [`Send.Init(id)`](/core-library/send/#init) | Core Library | SendInstance | Initialize send |
| [`Send.Add(emailKey, listIds, [options])`](/core-library/send/#add) | Core Library | SendInstance | Create send |
| [`Send.Retrieve(filter)`](/core-library/send/#retrieve) | Core Library | object[] | Retrieve sends |
| [`Send.RetrieveLists(filter)`](/core-library/send/#retrievelists) | Core Library | object[] | Lists for send |
| [`<SendInstance>.CancelSend()`](/core-library/send/#instance-cancelsend) | Core Library | string | Cancel send |
| [`<SendInstance>.Remove()`](/core-library/send/#instance-remove) | Core Library | string | Remove send |
| [`Send.Tracking.Retrieve(filter)`](/core-library/send/#tracking-retrieve) | Core Library | object[] | Send tracking |
| [`<SendInstance>.Tracking.ClickRetrieve(filter)`](/core-library/send/#instance-tracking-clickretrieve) | Core Library | object[] | Click tracking for send |
| [`<SendInstance>.Tracking.TotalByIntervalRetrieve(type, startDate, endDate, groupBy)`](/core-library/send/#instance-tracking-totalbyintervalretrieve) | Core Library | object[] | Aggregated send tracking |
| [`SentEvent.Retrieve(filter)`](/core-library/events/#sent-event) | Core Library | object[] | Sent events |
| [`<StringInstance>.charAt(index)`](#) | ECMAScript Builtins | string | Character at index |
| [`<StringInstance>.charCodeAt(index)`](#) | ECMAScript Builtins | number | Char code at index |
| [`<StringInstance>.concat(string[, ...])`](#) | ECMAScript Builtins | string | Concatenate strings |
| [`<StringInstance>.indexOf(searchValue[, fromIndex])`](#) | ECMAScript Builtins | number | First index of substring |
| [`<StringInstance>.lastIndexOf(searchValue[, fromIndex])`](#) | ECMAScript Builtins | number | Last index of substring |
| [`<StringInstance>.length`](#) | ECMAScript Builtins | number | String length |
| [`<StringInstance>.match(regexp)`](#) | ECMAScript Builtins | array | Match regex |
| [`<StringInstance>.replace(searchValue, replaceValue)`](#) | ECMAScript Builtins | string | Replace substring |
| [`<StringInstance>.search(regexp)`](#) | ECMAScript Builtins | number | Search for regex |
| [`<StringInstance>.slice(start[, end])`](#) | ECMAScript Builtins | string | Extract substring |
| [`<StringInstance>.split(separator[, limit])`](#) | ECMAScript Builtins | array | Split into array |
| [`<StringInstance>.substr(start[, length])`](#) | ECMAScript Builtins | string | Substring by length |
| [`<StringInstance>.substring(start[, end])`](#) | ECMAScript Builtins | string | Substring by range |
| [`<StringInstance>.toLowerCase()`](#) | ECMAScript Builtins | string | Convert to lower case |
| [`<StringInstance>.toUpperCase()`](#) | ECMAScript Builtins | string | Convert to upper case |
| [`SurveyEvent.Retrieve(filter)`](/core-library/events/#survey-event) | Core Library | object[] | Survey events |
| [`Platform.Function.SystemDateToLocalDate(date)`](/platform-functions/systemdatetolocaldate/) | Platform Functions | string | Server to subscriber local time |
| [`Platform.Response.SetResponseHeader(headerName, value)`](/platform-objects/platform-response/#setresponseheader) | Platform Response | void | Set a response header |
| [`Platform.Response.SetCookie(name, value [, expires [, secure]])`](/platform-objects/platform-response/#setcookie) | Platform Response | void | Set a response cookie |

---

## T

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.TreatAsContent(content)`](/platform-functions/treatascontent/) | Platform Functions | string | Evaluate AMPscript/HTML server-side |
| [`Template.Init(key)`](/core-library/template/#init) | Core Library | TemplateInstance | Initialize template |
| [`Template.Add(properties)`](/core-library/template/#add) | Core Library | string | Create template |
| [`Template.Retrieve(filter)`](/core-library/template/#retrieve) | Core Library | object[] | Retrieve templates |
| [`<TemplateInstance>.Update(properties)`](/core-library/template/#instance-update) | Core Library | string | Update template |
| [`TriggeredSend.Init(key)`](/core-library/triggeredsend/#init) | Core Library | TriggeredSendInstance | Initialize TS definition |
| [`TriggeredSend.Add(properties)`](/core-library/triggeredsend/#add) | Core Library | TriggeredSendInstance | Create TS definition |
| [`TriggeredSend.Retrieve(filter)`](/core-library/triggeredsend/#retrieve) | Core Library | object[] | Retrieve TS definitions |
| [`<TriggeredSendInstance>.Update(properties)`](/core-library/triggeredsend/#instance-update) | Core Library | string | Update TS definition |
| [`<TriggeredSendInstance>.Start()`](/core-library/triggeredsend/#instance-start) | Core Library | string | Start TS definition |
| [`<TriggeredSendInstance>.Pause()`](/core-library/triggeredsend/#instance-pause) | Core Library | string | Pause TS definition |
| [`<TriggeredSendInstance>.Publish()`](/core-library/triggeredsend/#instance-publish) | Core Library | string | Publish TS definition |
| [`<TriggeredSendInstance>.Send(emailAddress, [sendTimeAttributes])`](/core-library/triggeredsend/#instance-send) | Core Library | string | Fire triggered send |
| [`<TriggeredSendInstance>.Tracking.Retrieve([filter])`](/core-library/triggeredsend/#instance-tracking-retrieve) | Core Library | object[] | TS tracking |
| [`<TriggeredSendInstance>.Tracking.Clicks.Retrieve(filter)`](/core-library/triggeredsend/#instance-tracking-clicks-retrieve) | Core Library | object[] | TS click tracking |
| [`<TriggeredSendInstance>.Tracking.TotalByInterval.Retrieve(type, startDate, endDate, groupBy)`](/core-library/triggeredsend/#instance-tracking-totalbyinterval-retrieve) | Core Library | object[] | TS aggregated tracking |

---

## U

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`UnsubEvent.Retrieve(filter)`](/core-library/events/#unsub-event) | Core Library | object[] | Unsubscribe events |
| [`Platform.Function.UpdateData(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)`](/platform-functions/updatedata/) | Platform Functions | number | Update DE rows |
| [`UpdateDE(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)`](/platform-functions/updatede/) | Platform Functions | number | Alias for UpdateData |
| [`Platform.Function.UrlEncode(url[, encodeReservedKeywords])`](/platform-functions/urlencode/) | Platform Functions | string | Percent-encode a full URL |
| [`Platform.Function.UpsertData(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)`](/platform-functions/upsertdata/) | Platform Functions | number | Insert or update DE row |
| [`UpsertDE(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)`](/platform-functions/upsertde/) | Platform Functions | number | Alias for UpsertData |

---

## V

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Variable.GetValue(variableName)`](/global-functions/variable/) | Global Object | string | Read AMPscript variable (alias) |
| [`Variable.SetValue(variableName, value)`](/global-functions/variable/) | Global Object | void | Write AMPscript variable (alias) |
| [`Platform.Variable.GetValue(name)`](/platform-objects/platform-variable/) | Platform Variable | string | Reads the value of an AMPscript variable |
| [`Platform.Variable.SetValue(name, value)`](/platform-objects/platform-variable/#setvalue) | Platform Variable | void | Writes a value to an AMPscript variable |

---

## W

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Write(content)`](/global-functions/write/) | Global Functions | void | Output to page |
| [`Platform.Response.Write(content)`](/platform-objects/platform-response/#write) | Platform Response | void | Write content to the HTTP response output |

---

All Core Library namespaces — including `AccountUser`, `Portfolio`, `Folder`, `DeliveryProfile`, `SenderProfile`, `SendClassification`, `FilterDefinition`, and `DataExtension.Fields` — are indexed in the A–Z sections above. See the [Core Library](/core-library/) section for full documentation.
