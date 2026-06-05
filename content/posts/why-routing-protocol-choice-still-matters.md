---
title: "Why Routing Protocol Choice Still Matters"
slug: "why-routing-protocol-choice-still-matters"
publishedAt: "2025-12-17"
excerpt: "RIP, EIGRP, OSPF, BGP — they all work. So does it matter how packets get from point A to point B? A conversation with Russ White and Michael Bushong about IS-IS, architecture, and what our industry traded away."
author: "Andy Lapteff"
coverImage: "/blog-images/why-routing-protocol-choice-still-matters.jpg"
---

As long as packets flow from point A to point B, does it matter how they got to their destination? RIP, EIGRP, OSPF, BGP: they all "work."

In a recent episode of _The Art of Network Engineering_, Andy Lapteff sat down with Russ White, Ph.D. and Michael Bushong to talk about IS-IS, a routing protocol most network engineers never learn, rarely see in vendor training, and often dismiss outright. What started as a mildly provocative "change my mind" conversation turned into something deeper: a discussion about architecture, operational reality, and how our industry slowly traded understanding for familiarity.

---

## BGP: Powerful, Familiar… and Doing Too Much

Let's be clear: BGP is incredible at what it was designed to do.

It's policy-rich. It scales. It's intentional. It converges slowly _on purpose_. That makes it perfect for inter-domain routing on the internet.

The problem isn't BGP itself, it's how we use it.

In many modern data centers, BGP has become the universal solution: underlay, overlay, policy distribution, failure handling, traffic engineering, all rolled into one protocol. To make that work, we bolt on mechanisms like BFD, tweak timers, auto-peer neighbors, and effectively reshape BGP into something it was never meant to be.

At some point, you have to ask: If we're turning BGP into "fancy RIP," why are we doing this at all?

---

## The Case for Separating Underlay and Overlay

One of the strongest themes in this conversation was separation of concerns.

Historically, large networks separated infrastructure routing (IGP) from workload routing (EGP). That separation constrains failure domains, reduces attack surface, and simplifies troubleshooting. When everything lives in one massive routing table, failures don't stay local, they cascade.

This is where IS-IS shines.

As an underlay protocol, IS-IS is fast, simple, and largely fire-and-forget. It floods link-state information efficiently, converges quickly, and, because it isn't IP-based, significantly reduces attack surface. You don't run multi-hop IS-IS. You don't expose it beyond the fabric. It just does its job.

And then you let BGP do what _it's good at_: overlay signaling, policy, and control.

---

## Why IS-IS Feels "Scary" (But Isn't)

Ask most engineers why they avoid IS-IS and you'll hear things like:

- "The NET address is weird"
- "It's a Layer 2 protocol… somehow?"
- "Nobody in the NOC knows it"
- "We've always used OSPF or BGP"

What's ironic is that, functionally, IS-IS is _simpler_ than OSPF.

Its TLV-based design makes it flexible and extensible. IPv6 didn't require a protocol rewrite. New capabilities didn't require bolting on complexity. And operationally, the configuration is almost boring:

- Define a NET address
- Enable ISIS on interfaces
- Exclude workload ports
- Done

Compared to the sprawling configurations many of us proudly built with BGP, route maps, prefix lists, redistribution rules, BFD timers, IS-IS can feel… humbling.

And maybe that's part of the problem.

---

## Familiarity vs Good Design

One of the most honest moments in the episode came when we acknowledged the real reason many designs persist:

> "The NOC only knows BGP."

That's not a technical argument, it's an organizational one.

And it highlights a deeper issue in our industry: we've optimized for _operational familiarity_ at the expense of architectural clarity. Vendor training reinforces what's popular, not what's appropriate. Over time, that creates feedback loops where entire protocols quietly disappear from collective knowledge.

IS-IS didn't lose because it was bad. It lost because it wasn't marketed.

---

## What About RIFT?

We also touched on RIFT, a newer protocol designed for extreme scale in fat-tree topologies. It solves real problems, especially around minimizing routing state on top-of-rack switches.

But even here, context matters.

If your fabric has thousands of routers in a single flooding domain, RIFT might be the right tool. For most networks? IS-IS already solves the problem cleanly, _if_ you design correctly and keep workload routes out of the underlay.

New protocols shouldn't replace understanding. They should extend it.

---

## Why This Conversation Matters

This episode wasn't really about IS-IS.

It was about curiosity. About not treating networking as magic plumbing. About recognizing that most catastrophic failures don't come from protocol bugs, they come from interactions, complexity, and blind trust in abstraction.

Just like a car's transmission doesn't matter… until it does.

If you've never labbed IS-IS, this is your nudge. If you've always defaulted to BGP everywhere, this is your invitation to question why. And if you care about the future of network engineering, this is a reminder that understanding still matters.

Because once the people who _really_ understand these systems are gone, there's no vendor slide deck that can replace them.
