---
title: "An Introduction to DMVPN"
slug: "an-introduction-to-dmvpn"
publishedAt: "2020-08-21"
excerpt: "This article was written by Danny Finein and first appeared on his blog semperfinein.com."
author: "semperfinein"
---

*This article was written by Danny Finein and first appeared on his blog [semperfinein.com](http://semperfinein.com/kb.php?article=dmvpn-comparison).*

"*Dynamic Multipoint VPN (DMVPN) is a Cisco IOS Software solution for building scalable IPsec Virtual Private Networks (VPNs). Cisco DMVPN uses a centralized architecture to provide easier implementation and management for deployments that require granular access controls for diverse user communities, including mobile workers, telecommuters, and extranet users.*

*Cisco DMVPN allows branch locations to communicate directly with each other over the public WAN or Internet, such as when using voice over IP (VOIP) between two branch offices, but doesn't require a permanent VPN connection between sites. It enables zero-touch deployment of IPsec VPNs and improves network performance by reducing latency and jitter, while optimizing head office bandwidth utilization.*"

Cisco Systems. “Dynamic Multipoint VPN (DMVPN).” *Cisco DMVPN*, Cisco Systems, 4 Feb. 2020, [www.cisco.com/c/en/us/products/security/dynamic-multipoint-vpn-dmvpn/index.html.](http://Systems, Cisco. “Dynamic Multipoint VPN (DMVPN).” Cisco DMVPN, Cisco Systems, 4 Feb. 2020, www.cisco.com/c/en/us/products/security/dynamic-multipoint-vpn-dmvpn/index.html.)

## DMVPN Comparisons

To start, I want to post some articles that have really helped in understanding the different DMVPN Phases and technologies. This list will continue to grow as I find more resources to thoroughly explain DMVPNs.

- [INE DMVPN Phase 1 and 2](https://blog.ine.com/2008/08/02/dmvpn-explained)
- [INE DMVPN Phase 3](https://blog.ine.com/2008/12/23/dmvpn-phase-3)
- [Cisco Verified Design Guide for DMVPN](https://www.cisco.com/c/dam/en/us/products/collateral/security/dynamic-multipoint-vpn-dmvpn/dmvpn_design_guide.pdf)

I summarized these three posts throughout the DMVPN configurations and phases articles. However, I wanted to take a moment to piggy-back off of Rajesh's comments on the Cisco forums. Essentially, the break down of the three phases are as follows:

![](https://artofnetworkengineering.com/wp-content/uploads/2020/08/image.png?w=1024)

### DMVPN Phase 1

I read a document Cisco prepared for a friend of mine, and I am going to piggy-back some of the terminology. In particular, when I refer to "DMVPN", I am referring to the tunneling mechanisms, and not the IPSec protection overtop. That will be covered in a separate post of this section, as it is is configured more a la carte than an entree.

With that part covered, the phases of the DMVPN relate very closely to the phase of NHRP being used, which is the main driver of DMVPNs. Next-Hop Resolution Protocol (NHRP) works similar to reverse ARP. Spokes, acting as Next Hop Clients (NHC) register to a Next Hop Server (NHS). The registration is for the logical IP address of a tunnel to a physical address of an interface. While the original intent and mechanism was designed for NBMA networks, it lended itself really well to sites over the Internet, and that's just what it got used for.

So, to make a Phase 1 NHRP tunnel, it's the same as making a normal tunnel, with a few extra tweaks. Start by making a point to point tunnel, with the generic (default) mode, which is a point-to-point GRE tunnel:

*Spoke:*

```
interface Tunnel 0
     ip address 192.168.1.10 255.255.255.0
     tunnel source Loopback0
     tunnel destination 10.13.13.1  
! Only the spokes get a tunnel destination
```

Next, flip the hub to a point-to-multipoint. This allows multiple spokes (still in point-to-point) to connect to a single interface on the hub:

*Hub:*

```
   interface Tunnel 0
     tunnel mode gre multipoint  
! Hub is mGRE, so no destination
```

At this point, we have a pretty bland tunnel, so we need to start trying to make them talk. Obviously, the spokes know how to get back to the hub, but the hub doesn't really know how to get to the spokes. In order to accomplish this, we are going to start by telling the hub to listen and learn.

*Hub:*

```
  interface Tunnel0
   ip nhrp authentication NHRP_authC
   ip nhrp map multicast dynamic
   ip nhrp network-id 13
```

Now add the NHC stuff so the client will actually talk to the hub.

*Spoke:*

```
  interface Tunnel0
   ip nhrp authentication NHRP_authC
   ip nhrp map multicast 10.13.13.1
   ip nhrp map 192.168.1.1 10.13.13.1
   ip nhrp nhs 192.168.1.1
   ip nhrp registration timeout 30
   ip nhrp holdtime 60
```

The last few points about Phase 1 DMVPNs would be wrapped around routing protocols. Specifically, distance-vector routing protocols need to have split-horizon disabled, but the next-hop should reflect the hub (the default configuration). This allows the spokes to send their traffic to the hub and have it routed back out the same interface to the other spoke.

At this point, the spokes should be able to communicate back to the hub to give their next-hop information to the NHS. The downside to this is that the NHS keeps the information itself, forcing the spokes to only communicate with the hub. To get around this, NHRP phase 2 (making a Phase 2 DMVPN) can be used, as described in Phase 2 DMVPN.

### DMVPN Phase 2

Using Phase 1 DMVPN as a reference, we will expand on the capabilities. As you recall, the main work-horse is still the NHRP mechanism. Whereas Phase 1 needed the hub to be an mGRE and the spokes were P2P GRE tunnels, Phase 2 allows all nodes to be mGRE tunnels. This shift allows spoke-to-spoke tunnels to be created to route traffic without first sending it to the hub. However, there are some pit-falls in phase 2 as well.

First, when using a distance-vector protocol (in most cases, EIGRP), we must disable the routing updates having 0.0.0.0 next-hop. That is to say, disable next-hop-self, **no ip next-hop-self eigrp 13**. When the routing update is sent from a spoke to the other spokes, it needs to have the original source in it. Without it, the update will look like it's coming from the hub, and if that prefix goes into the RIB that way, then traffic gets sent that way.

The part I am still a little fuzzy on deals with CEF versus process switching. Basically, if I understand correctly (and I am still labbing this), basically, the first packet of a stream goes back to the hub and gets redirected to the spoke. Until this happens, the spoke will be process switching the packets, and once the NHS replies, it can begin using CEF. The second issue is that because all the routes are bouncing off of the hub, you cannot summarize. Consider every site being behind a 192.168.X.X/24 network and the rest of the enterprise is 192.168.X.X. It may make sense to summarize a 192.168.0.0/16 route into the DMVPN. However, in doing so, you block the visibility of the other spokes. Therefore, you cannot summarize on the hub or run the risk of breaking spoke-to-spoke traffic. This gets fixed in Phase 3.

To migrate from a Phase 1 DMVPN to Phase 2, you simply need to remove the **tunnel destination 10.13.13.1** and replace it with **tunnel mode gre multipoint**, along with EIGRP config mentioned above (if it applies to your case). The end result looks like this:

*Hub*:

```
  interface Tunnel 0
   ip address 192.168.1.1 255.255.255.0
   tunnel source Loopback0
   tunnel mode gre multipoint
   ip nhrp authentication NHRP_authC
   ip nhrp map multicast dynamic
   ip nhrp network-id 13
   no ip split-horizon eigrp 13
   no ip next-hop-self eigrp 13
   no ip redirects
```

*Spoke:*

```
  interface Tunnel 0
   ip address 192.168.1.10 255.255.255.0
   tunnel source Loopback0
   tunnel mode gre multipoint
   ip nhrp authentication NHRP_authC
   ip nhrp map multicast dynamic
   ip nhrp network-id 13
   ip nhrp map multicast 10.13.13.1
   ip nhrp map 192.168.1.1 10.13.13.1
   ip nhrp nhs 192.168.1.1
   ip nhrp registration timeout 30
   ip nhrp holdtime 60
```

However, we can't stop with just that. As I mentioned above, we cannot summarize on the hub, and it takes a few packets for CEF to get rid of the invalid entries (move from process switches to CEF). To get around these shortcomings of Phase 2, and provide a true multi-access mGRE medium, Phase 3 DMVPNs started being used.

### DMVPN Phase 3

Finally! In this version of DMVPN, we can summarize and there's no more CEF invalid adjacencies. In order to accomplish this, we need only sprinkle a few more commands on our already solid tunnel.

The first command, **ip nhrp redirect** is configured on the hub. The command basically tells spokes "go ask him yourself", telling a spoke to speak directly to another spoke for informaion. This is a vital piece for the hub, so that the hub can allow spoke-to-spoke communication without being caught in the middle being the NHS.

The second command, of equal importance, goes on the spoke **ip nhrp shortcut**. This command tells the spokes "we can talk direct, it's fine". The two combine kind of work like this: Two people use a dating site (the NHS) to meet and chat. Now, they decide the other one isn't a serial killer, so it's okay for the two to talk directly (shortcut), and the dating site (NHS) gives them the personal information to do that (NHRP redirects).

This makes our final configuration look like the one below:

*Hub:*

```
  interface Tunnel 0
   ip address 192.168.1.1 255.255.255.0
   tunnel source Loopback0
   tunnel mode gre multipoint
   ip nhrp authentication NHRP_authC
   ip nhrp map multicast dynamic
   ip nhrp network-id 13
   no ip split-horizon eigrp 13
   no ip next-hop-self eigrp 13
   no ip redirects
   ip nhrp redirect
   ip nhrp shortcut
```

*Spoke:*

```
  interface Tunnel 0
   ip address 192.168.1.10 255.255.255.0
   tunnel source Loopback0
   tunnel mode gre multipoint
   ip nhrp authentication NHRP_authC
   ip nhrp map multicast dynamic
   ip nhrp network-id 13
   ip nhrp map multicast 10.13.13.1
   ip nhrp map 192.168.1.1 10.13.13.1
   ip nhrp nhs 192.168.1.1
   ip nhrp registration timeout 30
   ip nhrp holdtime 60
   ip nhrp shortcut
```

This is a completely valid Phase 3 DMVPN configuration. "But wait!" you're saying, "there's no crypto!" You would be completely correct. DMVPNs refer to the Dynamic Multipoint Virtual Private Network... no where does that say security. However, it's probably a good idea to throw encryption over top of this tunnel, especially if you're running it over the Internet. I purposefully left it off to show, crypto is not part of the DMVPN configuration. Simply adding the proper ISAKMP and IPSec profiles provide the necessary encryption to secure this wonderful tunnel, as described in the DMVPN Encryption section.

## DMVPN Encryption

DMVPNs, by definition, are simply mGRE tunnels on steriods, and GRE tunnels do not implicitly encrypt. Instead, the GRE tunnel does just as the name implies, and tunnels a layer 3 protocol over a layer 3 protocol. However, GRE tunnels allow a protection profile to be applied to add a layer of encryption over top of them. To start, we need to make an ISAKMP policy, using the following as a template:

```
 crypto isakmp policy 10
  encryption 3des
  authentication pre-share
  hash md5
  group 2
 crypto isakmp key SECRET_KEY address 0.0.0.0 0.0.0.0
```

Next, we need to create the IPSec policy as well, which will be tied to the tunnel itself.

```
 crypto ipsec transform-set TS_DMVPN esp-3des esp-md5-hmac
  mode transport
 crypto ipsec profile DMVPN_IPSec
  set transform-set
 interface Tunnel0
  tunnel protection ipsec profile DMVPN_IPSec
```

At this point, the tunnel is now protected, and traffic will be encrypted with the encryption specified in the transform set. The ISAKMP policy is used to negotiate Phase 2 of the encryption (the IPSec), but you can use certificates or other methods. Pre-shared keys aren't the most secure, because well, sharing is in their name. But with proper security controls in place, they will suffice.
