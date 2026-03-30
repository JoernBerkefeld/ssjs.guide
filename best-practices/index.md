---
layout: category
title: Best Practices
description: SSJS best practices for debugging, performance, security, coding style, defensive programming, and error logging.
nav_order: 10
has_children: true
---

Writing robust SSJS requires understanding both the capabilities and the sharp edges of the SFMC platform. This section consolidates practical guidance from community experts and real-world SFMC implementations.

## In This Section

| Page | Description |
|------|-------------|
| [Debugging](/best-practices/debugging/) | Techniques for debugging SSJS in all execution contexts |
| [Performance](/best-practices/performance/) | Minimize page load times and avoid timeouts |
| [Security](/best-practices/security/) | Protect against injection, CSRF, and data exposure |
| [Style Guide](/best-practices/style-guide/) | Consistent, readable SSJS code conventions |
| [Defensive Coding](/best-practices/defensive-coding/) | Guard against null values, empty strings, and unexpected inputs |
| [Error Logging](/best-practices/error-logging/) | Capture and persist errors for debugging and monitoring |

---

## Top 10 SSJS Rules

1. **Always `Platform.Load("core", "1.1.5")` first** — before any Core library usage
2. **Read `GetPostData()` once** — store in a variable immediately, it returns `""` on second call
3. **Use `+ ""` before `ParseJSON()`** — `ParseJSON(str + "")` not `ParseJSON(str)` to avoid 500 errors
4. **Never trust user input** — validate and sanitize all query params, POST fields, and cookies
5. **Use `var` everywhere** — `let`, `const`, arrow functions, and template literals all throw runtime errors
6. **Add filter to `de.Rows.Retrieve()` on CloudPages** — it returns empty without a filter
7. **Handle the `switch default` bug** — test your `switch` statements, use `if`/`else` as fallback
8. **Log errors to a DE** — don't rely on SFMC's native error pages for debugging
9. **Set content type explicitly** — always call `Platform.Response.SetContentType("application/json")` for API responses
10. **Use WSProxy over CreateObject/Invoke** — WSProxy is simpler and more maintainable
