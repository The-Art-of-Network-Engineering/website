---
title: "Smart Troubleshooting with PathSolutions"
slug: "smart-troubleshooting-with-pathsolutions"
publishedAt: "2022-04-13"
excerpt: "While troubleshooting issues is a fantastic skill to hone and practice, as network admins and engineers, it is not something we want to spend all of our time doing on a daily basis.  Rather than constantly working..."
author: "Tim Bertino"
coverImage: "/blog-images/smart-troubleshooting-with-pathsolutions.jpg"
---

While troubleshooting issues is a fantastic skill to hone and practice, as network admins and engineers, it is not something we want to spend all of our time doing on a daily basis.  Rather than constantly working through trouble tickets and “keeping the lights on”, we would like to use as much of our time and energy as possible on more strategic efforts to help the business succeed. One staple of network operations is having some sort of a network monitoring solution.  In the most basic form of network monitoring, our requirement is that we need to know when a device or link is down, or if there is some blatantly large problem that we want to make sure we know about.  It can be a very rough feeling to have a network device at a site go down over the weekend, and completely miss it because there was no monitoring/alerting, which makes it an instant emergency Monday morning when the first person gets there and has to call in and report the issue.  That is a really important function of a network monitoring solution, but should we accept that as being *enough*?  With just satisfying this basic requirement, it still leaves a lot of time and effort on the network admins and engineers to troubleshoot issues that are not as cut-and-dried as a device being in an up or down state.  What if a network monitoring solution could be more than just firing on standard alerts which still force staff to spend time manually finding issues and correlating events?  What if we could tap into all of the intelligence that is just sitting in our network devices?  What if we could leverage our network devices as sensors to feed our monitoring solution with data, and in turn the monitoring solution is able to analyze and correlate all of this information to then not only alert on issues, but give suggested troubleshooting steps so we do not have to do all of that manually?  All of these “what ifs” are addressed by PathSolutions in their TotalView product.

**What is PathSolutions TotalView?**

PathSolutions TotalView is a network monitoring solution, but not just any network monitoring solution.  You can think of it as a combined monitoring solution and digital troubleshooting assistant.  TotalView can provide not just alerts about problems, but actual recommendations on troubleshooting next steps.  Rather than receiving an alert about packets loss, or potentially nothing at all if the issue is around slowness or poor performance, you could receive a message that looks like the following:

![](/blog-images/smart-troubleshooting-with-pathsolutions/zucAJAmyFLbVfsOTCUcAGhh55mjWG9AXu659GF_WV3bgj0xx29G4EIY406Gfz3O4xz4RKPhxfUh5F-OG.jpg)

That message is very powerful for two reasons.  First, a junior or senior engineer has some direction on next steps to resolve an issue before having to log into any device and start information gathering and manually troubleshooting.  This is one of those “wins” that was brought up in the introduction.  TotalView can assist with initial troubleshooting so you do not have to spend the time and effort manually.  Secondly, the message above is powerful because the operations team can receive that alert and implement the recommended fix before an end user even reports the issue.  Let’s face it, sometimes people will just deal with an issue and accept the poor performance rather than report it as a problem.  Having this proactive visibility and assistance allows an IT operations team to provide real value to the organization they support.

**How does TotalView work?**

First off, a big claim to fame for TotalView is that it can be stood up and operational in less than twelve minutes.  TotalView consists of a lightweight Windows installer, and thus is designed to be implemented quickly and easily on a Windows virtual machine.  The solution is self-contained within that single VM installation.  There is no need for separate front end or database servers.  The PathSolutions stance on this is to provide a valuable network monitoring solution that does not take time and effort away from the IT operations teams to put a lot of care and feeding into the solution itself.  Once the server is up and running, it is to be configured with SNMP and SSH credentials, as well as relevant subnets to scan so that it can learn about all of the network devices in your environment.  TotalView can gain insights into Windows servers by leveraging WMI queries.  A benefit to subnet scanning is that once it is set up, it can catch new devices as they are implemented so that staff does not have to remember to manually add in new devices to the network monitoring solution.  Once TotalView has the subnet and credential information, it can continuously crawl the network to retrieve and correlate valuable operational information in your environment.

**Troubleshooting Highlights from TotalView**

Now, let’s take a look at the troubleshooting guidance from within the solution.  First off, from the main screen, we get a nice default breakdown of items like overall network health and charts of device manufacturers and different interface speeds in the environment.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/04/home.png?w=800)

Next, on the Network > Devices screen, we can see the environment inventory and start to see which devices are tagged as having issues, and drill in to see what specifically is at fault.  For example, in the demo environment, we can see that interface #4 on the Sauvignon switch has a peak daily transmit utilization of over 93 percent.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/04/utilization.png?w=800)

Further down on this screen, we see the TotalView Network Prescription that details the next steps to dig into this alert.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/04/prescription.png?w=800)

To highlight the power of the Network Prescription feature, here is another example.  A port on a switch is showing an error due to a high peak daily error rate.  Here are snippets of the Network Prescription section that can immediately point you in the right direction before even having to log into a device.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/04/mtu.png?w=800)

With this level of information and advice, we are empowered to resolve issues quickly and efficiently.

**Unleash Your Full Potential**

Are troubleshooting and fixing issues part of a network engineer’s life?  Of course they are, but we also need to find the time and energy to innovate and provide value to the businesses and customers that we support.  We cannot do that very well if we are constantly in break/fix mode, logging into device upon device gathering and correlating data manually to resolve each and every issue.  If we can tap into everything that our network already knows and get assistance with correlation and automated troubleshooting, we all win.  PathSolutions is here to help you unleash your full potential with TotalView.  Learn more at <https://www.pathsolutions.com/>.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/04/logo.png?w=473)
