---
title: "Swouter"
slug: "are-switches-and-routers-the-same-thing-anymore"
publishedAt: "2026-09-10"
excerpt: "Modern switches run BGP, build route tables, and forward packets between subnets at line rate. So is a switch a router now? One camp says the distinction is dead. The other says look at the hardware. They are both right, and that turns out to be the interesting part."
author: "Andy Lapteff"
coverImage: "/blog-images/are-switches-and-routers-the-same-thing-anymore.jpg"
---

A few weeks ago during a work call, I found myself in a passionate networking debate about something we should all agree on. Are modern switches and routers identical?

One camp says the distinction is dead. Modern switches started routing decades ago. They run BGP, build route tables, participate in EVPN fabrics, and forward packets between IP subnets at line rate. If I configure a routed interface on a data center switch and it receives an IP packet, performs a longest-prefix match, decrements the TTL, rewrites the Layer 2 header and forwards the packet out to another interface, what is it doing if not routing?

Fair argument.

The other camp says they're different, and points at hardware architecture, buffering, interface density, forwarding resources, service capabilities, QoS, scale and intended use. Also a fair argument.

So who's right? Annoyingly, both of them. The reason network engineers can argue about this for hours is that we're arguing about several different things while using the same two words.

## The simple answer we were taught

Most of us learned some version of this early on. A switch connects devices within a network, a router connects different networks. Or: switches forward frames using MAC addresses, routers forward packets using IP addresses.

That's still a useful teaching model. A traditional Layer 2 Ethernet switch learns source MAC addresses and builds a MAC address table, then looks at a frame's destination MAC to decide which interface should receive it. A router operates at Layer 3, examining the destination IP address, performing a lookup in its forwarding table, selecting a next hop, and rewriting the Layer 2 encapsulation as necessary.

Nice and clean. Also nowhere near sufficient to describe modern networking.

## Then we gave the switch a route table

Layer 3 switches complicate the story. Once a switch can maintain an IP route table and perform Layer 3 forwarding, the clean demarc falls apart.

Put two VLAN interfaces on a multilayer switch, 10.10.10.1/24 and 10.20.20.1/24. A host in the first subnet sends traffic to a host in the second. The switch receives the frame, recognizes that the destination MAC belongs to its Layer 3 interface, examines the destination IP, performs a Layer 3 lookup, selects the outgoing interface, decrements TTL, rewrites the Ethernet header and forwards the packet.

That's routing. There isn't an asterisk next to it. It isn't "switch-routing." The device routed the packet.

Today's data center switches go considerably further than inter-VLAN routing. Modern platforms run BGP, IS-IS or OSPF, carry huge numbers of routes, provide ECMP, build Layer 3 leaf-spine fabrics, terminate VXLAN tunnels and use EVPN as their control plane. Some data centers intentionally push Layer 3 all the way to the top of rack.

So if your definition of a router is simply a device capable of routing IP packets, your Layer 3 switch is a router. Functionally, at that moment, it is.

But that's where the "routers and switches are the same thing" argument goes too far.

## Capability is not the same thing as architecture

My pickup truck and a tractor can both pull a trailer. That doesn't make a pickup truck a tractor.

The fact that two platforms can perform the same function doesn't mean they were designed around the same requirements. This is where the conversation becomes much more interesting. Instead of asking "can this switch route?", ask "what was this platform optimized to do?"

That's a very different question.

A modern data center switch may be optimized around extremely high Ethernet port density, very high aggregate throughput, low latency, low cost and power per bit, predictable east-west forwarding, ECMP, VXLAN and EVPN, leaf-spine architectures, and large numbers of directly attached hosts.

A service-provider or edge router may be optimized around a different set entirely: very large routing and forwarding tables, sophisticated hierarchical QoS, deep buffering, MPLS and Segment Routing, large-scale BGP, internet peering, subscriber and service constructs, extensive traffic engineering, multiple transport requirements, control-plane resiliency, and advanced telemetry and OAM.

There is significant overlap between those lists, but they aren't identical.

## But they both use ASICs now

This is where another historical explanation causes trouble. You may have been taught that switches forward packets in hardware while routers forward packets in software. That used to help distinguish certain classes of products. It is not a useful distinction today, because high-performance routers also forward in hardware.

Modern networking equipment separates the control plane from the forwarding plane. The control plane runs BGP, IS-IS, OSPF, EVPN and the rest to determine reachability, and those results program forwarding information into hardware. Once the forwarding plane is programmed, specialized silicon performs lookups and forwarding at enormous rates. Modern switches do this. Modern routers do this.

The interesting question isn't hardware or software. It's what kind of forwarding hardware, and what it was designed to accomplish.

## Merchant silicon changed the conversation

This is most obvious in the data center. The rise of extremely capable merchant switching silicon dramatically expanded what we can do with devices we traditionally called switches. One ASIC can support enormous Ethernet bandwidth while also handling sophisticated Layer 3 forwarding, tunneling, ACLs, telemetry and ECMP.

That allowed data center architectures to become increasingly routed. Instead of building giant Layer 2 domains and routing them upstream, we build Clos fabrics where leaf and spine devices exchange routes via BGP. The "switches" are routing, constantly. IP routing is one of their primary jobs.

