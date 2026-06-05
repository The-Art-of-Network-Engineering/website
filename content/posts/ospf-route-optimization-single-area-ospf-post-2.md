---
title: "OSPF Route Optimization - Single Area OSPF (Post 2)"
slug: "ospf-route-optimization-single-area-ospf-post-2"
publishedAt: "2021-02-15"
excerpt: "In this second post of the OSPF Route Optimization series, we take a look at our sample topology network configured with a single OSPF area. We will see that while we have global IP reachability throughout the network,..."
author: "Andy Lapteff"
---

In this second post of the OSPF Route Optimization series, we take a look at our sample topology network configured with a single OSPF area. We will see that while we have global IP reachability throughout the network, the routing tables are not very efficient, and this design may not scale well. Here is another look at our topology, this time showing that the routers in the entire network are all members of the backbone area, OSPF area 0 (zero).

![](https://artofnetworkengineering.com/wp-content/uploads/2020/10/ospf-route_optimization-single_area.png?w=750)

In the following "show" output, we will take a look at the OSPF related configuration for site1-dist and one of the site1-access switches. Remember that in this topology, we are working with a routed access design, so the virtual routers for the client subnets live on the access-layer switches. Rather than using SVIs at the access layer, for this demonstration, we are leveraging loopback interfaces to simulate client routers (each access-layer switch has three client subnets). By default, the loopback OSPF network type will only advertise a /32 host route, so for this demonstration, the OSPF network type on the loopback interfaces has been changed to "point-to-point". By doing this, although they are loopback interfaces, the full /24 subnets will be advertised.

**site1-dist**

```
site1-dist#show ip route connected  
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
10.0.0.0/8 is variably subnetted, 57 subnets, 3 masks  
C 10.1.200.0/30 is directly connected, GigabitEthernet0/2  
C 10.1.200.4/30 is directly connected, GigabitEthernet0/3  
C 10.1.200.8/30 is directly connected, GigabitEthernet1/0  
C 10.1.255.255/32 is directly connected, Loopback0  
C 10.100.0.0/30 is directly connected, GigabitEthernet0/1  
  
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
```

**site1-access-1**

```
site1-access1#show ip route connected  
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
C 10.1.11.0/24 is directly connected, Loopback11  
C 10.1.12.0/24 is directly connected, Loopback12  
C 10.1.13.0/24 is directly connected, Loopback13  
C 10.1.200.0/30 is directly connected, GigabitEthernet0/1  
C 10.1.255.1/32 is directly connected, Loopback0  
  
site1-access1#show ip protocols  
*** IP Routing is NSF aware ***  
Routing Protocol is "application"  
Sending updates every 0 seconds  
Invalid after 0 seconds, hold down 0, flushed after 0  
Outgoing update filter list for all interfaces is not set  
Incoming update filter list for all interfaces is not set  
Maximum path: 32  
Routing for Networks:  
Routing Information Sources:  
Gateway Distance Last Update  
Distance: (default is 4)  
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

You can see the large size of the access-switch routing table in the "show ip route ospf" output at the end. OSPF, like other routing protocols will provide you global reachability, but when left to default settings, it can quickly become cumbersome. In the next post, we will bring out the first tool in our OSPF optimization toolbox, which is leveraging multiple areas.
