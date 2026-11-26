---
layout: page
title: Where SSJS and JavaScript Can Be Saved
parent: Recipes
parent_url: /recipes/
description: Which Content Builder, CloudPages and script activity types keep server-side JavaScript and a client-side script tag when you save them, by REST API and in the editor.
---

You save an email, a content block, a CloudPage or a script activity and Marketing Cloud Engagement says the save worked. That does not mean all of your code is still in it. This page shows which types store SSJS and client-side JavaScript as you wrote it.

The full results, including the AMPscript forms, the test method and the legend, are on sfmc.guide: [Where AMPscript, SSJS and JavaScript Can Be Saved](https://sfmc.guide/engagement/code-persistence/). All results come from a live test on one Engagement business unit in November 2026. They show only what gets stored, not whether the code runs at send or publish time, except the script activity run described below.

## In short

- **SSJS survives everywhere.** `<script runat="server">` stayed unchanged in every type tested, both by API and in every code editor.
- **A client-side `<script>` is dropped from emails, content blocks and templates.** The tag and its content are cut out on save. The save still reports success, with no error and no warning.
- **Script activities take SSJS, not AMPscript.** Automation Studio refuses AMPscript on save, but SSJS and a client-side `<script>` are saved. To run AMPscript from a script activity, see [below](#running-ampscript-from-a-script-activity).
- **Landing pages keep both.** Put browser-side JavaScript in a CloudPages landing page.
- **CloudPages code resources depend on how you save.** The CloudPages editor keeps a client-side `<script>`. The REST API removes the same text, so a deployment tool that saves by API loses it.
- **Rich text turns tags into text.** Typing a script tag into the Content tab of a free form block or text block stores it escaped (`&lt;script…`), so it never runs. Use the block's HTML Editor tab instead.

## Results per type

The two snippets tested were:

- **SSJS:** `<script runat="server">Platform.Load("core","1");Write("S1");</script>`
- **Client-side JavaScript:** `<script>console.log("J1");</script>`

<span class="status-chip status-chip--yes">kept</span> = stored unchanged · <span class="status-chip status-chip--no">removed</span> = stored without the snippet, but the save reported success · <span class="status-chip status-chip--no">rejected</span> = the save was refused with an error · <span class="status-chip status-chip--partial">escaped</span> = stored as plain text (`&lt;` instead of `<`). A single result means saving by API and in the editor behaved the same.

| Type | Editor | SSJS | Client-side `<script>` |
|---|---|---|---|
| HTML email | Code view | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--no">removed</span> |
| Template-based email | HTML block in a slot | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--no">removed</span> |
| Text-only email | Text editor | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--no">removed</span> |
| HTML block | Code editor | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--no">removed</span> |
| Code snippet | Code editor | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--no">removed</span> |
| Free form block | HTML Editor tab | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--no">removed</span> |
| Free form block | Content tab (rich text, typed) | <span class="status-chip-channel">API</span> <span class="status-chip status-chip--yes">kept</span> <span class="status-chip-channel">Editor</span> <span class="status-chip status-chip--partial">escaped</span> | <span class="status-chip-channel">API</span> <span class="status-chip status-chip--no">removed</span> <span class="status-chip-channel">Editor</span> <span class="status-chip status-chip--partial">escaped</span> |
| Text block | HTML Editor tab | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--no">removed</span> |
| Text block | Content tab (rich text, typed) | <span class="status-chip-channel">API</span> <span class="status-chip status-chip--yes">kept</span> <span class="status-chip-channel">Editor</span> <span class="status-chip status-chip--partial">escaped</span> | <span class="status-chip-channel">API</span> <span class="status-chip status-chip--no">removed</span> <span class="status-chip-channel">Editor</span> <span class="status-chip status-chip--partial">escaped</span> |
| Email template | Code editor (Paste HTML) | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--no">removed</span> |
| CloudPages landing page | Code View | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--yes">kept</span> |
| CloudPages code resource (JavaScript, CSS, JSON, text, XML, RSS) | Code resource editor | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip-channel">API</span> <span class="status-chip status-chip--no">removed</span> <span class="status-chip-channel">Editor</span> <span class="status-chip status-chip--yes">kept</span> |
| Automation Studio script activity | Script activity editor | <span class="status-chip status-chip--yes">kept</span> | <span class="status-chip status-chip--yes">kept</span> |

A script activity refuses all three AMPscript forms when it is saved, by API and in the editor.

## Running AMPscript from a script activity

The save check of a script activity rejects AMPscript, even inside an SSJS string: `Platform.Function.TreatAsContent('%%[ SET @a1 = "A1-RAN" ]%%')` written like this is refused. In a test run, AMPscript still ran when SSJS built the delimiters at run time:

```js
var P = "%" + "%";
var open = "<scr" + "ipt runat=\"server\" language=\"amp" + "script\">";
var close = "</scr" + "ipt>";
```

These statements ran in the script activity:

| Statement | Result |
|---|---|
| `Platform.Function.TreatAsContent(P + '[ SET @a1 = "A1-RAN" ]' + P + P + '=v(@a1)=' + P)` | returned `A1-RAN` |
| `Variable.GetValue("@a1")` (after the call above) | returned `A1-RAN` |
| `Platform.Function.TreatAsContent(P + '=Concat("A2", "-RAN")=' + P)` | returned `A2-RAN` |
| `Platform.Function.TreatAsContent(P + '="A2-RAN"=' + P)` | threw an error: an inline `%%= =%%` expression needs a function call, not a bare string |
| `Platform.Function.TreatAsContent(open + 'SET @a3 = "A3-RAN"' + close + P + '=v(@a3)=' + P)` | returned `A3-RAN` |
| `Platform.Function.ContentBlockByKey("cpp-exec-block")`, an HTML block holding `%%[ SET @cb = "CB-RAN" ]%%%%=v(@cb)=%%` | returned `CB-RAN` |
| `Variable.GetValue("@cb")` (after the call above) | returned `CB-RAN` |

Keeping the AMPscript in a content block and loading it with [`ContentBlockByKey`](/platform-functions/contentblockbykey/) needs no workaround. See also [`TreatAsContent`](/platform-functions/treatascontent/).

## Send contexts: use AMPscript, not SSJS

Sender profiles, the subject, preheader, CC and BCC of an email send, and the title, message and custom keys of push and SMS messages are filled in per recipient when the message goes out, and you can use AMPscript in them; this part was not tested. Salesforce's [SSJS overview](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_serverSideJavaScript.html) advises AMPscript or the SSJS Platform functions for email messages and the SSJS Core library only for landing pages and applications. In Journey Builder, send activities generally take AMPscript in their message fields; other activity types don't. More examples are on [sfmc.guide](https://sfmc.guide/engagement/code-persistence/#ampscript-in-send-contexts).

## See Also

<div class="see-also">
<h4>See Also</h4>
<ul>
  <li><a href="/getting-started/what-is-ssjs/">What is SSJS?</a></li>
  <li><a href="/recipes/cloud-page-apps/">CloudPage Apps</a></li>
  <li><a href="/recipes/ampscript-bridge/">AMPscript Bridge</a></li>
  <li><a href="https://sfmc.guide/engagement/code-persistence/" target="_blank" rel="noopener">Where AMPscript, SSJS and JavaScript Can Be Saved (sfmc.guide)</a></li>
</ul>
</div>
