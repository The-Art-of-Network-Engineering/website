---
title: "How to do a Basic Linux Server Installation using Ubuntu"
slug: "how-to-do-a-basic-linux-server-installation-using-ubuntu"
publishedAt: "2022-01-24"
excerpt: "In this article, we will show you how to do a basic Linux Server OS install using Ubuntu Server. Linux is an extremely popular operating system in our field. Many system builders will build their platform on Linux. As a..."
author: "Andy Lapteff"
---

In this article, we will show you how to do a basic Linux Server OS install using [Ubuntu Server](https://ubuntu.com/download/server). Linux is an extremely popular operating system in our field. Many system builders will build their platform on Linux. As a result, having the skills and experience with any version of Linux can help you navigate those platforms. Ubuntu Server is Open Source, and available for free, and can be installed on nearly any platform, physical or virtual. This makes it a platform for lab use, as well as production.

## The Install Procress

### Download the media

Go to <https://ubuntu.com/download/server> and click on Option 2 -Manual server installation

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-14.png?w=800)

### Prepare the media

Preparing the media will depend on what you're installing on to. If it's a physical machine you'll likely be going to create a bootable USB drive or if you're going to run a virtual machine you can just mount the ISO file directly. [Rufus](https://rufus.ie/en/) is a great tool for creating bootable USB drives for any bootable image.

### Boot from the Install Media

The first thing you'll do is select your language. Use the arrow keys to navigate the list and then press enter to select.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image.png?w=800)

Next, select your keyboard layout.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-1.png?w=800)

Then, select a Network Interface. In our case we only have a single network interface, named ens33, and it is connected to the network and getting a DHCP address.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-2.png?w=800)

A Proxy is sometimes used to connect to the Internet. All traffic is sent to a proxy address so it can be scrubbed to ensure security. If this is a home or lab network you likely do not have a proxy. Leave the line blank and press enter.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-3.png?w=800)

Ubuntu Archive Mirror Address is the location on the internet where Ubuntu will download updates from. Leave the default here and press enter.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-5.png?w=800)

Next, configure your local storage. By default (recommended) you can just use the entire disk. However, in a production environment, you may want to be more specific about partitioning the storage.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-6.png?w=800)

Review the Storage Configuration Summary and then use the arrow keys to navigate to Done and then press enter.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-7.png?w=800)

You'll be warned that the disk will be formated and all data will be lost. Use the arrow keys to highlight and select continue by pressing Enter.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-8.png?w=800)

Profile Setup - Here you enter in your name, the server's hostname, your username, and then your password. This is the first user and will also be an administrative level user with Root privileges.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-10.png?w=800)

Press the Space Bar to select Open SSH Server and then use the arrow keys to navigate down to, and select, Done by pressing enter. Open SSH Server will allow you to remotely access the server via SSH.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-11.png?w=800)

Ubuntu is now being installed. Monitor the progress here. It will take several minutes to complete.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-15.png?w=800)

Once the installation is complete you'll see the Reboot Now option at the bottom of the screen. Use the arrow keys to highlight it and then press Enter.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-13.png?w=800)

You will be prompted to remove the installation media so that upon reboot the installation process doesn't start all over again.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-16.png?w=800)

## Post Installations Tasks

After the installation completes there are a few things you may want to do, such as applying updates, setting a statically assigned IP address, or adding additional users.

After rebooting you'll be at a login prompt. Enter in the username and password that you created earlier to get going.

### Download and Apply Available Updates

First, let's download and apply package updates that may have come out since the build was created. To do that we'll use a couple of commands. First, is 'sudo apt update' for you first-time Linux users let's break that down. Sudo is short for Super User Do - basically the "run as administrator" of the Linux world. Apt is short for Apt-get or Aptitude, and is a package handler for Debian flavors of Linux. On Red Hat flavors of Linux, such as REHL - Red Hat Enterprise Linux, CentOS, and Fedora, you would use Yum as the package Handler.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-17.png?w=800)

