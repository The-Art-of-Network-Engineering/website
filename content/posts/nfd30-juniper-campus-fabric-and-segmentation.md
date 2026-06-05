---
title: "NFD30 - Juniper Campus Fabric and Segmentation"
slug: "nfd30-juniper-campus-fabric-and-segmentation"
publishedAt: "2023-01-20"
excerpt: "Major goals for enterprise campus networks are flexibility, reliability, and security. With legacy networks, it sometimes seems to be difficult to get all three in one solution. For example, to build flexible networks,..."
author: "Tim Bertino"
coverImage: "/blog-images/nfd30-juniper-campus-fabric-and-segmentation.jpg"
---

Major goals for enterprise campus networks are flexibility, reliability, and security. With legacy networks, it sometimes seems to be difficult to get all three in one solution. For example, to build flexible networks, we would end up spanning VLANs across many switches and potentially compromising reliability. One solution to this is to adopt the underlay/overlay concept of building fabrics. With fabrics, we can build stable and scalable Layer 3 end-to-end underlay networks and then leverage technologies such as LISP and VXLAN (as examples) to build our flexible networks in which users and devices can roam the infrastructure and maintain their Layer 2 and Layer 3 adjacencies as needed. [Juniper](https://www.juniper.net/) provides this level of flexibility, reliability, and security through their Campus Fabric solution, managed by [Mist AI](https://www.juniper.net/us/en/products/mist-ai.html).

Juniper presented at Networking Field Day 30 ([NFD30](https://techfieldday.com/event/nfd30/)) and told the story of how they are helping their customers build campus fabrics from the Mist AI cloud platform, with security tagging and enforcement embedded into the infrastructure. This solution is just part of their overall goal to provide "[Experience-First Networking](https://blogs.juniper.net/en-us/driven-by-experience/experience-first-networking-delivering-a-modern-customer-experience)".  
(\*\*\*Don't blame Juniper for the image quality. I took these as screenshots from their NFD30 presentation. Blame me, I deserve it.\*\*\*)

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/experience_first_networking.png?w=800)

As stated earlier, campus fabrics provide us some benefits over legacy networks. Juniper presented those benefits as follows:

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/campus_fabric_solutions.png?w=800)

Next, Juniper understands that customers may be in different stages of their campus network journeys. Due to this, when standing up a campus fabric, they provide you with three topology architecture options. This flexibility allows customers to decide how far they want to take their EVPN-VXLAN fabrics.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/campus_fabric_architectures.png?w=800)

One more concept that I want to cover out of Juniper's Campus Fabric solution is around security; specifically around authentication and authorization. Over the years (like it or not), the network infrastructure has become a natural security sensor and policy enforcement point. There are a few different ways of accomplishing this in enterprise campus networks. One of these methods involves leveraging a Radius solution to determine authentication and authorization actions, then instructing the infrastructure implement that authorization policy via VRFs, VLANs, ACLs, and/or some sort of packet tagging. Juniper's Campus Fabric solution allows for this method. They implement Group Based Policy so that you can enforce VRF, VLAN, ACL, and tag based segmentation. You can create and set static security tags (which get added into the VXLAN header), but the more common and dynamic method seems to be leveraging a Radius solution to perform dynamic tagging, as mentioned earlier.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/group_based_policy.png?w=800)

One thing that I thought was particularly interesting is that Juniper supports scalable group tag enforcement at either ingress *or* egress. In having a great chat with [Jordan Martin](https://twitter.com/bcjordo), we discussed that while ingress enforcement *seems* more efficient from a bandwidth perspective, something to keep in mind is that the entire database of tag policy has to be downloaded to the switch to be able to support that level of enforcement. That has the potential of causing TCAM concerns. Whereas, if you allow the packet to traverse the network to the destination switch, the destination switch only needs to do a lookup to the policy database for the given source and destination to decide whether to permit or deny the packet. In typical campus networks, maybe egress enforcement isn't a big deal because we may not be worried as much about potential inefficient use of bandwidth.

---

Campus fabrics, or the concept of underlay/overlay networks can help organizations achieve all three goals of flexibility, reliability, and security. In Juniper's case, they lean into the cloud based Mist AI platform to perform that fabric management plane function for their customers.

As far as this NFD 30 presentation, I have to give the Juniper team a lot of credit. The delivery was very engaging and flowed very well from presenter to presenter. As questions were asked, each presenter seemed to jump in effortlessly when it was a topic within their expertise. They clearly work very well together. Also, I appreciate that the product management team maintains close relationships with their customers so that are able to operate a strong feedback loop. They truly seem to want to make sure that they are developing products and solutions based off of real customer need and desire. I had a great time participating in this presentation.
