---
title: "MPLS for Dummies"
slug: "mpls-for-dummies"
publishedAt: "2020-09-18"
excerpt: "This article first appeared on Aaron's Blog - aaronengineered.com"
author: "aaronengineered"
---

*This article first appeared on Aaron's Blog - [aaronengineered.com](https://www.aaronengineered.com/blog/mpls-for-dummies)*

MPLS can be a bit confusing because a technology… and well, it’s kind of a product too.

Hear me out.

In this post we will try to nail down exactly what it is even though that can be quite complex given that it can be a number of different things. The goal here is to make this less confusing and easy to comprehend.

That being said, there are two different ways to look at MPLS. One if you are a consumer, and one if you are a network engineer. We will look at both here.

## MPLS stands for Multi Protocol Label Switching

MPLS is a very common WAN technology that is sold by ISP’s (internet service providers).

If you are a business/consumer trying to create a WAN between your branches, the main goals of MPLS are to provide **guaranteed** traffic delivery, up time, and in most cases QoS metrics. All of this is achieved using the service providers network as your own private network.

As you can see, what you get here are a lot of guarantees and the use of a gigantic network as your own. That should be enough right there to get you excited. This is the core foundation of MPLS as a product. Being able to reliably deliver a service that is seemingly transparent to the end user.

The ISP is using a cool little technique called an ‘LSP’ - Label Switched Path to get your traffic from one site to another. When traffic enters the MPLS cloud, its first stop is an LSR – Label Switched Router (so appropriately named) where it is identified as a certain customer. Next, a label is applied to the customer traffic. That label is what will get you from one of your sites to the other.

Pretty straight forward stuff.

Here is a visual representation of the Label Switched Path, marked by the dotted purple line. The ISP network as represented by the cloud is full of Label Switched Routers which forward the customer traffic from London to New York.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/09/image.png?w=1024)

Let us now look at the exact same visual but instead this is what the customer perceives. Identified below by the red dotted line, is a conceptual view of what the private MPLS network looks like to each customer. It appears that the London and New York offices are directly connected! The MPLS behind the scenes magic is pretty much invisible to the end user!

Rad!

It shouldn’t matter to you as a customer what’s happening behind the scenes, necessarily. You just want to make sure that your traffic arrives guaranteed and private.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/09/image-1.png?w=1024)

To sum it up, the ISP has created a label switched path between two of my branch offices making it a direct route. This was accomplished by wrapping my traffic in a label.

And really, unless you are the ISP, why do you care how the traffic gets from London to New York just as long as it gets there?

Let’s stop there for a second. Are there other ways to make two geographically distant sites appear as one? Absolutely! You can learn more about those types [here](https://www.aaronengineered.com/blog/wan-for-dummies). Now lets take a peek under the hood.

## A bit more for the current and aspiring networking engineers

Of course this wouldn’t be complete without a few juicy details of how this works and why it’s so popular.

The first is the use of labels and why it’s more efficient than normal routing… well… used to be. In traditional routing there is a lookup done at each router to determine where that traffic has to be sent. That lookup takes some processing power from our routers CPU and that in turn takes a little time (think milliseconds). If this lookup happens at every router, we start adding up milliseconds pretty quickly and taxing our routers CPU. Now if you have 100,000 customers all trying to do the same thing you can see how this could get sticky, very quickly.

Since the label is already mapped to a predetermined path, the lookup time is much faster and as a result the forwarding of the packet or frame is much quicker. It’s almost like having one of those passes that gets you to the beginning of the line at Disney Land even when there’s a hundred people standing in front of you.

There are some technologies that exist that can make the speed advantage a non-issue these days. So while speed *was* a clear selling point in the past, it’s no longer something that can *only* be achieved by MPLS. However, other MPLS benefits like guaranteed up time and traffic segregation still exist making it a great technology still.

MPLS allows encapsulation of many different protocols since it’s protocol independent. Think, ‘multi’ in multi protocol label switching. This is why some consider it a layer 2.5 protocol. Referring to the OSI model, we know that routers look at layer 3 and switches look at layer 2 to make forwarding decisions. Since label switched routers look at a label injected between layers 2 and 3 instead and can encapsulate both Ethernet frames (layer 2) and IP (layer 3) we then arrive at layer 2.5. Seems logical.

Being able to encapsulate layer 3 and layer 2 gives the ISP the ability to provide different products using the MPLS technology. An example would be the encapsulation of layer 2. With that, they could provide one big ethernet domain for your sites. If the MPLS label was added to my ethernet frame, I could maintain the same broadcast domain between all of my sites if I wanted. The ISP network would still be transparent to me and all of my devices across all of the sites would be on the same subnet. It’s sort of like having one long private cable stretched between all of my sites no matter where they are or how far away from each other they are. That of course, is just one example of MPLS being a product and there are many although beyond the scope of this article.

## Final thoughts

I hear a lot of talk about MPLS not being a viable solution in today’s networks. That simply is just not the case for every network. While new technologies come out all the time all promising to make things easier or to be better, they are really just new tools to use. There isn’t and never has been a “one-size-fits-all” solution. Having guaranteed service metrics is a must-have for a lot networks today and that will continue to let MPLS be a viable solution for years to come.

Perhaps this will give you a new outlook on MPLS and how it could be beneficial in meeting your WAN needs.

Thanks for readaing!
