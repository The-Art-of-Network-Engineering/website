---
title: "The Bulldozer Analogy"
slug: "the-bulldozer-analogy"
publishedAt: "2026-11-04"
excerpt: "A way to explain the model, the software around it, and who directs the work."
coverImage: "/blog-images/the-bulldozer-analogy.jpg"
episodeSlug: "why-network-engineers-are-built-for-the-ai-era"
author: "Remington Loose"
---
*A way to explain the model, the software around it, and who directs the work.*

## Automation and LLM agents

**An LLM agent uses a model during execution to help decide what happens next.** It chooses actions, reads the results, and adjusts its approach. A fixed workflow follows steps set in code.

A script can run an agent, and cron can start one. Neither tells you whether the work is agentic. Using AI to write a script does not make that script an agent; adding a model call to a fixed workflow does not establish that either.

*This page uses "agent" to mean an LLM agent. The broader AI definition also includes rule-based agents. References: [IBM: Types of AI agents](https://www.ibm.com/think/topics/ai-agent-types) and [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).*

### 01 / Model
Interprets inputs and produces outputs using what it learned during training. Choose it for the work you need done.

### 02 / Harness
The software around the model. It manages the session, supplies context, handles tool calls, and applies configured controls.

### 03 / Tools
Let the system do something: search, query a database, run code, or change a file. The model requests an action; software executes it.

### 04 / Context
What the model has to work with now: the task, instructions, conversation, documents, selected memories, and tool results.

### 05 / Skills
Reusable methods for doing the work. They can include instructions, examples, scripts, and reference material.

### 06 / Boundaries
Permissions, approvals, and resource limits set constraints on actions. Validation checks whether the work meets the requirements.

## What can it handle?

**Inputs and outputs.** Check text, image, audio, and video support in each direction. A model that understands an image may not generate one. Some features require another model or tool.

**Performance on your work.** Test it on the tasks you expect it to do, including reasoning, coding, following instructions, and producing the formats your systems need.

**Context window.** How much can it work with at once? Instructions, history, documents, and tool results share a finite window. A large window does not guarantee that every detail will be used correctly.

**Tools, memory, and skills.** Check how well the model uses them and whether the harness supports them. Saved memory must be retrieved and supplied; skills must be made available. Neither changes the model's trained weights.

## Operate the machine or delegate the job

**Person-directed.** You choose the next step. You provide the context, ask the model for help, review the result, and decide what to do next. The system may use tools, but you direct the work.

**Agent-directed.** You set the goal and the limits. The model helps choose the next action, uses tools through the harness, and responds to the results. The system continues, stops, or asks for input within the authority you gave it.

A session can include both: you can direct one step and delegate the next.

---

*Analogy by Remington Loose, from his conversation on [The Art of Network Engineering](https://artofnetworkengineering.com/episodes/why-network-engineers-are-built-for-the-ai-era) (also on [YouTube](https://youtu.be/2I_VQQLxWfs)). Writing, illustration, and page development assisted by AI.*
