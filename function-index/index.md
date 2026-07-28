---
layout: page
title: Function Index
description: Complete A–Z index of SSJS functions, methods, and objects documented in this reference — global functions, Platform.Function, Core library, WSProxy, HTTP, and Platform objects.
nav_order: 12
---

Alphabetical listing of APIs covered in this guide. **Instance-style Core and WSProxy calls** use placeholders such as `<WSProxyInstance>` for the variable you initialized (for example from `new Script.Util.WSProxy()`). That name is documentation shorthand — it is not a literal prefix like `proxy.` that you must type.

For category browsing, see [Platform Functions](/platform-functions/), [WSProxy](/wsproxy/), [HTTP](/http/), [Core Library](/core-library/), and [ECMAScript Built-ins](/ecmascript-builtins/).

---

## A

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Platform.Function.AddObjectArrayItem(apiObject, propertyName, value)`](/platform-functions/addobjectarrayitem/) | Platform Functions | void | Append item to a SOAP API object array property |
| [`Attribute.GetValue(name)`](/core-library/attribute/) | Core Library | string | Profile attribute in email / triggered send context |
| [`Account.Init(key)`](/core-library/account/#init) | Core Library | AccountInstance | Initialize Account |
| [`Account.Retrieve(filter)`](/core-library/account/#retrieve) | Core Library | object[] | Retrieve accounts |
| [`Account.Tracking.Retrieve(filter)`](/core-library/account/#tracking-retrieve) | Core Library | object[] | Account-level tracking |
| [`<AccountInstance>.Update(properties)`](/core-library/account/#instance-update) | Core Library | string | ❌ Update account — no working runtime invocation |
| [`AccountUser.Init(targetUserKey, myClientID)`](/core-library/accountuser/#init) | Core Library | AccountUserInstance | Initialize AccountUser |
| [`AccountUser.Add(properties)`](/core-library/accountuser/#add) | Core Library | string | ❌ Create AccountUser — no working runtime invocation |
| [`AccountUser.Retrieve(filter)`](/core-library/accountuser/#retrieve) | Core Library | object[] | Retrieve AccountUsers |
| [`<AccountUserInstance>.Update(properties)`](/core-library/accountuser/#instance-update) | Core Library | string | ❌ Update AccountUser — no working runtime invocation |
| [`<AccountUserInstance>.Activate()`](/core-library/accountuser/#instance-activate) | Core Library | string | ❌ Activate AccountUser — no working runtime invocation |
| [`<AccountUserInstance>.Deactivate()`](/core-library/accountuser/#instance-deactivate) | Core Library | string | ❌ Deactivate AccountUser — no working runtime invocation |
| [`AggregateError([errors[, message]])`](/ecmascript-builtins/error-types/#aggregateerror) | ECMAScript Builtins | Error | ❌ Missing (ES2021) — use the base `Error` constructor |
| [`AsyncFunction` / `AsyncGenerator` / `AsyncIterator`](/ecmascript-builtins/promises-iteration/#async-variants) | ECMAScript Builtins | — | ❌ Missing (ES2017+) — engine is synchronous; no `async`/`await` |
| [`ArrayBuffer(byteLength)`](/ecmascript-builtins/typed-arrays/#arraybuffer) | ECMAScript Builtins | — | ❌ Missing (ES6) — no binary buffers; use arrays or Base64 |
| [`Atomics`](/ecmascript-builtins/typed-arrays/#atomics) | ECMAScript Builtins | — | ❌ Missing (ES2017) — no shared-memory atomics |
| [`Array.from(arrayLike[, mapFn])`](/ecmascript-builtins/array-methods/#from) | ECMAScript Builtins | array | ❌ Missing (ES6) — needs polyfill |
| [`Array.isArray(value)`](/ecmascript-builtins/array-methods/#isarray) | ECMAScript Builtins | boolean | ❌ Missing (ES5) — needs polyfill |
| [`Array.of(element[, ...])`](/ecmascript-builtins/array-methods/#of) | ECMAScript Builtins | array | ❌ Missing (ES6) — needs polyfill |
| [`<ArrayInstance>.at(index)`](/ecmascript-builtins/array-methods/#at) | ECMAScript Builtins | any | ❌ Missing (ES2022) — needs polyfill |
| [`<ArrayInstance>.concat(value[, ...])`](/ecmascript-builtins/array-methods/#concat) | ECMAScript Builtins | array | Merge arrays |
| [`<ArrayInstance>.copyWithin(target[, start[, end]])`](/ecmascript-builtins/array-methods/#copywithin) | ECMAScript Builtins | array | ❌ Missing (ES6) — needs polyfill |
| [`<ArrayInstance>.entries()`](/ecmascript-builtins/array-methods/#entries) | ECMAScript Builtins | iterator | ❌ Missing (ES6) — needs polyfill |
| [`<ArrayInstance>.every(callback[, thisArg])`](/ecmascript-builtins/array-methods/#every) | ECMAScript Builtins | boolean | ❌ Missing (ES5) — use a `for` loop or polyfill |
| [`<ArrayInstance>.fill(value[, start[, end]])`](/ecmascript-builtins/array-methods/#fill) | ECMAScript Builtins | array | ❌ Missing (ES6) — needs polyfill |
| [`<ArrayInstance>.filter(callback[, thisArg])`](/ecmascript-builtins/array-methods/#filter) | ECMAScript Builtins | array | ❌ Missing (ES5) — needs polyfill |
| [`<ArrayInstance>.find(callback[, thisArg])`](/ecmascript-builtins/array-methods/#find) | ECMAScript Builtins | any | ❌ Missing (ES6) — needs polyfill |
| [`<ArrayInstance>.findIndex(callback[, thisArg])`](/ecmascript-builtins/array-methods/#findindex) | ECMAScript Builtins | number | ❌ Missing (ES6) — needs polyfill |
| [`<ArrayInstance>.findLast(callback[, thisArg])`](/ecmascript-builtins/array-methods/#findlast) | ECMAScript Builtins | any | ❌ Missing (ES2023) — needs polyfill |
| [`<ArrayInstance>.flat([depth])`](/ecmascript-builtins/array-methods/#flat) | ECMAScript Builtins | array | ❌ Missing (ES2019) — needs polyfill |
| [`<ArrayInstance>.flatMap(callback[, thisArg])`](/ecmascript-builtins/array-methods/#flatmap) | ECMAScript Builtins | array | ❌ Missing (ES2019) — needs polyfill |
| [`<ArrayInstance>.forEach(callback[, thisArg])`](/ecmascript-builtins/array-methods/#foreach) | ECMAScript Builtins | void | ❌ Missing (ES5) — needs polyfill |
| [`<ArrayInstance>.includes(searchElement[, fromIndex])`](/ecmascript-builtins/array-methods/#includes) | ECMAScript Builtins | boolean | ❌ Missing (ES2016) — needs polyfill |
| [`<ArrayInstance>.indexOf(searchElement[, fromIndex])`](/ecmascript-builtins/array-methods/#indexof) | ECMAScript Builtins | number | ❌ Missing (ES5) — needs polyfill |
| [`<ArrayInstance>.join([separator])`](/ecmascript-builtins/array-methods/#join) | ECMAScript Builtins | string | Join elements to string |
| [`<ArrayInstance>.keys()`](/ecmascript-builtins/array-methods/#keys) | ECMAScript Builtins | iterator | ❌ Missing (ES6) — needs polyfill |
| [`<ArrayInstance>.lastIndexOf(searchElement[, fromIndex])`](/ecmascript-builtins/array-methods/#lastindexof) | ECMAScript Builtins | number | ⚠️ Partial — broken; always returns -1; see Polyfills |
| [`<ArrayInstance>.length`](/ecmascript-builtins/array-methods/#length) | ECMAScript Builtins | number | Number of elements |
| [`<ArrayInstance>.map(callback[, thisArg])`](/ecmascript-builtins/array-methods/#map) | ECMAScript Builtins | array | ❌ Missing (ES5) — needs polyfill |
| [`<ArrayInstance>.pop()`](/ecmascript-builtins/array-methods/#pop) | ECMAScript Builtins | any | Remove and return last element |
| [`<ArrayInstance>.push(element[, ...])`](/ecmascript-builtins/array-methods/#push) | ECMAScript Builtins | number | Add elements to end; return new length |
| [`<ArrayInstance>.reduce(callback[, initialValue])`](/ecmascript-builtins/array-methods/#reduce) | ECMAScript Builtins | any | ❌ Missing (ES5) — needs polyfill |
| [`<ArrayInstance>.reduceRight(callback[, initialValue])`](/ecmascript-builtins/array-methods/#reduceright) | ECMAScript Builtins | any | ❌ Missing (ES5) — needs polyfill |
| [`<ArrayInstance>.reverse()`](/ecmascript-builtins/array-methods/#reverse) | ECMAScript Builtins | array | Reverse array in place |
| [`<ArrayInstance>.shift()`](/ecmascript-builtins/array-methods/#shift) | ECMAScript Builtins | any | Remove and return first element |
| [`<ArrayInstance>.slice([start[, end]])`](/ecmascript-builtins/array-methods/#slice) | ECMAScript Builtins | array | ⚠️ Partial — indices work; no-arg `slice()` throws; see Polyfills |
| [`<ArrayInstance>.some(callback[, thisArg])`](/ecmascript-builtins/array-methods/#some) | ECMAScript Builtins | boolean | ❌ Missing (ES5) — needs polyfill |
| [`<ArrayInstance>.sort([compareFn])`](/ecmascript-builtins/array-methods/#sort) | ECMAScript Builtins | array | ⚠️ Partial — needs a compare fn; no-arg `sort()` throws; see Polyfills |
| [`<ArrayInstance>.splice(start[, deleteCount[, item1[, ...]]])`](/ecmascript-builtins/array-methods/#splice) | ECMAScript Builtins | array | ⚠️ Partial — delete form works; insert form (3rd+ arg) needs [polyfill](/engine-limitations/polyfills/#array-prototype-splice) |
| [`<ArrayInstance>.toLocaleString()`](/ecmascript-builtins/array-methods/#tolocalestring) | ECMAScript Builtins | string | Locale-aware string of the array's elements |
| [`<ArrayInstance>.unshift(element[, ...])`](/ecmascript-builtins/array-methods/#unshift) | ECMAScript Builtins | number | Add elements to start; return new length |
| [`<ArrayInstance>.values()`](/ecmascript-builtins/array-methods/#values) | ECMAScript Builtins | iterator | ❌ Missing (ES6) — needs polyfill |

---

## B

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Base64Decode(encodedString)`](/core-library/base64decode/) | Core Library | string | Decode Base64 string to plain text |
| [`Platform.Function.Base64Decode(encodedString[, charset])`](/platform-functions/base64decode/) | Platform Functions | string | Decode a Base64-encoded string |
| [`Base64Encode(string)`](/core-library/base64encode/) | Core Library | string | Encode plain text to Base64 |
| [`Platform.Function.Base64Encode(string[, charset])`](/platform-functions/base64encode/) | Platform Functions | string | Encode a string to Base64 |
| [`BeginImpressionRegion(name)`](/core-library/beginimpressionregion/) | Core Library | void | Bare-name Core form of Platform.Function.BeginImpressionRegion — unusable from SSJS |
| [`Platform.Function.BeginImpressionRegion(name)`](/platform-functions/beginimpressionregion/) | Platform Functions | void | Start a named impression region |
| [`BigInt(value)`](/ecmascript-builtins/bigint/) | ECMAScript Builtins | bigint | ❌ Missing (ES2020) — no arbitrary-precision integers |
| [`BigInt64Array` / `BigUint64Array`](/ecmascript-builtins/typed-arrays/#bigint64array) | ECMAScript Builtins | — | ❌ Missing (ES2020) — no typed arrays |
| [`Boolean(value)`](/ecmascript-builtins/boolean/#boolean-coercion) | ECMAScript Builtins | boolean | ⚠️ Partial — returns a primitive, but `Boolean(-1)` and `Boolean([])` are `false`; result has no methods |
| [`new Boolean(value)`](/ecmascript-builtins/boolean/#boolean-boxed) | ECMAScript Builtins | object | ⚠️ Partial — capitalized `True`/`False`; boxed `false` is falsy; `valueOf()` does not unwrap |
| [`Boolean.prototype`](/ecmascript-builtins/boolean/#boolean-prototype) | ECMAScript Builtins | object | `toString.call(primitive)` returns the correct lowercase form |
| [`BounceEvent.Retrieve(filter)`](/core-library/events/#bounce-event) | Core Library | object[] | Bounce tracking events |

---

## C

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`ContentArea(id[, regionName, errorMsg, fallbackContent])`](/core-library/contentarea/) | Core Library | string | Classic Content Area by ID — **deprecated** |
| [`ContentAreaByName(name[, regionName, errorMsg, fallbackContent])`](/core-library/contentareabyname/) | Core Library | string | Classic Content Area by name — **deprecated** |
| [`Platform.Function.ContentArea(id[, regionName, stopOnError, fallbackContent])`](/platform-functions/contentarea/) | Platform Functions | string | Classic Content Area by ID — **deprecated** |
| [`Platform.Function.ContentAreaByName(name[, regionName, stopOnError, fallbackContent])`](/platform-functions/contentareabyname/) | Platform Functions | string | Classic Content Area by name — **deprecated** |
| [`Platform.Function.ContentBlockByID(id[, regionName, stopOnError, fallbackContent])`](/platform-functions/contentblockbyid/) | Platform Functions | string | Render Content Builder block by ID |
| [`Platform.Function.ContentBlockByKey(customerKey[, regionName, stopOnError, fallbackContent])`](/platform-functions/contentblockbykey/) | Platform Functions | string | Render Content Builder block by key |
| [`Platform.Function.ContentBlockByName(name[, regionName, stopOnError, fallbackContent, statusVariable])`](/platform-functions/contentblockbyname/) | Platform Functions | string | Render Content Builder block by name |
| [`Platform.Function.ContentImageByID(id[, fallbackId])`](/platform-functions/contentimagebyid/) | Platform Functions | string | img tag for Content Builder image by ID |
| [`Platform.Function.ContentImageByKey(key[, fallbackId])`](/platform-functions/contentimagebykey/) | Platform Functions | string | img tag for Content Builder image by key |
| [`Platform.Function.CreateObject(objectType)`](/platform-functions/createobject/) | Platform Functions | object | Create SOAP API object (legacy) |
| [`Platform.Response.CharacterSet`](/platform-objects/platform-response/#characterset) | Platform Response | write-only | ⚠️ Set the response charset — reading it throws |
| [`Platform.Response.ContentType`](/platform-objects/platform-response/#contenttype) | Platform Response | write-only | ⚠️ Set the response `Content-Type` — reading it throws |
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
| [`DateTime.TimeZone.Retrieve([filter])`](/core-library/datetime/#timezone-retrieve) | Core Library | object[] | Time zone definitions — omit the filter for all time zones |
| [`DateTime.LocalDateToSystemDate(dateString)`](/core-library/datetime/#localdatetosystemdate) | Core Library | string | Local account/user time to system time (CST) |
| [`DateTime.SystemDateToLocalDate(dateString)`](/core-library/datetime/#systemdatetolocaldate) | Core Library | string | System time (CST) to local account/user time |
| [`Date.now()`](/ecmascript-builtins/date-methods/#now) | ECMAScript Builtins | object | ⚠️ Returns a **Date object** in SFMC, not a number — use `new Date().getTime()` (static) |
| [`Date.parse(dateString)`](/ecmascript-builtins/date-methods/#parse) | ECMAScript Builtins | number | ⚠️ Invalid strings return **`0`**, not `NaN`; date-only parses as local (static) |
| [`Date.UTC(year, month[, day, hours, minutes, seconds, milliseconds])`](/ecmascript-builtins/date-methods/#utc) | ECMAScript Builtins | number | ⚠️ Partial — pass ≥ 2 args; year-only form returns a nonsense value, not `NaN` (static) |
| [`<DateInstance>.getDate()`](/ecmascript-builtins/date-methods/#getdate) | ECMAScript Builtins | number | Day of month (1–31), local time |
| [`<DateInstance>.getDay()`](/ecmascript-builtins/date-methods/#getday) | ECMAScript Builtins | number | Day of week (0 = Sunday … 6 = Saturday), local time |
| [`<DateInstance>.getFullYear()`](/ecmascript-builtins/date-methods/#getfullyear) | ECMAScript Builtins | number | Four-digit year, local time |
| [`<DateInstance>.getHours()`](/ecmascript-builtins/date-methods/#gethours) | ECMAScript Builtins | number | Hours (0–23), local time |
| [`<DateInstance>.getMilliseconds()`](/ecmascript-builtins/date-methods/#getmilliseconds) | ECMAScript Builtins | number | Milliseconds (0–999), local time — frequently off by one |
| [`<DateInstance>.getMinutes()`](/ecmascript-builtins/date-methods/#getminutes) | ECMAScript Builtins | number | Minutes (0–59), local time |
| [`<DateInstance>.getMonth()`](/ecmascript-builtins/date-methods/#getmonth) | ECMAScript Builtins | number | Month (0 = January … 11 = December), local time |
| [`<DateInstance>.getSeconds()`](/ecmascript-builtins/date-methods/#getseconds) | ECMAScript Builtins | number | Seconds (0–59), local time |
| [`<DateInstance>.getTime()`](/ecmascript-builtins/date-methods/#gettime) | ECMAScript Builtins | number | Milliseconds since the Unix epoch |
| [`<DateInstance>.getTimezoneOffset()`](/ecmascript-builtins/date-methods/#gettimezoneoffset) | ECMAScript Builtins | number | Difference in minutes between local time and UTC |
| [`<DateInstance>.getUTCFullYear()`](/ecmascript-builtins/date-methods/#getutcfullyear) | ECMAScript Builtins | number | Four-digit year, UTC |
| [`<DateInstance>.getUTCMonth()`](/ecmascript-builtins/date-methods/#getutcmonth) | ECMAScript Builtins | number | Month (0 = January … 11 = December), UTC |
| [`<DateInstance>.getUTCDate()`](/ecmascript-builtins/date-methods/#getutcdate) | ECMAScript Builtins | number | Day of month (1–31), UTC |
| [`<DateInstance>.getUTCDay()`](/ecmascript-builtins/date-methods/#getutcday) | ECMAScript Builtins | number | Day of week (0 = Sunday … 6 = Saturday), UTC |
| [`<DateInstance>.getUTCHours()`](/ecmascript-builtins/date-methods/#getutchours) | ECMAScript Builtins | number | Hours (0–23), UTC |
| [`<DateInstance>.getUTCMinutes()`](/ecmascript-builtins/date-methods/#getutcminutes) | ECMAScript Builtins | number | Minutes (0–59), UTC |
| [`<DateInstance>.getUTCSeconds()`](/ecmascript-builtins/date-methods/#getutcseconds) | ECMAScript Builtins | number | Seconds (0–59), UTC |
| [`<DateInstance>.getUTCMilliseconds()`](/ecmascript-builtins/date-methods/#getutcmilliseconds) | ECMAScript Builtins | number | Milliseconds (0–999), UTC |
| [`<DateInstance>.toDateString()`](/ecmascript-builtins/date-methods/#todatestring) | ECMAScript Builtins | string | Date portion as a human-readable string |
| [`<DateInstance>.toISOString()`](/ecmascript-builtins/date-methods/#toisostring) | ECMAScript Builtins | string | ❌ Missing (ES5) — needs polyfill |
| [`<DateInstance>.toJSON()`](/ecmascript-builtins/date-methods/#tojson) | ECMAScript Builtins | string | ❌ Missing (ES5) — depends on `toISOString` |
| [`<DateInstance>.toString()`](/ecmascript-builtins/date-methods/#tostring) | ECMAScript Builtins | string | Human-readable string representation of the date |
| [`<DateInstance>.toTimeString()`](/ecmascript-builtins/date-methods/#totimestring) | ECMAScript Builtins | string | Time portion as a human-readable string |
| [`<DateInstance>.toUTCString()`](/ecmascript-builtins/date-methods/#toutcstring) | ECMAScript Builtins | string | Date as a string in the UTC time zone |
| [`<DateInstance>.valueOf()`](/ecmascript-builtins/date-methods/#valueof) | ECMAScript Builtins | number | Milliseconds since the Unix epoch |
| [`<DateInstance>.toLocaleDateString()`](/ecmascript-builtins/internationalization/#tolocalestring-family) | ECMAScript Builtins | string | ⚠️ Differs — locale argument ignored; non-localized output |
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
| [`DeleteDE(deName, whereFieldNames, whereFieldValues)`](/platform-functions/deletede/) | Platform Functions | null | Same delete as DeleteData, but returns null |
| [`DataView(buffer[, byteOffset[, byteLength]])`](/ecmascript-builtins/typed-arrays/#dataview) | ECMAScript Builtins | — | ❌ Missing (ES6) — no binary buffer views |
| [`decodeURI(uri)`](/ecmascript-builtins/global-functions/#decodeuri) | ECMAScript Builtins | string | Decode a full URI |
| [`decodeURIComponent(str)`](/ecmascript-builtins/global-functions/#decodeuricomponent) | ECMAScript Builtins | string | ⚠️ Partial — decodes `+` as a space (form-urlencoded) |

---

## E

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`EvalError([message])`](/ecmascript-builtins/error-types/#evalerror) | ECMAScript Builtins | Error | ✅ Present — legacy `Error` subtype (shares base `Error` quirks) |
| [`Email.Init(key)`](/core-library/email/#init) | Core Library | EmailInstance | Initialize email definition |
| [`Email.Add(properties)`](/core-library/email/#add) | Core Library | EmailInstance | Create email definition |
| [`Email.Retrieve(filter)`](/core-library/email/#retrieve) | Core Library | object[] | Retrieve email definitions |
| [`<EmailInstance>.Update(properties)`](/core-library/email/#instance-update) | Core Library | string | Update email definition |
| [`<EmailInstance>.Remove()`](/core-library/email/#instance-remove) | Core Library | string | Remove email definition |
| [`<EmailInstance>.Validate()`](/core-library/email/#instance-validate) | Core Library | object | Validate email |
| [`<EmailInstance>.CheckContent()`](/core-library/email/#instance-checkcontent) | Core Library | object | Content checks |
| [`EndImpressionRegion([closeAll])`](/core-library/endimpressionregion/) | Core Library | undefined | Bare-name Core form of Platform.Function.EndImpressionRegion — returns undefined, not null |
| [`Platform.Function.EndImpressionRegion([closeAll])`](/platform-functions/endimpressionregion/) | Platform Functions | void | End an impression region |
| [`Error(message)`](/ecmascript-builtins/error/) | ECMAScript Builtins | Error | Create Error object (`new Error([message])`) — `.message` reads `undefined`; use `String(e)` |
| [`ErrorUtil.ThrowWSProxyError(result)`](/wsproxy/errorutil/) | WSProxy | void | Throw when WSProxy status indicates failure |
| [`encodeURI(uri)`](/ecmascript-builtins/global-functions/#encodeuri) | ECMAScript Builtins | string | ⚠️ Partial — space → `+` (not `%20`), lowercase hex |
| [`encodeURIComponent(str)`](/ecmascript-builtins/global-functions/#encodeuricomponent) | ECMAScript Builtins | string | ⚠️ Partial — space → `+`, lowercase hex (`%2f`) |
| [`escape(str)`](/ecmascript-builtins/global-functions/#escape) | ECMAScript Builtins | string | ❌ Missing — `undefined`; use `encodeURIComponent` |

---

## F

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`FinalizationRegistry(callback)`](/ecmascript-builtins/memory-management/#finalizationregistry) | ECMAScript Builtins | — | ❌ Missing (ES2021) — no GC callbacks |
| [`Float16Array` / `Float32Array` / `Float64Array`](/ecmascript-builtins/typed-arrays/#float32array) | ECMAScript Builtins | — | ❌ Missing (ES6+) — no typed arrays |
| [`FilterDefinition.Init(key)`](/core-library/filterdefinition/#init) | Core Library | FilterDefinitionInstance | Initialize filter definition |
| [`FilterDefinition.Add(properties)`](/core-library/filterdefinition/#add) | Core Library | string | ⚠️ Create filter definition — works for simple filters; complex shapes throw "Error adding FilterDefinition" |
| [`FilterDefinition.Retrieve(filter)`](/core-library/filterdefinition/#retrieve) | Core Library | object[] | Retrieve filter definitions |
| [`<FilterDefinitionInstance>.Update(properties)`](/core-library/filterdefinition/#instance-update) | Core Library | string | ❌ Update filter definition — no working runtime invocation |
| [`<FilterDefinitionInstance>.Remove()`](/core-library/filterdefinition/#instance-remove) | Core Library | string | ❌ Remove filter definition — no working runtime invocation |
| [`Folder.Init([key])`](/core-library/folder/#init) | Core Library | FolderInstance | Initialize Folder |
| [`Folder.Add(properties)`](/core-library/folder/#add) | Core Library | string | Create folder |
| [`Folder.Retrieve(filter)`](/core-library/folder/#retrieve) | Core Library | object[] | Retrieve folders |
| [`<FolderInstance>.Update(properties)`](/core-library/folder/#instance-update) | Core Library | string | Update folder |
| [`<FolderInstance>.Remove()`](/core-library/folder/#instance-remove) | Core Library | string | Remove folder |
| [`<FolderInstance>.SetID(id)`](/core-library/folder/#instance-setid) | Core Library | void | Set folder ID |
| [`Format(textToFormat, formatCode)`](/core-library/format/) | Core Library | string | Format a date/number string |
| [`<FunctionInstance>.apply(thisArg[, argsArray])`](/ecmascript-builtins/function-methods/#apply) | ECMAScript Builtins | any | Call function with `this` and an array of arguments |
| [`<FunctionInstance>.bind(thisArg[, ...args])`](/ecmascript-builtins/function-methods/#bind) | ECMAScript Builtins | function | ❌ Missing (ES5) — needs polyfill |
| [`<FunctionInstance>.call(thisArg[, ...args])`](/ecmascript-builtins/function-methods/#call) | ECMAScript Builtins | any | Call function with `this` and individual arguments |
| [`<FunctionInstance>.caller`](/ecmascript-builtins/function-methods/#caller) | ECMAScript Builtins | function | ❌ Missing — `undefined`; no caller-chain introspection |
| [`<FunctionInstance>.length`](/ecmascript-builtins/function-methods/#length) | ECMAScript Builtins | number | ❌ Broken — reading it throws a null-reference error; track arity yourself |
| [`<FunctionInstance>.name`](/ecmascript-builtins/function-methods/#name) | ECMAScript Builtins | string | ❌ Missing — `undefined`; pass an explicit name string |
| [`<FunctionInstance>.toString()`](/ecmascript-builtins/function-methods/#tostring) | ECMAScript Builtins | string | ⚠️ Differs — returns `[object Function]`, not the source |
| [`ForwardedEmailEvent.Retrieve(filter)`](/core-library/events/#forwarded-email-event) | Core Library | object[] | Forwarded-email events |
| [`ForwardedEmailOptInEvent.Retrieve(filter)`](/core-library/events/#forwarded-email-opt-in-event) | Core Library | object[] | Forwarded opt-in events |

---

## G

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`globalThis`](/ecmascript-builtins/global-values/#globalthis) | ECMAScript Builtins | object | ❌ Missing (ES2020) — `undefined`; no global-object reference |
| [`Generator` / `GeneratorFunction`](/ecmascript-builtins/promises-iteration/#generator) | ECMAScript Builtins | — | ❌ Missing (ES6) — `function*` / `yield` are parse errors |
| [`GUID()`](/core-library/guid/) | Core Library | string | Bare-name Core form of Platform.Function.GUID — generate UUID v4 |
| [`Platform.Function.GUID()`](/platform-functions/guid/) | Platform Functions | string | Generate UUID v4 |
| [`Platform.Recipient.GetAttributeValue(attributeName)`](/platform-objects/platform-recipient/) | Platform Functions | string | Returns the value of a subscriber attribute or sendable DE field for the current recipient |
| [`Platform.Request.GetCookieValue(name)`](/platform-objects/platform-request/) | Platform Functions | string | Read a cookie value |
| [`Platform.Request.GetFormField(name)`](/platform-objects/platform-request/) | Platform Functions | string | Read a form field (POST or GET) |
| [`Platform.Request.GetPostData([encoding])`](/platform-objects/platform-request/) | Platform Functions | string | Read raw POST body (optional character encoding) |
| [`Platform.Request.GetQueryStringParameter(name)`](/platform-objects/platform-request/) | Platform Functions | string | Read a URL query parameter |
| [`Platform.Request.GetRequestHeader(name)`](/platform-objects/platform-request/) | Platform Functions | string | Read a request header |
| [`Platform.Request.GetUserLanguages()`](/platform-objects/platform-request/) ⚠️ | Platform Functions | string | Read the browser `Accept-Language` header value — `GetUserLanguages()` as called is **not defined at runtime** (the engine does not resolve it; throws at every arity tried); use `GetRequestHeader("Accept-Language")` |

---

## H

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`HTTP.Get(url[, headerNames, headerValues])`](/http/get/) | Core HTTP | object | HTTP GET — structured status + body |
| [`HTTP.Post(url, contentType, payload, headerNames, headerValues)`](/http/post/) | Core HTTP | object | HTTP POST — structured status + body |
| [`HTTPHeader.GetValue(name)`](/core-library/httpheader/) | Core Library | string | Read HTTP request header |
| [`HTTPHeader.SetValue(name, value)`](/core-library/httpheader/) | Core Library | void | Set HTTP request header |
| [`HTTPHeader.Remove(headerName)`](/core-library/httpheader/) | Core Library | string | Remove HTTP request header |
| [`Platform.Function.HTTPGet(url, continueOnError[, emptyContentHandling, headerNames, headerValues, statusVariable])`](/platform-functions/httpget/) | Platform Functions | string | HTTP GET — body string only |
| [`Platform.Function.HTTPPost(url, contentType, payload[, headerNames, headerValues, response])`](/platform-functions/httppost/) | Platform Functions | string | HTTP POST — body string only |

---

## I

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Iterator`](/ecmascript-builtins/promises-iteration/#iterator) | ECMAScript Builtins | — | ❌ Missing (ES6) — no iteration protocol; use index loops |
| [`InternalError([message])`](/ecmascript-builtins/error-types/#internalerror) | ECMAScript Builtins | Error | ❌ Missing (non-standard) — use the base `Error` constructor |
| [`Int8Array` / `Int16Array` / `Int32Array`](/ecmascript-builtins/typed-arrays/#int8array) | ECMAScript Builtins | — | ❌ Missing (ES6) — no typed arrays |
| [`Intl`](/ecmascript-builtins/internationalization/#intl) | ECMAScript Builtins | — | ❌ Missing (ES2015) — no locale formatters; use `Platform.Function.FormatNumber` / `FormatDate` |
| [`Platform.Function.InsertData(deName, fieldNames, fieldValues)`](/platform-functions/insertdata/) | Platform Functions | number | Insert DE row |
| [`InsertDE(deName, fieldNames, fieldValues)`](/platform-functions/insertde/) | Platform Functions | null | Same insert as InsertData, but returns null |
| [`Platform.Function.InvokeConfigure(apiObject, action, status, options)`](/platform-functions/invokeconfigure/) | Platform Functions | string | SOAP Configure call (legacy) |
| [`Platform.Function.InvokeCreate(apiObject, status, options)`](/platform-functions/invokecreate/) | Platform Functions | string | SOAP Create (legacy) |
| [`Platform.Function.InvokeDelete(apiObject, status, options)`](/platform-functions/invokedelete/) | Platform Functions | string | SOAP Delete (legacy) |
| [`Platform.Function.InvokeExecute(apiObject, status)`](/platform-functions/invokeexecute/) | Platform Functions | object[] | SOAP Execute call (legacy) |
| [`Platform.Function.InvokeExtract(apiObject, statusArray)`](/platform-functions/invokeextract/) | Platform Functions | string | SOAP Extract call (legacy) |
| [`Platform.Function.InvokePerform(apiObject, method, status[, options])`](/platform-functions/invokeperform/) | Platform Functions | string | SOAP Perform action (legacy) |
| [`Platform.Function.InvokeRetrieve(apiObject, status)`](/platform-functions/invokeretrieve/) | Platform Functions | object[] | SOAP Retrieve (legacy) |
| [`Platform.Function.InvokeSchedule(apiObject, action, schedule[, statusArray, options])`](/platform-functions/invokeschedule/) | Platform Functions | string | SOAP Schedule call (legacy) |
| [`Platform.Function.InvokeUpdate(apiObject, status, options)`](/platform-functions/invokeupdate/) | Platform Functions | string | SOAP Update (legacy) |
| [`IsEmailAddress(value)`](/core-library/isemailaddress/) | Core Library | boolean | Bare-name Core form of Platform.Function.IsEmailAddress — validate email format |
| [`Platform.Function.IsEmailAddress(value)`](/platform-functions/isemailaddress/) | Platform Functions | boolean | Validate email format |
| [`IsPhoneNumber(value)`](/core-library/isphonenumber/) | Core Library | boolean | Bare-name Core form of Platform.Function.IsPhoneNumber — validate NANP phone format |
| [`Platform.Function.IsPhoneNumber(value)`](/platform-functions/isphonenumber/) | Platform Functions | boolean | Validate phone number format |
| [`Platform.Function.IsCHTMLBrowser(userAgentString)`](/platform-functions/ischtmlbrowser/) | Platform Functions | boolean | Detect CHTML / feature-phone browsers |
| [`isFinite(value)`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | boolean | Test if value is finite |
| [`isNaN(value)`](/ecmascript-builtins/number-methods/) | ECMAScript Builtins | boolean | Test if value is NaN |
| [`Infinity`](/ecmascript-builtins/global-values/#infinity) | ECMAScript Builtins | number | ⚠️ Partial — **sign inverted**: `Infinity > 0` is `false`, `String(Infinity)` is `-infinity` |
| [`Number.isFinite(value)`](/ecmascript-builtins/number-methods/#isfinite) | ECMAScript Builtins | boolean | ❌ Missing (ES6) — use the global `isFinite` |
| [`Number.isInteger(value)`](/ecmascript-builtins/number-methods/#isinteger) | ECMAScript Builtins | boolean | ❌ Missing (ES6) — needs polyfill |
| [`Number.isNaN(value)`](/ecmascript-builtins/number-methods/#isnan) | ECMAScript Builtins | boolean | ❌ Missing (ES6) — use the global `isNaN` |
| [`Number.isSafeInteger(value)`](/ecmascript-builtins/number-methods/#max_safe_integer) | ECMAScript Builtins | boolean | ❌ Missing (ES6) — check against `9007199254740991` yourself |
| [`Number.parseFloat(string)`](/ecmascript-builtins/number-methods/#max_safe_integer) | ECMAScript Builtins | number | ❌ Missing (ES6) — use the global `parseFloat` |
| [`Number.parseInt(string[, radix])`](/ecmascript-builtins/number-methods/#parseint) | ECMAScript Builtins | number | ❌ Missing (ES6) — use the global `parseInt` |

---

## J

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`JSON.parse(text[, reviver])`](/ecmascript-builtins/json/#parse) | ECMAScript Builtins | any | ❌ Missing — `JSON` is undefined; use [`Platform.Function.ParseJSON`](/platform-functions/parsejson/) |
| [`JSON.stringify(value[, replacer[, space]])`](/ecmascript-builtins/json/#stringify) | ECMAScript Builtins | string | ❌ Missing — `JSON` is undefined; use [`Platform.Function.Stringify`](/platform-functions/stringify/) |

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
| [`Platform.Function.LocalDateToSystemDate(dateString)`](/platform-functions/localdatetosystemdate/) | Platform Functions | string | Local date/time to system CST |
| [`Platform.Function.Lookup(deName, returnField, whereFieldNames, whereFieldValues)`](/platform-functions/lookup/) | Platform Functions | string | Single-value DE lookup |
| [`Platform.Function.LookupOrderedRows(deName, count, orderBy, whereFieldNames, whereFieldValues)`](/platform-functions/lookuporderedrows/) | Platform Functions | object[] | Sorted/limited DE rows |
| [`Platform.Function.LookupRows(deName, whereFieldNames, whereFieldValues)`](/platform-functions/lookuprows/) | Platform Functions | object[] | Multiple DE rows |

---

## M

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Map()`](/ecmascript-builtins/keyed-collections/#map) | ECMAScript Builtins | — | ❌ Missing (ES6) — `new Map()` throws; use a plain object dictionary |
| [`Math.abs(x)`](/ecmascript-builtins/math/#abs) | ECMAScript Builtins | number | Absolute value |
| [`Math.acos(x)`](/ecmascript-builtins/math/#acos) | ECMAScript Builtins | number | Arccosine |
| [`Math.acosh(x)`](/ecmascript-builtins/math/#acosh) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `Math.log(x + Math.sqrt(x * x - 1))` |
| [`Math.asin(x)`](/ecmascript-builtins/math/#asin) | ECMAScript Builtins | number | Arcsine |
| [`Math.asinh(x)`](/ecmascript-builtins/math/#asinh) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `Math.log(x + Math.sqrt(x * x + 1))` |
| [`Math.atan(x)`](/ecmascript-builtins/math/#atan) | ECMAScript Builtins | number | Arctangent |
| [`Math.atan2(y, x)`](/ecmascript-builtins/math/#atan2) | ECMAScript Builtins | number | Arctangent of quotient |
| [`Math.atanh(x)`](/ecmascript-builtins/math/#atanh) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `Math.log((1 + x) / (1 - x)) / 2` |
| [`Math.cbrt(x)`](/ecmascript-builtins/math/#cbrt) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `Math.pow(x, 1/3)` |
| [`Math.ceil(x)`](/ecmascript-builtins/math/#ceil) | ECMAScript Builtins | number | Round up |
| [`Math.clz32(x)`](/ecmascript-builtins/math/#clz32) | ECMAScript Builtins | number | ❌ Missing (ES6) — count leading zero bits manually |
| [`Math.cos(x)`](/ecmascript-builtins/math/#cos) | ECMAScript Builtins | number | Cosine |
| [`Math.cosh(x)`](/ecmascript-builtins/math/#cosh) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `(Math.exp(x) + Math.exp(-x)) / 2` |
| [`Math.E`](/ecmascript-builtins/math/#e) | ECMAScript Builtins | number | Euler's number (~2.718) |
| [`Math.exp(x)`](/ecmascript-builtins/math/#exp) | ECMAScript Builtins | number | e to the power of x |
| [`Math.expm1(x)`](/ecmascript-builtins/math/#expm1) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `Math.exp(x) - 1` |
| [`Math.floor(x)`](/ecmascript-builtins/math/#floor) | ECMAScript Builtins | number | Round down |
| [`Math.fround(x)`](/ecmascript-builtins/math/#fround) | ECMAScript Builtins | number | ❌ Missing (ES6) — no ES3-safe equivalent; keep doubles |
| [`Math.hypot(value1[, value2, ...])`](/ecmascript-builtins/math/#hypot) | ECMAScript Builtins | number | ❌ Missing (ES6) — needs polyfill |
| [`Math.imul(a, b)`](/ecmascript-builtins/math/#imul) | ECMAScript Builtins | number | ❌ Missing (ES6) — emulate with bitwise ops |
| [`Math.LN2`](/ecmascript-builtins/math/#ln2) | ECMAScript Builtins | number | Natural logarithm of 2 |
| [`Math.LN10`](/ecmascript-builtins/math/#ln10) | ECMAScript Builtins | number | Natural logarithm of 10 |
| [`Math.log(x)`](/ecmascript-builtins/math/#log) | ECMAScript Builtins | number | Natural logarithm |
| [`Math.log1p(x)`](/ecmascript-builtins/math/#log1p) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `Math.log(1 + x)` |
| [`Math.log2(x)`](/ecmascript-builtins/math/#log2) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `Math.log(x) / Math.LN2` |
| [`Math.log10(x)`](/ecmascript-builtins/math/#log10) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `Math.log(x) / Math.LN10` |
| [`Math.LOG2E`](/ecmascript-builtins/math/#log2e) | ECMAScript Builtins | number | Base-2 log of e |
| [`Math.LOG10E`](/ecmascript-builtins/math/#log10e) | ECMAScript Builtins | number | ❌ Missing — `undefined`; use `1 / Math.LN10` |
| [`Math.max(value1[, value2, ...])`](/ecmascript-builtins/math/#max) | ECMAScript Builtins | number | ⚠️ Largest value — throws with 3+ args; no-arg returns `0`, not `-Infinity` |
| [`Math.min(value1[, value2, ...])`](/ecmascript-builtins/math/#min) | ECMAScript Builtins | number | ⚠️ Smallest value — throws with 3+ args; no-arg returns `0`, not `+Infinity` |
| [`Math.PI`](/ecmascript-builtins/math/#pi) | ECMAScript Builtins | number | Pi (~3.14159) |
| [`Math.pow(base, exponent)`](/ecmascript-builtins/math/#pow) | ECMAScript Builtins | number | Base to the power of exponent |
| [`Math.random()`](/ecmascript-builtins/math/#random) | ECMAScript Builtins | number | Random number [0, 1) |
| [`Math.round(x)`](/ecmascript-builtins/math/#round) | ECMAScript Builtins | number | Round to nearest integer |
| [`Math.sign(x)`](/ecmascript-builtins/math/#sign) | ECMAScript Builtins | number | ❌ Missing (ES6) — needs polyfill |
| [`Math.sin(x)`](/ecmascript-builtins/math/#sin) | ECMAScript Builtins | number | Sine |
| [`Math.sinh(x)`](/ecmascript-builtins/math/#sinh) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `(Math.exp(x) - Math.exp(-x)) / 2` |
| [`Math.sqrt(x)`](/ecmascript-builtins/math/#sqrt) | ECMAScript Builtins | number | Square root |
| [`Math.SQRT1_2`](/ecmascript-builtins/math/#sqrt1_2) | ECMAScript Builtins | number | Square root of 1/2 |
| [`Math.SQRT2`](/ecmascript-builtins/math/#sqrt2) | ECMAScript Builtins | number | Square root of 2 |
| [`Math.tan(x)`](/ecmascript-builtins/math/#tan) | ECMAScript Builtins | number | Tangent |
| [`Math.tanh(x)`](/ecmascript-builtins/math/#tanh) | ECMAScript Builtins | number | ❌ Missing (ES6) — build from `Math.exp` |
| [`Math.trunc(x)`](/ecmascript-builtins/math/#trunc) | ECMAScript Builtins | number | ❌ Missing (ES6) — use `x < 0 ? Math.ceil(x) : Math.floor(x)` |
| [`Platform.Function.MD5(string[, charset])`](/platform-functions/md5/) | Platform Functions | string | MD5 hash of a string |

---

## N

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`NaN`](/ecmascript-builtins/global-values/#nan) | ECMAScript Builtins | number | ⚠️ Partial — comparisons correct; `String(NaN)` is lowercase `nan` |
| [`NotSentEvent.Retrieve(filter)`](/core-library/events/#not-sent-event) | Core Library | object[] | Not-sent events |
| [`Number.EPSILON`](/ecmascript-builtins/number-methods/#max_safe_integer) | ECMAScript Builtins | number | ❌ Missing (ES6) — `undefined`; use `2.220446049250313e-16` |
| [`Number.MAX_SAFE_INTEGER`](/ecmascript-builtins/number-methods/#max_safe_integer) | ECMAScript Builtins | number | ❌ Missing (ES6) — `undefined`; use `9007199254740991` |
| [`Number.MAX_VALUE`](/ecmascript-builtins/number-methods/#constants) | ECMAScript Builtins | number | ✅ Defined (ES3) — correct value |
| [`Number.MIN_SAFE_INTEGER`](/ecmascript-builtins/number-methods/#max_safe_integer) | ECMAScript Builtins | number | ❌ Missing (ES6) — `undefined`; use `-9007199254740991` |
| [`Number.MIN_VALUE`](/ecmascript-builtins/number-methods/#constants) | ECMAScript Builtins | number | ⚠️ Partial (ES3) — defined but **wrong** (reads back large negative); use the literal `5e-324` |
| [`Number.NaN`](/ecmascript-builtins/number-methods/#constants) | ECMAScript Builtins | number | ✅ Defined (ES3) — correct value |
| [`Number.NEGATIVE_INFINITY`](/ecmascript-builtins/number-methods/#constants) | ECMAScript Builtins | number | ⚠️ Partial (ES3) — defined but **sign swapped**; use `-Infinity` literal |
| [`Number.POSITIVE_INFINITY`](/ecmascript-builtins/number-methods/#constants) | ECMAScript Builtins | number | ⚠️ Partial (ES3) — defined but **sign swapped**; use `Infinity` literal |
| [`<NumberInstance>.toExponential([fractionDigits])`](/ecmascript-builtins/number-methods/#toexponential) | ECMAScript Builtins | string | ⚠️ Partial — no-arg form pads trailing zeros; always pass `fractionDigits` |
| [`<NumberInstance>.toFixed([fractionDigits])`](/ecmascript-builtins/number-methods/#tofixed) | ECMAScript Builtins | string | Fixed-point notation string |
| [`<NumberInstance>.toLocaleString()`](/ecmascript-builtins/internationalization/#tolocalestring-family) | ECMAScript Builtins | string | ⚠️ Differs — locale argument ignored; no grouping separators |
| [`<NumberInstance>.toPrecision([precision])`](/ecmascript-builtins/number-methods/#toprecision) | ECMAScript Builtins | string | Precision notation string |
| [`<NumberInstance>.toString([radix])`](/ecmascript-builtins/number-methods/#tostring) | ECMAScript Builtins | string | ⚠️ Partial — `radix` only supports 2, 8, 10, 16 |
| [`<NumberInstance>.valueOf()`](/ecmascript-builtins/number-methods/#valueof) | ECMAScript Builtins | number | Primitive number value |
| [`Now([useContextTime])`](/core-library/now/) | Core Library | Date | Bare-name Core form of Platform.Function.Now — current server date/time as a Date object |
| [`Platform.Function.Now([useContextTime])`](/platform-functions/now/) | Platform Functions | string | Current SFMC server date/time |

---

## O

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Object.assign(target, ...sources)`](/ecmascript-builtins/object-methods/#assign) | ECMAScript Builtins | object | ❌ Missing (ES6) — needs polyfill (static) |
| [`Object.create(proto[, propertiesObject])`](/ecmascript-builtins/object-methods/#create) | ECMAScript Builtins | object | ❌ Missing (ES5) — needs polyfill (static) |
| [`Object.defineProperties(obj, descriptors)`](/ecmascript-builtins/object-methods/#defineproperties) | ECMAScript Builtins | object | ❌ Missing (ES5) — call `Object.defineProperty` per property (static) |
| [`Object.defineProperty(obj, prop, descriptor)`](/ecmascript-builtins/object-methods/#defineproperty) | ECMAScript Builtins | object | Define or modify a property with a descriptor (static) |
| [`Object.entries(obj)`](/ecmascript-builtins/object-methods/#entries) | ECMAScript Builtins | array | ❌ Missing (ES6) — use `for...in` with `hasOwnProperty` (static) |
| [`Object.freeze(obj)`](/ecmascript-builtins/object-methods/#freeze) | ECMAScript Builtins | object | ❌ Missing (ES5) — cannot enforce immutability; read-only by convention (static) |
| [`Object.getOwnPropertyDescriptor(obj, prop)`](/ecmascript-builtins/object-methods/#getownpropertydescriptor) | ECMAScript Builtins | object | ❌ Missing (ES5) — read value directly + `hasOwnProperty` (static) |
| [`Object.getOwnPropertyNames(obj)`](/ecmascript-builtins/object-methods/#getownpropertynames) | ECMAScript Builtins | array | ❌ Missing (ES5) — `undefined`; use `for...in` with `hasOwnProperty` (static) |
| [`Object.getPrototypeOf(obj)`](/ecmascript-builtins/object-methods/#getprototypeof) | ECMAScript Builtins | object | Return the prototype of the given object (static) |
| [`Object.isExtensible(obj)`](/ecmascript-builtins/object-methods/#extensibility) | ECMAScript Builtins | boolean | ❌ Missing (ES5) — no runtime extensibility control (static) |
| [`Object.isFrozen(obj)`](/ecmascript-builtins/object-methods/#freeze) | ECMAScript Builtins | boolean | ❌ Missing (ES5) — immutability cannot be enforced (static) |
| [`Object.isSealed(obj)`](/ecmascript-builtins/object-methods/#extensibility) | ECMAScript Builtins | boolean | ❌ Missing (ES5) — no runtime extensibility control (static) |
| [`Object.keys(obj)`](/ecmascript-builtins/object-methods/#keys) | ECMAScript Builtins | array | ❌ Missing (ES5) — needs polyfill (static) |
| [`Object.preventExtensions(obj)`](/ecmascript-builtins/object-methods/#extensibility) | ECMAScript Builtins | object | ❌ Missing (ES5) — no runtime extensibility control (static) |
| [`Object.seal(obj)`](/ecmascript-builtins/object-methods/#extensibility) | ECMAScript Builtins | object | ❌ Missing (ES5) — no runtime extensibility control (static) |
| [`Object.values(obj)`](/ecmascript-builtins/object-methods/#values) | ECMAScript Builtins | array | ❌ Missing (ES6) — use `for...in` with `hasOwnProperty` (static) |
| [`<ObjectInstance>.hasOwnProperty(v)`](/ecmascript-builtins/object-methods/#hasownproperty) | ECMAScript Builtins | boolean | Test if object has own (non-inherited) property |
| [`<ObjectInstance>.isPrototypeOf(obj)`](/ecmascript-builtins/object-methods/#isprototypeof) | ECMAScript Builtins | boolean | ⚠️ Partial — present but **hangs the engine** when called; never call it |
| [`<ObjectInstance>.propertyIsEnumerable(prop)`](/ecmascript-builtins/object-methods/#propertyisenumerable) | ECMAScript Builtins | boolean | ⚠️ Partial — broken; always returns `false`; use `hasOwnProperty` |
| [`<ObjectInstance>.toString()`](/ecmascript-builtins/object-methods/#tostring) | ECMAScript Builtins | string | Default string representation (e.g. `[object Object]`) |
| [`<ObjectInstance>.valueOf()`](/ecmascript-builtins/object-methods/#valueof) | ECMAScript Builtins | object | Primitive value of the object |
| [`OpenEvent.Retrieve(filter)`](/core-library/events/#open-event) | Core Library | object[] | Open tracking events |

---

## P

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Promise(executor)`](/ecmascript-builtins/promises-iteration/#promise) | ECMAScript Builtins | — | ❌ Missing (ES6) — `new Promise()` throws; engine is synchronous |
| [`Proxy(target, handler)`](/ecmascript-builtins/reflection/#proxy) | ECMAScript Builtins | — | ❌ Missing (ES6) — `new Proxy()` throws; no trap-based interception |
| [`parseFloat(string)`](/ecmascript-builtins/number-methods/#parsefloat-global) | ECMAScript Builtins | number | ⚠️ Partial — `NaN` on trailing non-numeric characters |
| [`parseInt(string[, radix])`](/ecmascript-builtins/number-methods/#parseint-global) | ECMAScript Builtins | number | ⚠️ Partial — `NaN` on trailing non-numeric characters |
| [`Platform.Function.ParseJSON(jsonString)`](/platform-functions/parsejson/) | Platform Functions | object | Parse JSON string to object |
| [`Platform.Load(libraryName, version)`](/platform-objects/platform-load/) | Platform Object | void | Load Core library |
| [`Platform.Request.*`](/platform-objects/platform-request/) | Platform Object | various | HTTP request (query, POST, headers, cookies) |
| [`Platform.Response.*`](/platform-objects/platform-response/) | Platform Object | various | HTTP response (redirect, cookies, content type) |
| [`Platform.Variable.*`](/platform-objects/platform-variable/) | Platform Object | various | AMPscript variable bridge |
| [`Platform.Recipient.*`](/platform-objects/platform-recipient/) | Platform Object | various | Current-recipient attributes |
| [`Portfolio.Init(key)`](/core-library/portfolio/#init) | Core Library | PortfolioInstance | Initialize Portfolio |
| [`Portfolio.Add(properties)`](/core-library/portfolio/#add) | Core Library | string | Create portfolio asset |
| [`Portfolio.Retrieve([filter])`](/core-library/portfolio/#retrieve) | Core Library | object[] | Retrieve portfolio assets |
| [`<PortfolioInstance>.Update(properties)`](/core-library/portfolio/#instance-update) | Core Library | string | ❌ Update portfolio asset — no working runtime invocation |
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
| [`<QueryDefinitionInstance>.Perform(action)`](/core-library/querydefinition/#instance-perform) | Core Library | string | Run / manage query |

---

## R

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`RangeError([message])`](/ecmascript-builtins/error-types/#rangeerror) | ECMAScript Builtins | Error | ✅ Present — legacy `Error` subtype (shares base `Error` quirks) |
| [`ReferenceError([message])`](/ecmascript-builtins/error-types/#referenceerror) | ECMAScript Builtins | Error | ✅ Present — legacy `Error` subtype (shares base `Error` quirks) |
| [`Reflect`](/ecmascript-builtins/reflection/#reflect) | ECMAScript Builtins | — | ❌ Missing (ES6) — use ES5 `Object` methods and operators |
| [`Platform.Function.RaiseError(message[, currentRecipientOnly[, errorCode[, errorNumber]]])`](/platform-functions/raiseerror/) | Platform Functions | void | Halt execution with error |
| [`Platform.Function.RedirectTo(url)`](/platform-functions/redirectto/) | Platform Functions | void | Email href redirect helper |
| [`Redirect(url, movedPermanently)`](/core-library/redirect/) | Core Library | void | Redirect the browser |
| [`Platform.Response.Redirect(url[, movedPermanently])`](/platform-objects/platform-response/#redirect) | Platform Response | void | Redirect the browser — ends the script immediately |
| [`Platform.Response.RemoveCookie(name)`](/platform-objects/platform-response/#removecookie) | Platform Response | void | Remove a cookie |
| [`Platform.Response.RemoveResponseHeader(headerName)`](/platform-objects/platform-response/#removeresponseheader) | Platform Response | void | Remove a response header |
| [`Request.URL() / PagePath() / Method() / ApplicationID() / PackageID() / ApplicationBaseURL()`](/core-library/request/) | Core Library | string | Read request values via the Core Library utility methods. A **distinct** object from `Platform.Request`, not an alias — smaller method-only set. |
| [`Request.GetQueryStringParameter(name)`](/core-library/request/) | Core Library | string | Read a URL query parameter via the Core Library `Request` object |
| [`Request.GetFormField(name)`](/core-library/request/) | Core Library | string | Read a form field (POST or GET) via the Core Library `Request` object |
| [`<RegExpInstance>.exec(string)`](/ecmascript-builtins/regular-expressions/#exec) | ECMAScript Builtins | array | ⚠️ Partial — `lastIndex` does not advance; avoid the `g`-flag loop pattern |
| [`<RegExpInstance>.global`](/ecmascript-builtins/regular-expressions/#global) | ECMAScript Builtins | boolean | True if the `g` flag was set |
| [`re instanceof RegExp`](/ecmascript-builtins/regular-expressions/#instanceof) | ECMAScript Builtins | boolean | ⚠️ Partial — always `false`; use `re.constructor === RegExp` |
| [`<RegExpInstance>.ignoreCase`](/ecmascript-builtins/regular-expressions/#ignorecase) | ECMAScript Builtins | boolean | ❌ Missing — `undefined`; track the `i` flag yourself |
| [`<RegExpInstance>.lastIndex`](/ecmascript-builtins/regular-expressions/#lastindex) | ECMAScript Builtins | number | ⚠️ Partial — not updated by `exec`/`test` in SFMC |
| [`<RegExpInstance>.multiline`](/ecmascript-builtins/regular-expressions/#multiline) | ECMAScript Builtins | boolean | ❌ Missing — `undefined`; track the `m` flag yourself |
| [`<RegExpInstance>.source`](/ecmascript-builtins/regular-expressions/#source) | ECMAScript Builtins | string | The pattern text, excluding slashes and flags |
| [`<RegExpInstance>.test(string)`](/ecmascript-builtins/regular-expressions/#test) | ECMAScript Builtins | boolean | Test whether the string matches the pattern |

---

## S

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Set()`](/ecmascript-builtins/keyed-collections/#set) | ECMAScript Builtins | — | ❌ Missing (ES6) — `new Set()` throws; use a plain object keyed by member |
| [`SharedArrayBuffer(byteLength)`](/ecmascript-builtins/typed-arrays/#sharedarraybuffer) | ECMAScript Builtins | — | ❌ Missing (ES2017) — no shared binary buffers |
| [`SyntaxError([message])`](/ecmascript-builtins/error-types/#syntaxerror) | ECMAScript Builtins | Error | ✅ Present — legacy `Error` subtype (shares base `Error` quirks) |
| [`SuppressedError([error, suppressed[, message]])`](/ecmascript-builtins/error-types/#suppressederror) | ECMAScript Builtins | Error | ❌ Missing (ES2026) — use the base `Error` constructor |
| [`new Script.Util.HttpRequest(url)`](/http/script-util-httprequest/) | HTTP | HttpRequestInstance | Full HTTP request object |
| [`new Script.Util.HttpGet(url)`](/http/script-util-httpget/) | HTTP | HttpRequestInstance | HTTP GET shorthand |
| [`<HttpRequestInstance>.send()`](/http/script-util-httprequest/#send) | HTTP | object | Execute HTTP request |
| [`<HttpRequestInstance>.setHeader(name, value)`](/http/script-util-httprequest/#setheader) | HTTP | void | Set request header |
| [`<HttpRequestInstance>.clearHeaders()`](/http/script-util-httprequest/#clearheaders) | HTTP | void | Clear all custom headers |
| [`<HttpRequestInstance>.removeHeader(name)`](/http/script-util-httprequest/#removeheader) | HTTP | void | Remove one header |
| [`new Script.Util.WSProxy()`](/wsproxy/constructor/) | WSProxy | WSProxyInstance | Create WSProxy instance |
| [`Platform.Function.SetObjectProperty(apiObject, propertyName, value)`](/platform-functions/setobjectproperty/) | Platform Functions | void | Set SOAP object property (legacy) |
| [`String(value)`](/ecmascript-builtins/string-methods/#string-constructor) | ECMAScript Builtins | string | Convert any value (incl. CLR objects) to JS string |
| [`Stringify(value)`](/core-library/stringify/) | Core Library | string | Object to JSON string |
| [`Platform.Function.Stringify(object)`](/platform-functions/stringify/) | Platform Functions | string | Object to JSON string |
| [`Symbol([description])`](/ecmascript-builtins/symbol/) | ECMAScript Builtins | symbol | ❌ Missing (ES6) — no unique primitives or iterator protocol |
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
| [`Send.Definition.Add(esdParams, sendClassificationKey, emailKey, listIds)`](/core-library/senddefinition/#add) | Core Library | object | ⚠️ Create send definition — returns a CLR object, not `"OK"`; throws a plain string on failure |
| [`Send.Definition.AddWithDE(esdParams, sendClassificationKey, emailKey, sendableDataExtensionKey)`](/core-library/senddefinition/#addwithde) | Core Library | object | ⚠️ Create send def with DE — only works when the documented 5th argument is omitted |
| [`Send.Definition.AddWithFilterDefinition(esdParams, sendClassificationKey, emailKey, filterDefinitionKey, listId)`](/core-library/senddefinition/#addwithfilterdefinition) | Core Library | never | ❌ Create send def with filter — always throws "Error adding EmailSendDefinition." even when the record is created |
| [`Send.Definition.Retrieve([filter])`](/core-library/senddefinition/#retrieve) | Core Library | object[] | Retrieve send definitions |
| [`<SendDefinitionInstance>.Update(properties)`](/core-library/senddefinition/#instance-update) | Core Library | string | ⚠️ Update send definition — scalar properties only; nested properties throw "Error Updating ESD." |
| [`<SendDefinitionInstance>.Remove()`](/core-library/senddefinition/#instance-remove) | Core Library | string | Remove send definition |
| [`<SendDefinitionInstance>.Send()`](/core-library/senddefinition/#instance-send) | Core Library | string | ⚠️ Execute send definition — returns error text instead of throwing; compare against `"OK"` |
| [`<SendDefinitionInstance>.TestSend([emailAddress])`](/core-library/senddefinition/#instance-testsend) | Core Library | string | ❌ Test send — undocumented; no working runtime invocation |
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
| [`<StringInstance>.charAt(index)`](/ecmascript-builtins/string-methods/#charat) | ECMAScript Builtins | string | ⚠️ Partial — out-of-range index returns the last char, not `""` |
| [`<StringInstance>.charCodeAt(index)`](/ecmascript-builtins/string-methods/#charcodeat) | ECMAScript Builtins | number | Char code at index |
| [`<StringInstance>.codePointAt(pos)`](/ecmascript-builtins/string-methods/#codepointat) | ECMAScript Builtins | number | ❌ Missing (ES6) — needs polyfill |
| [`<StringInstance>.concat(string[, ...])`](/ecmascript-builtins/string-methods/#concat) | ECMAScript Builtins | string | Concatenate strings |
| [`<StringInstance>.endsWith(searchString[, endPosition])`](/ecmascript-builtins/string-methods/#endswith) | ECMAScript Builtins | boolean | ❌ Missing (ES6) — needs polyfill |
| [`<StringInstance>.includes(searchString[, position])`](/ecmascript-builtins/string-methods/#includes) | ECMAScript Builtins | boolean | ❌ Missing (ES6) — use `indexOf(...) !== -1` |
| [`<StringInstance>.indexOf(searchValue[, fromIndex])`](/ecmascript-builtins/string-methods/#indexof) | ECMAScript Builtins | number | First index of substring |
| [`<StringInstance>.lastIndexOf(searchValue[, fromIndex])`](/ecmascript-builtins/string-methods/#lastindexof) | ECMAScript Builtins | number | Last index of substring |
| [`<StringInstance>.length`](/ecmascript-builtins/string-methods/#length) | ECMAScript Builtins | number | String length |
| [`<StringInstance>.localeCompare(compareString)`](/ecmascript-builtins/string-methods/#localecompare) | ECMAScript Builtins | number | Compare two strings in sort order (-1, 0, or 1) |
| [`<StringInstance>.match(regexp)`](/ecmascript-builtins/string-methods/#match) | ECMAScript Builtins | array | ⚠️ Partial — returns `[]` (not `null`) on no match; no `.index` |
| [`<StringInstance>.padEnd(targetLength[, padString])`](/ecmascript-builtins/string-methods/#padend) | ECMAScript Builtins | string | ❌ Missing (ES2017) — needs polyfill |
| [`<StringInstance>.padStart(targetLength[, padString])`](/ecmascript-builtins/string-methods/#padstart) | ECMAScript Builtins | string | ❌ Missing (ES2017) — needs polyfill |
| [`<StringInstance>.repeat(count)`](/ecmascript-builtins/string-methods/#repeat) | ECMAScript Builtins | string | ❌ Missing (ES6) — needs polyfill |
| [`<StringInstance>.replace(searchValue, replaceValue)`](/ecmascript-builtins/string-methods/#replace) | ECMAScript Builtins | string | Replace substring |
| [`<StringInstance>.search(regexp)`](/ecmascript-builtins/string-methods/#search) | ECMAScript Builtins | number | ⚠️ Partial — returns `0` (not `-1`) on no match; unreliable; see Polyfills |
| [`<StringInstance>.slice(start[, end])`](/ecmascript-builtins/string-methods/#slice) | ECMAScript Builtins | string | Extract substring |
| [`<StringInstance>.split(separator[, limit])`](/ecmascript-builtins/string-methods/#split) | ECMAScript Builtins | array | ⚠️ Partial — empty-separator form does not split into chars; see Polyfills |
| [`<StringInstance>.startsWith(searchString[, position])`](/ecmascript-builtins/string-methods/#startswith) | ECMAScript Builtins | boolean | ❌ Missing (ES6) — use `indexOf(...) === 0` |
| [`<StringInstance>.substr(start[, length])`](/ecmascript-builtins/string-methods/#substr) | ECMAScript Builtins | string | ❌ Missing — throws at runtime; use `substring`/`slice` or polyfill |
| [`<StringInstance>.substring(start[, end])`](/ecmascript-builtins/string-methods/#substring) | ECMAScript Builtins | string | Substring by range |
| [`<StringInstance>.toLocaleLowerCase()`](/ecmascript-builtins/string-methods/#tolocalelowercase) | ECMAScript Builtins | string | Lower case using host locale mappings |
| [`<StringInstance>.toLocaleUpperCase()`](/ecmascript-builtins/internationalization/#tolocalestring-family) | ECMAScript Builtins | string | Upper case; locale argument ignored (plain upper-casing) |
| [`<StringInstance>.toLowerCase()`](/ecmascript-builtins/string-methods/#tolowercase) | ECMAScript Builtins | string | Convert to lower case |
| [`<StringInstance>.toUpperCase()`](/ecmascript-builtins/string-methods/#touppercase) | ECMAScript Builtins | string | Convert to upper case |
| [`<StringInstance>.trim()`](/ecmascript-builtins/string-methods/#trim) | ECMAScript Builtins | string | ❌ Missing (ES5) — use `Platform.Function.Trim` or a polyfill |
| [`<StringInstance>.trimEnd()`](/ecmascript-builtins/string-methods/#trimend) | ECMAScript Builtins | string | ❌ Missing (ES2019) — needs polyfill |
| [`<StringInstance>.trimStart()`](/ecmascript-builtins/string-methods/#trimstart) | ECMAScript Builtins | string | ❌ Missing (ES2019) — needs polyfill |
| [`SurveyEvent.Retrieve(filter)`](/core-library/events/#survey-event) | Core Library | object[] | Survey events |
| [`Platform.Function.SystemDateToLocalDate(dateString)`](/platform-functions/systemdatetolocaldate/) | Platform Functions | string | System time (CST) to local account/user time |
| [`Platform.Response.SetResponseHeader(headerName, value)`](/platform-objects/platform-response/#setresponseheader) | Platform Response | void | Set a response header |
| [`Platform.Response.SetCookie(name, value [, expires [, secure]])`](/platform-objects/platform-response/#setcookie) | Platform Response | void | Set a response cookie |

---

## T

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`TypeError([message])`](/ecmascript-builtins/error-types/#typeerror) | ECMAScript Builtins | Error | ✅ Present — legacy `Error` subtype (shares base `Error` quirks) |
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
| [`undefined`](/ecmascript-builtins/global-values/#undefined) | ECMAScript Builtins | undefined | The primitive `undefined` value — works as expected |
| [`URIError([message])`](/ecmascript-builtins/error-types/#urierror) | ECMAScript Builtins | Error | ✅ Present — legacy `Error` subtype (shares base `Error` quirks) |
| [`Uint8Array` / `Uint8ClampedArray` / `Uint16Array` / `Uint32Array`](/ecmascript-builtins/typed-arrays/#uint8array) | ECMAScript Builtins | — | ❌ Missing (ES6) — no typed arrays |
| [`unescape(str)`](/ecmascript-builtins/global-functions/#unescape) | ECMAScript Builtins | string | ❌ Missing — `undefined`; use `decodeURIComponent` |
| [`UnsubEvent.Retrieve(filter)`](/core-library/events/#unsub-event) | Core Library | object[] | Unsubscribe events |
| [`Platform.Function.UpdateData(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)`](/platform-functions/updatedata/) | Platform Functions | number | Update DE rows |
| [`UpdateDE(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)`](/platform-functions/updatede/) | Platform Functions | null | Same update as UpdateData, but returns null |
| [`Platform.Function.UrlEncode(url[, encodeReservedKeywords])`](/platform-functions/urlencode/) | Platform Functions | string | Percent-encode a full URL |
| [`Platform.Function.UpsertData(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)`](/platform-functions/upsertdata/) | Platform Functions | number | Insert or update DE row |
| [`UpsertDE(deName, whereFieldNames, whereFieldValues, fieldNames, fieldValues)`](/platform-functions/upsertde/) | Platform Functions | null | Same upsert as UpsertData, but returns null |

---

## V

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`Variable.GetValue(variableName)`](/core-library/variable/) | Core Library | string | Read AMPscript variable |
| [`Variable.SetValue(variableName, value)`](/core-library/variable/) | Core Library | void | Write AMPscript variable |
| [`Platform.Variable.GetValue(name)`](/platform-objects/platform-variable/) | Platform Variable | string | Reads the value of an AMPscript variable |
| [`Platform.Variable.SetValue(name, value)`](/platform-objects/platform-variable/#setvalue) | Platform Variable | void | Writes a value to an AMPscript variable |

---

## W

| Name | Category | Returns | Description |
|------|----------|---------|-------------|
| [`WeakMap()` / `WeakSet()`](/ecmascript-builtins/keyed-collections/#weakmap) | ECMAScript Builtins | — | ❌ Missing (ES6) — no weak-reference collections |
| [`WeakRef(target)`](/ecmascript-builtins/memory-management/#weakref) | ECMAScript Builtins | — | ❌ Missing (ES2021) — no weak references |
| [`Write(content)`](/core-library/write/) | Core Library | void | Output to page |
| [`Platform.Response.Write(content)`](/platform-objects/platform-response/#write) | Platform Response | void | Write content to the HTTP response output |

---

All Core Library namespaces — including `AccountUser`, `Portfolio`, `Folder`, `DeliveryProfile`, `SenderProfile`, `SendClassification`, `FilterDefinition`, and `DataExtension.Fields` — are indexed in the A–Z sections above. See the [Core Library](/core-library/) section for full documentation.
