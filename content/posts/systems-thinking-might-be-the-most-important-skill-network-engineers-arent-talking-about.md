---
title: "Systems Thinking Might Be the Most Important Skill Network Engineers Aren't Talking About"
slug: "systems-thinking-might-be-the-most-important-skill-network-engineers-arent-talking-about"
publishedAt: "2026-10-20"
excerpt: "I've been thinking a lot lately about what AI means for the future of network engineering. Not just whether AI can write configurations or troubleshoot a routing problem, but what happens to our profession when the technology becomes capable of doing more of the work we've spent our careers learning how to do."
author: "Andy Lapteff"
coverImage: "/blog-images/systems-thinking-might-be-the-most-important-skill-network-engineers-arent-talking-about.jpg"
episodeSlug: "ai-systems-thinking-and-the-future-of-network-engineers"
---

I've been thinking a lot lately about what AI means for the future of network engineering. Not just whether AI can write configurations or troubleshoot a routing problem, but what happens to our profession when the technology becomes capable of doing more of the work we've spent our careers learning how to do.

There's no shortage of opinions on the subject. Some people think AI will fundamentally change engineering careers. Others believe it's overhyped and that the underlying skills we've always relied on will remain just as important.

I suspect the truth is somewhere in the middle. But a recent conversation with Ryan Booth on The Art of Network Engineering got me thinking about a skill that doesn't receive nearly enough attention: systems thinking.

It's not a new concept, and it's certainly not unique to networking. People have been studying it for decades. But as AI becomes more capable, I think systems thinking will play an increasingly important role in distinguishing good engineers from great ones.

