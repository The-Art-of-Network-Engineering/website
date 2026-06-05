---
title: "We Don't Need No Stinkin' Flags! ACI External EPG Subnet Flags...Just for Fun!"
slug: "we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flags-just-for-fun"
publishedAt: "2020-09-11"
excerpt: "This post was originally written by Micheline Murphy, Cisco Learning Network VIP and Cisco Champion and first appeared on the Cisco Learning Network Blog"
author: "The AONE Team"
---

*This post was originally written by Micheline Murphy, Cisco Learning Network VIP and Cisco Champion and first appeared on the [Cisco Learning Network Blog](https://learningnetwork.cisco.com/s/blogs/a0D3i000002SKPVEA4/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flagsjust-for-fun)*

In ACI, the L3Out is a veritable Howl’s Moving Castle[[i]](https://learningnetwork.cisco.com/s/blogs/a0D3i000002SKPVEA4/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flagsjust-for-fun#_edn1) of configuration whose ultimate goal is to deliver external connectivity to the endpoints in the ACI fabric. All told, I think there are something in excess of twenty steps to go from zero to full connectivity between an outside subnet and internal EPG members. That includes configuring all of the pre-requisites needed to support a L3Out, all of the steps that enable internal EPGs to be able to share their own subnets, and all the contract config between EPGs. Representing the whole thing is the external EPG, which might possibly be the single most complicated object in the whole curious and delicate complex.

In this latest installment of ...Just for Fun, I take a deep dive into the external EPG and explore each of its eight flags.

## Topology

As always, I like to start with a tour of the local topology. Here you go.

![](/blog-images/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flags-just-for-fun/rtaImage.jpg)

In this topology, Leaf 101 and Leaf 102 belong to the ACI fabric. I just teased the two border leaf switches out of the cloud so we could see the important bits. As you can see, this physical topology will require the building of two L3Outs. Unsurprisingly, I called one L3Out\_via\_ASR-a and the other L3Out\_via\_ASR-b. Both L3Outs are associated with the same tenant, Bluefish.

There are four subnets involved—two /31 subnets for transit between the border leaf and its peer ASR router, and two /24 subnets that accessible via either ASR. For ACI, I’m using Release 3.2(4e) and the ASRs are Cisco 1002 IOS-XE Release 15.5(3)S4a.

I’m not going to go through the nitty-gritty of building the L3Out, but if you are interested in building an L3Out, I covered the topic in “Walking on the Wild Side: ACI External Layer 3 Networks...Just for Fun”.[[ii]](https://learningnetwork.cisco.com/s/blogs/a0D3i000002SKPVEA4/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flagsjust-for-fun#_edn1) Here, our starting point is that both L3Outs work and are passing routes.[[iii]](https://learningnetwork.cisco.com/s/blogs/a0D3i000002SKPVEA4/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flagsjust-for-fun#_edn2) L3Out\_via\_ASR-a uses OSPF and L3Out\_via\_ASR-b uses eBGP over OSPF.

## The Flag that is No Flag: Import Route Control Enforcement

First, let’s talk about the flag that isn’t. And that is Import Route Control Enforcement. Import Route Control Enforcement is an innocuous looking little check box that’s easy to skip over when you’re configuring the L3 Outside. If you look about halfway down, just before the VRF, you’ll find the little critter.

![](/blog-images/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flags-just-for-fun/rtaImage.jpg?eid=a0D3i000002SKPV&feoid=00N3i00000BnD8k&refid=0EM3i000000DjBJ)

It’s checked here, but by default it is not. The default behavior (that is, IMPORT = False, or unchecked) is for ACI to import all routes advertised to it from any peers on this L3Out. When the box is checked (IMPORT = True), ACI will only import specifically tagged routes.

Messing with Import Route Control Enforcement is not recommended, but if for some reason you need to lock down what routes come into your ACI fabric, you will need to be able to configure the corresponding flag that lets routes come into your fabric. That flag is called Import Route Control Subnet, and it is the first flag we will cover. You configure the Import Route Control Subnet flag on the External Network Instance Profile, external EPG, for short. If you look at the screenshot below, you can see where you need to navigate.

![](/blog-images/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flags-just-for-fun/rtaImage.jpg?eid=a0D3i000002SKPV&feoid=00N3i00000BnD8k&refid=0EM3i000000DjBK)

From here, you scroll down the Work Pane until you see Subnets. Double-clicking a subnet will bring you to a pop-up window where all of our external EPG subnet flags reside. Like this:

![](/blog-images/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flags-just-for-fun/rtaImage.jpg?eid=a0D3i000002SKPV&feoid=00N3i00000BnD8k&refid=0EM3i000000DjBL)

To configure the Import flag, check the box. Hit the submit button. Easy-peasy. But more important than just being able to configure this flag, we need to know what it does. With IMPORT = True, you must have this flag to identify any subnet you want ACI to learn from external neighbor. Let’s take a look at the border leaf routing table with IMPORT = True and with no flag.

```
apic1# fab 101 show ip route 172.50.1.0 vrf Bluefish:VRF1
```

```
----------------------------------------------------------------
```

```
Node 101 (aci1-leaf-101)
```

```
----------------------------------------------------------------
```

```
IP Route Table for VRF "Bluefish:VRF1"
```

```
'*' denotes best ucast next-hop
```

```
'**' denotes best mcast next-hop
```

```
'[x/y]' denotes [preference/metric]
```

```
'%<string>' in via output denotes VRF <string>
```

```
Route not found
```

```
... And now after the flag is checked.
```

```
apic1# fab 101 show ip route 172.50.1.0 vrf Bluefish:VRF1
```

```
----------------------------------------------------------------
```

```
Node 101 (aci1-leaf-101)
```

```
----------------------------------------------------------------
```

```
IP Route Table for VRF "Bluefish:VRF1"
```

```
'*' denotes best ucast next-hop
```

```
'**' denotes best mcast next-hop
```

```
'[x/y]' denotes [preference/metric]
```

```
'%<string>' in via output denotes VRF <string>
1. 172.50.1.0/24, ubest/mbest: 1/0
```

```
*via 172.30.0.2, eth1/48, [110/41], 00:00:08, ospf-default, intra
```

## We DO Need Some Stinking Flags: The Default Flag

If you go to add a new subnet to the external EPG, there’s always one flag that starts off as checked, the default flag, external subnets for the External EPG. This flag associates subnets with the external EPG. Without it, routes might pass, but traffic won’t be allowed because no contract will recognize the subnet as belonging to an EPG.

Let’s take a deeper look by examining 172.50.1.0, the subnet from ASR-a. I’ve gone and taken off all of its flags. First, we can see that the ACI fabric clearly receives the route from ASR-a. We can confirm that by both GUI and CLI. In the GUI, we can navigate to the OSPF Routes folder under the Configured Node of L3Out\_via\_ASR-a.

If you want to checkout the rest of this article head on over to Micheline's article on the Cisco Learning Network blog here: <https://learningnetwork.cisco.com/s/blogs/a0D3i000002SKPVEA4/we-dont-need-no-stinkin-flags-aci-external-epg-subnet-flagsjust-for-fun>
