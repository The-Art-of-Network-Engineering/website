---
title: "I Spent Six Months Building AI Agents. Turns Out, I Built Python Scripts."
slug: "ai-agents-automation-and-systems-thinking-with-remmington-loose"
publishedAt: "2026-11-04"
excerpt: "We're sitting in Santa Clara, California, and I'm trying to explain to Remmington Loose how I spent six months building AI agents."
coverImage: "/blog-images/ai-agents-automation-and-systems-thinking-with-remmington-loose.jpg"
episodeSlug: "ai-agents-automation-and-systems-thinking-with-remmington-loose"
author: "Andy Lapteff"
---
We're sitting in Santa Clara, California, and I'm trying to explain to Remmington Loose how I spent six months building AI agents.

Except I didn't.

I built Python scripts. A bunch of them. Running on cron jobs.

And Rem, who works at St. Jude Children's Research Hospital and has been doing some pretty interesting things with AI, doesn't seem particularly concerned about my discovery.

He thinks I might have built exactly what I needed.

Which is great, except I've been trying to build something else.

## I Wanted Digital Employees

When I started experimenting with AI for the business side of The Art of Network Engineering, I had a pretty straightforward goal.

I wanted to stop doing repetitive work.

Take our media kit. When a potential sponsor reaches out, we need current audience numbers. Downloads, listens, YouTube subscribers, social media followers. All that stuff.

For the first six years of the show, we collected those numbers manually, updated a document, exported a PDF, and sent it off.

Every. Single. Time.

So I started working with Claude Code. I explained what I wanted, asked it to build agents, and watched it write software.

Now, every morning at 8 a.m., scripts collect those metrics automatically.

Problem solved.

Except somewhere along the way, I realized I didn't have agents. I had scheduled software.

I asked Rem what I'd done wrong.

His answer surprised me.

Nothing.

My inputs were predictable. My outputs were predictable. Why would I need an AI model making decisions every morning when a Python script could do the job?

And it doesn't burn tokens.

Fair point.

But that still left the question I wanted answered.

**What makes something an agent?**

## Rem Wants to Build a Lake

Rem has a way of explaining complicated things that makes me wish I'd brought a whiteboard.

He starts with a bulldozer.

Think of the AI model as the bulldozer. Bigger models can handle bigger jobs, but the machine alone isn't enough.

You need controls.

That's the harness. Something like Claude Code or Codex that lets you interact with the model and gives it ways to accomplish work.

Then you need context.

The bulldozer might be enormous. The controls might be wonderful. But if the operator doesn't know how to dig a lake, you've got a problem.

An agent brings those pieces together and can work toward a goal.

You tell it where you want the lake.

It figures out how to get there using the tools and instructions you've provided.

That distinction matters because it's different from telling a Python script exactly what to do.

A script expects specific inputs. Want different behavior? Change the code.

An agent can handle questions or requests you didn't anticipate when you built it.

At least, that's the idea.

And Rem isn't just talking about something he saw demonstrated online.

He's building these systems.

## Eight or Nine Agents Walk Into an Architecture Meeting

At St. Jude, Rem and a colleague started exploring whether AI could help with solutions architecture.

Think about what goes into designing a complicated technical solution.

Someone requests something. You need to understand the requirements, identify missing information, research technical questions, determine whether the proposed solution makes sense, and document everything.

That takes time from people who already have plenty to do.

And when something breaks six months later, you need documentation explaining how the system was supposed to work.

Rem's team wanted to capture some of that expertise in an AI-driven process.

What started as an experiment grew into roughly eight or nine agents working through multiple steps.

One agent acts as an orchestrator.

It receives a request and determines what's missing.

If there are technical questions, it hands those questions to another agent that researches them.

That agent can search for information, evaluate options, and return findings in a defined format.

They also had hundreds of examples of architecture work produced by humans, giving them something to compare the results against.

This isn't just asking ChatGPT whether a switch supports a particular feature.

It's building a process that can take a request, identify what it doesn't know, and work toward an answer.

And suddenly I realized something about my own collection of scripts.

I had built a lot of tools.

I hadn't built anything coordinating them.

## I Have Arms and Legs. Where's the Brain?

Here's another example from running the podcast.

Finding sponsors involves researching companies, identifying contacts, checking potential conflicts, and figuring out whether a company makes sense for our audience.

I've built software for pieces of that process.

One application prioritizes prospects. Another checks restrictions. Another finds marketing contacts.

They're useful.

They're also disconnected.

Suppose I want to find five wireless companies that might be good sponsors.

Right now, my system might need new logic. Maybe another Python script. Maybe another workflow.

Rem explains that an orchestrator could connect those existing tools with a model and give me more flexibility.

Instead of programming every possible question, I could provide a goal and let the system determine which tools to use.

