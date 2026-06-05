---
title: "tshark the best?!"
slug: "tshark-the-best"
publishedAt: "2021-04-12"
excerpt: "I wrote a quick intro to tcpdump some months ago as I was learning about the tool and I thought it was just the best. You only love what you know right?! Well last week I embarked on a quest to find some flags on..."
author: "Andre Roberge"
---

I wrote a [quick intro to tcpdump](/blog/tcpdump-filters-an-intro) some months ago as I was learning about the tool and I thought it was just the best. You only love what you know right?! Well last week I embarked on a quest to find some flags on [Cisco's CTF](https://ciscolive2021.sec.letsplayctf.io/) 2021 using tshark. I mean, I originally tried to use tcpdump but since their file was saved as a pcapng it was not compatible without a little more work. [Mr. Tony E](https://twitter.com/showipintbri) has a how-to on trace wrangler coming up on a [network collective](https://networkcollective.com/) live-stream that can solve non-compatibility pcapng issues, and I digress.

The first thing people like to do when they encounter a new pcap is to get the lay of the land so to speak. If they were in Wireshark, most likely they'd venture into the Statistics tab and check out 'Capture File Properties' and 'Protocol Hierarchy.' Can we get this sort of information from the command line? You bet your bottom dollar we can! The first tool we can use is called capinfos:

```
$ capinfos ctf.pcap 
File name:           ctf.pcap
File type:           Wireshark/... - pcapng
File encapsulation:  Ethernet
File timestamp precision:  microseconds (6)
Packet size limit:   file hdr: (not set)
Number of packets:   203 k
File size:           97 MB
Data size:           88 MB
Capture duration:    330489.302412 second
First packet time:   2021-02-12 19:44:00.093265
Last packet time:    2021-02-16 15:32:09.395677
Data byte rate:      266 bytes/s
Data bit rate:       2,135 bits/s
Average packet size: 432.96 bytes
Average packet rate: 0 packets/s
SHA256:              127353c65071e00c66dd08011e9d45bc75fe8030d3134db061781e7bf97b21b0
RIPEMD160:           d3b4062292749b33aef0d6abf74bf42ee90e900d
SHA1:                9850abbf26d14f2636e1e65d6c64841047317f17
Strict time order:   False
Capture oper-sys:    64-bit Windows 10 (2004), build 19041
Capture application: Mergecap (Wireshark) 3.4.0 (v3.4.0-0-g9733f173ea5e)
Capture comment:     TraceWrangler v0.6.8 build 949 performed the following editing steps:   - Replacing Linux Cooked header with Ethernet header  
Number of interfaces in file: 2
Interface #0 info:
                     Encapsulation = Ethernet (1 - ether)
                     Capture length = 262144
                     Time precision = microseconds (6)
                     Time ticks per second = 1000000
                     Time resolution = 0x06
                     Number of stat entries = 0
                     Number of packets = 203528
Interface #1 info:
                     Encapsulation = Ethernet (1 - ether)
                     Capture length = 262144
                     Time precision = microseconds (6)
                     Time ticks per second = 1000000
                     Time resolution = 0x06
                     Number of stat entries = 0
                     Number of packets = 247
```

We can glean how long the trace took place, how many packets we have, among other things. Believe it or not we can also get some protocol statistics using tshark, getting the same info you would in Wireshark!

```
$ tshark -qz io,phs -r ctf.pcap 
===================================================================
Protocol Hierarchy Statistics
Filter: 
eth                                      frames:203775 bytes:88226987
  ip                                     frames:197880 bytes:85519998
    tcp                                  frames:174805 bytes:82885008
      vssmonitoring                      frames:9120 bytes:510720
      ssh                                frames:6410 bytes:1946553
        _ws.malformed                    frames:4 bytes:440
      http                               frames:7799 bytes:45700088
        data-text-lines                  frames:807 bytes:1001371
        urlencoded-form                  frames:34 bytes:13836
          http                           frames:6 bytes:3612
          tcp.segments                   frames:2 bytes:148
        png                              frames:62 bytes:180828
          _ws.unreassembled              frames:60 bytes:173448
        http                             frames:16 bytes:14456
          http                           frames:14 bytes:13706
            http                         frames:10 bytes:11568
              http                       frames:8 bytes:10188
                http                     frames:6 bytes:8540
                  http                   frames:4 bytes:6468
                    http                 frames:4 bytes:6468
                      http               frames:4 bytes:6468
                        http             frames:4 bytes:6468
        media                            frames:20 bytes:429928
          http                           frames:2 bytes:124660
            media                        frames:2 bytes:124660
      telnet                             frames:33006 bytes:2741153
        _ws.malformed                    frames:986 bytes:66470
        vssmonitoring                    frames:4 bytes:224
      ftp                                frames:71 bytes:6326
        ftp.current-working-directory    frames:71 bytes:6326
      mysql                              frames:1172 bytes:186711
        mysql                            frames:3 bytes:1437
          mysql                          frames:3 bytes:1437
            _ws.unreassembled            frames:3 bytes:1437
              mysql                      frames:3 bytes:1437
      data                               frames:559 bytes:60665
      tls                                frames:163 bytes:165596
        tcp.segments                     frames:18 bytes:14665
          tls                            frames:12 bytes:10517
      smtp                               frames:89 bytes:13675
        imf                              frames:1 bytes:406
      _ws.malformed                      frames:1 bytes:134
      snmp                               frames:96 bytes:12388
        snmp                             frames:3 bytes:303
          snmp                           frames:3 bytes:303
            snmp                         frames:3 bytes:303
              snmp                       frames:3 bytes:303
                snmp                     frames:3 bytes:303
                  snmp                   frames:3 bytes:303
                    snmp                 frames:3 bytes:303
                      snmp               frames:3 bytes:303
                        snmp             frames:3 bytes:303
                          snmp           frames:3 bytes:303
                            snmp         frames:3 bytes:303
                              snmp       frames:3 bytes:303
                                snmp     frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
                                ...snmp  frames:3 bytes:303
      ftp-data                           frames:5 bytes:45402
        ftp-data.setup-frame             frames:5 bytes:45402
          ftp-data.setup-method          frames:5 bytes:45402
            ftp-data.command             frames:5 bytes:45402
              ftp-data.command-frame     frames:5 bytes:45402
                ftp-data.current-working-directory frames:5 bytes:45402
      nbss                               frames:1 bytes:55
    udp                                  frames:22101 bytes:2493199
      sip                                frames:66 bytes:29741
      rpc                                frames:5 bytes:416
        portmap                          frames:5 bytes:416
      dns                                frames:21781 bytes:2427147
      data                               frames:91 bytes:8754
        vssmonitoring                    frames:2 bytes:112
      isakmp                             frames:2 bytes:364
      tftp                               frames:3 bytes:182
      snmp                               frames:55 bytes:4714
      cldap                              frames:4 bytes:377
      openvpn                            frames:5 bytes:280
      ntp                                frames:21 bytes:2770
        vssmonitoring                    frames:7 bytes:392
        _ws.malformed                    frames:1 bytes:56
      nbns                               frames:6 bytes:552
      ssdp                               frames:8 bytes:1096
      nat-pmp                            frames:2 bytes:112
        vssmonitoring                    frames:1 bytes:56
      coap                               frames:4 bytes:238
        _ws.malformed                    frames:1 bytes:56
      dtls                               frames:1 bytes:181
      bvlc                               frames:3 bytes:177
        bacnet                           frames:3 bytes:177
          bacapp                         frames:3 bytes:177
      rmcp                               frames:3 bytes:195
        ipmi_session                     frames:3 bytes:195
          ipmb                           frames:3 bytes:195
            data                         frames:3 bytes:195
      chargen                            frames:2 bytes:112
      l2tp                               frames:1 bytes:98
      mdns                               frames:2 bytes:176
      xdmcp                              frames:1 bytes:56
      memcache                           frames:1 bytes:56
        vssmonitoring                    frames:1 bytes:56
      quake3                             frames:1 bytes:56
        _ws.malformed                    frames:1 bytes:56
      rip                                frames:1 bytes:66
      cflow                              frames:21 bytes:14530
    icmp                                 frames:974 bytes:141791
      vssmonitoring                      frames:3 bytes:168
  arp                                    frames:4698 bytes:209862
  ipv6                                   frames:1157 bytes:2493613
    icmpv6                               frames:505 bytes:38222
    udp                                  frames:78 bytes:7687
      ntp                                frames:59 bytes:6490
      data                               frames:19 bytes:1197
    tcp                                  frames:574 bytes:2447704
      http                               frames:276 bytes:2414646
        data                             frames:7 bytes:99171
        data-text-lines                  frames:3 bytes:8826
      tls                                frames:9 bytes:10612
  llc                                    frames:32 bytes:2320
    stp                                  frames:31 bytes:1860
    cdp                                  frames:1 bytes:460
  loop                                   frames:6 bytes:360
    data                                 frames:6 bytes:360
  lldp                                   frames:2 bytes:834
===================================================================
```

Now that we got the lay of the land, seeing what our pcap is made up of, let's get into what we came to do! Using tshark to parse some packets :)

Enter tshark! [Tshark](https://www.wireshark.org/docs/man-pages/tshark.html) is the command line tool for Wireshark. It's core switches are very close to what you would use with tcpdump. To read in a file you would use '-r <filename>' or to sniff you'd use '-i <int name>'

I'm going to read in the value with the -c option which stands for count, so since I'm using '-c 1' I'll just get the first packet. If you were capturing traffic with the -i option and use the -c you'll limit how many packets you'll capture, just like tcpdump.

```
$ tshark -r ctf.pcap -c 1
1   0.000000 194.147.140.98 → 157.230.15.223 TCP 52138 33895 52138 → 33895 [SYN] Seq=0 Win=1024 Len=0
```

Do you remember how Wireshark has three separate panes by default? The first pane is the packet list, the second is the packet details, and the third is the packet bytes. In tshark, just reading in the file would get you the packet list. If you use the -V option you'll get everything in the packet details pane and the -x option will give you the packet bytes section.

In the following example i'll also use the '-Vx' as well as the '-c 1' option which will just display the first packet in all it's glory (frame 1).

```
$ tshark -r ctf.pcap -Vxc 1
Frame 1: 56 bytes on wire (448 bits), 56 bytes captured (448 bits) on interface unknown, id 0
    Interface id: 0 (unknown)
        Interface name: unknown
    Packet flags: 0x00000000
        .... .... .... .... .... .... .... ..00 = Direction: Unknown (0x0)
        .... .... .... .... .... .... ...0 00.. = Reception type: Not specified (0)
        .... .... .... .... .... ...0 000. .... = FCS length: 0
        .... .... .... .... 0000 000. .... .... = Reserved: 0
        .... ...0 .... .... .... .... .... .... = CRC error: Not set
        .... ..0. .... .... .... .... .... .... = Packet too long error: Not set
        .... .0.. .... .... .... .... .... .... = Packet too short error: Not set
        .... 0... .... .... .... .... .... .... = Wrong interframe gap error: Not set
        ...0 .... .... .... .... .... .... .... = Unaligned frame error: Not set
        ..0. .... .... .... .... .... .... .... = Start frame delimiter error: Not set
        .0.. .... .... .... .... .... .... .... = Preamble error: Not set
        0... .... .... .... .... .... .... .... = Symbol error: Not set
    Encapsulation type: Ethernet (1)
    Arrival Time: Feb 12, 2021 19:44:00.093265000 UTC
    [Time shift for this packet: 0.000000000 seconds]
    Epoch Time: 1613159040.093265000 seconds
    [Time delta from previous captured frame: 0.000000000 seconds]
    [Time delta from previous displayed frame: 0.000000000 seconds]
    [Time since reference or first frame: 0.000000000 seconds]
    Frame Number: 1
    Frame Length: 56 bytes (448 bits)
    Capture Length: 56 bytes (448 bits)
    [Frame is marked: False]
    [Frame is ignored: False]
    [Protocols in frame: eth:ethertype:ip:tcp:vssmonitoring]
Ethernet II, Src: fe:00:00:00:01:01, Dst: 00:00:00:00:00:00
    Destination: 00:00:00:00:00:00
        Address: 00:00:00:00:00:00
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
    Source: fe:00:00:00:01:01
        Address: fe:00:00:00:01:01
        .... ..1. .... .... .... .... = LG bit: Locally administered address (this is NOT the factory default)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
    Type: IPv4 (0x0800)
Internet Protocol Version 4, Src: 194.147.140.98, Dst: 157.230.15.223
    0100 .... = Version: 4
    .... 0101 = Header Length: 20 bytes (5)
    Differentiated Services Field: 0x00 (DSCP: CS0, ECN: Not-ECT)
        0000 00.. = Differentiated Services Codepoint: Default (0)
        .... ..00 = Explicit Congestion Notification: Not ECN-Capable Transport (0)
    Total Length: 40
    Identification: 0x8079 (32889)
    Flags: 0x0000
        0... .... .... .... = Reserved bit: Not set
        .0.. .... .... .... = Don't fragment: Not set
        ..0. .... .... .... = More fragments: Not set
    ...0 0000 0000 0000 = Fragment offset: 0
    Time to live: 244
    Protocol: TCP (6)
    Header checksum: 0x499b [correct]
    [Header checksum status: Good]
    [Calculated Checksum: 0x499b]
    Source: 194.147.140.98
    Destination: 157.230.15.223
Transmission Control Protocol, Src Port: 52138, Dst Port: 33895, Seq: 0, Len: 0
    Source Port: 52138
    Destination Port: 33895
    [Stream index: 0]
    [TCP Segment Len: 0]
    Sequence number: 0    (relative sequence number)
    Sequence number (raw): 3764456385
    [Next sequence number: 1    (relative sequence number)]
    Acknowledgment number: 0
    Acknowledgment number (raw): 0
    0101 .... = Header Length: 20 bytes (5)
    Flags: 0x002 (SYN)
        000. .... .... = Reserved: Not set
        ...0 .... .... = Nonce: Not set
        .... 0... .... = Congestion Window Reduced (CWR): Not set
        .... .0.. .... = ECN-Echo: Not set
        .... ..0. .... = Urgent: Not set
        .... ...0 .... = Acknowledgment: Not set
        .... .... 0... = Push: Not set
        .... .... .0.. = Reset: Not set
        .... .... ..1. = Syn: Set
            [Expert Info (Chat/Sequence): Connection establish request (SYN): server port 33895]
                [Connection establish request (SYN): server port 33895]
                [Severity level: Chat]
                [Group: Sequence]
        .... .... ...0 = Fin: Not set
        [TCP Flags: ··········S·]
    Window size value: 1024
    [Calculated window size: 1024]
    Checksum: 0x72f2 [correct]
    [Checksum Status: Good]
    [Calculated Checksum: 0x72f2]
    Urgent pointer: 0
    [Timestamps]
        [Time since first frame in this TCP stream: 0.000000000 seconds]
        [Time since previous frame in this TCP stream: 0.000000000 seconds]
VSS Monitoring Ethernet trailer, Source Port: 0
    Src Port: 0
0000  00 00 00 00 00 00 fe 00 00 00 01 01 08 00 45 00   ..............E.
0010  00 28 80 79 00 00 f4 06 49 9b c2 93 8c 62 9d e6   .(.y....I....b..
0020  0f df cb aa 84 67 e0 61 0b c1 00 00 00 00 50 02   .....g.a......P.
0030  04 00 72 f2 00 00 00 00                           ..r.....
```

That's pretty neat right? You can see all the way into the first packet and get a bunch of information. Well, turning back to using Wireshark, remember how you would filter packets based on DNS or ICMP or what have you in the 'display filter'? Well you can do that, with the same exact syntax, by using the -Y '<search\_term>' option. It's best practice to put your search term inside of quotes, so if you have more than one word or periods, strange bash things won't take place. Let's take a look:

```
$ tshark -r ctf.pcap -Y 'dns' | head
  312 422.644017    127.0.0.1 → 127.0.0.53   DNS 42891 53 Standard query 0xb27a PTR 223.15.230.157.in-addr.arpa OPT
  313 422.644227 157.230.15.223 → 67.207.67.2  DNS 56994 53 Standard query 0x01f9 PTR 223.15.230.157.in-addr.arpa OPT
  314 422.644279 157.230.15.223 → 67.207.67.3  DNS 57199 53 Standard query 0x19c9 PTR 223.15.230.157.in-addr.arpa OPT
  315 422.653585  67.207.67.3 → 157.230.15.223 DNS 53 57199 Standard query response 0x19c9 No such name PTR 223.15.230.157.in-addr.arpa SOA ns1.digitalocean.com OPT
  316 422.653761 157.230.15.223 → 67.207.67.3  DNS 57199 53 Standard query 0x19c9 PTR 223.15.230.157.in-addr.arpa
  317 422.656415  67.207.67.2 → 157.230.15.223 DNS 53 56994 Standard query response 0x01f9 No such name PTR 223.15.230.157.in-addr.arpa SOA ns1.digitalocean.com OPT
  318 422.656588 157.230.15.223 → 67.207.67.2  DNS 56994 53 Standard query 0x01f9 PTR 223.15.230.157.in-addr.arpa
  319 422.659817  67.207.67.3 → 157.230.15.223 DNS 53 57199 Standard query response 0x19c9 No such name PTR 223.15.230.157.in-addr.arpa SOA ns1.digitalocean.com
  320 422.662693  67.207.67.2 → 157.230.15.223 DNS 53 56994 Standard query response 0x01f9 No such name PTR 223.15.230.157.in-addr.arpa SOA ns1.digitalocean.com
  321 422.663035   127.0.0.53 → 127.0.0.1    DNS 53 42891 Standard query response 0xb27a PTR 223.15.230.157.in-addr.arpa PTR ubuntu-s-1vcpu-2gb-nyc1-01 PTR ubuntu-s-1vcpu-2gb-nyc1-01.local OPT
```

We can use our -xV options to look in the first packet displayed. If you look at the first packet you can see it's 'frame 312' and we will use the -c option to look just at this packet:

```
$ tshark -r ctf.pcap -Y 'dns' -xVc 312
Frame 312: 98 bytes on wire (784 bits), 98 bytes captured (784 bits) on interface unknown, id 0
    Interface id: 0 (unknown)
        Interface name: unknown
    Packet flags: 0x00000000
        .... .... .... .... .... .... .... ..00 = Direction: Unknown (0x0)
        .... .... .... .... .... .... ...0 00.. = Reception type: Not specified (0)
        .... .... .... .... .... ...0 000. .... = FCS length: 0
        .... .... .... .... 0000 000. .... .... = Reserved: 0
        .... ...0 .... .... .... .... .... .... = CRC error: Not set
        .... ..0. .... .... .... .... .... .... = Packet too long error: Not set
        .... .0.. .... .... .... .... .... .... = Packet too short error: Not set
        .... 0... .... .... .... .... .... .... = Wrong interframe gap error: Not set
        ...0 .... .... .... .... .... .... .... = Unaligned frame error: Not set
        ..0. .... .... .... .... .... .... .... = Start frame delimiter error: Not set
        .0.. .... .... .... .... .... .... .... = Preamble error: Not set
        0... .... .... .... .... .... .... .... = Symbol error: Not set
    Encapsulation type: Ethernet (1)
    Arrival Time: Feb 12, 2021 19:51:02.737282000 UTC
    [Time shift for this packet: 0.000000000 seconds]
    Epoch Time: 1613159462.737282000 seconds
    [Time delta from previous captured frame: 9.688921000 seconds]
    [Time delta from previous displayed frame: 0.000000000 seconds]
    [Time since reference or first frame: 422.644017000 seconds]
    Frame Number: 312
    Frame Length: 98 bytes (784 bits)
    Capture Length: 98 bytes (784 bits)
    [Frame is marked: False]
    [Frame is ignored: False]
    [Protocols in frame: eth:ethertype:ip:udp:dns]
Ethernet II, Src: 00:00:00:00:00:00, Dst: 00:00:00:00:00:00
    Destination: 00:00:00:00:00:00
        Address: 00:00:00:00:00:00
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
    Source: 00:00:00:00:00:00
        Address: 00:00:00:00:00:00
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
    Type: IPv4 (0x0800)
Internet Protocol Version 4, Src: 127.0.0.1, Dst: 127.0.0.53
    0100 .... = Version: 4
    .... 0101 = Header Length: 20 bytes (5)
    Differentiated Services Field: 0x00 (DSCP: CS0, ECN: Not-ECT)
        0000 00.. = Differentiated Services Codepoint: Default (0)
        .... ..00 = Explicit Congestion Notification: Not ECN-Capable Transport (0)
    Total Length: 84
    Identification: 0x16bf (5823)
    Flags: 0x4000, Don't fragment
        0... .... .... .... = Reserved bit: Not set
        .1.. .... .... .... = Don't fragment: Set
        ..0. .... .... .... = More fragments: Not set
    ...0 0000 0000 0000 = Fragment offset: 0
    Time to live: 64
    Protocol: UDP (17)
    Header checksum: 0x25a4 [correct]
    [Header checksum status: Good]
    [Calculated Checksum: 0x25a4]
    Source: 127.0.0.1
    Destination: 127.0.0.53
User Datagram Protocol, Src Port: 42891, Dst Port: 53
    Source Port: 42891
    Destination Port: 53
    Length: 64
    Checksum: 0xfe87 incorrect, should be 0x1e09 (maybe caused by "UDP checksum offload"?)
        [Expert Info (Error/Checksum): Bad checksum [should be 0x1e09]]
            [Bad checksum [should be 0x1e09]]
            [Severity level: Error]
            [Group: Checksum]
        [Calculated Checksum: 0x1e09]
    [Checksum Status: Bad]
    [Stream index: 2]
    [Timestamps]
        [Time since first frame: 0.000000000 seconds]
        [Time since previous frame: 0.000000000 seconds]
Domain Name System (query)
    Transaction ID: 0xb27a
    Flags: 0x0100 Standard query
        0... .... .... .... = Response: Message is a query
        .000 0... .... .... = Opcode: Standard query (0)
        .... ..0. .... .... = Truncated: Message is not truncated
        .... ...1 .... .... = Recursion desired: Do query recursively
        .... .... .0.. .... = Z: reserved (0)
        .... .... ...0 .... = Non-authenticated data: Unacceptable
    Questions: 1
    Answer RRs: 0
    Authority RRs: 0
    Additional RRs: 1
    Queries
        223.15.230.157.in-addr.arpa: type PTR, class IN
            Name: 223.15.230.157.in-addr.arpa
            [Name Length: 27]
            [Label Count: 6]
            Type: PTR (domain name PoinTeR) (12)
            Class: IN (0x0001)
    Additional records
        <Root>: type OPT
            Name: <Root>
            Type: OPT (41)
            UDP payload size: 1200
            Higher bits in extended RCODE: 0x00
            EDNS0 version: 0
            Z: 0x0000
                0... .... .... .... = DO bit: Cannot handle DNSSEC security RRs
                .000 0000 0000 0000 = Reserved: 0x0000
            Data length: 0
0000  00 00 00 00 00 00 00 00 00 00 00 00 08 00 45 00   ..............E.
0010  00 54 16 bf 40 00 40 11 25 a4 7f 00 00 01 7f 00   .T..@.@.%.......
0020  00 35 a7 8b 00 35 00 40 fe 87 b2 7a 01 00 00 01   .5...5.@...z....
0030  00 00 00 00 00 01 03 32 32 33 02 31 35 03 32 33   .......223.15.23
0040  30 03 31 35 37 07 69 6e 2d 61 64 64 72 04 61 72   0.157.in-addr.ar
0050  70 61 00 00 0c 00 01 00 00 29 04 b0 00 00 00 00   pa.......)......
0060  00 00
```

A common thing one may want to take a look at regarding DNS is what domain names are people trying to resolve. A cool thing about tshark is that you can specify what columns you want it to display. This is where I think tshark, and it's usability really separates itself from tcpdump. You can do the same sort of things in tcpdump, but it will take a lot more work and will be messier using cut multiple times and what not. Using the '-T fields' followed by the '-e <field\_name> you can get something very specific and usable really fast. I'm going to pipe this to head simply for brevity, I don't want to have so many lines to distract from simply what the command is doing:

```
tshark -r ctf.pcap -Y 'dns.qry.type == 1' -T fields -e ip.src -e ip.dst -e dns.qry.name | head | sort | uniq
127.0.0.1	127.0.0.53	www.internetbadguys.com
157.230.15.223	67.207.67.2	zg-1218a-214.stretchoid.com
157.230.15.223	67.207.67.3	www.internetbadguys.com
172.17.0.2	67.207.67.2	zg-1218a-214.stretchoid.com
67.207.67.2	157.230.15.223	zg-1218a-214.stretchoid.com
67.207.67.2	172.17.0.2	zg-1218a-214.stretchoid.com
67.207.67.3	157.230.15.223	www.internetbadguys.com
```

Look how fast that was. If we have an idea of what we are looking for we can do so very efficiently inside of tshark. We can search for very specific things and drill down very fast. We can use other Linux text applications like sort, uniq and grep with ease. Let's continue.

From here we can see someone is trying to resolve 'www.internetbadguys.com' which doesn't look good. What are all the IPs trying to resolve this name? We can use our handy Linux tool grep to help us here:

```
$ tshark -r ctf.pcap -Y 'dns.qry.type == 1' -T fields -e ip.src -e ip.dst -e dns.qry.name | sort | uniq -c | grep 'www.internetbadguys.com'
      1 127.0.0.1	127.0.0.53	www.internetbadguys.com
      1 127.0.0.53	127.0.0.1	www.internetbadguys.com
      2 157.230.15.223	67.207.67.3	www.internetbadguys.com
      2 67.207.67.3	157.230.15.223	www.internetbadguys.com
```

We could extract just the 'dns.qry.name' field and save them to a file for later analysis.

```
$ tshark -r ctf.pcap -Y 'dns.qry.type == 1' -T fields -e dns.qry.name | sort | uniq -c > dns.qry.txt
```

What is another thing that's really useful with tshark, is you can grep things. How is your grep game? I'd say I'm a beginner in all the things but I'll let you know about three options with grep I use most. The first option is '-i' which simply ignores case when searching for matches.

```
$ tshark -r ctf.pcap -Y 'mysql' -xV | grep -i ctf
0460  63 6f 43 54 46 7b 40 70 6f 72 74 63 75 6c 6c 69   coCTF{@portculli
```

The next options with grep I use the most are the -A and -B which will display the lines above and below your match. This can give you more context to your match, which is very useful when looking at logs and packets.

```
$ tshark -r ctf.pcap -Y 'mysql' -xV | grep -i ctf
0460$ tshark -r ctf.pcap -Y 'mysql' -xV | grep -A 10 -B 10 -i ctf
03c0  3a 2f 6e 6f 6e 65 78 69 73 74 65 6e 74 3a 2f 75   :/nonexistent:/u
03d0  73 72 2f 73 62 69 6e 2f 6e 6f 6c 6f 67 69 6e 0a   sr/sbin/nologin.
03e0  5f 61 70 74 3a 78 3a 31 30 30 3a 36 35 35 33 34   _apt:x:100:65534
03f0  3a 3a 2f 6e 6f 6e 65 78 69 73 74 65 6e 74 3a 2f   ::/nonexistent:/
0400  75 73 72 2f 73 62 69 6e 2f 6e 6f 6c 6f 67 69 6e   usr/sbin/nologin
0410  0a 6d 79 73 71 6c 3a 78 3a 31 30 31 3a 31 30 31   .mysql:x:101:101
0420  3a 4d 79 53 51 4c 20 53 65 72 76 65 72 2c 2c 2c   :MySQL Server,,,
0430  3a 2f 6e 6f 6e 65 78 69 73 74 65 6e 74 3a 2f 62   :/nonexistent:/b
0440  69 6e 2f 66 61 6c 73 65 0a 73 75 70 70 6f 72 74   in/false.support
0450  3a 78 3a 31 30 30 30 3a 31 30 30 30 3a 43 69 73   :x:1000:1000:Cis
0460  63 6f 43 54 46 7b 40 70 6f 72 74 63 75 6c 6c 69   coCTF{@portculli
0470  73 6c 61 62 73 7d 3a 2f 68 6f 6d 65 2f 73 75 70   slabs}:/home/sup
0480  70 6f 72 74 3a 2f 62 69 6e 2f 73 68 0a 07 00 00   port:/bin/sh....
0490  04 fe 00 00 22 00 00 00                           ...."...
Frame 25202: 71 bytes on wire (568 bits), 71 bytes captured (568 bits) on interface unknown, id 0
    Interface id: 0 (unknown)
        Interface name: unknown
    Packet flags: 0x00000000
        .... .... .... .... .... .... .... ..00 = Direction: Unknown (0x0)
        .... .... .... .... .... .... ...0 00.. = Reception type: Not specified (0)
```

We can see that the packet following our match is 'Frame 25202' so if we know our match was in Frame 25201. We can also increase our -A or -B to get more context.

Given everything that we have learned so far, It would take us less than 20 seconds if someone asked you for all the mysql usernames and passwords found in a pcap. Or, if a certain user had attempted to login, etc. Sure you may have to open up Wireshark or google to get the correct syntax of the columns; but that's easy.

```
$ tshark -r ctf.pcap -Y 'mysql' -T fields -e mysql.user -e mysql.passwd | sort | uniq 
	
8TmveSod	3305460ddd8e2cc1321a487ebfe4dc8fc9a2d20c5e30485ee382eccfa38f9863
admin	360435d4b3015b249066fe99636aecd8aa3fdb0c36d9e3f6a3a3251209aae0ac
admin	66afa1f2f5f9f5043ff31bd90ddac1ed90bab5f52457c234d0a2a71c9b8ff3dd
admin	b47dee5a3824dcf6f18d2a40abeac5e9259999b639c10d1b91057c3c157f5cfe
admin	c9990930240171b021e8ca57bea4c0f5dec51eba06637a92b7f194348da81c94
admin	dd73c7a5465cfd8bef44bc8b995619fb6e82e36e3da1ee39a159f7e36ee2c4c8
admin@example.com	2a80ec0decb594885667e5aa9b07d97bb4de2b0f8bda631737c790cf9bf562fd
admin@example.com	b722bcf91d9ed81e1160f20a810be143899d6b61cf81d2bb7ba0c770f99f3d74
admin	fc90eb0b8bfbb9c9f7c467cc7ee739b470835bedc1790d81dc2d46a880ba2b7d
flag	1148ed45984fd9b1e5ee7ee8dabde90d8c8ad768dbf47315feb48323e6c55111
```

I hope, if you've never used tshark, or hell, tcpdump for that matter, that you can see the utility of being able to parse packets at the command line. People are very into scripting with python these days, you could do some bash scripting here for things if you end up doing the same sorts of inquiries over and over again. And of course, if you want to open up Wireshark to take a look, you can do it from the command line as well :)

```
$ wireshark ctf.pcap &
```

That's all for today. I'm going to focus on Zeek for the next post. Let's see if I can get some zeek scripts off the ground. That should be bunches of fun! Till next time.
