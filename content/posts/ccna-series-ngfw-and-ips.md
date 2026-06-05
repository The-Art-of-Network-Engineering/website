---
title: "CCNA Series - NGFW and IPS"
slug: "ccna-series-ngfw-and-ips"
publishedAt: "2023-08-14"
excerpt: "It is time to dig into some security on the CCNA Series! In the post, we will be covering Network Fundamentals > Explain the role and function of network components > Next generation firewalls and IPS of the exam..."
author: "Tim Bertino"
---

It is time to dig into some security on the CCNA Series! In the post, we will be covering Network Fundamentals > Explain the role and function of network components > Next generation firewalls and IPS of the [exam topics](https://learningnetwork.cisco.com/s/ccna-exam-topics). Devices implementing security functions are commonplace in organizations, and not just necessarily at the edge of networks. Specifically, when connected to the network, these devices can be used to enforce policy, or act as a passive sensor to alert when configured alarm conditions are met. Network security devices such as firewalls, intrusion detection systems (IDS), and intrusion prevention systems (IPS) can either be deployed in a physical or virtual form factor. What specific security devices are selected, how many are implemented, and where they are placed in the network will depend on the security requirements of the organization. In the rest of this post, we will take a deeper look at next generation firewalls (NGFW) and intrusion prevention systems (IPS).

**Next Generation Firewall (NGFW)**  
Before we get into describing a next generation firewall, let's first cover the concept of a traditional or packet filtering firewall. A traditional, packet filtering firewall is a physical or virtual security appliance that inspects traffic in one direction, typically up to Layer 4 of the OSI model. This means that configured policy and inspection will be able to look at IP addresses and TCP/UDP ports. In this case, 'one direction' means that the traditional, packet filtering firewall is *stateless*. The firewall is not tracking conversations. This means that if traffic is wanted to be allowed between two hosts or networks, separate rules need to be implemented to cover both directions of those conversations. A next generation firewall has the ability to take inspection and policy enforcment all the way through Layer 7 (application layer) of the OSI model. With an NGFW, administrators can set policy based on the type of application, rather than relying strictly on TCP/UDP port numbers. For instance, administrators could write a policy that blocks video streaming applications from all popular entertainment companies except one specific application. Next generation firewalls also understand conversation state. For example, if I want to allow a computer in one network to communicate with a server in another network throught the firewall, I just need to create one rule, and because the firewall understands the state of the flow, it automatically allows the return traffic from the server back to the original computer. Here are two images that compare the concept of a stateful next generation firewall, and a stateless packet filtering firewall.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/08/firewall.png?w=662)

Stateful firewall traffic flow from computer to server and back.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/08/firewall-2.png?w=662)

Stateless packet filtering firewall traffic flow from computer to server and back.

**Intrusion Prevention System (IPS)**  
The goal of an intrusion prevention system (IPS) is to monitor the network or a specific device for anomalous, malicious activity and take action to stop it from happening. Intrusion preventention systems can be network based (either physical appliance or virtualized) or host based, running in software on an individual client machine, protecting that specific device. A network based IPS will somehow sit inline of network traffic so that it has the ability to take action on that traffic (for instance by dropping it) when necessary. In contrast, a network based intrusion detection system (IDS) will typically not sit inline. It will be fed data by means such as SPAN/mirrored ports. Because it does not sit inline of the network traffic, it is not able to take action on active packets on the network. The goal of an IDS is to monitor and provide alerting when there is an event.  
  
**Conclusion**  
Many security devices, such as next generation firewalls (NGFW) and intrusion prevention systems (IPS) are integrated into the network, which means that network administrators and engineers should at least be familiar with them. In fact, because they participate in the network, firewalls will often provide networking functions such as routing (static and dynamic) and network address translation (NAT). So, even if a network administrator or engineer is not involved in the actual rule configuration firewall, there is a good chance they will get involved to support at least some of the network functions of that firewall.

**References**  
<https://www.vmware.com/topics/glossary/content/intrusion-prevention-system.html#:~:text=An%20intrusion%20prevention%20system%20(IPS,it%2C%20when%20it%20does%20occur.>  
  
<https://www.paloaltonetworks.com/cyberpedia/what-is-an-intrusion-prevention-system-ips>
