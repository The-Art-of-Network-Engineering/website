---
title: "The Art of Preparing for a Cisco Exam"
slug: "the-art-of-preparing-for-a-cisco-exam"
publishedAt: "2020-08-07"
excerpt: "This article was written by guest author Carl Zellers"
author: "Andy Lapteff"
---

*This article was written by guest author [Carl Zellers](https://twitter.com/cfzellers4)*

So, you’re either thinking about or being “encouraged” to get certified in one of the many exciting and new Cisco certification offerings?

Either way, that’s fantastic news!

Ok, first things first; Cisco, (like many other certification granting entities), have long since developed proven formats for designing certification exams as well as the supporting documentation that accompany them to aid candidates in their quest in getting certified.  For every certification exam, there is a certification “blueprint”, a syllabus of sorts.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/08/sergey-zolkin-m9qmoh-scfe-unsplash.jpg?w=640)

Let’s assume now that since you are an extremely talented, smart, and motivated individual, and as such you have decided to embark on the extremely prestigious and by far the most superior certification track of all > Security, (not because I’m currently studying for the CCNP Security Core exam – [SCOR] or anything).

But seriously, this applies to any of the certification exams that cisco offers simply because they use the same blueprint format. So, the good news is, if you apply this to your CCNA for example, you can also apply this to your CCNP(Security :) ) and so on.

Alright, so what now, go straight to Amazon or ciscopress and start buying up your reading list or heading to your favorite content provider and drinking from the proverbial firehose!?

Not necessarily!

Effective study takes preparation in and of itself!  Back to the blueprint we go!

As I mentioned, Cisco has generously provided us, the hopeful glutton-for-punishment candidates, exam blueprints that outline the exam material\* (umm, more on this later).

Before we get started, head over to the exam blueprint for the CCNA at cisco.com and save a copy to your local machine as well as a printed copy for your desk at home and/or work, (helpful hint: doing this will inevitably serve as a reminder as well as a tangible piece of personal accountability).  Now for the REAL reason you came here, deciphering and evaluating the blueprint!

[Cisco blueprint](https://learningnetwork.cisco.com/s/ccna-exam-topics) now in hand, (regardless of which blueprint you have), you’ll no doubt have noticed a theme and believe me that theme is a universal truth across all blueprints.

Let’s take a deeper look at some of the words they use on the blueprint:

- Compare
- Describe
- Implement
- Configure

And my personal favorite:

- Configure *and* Verify or “be ready for literally anything”.

You really need to think about these and what they are asking to maximize your study efforts.  Let’s look at a couple in particular and break them down.  At first glance, “implement” and “configure”, same thing right!?

Not necessarily.

Cisco chose their words ‘carefully’.

In my opinion/experience, implementation(s) generally involve solutions, solutions that oftentimes have dependencies or go beyond simply enabling a protocol for example, (think OSPF virtual-links), the idea is that you have a working knowledge of OSPF and have layered on scenario specific knowledge.  However, on the “configure” side of things, seems to be aimed at evaluating a candidate’s knowledge of a particular protocol itself, (think simply configuring a single-area OSPF routing domain).  With this kind of understanding of the nuance in the blueprint, I’m certain you will see a better return on investment with your study time!

**You:** “Ugh, but it says here in the blueprint SNMP, SNMPv2, and SNMPv3”, or “RIP/Frame-Relay/etc do I really need to learn all of that?"

**Me:** "Yes, yes, and more yes. "

Older protocols and technologies do show up on exams, it’s a fact of life, and likely always will be.  Truth is, those types of things DO still exist today, albeit a very low likelihood you’ll ever run into them.  DO NOT let these small things deter you from continuing on.  Progress in technology and networking especially is iterative, meaning while it may seem arbitrary to have to study ‘legacy’ technology, you will still likely benefit from having learned and been exposed to it.  Embrace it, learn it, prove it in the exam, then you’re free and clear to intellectually bad mouth it with a certain technical aptitude for the rest of your days, (like the rest of us!).

So, I said previously, “you will still likely benefit from having learned and been exposed to it”.  What do I mean by being exposed to it?  Long story short, LABBING WORKS.  Hands on practice is KEY in solidifying these items you’re looking at skeptically on the blueprint.  I don’t care how many times you watch a video or read a paragraph, doing it for yourself is a must, ok I’ll go and say it, is nonnegotiable!  And while we’re here, don’t just lab it, lab it again, and again.  Some helpful tips for labbing:

1. Go find or create a new use case for the same topic!
2. Break it, break it in multiple ways, fix it, break it again, repeat
3. Don’t take documentation at face value!, if the documentation says a configuration won’t work or isn’t suggested.  TEST THAT! You’ll learn just as much about how something works by seeing it not work and why.
4. Collaborate in some way while labbing if you can with others.  Use someone else’s topology, let them break it for you to fix.
5. Take wireshark captures frequently.  A lot of people take for granted that adhering to the ‘rules’ of OSPF adjacencies is simply enough to know OSPF.  Ummm, ok but it’s really cool to see the all routers multicast address in a pcap and what kinds of messages are sent to and from certain addresses.  Honestly, what’s the worst that, happens you gain a real-world skill in become proficient in wireshark!?

Wrapping up, let’s re-cap where we’ve been and where we go from here.

- The blueprint is the framework to center your studies around.
- The more reference material you have the better.  Probably THE single most underrated resource is via Cisco docs, (configuration guides/examples, command references, etc.).
- LAB, Lab, lab, and lab some more.  As for my “more on this later” teaser, there is another important aspect of the blueprint itself.

The following is something that you will also find on ALL the Cisco blueprints:

*“The following topics are general guidelines for the content that is likely to be included on the exam. However, other related topics may also appear on any specific version of the exam. To better reflect the contents of the exam and for clarity, the following guidelines may change at any time without notice.”*

            Yep, you read that correctly!  Although the blueprint is a great authoritative and comprehensive outline, we are still at the mercy of the question authors and exam architects for the foreseeable future, so lean into it and enjoy!
