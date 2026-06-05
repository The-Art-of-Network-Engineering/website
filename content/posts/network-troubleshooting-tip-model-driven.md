---
title: "Network Troubleshooting Tip - Model Driven"
slug: "network-troubleshooting-tip-model-driven"
publishedAt: "2021-03-15"
excerpt: "No matter what the specific role, as an IT professional, you are going to be tasked to solve problems. Whether you are in a direct support role, part of an escalation team, or on the architecture/engineering team, you..."
author: "Andy Lapteff"
---

No matter what the specific role, as an IT professional, you are going to be tasked to solve problems. Whether you are in a direct support role, part of an escalation team, or on the architecture/engineering team, you are potentially seen as someone who "fixes all the things". Sometimes though, I think it can be easy for us to fall into a trap of quickly jumping to conclusions and getting "into the weeds" in potentially an incorrect direction. I'll admit, I am definitely guilty of this from time to time. This can be for many reasons, from we feel pressured to find a resolution quickly, to assuming that problem is more technical than it is just because it seems somewhat similar to something that happened in the past. In this post, we'll go through a high-level troubleshooting method that I like to use when problems arise.

In our studies to become IT/Network professionals, one thing that is good to learn or at least know of, is the OSI (Open Systems Interconnection) Model. The OSI Model is a framework that can be used to standardize and understand the different components of a network or computing system. Here is a list of the layers of the OSI model and how they are displayed.

- 7 - Application
- 6 - Presentation
- 5 - Session
- 4 - Transport
- 3 - Network
- 2 - Data Link
- 1 - Physical

Now, don't worry. I'm not going to go in depth on each layer, nor am I an expert in each. I mainly just wanted to show the full model list to help explain my thought process when troubleshooting. I will not say that I use this as a definitive method and have to exhaust each layer before even thinking about the next. I merely like to think of the OSI Model as a high level guide to help get mind right went sifting through problems. Thinking through at least parts of this model give me a starting point and keep me in check from getting deep "into the weeds" before it is necessary to do so. An example of this is, for a connectivity issue, should I really be looking in routing tables for a potential problem before I've even validated power and physical connectivity of the problem device(s)? At least keeping the OSI Model in mind can keep me on a more narrow path to trying to find that problem resolution quickly. Here are some examples (not an exhaustive list) that can be used in troubleshooting when thinking about some of these layers (typically in this layer order). Like eluded to in the previous example, I find it helpful to take a bottom-up approach when looking at the OSI Model.

1. Physical
   - Is all of necessary equipment powered and booted properly?
   - Are all of the proper physical connections made and functioning without apparent errors?
   - For wireless, is the device (or devices) able to associate and authenticate to the proper SSID?
2. Data Link
   - Are MAC addresses being learned on switchports?
   - Is Spanning Tree Protocol configured and functioning the way we expect?
3. Network (this a "fun" one)
   - IP Addressing
     - Are devices that are configured for DHCP receiving IP addresses?
     - Are devices that are set statically configured properly? By properly, I mean with:
       - A unique IP address.
       - A correct subnet mask.
       - A correct default gateway address.
       - Correct DNS servers.
       - A good reason to be set with a static address.
         - I bring this up with just a slight bit of snark here. Statically configuring devices with IP information adds a level of complexity and extra room for error (and I am specifically referencing static configuration, not DHCP reservations by MAC address). There are however, reasons to leverage statically configured IP addresses, so I will not say that they are no use cases.
   - Routing
     - Does the router have a correct ARP entry for the device(s).
     - Are routes being learned or statically defined correctly?
     - Ping and traceroute are your friends.
   - Security
     - Layer 3 (Network Layer) and above is where I really start to consider security factors in troubleshooting such as access control lists (ACLs) and/or true firewall rules.
4. Transport
   - Security/ACL/Firewalling.
5. Session
   - Not a layer I specifically consider in at least initial, high level troubleshooting.
6. Presentation
   - Not a layer I specifically consider in at least initial, high level troubleshooting.
7. Application
   - Is the application functioning or being used/accessed as expected?
   - Security/ACL/Firewalling.

To close this out, I am by no means saying to print out the OSI Model, keep it next to you always, and follow it as an exact step by step troubleshooting method. I am more suggesting to leverage this model to give yourself somewhere to start, and some guidelines, when troubleshooting. We all want to resolve issues quickly and efficiently to keep our customers/clients/co-workers happy, and so we can get on to the next fun and exciting adventure!
