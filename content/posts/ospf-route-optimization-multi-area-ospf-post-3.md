---
title: "OSPF Route Optimization - Multi-Area OSPF (Post 3)"
slug: "ospf-route-optimization-multi-area-ospf-post-3"
publishedAt: "2021-02-22"
excerpt: "In this post of the OSPF Route Optimization series, we take a look at multi-area OSPF. As stated before, while single-area OSPF provides us with global IP reachability, it tends to not scale well from an efficiency..."
author: "Andy Lapteff"
---

In this post of the OSPF Route Optimization series, we take a look at multi-area OSPF. As stated before, while single-area OSPF provides us with global IP reachability, it tends to not scale well from an efficiency standpoint as the network grows. In our sample topology, we will treat the "inside" zone of each site as its own area while leaving the distribution to core layer in area 0. With our IP address design, doing this will allow us to perform IP summarization and shrink the size of our routing tables. Here is an updated view of our topology and in the output shown in the rest of this post, we will work with area 1 (site 1).

![](https://artofnetworkengineering.com/wp-content/uploads/2020/10/ospf-route_optimization-multi_area.png?w=750)

As a reminder, here is what the routing table (OSPF routes) looks like on access switch #1 at site #1 with single area OSPF.

```
site1-access1#show ip route ospf
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
E1 - OSPF external type 1, E2 - OSPF external type 2
i - IS-IS, su - IS-IS summary, L1 - IS-IS level-1, L2 - IS-IS level-2
ia - IS-IS inter area, * - candidate default, U - per-user static route
o - ODR, P - periodic downloaded static route, H - NHRP, l - LISP
a - application route
+ - replicated route, % - next hop override, p - overrides from PfR
Gateway of last resort is not set
10.0.0.0/8 is variably subnetted, 73 subnets, 3 masks
O 10.1.21.0/24 [110/21] via 10.1.200.1, 00:07:01, GigabitEthernet0/1
O 10.1.22.0/24 [110/21] via 10.1.200.1, 00:07:01, GigabitEthernet0/1
O 10.1.23.0/24 [110/21] via 10.1.200.1, 00:07:01, GigabitEthernet0/1
O 10.1.31.0/24 [110/21] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.1.32.0/30 [110/21] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.1.33.0/30 [110/21] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.1.200.4/30 [110/20] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.1.200.8/30 [110/20] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.1.255.2/32 [110/21] via 10.1.200.1, 00:07:01, GigabitEthernet0/1
O 10.1.255.3/32 [110/21] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.1.255.255/32 [110/11] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.2.11.0/24 [110/41] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.12.0/24 [110/41] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.13.0/24 [110/41] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.21.0/24 [110/41] via 10.1.200.1, 00:06:27, GigabitEthernet0/1
O 10.2.22.0/24 [110/41] via 10.1.200.1, 00:06:27, GigabitEthernet0/1
O 10.2.23.0/24 [110/41] via 10.1.200.1, 00:06:27, GigabitEthernet0/1
O 10.2.31.0/24 [110/41] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.32.0/24 [110/41] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.33.0/24 [110/41] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.200.0/30 [110/40] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.200.4/30 [110/40] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.200.8/30 [110/40] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.255.1/32 [110/41] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.255.2/32 [110/41] via 10.1.200.1, 00:06:27, GigabitEthernet0/1
O 10.2.255.3/32 [110/41] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.2.255.255/32 [110/31] via 10.1.200.1, 00:06:37, GigabitEthernet0/1
O 10.3.11.0/24 [110/41] via 10.1.200.1, 00:06:16, GigabitEthernet0/1
O 10.3.12.0/24 [110/41] via 10.1.200.1, 00:06:16, GigabitEthernet0/1
O 10.3.13.0/24 [110/41] via 10.1.200.1, 00:06:16, GigabitEthernet0/1
O 10.3.21.0/24 [110/41] via 10.1.200.1, 00:06:06, GigabitEthernet0/1
O 10.3.22.0/24 [110/41] via 10.1.200.1, 00:06:06, GigabitEthernet0/1
O 10.3.23.0/24 [110/41] via 10.1.200.1, 00:06:06, GigabitEthernet0/1
O 10.3.31.0/24 [110/41] via 10.1.200.1, 00:06:06, GigabitEthernet0/1
O 10.3.32.0/24 [110/41] via 10.1.200.1, 00:06:06, GigabitEthernet0/1
O 10.3.33.0/24 [110/41] via 10.1.200.1, 00:06:06, GigabitEthernet0/1
O 10.3.200.0/30 [110/40] via 10.1.200.1, 00:06:16, GigabitEthernet0/1
O 10.3.200.4/30 [110/40] via 10.1.200.1, 00:06:16, GigabitEthernet0/1
O 10.3.200.8/30 [110/40] via 10.1.200.1, 00:06:16, GigabitEthernet0/1
O 10.3.255.1/32 [110/41] via 10.1.200.1, 00:06:16, GigabitEthernet0/1
O 10.3.255.2/32 [110/41] via 10.1.200.1, 00:06:06, GigabitEthernet0/1
O 10.3.255.3/32 [110/41] via 10.1.200.1, 00:06:06, GigabitEthernet0/1
O 10.3.255.255/32 [110/31] via 10.1.200.1, 00:06:16, GigabitEthernet0/1
O 10.4.11.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.12.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.13.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.21.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.22.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.23.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.31.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.32.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.33.0/24 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.200.0/30 [110/40] via 10.1.200.1, 00:05:48, GigabitEthernet0/1
O 10.4.200.4/30 [110/40] via 10.1.200.1, 00:05:48, GigabitEthernet0/1
O 10.4.200.8/30 [110/40] via 10.1.200.1, 00:05:48, GigabitEthernet0/1
O 10.4.255.1/32 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.255.2/32 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.255.3/32 [110/41] via 10.1.200.1, 00:05:38, GigabitEthernet0/1
O 10.4.255.255/32 [110/31] via 10.1.200.1, 00:05:48, GigabitEthernet0/1
O 10.100.0.0/30 [110/20] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.100.0.4/30 [110/30] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.100.0.8/30 [110/30] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.100.0.12/30 [110/30] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
O 10.100.255.255/32
[110/21] via 10.1.200.1, 00:07:11, GigabitEthernet0/1
```

We will now start our configuration of multi-area OSPF. For brevity, in this post we will focus on site #1, specifically the distribution switch and one access switch. The configuration is similar for the rest of the network. Disclaimer: similar changes in a production environment should be planned, coordinated, and performed in a maintenance window that allows for downtime.

**site1-dist**

```
site1-dist#show ip int brief | exclude unassigned
 Interface              IP-Address      OK? Method Status            Protocol
 GigabitEthernet0/1     10.100.0.2      YES TFTP   up                    up      
 GigabitEthernet0/2     10.1.200.1      YES TFTP   up                    up      
 GigabitEthernet0/3     10.1.200.5      YES TFTP   up                    up      
 GigabitEthernet1/0     10.1.200.9      YES TFTP   up                    up      
 Loopback0              10.1.255.255    YES TFTP   up                    up      
 site1-dist#show ip protocols
 Routing Protocol is "ospf 1"
   Outgoing update filter list for all interfaces is not set
   Incoming update filter list for all interfaces is not set
   Router ID 10.1.255.255
   Number of areas in this router is 1. 1 normal 0 stub 0 nssa
   Maximum path: 4
   Routing for Networks:
   Routing on Interfaces Configured Explicitly (Area 0):
     Loopback0
     GigabitEthernet1/0
     GigabitEthernet0/3
     GigabitEthernet0/2
     GigabitEthernet0/1
   Routing Information Sources:
     Gateway         Distance      Last Update
     10.2.255.255         110      22:12:43
     10.3.255.255         110      22:12:16
     10.4.255.255         110      22:12:16
     10.100.255.255       110      22:12:53
     10.4.255.1           110      22:12:16
     10.4.255.3           110      22:12:05
     10.4.255.2           110      22:12:16
     10.3.255.2           110      22:12:16
     10.2.255.3           110      22:12:43
     10.3.255.3           110      22:12:16
     10.2.255.2           110      22:12:43
     10.1.255.1           110      22:12:53
     10.2.255.1           110      22:12:43
     10.1.255.2           110      22:12:53
     10.3.255.1           110      22:12:16
     10.1.255.3           110      22:12:53
   Distance: (default is 110)
 site1-dist#configure terminal
 Enter configuration commands, one per line.  End with CNTL/Z.
 site1-dist(config)#int range gi0/2-3, gi1/0, lo0
 site1-dist(config-if-range)#ip ospf 1 area 1
 site1-dist(config-if-range)#
 *Nov 22 17:17:54.010: %OSPF-5-ADJCHG: Process 1, Nbr 10.1.255.1 on GigabitEthernet0/2 from FULL to DOWN, Neighbor Down: Interface down or detached
 *Nov 22 17:17:54.018: %OSPF-5-ADJCHG: Process 1, Nbr 10.1.255.2 on GigabitEthernet0/3 from FULL to DOWN, Neighbor Down: Interface down or detached
 *Nov 22 17:17:54.026: %OSPF-5-ADJCHG: Process 1, Nbr 10.1.255.3 on GigabitEthernet1/0 from FULL to DOWN, Neighbor Down: Interface down or detached
 site1-dist(config-if-range)#
 *Nov 22 17:17:59.544: %OSPF-4-ERRRCV: Received invalid packet: mismatched area ID from backbone area from 10.1.200.10, GigabitEthernet1/0
```

In the above output for site1-dist, we can see that the interface connecting to the core (gi0/1) is left in the backbone area (area 0). All other interfaces that can be seen as "local" to the site (including the router's loopback 0 interface, which is used as the OSPF router ID) are moved into area 1. For site 2, we are using area 2, site 3 is area 3 and site 4 is area 4. You can see that as soon as the interfaces connecting to the access layer switches are moved into, area 1, we lose OSPF neighborship with them on site1-dist because there is now an area ID mismatch in the hello messages between site1-dist and the access layer switches that are still in area 0. This is why in a production environment, that this would need to be done in a communicated maintenance window. We will now configure the necessary interfaces on site1-access1. The same would be configured on the other access layer switches at site 1 as well as the rest of the access layer switches at the other sites in the topology, just with their respective area IDs.

**site1-access1**

```
site1-access1#show ip int brief | exclude unassigned
 Interface              IP-Address      OK? Method Status                Protocol
 GigabitEthernet0/1     10.1.200.2      YES TFTP   up                    up      
 Loopback0              10.1.255.1      YES TFTP   up                    up      
 Loopback11             10.1.11.1       YES TFTP   up                    up      
 Loopback12             10.1.12.1       YES TFTP   up                    up      
 Loopback13             10.1.13.1       YES TFTP   up                    up      
 site1-access1#show ip protocols
 Routing Protocol is "ospf 1"
   Outgoing update filter list for all interfaces is not set
   Incoming update filter list for all interfaces is not set
   Router ID 10.1.255.1
   Number of areas in this router is 1. 1 normal 0 stub 0 nssa
   Maximum path: 4
   Routing for Networks:
   Routing on Interfaces Configured Explicitly (Area 0):
     Loopback0
     Loopback11
     Loopback12
     Loopback13
     GigabitEthernet0/1
   Routing Information Sources:
     Gateway         Distance      Last Update
     10.2.255.255         110      23:43:05
     10.3.255.255         110      23:42:37
     10.1.255.255         110      23:43:16
     10.4.255.255         110      23:42:27
     10.100.255.255       110      23:43:16
     10.4.255.1           110      23:42:27
     10.4.255.3           110      23:42:17
     10.4.255.2           110      23:42:17
     10.3.255.2           110      23:42:37
     10.2.255.3           110      23:43:05
     10.3.255.3           110      23:42:27
     10.2.255.2           110      23:42:55
     10.2.255.1           110      23:43:05
     10.1.255.2           110      23:43:16
     10.3.255.1           110      23:42:27
     10.1.255.3           110      23:43:16
   Distance: (default is 110)
 site1-access1#configure terminal
 Enter configuration commands, one per line.  End with CNTL/Z.
 site1-access1(config)#int range gi0/1, lo0, lo11-13
 site1-access1(config-if-range)#ip ospf 1 area 1
 site1-access1(config-if-range)#
 *Nov 22 18:50:38.694: %OSPF-5-ADJCHG: Process 1, Nbr 10.1.255.255 on GigabitEthernet0/1 from LOADING to FULL, Loading Done
 site1-access1#show ip ospf neighbor 
 Neighbor ID     Pri   State           Dead Time   Address         Interface
 10.1.255.255      0   FULL/  -        00:00:36    10.1.200.1      GigabitEthernet0/1
```

In this simulation, the client subnets are represented as loopback interfaces. In "real life" they would most likely be switch virtual interfaces (SVIs). As stated in the last post, for the lab, I set the client subnet represented loopback interfaces with the "ip ospf network point-to-point" command. This way, OSPF would advertise the entire /24 subnets rather than just the /32 loopback addresses. We can see that all interfaces on site1-access1 are moved into area 1. As soon as interface gi0/1 (connecting to site1-dist) is added into area 1, the OSPF neighborship comes back online. For all router to router connections in this lab we are leveraging "ip ospf network point-to-point". That is why we do not see any DRs or BDRs in the "show ip ospf neighbor" outputs.

We are now going to fast forward. All routers (Layer 3 switches) in the topology have been configured properly for multi-area OSPF as shown in the diagram at the beginning of this post. Let's now take a look at some show commands from site1-dist and site1-access1 now the entire topology has been configured.

**site1-dist**

```
site1-dist#show ip protocols
 Routing Protocol is "ospf 1"
   Outgoing update filter list for all interfaces is not set
   Incoming update filter list for all interfaces is not set
   Router ID 10.1.255.255
   It is an area border router
   Number of areas in this router is 2. 2 normal 0 stub 0 nssa
   Maximum path: 4
   Routing for Networks:
   Routing on Interfaces Configured Explicitly (Area 0):
     GigabitEthernet0/1
     Routing on Interfaces Configured Explicitly (Area 1):
     Loopback0
     GigabitEthernet1/0
     GigabitEthernet0/3
     GigabitEthernet0/2
   Routing Information Sources:
     Gateway         Distance      Last Update
     10.2.255.255         110      00:04:09
     10.3.255.255         110      00:03:28
     10.4.255.255         110      00:02:53
     10.100.255.255       110      00:17:48
     10.1.255.1           110      00:17:38
     10.1.255.2           110      00:17:48
     10.1.255.3           110      00:17:38
   Distance: (default is 110)
 site1-dist#show ip route ospf
       10.0.0.0/8 is variably subnetted, 73 subnets, 3 masks
 O        10.1.11.0/24 [110/11] via 10.1.200.2, 00:18:11, GigabitEthernet0/2
 O        10.1.12.0/24 [110/11] via 10.1.200.2, 00:18:11, GigabitEthernet0/2
 O        10.1.13.0/24 [110/11] via 10.1.200.2, 00:18:11, GigabitEthernet0/2
 O        10.1.21.0/24 [110/11] via 10.1.200.6, 00:18:21, GigabitEthernet0/3
 O        10.1.22.0/24 [110/11] via 10.1.200.6, 00:18:21, GigabitEthernet0/3
 O        10.1.23.0/24 [110/11] via 10.1.200.6, 00:18:21, GigabitEthernet0/3
 O        10.1.31.0/24 [110/11] via 10.1.200.10, 00:18:11, GigabitEthernet1/0
 O        10.1.32.0/30 [110/11] via 10.1.200.10, 00:18:11, GigabitEthernet1/0
 O        10.1.33.0/30 [110/11] via 10.1.200.10, 00:18:11, GigabitEthernet1/0
 O        10.1.255.1/32 [110/11] via 10.1.200.2, 00:18:11, GigabitEthernet0/2
 O        10.1.255.2/32 [110/11] via 10.1.200.6, 00:18:21, GigabitEthernet0/3
 O        10.1.255.3/32 [110/11] via 10.1.200.10, 00:18:11, GigabitEthernet1/0
 O IA     10.2.11.0/24 [110/31] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.12.0/24 [110/31] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.13.0/24 [110/31] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.21.0/24 [110/31] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.22.0/24 [110/31] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.23.0/24 [110/31] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.31.0/24 [110/31] via 10.100.0.1, 00:17:58, GigabitEthernet0/1
 O IA     10.2.32.0/24 [110/31] via 10.100.0.1, 00:17:58, GigabitEthernet0/1
 O IA     10.2.33.0/24 [110/31] via 10.100.0.1, 00:17:58, GigabitEthernet0/1
 O IA     10.2.200.0/30 [110/30] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.200.4/30 [110/30] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.200.8/30 [110/30] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.255.1/32 [110/31] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.255.2/32 [110/31] via 10.100.0.1, 00:18:01, GigabitEthernet0/1
 O IA     10.2.255.3/32 [110/31] via 10.100.0.1, 00:17:58, GigabitEthernet0/1
 O IA     10.2.255.255/32 [110/21] via 10.100.0.1, 00:04:43, GigabitEthernet0/1
 O IA     10.3.11.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.3.12.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.3.13.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.3.21.0/24 [110/31] via 10.100.0.1, 00:17:40, GigabitEthernet0/1
 O IA     10.3.22.0/24 [110/31] via 10.100.0.1, 00:17:40, GigabitEthernet0/1
 O IA     10.3.23.0/24 [110/31] via 10.100.0.1, 00:17:40, GigabitEthernet0/1
 O IA     10.3.31.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.3.32.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.3.33.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.3.200.0/30 [110/30] via 10.100.0.1, 00:17:40, GigabitEthernet0/1
 O IA     10.3.200.4/30 [110/30] via 10.100.0.1, 00:17:40, GigabitEthernet0/1
 O IA     10.3.200.8/30 [110/30] via 10.100.0.1, 00:17:40, GigabitEthernet0/1
 O IA     10.3.255.1/32 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.3.255.2/32 [110/31] via 10.100.0.1, 00:17:40, GigabitEthernet0/1
 O IA     10.3.255.3/32 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.3.255.255/32 [110/21] via 10.100.0.1, 00:04:01, GigabitEthernet0/1
 O IA     10.4.11.0/24 [110/31] via 10.100.0.1, 00:17:29, GigabitEthernet0/1
 O IA     10.4.12.0/24 [110/31] via 10.100.0.1, 00:17:29, GigabitEthernet0/1
 O IA     10.4.13.0/24 [110/31] via 10.100.0.1, 00:17:29, GigabitEthernet0/1
 O IA     10.4.21.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.4.22.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.4.23.0/24 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.4.31.0/24 [110/31] via 10.100.0.1, 00:17:29, GigabitEthernet0/1
 O IA     10.4.32.0/24 [110/31] via 10.100.0.1, 00:17:29, GigabitEthernet0/1
 O IA     10.4.33.0/24 [110/31] via 10.100.0.1, 00:17:29, GigabitEthernet0/1
 O IA     10.4.200.0/30 [110/30] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.4.200.4/30 [110/30] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.4.200.8/30 [110/30] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.4.255.1/32 [110/31] via 10.100.0.1, 00:17:29, GigabitEthernet0/1
 O IA     10.4.255.2/32 [110/31] via 10.100.0.1, 00:17:30, GigabitEthernet0/1
 O IA     10.4.255.3/32 [110/31] via 10.100.0.1, 00:17:29, GigabitEthernet0/1
 O IA     10.4.255.255/32 [110/21] via 10.100.0.1, 00:03:27, GigabitEthernet0/1
 O        10.100.0.4/30 [110/20] via 10.100.0.1, 00:18:21, GigabitEthernet0/1
 O        10.100.0.8/30 [110/20] via 10.100.0.1, 00:18:21, GigabitEthernet0/1
 O        10.100.0.12/30 [110/20] via 10.100.0.1, 00:18:21, GigabitEthernet0/1
 O        10.100.255.255/32 
            [110/11] via 10.100.0.1, 00:18:21, GigabitEthernet0/1
```

**site1-access1**

```
site1-access1#show ip protocols
 Routing Protocol is "ospf 1"
   Outgoing update filter list for all interfaces is not set
   Incoming update filter list for all interfaces is not set
   Router ID 10.1.255.1
   Number of areas in this router is 1. 1 normal 0 stub 0 nssa
   Maximum path: 4
   Routing for Networks:
   Routing on Interfaces Configured Explicitly (Area 1):
     Loopback0
     Loopback11
     Loopback12
     Loopback13
     GigabitEthernet0/1
   Routing Information Sources:
     Gateway         Distance      Last Update
     10.1.255.255         110      00:06:19
     10.1.255.2           110      00:22:56
     10.1.255.3           110      00:22:56
   Distance: (default is 110)
 site1-access1#show ip route ospf
       10.0.0.0/8 is variably subnetted, 73 subnets, 3 masks
 O        10.1.21.0/24 [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.22.0/24 [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.23.0/24 [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.31.0/24 [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.32.0/30 [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.33.0/30 [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.200.4/30 [110/20] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.200.8/30 [110/20] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.255.2/32 [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.255.3/32 [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O        10.1.255.255/32 [110/11] via 10.1.200.1, 00:09:02, GigabitEthernet0/1
 O IA     10.2.11.0/24 [110/41] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.12.0/24 [110/41] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.13.0/24 [110/41] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.21.0/24 [110/41] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.22.0/24 [110/41] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.23.0/24 [110/41] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.31.0/24 [110/41] via 10.1.200.1, 00:23:34, GigabitEthernet0/1
 O IA     10.2.32.0/24 [110/41] via 10.1.200.1, 00:23:34, GigabitEthernet0/1
 O IA     10.2.33.0/24 [110/41] via 10.1.200.1, 00:23:34, GigabitEthernet0/1
 O IA     10.2.200.0/30 [110/40] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.200.4/30 [110/40] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.200.8/30 [110/40] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.255.1/32 [110/41] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.255.2/32 [110/41] via 10.1.200.1, 00:23:41, GigabitEthernet0/1
 O IA     10.2.255.3/32 [110/41] via 10.1.200.1, 00:23:34, GigabitEthernet0/1
 O IA     10.2.255.255/32 [110/31] via 10.1.200.1, 00:08:44, GigabitEthernet0/1
 O IA     10.3.11.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.3.12.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.3.13.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.3.21.0/24 [110/41] via 10.1.200.1, 00:23:03, GigabitEthernet0/1
 O IA     10.3.22.0/24 [110/41] via 10.1.200.1, 00:23:03, GigabitEthernet0/1
 O IA     10.3.23.0/24 [110/41] via 10.1.200.1, 00:23:03, GigabitEthernet0/1
 O IA     10.3.31.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.3.32.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.3.33.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.3.200.0/30 [110/40] via 10.1.200.1, 00:23:03, GigabitEthernet0/1
 O IA     10.3.200.4/30 [110/40] via 10.1.200.1, 00:23:03, GigabitEthernet0/1
 O IA     10.3.200.8/30 [110/40] via 10.1.200.1, 00:23:03, GigabitEthernet0/1
 O IA     10.3.255.1/32 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.3.255.2/32 [110/41] via 10.1.200.1, 00:23:03, GigabitEthernet0/1
 O IA     10.3.255.3/32 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.3.255.255/32 [110/31] via 10.1.200.1, 00:07:59, GigabitEthernet0/1
 O IA     10.4.11.0/24 [110/41] via 10.1.200.1, 00:22:45, GigabitEthernet0/1
 O IA     10.4.12.0/24 [110/41] via 10.1.200.1, 00:22:45, GigabitEthernet0/1
 O IA     10.4.13.0/24 [110/41] via 10.1.200.1, 00:22:45, GigabitEthernet0/1
 O IA     10.4.21.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.4.22.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.4.23.0/24 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.4.31.0/24 [110/41] via 10.1.200.1, 00:22:45, GigabitEthernet0/1
 O IA     10.4.32.0/24 [110/41] via 10.1.200.1, 00:22:45, GigabitEthernet0/1
 O IA     10.4.33.0/24 [110/41] via 10.1.200.1, 00:22:45, GigabitEthernet0/1
 O IA     10.4.200.0/30 [110/40] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.4.200.4/30 [110/40] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.4.200.8/30 [110/40] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.4.255.1/32 [110/41] via 10.1.200.1, 00:22:45, GigabitEthernet0/1
 O IA     10.4.255.2/32 [110/41] via 10.1.200.1, 00:22:47, GigabitEthernet0/1
 O IA     10.4.255.3/32 [110/41] via 10.1.200.1, 00:22:45, GigabitEthernet0/1
 O IA     10.4.255.255/32 [110/31] via 10.1.200.1, 00:07:21, GigabitEthernet0/1
 O IA     10.100.0.0/30 [110/20] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O IA     10.100.0.4/30 [110/30] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O IA     10.100.0.8/30 [110/30] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O IA     10.100.0.12/30 [110/30] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
 O IA     10.100.255.255/32 
            [110/21] via 10.1.200.1, 00:23:58, GigabitEthernet0/1
```

In conclusion of this post, let's go over some key takeaways from the perspectives of site1-dist and site1-access1 now that multi-area OSPF has been configured throughout the topology.

**site1-dist**

1. In the output of "show ip protocols", the list of routing information sources has decreased to the following. The reason for this is because site1-dist now has interfaces in area 1 as well as area 0. Routing information will only be seen as sourced from routers within area 1 and area 0.
   - 10.2.255.255 (site2-dist)
   - 10.3.255.255 (site3-dist)
   - 10.4.255.255 (site4-dist)
   - 10.100.255.255 (core)
   - 10.1.255.1 (site1-access1)
   - 10.1.255.2 (site1-access2)
   - 10.1.255.3 (site1-access3)
2. In the routing table, any route outside of 10.1.x.x (area 1) and 10.100.x.x (area 0) is seen as an inter-area (IA) route.

**site1-access**

1. In the output of "show ip protocols", the list of routing sources has decreased to the following. The reason for this is because site1-access1 now only has interfaces in area 1. Routing information will only be seen as sourced from routers within area 1.
   - 10.1.255.255 (site1-dist)
   - 10.1.255.2 (site1-access2)
   - 10.1.255.3 (site1-access3)
2. In the routing table, any route outside of 10.1.x.x (area 1) is seen as an inter-area (IA) route.

Alright, we have multi-area OSPF set up across the topology, but our routing tables still look pretty heavy and cluttered. Well, the base multi-area OSPF configuration just set the stage for the next tool in our OSPF toolbox, which is route summarization. Join me in the next post, and we will leverage route summarization in our area border routers (the dist switch at each site) and shrink the size of our routing tables.
