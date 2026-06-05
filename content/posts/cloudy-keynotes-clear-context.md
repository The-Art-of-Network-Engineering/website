---
title: "Cloudy Keynotes, Clear Context"
slug: "cloudy-keynotes-clear-context"
publishedAt: "2025-11-19"
excerpt: "Public cloud is amazing. It's also not magic. Resiliency myths, public speaking wins, and why MCP matters for NetOps."
author: "Andy Lapteff"
---

## Cloudy Keynotes, Clear Context

**Resiliency myths, public speaking wins, and why MCP matters for NetOps**

Public cloud is amazing. It's also not magic.

When US-East-1 hiccups, the internet feels it. And if you've ever spent a night on a data center floor or shipped a change at 2 a.m., you know outages are brutal; on-prem or in the cloud. In this episode, [William Collins](https://www.linkedin.com/in/william-collins?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAWCImsBbfMoCwJ06GIzQZUPVMwr_oNnpWk) and [Andy Lapteff](https://www.linkedin.com/in/andylapteff?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAWhkuoBrY1LzNEa6Ppg4bCALAGUXvNa37c) broke down three things every builder should keep in their toolkit: how to think about cloud resiliency, how to use public speaking to accelerate your career, and how Model Context Protocol (MCP) can turn LLM hype into real NetOps workflows.

---

### 1) Cloud ≠ resiliency by default

There's a persistent myth that moving to cloud automatically buys you uptime. In reality, cloud gives you **the potential** for resiliency if you architect for it.

**Key takeaways**

- **Blast radius is real.** Some global/legacy control-plane dependencies still pass through heavily used regions. When those regions wobble, the effects look global even if your workloads aren't there.
- **Hidden dependencies bite.** Teams swear they're "multi-region," then discover a quiet API call that still phones home to US-East-1.
- **Resiliency is engineered, not procured.** You don't buy four nines; you design toward them and maintain them.
- **Active/active vs. DR is a budget decision.** Active/active improves RTO/RPO, but it can double (or triple) your bill. DR is cheaper, but slower to recover.
- **Compound SLAs matter.** Your real uptime is the product of multiple SLAs: DNS, database, queueing, Direct Connect, auth, etc. Do the math.

**If you're starting fresh**

- Treat "single region" as an exception, not a default.
- Inventory your control-plane and data-plane dependencies; look for "US-East-1 by default" assumptions in SDKs, pipelines, and vendor tools.
- Run failure-mode game days: kill region-scoped control plane access; watch what still works.
- Decide, consciously, where you need active/active vs. DR. Tie the choice to business impact, not hope.

> "You don't buy resiliency. You build it, and then you keep building it."

---

### 2) Public speaking will level up your engineering career

You don't need to be the world's foremost expert to get on stage. You need a useful story and one or two clear takeaways. Speaking forces clarity. Clarity earns trust. Trust moves careers.

**What's worked for us**

- **Lead with story, not slide dumps.** The brain remembers narratives, not catalogs. Open with a moment, a tension, a decision.
- **One or two big ideas.** If they remember just a single sentence on the drive home, what should it be?
- **Don't live-demo your fate.** If the venue Wi-Fi dies, your demo dies. Record a short screencast as backup, or design a "demo via screenshots" flow you can narrate.
- **Q&A is gold.** The questions expose what landed, and what didn't. Capture them. They're your roadmap for the next talk.
- **Understand, don't memorize.** If nerves make you drop a line, deep understanding lets you improvise back to your message.

**How to start**

- Turn a blog post into a 10-minute lightning talk at a local meetup.
- Submit a CFP with a strong "so what" and one story that proves it.
- Practice out loud. Time it. Trim jargon. Replace bullets with diagrams.
- Afterward, write the "one-page takeaway" and share it with the audience.

> "Do hard things. Confidence compounds. So does clarity."

---

### 3) MCP – what it is and why NetOps should care

If LLMs are going to help with real operational work, they need standardized, safe access to tools and data. That's what Model Context Protocol (MCP) gives you.

The short version: Before MCP, every AI integration looked like bespoke glue; one-off API wiring between your model, your tools, and your data. MCP standardizes that integration layer so an LLM client can reliably discover and use capabilities exposed by many different tools (think: NetBox, ticketing, search, config engines, reporting) without reinventing the wheel each time.

**Why that matters in NetOps**

- **Fewer snowflake integrations.** If a vendor exposes an MCP server, your AI host knows how to talk to it.
- **Richer workflows.** A model can chain multiple tools: gather router facts → correlate with inventory → update ServiceNow → format an executive email.
- **Separation of concerns.** Keep private data/tools in your environment; grant just the capabilities the AI needs through MCP.
- **Deterministic guardrails.** You choose which tools are exposed and how they're described. The model gets context it can use.

A practical example: From a chat window, you ask:

> "Audit BGP session health on these 20 routers, summarize deltas from last week, attach the diff to INC-12345, and email the exec summary."

Behind the scenes, the AI uses MCP-exposed tools to:

1. Fetch device lists from inventory,
2. Run read-only checks,
3. Generate a report via your saved template,
4. Update the ticket,
5. Send a formatted summary.

No custom point-to-point glue. No data copy-paste sprawl. Standard parts, standard contract.

---

### The meta-lesson: size ⇒ complexity; progress ⇒ discomfort

Hyperscalers aren't infallible; neither are we. Scale breeds complexity. The answer isn't finger-pointing, it's designing for failure, communicating clearly, and standardizing the way we connect intelligence to action.

**Top Tips:**

- Architect with blast radius in mind.
- Tell better stories about the systems you build.
- Learn the new plumbing (like MCP) that turns AI from chatty helper into an operational teammate.

---

### Join the community, grab the merch, stay in the loop

If you don't have a community, get one. Ours is **It's All About the Journey** on Discord, free, supportive, and packed with study groups, happy hours, and folks at every stage (from "just heard about networking" to triple-CCIE). We also finally refreshed the **AONE merch**: pint glass, water bottles, polos, the works.

- Audio episode: [https://www.buzzsprout.com/2127872/episodes/18182456](https://www.buzzsprout.com/2127872/episodes/18182456)
- Video episode: [https://youtu.be/ounVThWV3mw](https://youtu.be/ounVThWV3mw)
- All links: [linktree.com/artofneteng](http://linktree.com/artofneteng)
- YouTube: [youtube.com/artofneteng](http://youtube.com/artofneteng)

**Subscribe** in your favorite podcatcher so you don't miss new episodes. If today's topics hit home, share this post with a teammate who's wrestling with resiliency, sweating a first talk, or trying to make sense of MCP.
