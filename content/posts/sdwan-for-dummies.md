---
title: "SDWAN for Dummies"
slug: "sdwan-for-dummies"
publishedAt: "2020-08-10"
excerpt: "This article originally appeared on Aaron's blog aaronengineered.com on Monday August 3 2020"
author: "aaronengineered"
---

*This article originally appeared on Aaron's blog [aaronengineered.com](http://www.aaronengineered.com/blog) on Monday August 3 2020*

#### SD-WAN defined.

If SD-WAN had to be defined in one word, it would be “efficiency”. So, that begs the question… are current networks inefficient?

You betcha.

There has long been a need for the WAN. Many businesses are distributed geographically and have the need to share resources across these locations. In fact, this is more common than not.

Unfortunately, at some point, the applications and data that we have been sharing across these WANs outgrew our ability to manipulate it efficiently across the current technologies we have transporting it thus making our networks inefficient.

If you want to learn briefly about some of the basics of legacy WAN technologies, check out my other post [here](https://plane-star-6bmm.squarespace.com/blog/wan-for-dummies).

This post aims to demystify SD-WAN and get to the roots of why it’s so revolutionary. You might find yourself at the end of this post wondering why this took so long to emerge in the marketplace. And you would be right in wondering that. These concepts are very basic. Yet the fly in the face of traditional WAN architecture. This makes the industry shift towards SD-WAN a generational moment.

Let’s start with an example of a traditional WAN.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/08/vpn.jpg?w=822)

In this example you can see we have two different branch offices connected with a traditional VPN. Nothing too special at all. Does it get the job done? Absolutely. And this is something I want to be clear about. It’s not that traditional WANs *don’t* get the job done. They do, and they do it well it most cases.

They could just be *so* much better.

Now if we look at the below image of how to configure the traffic to traverse the VPN we can then start to understand the simplicity of what we are dealing with here.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/08/vpn-decision-tree.png?w=770)

The picture illustrates two basic options. We have one Internet connection. When traffic enters the router destined for a remote network, a decision will be made that says whether you are to be sent over the VPN or not.

That’s it.

No fluff here.

Just a simple A or B decision. Since a router uses IP addresses to make forwarding decisions, you either fall into the first ‘bucket’ of IP addresses or the second. Once that simple decision is made, you are off on your merry way.

Like I pointed out before, there is nothing wrong with this at all. In fact, most WAN’s today operate on some version of this simplistic decision-making tree.

## There's so much more...

Like what you have read so far? Head on over to [Aaron Engineered's blog](https://www.aaronengineered.com/blog/sdwan-for-dummies) to learn more about SDWAN.
