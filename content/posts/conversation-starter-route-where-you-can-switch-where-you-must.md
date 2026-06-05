---
title: "Conversation Starter: Route Where You Can, Switch Where You Must?"
slug: "conversation-starter-route-where-you-can-switch-where-you-must"
publishedAt: "2020-08-17"
excerpt: "This article was written by Tim Bertino, and first appeared on his blog neticaded.com"
author: "Tim Bertino"
---

*This article was written by Tim Bertino, and first appeared on his blog [neticaded.com](https://neticaded.com/2020/04/12/conversation-starter-route-where-you-can-switch-where-you-must/)*

Disclaimer: There is a fair amount of my opinion in this post. I welcome feedback, especially on anything that doesn’t seem right.

When discussing and thinking about campus networking, I go back and forth on where the L2/L3 boundary should be placed. In a traditional three tier architecture of core, distribution, and access, how far toward the access layer should we take routing? Of course, that answer is probably the all popular “it depends” reply.

![](/blog-images/conversation-starter-route-where-you-can-switch-where-you-must/223677.jpg)

Image courtesy of Cisco Systems

My thought is that with multi-layer switches being common for some time now, and that modern switches (depending on what you’re dealing with) can function at Layer 2 and Layer 3, taking routing all the way to the access makes sense. My reasoning behind this is simplicity and bandwidth. Spanning Tree Protocol does its job well, but if I don’t even have to think about STP, generally I’m happy. On the bandwidth side, leveraging Layer 3 means we can reap the benefits of Layer 3 Equal Cost Multi-path (ECMP).

![](/blog-images/conversation-starter-route-where-you-can-switch-where-you-must/223681.jpg)

Traffic recovery in a hierarchical design. Image courtesy of Cisco Systems.

That all being said, any design should be approached by understanding the business requirements. Is there a business need to have VLANs span multiple switches? If so, and if there is no overlay technology in play, then Layer 2 from distribution to access is necessary, which is still a valid design. Also, to maintain redundancy and utilize more physical links, Mutlichassis Etherchannel (MEC) supported designs can be deployed.

In conclusion, I think it is great to have standards to strive to implement, however you always need to be mindful of business requirements. I do think that overlay technologies will continue to become more prevalent and allow for standard underlay designs of Layer 3 to the edge (access layer) while the overlay handles any Layer 2 extension requirements.
