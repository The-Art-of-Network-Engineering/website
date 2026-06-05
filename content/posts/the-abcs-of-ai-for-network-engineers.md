---
title: "The ABCs of AI for Network Engineers"
slug: "the-abcs-of-ai-for-network-engineers"
publishedAt: "2026-02-25"
excerpt: "Network engineers have earned their skepticism — but AI is finally crossing from interesting to operational, and the difference isn't the hype. It's the plumbing."
author: "The AONE Team"
coverImage: "/blog-images/the-abcs-of-ai-for-network-engineers.jpg"
---

## A Practical On-Ramp (No Hype Required)

Network engineers have earned their skepticism.

We've lived through enough buzzword cycles to know the pattern: new label, new slide deck, same operational pain. So when "AI" shows up on everything from toilets to pens to enterprise platforms, the default response in most network circles is the same: the eye-roll.

But there's a shift this episode discusses in a pragmatic way.

AI is finally crossing from "interesting" to "operational," and the difference isn't the hype. It's the plumbing.

In our latest episode, we sat down with [John Capobianco](https://www.linkedin.com/in/ACoAAAMs_lQBtfL6HM6Z20uf-rKpIqhWDHV4fJk?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAMs_lQBtfL6HM6Z20uf-rKpIqhWDHV4fJk) and [Michael Bushong](https://www.linkedin.com/in/michaelbushong?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAC3HfgBss68iHI7ZpJKZh-rqkY2eixSfYM) to talk about what network engineers can do with AI, without turning it into another "you're behind" guilt trip.

We called it **The ABCs of AI**, but what we really built was an on-ramp.

### The real problem: we're still stuck at "automation adoption"

John referenced the Network Automation Forum survey showing a familiar, and disappointing, pattern: a large portion of networks still aren't meaningfully automated.

And it's not because network engineers are lazy.

John framed it as a three-way split:

- Tooling friction (NETCONF/RESTCONF/templating/DSLs/YANG flavors… pick your poison)
- Cultural resistance ("I became a network engineer, not a software developer")
- Enterprise incentives and governance (stability over innovation, air-gapped constraints, change control, etc.)

Mike added an uncomfortable truth: in many environments, networks are fragile _because we rarely change them_. And when you combine fragile systems with fear-based change control, you get what many of us have lived through:

- blackout windows that stretch for months
- draconian approval processes
- "temporary" exceptions that become permanent snowflakes

So if you're waiting for the perfect tool to fix fragile operations, you may be waiting forever.

### The narrative that backfires: "automate or die"

One of the biggest blockers isn't technical. It's psychological.

Our industry has spent years telling engineers: "Please build the system that replaces you."

Then we act surprised when adoption is slow.

AI isn't _inherently_ a job-destruction machine. It's a force-multiplier. The risk isn't "AI replaces people." The risk is: **people using AI displace people who aren't.**

That's not doom. It's a choice.

And it's also why this moment is more opportunity than threat, if you jump on now.

### The "Hello World" isn't coding. It's connecting.

Most people's AI experience looks like this:

- open ChatGPT
- type a question like it's Google
- get a decent answer
- move on

That's not where the real value is.

John's point was simple: LLMs are powerful, but they're still "closed book." They have a knowledge cutoff. They hallucinate. They don't know _your_ environment.

So the breakthrough isn't better prompting. It's connecting the model to trustworthy, real data and real tools.

That's where four terms matter.

### Four terms you need to know

If you take nothing else from this episode, take these:

**1) LLM (Large Language Model)** The "brain" that generates text (and can reason + call tools). ChatGPT, Claude, Gemini, etc.

**2) RAG (Retrieval-Augmented Generation)** A way to ground the model in _your_ documents/data by retrieving relevant context before it answers.

**3) Agentic AI** Instead of one-off answers, an "agent" can take a goal and execute steps: retrieve data, run a tool, analyze results, produce output.

**4) MCP (Model Context Protocol)** The connective tissue. John described MCP as a protocol moment, like HTTP for the web or SMTP for email, because it standardizes how AI clients call tools and access context.

This is the piece that turns AI from a clever chat window into an operational workflow engine.

### The real "Hello World" for network engineers: NetBox / Nautobot + MCP

Here's the most practical part of the episode.

If you're a network engineer and you want a non-scary, high-value first step, don't start with "push config." Start with your source of truth.

John recommended using NetBox or Nautobot (in a sandbox/demo environment) and connecting it via MCP to an AI client.

Why this is the perfect "Hello World":

- It's relevant to your daily work
- It's bounded (read-only to start)
- It eliminates spreadsheet scavenger hunts
- It unlocks natural language access to your own system of record

The moment we heard John say: "What circuits do we have in Atlanta?" or "What IPs are available in this subnet?"

…our brains recalled the hours lost hunting through SharePoint, spreadsheets, jump boxes, and stale docs just to answer basic operational questions.

That's not "AI magic." That's workflow relief.

### Safety: start read-only, then earn trust

A major theme was avoiding the "bad vibes" version of AI: dumping code you don't understand into a terminal and getting gaslit by a chatbot telling you "we're so close."

The safe path John laid out:

1. Start human-in-the-loop
2. Start read-only (logs, show commands, diffs, compliance)
3. Add guardrails ("don't touch enable secrets," "don't lock me out," etc.)
4. Only then move toward config changes

This is how network engineers adopt tools: prove it safely, then expand.

### Why this matters now: the train is still in sight

John made a point I think a lot of people need to hear: MCP is basically a year old. You're not "too late."

But you don't want to wait until this becomes table stakes.

His "lottery ticket" framing stuck with us:

- Early adopters get outsized leverage and opportunity
- Late adopters find the keg empty

Not because they're less smart, but because momentum compounds.

### What's next: we're building the Hello World episode

At the end of the episode, we made a commitment: we're going to record a practical "Hello World of AI" walkthrough, connecting an AI client to a source of truth, in a safe environment, and showing that this is possible without being a full-time software developer.

No hype. No shame. Just a clear on-ramp.

If you've been rolling your eyes at "AI," keep rolling them, but bring curiosity too.

Because the tools are finally becoming usable.

And that's NOT hype.
