---
title: "SD WAN Underlay Options"
slug: "sd-wan-underlay-options"
publishedAt: "2020-10-26"
excerpt: "This article was first written by @aaronengineered and posted to his blog aaronengineered.com."
author: "aaronengineered"
---

*This article was first written by @aaronengineered and posted to his blog [aaronengineered.com](https://www.aaronengineered.com/blog/sd-wan-underlay).*

SD WAN typically consists of two parts. An overlay and an underlay. This article will cover the underlay.

And we can kick this off by saying that underlay is just a fancy term for connectivity.

I would hope this goes without saying but here it goes anyway, we need connectivity for SDWAN to work at all. Yes, you read that right. We need external connectivity to the outside world.

I know. EARTH shattering stuff there.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/10/apocalypse.png?w=284)

After all, the idea here is to get you off and running with your first WAN or to give you a nice shiny new version of the one you have now.

Take note of the image below. This is an Edgeconnect SD ROUTER from Silverpeak - an SDWAN vendor. You can see that even on this device there are two dedicated WAN ports, wan0 and wan1. We know that these are clearly WAN ports because it’s telling us that(obviously). What we don’t know is what are we allowed to plug into those ports?

![](https://artofnetworkengineering.com/wp-content/uploads/2020/10/silverpeak.jpg?w=803)

In this image we can see that we have two different Internet connections. Specifically, a Cable and DSL internet connection.

That being said, we aren’t limited to just using internet connections like the example. We have options and I have narrowed down them down to two distinct categories.

The first is just a standard internet connection, sometimes referred to as a “public” connection. The other is some type of managed wan or leased line often referred to as a “private” connection. I want to point out too that the options listed below are based in the United States. Names and connection types can vary from country to country.

## Typical Internet connection types

For the most part, these are geographically dependent. Meaning, if you live in a large metropolitan area you may be lucky enough to have all of these options at your fingertips. If you don’t live in a large city you might be in a different situation so T1’s and 4G LTE connections become the primary option. Normally that might be pretty limiting but with SDWAN we will see that it isn’t so much of a big deal any more.

Here are some of the main Internet connection types:

- **Cable internet**
- **DSL**
- **Fiber based Ethernet**
- **T1**
- **4G LTE**

All of these vary in their delivery method and price but most importantly their speed and quality. (Which are a big deal to Network Engineers like us)

There are other factors at play here as well and any good WAN architect will tell you it’s not all about the speed. So of course latency, jitter, and packet loss will all be considered as well.

## Managed connectivity options from your ISP

- **Metro Ethernet**
- **MPLS**

*\*There are other flavors of these connection types that are slightly different but the idea is pretty much the same so I have left those off the list. For a better look at some of the offerings, click* [*here.*](https://www.aaronengineered.com/blog/wan-for-dummies)

In the past, as a WAN architect, it would be your job to make sure that you aligned the company’s goals and the company’s budget into a nice pretty little package. It’s your job to sell the trade-offs. To better understand what this means, take a look at the above connectivity options. If you did not know, there is quite the price difference between a managed connectivity product like an MPLS and a cable modem that brings you Internet connectivity.

BUT…. we know that the reason you pay for a managed service is so that you can get things that you need. Those things are usually guarantees around up time, packet loss, jitter and latency just to name a few.

You see the applications that enterprises are using in todays networks are all very unique. Sometimes they come with strict requirements in the network and can’t tolerate any sort of inconsistency. And that’s ok because managed connectivity solves for that by basically guaranteeing that our traffic will get the white glove treatment.

The opposite end of this of course, is just a standard broadband internet connection. (See list above)

These are typically high-bandwidth and low-cost. That’s great if those are my only two requirements but as we read earlier, but that’s not always the case.

OK let’s make sure we are all on the same page here.

Private managed WAN’s - typically higher in price but definitely get you the guaranteed delivery you need.

Public Internet connections - low price, high bandwidth, low reliability.

I have to decide between the two options here. Or do I…

Well my friend, another feather in the cap of the SDWAN router is that it’s often underlay agnostic. Meaning, it doesn’t care what you plug into it. All connections are created equal.

Well not completely equal but pretty darn close. This just means that the SD Router is going to be looking at whatever you plug into it with a watchful eye. It’s going to be monitoring it for packet loss, jitter, and latency and report back to you with what it finds. On top of that, it’s going to make QoS decisions about what traffic to send and how much of it based on the current health of that link. Again, it doesn’t matter what that link does.

RAD.

## Putting it all together.

So how does this change the role of the WAN architect? Well for one, it makes the job a lot easier. Since I now have the freedom of picking whatever connection fits the budget best *or* picking the only service available to me based on geography I can get a LOT more creative in solving for the organizational goals of the company.

Remember from [my previous articles](https://www.aaronengineered.com/blog/sdwan-for-dummies) that SDWAN is all about efficiency. How it accomplishes that is by using insights and control. Putting that into context with the underlay - we have insights on how those regular internet connections are performing and make different QoS decisions based off that information to prioritize mission critical traffic in our WAN.

What being ‘underlay agnostic’ means to the SDWAN router is being able to compensate for some of the short-comings of lesser guaranteed connections. This is achieved by having multiple WAN links that are closely monitored. This in turn allows the router to make application routing decisions on the fly if one or more of the connections are not performing up to your pre-defined standards.

Hopefully this has given a bit more insight than you may have had previously. If you enjoyed what you read and would like to learn about something WAN or SDWAN related, find me on twitter at [@aaronengineered](https://twitter.com/aaronengineered).

Enjoy responsibly!
