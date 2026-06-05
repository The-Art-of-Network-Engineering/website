---
title: "tcpdump filters, an intro"
slug: "tcpdump-filters-an-intro"
publishedAt: "2021-01-04"
excerpt: "When learning, I often try to do as my teacher. For example, when I went through Kirk Byers free network automation course he used Vim exclusively which meant I got to get pretty comfortable with it myself. Now that I'm..."
author: "Andre Roberge"
---

When learning, I often try to do as my teacher. For example, when I went through Kirk Byers [free network automation course](https://pynet.twb-tech.com/) he used Vim exclusively which meant I got to get pretty comfortable with it myself. Now that I'm on to day 2 materials of my [SANS SEC503 course](https://www.sans.org/cyber-security-courses/intrusion-detection-in-depth/) I find myself getting deep into tcpdump. In day 1 a lot of things could either be done with Wireshark or tcpdump but in day 2 there is a bigger emphasis in getting the most out of tcpdump. The instructor seems to really fancy utilizing tcpdump filters over looking things over in Wireshark so I might as well buckle down and do as my instructor once more! Furthermore, as I've experienced in person and discussed in this class, attempting to open a very large pcap in Wireshark is most likely not to go well. Instead, we should be able to narrow our search and extract a smaller subset of data in tcpdump before we open it up in Wireshark. What better way to grasp the material than attempt to explain it! Strap in!

To get to where we need to I will need to introduce a few things before we get our hands dirty using filters in tcpdump. To start, let's explore one of the most famous interview questions, at least at the junior positions in tech, the tcp 3-way handshake. Below is Figure 7 from [RFC 793](https://tools.ietf.org/html/rfc793#section-3.4), Transmission Control Protocol.

```
      TCP A                                                TCP B

  1.  CLOSED                                               LISTEN

  2.  SYN-SENT    --> <SEQ=100><CTL=SYN>               --> SYN-RECEIVED

  3.  ESTABLISHED <-- <SEQ=300><ACK=101><CTL=SYN,ACK>  <-- SYN-RECEIVED

  4.  ESTABLISHED --> <SEQ=101><ACK=301><CTL=ACK>       --> ESTABLISHED

  5.  ESTABLISHED --> <SEQ=101><ACK=301><CTL=ACK><DATA> --> ESTABLISHED

          Basic 3-Way Handshake for Connection Synchronization
```

We can see 2 flags being sent along with sequence and acknowledgement numbers to establish the connection, namely, SYN and ACK.

SYN - Session init request by client  
SYN/ACK - Server response to SYN, reflecting a listening port  
ACK - Acknowledge data, flag should be set on every packet afer the init SYN

Now let us look at the TCP Header to examine where these flags exist, also taken from [RFC 793](https://tools.ietf.org/html/rfc793#section-3.4).

```
TCP Header Format

    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |          Source Port          |       Destination Port        |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                        Sequence Number                        |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                    Acknowledgment Number                      |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |  Data |           |U|A|P|R|S|F|                               |
   | Offset| Reserved  |R|C|S|S|Y|I|            Window             |
   |       |           |G|K|H|T|N|N|                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |           Checksum            |         Urgent Pointer        |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                    Options                    |    Padding    |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                             data                              |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

                            TCP Header Format
```

To understand what we are looking at in the header we must first understand how it is broken down. Each number across the top numbering 1 - 8 represents 1 bit. 4 bits = 1 nibble and 2 nibbles = 1 byte. For example, the first field titled 'source port' is 2 bytes/4 nibbles/16 bits long.

The next thing we need to understand before we dive into tcpdump is offset numbers. When looking at the tcp header diagram above, starting in the top left corner, every byte will be one offset starting with 0. Thus, if we look at 'source port' it's contents take up both offset 0 and 1. Offset 0 would by the high order byte and offset 1 would be the low order byte for the 'source port' part of the TCP header.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/12/tcp-header.png-1.jpg?w=1024)

Explaining high order vs low order could be a post of it's own i suppose, but for our purposes here i'll try to summarize it into two sentences. If a number is on the left it is usually of more importance in that it effects the overall number more than a number on the right. If you change a number in the tens place [left] you cause more overall change than if you change a number in the ones place [right].

To get back to the TCP handshake, we can see all the flags are located in offset 13. Again simply count each byte starting at 0 from the top left to find out your offset number.

```
TCP Header Byte Offset 13 [1 byte/2 nibbles]

CWR | ECE | URG | ACK | PSH | RST | SYN | FIN
```

Besides SYN and ACK we find the following additional flags:

PUSH - Send data  
URG - Signal for out-of-band data  
FIN - Graceful termination  
RST - Immediate termination  
ECE, CWR - Explicit congestion notification related

Alright, now that we have a bit of background taken care of let us get to our first problem to solve. Use tcpdump commands to find TCP establishment attempts from clients to servers. From this filter we will be able to derive things such as what server ports did the clients attempt to establish a connection with.

First part of the question, find TCP establishment attempts, this would require the SYN bit be set to be turned on. In the following i'll show you what this will look like in offset 13. First in binary and then converting to hex which we will need for our tcpdump filter.

```
 8     4     2     1     8     4     2     1
CWR | ECE | URG | ACK | PSH | RST | SYN | FIN
 0  |  0  |  0  |  0  |  0  |  0  |  1  |  0
          0           |           2
                    0x02
```

Thus, our first tcpdump command and filter will be a variation of:

```
tcpdump -r <file.pcap> -nt 'tcp[13] = 0x02'
```

The '13' is the offset within the tcp header we are matching and '= 0x02' means that we are only matching to the SYN packet being set which I think is easy to visualize when looking at the binary conversion we did above. The tcpdump option of '-r' is simply reading the file that follows meanwhile '-n' suppresses hostname lookups and the -t option hides the timestamps in the output.

Sample output from a single matched packet:

```
IP 192.168.10.59.55796 > 192.168.10.7.25: Flags [S], seq 2766660809, win 29200, options [mss 1460,sackOK,TS val 86960251 ecr 0,nop,wscale 7], length 0
```

In this request, we can see that the client attempts to connect via port 25

Let's say we to run through the entire pcap file, pull out the port numbers and only display the unique ones we could run the following:

```
tcpdump -r <filename.pcap> -tn 'tcp[13] = 0x02' | cut -f 4 -d ' ' | cut -f 5 -d '.' | cut -f 1 -d : | sort -n | uniq -c
reading from file <filename.pcap>, link-type EN10MB (Ethernet)
      32  25
      32  53
      384 80
      15  445
      2   999
      1   4444
```

The cut tool is a fast way to parse text in linux. The -f option specifies which fields you want to capture while the -d option specifies what separates the fields. I created the above command by cutting up the first 20 packets till I got what I was looking for and then ran my filter on the entire file. To limit the amount of packets in the file you can use either the -c [number] option on tcpdump or | head.

To solidify our understanding let's try to see the servers response or in other words, the classic SYN ACK.

To visualize what we need to do in our tcpdump filter let's break it down to what that would look like in offset 13:

```
 8     4     2     1     8     4     2     1
CWR | ECE | URG | ACK | PSH | RST | SYN | FIN
 0  |  0  |  0  |  1  |  0  |  0  |  1  |  0
          1                       2
                     0x12
```

Above, we've turned on the ACK and SYN bits in accordance with the tcp header diagram. Translating both nibbles into hex we end up with 0x12 and thus our filter would look like 'tcp[13] = 0x12'

```
tcpdump -r <filename.pcap> -tn 'tcp[13] = 0x12'
reading from file <filename.pcap>
IP 192.168.10.7.25 > 192.168.10.59.59756: Flags [S.], seq 2725832514, ack 2766660810, win 28960, options [mss 1460,sackOK,TS val 85610818 ecr 86920651,nop,wscale 7], length 0
```

In tcpdump a SYN ACK will be displayed as '[S.]' in the flags section. If you wanted to cut out the specific ports you can use the -c of tcpdump of the first 10 entries until you get your cut filter displaying what you want like we did in the first example but I won't demonstrate that again here.

Did you know we can use a mask with our search filter in tcpdump?!  Amazing right! This is what actually prompted me to write a blog about tcpdump filters in the first place. As you can see it took a bit of work to make it to this point but here is where things get fun.

Let's say you wanted to create a filter that will display all packets that has either a FIN or RST flag set.  In other words, we want to look at all the termination packets.

To do this, we want to have a mask that will ignore all of the bits except for what we care about, namely, RST and FIN. In the following I'm going to write out the same visualization I did when we came up with the mask above except I'm going to put an 'x' instead of a '1' on our important bits.

```
 8     4     2     1     8     4     2     1
CWR | ECE | URG | ACK | PSH | RST | SYN | FIN
 0  |  0  |  0  |  0  |  0  |  x  |  0  |  x
          0                       5
                     0x05
```

Since we are still in the 13th offset of the tcp header that remains the same. We attach our mask with the '&' operator.

```
tcpdump -r <filename.pcap> -nt 'tcp[13] & 0x05 != 0'
reading from file <filename.pcap>
IP 192.168.10.61.57956 > 192.168.10.7.25: Flags [F.], seq 1, ack 1, win 229, options [nop,nop,TS val 86920662 ecr 85610828], length 0
```

'!=' simply means not equal to. In this specific case we are saying if either of the bits we care about are turned on or both of them are turned on, we want to see them. In the tcpdumps flag section a termination will show either [F.] or [R.]

For our final act let's write a filter to match on TCP connecting on port 25 with both PUSH and ACK flags set and any other flags maybe set. You can tell hopefully just by reading this that we will need to use a mask since we see a 'maybe' in our problem statement.

```
 8     4     2     1     8     4     2     1
CWR | ECE | URG | ACK | PSH | RST | SYN | FIN
 0  |  0  |  0  |  x  |  x  |  0  |  0  |  0
          1                       8
                     0x18
```

Since we want both flags to be set, not either, we won't use '!= 0' instead we will make it '= 0x18'

```
tcpdump -r <filename.pcap> -tn 'tcp dst port 25 and tcp[13] & 0x18 = 0x18'
reading from file <filename.pcap>
IP 192.168.10.61.59756 > 192.168.10.7.25: Flags [P.], seq 15:108, ack 118, win 229, options [nop,nop,TS val 86920654 ecr 85610820], length 93: SMTP: MAIL FROM:<andre@bigpoop.net> SIZE=424
```

'tcp dst port 25' is a macro, meaning it can be run it as is instead of writing out which specifc bit in a offset needs to be on or off to work, someone wrote out a macro to make it easier. One other thing to notice in the filter above is that we used 'and' to connect the macro with our other search parameter and mask. So you can connect two search parameters with 'and' and you connect your search parameter with your mask with '&'

Let's say you didn't know the macro existed, you could look at the TCP header and see which offset the destination port is. Go ahead, go and count from the top left, each byte and see if you can get the correct offset numbers. Did you get it? Destination port numbers are set in offsets 2 and 3 and to get up to 25 like the original question asked above we only need the low order byte, offset 3.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/12/offset.jpg?w=1024)

So instead of writing 'tcp[13]' like in all of our previous examples remember that we are in offsets 2 and 3 here. The following is the logical equivilant to 'tcp dst port 25 and tcp[13] & 0x18 = 0x18' The purpose of this section is just to specify what is happening under the hood so to speak when you write out 'tcp dst port 25'

```
'tcp[2] = 0x00 and tcp[3] = 0x19 and tcp[13] & 0x18 = 0x18'
```

Also, as is the case in many different aspects of IT, there is more than one way to accomplish the same task. In this case, instead of using 'tcp[3] = 0x19 and tcp[2] = 0x00' we can shorten this up as 'tcp[2:2] = 0x0019' which means we are starting at the 2nd offset and matching the next 2 offsets.

It's been pretty fun learning about packet headers, hex and binary conversion, creating filters to include masks as a tcpdump filter option. The best part about learning about packet headers is that you can do so pretty easily. [Tcpdump](https://www.tcpdump.org/) and [Wireshark](https://www.wireshark.org/) can be installed simply and support is everywhere. You can start capturing your home lab within a few minutes! Also, networking instructors like Nick Russo have made pcaps highlighting certain types of traffic [publicly available](http://njrusmc.net/jobaid/jobaid.html). I'm planning on updating my progress as it relates to filters as I dive deeper into SEC503. I hope you'll join me :)
