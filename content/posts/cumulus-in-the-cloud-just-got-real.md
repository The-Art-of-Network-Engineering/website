---
title: "Cumulus in the Cloud Just Got Real"
slug: "cumulus-in-the-cloud-just-got-real"
publishedAt: "2021-08-02"
excerpt: "So I was just checking the Cumulus Docs as you do to see if they finished this feature I was really excited about and guess what, it looks to be up! The big thing I'd been waiting for was the ability to build your own..."
author: "Andy Lapteff"
---

So I was just checking the [Cumulus Docs](https://docs.nvidia.com/networking-ethernet-software/guides/nvidia-air/Custom-Topology/) as you do to see if they finished this feature I was really excited about and guess what, it looks to be up! The big thing I'd been waiting for was the ability to build your own topology on their '[Cumulus in the Cloud](https://www.nvidia.com/en-us/networking/network-simulation/)' platform. This will also be my first post, of which I'm somewhere up to 15, that will be primarily image driven so that I can show the true beauty of the platform.

![](https://artofnetworkengineering.com/wp-content/uploads/2021/07/screenshot-from-2021-07-31-13-49-10.png?w=800)

You'll have to create an account but accessing and using their platform comes with zero out of pocket, at worst, you may receive an email from time to time. Once you login you'll wind up on this screen, where you can choose between building a prebuilt simulation or creating your own.

![](https://artofnetworkengineering.com/wp-content/uploads/2021/07/screenshot-from-2021-07-31-13-50-29.png?w=800)

Alright, this is where I was getting a bit excited, my pupils began to dilate and a slight rush of euphoria began to run throughout my body. Let's click on 'Create your own' and check out this awesome UI!

![](https://artofnetworkengineering.com/wp-content/uploads/2021/07/screenshot-from-2021-07-31-14-34-35.png?w=800)

Alright, once you drag and drop your devices and connect them, which is very intuitive I might add, you'll be able to either save your simulation in a multitude of ways and/or simply start your simulation by clicking the button in the top right. Options you have of each node are host name, OS, Memory, CPUs and hardware model. All hardware model seems to do is map the correct amount of ports to the chosen model. If you wanted to, save this simulation for later use. You'd want to save this as a .dot file. I'm a leave it at default kind of guy when first trying something out.

Once you are all loaded up, you'll be able to console your devices right from the browser and all of your devices can be nicely tabbed in the same window, as shown below, for pretty gosh darn easy access.

![](https://artofnetworkengineering.com/wp-content/uploads/2021/07/screenshot-from-2021-07-31-14-52-12.png?w=800)

One thing you may want to consider when building a configuration is creating a ZTP file or just know that no configuration will be completed when your simulation comes online. Even devices you have connected in your prebuild beautiful UI will need to be administratively turned on once you are all booted up.

Another cool thing to check out, after you have fun connecting up and running all your little devices is cumulus netq, which is fun to check out from the gui or the command line.

The only thing that I tried to do, but couldn't get to work on the custom build as opposed to their prebuilt simulations was the ability to enable ssh. I kept getting an error, whereas, when I use the prebuilt configurations I'm able to upload a key and get a IP and port number so that I can connect to my simulation from my laptop instead of using the console through the website like I showed above. Perhaps I have to do a bit more configuration but adding a service isn't outlined in [the docs](https://docs.nvidia.com/networking-ethernet-software/guides/nvidia-air/Quick-Start/) as of this writing. One other thing I'll have to further investigate is what the minimum configuration needed to get my nodes connected to the internet like the prebuilt simulations are.

![](https://artofnetworkengineering.com/wp-content/uploads/2021/07/screenshot-from-2021-07-31-15-29-43.png?w=455)

What is cool is that you can, in perpetuity, run your network simulations on someone else's CPU cycles which I think is pretty darn cool. It lowers the barrier of what you need to build a multi-node simulation. You don't need your own server, just an internet connection. If time is running out on your current lab you can bring down your configuration and relaunch the same exact simulation. It's got to be possible to connect to your devices from your local machine and have the devices in your simulation connected to the internet which pretty much means the possibilities are endless.
