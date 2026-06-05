---
title: "Simple Cisco Text File Changes"
slug: "simple-cisco-text-file-changes"
publishedAt: "2020-09-21"
excerpt: "This article first appeared on David's blog, zerosandwon.blog."
author: "David Alicea"
---

*This article first appeared on David's blog, [zerosandwon.blog](https://zerosandwon.blog/2020/08/31/simple-cisco-text-file-changes/).*

As we are busy diving into the world of programming and automation, I’d like to remind everyone of a way to make simple config changes to a Cisco switch or router using a text file. This might not be a breakthrough, but it helps when making changes to switches or routers when those changes can possibly disconnect you from the device. Imagine working on a re-IP of a switch or even a point to point link. You have your notepad ready to go. There is a new IP and default route and all you have to do is copy/paste. You paste in the IP and lose connection. Your default route change never actually pasted because you lost connection right after the IP change. You can no longer connect to the device; panic ensues. What might be a better way to make this change and avoid the “Uh oh!” moment?

In this scenario, we need to re-IP an administrative network, specifically a switch from the 192.168.50.64/26 network to 192.168.35.0/24 network. For the example, our switch has an IP on VLAN1 of 192.168.50.112. The default-gateway command is pointing to 192.168.50.65.

![](/blog-images/simple-cisco-text-file-changes/current-config.jpg)

I would like to re-IP the switch to 192.168.35.5/24 with the gateway of 192.168.35.100 on another network that exists on the switch, VLAN 21. If I was onsite, I might just console in and make the changes. Sometimes this is not possible. You might be remote or the switch might not be in a convenient or accessible area to let you setup a console connection. I’ll create a notepad with the following config:

![](/blog-images/simple-cisco-text-file-changes/newconfig-file.jpg)

Let’s save that notepad file as **NewConfig.txt**. Now we need to send the file over to the switch. You can use FTP or whatever method you normally transfer files to devices with. My goal is to send the file over to this switch’s Flash.

![](/blog-images/simple-cisco-text-file-changes/send-file-to-flash.jpg)

Once the file is there we are ready to go. Perhaps we need to wait for a specific change window for the re-IP. Either way, you will have the text file ready to make the changes for you. Once the change window is active, login to the switch and run the following command: **copy**<file path>**\NewConfig.txt running-config**. For this switch specifically, it is **copy flash:\NewConfig.txt running-config**. This will copy the config changes into your device’s running configuration. As I was connected to the old IP, I will lose connection and have to reconnect to the new IP address. You can see the change in pings below.

![](/blog-images/simple-cisco-text-file-changes/new-pings.jpg)

That is it! Using the notepad file I was able to re-IP the switch on a different interface VLAN and change the default-gateway.

![](/blog-images/simple-cisco-text-file-changes/new-config.jpg)

There is plenty more you can do with a notepad. Years back, I’ve had some scenarios were multiple devices needed to be re-IP’d in a certain window and this helped complete the project in a couple of clicks. You can save some time and pre-stage some changes for an upcoming change window and run the notepad files. I am sure software can take care of most scenarios, but for now this has been your old-school tip.
