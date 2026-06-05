---
title: "scapy or not, here I come!"
slug: "scapy-or-not-here-i-come"
publishedAt: "2021-02-01"
excerpt: "``
                     aSPY//YASa       
             apyyyyCY//////////YCa       |
            sY//////YSpcs  scpCY//Pp     | Welcome to Scapy
 ayp ayyyyyyySCP//Pp           syY//C    | Version 2.4.3
..."
author: "Andy Lapteff"
---

```
                     aSPY//YASa       
             apyyyyCY//////////YCa       |
            sY//////YSpcs  scpCY//Pp     | Welcome to Scapy
 ayp ayyyyyyySCP//Pp           syY//C    | Version 2.4.3
 AYAsAYYYYYYYY///Ps              cY//S   |
         pCCCCY//p          cSSps y//Y   | https://github.com/secdev/scapy
         SPPPP///a          pP///AC//Y   |
              A//A            cyP////C   | Have fun!
              p///Ac            sC///a   |
              P////YCpc           A//A   | Craft me if you can.
       scccccp///pSP///p          p//Y   |                   -- IPv6 layer
      sY/////////y  caa           S//P   |
       cayCyayP//Ya              pY/Ya
        sY/PsY////YCc          aC//Yp 
         sc  sccaCY//PCypaapyCP//YSs  
                  spCPY//////YPSps    
                       ccaacs         
                                       using IPython 7.11.0
```

