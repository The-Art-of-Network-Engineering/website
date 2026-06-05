---
title: "CCNA Series - Automation and Programmability"
slug: "ccna-series-automation-and-programmability"
publishedAt: "2022-01-03"
excerpt: "In this article, we are going to discuss several parts of Section 6 - Automation and Programmability of Cisco CCNA Syllabus. Programmability and Automation are two huge and very hot topics in the world of Networking...."
author: "Andy Lapteff"
---

In this article, we are going to discuss several parts of Section 6 - Automation and Programmability of [Cisco CCNA Syllabus](https://learningnetwork.cisco.com/s/ccna-exam-topics). Programmability and Automation are two huge and very hot topics in the world of Networking. Having Programmability and Automation skills is practically a requirement - so many organizations are adopting it. This article hopes to cover sub-sections 6.1, 6.2, and all of 6.3.

![](https://artofnetworkengineering.com/wp-content/uploads/2021/11/image.png?w=763)

First, we should address the age-old question - Will Network Automation replace Network Engineers? No, this is a very common misconception. Automation is ultimately about consistency. Doing the same task over and over again manually can introduce human error. Sometimes these errors, while not catastrophic in nature, can be problematic and cause downtime.

An infamous example is adding a VLAN to switches throughout your network. In order for the VLAN to work properly, it needs to be created on each switch and then allowed on the trunk links that interconnect the switches. When adding the VLAN to the trunks a very common mistake is to forget the "add" keyword which will remove all VLANs that are tagged on the trunk and then allow the new vlan only. This simple fatal mistake has sent many a network engineers running with their laptop and console cable in hand.

A quick word about the above - This is a very common mistake. You will make this mistake in production and it will cause problems. But, find comfort in the fact knowing that many other network engineers that came before you have made that same mistake.

When using network automation you can get the syntax for the commands you need to send correct once, and then let automation do the rest for you. But, be aware. Automation is the tool that you use to deploy that thing over and over again. If you make a mistake it will do that mistake over and over again. So, always test your code before deploying it.

### Automation and Network Management

Automation has changed the way we manage networks. In a traditional network, everything is done manually. From the deployment of new switches, updates to standard or baseline configurations, and deploying new network services are all done by the network operator.

In SDN (Software Defined Networking) Controller-based networks, a lot of the mundane repetitive tasks are handled by the controllers. Some examples of controllers in Cisco-based soltuions are: DNA Center in SD-Access, vManage in SD-WAN, and the APIC in ACI. The controllers handle all of the configuration deployment, as well as software upgrades, services deployment, applying security policy, and can even handle deploying new networking devices with Plug-and-Play or ZTP (Zero Touch Provisioning). This allows the network operator to focus on higher-level tasks like designing the network for scale and to best support the business, support operations, and more, like making progress on projects and other tasks.

### The 3 Planes

In any networking device there are three planes of operation: The Management Plane, the Control Plane, and the Data Plane.

![](https://artofnetworkengineering.com/wp-content/uploads/2021/11/3-planes.png?w=531)

The Managment Plane is how the Network Operator accesses the devices and manages it. Whether it's through SSH, HTTPS, or a Secure API and manually or via automation tools the Management Plane is where this takes places. This how the Operator tells the network device to function.

The Control Plane is where the device makes forwarding decisions. If we're talking about a router then this is where Routing Protcols live, the routing table, and so forth.

The Data Plane is where traffic ingresses and egresses the device. This is literally the data being sent across the network, from an end user device out to a web server on the internet.

In a traditional network these three planes live on each and every device in the network. If you need to deploy a new security policy or update an existing one then you need to access the management plane on EVERY device in the network, or at least where the policy update is applicable, and update or apply the new rules. This is where Controller-Based networks make a huge impact.

In a Controller-based network the Management Plane is the Controller. This is where the Network Operator manages the network, regardless of how many network devices there on. The Control plane pushes the configuration, as described by the network operator, down to the devices. The networking devices themselves are the forwarding plane and just move traffic based on the instructions provided by the Controller. Let's take a closer look at this in practice in Cisco's SD-WAN.

![](/blog-images/ccna-series-automation-and-programmability/sdwan-planes.jpg)

In Cisco's SD-WAN (Software Defined Wide Area Network) you have several pieces that fit within the 3 planes.

Within the Management Plane you have vManage, vBond, and vAnalytics. vManage is administrative interface for the rest of the network. vBond is the Orchestrator. When a device comes online either for the first time or after a reboot the device reports to vBond first and vBond will provide the device with the information on how to reach vManage and the rest. vAnalytics takes in all of the telemetry data and turns that data into useful information to be consumed by the network operator so they can make informed decisions about their network.

Within the Control Plane are vSmart Controllers. These controllers take the instructions from vManage and push the configuration down to the devices. They can also control the routing table for each device.

The Data Plane is composed of the routers themselves. In the above example it's the vEdges, which is simply a Cisco SD-WAN capable router.

### Overlay, Underlays, and Fabrics

Overlays, Underlays and Fabrics are very common terms that you'll hear when discussing Controller Based networks. If you've ever looked at GRE or IPsec Tunnels across a network, like the Internet, then you already familiar with Overlays and Underlays.

![VPNTunnel Anonymous Internet. Your private network security.](/blog-images/ccna-series-automation-and-programmability/imageedit_23_2459998402.jpg)

In the example of a GRE or IPsec tunnel operating over the Internet, the Internet is the Underlay network. It provides the networking connectivity from one endpoint to the other. The Overlay is the tunnel being formed over top of the internet. The underlay is just forward traffic, it really has no knowledge of the overlay.

In, for example, a Cisco Secure SD-Access network the underlay is composed of network devices that move traffic. They don't really even need to be Cisco devices, or understand what SD-Access is. However, the edge devices need do, because they use the overlay protocols to initiate communications.

Going back to our previous example of IPsec tunnels across the internet - the internet routers are not speaking or using IPsec to form the tunnel, they are just routing packets using protocols like BGP. The end-point devices like laptop and firewall pictures above are using IPsec in the overlay. In an SD-Access network the underlay is using a routing protocol like OSPF, and the overlay uses protocols like VxLAN or LISP - more on those later. But, only edge switches and routers need to understand LISP and VXLAN in order for the Overlay to work.

Finally, the Fabric. This term is used often and simply refers to the network where the overlay and the underlay are operating. Once you exit that you have left the fabric and are back in a traditional network, or perhaps a different fabric. Again, back to the IPsec tunnel examples, once the packet has arrived to the destination firewall it is exiting the fabric and entering the Enterprise network. That network maybe a Cisco SD-Access Fabric, so it's exiting one Fabric and entering another one. The Fabric is just a term for controller based networks, and not just a traditional network.

### APIs

First off, what is an API - an API stands for Application Programming Interface. It's a way for someone to interact with a piece of software and APIs can even be configured to interact with each other. The API enables automation and programmability, as well as Orchestration. API's typically use standard HTTP calls, which are verbs like GET, POST, PUT, DELETE, and PATCH. This of the HTTP GET like the Cisco CLI version of show. The show command lets you view configuration. The HTTP GET will let you view information as well.

The network operator can use tools and the verbs to get information and then send configuration changes. Automation and scripting can be used to make these changes as well. Additionally, when one system sees certain changes or things happening in the network they can be configured to send API calls to other APIs on other controllers. This is very common in the Data Center. You'll have an API on the ACI controller, called the APIC that interacts with the virtualization controller, in VMware known as vCenter.

These are two different interactions. When a Network Operator is interacting with an API, or two APIs are interacting with each other, this is a Northbound API interaction. When the API is interacting with network, or other, devices that it controls, this is the Southboud API interaction.

![](https://artofnetworkengineering.com/wp-content/uploads/2021/11/northsouthapi.png?w=503)

## Summary

In this article we discussed sub-sections 6.1, 6.2, and 6.3 including 6.3a and b of the Cisco [CCNA 200-301 Syllabus](https://learningnetwork.cisco.com/s/ccna-exam-topics). This article should be considered a starting point for the topic and may not be comprehensive enough to fully prepare the learner for the Cisco 200-301 CCNA exam.
