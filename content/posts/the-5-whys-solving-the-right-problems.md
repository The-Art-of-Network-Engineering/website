---
title: "Why? The 5 Whys for Network Engineers"
slug: "the-5-whys-solving-the-right-problems"
publishedAt: "2026-07-09"
excerpt: "Why ask why? Because the messiest problems are rarely what they look like on the surface. Inspired by James Bensley on the podcast, here is how the 5 Whys helps network engineers stop fixing symptoms and start solving root causes."
author: "Andy Lapteff"
episodeSlug: "why-most-network-designs-are-flawed"
---

Why ask why?

Because most technical problems aren't fundamentally technical problems. They're symptoms of deeper issues, and the fastest way to find the real one is to keep asking why.

One of my favorite moments from our conversation with [James Bensley](https://www.linkedin.com/in/jwbensley/) had nothing to do with EVPN, routing protocols, or data center design. It was when James mentioned using the **5 Whys** in his work as a network architect.

It's a remarkably simple technique. When you're presented with a problem, keep asking "Why?" until you've uncovered the underlying cause.

At first glance, it sounds too simplistic to be useful. Network engineering is full of complex systems, intricate protocols, and countless moving parts, so how could repeatedly asking the same question provide meaningful insight? Because the cause is almost never sitting where the symptom is.

## A Lesson from Toyota

The 5 Whys traces its roots back to Sakichi Toyoda and was later popularized by Taiichi Ohno as part of the Toyota Production System. Toyota's manufacturing philosophy emphasized continuous improvement and eliminating waste, but they recognized that meaningful improvement only happens when you understand why a problem occurred in the first place.

If a machine stopped working, fixing the machine wasn't enough. They wanted to understand what caused the failure. If a process produced defects, they weren't satisfied replacing defective parts. They wanted to understand why the process allowed those defects to happen.

The number five isn't a rule. Sometimes you'll reach the root cause after three questions. Other times it takes seven or eight. The point is simply to keep digging until you're no longer describing symptoms but instead uncovering a cause you can meaningfully address.

That mindset has proven just as valuable in IT as it has in manufacturing.

## Network Engineers Are Great at Fixing Symptoms

Operations teams are trained to restore service as quickly as possible.

That's the job.

If BGP drops, you restore adjacency. If a firewall blocks traffic, you fix the policy. If an application is unreachable, you get users connected again.

Speed matters.

The challenge is that once service is restored, there's often pressure to move on to the next incident. The immediate problem has been solved, but the underlying cause remains.

Imagine an application outage.

Users can't reach the service. Why? Because the application server isn't responding. Why? Because the virtual machine crashed. Why? Because the hypervisor ran out of storage. Why? Because old snapshots were never removed. Why? Because there's no automated lifecycle policy governing snapshots.

Notice how different the solutions become depending on where you stop asking questions.

If you stop after the first answer, you restart a server. If you stop after the fifth, you improve an operational process that prevents dozens of future outages.

Both restore service today. Only one reduces the likelihood of tomorrow's outage.

## Why We Stop at the Surface

So if root cause is so obviously the better path, why do so few of us take it? It isn't laziness. It's how we're wired. A handful of well-documented biases nudge us toward the quick fix before we even notice we're choosing it.

**Action bias.** When something breaks, doing something visible feels like progress. Restart the server, fail over, clear the session. Pausing to investigate feels like standing still, even when it's the smarter move. In an incident, motion gets mistaken for momentum.

**Present bias.** Service restored right now is concrete and satisfying. Tomorrow's outage is abstract and, as far as our brains are concerned, not real yet. So we trade a future we can't feel for relief we can.

**Satisficing.** The moment a fix stops the pain, the problem is "solved," and we stop looking. The first answer that works wins, even when it's the fifth why that matters.

**Normalization of deviance.** The first time a workaround holds, it's a hack. The tenth time, it's just how the network works. Recurring problems get quietly reclassified as normal, and once something is normal, nobody asks why anymore.

None of this makes you a bad engineer. It makes you a human one. The real value of the 5 Whys is that it interrupts these reflexes. Each "why" is a small act of resistance against the urge to move on.

If this rabbit hole interests you, we keep a shelf of the best books on cognitive bias and decision-making on our [resources page](https://artofnetworkengineering.com/resources#biases).

## The Best Architects Ask Why Before They Build

So far we've used the 5 Whys to look backward. Something broke, and asking why walked us past the symptom to the cause.

But the highest-leverage place to ask why isn't after a failure. It's before one. Before the design is drawn, before the change window opens, before a reasonable-sounding decision quietly hardens into permanent architecture.

That was the shift that stuck with me from James's point: the same question that untangles an outage can stop a bad design from ever reaching production. One use saves your night. The other saves your next three years.

People often think architects spend their time choosing technologies. Which routing protocol should we use? Should we deploy EVPN? Do we need VXLAN? Should we build active-active data centers?

Those are important decisions, but they're rarely the first questions worth asking.

Customers frequently arrive with proposed solutions. "We need Layer 2 stretched between sites." "We need another firewall." "We need EVPN."

Experienced architects don't immediately evaluate whether those solutions are technically sound. They first try to understand why someone believes they're needed.

Why do you need Layer 2? Because the application requires it. Why does the application require it? Because it assumes servers stay on the same subnet. Why? Because it was designed fifteen years ago, before virtualization became common.

Now the discussion has changed completely. Instead of debating whether stretched Layer 2 is a good idea, you're discussing application modernization, technical debt, migration strategy, and long-term operational risk.

The proposed solution wasn't wrong. It just wasn't solving the right problem.

That's what good architecture looks like. It's less about knowing every protocol and more about asking better questions before drawing the first diagram.

## It Works Beyond Technology

One reason the 5 Whys has survived for decades is that it applies to far more than manufacturing or network engineering.

Teams miss deadlines. Projects fail. Change windows go sideways. Documentation falls out of date. Incidents repeat themselves.

It's easy to attribute those outcomes to individual mistakes. Someone forgot a step. Someone misconfigured a device. Someone didn't follow the procedure.

Sometimes that's true.

More often, though, those mistakes expose weaknesses in the system surrounding the individual. Maybe documentation was outdated. Maybe the review process was rushed. Maybe nobody owned the task. Maybe incentives rewarded speed over quality.

The further you follow the chain of "Why?", the more likely you are to discover process issues instead of people issues.

That's an important distinction, because blaming people rarely improves systems. Improving systems helps people succeed.

## A Tool Worth Keeping in Your Pocket

The beauty of the 5 Whys is that it requires no software, no certifications, and no special training.

What it takes is the discipline to slow down just enough to dig beneath the surface. Stay on the surface and you'll keep fixing the same problems over and over. Go one level deeper and you fix them for good.

That's what James did.

The next time someone tells you the network is down, asks for a new technology, or proposes a particular design, resist the temptation to jump straight into solving the problem.

Spend a few extra minutes asking why. Then ask it again.

You might discover that the issue isn't the network at all. Or you might uncover a problem that's been quietly costing your organization time, money, and reliability for years.

Either way, you'll almost certainly make a better engineering decision.

Sometimes the most valuable tool in an architect's toolbox isn't another protocol. It's curiosity.

---

If you haven't listened to our conversation with James Bensley, check out [**Why Most Network Designs Are Flawed**](/episodes/why-most-network-designs-are-flawed). Beyond discussing network architecture, James shares the thought process he uses to challenge assumptions, uncover root causes, and design networks around the problems that truly matter. It's a mindset every engineer can benefit from adopting.
