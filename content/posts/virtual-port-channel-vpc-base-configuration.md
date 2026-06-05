---
title: "Virtual Port Channel (VPC) – Base Configuration"
slug: "virtual-port-channel-vpc-base-configuration"
publishedAt: "2020-08-28"
excerpt: "This article was written by Taylor and first appeared on his blog on ucadministrator.com"
author: "VirTaylor"
---

*This article was written by [Taylor](https://twitter.com/UCAdmin) and first appeared on his blog on [ucadministrator.com](https://blog.ucadministrator.com/2019/09/02/virtual-port-channel-vpc-base-configuration/)*

## Overview

In my last post, we talked about some differences between traditional port channels and virtual port channel found on the Nexus line of switches. If you have not seen it, make sure to check it out [here](https://blog.ucadministrator.com/2019/08/06/virtual-port-channel-i-though-it-was-port-channel/). Now that you understand some differences, its time to jump into the required configuration.

## Configure

There are a few main steps that need to be done to configure VPC. The first step is to enable the VPC feature. This is done with the following command and will need to be done on both switches.

```
NEXUSSWITCH(CONFIG)#FEATURE VPC
```

Once the feature has been enabled. Its time to create the VPC Domain. The commands are shown below. Replace xxx.xxx.xxx.xxx and yyy.yyy.yyy.yyy with the IP address of your switch. Each switch will have these addresses reversed as the source and destination will change.

```
NEXUSSWITCH1(CONFIG)#VPC DOMAIN 1
NEXUSSWITCH1(CONFIG-VPC-DOMAIN)#ROLE PRIORITY 24576
NEXUSSWITCH1(CONFIG-VPC-DOMAIN)#PEER-KEEPALIVE DESTINATION XXX.XXX.XXX.XXX SOURCE YYY.YYY.YYY.YYY
NEXUSSWITCH1(CONFIG-VPC-DOMAIN)#EXIT

!Move to Switch 2

NEXUSSWITCH2(CONFIG)#VPC DOMAIN 1
NEXUSSWITCH2(CONFIG-VPC-DOMAIN)#ROLE PRIORITY 28672
NEXUSSWITCH2(CONFIG-VPC-DOMAIN)#PEER-KEEPALIVE DESTINATION YYY.YYY.YYY.YYY SOURCE XXX.XXX.XXX.XXX
NEXUSSWITCH2(CONFIG-VPC-DOMAIN)#EXIT
```

The priority value should be different between both of your switches. I typically use the same values as STP. This is more of an OCD thing for me… There is absolutely no requirement to do this and remember that the switch with the lower value will become primary.

Once the domain has been created. Its time to create the peer-link. It can be done with the following commands:

```
NEXUSSWITCH(CONFIG)#INTERFACE PORT-CHANNEL1
NEXUSSWITCH(CONFIG-IF)#DESCRIPTION VPC PEER-LINK
NEXUSSWITCH(CONFIG-IF)#SWITCHPORT MODE TRUNK
NEXUSSWITCH(CONFIG-IF)#SPANNING-TREE PORT TYPE NETWORK
NEXUSSWITCH(CONFIG-IF)VPC PEER-LINK
NEXUSSWITCH(CONFIG-IF)#NO SHUTDOWN
NEXUSSWITCH(CONFIG-IF)#EXIT
 
NEXUSSWITCH(CONFIG)#INTERFACE ETHERNET1/31-32
NEXUSSWITCH(CONFIG-IF)#DESCRIPTION VPC PEER-LINK
NEXUSSWITCH(CONFIG-IF)#SWITCHPORT
NEXUSSWITCH(CONFIG-IF)#SWITCHPORT MODE TRUNK
NEXUSSWITCH(CONFIG-IF)CHANNEL-GROUP 1 MODE ACTIVE
NEXUSSWITCH(CONFIG-IF)#NO SHUTDOWN
NEXUSSWITCH(CONFIG-IF)#EXIT
```

This configuration needs to be identical on both switches. Any variation (outside of the description and interface number) can cause a consistency failure and the VPC to not be established.

The next and final step is to configure the Keepalive. You can use any interface for the keepalive including the MGMT0 Interface. Be aware that if you use the Management interface you will have to specify the Management VRF on the peer-keepalive command within the VPC domain.

```
NEXUSSWITCH1(CONFIG)#INTERFACE ETHERNET1/30
NEXUSSWITCH1(CONFIG-IF)#DESCRIPTION VPC KEEP-ALIVE
NEXUSSWITCH1(CONFIG-IF)# IP ADDRESS YYY.YYY.YYY.YYY/YY
NEXUSSWITCH1(CONFIG-IF)#NO SHUTDOWN
NEXUSSWITCH1(CONFIG-IF)#EXIT
 
!Move to Switch 2

NEXUSSWITCH2(CONFIG)#INTERFACE ETHERNET1/30
NEXUSSWITCH2(CONFIG-IF)#DESCRIPTION VPC KEEP-ALIVE
NEXUSSWITCH2(CONFIG-IF)# IP ADDRESS XXX.XXX.XXX.XXX/XX
NEXUSSWITCH2(CONFIG-IF)#NO SHUTDOWN
NEXUSSWITCH2(CONFIG-IF)#EXIT
```

You do have the ability and it is recommended to configure the KeepAlive with a port channel. This will give you redundancy if a cable or port ever fails. In the event, you want to use a different VRF for the keep-alive link you can do so with the following configuration. Remember to add that VRF to the keep-alive command within the VPC domain.

```
NEXUSSWITCH(CONFIG)#VRF CONTEXT KEEPALIVE
NEXUSSWITCH(CONFIG-VRF)#EXIT
NEXUSSWITCH(CONFIG)#INTERFACE ETHERNET1/30
NEXUSSWITCH(CONFIG-IF)#DESCRIPTION VPC KEEP-ALIVE
NEXUSSWITCH(CONFIG-IF)#VRF MEMBER KEEPALIVE
NEXUSSWITCH(CONFIG-IF)# IP ADDRESS XXX.XXX.XXX.XXX/XX
NEXUSSWITCH(CONFIG-IF)#NO SHUTDOWN
NEXUSSWITCH(CONFIG-IF)#EXIT
```

This configuration should get you up and running and allow you to create virtual port channels. In the next post, we will go over some additional configuration you can add to the VPC Domain like the peer-switch command to manipulate and improve STP convergence.