This refreshes the package database and can tell you how many packages that have updates available. In the above screenshot we see 87 packages can be upgraded. To get a detailed list of available updates we can run "apt list --upgradeable."

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-18.png?w=800)

Here we have a list of all of the packages, in green, listed with a / and then the latest version of that package, followed by a set of square brackets with the currently installed version within.

To execute the upgrade we can run sudo apt upgrade. This will list all of the packages that have updates available, and the size on disk these updates will take to install. In this example, we see the updates will take up 399 MB of disk space.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-19.png?w=800)

At the prompt press Y and then enter to continue.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-20.png?w=800)

The package manager will go through and apply all of the available updates.

### Setting a Static IP

A statically assigned IP address makes management of a remote host a little bit easier in that you'll always know what the IP address is for that host. First let's view the IP Address information for our host. Use the command 'ip address'

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-21.png?w=800)

In this example we can see this device has two network interfaces, the Loopback which is lo here, and the Ethernet Adapter, ens33. To view the IP info for a specific adapter you can use the command IP address show dev [device name]:

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-22.png?w=800)

Newer versions of Ubuntu use netplan to manage Network Adapters. There's a folder under /etc/ called netplan that holds YAML configuration files for each network adapter. We can modify these files and set the desired configuration.

First let's look at the files in the /etc/netplan folder. To do this, run the command 'ls /etc/netplan'

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-23.png?w=800)

On this host, we only have the one file 00-installer-config.yaml. Your system may show more files depending on how many adapters are installed. Let's open that file and change the settings. Use the command sudo nano /etc/netplan/FILE-NAME.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-24.png?w=800)

First, let's start by changing the dhcpv4 key value from true to false. Use your arrow keys to navigate to that line. Then we'll add the following, addresses, gateway4, and nameservers. Pay particular attention to spacing. YAML files will not process correctly if the spacing and indentation is not correct. Your file should look something like this:

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-33.png?w=800)

Press control X to exit, and then press Y and Enter to confirm and save the changes you've made. Now let's go refresh Net Plan to pick up the changes. We do this by running the command 'sudo netplan apply.' You may be prompted to enter in your password again.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-26.png?w=800)

There isn't much for feedback here so let's go ensure the changes took affect with IP address show dev [DEVICE NAME]

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-27.png?w=800)

And now, we can see that it is, in fact, using the IP we configured in the netplan YAML file. We can further verify things are working by using the PING command to ping our local gateway, a DNS server out on the public internet, and we can verify DNS is working using the nslookup command.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-28.png?w=800)

### Add Users

Lastly, let's add some users. Perhaps we want to add users to our lab machines so we have extra accounts we can do testing with. In an Enterprise environment it's just a generally accepted best practice to give each user their own account. This is part of Authentication, Authorization, and Accounting. We need to know who the user is, give them the bare minimum privileges they need to do their work, and then log and verify their access to that system. If everyone shares the same user account we can't tell the difference between when one person or another uses it.

To add a user account we'll use the command adduser. Let's add the rest of the AONE Co-Hosts to the server. The syntax is 'sudo adduser *username*' Be prepared to enter in a password for the new user accounts.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-30.png?w=800)

The system also prompts you for some additional, but optional information. We can verify the user accounts have been added by listing all of the folders in the /home/directory, by typing ls /home/:

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-31.png?w=800)

Here we can see I've created a new user account for each AONE Podcast Co-Host. Now, let's add one of them to Super Users, or the sudo group, so they have administrator rights on the system. We do that using the usermod command with the -aG switch.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/01/image-32.png?w=800)

## Summary

In this article we showed you how to:  
1. Install Ubuntu Server  
2. Complete common post-installation tasks: Applying Updates, set a Static IP, and add additional user accounts.

Ubuntu is an extremely popular platform as it is Open Source and easy to learn Linux on. There are many other flavors of Linux out there, so do some research and find one that fits you the most!

We hope you enjoyed this article. If you had any trouble or would like to add to it you can [contact us](/sponsor), or connect with us on [Twitter](https://twitter.com/artofneteng)!
