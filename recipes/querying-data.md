---
layout: page
title: Querying Data Extensions
parent: Recipes
parent_url: /recipes/
description: Read rows from a Data Extension with a filter — Lookup, LookupRows, LookupOrderedRows, Rows.Lookup, Rows.Retrieve and WSProxy side by side, with a SQL-to-filter cheat sheet.
claims_verified: true
test_scripts: complete
---

SSJS has six ways to read a Data Extension, and none of them looks like the SQL you write in an Automation Studio query. This page puts them side by side and shows how a SQL `WHERE` clause turns into each method's filter.

Every example on this page reads the same small `Customers` Data Extension (Name and external key are both `Customers`):

| SubscriberKey | Email | FirstName | Country | Tier | Points | SignupDate | IsActive |
|---|---|---|---|---|---|---|---|
| C001 | anna@example.com | Anna | DE | Gold | 1200 | 2023-02-01 | true |
| C002 | ben@example.com | Ben | US | Silver | 300 | 2024-05-10 | true |
| C003 | carla@example.org | Carla | ES | Gold | 950 | 2024-07-20 | false |
| C004 | dirk@example.com | Dirk | DE | Bronze | 40 | 2025-01-05 | true |
| C005 | eva@example.com | Eva | DE | Gold | 2100 | 2025-03-15 | true |
| C006 | finn@example.net | Finn | US | Bronze | 0 | 2025-09-30 | false |
| C007 | gus@example.de | Gus | FR | *(empty)* | 10 | 2026-01-10 | false |

`LastName` is a ninth column (Becker, Clark, Diaz, …). Each "Show test script" block creates this Data Extension, runs the example above it unchanged, checks the result and deletes the Data Extension again.

## Which method should I use?

