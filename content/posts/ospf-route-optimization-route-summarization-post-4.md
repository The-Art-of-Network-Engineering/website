---
title: "OSPF Route Optimization - Route Summarization (Post 4)"
slug: "ospf-route-optimization-route-summarization-post-4"
publishedAt: "2021-03-08"
excerpt: "You've made it to the 4th and final post in the OSPF Route Optimization series, I'm proud of you! I honestly wasn't sure if I'd make it this far, myself. Anyway, in this post we will build upon the work we accomplished..."
author: "Tim Bertino"
---

You've made it to the 4th and final post in the OSPF Route Optimization series, I'm proud of you! I honestly wasn't sure if I'd make it this far, myself. Anyway, in this post we will build upon the work we accomplished in post 3, in which we converted our flat, single area OSPF topology into multi-area OSPF with each site having a boundary between area 0 and the local area (1, 2, 3, or 4 per site). By just implementing multiple areas, we do not yet see a large benefit. Our routing table sizes are still larger than they need to be. In this post, we will leverage route summarization in our area border routers to start seeing that benefit of smaller routing tables. Multi-area OSPF is what makes route summarization possible. Just like the last post, to avoid too much clutter, we will focus in on site1-dist and site1-access1. Keep in mind, that the rest of the topology is getting configured also, just behind the scenes. First, let's get a refresher on our topology.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/10/ospf-route_optimization-multi_area.png?w=750)

With OSPF, route summarization is implemented in the area border routers. In our case here, this will be done in the "dist" switch at each site. For the purposes of this demonstration, we will summarize the route advertisements of the entire /16 of each local site network. In the output below, we will take a look at the configuration on site1-dist, then some "show" output from site1-dist and site1-access once the summarization configuration has taken place throughout the entire topology.

**site1-dist**

```
site1-dist#configure terminal
 site1-dist(config-router)#area 1 range 10.1.0.0 255.255.0.0
 site1-dist(config-router)#end
 site1-dist#show ip route ospf
   10.0.0.0/8 is variably subnetted, 29 subnets, 4 masks
 O        10.1.0.0/16 is a summary, 00:04:38, Null0
 O        10.1.11.0/24 [110/11] via 10.1.200.2, 00:04:38, GigabitEthernet0/2
 O        10.1.12.0/24 [110/11] via 10.1.200.2, 00:04:38, GigabitEthernet0/2
 O        10.1.13.0/24 [110/11] via 10.1.200.2, 00:04:38, GigabitEthernet0/2
 O        10.1.21.0/24 [110/11] via 10.1.200.6, 00:04:38, GigabitEthernet0/3
 O        10.1.22.0/24 [110/11] via 10.1.200.6, 00:04:38, GigabitEthernet0/3
 O        10.1.23.0/24 [110/11] via 10.1.200.6, 00:04:38, GigabitEthernet0/3
 O        10.1.31.0/24 [110/11] via 10.1.200.10, 00:04:38, GigabitEthernet1/0
 O        10.1.32.0/30 [110/11] via 10.1.200.10, 00:04:38, GigabitEthernet1/0
 O        10.1.33.0/30 [110/11] via 10.1.200.10, 00:04:38, GigabitEthernet1/0
 O        10.1.255.1/32 [110/11] via 10.1.200.2, 00:04:38, GigabitEthernet0/2
 O        10.1.255.2/32 [110/11] via 10.1.200.6, 00:04:38, GigabitEthernet0/3
 O        10.1.255.3/32 [110/11] via 10.1.200.10, 00:04:38, GigabitEthernet1/0
 O IA     10.2.0.0/16 [110/21] via 10.100.0.1, 00:03:32, GigabitEthernet0/1
 O IA     10.3.0.0/16 [110/21] via 10.100.0.1, 00:02:50, GigabitEthernet0/1
 O IA     10.4.0.0/16 [110/21] via 10.100.0.1, 00:01:25, GigabitEthernet0/1
 O        10.100.0.4/30 [110/20] via 10.100.0.1, 00:04:38, GigabitEthernet0/1
 O        10.100.0.8/30 [110/20] via 10.100.0.1, 00:04:38, GigabitEthernet0/1
 O        10.100.0.12/30 [110/20] via 10.100.0.1, 00:04:38, GigabitEthernet0/1
 O        10.100.255.255/32 
            [110/11] via 10.100.0.1, 00:04:38, GigabitEthernet0/1
```

As you can see, the configuration itself is simple and done within the router ospf instance. Due to the IP addressing plan we used, combined with multi-area OSPF and route summarization across the topology, we were able to reduce the OSPF routes in this Layer 3 switch from 64 down to 20 (including the /16 null route)!

**site1-access1**

```
site1-access1#show ip route ospf
   10.0.0.0/8 is variably subnetted, 28 subnets, 4 masks
 O        10.1.21.0/24 [110/21] via 10.1.200.1, 00:12:56, GigabitEthernet0/1
 O        10.1.22.0/24 [110/21] via 10.1.200.1, 00:12:56, GigabitEthernet0/1
 O        10.1.23.0/24 [110/21] via 10.1.200.1, 00:12:56, GigabitEthernet0/1
 O        10.1.31.0/24 [110/21] via 10.1.200.1, 00:12:46, GigabitEthernet0/1
 O        10.1.32.0/30 [110/21] via 10.1.200.1, 00:12:46, GigabitEthernet0/1
 O        10.1.33.0/30 [110/21] via 10.1.200.1, 00:12:46, GigabitEthernet0/1
 O        10.1.200.4/30 [110/20] via 10.1.200.1, 00:12:56, GigabitEthernet0/1
 O        10.1.200.8/30 [110/20] via 10.1.200.1, 00:12:56, GigabitEthernet0/1
 O        10.1.255.2/32 [110/21] via 10.1.200.1, 00:12:56, GigabitEthernet0/1
 O        10.1.255.3/32 [110/21] via 10.1.200.1, 00:12:46, GigabitEthernet0/1
 O        10.1.255.255/32 [110/11] via 10.1.200.1, 00:12:56, GigabitEthernet0/1
 O IA     10.2.0.0/16 [110/31] via 10.1.200.1, 00:06:01, GigabitEthernet0/1
 O IA     10.3.0.0/16 [110/31] via 10.1.200.1, 00:05:15, GigabitEthernet0/1
 O IA     10.4.0.0/16 [110/31] via 10.1.200.1, 00:03:45, GigabitEthernet0/1
 O IA     10.100.0.0/30 [110/20] via 10.1.200.1, 00:12:56, GigabitEthernet0/1
 O IA     10.100.0.4/30 [110/30] via 10.1.200.1, 00:12:42, GigabitEthernet0/1
 O IA     10.100.0.8/30 [110/30] via 10.1.200.1, 00:12:42, GigabitEthernet0/1
 O IA     10.100.0.12/30 [110/30] via 10.1.200.1, 00:12:42, GigabitEthernet0/1
 O IA     10.100.255.255/32 
            [110/21] via 10.1.200.1, 00:12:42, GigabitEthernet0/1
```

Here, you can see that the downstream routers from the area border router also benefit from the route summarization as the OSPF routes in the site1-access1 routing table have been reduced to 19. I want to highlight that the routes from areas 2, 3, and 4 are now seen as single /16 routes to routers in area 1. This is a great start to shrinking the routing tables in our topology, but we can go further. Is there really a reason for the access layer switches to have routes to the other sites? I encourage you to take a look at the different stub area types next. Thanks for joining me on this journey, and until next time, happy routing!
