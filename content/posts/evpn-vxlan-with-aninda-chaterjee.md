---
title: "EVPN VXLAN, with author Aninda Chatterjee"
slug: "evpn-vxlan-with-aninda-chaterjee"
publishedAt: "2025-01-15"
excerpt: "The latest episode of the Art of Network Engineering podcast dives deep into the intricacies of using VXLAN and EVPN in modern networking. We’re joined by Aninda Chatterjee, a seasoned expert in the data center space..."
author: "Andy Lapteff"
coverImage: "/blog-images/evpn-vxlan-with-aninda-chaterjee.jpg"
---

The latest episode of the Art of Network Engineering podcast dives deep into the intricacies of using VXLAN and EVPN in modern networking. We’re joined by Aninda Chatterjee, a seasoned expert in the data center space who brings invaluable insights from his extensive experience at companies like Nokia, Cisco, and Juniper. The episode begins with a lighthearted discussion about personal lab experiences, highlighting the complexities network engineers often face. Aninda shares a cautionary tale about the importance of making one change at a time—a principle that holds true across all tech endeavors.

As we transition into the main theme of the episode, the spotlight turns to VXLAN. Aninda offers a comprehensive breakdown of what VXLAN is, describing it as a data plane encapsulation method that allows the transport of layer 2 Ethernet frames over a layer 3 network. He explains how VXLAN uses tunnel endpoints (VTEPs) to encapsulate packets, adding necessary headers that facilitate smooth communication between devices. One common question arises: Why complicate matters by adding multiple headers? The answer lies in VXLAN's ability to solve the challenges of modern data center architecture, which struggles under the weight of legacy designs.

As data centers have evolved, the traditional three-tier architecture has shown limitations, particularly concerning scalability and the ever-increasing demands of virtualized environments. Aninda elaborates on the shift from layer 2 to layer 3 connections, emphasizing how this transition provides predictable routing, efficient load balancing through Equal-Cost Multi-Path (ECMP), and a more resilient architecture. The concept of leaf and spine topologies is introduced, highlighting this modern approach to data center networking that prioritizes horizontal scaling over vertical scaling.

The discussion then transitions to EVPN—Ethernet Virtual Private Network—which plays a crucial role in managing MAC addresses within a VXLAN context. Aninda sheds light on how EVPN facilitates the transportation of layer 2 frames across a layer 3 infrastructure. He clarifies the significant departure from traditional flooding and learning methods toward a control plane based on BGP, allowing for efficient MAC address distribution across the fabric without the associated delays and inefficiencies of older methods.

Listeners gain insight into the complex technical solutions required for today's networking challenges. Throughout the episode, Aninda shares insights not just about implementations but also about the real-world applications, troubleshooting techniques, and high-stakes situations network engineers face. He emphasizes the importance of maintaining an understanding of the underlying technology, dispelling the myth that advanced automation can render troubleshooting redundant.

As the conversation progresses, both Andy and AJ engage Aninda in a series of banter-filled yet thoughtful inquiries, exploring not just the technical details but also practical applications faced in everyday network management. The episode closes with Aninda discussing his experience as an author of tech-related literature, underscoring the importance of making complex information accessible to the broader network engineering community.

Listeners are left with a wealth of information to digest, equipped with not just theories but actionable insights to take back to their environments. The episode is a must-listen for network engineers seeking to navigate the complexities of modern data centers and effectively leverage the power of VXLAN and EVPN in their infrastructure.