At that point, calling something a switch tells you less about whether it routes and more about the class of platform and the environment it was optimized for.

## The forwarding tables tell part of the story

Another useful distinction is forwarding resources. A switch might need to maintain MAC address entries, IPv4 and IPv6 routes, ARP and neighbor entries, ACL entries, VXLAN tunnel information, EVPN state and multicast entries. Those consume finite hardware resources, and depending on the ASIC, some may come from shared or configurable tables.

A platform intended to sit on the internet edge faces a very different requirement. It may need massive routing tables and large numbers of next hops while simultaneously supporting MPLS labels, policy, traffic engineering and services.

So saying "my switch runs BGP, therefore it's equivalent to this service-provider router" misses the point. Running BGP isn't the hard part. The interesting question is what happens when you ask the platform to maintain and forward the amount and variety of state the deployment demands.

## Buffers matter

Different network environments experience different traffic patterns. Inside a data center, designers often optimize for enormous bandwidth, low latency and predictable Clos-style fabrics. At aggregation points and WAN edges, traffic may arrive from interfaces operating at dramatically different rates, or encounter sustained congestion. That creates different buffering requirements, which is why some router platforms provide much deeper buffering than platforms built for low-latency data center switching.

This isn't an absolute rule. There are deep-buffer switches, shallow-buffer platforms, and many architectures in between. That's precisely the point: "does it route?" doesn't tell you enough about the hardware.

## QoS is another example

Both switches and routers support QoS. That statement tells us nothing.

The meaningful questions are how many queues, how sophisticated the classification is, how scheduling works, how much buffering is available, whether you can implement hierarchical QoS and at how many levels, what happens during congestion, and whether policies can be applied at the scale the application demands.

A campus switch prioritizing voice traffic and a service-provider router implementing complex subscriber policies both "support QoS." Those three words hide enormous architectural differences.

## Interfaces used to make this easier

There was a time when you could almost identify the device by looking at the front of it. Forty-eight Ethernet access ports? Probably a switch. A collection of WAN interfaces? Probably a router.

That distinction has weakened considerably, because Ethernet won. Routers have lots of Ethernet interfaces. Switches have routed Ethernet interfaces. 400G and 800G Ethernet appear throughout modern networks, and coherent optics have pushed Ethernet platforms into roles that once required much more specialized equipment.

Physical appearance no longer gives you the answer it once did.

## And then there's the network operating system

The NOS blurs the boundary further. A modern network operating system can expose switching, routing, EVPN, VXLAN, MPLS, telemetry and automation APIs across multiple hardware platforms. The identity of a box increasingly comes from the combination of silicon, hardware architecture, NOS, enabled features and intended role, rather than from any clean Layer 2 versus Layer 3 boundary.

Nokia's 7250 IXR is a fun example. IXR literally stands for Interconnect Router. Yet Nokia also positions 7250 IXR systems as data center switching platforms for leaf, spine and super-spine roles.

So what is it? A router? A switch? Yes. And that isn't marketing nonsense, it illustrates how fuzzy these categories have become.

## Maybe we're asking the wrong question

"Is this a router or a switch?" is the wrong question. The better questions are what role the device is performing, what capabilities that role requires, what the hardware is optimized for, what scale it supports, and what compromises were made in its design.

Imagine two devices. Both have 32 high-speed Ethernet interfaces, both run BGP, both support IPv4 and IPv6, both perform line-rate Layer 3 forwarding, both support EVPN and VXLAN. On a whiteboard they look almost identical.

But one may be optimized as a data center leaf with enormous bandwidth and low latency at an aggressive cost-per-port. The other may provide deeper buffers, larger forwarding tables, more sophisticated QoS, MPLS and Segment Routing, extensive OAM and service-provider functionality.

Calling both "routers" because they route packets loses useful information. Calling one "just a switch" because it lives in a rack full of servers is equally misleading.

## So, are switches routers?

A switch can route without becoming equivalent to every device we call a router. A router can switch Ethernet frames without becoming equivalent to every device we call a switch.

At the packet-forwarding level, the distinction has become blurry. At the product architecture level, meaningful differences remain. That's the nuance that gets lost in the religious debate.

"Switches can route" is true. "Therefore switches and routers are the same thing" is too simplistic. It's like saying servers and laptops are the same because both execute x86 instructions. Technically interesting, operationally useless.

## The labels have value

I don't think we need to throw away the words "router" and "switch." They still communicate something. If you tell me you're installing a 48-port access switch, I have a reasonable mental model of what you're doing. If you tell me you're installing an internet edge router receiving full BGP tables from multiple providers, I have a very different one.

If you tell me you're building a BGP EVPN leaf-spine fabric, though, now things get interesting. Those leaf and spine devices might be marketed as switches, routers, interconnect routers or something else entirely, and I don't particularly care.

Tell me about the architecture. The forwarding silicon. The buffers. The forwarding tables. The services. The port density. The traffic patterns. Tell me what happens when something fails, and what problem the device was designed to solve.

Because in modern networking, what a box does matters more than what somebody printed on the front of it.

If you still want to argue about whether it's technically a router or a switch afterward? Fine. That's what social media is for.

/Andy
