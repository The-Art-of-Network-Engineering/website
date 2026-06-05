---
title: "WAN for Dummies"
slug: "wan-for-dummies"
publishedAt: "2020-07-24"
excerpt: "Ok don’t be so hard on yourself you aren’t a dummy! Whew, now that we have gotten over that let’s talk about a few things."
author: "aaronengineered"
---

Ok don’t be so hard on yourself you aren’t a dummy! Whew, now that we have gotten over that let’s talk about a few things.

In this article we will explain what a WAN is, why you would have one, and a few different ways to create one.

But first, let’s give a brief overview of the LAN before we dive in.

## LAN: Local Area Network

![](https://artofnetworkengineering.com/wp-content/uploads/2020/07/lan_topo.jpg?w=644)

Example Local Area Network

It’s important to quickly touch on this here for reference. Local area networks are typically confined to one geographical space. Let’s say, an office building or even your own home as an example. In these networks all the components are designed to talk to each other using a combination of an IP address and a MAC address. The devices that move traffic from one device to another are called switches. And those switches use the MAC address of every device on the network to figure out where traffic needs to go. If you want to leave your LAN and go to the internet, enter the router. That device looks at the IP address you are trying to talk to and quickly determines that you are trying to find something that isn’t on the LAN and then promptly sends you out to the Internet. The router is going to play a key role going forward here so just keep that in mind.

OK - Pretty straight-forward so far. Let’s move on to the opposite of a LAN.

## WAN: Wide Area Network

![](https://artofnetworkengineering.com/wp-content/uploads/2020/07/wan.jpg?w=838)

Example of a WAN

Since a LAN is typically ‘Local’(duh) what happens if my business has more than one location? Or, what if my business utilizes a datacenter to store information? Well in that case you end up with more than one LAN.

There is a way to connect these LANs together to make them SEEM like one LAN. So if you find yourself with more than one location and have the need to share resources between them, you will need to create a WAN.

Just to clarify, we are taking two geographical disperse LANs and making it *feel* like one. Those LAN’s can be across the world or across the street from each other. It doesn’t make much of a difference. We certainly don’t want to limit ourselves here either. It can be WAY more than just two LANs becoming one. You could have 30 or 3,000 or 300,000… different LANs, it’s not just limited to two - you get the point.

To create this fancy new WAN, there are several different products and technologies that exist in the world to help us.

Here are just a few of the most popular ways.

## VPN

Virtual Private Network. The name pretty much is the recipe here. It is a technology that is designed to connect two different LAN’s together using the regular ole public Internet. Yep that same Internet you are using right now to read this.

A VPN can be created between two or more routers that support VPN tunneling and that are connected to the Internet.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/07/vpn-topo.jpg?w=822)

Example of a Virtual Private Network

That’s it! Pretty darn simple.

As you can probably figure out, this has the lowest barrier to entry. This obviously makes it a VERY popular choice among distributed businesses. It’s relatively easy to configure, and really doesn’t add much more in the way of cost because you are utilizing the Internet connection you already have. With that being said, of course you would need to have a device like I mentioned earlier that supports VPN functionality but most small business routers on the market do so perhaps you might incur a small cost there if you don’t already have this.

### There's more...

Head on over to Aaron Engineered's Blog to learn more about MPLS, and Metro Ethernet!

This blog article originally appeared on [AaronEngineered.com](http://www.aaronengineered.com/blog/wan-for-dummies) and was written by Aaron.
