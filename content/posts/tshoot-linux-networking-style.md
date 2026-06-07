---
title: "TSHOOT - Linux Networking Style"
slug: "tshoot-linux-networking-style"
publishedAt: "2021-05-07"
excerpt: "When I got restarted in networking circa 2018-19 everyone on my timeline would always profess how much they loved Cisco's TSHOOT exam. People had tickets to do and felt like they were showing off what they knew, their..."
author: "Andre Roberge"
---

When [I got restarted](/blog/starting-over) in networking circa 2018-19 [everyone](https://www.youtube.com/watch?v=m5qsxBwXGB0) on my timeline would [always profess](https://twitter.com/Cisco_Panther/status/1126869523112574979?s=20) how much they [loved Cisco's TSHOOT exam](https://twitter.com/mrTeigen/status/1182243098304352256). People had tickets to do and felt like they were showing off what they knew, their experience, rather than answering trivia questions. "[I always recert my CCNP with the TSHOOT exam...](https://twitter.com/showipintbri/status/1015195165164752896?s=20)" or so the story went.

Enter [Cumulus Linux](https://docs.nvidia.com/networking-ethernet-software/cumulus-linux-43/), the networking arm of [Nvidia](https://blogs.nvidia.com/blog/2020/06/16/cumulus-programming-networks/). They've had a [cumulus in the cloud](https://www.nvidia.com/en-us/networking/network-simulation/) offering for sometime now and I logged in the other day after a long hiatus just to check things out. They are currently running [Cumulus Linux version 4.3](https://app.vagrantup.com/CumulusCommunity/boxes/cumulus-vx) with [vim](https://www.vim.org/) now on it's standard image :)

https://twitter.com/HugOfThunder/status/1386888982366089217?s=20

Cumulus Linux - Where Networking Magic is Created

There was one new thing that really caught my eye. One of the 'Demo Modes' they have now, once you are all logged in and have your virtual 2 racks of equipment powered on, virtually cabled and spun up is called '[Challenge Labs](https://gitlab.com/cumulus-consulting/education/cumulus-challenge-labs).' Currently, there are 4 challenge labs. Each lab is loaded and solution validated from the oob-management-server within the topology by way of an bash script. To load the first challenge you simply run a bash script that loads the configuration to the applicable devices using an ansible playbook.

```
cumulus@oob-mgmt-server:~/cumulus-challenge-labs$ ./run -c 1 -a load
```

**Challange #1**

```
Server01 is unable to ping server02 or server03. Server02 and server03 are able to ping each other.
```

![](/blog-images/tshoot-linux-networking-style/topology.jpg)

Challenge #1 Topology

Here we go! Are your wheels spinning? Are you coming up with possible issues and areas to look? The first thing I like to do when I first encounter a problem ticket is:

1. Check power ([is it plugged in?](https://twitter.com/andylapteff/status/235753515249696768?s=20))
2. Check physical connections ([is the ethernet cable plugged in](https://twitter.com/pzr/status/1157371840169422849?s=20)?)
3. Verify the documentation/topology ([fix documentation if incorrect](https://twitter.com/0x535431/status/1225905522861379585?s=20))
4. Recreate the issue, in this case, verify the ping fails from server01 -> server[02|03]

I don't really have to worry about power here since we are all virtual but I can verify that the IPs in the diagram and the interfaces connecting the devices are correct. Let's take a look at server01, is it's IP correct and is it using 'eth1' as specified in the diagram?

```
cumulus@server01:~$ ip a show eth1
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 44:38:39:00:00:32 brd ff:ff:ff:ff:ff:ff
    inet 10.1.10.101/24 scope global eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::4638:39ff:fe00:32/64 scope link
       valid_lft forever preferred_lft forever
```

Now, when we look into our first cumulus switch, I can discuss one thing that's really cool about it. You can check the port configuration the same way we did above, with 'ip a' or we can use more of a traditional 'command line' for a networking device utilizing what they call nclu ([network command line utility](https://docs.nvidia.com/networking-ethernet-software/cumulus-linux-43/System-Configuration/Network-Command-Line-Utility-NCLU/)). Let's log into leaf01 and have a look:

```
cumulus@leaf01:mgmt:~$ ip a show swp49
51: swp49: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9216 qdisc pfifo_fast master bridge state UP group default qlen 1000
    link/ether 44:38:39:00:00:59 brd ff:ff:ff:ff:ff:ff
```

So 'ip a' isn't showing us everything we want here but I think it's mighty cool that i'm on a 'switch' and i got native Linux commands at my disposal. We can tell we don't have an IP address configured so we are operating at layer 2 and we are up.

A command I like to go to straight away on a Cisco device is 'show ip int br' and we can get a lot of the same sort of data with Cumulus' nclu command 'net show interface':

```
cumulus@leaf01:mgmt:~$ net show interface
State  Name    Spd  MTU    Mode       LLDP                          Summary
-----  ------  ---  -----  ---------  ----------------------------  ---------------------------
UP     lo      N/A  65536  Loopback                                 IP: 127.0.0.1/8
       lo                                                           IP: ::1/128
UP     eth0    1G   1500   Mgmt       oob-mgmt-switch (swp10)       Master: mgmt(UP)
       eth0                                                         IP: 192.168.200.11/24(DHCP)
UP     swp1    1G   9216   Trunk/L2   server01 (44:38:39:00:00:32)  Master: bridge(UP)
UP     swp49   1G   9216   Trunk/L2   leaf02 (swp49)                Master: bridge(UP)
UP     bridge  N/A  9216   Bridge/L2
UP     mgmt    N/A  65536  VRF                                      IP: 127.0.0.1/8
```

With Cumulus, if configured, I always find myself typing 'net show lldp' as one of my first orientation sort of activities. [LLDP (link layer discovery protocol)](https://docs.nvidia.com/networking-ethernet-software/cumulus-linux-43/Layer-2/Link-Layer-Discovery-Protocol/)

```
cumulus@leaf01:mgmt:~$ net show lldp
LocalPort  Speed  Mode      RemoteHost       RemotePort
---------  -----  --------  ---------------  -----------------
eth0       1G     Mgmt      oob-mgmt-switch  swp10
swp1       1G     Trunk/L2  server01         44:38:39:00:00:32
swp49      1G     Trunk/L2  leaf02           swp49
```

OK. Now let's verify the issue. Let's see if server one can [ping](https://docs.nvidia.com/networking-ethernet-software/cumulus-linux-43/Monitoring-and-Troubleshooting/Network-Troubleshooting/) the other servers in the topology:

```
cumulus@server01:~$ ping 10.1.10.102 -c 3
PING 10.1.10.102 (10.1.10.102) 56(84) bytes of data.
From 10.1.10.101 icmp_seq=1 Destination Host Unreachable
From 10.1.10.101 icmp_seq=2 Destination Host Unreachable
From 10.1.10.101 icmp_seq=3 Destination Host Unreachable
--- 10.1.10.102 ping statistics ---
3 packets transmitted, 0 received, +3 errors, 100% packet loss, time 2034ms
pipe 3
cumulus@server01:~$ ping 10.1.10.103 -c 3
PING 10.1.10.103 (10.1.10.103) 56(84) bytes of data.
From 10.1.10.101 icmp_seq=1 Destination Host Unreachable
From 10.1.10.101 icmp_seq=2 Destination Host Unreachable
From 10.1.10.101 icmp_seq=3 Destination Host Unreachable
--- 10.1.10.103 ping statistics ---
3 packets transmitted, 0 received, +3 errors, 100% packet loss, time 2027ms
pipe 3
```

You may have seen the issue already, you may not. But let us get on the working switch, the one where both hosts can ping each other, and see if you can spot the difference:

```
cumulus@leaf02:mgmt:~$ net show lldp
LocalPort  Speed  Mode       RemoteHost       RemotePort
---------  -----  ---------  ---------------  -----------------
eth0       1G     Mgmt       oob-mgmt-switch  swp11
swp2       1G     Access/L2  server02         44:38:39:00:00:3a
swp3       1G     Access/L2  server03         44:38:39:00:00:3c
swp49      1G     Trunk/L2   leaf01           swp49
cumulus@leaf02:mgmt:~$
```

We can see that the 'good' switch has access ports to their servers and the 'bad' server is configured as a trunk. Two solutions come to mind straight away. One, we could configure the server link to the switch as a trunk. Since we are working with 'cumulus linux' within the challenge I'm going to assume we want to change leaf01 to have an access port to it's server, but with what [vlan](https://docs.nvidia.com/networking-ethernet-software/cumulus-linux-43/Layer-2/Ethernet-Bridging-VLANs/)? Let's check on leaf02:

```
cumulus@leaf02:mgmt:~$ net show bridge vlan
Interface  VLAN  Flags
---------  ----  ---------------------
swp2         10  PVID, Egress Untagged
swp3         10  PVID, Egress Untagged
swp49         1  PVID, Egress Untagged
             10
```

Aright, vlan 10 it is. One last thing I need to check out before logging off of leaf02 is a hint on what the command to use, for this I'll grep the configuration:

```
cumulus@leaf02:mgmt:~$ net show configuration | grep -B 4 -i access
  address dhcp
  vrf mgmt
interface swp2
  bridge-access 10
interface swp3
  bridge-access 10
```

Let's jump back on leaf01 and fix this issue once and for all:

```
cumulus@leaf01:mgmt:~$ net add interface swp1 bridge access 10
cumulus@leaf01:mgmt:~$ net commit
--- /etc/network/interfaces     2021-05-04 20:46:36.925028228 +0000
+++ /run/nclu/ifupdown2/interfaces.tmp  2021-05-05 00:42:00.327566444 +0000
@@ -7,20 +7,21 @@
 auto lo
 iface lo inet loopback
 # The primary network interface
 auto eth0
 iface eth0 inet dhcp
  vrf mgmt
 auto swp1
 iface swp1
+    bridge-access 10
 auto bridge
 iface bridge
     bridge-ports swp1 swp49
     bridge-vids 10
     bridge-vlan-aware yes
 auto mgmt
 iface mgmt
   address 127.0.0.1/8
net add/del commands since the last "net commit"
================================================
User     Timestamp                   Command
-------  --------------------------  ---------------------------------------
cumulus  2021-05-05 00:27:03.636686  net add interface swp1 bridge access 10
cumulus@leaf01:mgmt:~$ net show lldp
LocalPort  Speed  Mode       RemoteHost       RemotePort
---------  -----  ---------  ---------------  -----------------
eth0       1G     Mgmt       oob-mgmt-switch  swp10
swp1       1G     Access/L2  server01         44:38:39:00:00:32
swp49      1G     Trunk/L2   leaf02           swp49
cumulus@leaf01:mgmt:~$
```

Last thing to do is to log into server01 and see if I can now ping server[02|03]:

```
cumulus@server01:~$ ping 10.1.10.102 -c 3
PING 10.1.10.102 (10.1.10.102) 56(84) bytes of data.
64 bytes from 10.1.10.102: icmp_seq=1 ttl=64 time=20.8 ms
64 bytes from 10.1.10.102: icmp_seq=2 ttl=64 time=4.09 ms
64 bytes from 10.1.10.102: icmp_seq=3 ttl=64 time=3.48 ms
--- 10.1.10.102 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 3.489/9.475/20.844/8.042 ms
cumulus@server01:~$ ping 10.1.10.103 -c 3
PING 10.1.10.103 (10.1.10.103) 56(84) bytes of data.
64 bytes from 10.1.10.103: icmp_seq=1 ttl=64 time=5.85 ms
64 bytes from 10.1.10.103: icmp_seq=2 ttl=64 time=11.8 ms
64 bytes from 10.1.10.103: icmp_seq=3 ttl=64 time=2.76 ms
--- 10.1.10.103 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 2.768/6.825/11.853/3.772 ms
```

We've verified we have solved the issue, but I also want to let you know that the run script also comes with a verification option that will make sure you solved problem statement. To do this, we log back into the oob-server:

```
cumulus@oob-mgmt-server:~/cumulus-challenge-labs$ ./run -c 1 -a validate
Validating solution for Challenge 1 ...
PLAY [server] ******************************************************************
TASK [include_tasks] ***********************************************************
Wednesday 05 May 2021  00:57:25 +0000 (0:00:00.059)       0:00:00.059 *********
included: /home/cumulus/cumulus-challenge-labs/automation/roles/common/tasks/validate.yml for server03, server02, server01
included: /home/cumulus/cumulus-challenge-labs/automation/roles/common/tasks/validate.yml for server03, server02, server01
included: /home/cumulus/cumulus-challenge-labs/automation/roles/common/tasks/validate.yml for server03, server02, server01
TASK [Validate connectivity to server01] ***************************************
Wednesday 05 May 2021  00:57:25 +0000 (0:00:00.355)       0:00:00.415 *********
ok: [server01]
ok: [server03]
ok: [server02]
TASK [Display results for server01] ********************************************
Wednesday 05 May 2021  00:57:27 +0000 (0:00:02.523)       0:00:02.939 *********
ok: [server01] =>
  msg: 10.1.10.101 is alive
ok: [server02] =>
  msg: 10.1.10.101 is alive
ok: [server03] =>
  msg: 10.1.10.101 is alive
TASK [Validate connectivity to server02] ***************************************
Wednesday 05 May 2021  00:57:28 +0000 (0:00:00.112)       0:00:03.051 *********
ok: [server01]
ok: [server03]
ok: [server02]
TASK [Display results for server02] ********************************************
Wednesday 05 May 2021  00:57:30 +0000 (0:00:02.422)       0:00:05.474 *********
ok: [server01] =>
  msg: 10.1.10.102 is alive
ok: [server02] =>
  msg: 10.1.10.102 is alive
ok: [server03] =>
  msg: 10.1.10.102 is alive
TASK [Validate connectivity to server03] ***************************************
Wednesday 05 May 2021  00:57:30 +0000 (0:00:00.087)       0:00:05.561 *********
ok: [server01]
ok: [server03]
ok: [server02]
TASK [Display results for server03] ********************************************
Wednesday 05 May 2021  00:57:32 +0000 (0:00:02.087)       0:00:07.649 *********
ok: [server01] =>
  msg: 10.1.10.103 is alive
ok: [server02] =>
  msg: 10.1.10.103 is alive
ok: [server03] =>
  msg: 10.1.10.103 is alive
PLAY RECAP *********************************************************************
server01                   : ok=9    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
server02                   : ok=9    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
server03                   : ok=9    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
Wednesday 05 May 2021  00:57:32 +0000 (0:00:00.083)       0:00:07.732 *********
===============================================================================
Validate connectivity to server01 --------------------------------------- 2.52s
Validate connectivity to server02 --------------------------------------- 2.42s
Validate connectivity to server03 --------------------------------------- 2.09s
include_tasks ----------------------------------------------------------- 0.35s
Display results for server01 -------------------------------------------- 0.11s
Display results for server02 -------------------------------------------- 0.09s
Display results for server03 -------------------------------------------- 0.08s
cumulus@oob-mgmt-server:~/cumulus-challenge-labs$
```

So this wasn't the most complicated ticket, and the further challenges get a bit more involved to solve. My hope is that you can see how relatable the output is from the nclu if you are coming from learning or working on Cisco, Juniper or Arista. Also, if you love Linux how cool is it to have all this functionality in a native Linux platform?!

**Conclusion**

Seeing how easy (and FREE and easily accessible) it was to setup a lab and a challenge from within the lab I hope that you can see the potential of Cumulus VX as a learning platform. Furthermore, this challenge script found on the oob-server within this free cumulus in the cloud offering could be a [framework for future TSHOOT challenges](https://gitlab.com/cumulus-consulting/education/cumulus-challenge-labs).

If you want to run this lab locally, that's also no issue as they have their process documented on their [Gitlab repository](https://gitlab.com/cumulus-consulting/goldenturtle/cldemo2). Once more, you'd think with all the devices you'd need some special hardware but as I mentioned in an [earlier post](/blog/gitlab-hugo-website-magic-happy-time), a single instance of Cumulus Linux needs less than 1GB of ram.

Lastly, if you need help getting along, [the docs](https://docs.nvidia.com/networking-ethernet-software/cumulus-linux-43/) for cumulus are great and my friend Aninda Chatterjee has put together a great series of blog posts covering getting started with Cumulus Linux.