Elizabeth Stone, Netflix's Chief Product and Technology Officer, discussed the changing nature of technical careers on [Lenny's Podcast](https://www.lennysnewsletter.com/p/netflix-cpto-on-ai-and-the-future). One of the things that stood out was her emphasis on systems thinking, which she identified as the most important skill she looks for when hiring.

That's a remarkable statement coming from someone responsible for engineering, product, and design at Netflix.

Her argument reflects a broader change in how technical work gets done. As AI becomes capable of executing individual tasks, organizations need people who understand how those tasks fit together, how different parts of a system interact, and how to make decisions that produce the desired outcome.

Technical expertise still matters. But expertise in one particular technology isn't necessarily enough when the problems we're solving involve dozens of interconnected systems.

For network engineers, this should sound familiar.

## We've Been Doing This for Years. Sort Of.

I've recently been reading *Thinking in Systems: A Primer* by Donella H. Meadows. Originally written in the early 1990s and published posthumously in 2008, the book provides a fascinating framework for understanding why complex systems behave the way they do.

Meadows was an environmental scientist and systems researcher, not a network engineer. But many of the principles she describes apply directly to the networks we build and operate.

In the opening chapter, Meadows describes three fundamental characteristics of a system: its elements, its interconnections, and its function or purpose. Her point is that understanding the individual components isn't enough. You also need to understand the relationships between them and how those relationships influence the behavior of the larger system.

Consider a familiar scenario. An application is running slowly, and the network team gets called in to investigate.

You check the usual suspects. Interface utilization looks fine. No obvious packet loss. Routing is stable. Latency is within expectations. From a networking perspective, everything appears to be functioning normally.

But the application is still slow.

Maybe an application retry mechanism is generating additional traffic when requests time out. Maybe a load balancer is distributing connections unevenly. Maybe a database is struggling to keep up with demand, creating delays that users perceive as network problems.

The individual components might be working exactly as designed, but their interactions are producing an undesirable result.

Meadows' framework helps explain why. We tend to focus on the elements because they're visible and relatively easy to measure. We can inspect a switch, check a routing table, or examine a server's CPU utilization. The relationships between those elements, however, are often where the interesting problems hide.

An engineer focused exclusively on the network might conclude that there's nothing wrong and close the ticket. An engineer applying systems thinking keeps investigating, looking at how the various components interact and trying to understand why the overall system isn't delivering the expected outcome.

If you've spent any significant amount of time working in network operations, you've probably encountered situations like this.

Network engineers have always worked with complex, interconnected systems. We deal with dependencies, failure domains, distributed protocols, and configuration changes that can ripple across an entire environment. But there's a difference between working in a complex system and understanding how that system behaves.

I spent years in network operations, and looking back, some of the most valuable lessons I learned had very little to do with mastering a particular command or protocol. They came from troubleshooting problems that forced me to look beyond the network, understand how other systems operated, and work with people who had expertise I didn't possess.

Those experiences helped me become a better engineer because they changed the way I approached problems. I just didn't have a name for it at the time.

## Why Systems Don't Always Behave the Way We Expect

One of the more interesting ideas in Meadows' book is that systems often produce unexpected outcomes because of their internal structure.

In Chapter 4, *Why Systems Surprise Us*, she explores how feedback loops, delays, and the limitations of our mental models make systems difficult to predict.

A feedback loop occurs when the output of a system influences its future behavior. Meadows distinguishes between reinforcing feedback loops, which amplify change, and balancing feedback loops, which work to stabilize a system.

If you've ever dealt with a cascading failure or a network experiencing congestion, you've seen how feedback can influence behavior.

Imagine an application that begins experiencing packet loss. Its retry mechanism sends additional requests, increasing traffic and contributing to more congestion. That congestion causes additional failures, triggering even more retries.

What began as a relatively small performance problem can become a much larger incident because the system's response makes the original problem worse. That's an example of a reinforcing feedback loop.

Balancing feedback loops work differently. They're mechanisms that attempt to keep a system within an acceptable operating range. We see similar behavior in congestion control, traffic engineering, and other mechanisms designed to respond to changing network conditions.

But feedback loops introduce another complication: delays.

A system doesn't always respond immediately to a change. Measurements take time. Information propagates. Controllers make decisions based on observations that may already be outdated. If a control system reacts too aggressively to delayed information, it can end up overcorrecting and creating instability.

Anyone who has worked with distributed control systems or automated remediation should recognize the problem.

The lesson from Meadows isn't that systems are inherently unpredictable. It's that their behavior often makes sense once we understand the relationships, feedback loops, and delays involved. That understanding becomes particularly important when we introduce automation.

## AI Makes This More Interesting

AI is becoming capable of performing tasks that traditionally required substantial technical expertise. It can generate configurations, write automation scripts, interpret logs, analyze telemetry, and suggest potential solutions to complex problems.

None of that means we should blindly trust its output, particularly in production environments. But the capabilities are improving quickly, and it's reasonable to expect AI to take on more responsibility for routine technical work.

If AI can perform more of the individual tasks involved in engineering, where does that leave the engineer?

I think part of the answer is in understanding the larger system.

Imagine asking an AI agent to optimize routing across your data center. It might identify a configuration change that improves link utilization or reduces latency. On paper, the change looks great.

But what happens during a failure? Does the new configuration introduce an unexpected dependency? Does it improve performance for one application at the expense of another? How does it affect maintenance procedures, operational visibility, or the ability to recover from an outage?

Those questions require context, and that context often extends well beyond the specific technology being modified.

Meadows explores a related problem in Chapter 5, *System Traps ... and Opportunities*. One of the traps she describes is called "shifting the burden to the intervenor." It occurs when a system becomes increasingly dependent on an external intervention to address symptoms, rather than strengthening its ability to solve the underlying problem.

That idea seems particularly relevant as we begin relying more heavily on AI agents.

Suppose an AI system repeatedly detects and resolves the same operational issue. From a dashboard perspective, it might look like a success. Incidents are being resolved faster, and engineers are spending less time responding to alerts.

But what if the underlying problem never gets fixed?

We could end up with an increasingly sophisticated automated process for managing a problem that shouldn't exist in the first place.

The risk isn't unique to AI. We've been automating around underlying problems for years. AI simply gives us the ability to do it at greater speed and scale.

As AI agents become more autonomous, the consequences of overlooking system relationships become more significant. An automated change that looks reasonable in isolation could have unintended effects elsewhere in the environment.

I don't see this as an argument against AI or automation. I think these technologies have enormous potential to improve how we operate networks. But realizing that potential requires people who understand what they're trying to accomplish, how the underlying systems behave, and what could go wrong along the way.

Meadows introduces another useful concept in Chapter 6 of her book: leverage points. These are places within a system where changes can produce significant effects. She argues that changing the rules, information flows, or goals of a system can sometimes be more effective than adjusting individual parameters.

There's a lesson here for network automation. We can spend enormous amounts of effort automating repetitive tasks without questioning why those tasks are necessary in the first place. Sometimes the better solution isn't to automate the existing process, but to rethink the process itself.

Recognizing that distinction requires understanding more than the technology. It requires understanding the system.

## Learning to Think in Systems

One thing I appreciate about systems thinking is that you don't need another certification or expensive training program to start developing it.

You can practice it every time you troubleshoot a problem, design a network, or evaluate a proposed change.

In the final chapter of *Thinking in Systems*, Meadows offers practical guidance for working in a world of complex systems. Two of her recommendations particularly resonated with me: pay attention to how systems behave over time, and make your mental models explicit so they can be challenged.

Both are valuable habits for engineers.

When investigating an incident, don't limit your analysis to a snapshot of the environment. Look at how conditions changed leading up to the failure. What happened before the symptoms appeared? Were there warning signs? Did the system behave differently as load increased or dependencies changed?

When planning a change, consider the downstream dependencies and potential consequences beyond the device you're modifying. Think about how the system might respond under conditions different from those you're testing.

And when using AI, don't just ask it to generate an answer. Challenge its assumptions. Ask what dependencies it considered, what could go wrong, and how the proposed solution might affect the larger environment.

It's also worth questioning your own assumptions.

We all develop mental models based on our experiences. They're essential for troubleshooting, but they can also limit our ability to recognize unfamiliar problems. Sometimes the most productive thing you can do is explain your understanding of a system to someone from another discipline and let them challenge it.

One of the simplest habits you can develop is to regularly ask yourself, "What else does this affect?"

I've found that some of the best engineers I've worked with weren't necessarily the people who knew the most commands or could recite every detail of a protocol specification. They were the people who could walk into a complicated situation, ask the right questions, recognize relationships that others missed, and help everyone understand what was happening.

That's the kind of engineering judgment I think becomes more valuable as AI takes on more of the mechanical work.

## Where Does This Leave Network Engineers?

I don't know exactly what network engineering will look like five or ten years from now. I don't think anyone does.

But I'm increasingly convinced that the engineers who thrive will be the ones who combine strong technical fundamentals with a broader understanding of the systems they're responsible for supporting.

One of the lessons I took away from Meadows' book is that improving a system isn't necessarily about making its individual components faster, more efficient, or more capable. It's about understanding the relationships and structures that produce its behavior.

That's worth remembering as we introduce AI into our operational environments.

AI may change how we configure networks, troubleshoot problems, and automate operations. It may dramatically reduce the time we spend on tasks that currently occupy large parts of our workdays.

But faster execution doesn't automatically produce better outcomes. We still need to understand what we're optimizing for, how the system responds to our actions, and whether we're solving the right problem.

We've spent decades learning how to build and operate networks. Perhaps the next stage of our profession is about getting better at understanding everything those networks make possible.

And that's a much bigger challenge than learning another command-line interface.

---

If you're interested in exploring these ideas further, I recommend *Thinking in Systems: A Primer* by Donella H. Meadows, edited by Diana Wright and published by Chelsea Green Publishing in 2008. Although the book isn't about networking or AI, its explanations of feedback loops, system traps, delays, and leverage points provide a useful foundation for understanding complex technical environments.

Ryan Booth and I also explored many of these ideas in a recent episode of The Art of Network Engineering. We discussed his experience working with AI agents, how systems thinking changes the way engineers approach problems, and why technical judgment becomes increasingly important as AI capabilities evolve.

We also talked about the practical challenges of delegating work to AI, establishing appropriate levels of trust, and figuring out where humans still need to be involved.

**[Listen to AI, Systems Thinking, and the Future of Network Engineers with Ryan Booth](https://artofnetworkengineering.com/episodes/ai-systems-thinking-and-the-future-of-network-engineers)**
