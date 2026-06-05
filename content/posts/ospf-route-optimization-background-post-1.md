---
title: "OSPF Route Optimization - Background (Post 1)"
slug: "ospf-route-optimization-background-post-1"
publishedAt: "2021-02-08"
excerpt: "When it comes to global reachability within an organization, dynamic routing is a beautiful thing. There are multiple internal gateway protocols (IGPs) out there, but in this series of posts, we are going to focus on..."
author: "Tim Bertino"
---

When it comes to global reachability within an organization, dynamic routing is a beautiful thing. There are multiple internal gateway protocols (IGPs) out there, but in this series of posts, we are going to focus on OSPF. Taking this focus a step further, we will go through IP/subnet design and routing table optimization.

As with any task in network infrastructure, you need to understand your requirements before you can develop and present a design. With dynamic routing implementation, once you understand your requirements, then comes the fun part of design. To me, it's not just picking a protocol and off you go. You will want a routing domain that is simple, efficient, and scalable. The foundation for these pillars is IP address/subnet design.

**Simplicity** - Being able to quickly understand a network from a Layer 3 perspective is important when it comes to operations, troubleshooting, and future design. Having a well thought out IP scheme is essential.

**Efficiency** - Proper IP design allows for route summarization, which leads to smaller routing tables. This is good for both the routers and the network staff. The routers can perform lookups efficiently and the administrators/engineers can more easily understand the routing table. A happy engineer equals a happy network, right?

**Scalability** - This feeds off of efficiency. Summarization and smaller routing tables can scale well with the organization.

In this series of posts, we will go through an OSPF design example progressing from single area to multi-area OSPF to optimize routing tables throughout the OSPF domain. The topology itself is a simple hub and spoke design with a core at the "hub" connects to multiple outlying sites as the "spokes". Each spoke has a distribution layer switch with three access layer switches connected to it. This is a routed access design with IP routing all the way to the edge (access layer). This means that we do not have VLANs trunked between the distribution and access layer. In "traditional" routed networks, a strong, well thought out IP address design is incredibly important for efficiency and scalability. I put "traditional" in quotes because software defined networks with overlay technologies are really changing the game when it comes to routing and IP address design. Throughout this series, we will be thinking in terms of a traditional network exclusively.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/10/ospf-route_optimization.png?w=750)

With IP address design in mind, I decided to set up each site with its own /16 IP network. Each access layer switch has three subnets of the respective /16s attached, that are participating in OSPF. The reason behind this is for summarization and routing table efficiency and scalability. This will be seen and explained throughout this series. In the next post, we will see this topology built out as a single OSPF area to see that improvements can be made to support efficiency and scale.

As a refresher for this series, here is a list of OSPF LSA types:

- Type 1 - Router LSA
- Type 2 - Network LSA
- Type 3 - Summary LSA
- Type 4 - Summary ASBR LSA
- Type 5 - AS External LSA
- Type 7 - NSSA External LSA
