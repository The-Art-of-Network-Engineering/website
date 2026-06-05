---
title: "10 Pieces of Advice for Network Engineers"
slug: "10-pieces-of-advice-for-network-engineers"
publishedAt: "2020-11-23"
excerpt: "This article first appeared on Tim's blog, carpe-dmvpn.com"
author: "Andy Lapteff"
---

*This article first appeared on Tim's blog, [carpe-dmvpn.com](https://carpe-dmvpn.com/2020/05/22/10-pieces-of-advice-for-network-engineers/)*

Recently I saw a post where different network engineers I really respect gave advice for new network engineers and it got me thinking. What would my own rules be, if I were trying to hand down some wisdom (as if I were wise) to someone starting in the field?

#### Credibility is the most important thing you possess.

- More important than knowledge, connections, recognition and fame. Knowledge, connections, recognition and fame can be gained, lost, and regained. Credibility is a one-use item. Once lost, it is gone forever.

#### Own every mistake, no matter how stupid, no matter how large.

- Even if it means getting fired. The truth always comes out, somewhere things are logged, evidence can be correlated, etc. A mistake is a mistake and can be forgiven or at least understood. Hiding it, covering it up, and denying it will damage your career far more than a human error ever would. This industry is smaller than you think, you don’t want that reputation to follow you.

#### Trust but verify.

- If the sysadmin says the DHCP server is ‘having issues’, if the DBA says the database replication is ‘running slow’, if the infosec guy says there are strange traffic patterns, trust their expertise as you expect them to trust yours. Don’t be in such a hurry to push them away so you can get back to your own work. Be methodical. Take the extra time. If you give a noncommittal ‘No one else is having problems’ all you’ve done is ensure that person will be back with potentially useless evidence in five minutes, or worse, a critical incident is opened and it might be the network after all. Tell them what you need to further investigate, help them help you prove it’s not the network.

#### When there’s a fire, be the firefighter, not the police.

- In places with very punitive leadership, often a critical incident is less about restoring services than it is about clearing yourself as a suspect. If the hot potato is yours, there’s no point trying to hand it off, so don’t waste time. Similarly, when another team is desperately trying to blame you to save themselves, don’t panic. The root cause is the root cause already, it’s not going to change. Get services restored. Investigation comes later. By the time you are working on a critical incident it’s too late to panic about whether or not it’s the network. Above all, remember Rule #1 and Rule #2.

#### Wireshark doesn’t lie.

- No matter what strange things are happening, no matter how much it seems to be the network causing a problem, get a packet capture. I once implemented DHCP snooping and the next day DHCP was failing everywhere. After a Wireshark capture, it was proven to be an infosec security scanning application that locked the DHCP database on a Windows server so no new leases could be recorded. Wireshark showed the NACKs from the DHCP server rescinding the leases because it was unable to record the lease in the database. Critical incident root cause determined, not the network even though all the ‘evidence’ pointed that way. Get a packet capture.

#### When you are proven right, don’t be a jerk about it.

- Everybody gets to ride the Right and Wrong carousel from time to time. Your coworkers will appreciate the humility and understanding, and you’ll strengthen bonds instead of cutting them. There’s rarely a prize for being right, but there’s always one for being a jerk about it. Hint: It’s not a prize you want.

#### When you are proven wrong, don’t be a jerk about it.

- Don’t make up excuses for it. Don’t blame others (even if you believe others are to blame). It’s not a good look. If someone throws you under the bus, that will come out later when they do it to another. Guard your credibility. Everyone is wrong eventually, but how you act when wrong is how people will remember you.

#### There’s no such thing as being irreplaceable.

- Don’t hoard knowledge and don’t try to become Brent from the Phoenix Project. If Brent had been a cantankerous ass who refused to train anyone, he would have been a liability, not irreplaceable. In short: Job security is in sharing what you know and helping the team succeed, not in being the only one with the keys to the kingdom. Someone like that is a threat to an organization, not an asset, and they will be dealt with eventually.

#### Automation isn’t the cure for human error.

- It can minimize the occurrence, but make the blast radius global. Say it once more, with feeling. Automation allows you to screw up at scale. As the industry embraces network automation, remember that without understanding networking, how can you trust what you are automating?

#### Expertise is the result of experience.

- All experience is useful. I’ve learned a lot from labs, from production, consulting, reading, watching videos. I’ve learned more from failure than success. Those who shortcut expertise doom themselves to a career of chicanery. Yes, I’m talking about cheating. Stop a moment and consider the end result of passing a test without the expertise associated. What is the next step, exactly? Will your next job have a dump of their network for you? The sad fate of these people is they tend to bounce from job to job quickly, as their lack of expertise is uncovered. Don’t doom yourself to a career of jumping around as you get discovered as a fraud. It’s far easier to just learn expertise than to fake it.

So, I came up with ten. I could have done far more but that was the idea, 10 essential rules. I’ll present them here, and I’m curious how you feel about them. So curious that I’m actually updating my blog.  
  
By the way, here’s a link to that post, it’s far better than anything I can write. <https://twitter.com/rowelldionicio/status/1262874206233980928>
