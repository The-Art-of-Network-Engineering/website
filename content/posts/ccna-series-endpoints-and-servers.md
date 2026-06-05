---
title: "CCNA Series - Endpoints and Servers"
slug: "ccna-series-endpoints-and-servers"
publishedAt: "2021-05-31"
excerpt: "In this post of the CCNA Series, we will be covering endpoints and servers in the network. In the CCNA exam topics, we are looking specifically at Network Fundamentals > Explain the role and function of network..."
author: "Tim Bertino"
---

In this post of the CCNA Series, we will be covering endpoints and servers in the network. In the CCNA [exam topics](https://learningnetwork.cisco.com/s/ccna-exam-topics), we are looking specifically at Network Fundamentals > Explain the role and function of network components > Endpoints and Servers. While studying in-depth enterprise network infrastructure topics and concepts, I think it can be easy to gloss over why the network is there in the first place. I always like to think of the network as a service that is there to support business functions. Businesses utilize technology for many reasons, for example to become efficient, scalable, and to provide excellent outcomes. Typically, they look to implement and leverage applications to achieve these goals. Well, those applications need to be able to be accessed and hosted (or served) somehow. That is where endpoints and servers enter the picture. If enterprises didn't have endpoints and/or servers, then we wouldn't really have a need for networks, would we?

**Endpoints**

![](https://artofnetworkengineering.com/wp-content/uploads/2021/05/endpoints.png?w=722)

Endpoints are the actual devices that connect to our networks so that we can gain access to those business critical applications that we brought up earlier in the post. In the last [post](/blog/ccna-series-l2-and-l3-switches) around L2 and L3 switches, we introduced the concept of the three-tier architecture with the core, distribution, and access layers. As depicted in the image above, endpoints can be thought of as being at the edge of the network, so naturally, they connect to our access layer switches that provide initial connectivity or entry into the network at the edge. Endpoints can connect to the network either wired via directly connecting to a switch, or wirelessly, leveraging radio waves to connect to a wireless access point. Examples of common endpoints at the access layer are desktop and laptop computers, printers, phones, tablets, and scanners. Some endpoints, such as desktops and laptops are used to access applications and services, while other endpoints, such as printers, provide a service. For example, a laptop can communicate with a network attached printer to print documents. Endpoints in the network are used to gain access to services, as well as provide services themselves.

**Servers**

![](https://artofnetworkengineering.com/wp-content/uploads/2021/05/servers.png?w=640)

At a basic level, servers can be thought of as endpoints as well. They connect at the edge of the network just as end user endpoints do. The difference is that servers typically connect to the data center access layer versus the end user access layer such as a switch in a small data room on a floor of a building. It was stated earlier that businesses rely on the network to provide access to critical applications. Well, those applications are hosted on devices called servers. Servers can be physical (meaning typically one application per box), or virtual (meaning multiple apps/servers per physical machine). Also, servers can be hosted in on-premises data centers, external co-location facilities, as well as "in the cloud". Examples of applications or services hosted on servers are email, websites, ecommerce systems, and media servers. To round this out, in our enterprise business example, servers house the applications that provide value to the business.

**But Why?**

**Conclusion**

I think it is important to remember that the network is a service (or potentially even a utility, if you want to take it that far). In an enterprise setting, the network is necessary because access to applications and information drives a business forward. Client or user endpoints are leveraged to gain access to those business critical applications, and servers house or host those applications and information. The network is there to provide the connectivity from the client endpoints to the servers that host the applications.
