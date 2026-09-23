---
title: "My Boss Gave Me Tuesdays. I Gave Them Back."
slug: "my-boss-gave-me-tuesdays-i-gave-them-back"
publishedAt: "2026-09-23"
excerpt: "Years ago a boss gave me every Tuesday to learn Python, protected, no company work. I spent every one of them writing the next week's change scripts. Two Dutch automation consultants heard that story in Munich and gave me the answer nobody gives in the US: two priorities, pick one."
author: "Andy Lapteff"
episodeSlug: "the-network-automation-paradox-you-need-time-to-save-time"
---

Munich. A hotel conference room set up as a podcast studio. Two Dutch network automation consultants, both named Bart, across the table from me.

I had come to play a character I know well: the traditional network engineer who won't automate. I would give them every objection I had heard over the years, and plenty I had made myself, and make them argue me out of it.

Learn Python. Fine. When?

Start with Ansible. Okay. When?

Build a source of truth. With what hours? Who populates it? I have 15,000 devices.

Find a use case. Start small. Learn Git. Learn APIs. Test your changes. All good advice. But I'm drowning now.

About forty minutes in, I stopped playing the character and told them a secret.

At one job, years ago, I went to my boss and told him I didn't know when I was supposed to learn automation. I was studying for my CCNP at night. I was working four or five maintenance windows a week, with the normal daytime workload on top. And now you want me to learn Python too?

To his credit, he listened. He gave me Tuesdays. Every Tuesday was my automation day. No regular company work. Don't worry about the backlog. Learn.

It was exactly what I said I needed. And I gave it back.

Every Tuesday, the backlog was sitting right there. Four of us doing the work of eight. Another maintenance window coming, another change script to prepare, another pile of operational work waiting. So I'd open Notepad++ and start writing the following week's changes. It was the thing I knew how to do, the thing I was good at, the thing that had made me valuable for 15 years. I told myself I'd learn Python once I caught up.

I never caught up. Nobody does. The wheel doesn't have an exit.

Bart Dorlandt listened to all of this and said, "Congratulations, you're still human." Then: go off Teams. Go off Slack. Do your thing.

Go off Teams? I laughed. Teams is on my phone. I was reachable seven days a week. A full workday with the door shut felt like a foreign country.

Which, it turned out, was the point.

## Two priorities. Pick one.

Bart Dorlandt and Bart Smeding are Dutch, and our network automation conversation pivoted to work culture.

I kept presenting the same problem in different forms. Learn Python and you'll get time back. Fine, but I'm drowning now. Build a source of truth. With what time? Automate populating the source of truth. Great, first I have to learn to write the script that automates populating the source of truth. Around and around we went.

Then Bart Dorlandt said that maybe they were simply "too Dutch" to end up in the situation I was describing: working five, six or seven days a week, sometimes absurd hours, while still being expected to carve out enough intellectual energy to learn an entirely new discipline. From his perspective, if an employer gives you two priorities and enough time for one, the response is straightforward. Pick one.

That sounds obvious. It didn't feel obvious to me. And it landed harder than any advice about Python, Ansible or APIs, because I'd spent years believing my problem was that Python was hard.

Sitting there in Munich, I started doing the arithmetic out loud. When I learned networking, I spent eight months in Cisco NetAcad. Four hours on Friday, four hours on Saturday. Eight hours a week for eight months. Of course I eventually learned the CLI. I never gave Python anything remotely close to that.

Maybe Python wasn't uniquely difficult. Maybe I had given one skill hundreds of protected hours and expected to acquire another in the scraps left over after work, maintenance windows, certifications, family and life.

And there was another uncomfortable piece of it. The CLI was who I was.

## The human regex

At one point we were talking about Ansible, Python and APIs when Bart Dorlandt casually referred to the CLI as an API. I stopped him. The CLI is an API?

His argument was, of course it is. You enter something. The device gives you output. You interpret the response. When you type show version and read the screen to see what the device is running or how long it has been up, you are parsing the output.

I'm the human regex.

I joked, "That's where my value is, damn it. That's why I can't hand it over to automation." Everybody laughed. I'm not sure I was entirely joking.

For 15 years, my professional value came from knowing how to do the work. I knew the CLI. I could build the change, work the maintenance window, troubleshoot the outage, stare at a wall of command output and notice the thing that didn't look right. Then my boss handed me Tuesday and said, in effect: stop doing the things that make you valuable today so you can learn something that might make you more valuable tomorrow.

That's a much harder trade than "learn Python" makes it sound.

## Automation has a time problem

This is the paradox I hadn't been able to put into words before that conversation.

Automation gives you time back. Bart Smeding described building something that turned roughly three hours of work into a couple of minutes, and once you've felt that, the value is obvious. But before automation can give you time, you have to give automation time. That first script takes longer than doing the task by hand. Building the source of truth takes time. Learning Git, understanding APIs, testing, failing, sitting there staring at an error message you don't understand for two hours: all of it takes time. The payoff comes later.

That creates a brutal incentive problem inside an overloaded engineering organization. The busier the team becomes, the more valuable automation becomes. But the busier the team becomes, the less capacity it has to build automation. So today's urgent work keeps beating tomorrow's important work. Tuesday becomes another operations day. And eventually everyone wonders why the automation initiative never went anywhere.

## Automation requires slack

Not Slack the application. Slack in the system. Capacity.

If every engineer is operating at 100 percent, there is no room to experiment. No room to be a beginner. No room to write the ugly first script that takes four hours to automate a ten-minute task. No room to clean up technical debt, build a source of truth, write tests, or figure out why the API call that worked yesterday doesn't work today.

You can tell people automation is a priority. You can put it on a slide. You can send them to AutoCon. You can even give them Tuesdays. But if every other incentive says the ticket, the outage, the maintenance window and the Teams notification still come first, you haven't given them the time. You've given them permission to feel guilty about how they use it.

And engineers own part of this too. My boss did what I asked. He gave me the time. I didn't protect it. That part is on me.

## The question I can't answer

Near the end, Bart Dorlandt asked another question I haven't stopped thinking about.

We were talking about how fragile networks can feel and all the process we've built around that fragility. Change reviews. Maintenance windows. Approvals. And change freezes. In the US, plenty of organizations reach the most commercially important weeks of the year and decide: don't touch the network.

Bart asked whether anyone had compared the numbers. Does the network break less during the month nobody touches it? Or does a change freeze mostly give us the feeling of safety while technical debt keeps accumulating underneath? Then he asked the more interesting version. Does a network need continuous work to stay healthy?

I don't know. I'd like to see the data. But I've started to suspect the change-freeze question and my Tuesday problem have something in common. When systems are overloaded, we protect what feels urgent and controllable. Don't touch the network. Clear the ticket queue. Prepare tomorrow's change. Answer Teams. Do the thing you already know how to do. Meanwhile, the work that might change the system keeps getting pushed into the future.

## Protect Tuesday

I still think network engineers should learn Python. I still think you should automate. Start small. Pick a real problem. Read from devices before you change them. Find somebody who knows more than you and learn from them.

But there's a question that comes before all of those: what are you going to stop doing while you learn?

If you lead an engineering organization, don't tell your engineers automation is a priority and then measure them entirely by the operational workload that keeps them from learning it. Something has to give.

And if you're the engineer lucky enough to have a manager who makes that space for you, don't make the mistake I did. Close Teams. Let something wait. Be bad at something new for a while. Protect Tuesday.

The strange thing about automation is that everyone sells it as a way to save time. Nobody talks enough about the time you have to spend first.

My boss gave me Tuesdays. I gave them back. I wouldn't make that mistake again.

/Andy