He mentions n8n as one platform for connecting models, tools, and data into workflows.

Now we're getting somewhere.

But then I realize there's another piece I'm missing.

Memory.

## Why Doesn't This Thing Remember Me?

I've been talking to AI systems for years.

They know things about me.

They know I run a podcast. They know what kinds of projects I'm working on. Sometimes they reference details from previous conversations.

Other times, I find myself explaining something we've discussed repeatedly.

It's maddening.

Rem explains that the model itself isn't remembering those conversations the way I imagined.

What we're dealing with is context.

A session has a limited context window. As that window fills, tools may compact earlier information to make room.

Some information survives. Some details can disappear.

And if you're building something that needs consistent instructions across sessions, relying entirely on a long conversation isn't necessarily the best approach.

Rem uses Markdown files to preserve context.

Project instructions. Preferences. Technical details. Information the model needs when starting a new session.

Those files can live in Git repositories and be shared with other people.

He also distinguishes memory from skills.

For example, he created a script-writing skill containing requirements he wants his scripts to follow.

Things like reporting status, failing loudly when something goes wrong, and being idempotent.

Instead of explaining those requirements every time, he can give the AI that skill.

I'm listening to this thinking about all the times I've repeated the same instructions.

Maybe I need fewer conversations and better documentation.

Which sounds suspiciously like network engineering.

## The MTU Problem That Took 12 Hours

Then Rem tells me about a container deployment at home.

He's working with AI to get some containers running.

The endpoint comes up. Connectivity works.

Everything looks fine.

Until he tries transferring larger amounts of data.

Something breaks.

Twelve hours of troubleshooting later, he discovers an MTU issue.

An MTU issue!

I've been bitten by those more times than I'd like to admit.

You establish connectivity, assume the network is fine, and start looking everywhere else.

Meanwhile, larger packets are getting you.

Rem's a network engineer. He knows how this works.

But knowing something and remembering to check it at the right moment are different things.

And this is where his approach gets interesting.

After solving the problem, he asks the AI to turn what they learned into a troubleshooting skill.

Not just save the conversation.

Capture the troubleshooting process so it can be used again.

That's a different way of thinking about these tools.

Instead of treating each troubleshooting session as disposable, he's trying to preserve the reasoning that helped solve the problem.

The next time something behaves strangely, that experience can inform how the system approaches it.

## Network Engineers Have Been Practicing for This

At one point, I ask Rem why network engineers seem particularly suited to working with AI.

Neither of us went to school for machine learning.

We're network guys.

Rem tells me about a recent appointment with an orthopedist.

He's explaining everything he's already tried, walking through his troubleshooting process, eliminating possibilities.

The doctor just wants to take an X-ray.

I laughed because I recognized the behavior immediately.

That's how we think.

Is Layer 1 good?

Layer 2?

Can we reach the gateway?

Is DNS working?

We narrow the problem until we find the thing that's broken.

Rem points out that building AI systems requires a lot of the same thinking.

You have components that need to communicate.

Information has to move between them.

Just because one component knows something doesn't mean another component knows it.

Sound familiar?

A router knowing a route doesn't mean every other router knows that route.

You need a mechanism for exchanging information.

It's similar with agents.

One agent researches a technical question. Another needs the answer. The system has to pass that information correctly, in a format the receiving agent can use.

And sequencing matters.

Details matter.

Testing matters.

You can't just connect everything and assume it'll work.

I keep hearing people talk about systems thinking as an important skill for the future.

Rem makes me wonder how many network engineers realize they've been developing that skill throughout their careers.

## I'm Still Building the Thing

By the end of our conversation, I haven't magically figured out how to turn my collection of scripts into the system I want.

I still need to work through orchestration.

I need to organize my context and memory.

And I need to figure out which tasks benefit from an agent versus which ones should remain ordinary software.

But I understand the pieces better.

And there's something encouraging about Rem's path into all this.

He didn't start with an AI degree or a collection of certifications.

He started experimenting.

He built something. Tested it. Found problems. Changed things.

Then he built more.

When something failed, he investigated why.

When he learned something useful, he tried to preserve it.

That's a familiar process.

It's how I've learned most of what I know about networking.

And maybe that's what I'll remember most from sitting with Rem in Santa Clara.

I started this conversation wondering why I hadn't managed to build the agents I wanted.

I ended it thinking about the software I'd already built, the problems it solved, and what I wanted it to do next.

Because sometimes you don't need another bulldozer.

**You need to figure out who's driving the ones you've already got.**

Listen to the full conversation with Remmington Loose on [The Art of Network Engineering](https://artofnetworkengineering.com/episodes/ai-agents-automation-and-systems-thinking-with-remmington-loose) or [watch it on YouTube](https://youtu.be/2I_VQQLxWfs).
