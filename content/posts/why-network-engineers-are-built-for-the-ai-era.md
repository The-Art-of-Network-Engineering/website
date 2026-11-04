---
title: "Why Network Engineers Are Built for the AI Era"
slug: "why-network-engineers-are-built-for-the-ai-era"
publishedAt: "2026-11-04"
excerpt: "Understanding AI agents, orchestration, context, and the skills you already bring to the table."
coverImage: "/blog-images/why-network-engineers-are-built-for-the-ai-era.jpg"
episodeSlug: "why-network-engineers-are-built-for-the-ai-era"
author: "Andy Lapteff"
---
*Understanding AI agents, orchestration, context, and the skills you already bring to the table.*

If you're a network engineer trying to make sense of AI, the terminology can feel overwhelming: models, agents, harnesses, orchestrators, context windows, memory. But network engineers may be starting on third base. Not because networking is machine learning, but because we've spent our careers troubleshooting interconnected systems and validating uncertain results.

In a conversation on The Art of Network Engineering, Remington Luce of St. Jude Children's Research Hospital described how he moved from experimenting with AI tools to building a multi-agent workflow for solutions architecture. His explanations offer a practical framework for engineers who want to understand the technology rather than memorize the jargon.

What makes something an AI agent?

I spent months building what I thought were agents for my podcast business. One workflow collects audience statistics from multiple services and updates our sponsorship reporting. Eventually I realized I had Python scripts running on cron jobs, not agents.

Remington's response was instructive: that might be exactly the right solution. A script is excellent when inputs, operations, and outputs are predictable. It doesn't need a model running on every execution.

An agent is different. It uses a model to interpret a task, select actions and tools, inspect results, and potentially repeat until a goal or stopping condition is reached. Its input need not be fully specified in advance. For example, "fetch these six metrics every morning" suits a script. "Research five qualified wireless networking sponsors and explain why they fit our audience" requires more interpretation and changing decisions.

The lesson isn't to replace scripts with agents. It's to understand which problems require flexibility and which deserve deterministic automation.

The bulldozer: model, harness, context

Remington used a memorable analogy. The model is a bulldozer: its capability determines the scale of work it might perform. The harness is the controls: the surrounding software that lets a user or agent interact with the model and available tools. Context is the job information: where the lake belongs, what the constraints are, and what a finished result should look like.

A powerful model with poor tools may accomplish little. Excellent tools with insufficient context can produce the wrong outcome. A working agent combines these pieces with instructions, tool access, and a process for pursuing a goal.

The distinction between model and harness matters. A model such as Claude Sonnet is not the same thing as the Claude Code environment that exposes tools and manages interaction with it. And neither is, by itself, an orchestrator for an entire multi-agent workflow.

What an orchestrator does

At St. Jude, Remington described a solutions-architecture process: a technical request arrives, experts identify requirements and missing information, research alternatives, and document a viable design. His team developed a workflow with roughly eight to ten agents to support this work.

An orchestrator receives the request and asks what work is needed, what information is missing, and what a successful result looks like. The team had hundreds of examples of human-written architecture work to help establish that standard. If the orchestrator identifies open technical questions, it delegates them to a research agent. That agent can investigate sources and return structured findings, which the orchestrator uses to continue the workflow.

Imagine evaluating a wireless access point. One specialist researches supported standards, another examines controller compatibility, and another checks security requirements. The orchestrator coordinates the work and collects unresolved questions. This is an illustrative networking example, not a claim that St. Jude uses that exact workflow.

The critical design choice is to define each specialist's inputs and outputs. Otherwise, an orchestrator may receive plausible prose that is hard to verify or pass along reliably.

Context and memory: who knows what?

Remington compared sharing information between agents to sharing routes between routers. One router knowing a route does not mean every router knows it. Similarly, one agent's research is not automatically available to every other agent.

If a research agent learns that an access point requires a particular controller version, the compatibility agent needs that finding through a message, shared artifact, or retrieval mechanism. The questions are familiar: who has the information, who needs it, how is it transferred, and is it still current?

Memory adds another layer. A model doesn't inherently retain an unlimited permanent record of previous sessions. The application may preserve history, summaries, project instructions, or files and load relevant material into a later interaction. That material consumes part of the context window, so indiscriminately loading everything can be wasteful.

Remington described using project directories, Markdown files, and Git-synchronized materials to preserve useful working context. For a network engineer, that could mean architecture diagrams, device inventories, standards, migration requirements, and previous decisions. Treat these as a maintained source of truth rather than expecting a long chat to remember everything perfectly.

Why the networking background matters

The conversation pivoted around minute 32 to a deeper question: how did a network engineer learn to build these systems without formal AI training?

Remington's answer was troubleshooting. Network engineers habitually divide a problem into smaller pieces, test hypotheses, eliminate possible causes, and check each layer. When a service fails, we ask about physical connectivity, switching, routing, DNS, authentication, and the application, not just whether an error message sounds convincing.

Apply the same discipline to an agent that fails. Did the model misunderstand the goal? Was a necessary tool unavailable? Was the context incomplete? Did a specialist return malformed data? Did the orchestrator lose a critical finding? These are different failure domains, and each needs different evidence.

The analogy has limits. Agents aren't routers, orchestrators aren't routing protocols, and probabilistic model behavior isn't the same as deterministic network software. The advantage is not automatic AI expertise. It's an established method for reasoning about systems.

Validation remains an engineering responsibility

AI can help compare route tables, inspect logs, generate code, and identify differences between pre-change and post-change states. But an observation and a causal explanation are not the same thing.

If a route disappears after maintenance, an AI assistant may correctly identify the missing prefix while confidently guessing why it disappeared. Engineers still need to inspect policy, advertisements, adjacency state, and other evidence.

The same principle applies to agent workflows: define permissions, limit blast radius, log actions, validate outputs, and require appropriate human approval before consequential changes. A persuasive answer is not a verified answer.

Where to start

Start with a problem you know well. Use AI to compare configuration changes or explain a routing-table difference. Inspect the evidence and correct its mistakes. Then ask whether the task needs an agent or whether a simple script is more reliable.

When you do need an agent, give it a narrow objective, a limited set of tools, relevant context, clear completion criteria, and a way to verify the result. Add orchestration only when the work genuinely benefits from specialized steps and handoffs.

Remington learned through repeated experimentation, not by collecting AI credentials. That's familiar territory for engineers who learned technologies by building labs, breaking things, and understanding why they broke.

The terminology is new. Many of the engineering problems aren't.

AI introduces genuinely new capabilities and risks. But communication between components, state management, dependencies, troubleshooting, and validation are problems network engineers already know how to approach. The opportunity is to apply that experience while learning the parts that are truly different.

Based on the conversation with Remington Luce on [The Art of Network Engineering](https://artofnetworkengineering.com/episodes/why-network-engineers-are-built-for-the-ai-era). Listen to the full episode, or [watch it on YouTube](https://youtu.be/2I_VQQLxWfs), for his detailed account of the St. Jude architecture workflow and the broader discussion of AI tooling and engineering judgment.