| Method | Returns | Filter | Sort / limit | No match | Values |
|---|---|---|---|---|---|
| [`Platform.Function.Lookup`](/platform-functions/lookup/) | one value | equals, several columns joined with AND | — | `null` | typed; Date is a `Date` |
| [`Platform.Function.LookupRows`](/platform-functions/lookuprows/) | rows | equals, AND | — (up to 2,000 rows) | `null` | typed; Date is an ISO string |
| [`Platform.Function.LookupOrderedRows`](/platform-functions/lookuporderedrows/) | rows | equals, AND | count + `"Column ASC/DESC"` | `null` | typed; Date is an ISO string |
| [`<DataExtensionInstance>.Rows.Lookup`](/core-library/dataextension-rows/#instance-rows-lookup) | rows | equals, AND | limit + order field | `null` | typed; Date is an ISO string |
| [`<DataExtensionInstance>.Rows.Retrieve`](/core-library/dataextension-rows/#instance-rows-retrieve) | rows | filter object (operators in the SQL table below), AND / OR | — | empty collection | all strings |
| [`<WSProxyInstance>.retrieve`](/wsproxy/retrieve/) | rows as `{ Name, Value }` lists | filter object (operators in the SQL table below), AND / OR | pages of up to 2,500 rows | empty `Results` | all strings; you pick the columns |

Rules of thumb:

- **Exact match on one or more columns** → the `Lookup` family. It is the shortest code and returns typed values.
- **Anything other than "equals", or an OR** → a filter object with `Rows.Retrieve` or WSProxy.
- **Only some columns, very many rows, or paging** → WSProxy.
- The `Platform.Function.Lookup*` functions find the Data Extension by its **Name**; WSProxy and `DataExtension.Init` need its **external key**. Keeping Name and external key identical avoids surprises.

```javascript
Platform.Load("core", "1.1.5");
var customers = DataExtension.Init("Customers");
var proxy = new Script.Util.WSProxy();

// The same miss ("XX" matches no row) through every method
var a = Platform.Function.Lookup("Customers", "FirstName", "Country", "XX");
var b = Platform.Function.LookupRows("Customers", "Country", "XX");
var c = Platform.Function.LookupOrderedRows("Customers", 0, "Points DESC", "Country", "XX");
var d = customers.Rows.Lookup(["Country"], ["XX"]);
var e = customers.Rows.Retrieve({ Property: "Country", SimpleOperator: "equals", Value: "XX" });
var f = proxy.retrieve("DataExtensionObject[Customers]", ["SubscriberKey"],
    { Property: "Country", SimpleOperator: "equals", Value: "XX" });
// a, b, c and d are null; e.length and f.Results.length are 0

// The same Number column through a typed and a string-returning method
var typed = Platform.Function.LookupRows("Customers", "SubscriberKey", "C001")[0].Points;
var text = customers.Rows.Retrieve({ Property: "SubscriberKey", SimpleOperator: "equals", Value: "C001" })[0].Points;
// typed is the number 1200, text is the string "1200"
```

{% include test-script.html bundle="recipes--querying-data" chapter="which-method" %}

## From SQL WHERE to an SSJS filter

`Rows.Retrieve` and WSProxy take the same filter object; every row of the table below was tested with both. A single condition is a `SimpleFilterPart`; two conditions are joined by a `ComplexFilterPart`, and more conditions are built by nesting one `ComplexFilterPart` inside another. Seven nested conditions were tested and every one was applied.

| SQL | `SimpleOperator` | `Value` |
|---|---|---|
| `Tier = 'Gold'` | `equals` | `"Gold"` |
| `Country <> 'US'` | `notEquals` | `"US"` |
| `Points > 1200` | `greaterThan` | `"1200"` |
| `Points >= 1200` | `greaterThanOrEqual` | `"1200"` |
| `Points < 300` | `lessThan` | `"300"` |
| `Points <= 300` | `lessThanOrEqual` | `"300"` |
| `Email LIKE '%example.com%'` | `like` | `"example.com"` (matches anywhere, see below) |
| `Country IN ('DE', 'ES')` | `IN` | `["DE", "ES"]` |
| `Points BETWEEN 100 AND 1000` | `between` | `["100", "1000"]` |
| `Tier IS NULL` | `isNull` | `""` (the `Value` member is still required) |
| `Tier IS NOT NULL` | `isNotNull` | `""` |
| `SignupDate > '2024-12-31'` | `greaterThan` | `"2024-12-31"` |
| `IsActive = 1` | `equals` | `"true"` |
| `a AND b` / `a OR b` | `ComplexFilterPart` with `LogicalOperator: "AND"` / `"OR"` | — |

`like` always matches anywhere in the value: it adds a `%` at both ends of the pattern, as the SOAP reference describes. `'abc%'`, `'%abc'` and `'abc'` all behave like `'%abc%'`, so "starts with" and "ends with" can't be expressed in a filter; check those in your script after the retrieve. `_` (any single character) and `[%]` (a literal percent sign) work as in SQL.

An unsupported operator (for example `existsInString`) does not throw in WSProxy: the result's `Status` carries the error text, so check `Status` before reading `Results`.

```javascript
// SQL:  WHERE Country IN ('DE', 'ES') AND Points >= 500
var filter = {
    LeftOperand: { Property: "Country", SimpleOperator: "IN", Value: ["DE", "ES"] },
    LogicalOperator: "AND",
    RightOperand: { Property: "Points", SimpleOperator: "greaterThanOrEqual", Value: "500" }
};

var proxy = new Script.Util.WSProxy();
var result = proxy.retrieve("DataExtensionObject[Customers]", ["SubscriberKey", "Points"], filter);
// result.Results holds the rows C001, C003 and C005
```

{% include test-script.html bundle="recipes--querying-data" chapter="sql-to-filter" %}

## One value: Lookup

`Lookup` returns the value of one column from the first matching row. Pass arrays to filter on several columns at once (AND).

```javascript
var firstName = Platform.Function.Lookup("Customers", "FirstName", "Email", "eva@example.com");
var points = Platform.Function.Lookup("Customers", "Points", ["Country", "Tier"], ["US", "Silver"]);
var missing = Platform.Function.Lookup("Customers", "FirstName", "Email", "nobody@example.com");

if (missing === null) {
    // no row matched
}
```

When the matched row's column is empty, `Lookup` returns a value that is neither `null` nor safe to compare — see [Lookup](/platform-functions/lookup/) before testing an optional column.

{% include test-script.html bundle="recipes--querying-data" chapter="lookup" %}

## All matching rows: LookupRows

`LookupRows` returns every row that matches all given columns. It returns `null` — not an empty array — when nothing matches.

```javascript
var rows = Platform.Function.LookupRows("Customers", ["Country", "Tier"], ["DE", "Gold"]);
var count = rows === null ? 0 : rows.length;   // null, not [], when nothing matches

for (var i = 0; i < count; i++) {
    var name = rows[i].FirstName;
    var points = rows[i].Points;   // a number
}
```

{% include test-script.html bundle="recipes--querying-data" chapter="lookuprows" %}

## Sorted and limited: LookupOrderedRows

`LookupOrderedRows` adds a row count and a sort expression. Several sort columns are separated by commas; a count of `0` returns every match (up to 2,000 rows).

```javascript
// The three German customers with the most points
var top3 = Platform.Function.LookupOrderedRows("Customers", 3, "Points DESC", "Country", "DE");

// All active customers, sorted by tier, then by points (count 0 = no limit)
var active = Platform.Function.LookupOrderedRows("Customers", 0, "Tier ASC, Points DESC", "IsActive", "true");
```

{% include test-script.html bundle="recipes--querying-data" chapter="lookuporderedrows" %}

## Core library: Rows.Lookup

`Rows.Lookup` is the Core library counterpart of `LookupOrderedRows`: equality filters joined with AND, plus an optional limit and order field. The order field sorts ascending and also accepts a `DESC` suffix.

```javascript
Platform.Load("core", "1.1.5");
var customers = DataExtension.Init("Customers");   // external key

// The two German customers with the most points
var topTwo = customers.Rows.Lookup(["Country"], ["DE"], 2, "Points DESC");

// Several columns, joined with AND
var activeGermans = customers.Rows.Lookup(["Country", "IsActive"], ["DE", true]);
```

{% include test-script.html bundle="recipes--querying-data" chapter="rows-lookup" %}

## Core library: Rows.Retrieve

`Rows.Retrieve` accepts the filter objects from the SQL table above, including OR. Every value comes back as a string, and no match gives an empty collection instead of `null`.

```javascript
Platform.Load("core", "1.1.5");
var customers = DataExtension.Init("Customers");

var goldOrSilver = customers.Rows.Retrieve({
    LeftOperand: { Property: "Tier", SimpleOperator: "equals", Value: "Gold" },
    LogicalOperator: "OR",
    RightOperand: { Property: "Tier", SimpleOperator: "equals", Value: "Silver" }
});

// Every value comes back as a string: "1200", not 1200
var total = 0;
for (var i = 0; i < goldOrSilver.length; i++) {
    total += Number(goldOrSilver[i].Points);
}
```

{% include test-script.html bundle="recipes--querying-data" chapter="rows-retrieve" %}

## WSProxy: choose columns, combine many conditions

WSProxy returns only the columns you ask for, takes the same filter objects, and pages large results. Each row arrives as a list of `{ Name, Value }` pairs, so convert it to a plain object first. Every requested column comes back, in the order you list them (see [retrieve](/wsproxy/retrieve/#retrieve-many-columns-from-a-de)). For more than one page of rows, see [Paginated Retrieval](/recipes/wsproxy-patterns/#paginated-retrieval-of-all-records).

```javascript
var proxy = new Script.Util.WSProxy();
var columns = ["SubscriberKey", "Email", "FirstName", "LastName", "Country", "Tier", "Points", "SignupDate", "IsActive"];

// SQL: WHERE Country = 'DE' AND Points >= 100 AND IsActive = 1 AND SignupDate > '2022-12-31'
var filter = {
    LeftOperand: {
        LeftOperand: { Property: "Country", SimpleOperator: "equals", Value: "DE" },
        LogicalOperator: "AND",
        RightOperand: { Property: "Points", SimpleOperator: "greaterThanOrEqual", Value: "100" }
    },
    LogicalOperator: "AND",
    RightOperand: {
        LeftOperand: { Property: "IsActive", SimpleOperator: "equals", Value: "true" },
        LogicalOperator: "AND",
        RightOperand: { Property: "SignupDate", SimpleOperator: "greaterThan", Value: "2022-12-31" }
    }
};
var result = proxy.retrieve("DataExtensionObject[Customers]", columns, filter);

// Each result row is a list of { Name, Value } pairs; turn it into a plain object
var rows = [];
for (var i = 0; i < result.Results.length; i++) {
    var props = result.Results[i].Properties;
    var row = {};
    for (var j = 0; j < props.length; j++) {
        row[props[j].Name] = props[j].Value;
    }
    rows.push(row);
}
// rows[0].FirstName, rows[0].Points (a string), ...
```

{% include test-script.html bundle="recipes--querying-data" chapter="wsproxy" %}

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/platform-functions/lookup/">Lookup</a></li>
  <li><a href="/platform-functions/lookuprows/">LookupRows</a></li>
  <li><a href="/platform-functions/lookuporderedrows/">LookupOrderedRows</a></li>
  <li><a href="/core-library/dataextension-rows/">DataExtension.Rows</a></li>
  <li><a href="/wsproxy/retrieve/">proxy.retrieve</a></li>
  <li><a href="/recipes/de-crud-patterns/">DE CRUD Patterns</a></li>
  <li><a href="/recipes/wsproxy-patterns/">WSProxy Patterns</a></li>
  <li><a href="https://sfmc.guide/engagement/querying-data/" target="_blank" rel="noopener">Querying Data Extensions with AMPscript (sfmc.guide)</a></li>
</ul>
</div>
