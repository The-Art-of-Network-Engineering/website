---
title: "CCNA Series - Routers"
slug: "ccna-series-routers"
publishedAt: "2021-05-03"
excerpt: "In the first ever post of the AONE CCNA Series, we are going to start from the top. If you are following along on the CCNA exam topics, we will be covering Network Fundamentals > Explain the role and function of network..."
author: "Tim Bertino"
---

In the first ever post of the AONE CCNA Series, we are going to start from the top. If you are following along on the CCNA [exam topics](https://learningnetwork.cisco.com/s/ccna-exam-topics), we will be covering Network Fundamentals > Explain the role and function of network components > Routers. Routers represent a critical component of network infrastructure in that they connect networks together, both physically and logically. What do we mean by logically? Well, the main purpose of a router is to receive data, find out where it needs to go, and send it out the interface (or port) in the right direction. Routers operate at Layer 3 of the OSI model, which means that they "route" or forward packets (data) based on the packets' destination IP addresses. IP addresses can also be referred to "logical addresses", and they signify the logical location of a device in a network. The IP address of a device can and may need to change depending on its movement in a network. MAC (or physical) addresses are a contrast to IP addresses in that they describe more of a physical location of a device in a network (at Layer 2). In fact, each device is said to have a "burned in address" or BIA, which is a device's MAC address at Layer 2. This is a "permanent" address that the device keeps and uses no matter where it lives or moves within a network. But that's enough about Layer 2 and MAC addressing for now, we're here to talk about routers. Now that we know that a router's purpose is to get data from one place in a network to another, let's get into what routers might look like and how they perform this ever-important function of delivering our precious packets from point A to point B.

![](https://artofnetworkengineering.com/wp-content/uploads/2021/05/routers.png?w=760)

Example logical representation of routers in a network.

What do routers look like? They can come in a variety of brands, shapes, sizes, and sometimes the routers themselves are not even physical at all. Yes, we can deploy routers as virtual machines just like traditional virtual servers. And while we are focusing on enterprise networking because this is a CCNA series, routers are leveraged in residential networks as well. If you are connecting personal/home devices to the internet you are leveraging a router to provide connectivity to the internet for all of the devices on your home network. Think of the router as bridging a gap between your local network and the internet.

Finally, let's go over how routers provide the functionality of transporting data across networks. As stated earlier, routers make their packet forwarding decisions based on the destination IP address in the packet header. That's all well and good, but how do routers learn about networks and how to reach them so that they can forward packets in the right direction and along the correct path the proper destinations? Routers learn how to reach destination IP networks from three sources.

1. Connected networks/routes
   - When an interface is configured with an IP address and enters an "up" state, the network associated with that interface is automatically entered into the routing table. The router now knows what networks are directly connected to itself and which interfaces to use, to forward packets out toward those networks.
2. Static routes
   - Network administrators can manually program the router with static routes for specific destination networks.
3. Dynamic routing protocols
   - Routing protocols can be enabled and configured on routers to communicate with each other and share routing information.

Once a router has enabled a way or ways or learning routes, it has to know which proper paths to choose when it receives packets. The best path(s) for each destination network is placed into the routing table, which is a database on the router that, at a high level, lists each destination network, the next hop IP, and egress interface to reach each destination network. Here high level sequence of operations that a router goes through when selecting the best path to reach a destination network for a packet it has received.

1. Longest prefix match
   - This can be thought of as the rule of specificity and is the first method used for path selection. The route in the table with the most leading bits in the "on" position in the subnet mask will be chosen. An example of this logic is:
     - A router receives a packet to forward with a destination IP of 192.168.1.200.
     - The router has two routes in its routing table that match this destination:
       - 192.168.1.0/24
       - 192.168.1.128/25
     - In this case, the route that matches the 192.168.1.128/25 network will be chosen because it is more specific, in that it has one more bit in the "on" position than the route with the /24 bit mask.
2. Administrative Distance (AD)
   - Routing protocols (OSPF, EIGRP, etc.) leverage metrics when determining the route to select when there are multiple routes learned to the same destination. However, the metrics used are only understandable to the given routing protocol. So, what does a router do when it learns the same route from different routing source types (for instance, a route learned both by a static route and EIGRP). A concept called Administrative Distance is leveraged to determine which route will enter the routing table.
   - Administrative Distance is a "trustworthiness" value (from 0 to 255) assigned to different routing sources so that when a router learns about the same route from different sources, it can decide which route to install into the routing table and use. The lower AD value is preferred.
3. Routing protocol metrics
   - When a router receives multiple routes to the same destination from the same source (for instance, OSPF), it leverages the routing protocol's metric values to determine which route(s) should be selected for the different destination networks. Examples of routing protocol metrics that are used by different routing protocols are hop count, cost, bandwidth, and delay.

**But Why?**

Why do we build computer networks and need routers?

**Summary**

There is definitely a lot that can be covered here about routers, but we want to keep these posts in consumable chunks. We have also highlighted some topics that we can go into more depth later on down the road. I think a big takeaway to remember here is that routers are a core component of network infrastructure and are responsible for moving packets through different Layer 3, (or "routed") networks.