I came across a pretty cool tool during the first part of section 3 of my SANS503 course: [Scapy](https://scapy.net/). Using this tool you can do many things, for example, read in packets, edit packets and create entirely new packets just to name a few.

The easiest way to get started it to just type out 'scapy' from your Linux cmd prompt and it'll drop you into a what looks like an interactive python interpreter.

```
>>>
```

From here, you can begin to craft your packet[s]. To do this, you'll create your packet by specifying values layer by layer. For example, you'll give arguments for your Ethernet layer, IP layer and application layer. I like to use the built in functions to see what's possible within a specific layer and view the specific syntax i'll need:

```
>>> ls(Ether)                                                                                                           
dst        : DestMACField                        = (None)
src        : SourceMACField                      = (None)
type       : XShortEnumField                     = (36864)
```

Not that we need to put values in this field as scapy is smart enough to use our own IP stack to fill in the layer two values, with that being said, if we are going to create a packet we still need Ethernet headers. For the sake of this post, lets put some values in there cause it's fun! Here's how we do that:

```
>>> e = Ether(src="11:22:33:44:55:66", dst="77:88:99:AA:BB:CC")
```

Since we used the ls(Ether) function we know the exact syntax to use when creating our 'e' variable, specifically 'src' and 'dst' in this case. We can simply type our new variable 'e' to see it's contents:

```
>>> e                                                                                                                   
<Ether  dst=77:88:99:AA:BB:CC src=11:22:33:44:55:66 |>
```

Next up, let's build our IP header, again, the easist way to get started and make sure you know the correct syntax is to use the call the ls(IP) function:

```
>>> ls(IP)                                                                                                              
version    : BitField (4 bits)                   = (4)
ihl        : BitField (4 bits)                   = (None)
tos        : XByteField                          = (0)
len        : ShortField                          = (None)
id         : ShortField                          = (1)
flags      : FlagsField (3 bits)                 = (<Flag 0 ()>)
frag       : BitField (13 bits)                  = (0)
ttl        : ByteField                           = (64)
proto      : ByteEnumField                       = (0)
chksum     : XShortField                         = (None)
src        : SourceIPField                       = (None)
dst        : DestIPField                         = (None)
options    : PacketListField                     = ([])
>>>
```

Now we know the syntax for each part of the IP packet when we create our new variable. Let's just specify the 'src' and 'dst' and leave every other value the scapy default.

```
>>> i = IP(src="10.0.0.1", dst="192.168.0.1")                                                                           
>>> e                                                                                                                   
<Ether  dst=77:88:99:AA:BB:CC src=11:22:33:44:55:66 |>
>>> i                                                                                                                   
<IP  src=10.0.0.1 dst=192.168.0.1 |>
>>>
```

Alright, now we can go up one layer and decide whether we want our packet to have a TCP or UDP header. Feeling inspired by a [David Bombal tweet](https://twitter.com/davidbombal/status/1347907183963328514?s=20) asking a question about traceroute, let's go the UDP route. Checking out the [Cisco documentation](https://www.cisco.com/E-Learning/bulk/public/tac/cim/cib/using_cisco_ios_software/cmdrefs/traceroute.htm) it looks like a traceroute is sent via UDP port 33434. If you've followed the post this far you should know the drill, let's ls(UDP) to see what our options are and syntax to use when creating our variable for this header:

```
>>> ls(UDP)                                                                                                             
sport      : ShortEnumField                      = (53)
dport      : ShortEnumField                      = (53)
len        : ShortField                          = (None)
chksum     : XShortField                         = (None)
>>>
```

A couple of things to note at this point. First off, scapy will compute a correct checksum when we end up creating our packet if we don't specify a value. Secondly, isn't this fun?! Let's create a UDP header with the variable 'u' and specify simply the destination port in accordance with traceroute documentation and leave everything else the scapy default:

```
>>> u = UDP(dport=33434)                                                                                                
>>> u                                                                                                                   
<UDP  dport=33434 |>
```

Last but not least we need an ICMP header to complete our crafted traceroute packet. I'm just going to create the header with scapy defaults throughout.

```
>>> icmp = ICMP()                                                                                                       
>>> icmp                                                                                                                
<ICMP  |>
```

I just remembered, if we are going to be 'crafting' a traceroute packet we will want to specify the TTL of 1 to start off, we don't want to keep the default TTL. In order to do this we have to know which header specifies this value. It's questions like these that I think crafting random packets really shines. We are getting to hammer down on layering, what's in each header and soon we will be putting all those layers together. Before I get too happy let me go in and change the TTL in the IP header:

```
>>> i.ttl=1                                                                                                             
>>> i                                                                                                                   
<IP  ttl=1 src=10.0.0.1 dst=192.168.0.1 |>
```

Before we put it all together let's take a look at everything we've done to this point in the order we will soon specify when we create our packet.

```
>>> e                                                                                                                   
<Ether  dst=77:88:99:AA:BB:CC src=11:22:33:44:55:66 |>
>>> i                                                                                                                   
<IP  ttl=1 src=10.0.0.1 dst=192.168.0.1 |>
>>> u                                                                                                                   
<UDP  dport=33434 |>
>>> icmp                                                                                                                
<ICMP  |>
```

Remember that the order is important because we can tell scapy to smash these together however we want, but if we do that, devices won't understand our packet. To put all our headers together we will use the variable 'packet' and '/' between each variable.

```
>>> packet=e/i/u/icmp                                                                                                    
>>> packet                                                                                                               
<Ether  dst=77:88:99:AA:BB:CC src=11:22:33:44:55:66 type=IPv4 |<IP  frag=0 ttl=1 proto=udp src=10.0.0.1 dst=192.168.0.1 |<UDP  dport=33434 |<ICMP  |>>>>
```

One last thing, to close this post out, let's export the viable 'packet' as a pcap file and then read in that file with tcpdump. If you need an intro on tcpdump [I wrote a quick intro as my first attempt at a 'technical' type post](/blog/tcpdump-filters-an-intro) a few weeks ago. We write our packet to a file using the wrpcap function:

```
>>> wrpcap("/tmp/trace.pcap", packet)                                                                                   
>>> exit()   
$ tcpdump -r /tmp/trace.pcap -xXve
reading from file /tmp/trace.pcap, link-type EN10MB (Ethernet)
19:21:03.223806 11:22:33:44:55:66 (oui Unknown) > 77:88:99:aa:bb:cc (oui Unknown), ethertype IPv4 (0x0800), length 50: (tos 0x0, ttl 1, id 1, offset 0, flags [none], proto UDP (17), length 36)
    bigASSpoop.comcast.net.domain > 192.168.0.1.33434: [|domain]
	0x0000:  4500 0024 0001 0000 0111 ef1e 0a00 0001
	0x0010:  c0a8 0001 0035 829a 0010 b254 0800 f7ff  
	0x0020:  0000 0000
```

We can see our source and destination MAC addresses have been inserted and it looks like my source IP got changed but the destination IP with the correct source port of 33434 like we specified are there and we can also see that the ttl is 1 like we specified. Hope you enjoyed this little walk through and are excited enough to dig into some reference docs and see all the things you can do with this application. Till next time!
