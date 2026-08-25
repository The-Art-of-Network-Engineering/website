---
title: "Can Network Engineers Build Real Software with AI?"
slug: "can-network-engineers-build-real-software-with-ai"
publishedAt: "2026-08-26"
excerpt: "I've been vibe coding automations for the show for about six months. Some of it works, a lot of it falls over. In Munich, John Capobianco showed me a more structured way to build with an LLM, and we built a subnetting game live to prove it."
author: "Andy Lapteff"
coverImage: "/blog-images/can-network-engineers-build-real-software-with-ai.jpg"
episodeSlug: "stop-vibe-coding-start-spec-driven-development-with-john-capobianco"
---

I get out of the car in Munich after a transatlantic flight I didn't sleep on, and the first thing I hear is a giggle. I look over to see John Capobianco sitting outside of the hotel entrance, with his signature smile, waving me over. Four days without his luggage, wearing the same shirt, explaining VibeOps to strangers on the streets of Germany, and still smiling. What a wonderful way to begin my AutoCon 5 experience. A smile from a friend and an invite to join him for a cup of coffee while we catch up.

A few hours later we built a subnetting game with an open source toolkit, allowing vibe-coders like me to build high-quality, reliable software, using an LLM.

John knew I’d been vibe coding automation projects for a few months, with intermittent success, and he wanted to help me build more reliable software by showing me spec-driven development. I'd heard the term somewhere, but wasn’t sure what it meant or how it might help my vibe-coded automation efforts. I thought it meant applying software development practices to the kind of coding I'd fumbled through with the help of Claude Code. That's close, but not quite. He called it “VibeOps that grew up.”

John watched patiently as I fought the idea of automation, eventually accepted the benefits of automation enough to try it, cheered me on as I stumbled my way through those first attempts, and now that I’m on the path, showed me a better way. He’s always tried to nudge me in the direction of progress, and I am grateful for his patience and friendship.

My interest in automation was driven mostly by need. I was drowning and burning out as I worked two full-time jobs. Running the podcast became my second full-time job 20 months ago, and I now have a front row seat for the intermittent burn out and frustration AJ carried for the show’s first five years. This is not a job one person can do without destroying themselves, but AJ did most of what I’m now doing by himself and I’m all too aware of that burden now.

Beyond paying an editor, the business cannot yet pay for another human to help me run all the moving parts of running the show, so I’m automating the repetitive, menial tasks with the help of Claude Code. I got the idea of building a “digital team” from a few podcasts I listened to on Lenny’s Podcast. One or two person companies who built a team of digital assistants and scaled their business to multi million dollar revenue. I’m not trying to get podcast rich, I just need to stop working 20 hour days. It’s not sustainable.

In Munich, John and I decided to build a subnetting game using spec-driven development. Both of us laughed about that, because both of us nearly quit our CCNP over subnetting. Flashcards. Handwritten CIDR math in workbooks. Pages of IP addresses where you had to work out first usable, last usable, broadcast, all of it by hand. So we decided to build a Duolingo for subnetting.

Not long after we started, John started highlighting the similarioties between network engineering and software development processes.

"This is networking," [John](/guests/john-capobianco) said. "What do you do for a network change? You gather requirements. You come up with an implementation plan, a test plan, a rollback plan, success criteria."

A spec is a network change plan. We just call it requirements instead of specifications. The business hands you what it needs, you turn it into a design, you build the thing. Spec-driven development mirrors that process, step for step.

The workflow has an order. Constitution. Specify. Clarify. Plan. Tasks. Implement.

The constitution comes first: the guardrails. Code quality, testing standards, correctness before everything else. John likes to draft it in Claude Desktop and keep it in the repo so anyone can see the exact input that built the thing.

Then the spec, the requirements for the game we wanted to build. .

Then clarify. After the spec, before it builds anything, you can ask the LLM if it has questions. And it does. It comes back with up to five, like a junior engineer you handed a change plan to. Who's the audience, complete beginners or CCNAs? IPv4 only, or IPv6 too? How does the learner enter answers, free text or multiple choice? What defines mastery to move to the next level, a streak or a cumulative total? I never would have thought to ask some of these questions.

Then the plan, where you finally choose your tech stack.

Then tasks.

Then the code.

As usual, I kept getting lost in the recursion. We wrote a prompt to build a constitution, put that in a markdown file, then told it to build a constitution based on that constitution and that file. I said out loud that this is exactly where I lose the thread when I'm coding alone. John admitted the recursion is real. But naming it kept my mind in the room.

When I build things in Claude Code on my own, I ask it for a spec, then I hand that same spec right back to itself and say "build this." No framework. No clarify step. No branch. No tests. If it works, I'm happy.

This was different. More formal. More constrained. Driven by requirements instead of vibes.

When we finally hit implement, code started appearing. Source folders, styles, tests. Two hundred lines of CSS neither of us wrote. And then something I didn't expect: it wrote failing tests first, then fixed its own code to pass them, then regression tested the whole thing. Test-driven development, baked in. John said even he didn't know it worked that way. Everything tracked in git, on its own branch, its own artifacts, so anyone could read exactly how we built it.

[Eric Chou](/guests/eric-chou) wandered in mid-build, the way a neighbor does. In fairness to Eric, he arrived to record an AONE episode with me, but John and I went way over our allotted time slot. Sorry Eric! I asked Eric, a real coder, what he makes of all this. His answer was smaller than I expected. It's not that the AI writes perfect code. It's that he doesn't get stuck anymore. No more staring at a blank page for two Pomodoros. It gives you something. Maybe wrong, but something you can iterate on. The block is gone.

Implement is the heaviest step. If you're on a twenty-dollar LLM plan, this workflow will chew through your tokens fast. You can cap it. You can point the early steps at a cheaper model and save the good one for the end. But the price shock is real if you're not careful. For this build we used my Claude Max plan, which was sufficient.

If you’ve followed my career journey for any length of time, you know how miraculous it is that I’m creating software (with the help of LLMs), but my vibed automations kept falling over. Bug after bug, miss after miss, I started to think I wasted months of late nights vibe-coding automations that I could not rely on.

But when John taught me the spec-driven development framework and the associated benefits, I became hopeful that the added checks and guardrails may improve the quality of my coded vibes.  Time will tell, but I’ll know soon if my automations perform more reliably, and I stop chasing my vibed bugs and get some much needed sleep.

Without these modern tools, I would never have had access to software development. I know I would never have reached the point where I could build a real application. But my vibe-coded software is unreliable and I need it to be dependable. That’s where spec-driven development saves the day.

If I can do this, you can do this.

Rewind the episode. Install what we installed. Build your own. Create a BGP game. OSPF. Make learning network engineering fun, and leave something behind for the next person who almost quit over subnetting.
