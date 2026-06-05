---
title: "new snort rule, who dis?"
slug: "new-snort-rule-who-dis"
publishedAt: "2021-01-25"
excerpt: "The third section of my SANS503 course has a huge section, the second biggest of the entire course, dealing with some 110+ slides on snort. I'm not here to give you the history of snort, IDS/IPS placement within your..."
author: "Andre Roberge"
---

The third section of my SANS503 course has a huge section, the second biggest of the entire course, dealing with some 110+ slides on [snort](https://snort.org/). I'm not here to give you the history of snort, IDS/IPS placement within your enterprise or any of that, instead I just want to introduce you to the basic structure of a basic snort rule. The most important thing to takeaway from snort rules is that there is no concept of 'or' within a rule. It either matches and does the action or it doesn't.

First things first, if you're going to create your own custom rules you'll specify the location of this file in your overall snort configuration file [snort.conf] which is by default 'local.rules'. At this point you will have to decide upon which text editor you will use to create and edit your new rules. This can become a contentious conversation for some. For me:

```
vim local.rules
```

A rule consists of two main parts, a header and a body. The header is mandatory and the body is not. There are seven mandatory options in the snort rule header:

```
Action | Protocol | SourceIP | SourcePort | Direction | DestIP | DestPort
-------|----------|----------|------------|-----------|--------|----------
alert  | ip       | any      | any        | ->        | same as| any
pass   | tcp      | IP       | #          | <>        | Source | #
log    | udp      | IP/CIDR  |            |           | IP     |
drop   | icmp     | !IP      |            |           | options|
sdrop  |          | $Variable|            |           |        |
reject |          |          |            |           |        |
```

The above chart doesn't outline every option within each category but it should give you a pretty good overview of what's possible within each spot. Most importantly, I'll explicitly state that you can define vars in your snort.conf file and use those vars in your snort rule instead of hard coding them in the rule itself.

Here is an example of a header, including calling a variable:

```
alert TCP $HOME_NET ANY -> ANY $HTTP_PORTS
```

Now let's dig into the body a bit and go over some common options you may find in a rule body. The first thing we need to do is to start the body, and to do this we use a '(' after the header. Then notice how the keyword and argument are separated by ':' , ended by a ';' and the body is ultimately closed by ')'.

```
alert IP any any <> any any ( \
     keyword:argument; \
     keyword:argument_1,argument_2; )
```

Below is an example of some keywords and arguments in an actual rule:

```
alert TCP $HOME_NET ANY -> ANY $HTTP_PORTS ( \
     msg:"I LOVE SNORT"; \
     sid:1000001; rev:1; \
     content:"big_poop"; \
     content:"SmellsBad", nocase; )
```

I'm pretty new at writing rules myself, but this is the format I like to use. After starting the body, I like to begin the body on a new line by using '\' and having each keyword and it's associated arguments having it's own line. I find this much easier to see what's going on if you have your rules written like this rather than all on one line. The 'msg' keyword will display in the log if this rule matches traffic so make sure you make it useful. Custom rules begin with a 'sid' of above 1 million and instead of making a new rule or 'sid' when you change something you can increment the 'rev' to keep track of the revision number. It's also good practice to store your old rules, perhaps in a folder called rules.old so that you can rollback to a previous configuration of the rule if needed.

Content is probably the most common keyword to use within a snort rule. It will search for the content within the packets payload. The 'nocase' keyword simply tells snort that you don't care about case and will match any case that matches your 'content' argument. You can further optimize the rule by telling snort where to look for the content by using the offset and depth keywords. Offset tells snort where to start looking, with offset 0 being the very beginning of the payload and depth tells snort how many bytes to look in.

```
alert TCP $HOME_NET ANY -> ANY $HTTP_PORTS ( \
     msg:"I LOVE SNORT"; \
     sid:1000001; rev:1; \
     content:"big_poop"; offset:4; depth:20; \
     content:"SmellsBad", nocase; )
```

Beyond offset and depth, there are two relative pointers you can use. Distance will tell snort where to start looking for the content relative to where snort left off in your previous content argument. The within keyword is designed to be used with distance to instruct snort how many bytes to examine after it determines the starting point to search.

```
alert TCP $HOME_NET ANY -> ANY $HTTP_PORTS ( \
     msg:"I LOVE SNORT"; \
     sid:1000001; rev:1; \
     content:"big_poop"; offset:4; depth:20; \
     content:"SmellsBad", nocase; distance:20; within:10)
```

Now I know there are a bunch more ways to further optimize or specify your rule but this is only an intro to snort rules in general, not a masters thesis. With that said one fun thing to do when adding on to your rule or creating your rule for the first time is to run it against some traffic. If you have a pcap, look at the details of a packet and try to create a rule that will match that traffic.

You can run snort on a pcap by using the '-r <filename>' option and then point to your snort conf file with the '-c <filename>' option. Furthermore you can specify a filename for your log using the '-l <filename>' option:

```
snort -r http_extract.pcap -q -c etc-snort/snort.conf -A console \
     -l rule_test.log
```

One last tip, when creating your rule it's a good idea to create it line by line. After you add a line, specifying your rule further, test it against the traffic it's designed to alert and make sure it's still working they way you want before moving on. This makes troubleshooting your rule easier than if you go all out creating a multiple line rule and then realizing your rule isn't catching traffic.

If you have further tips, feel free to leave a comment to let me know. I'm just starting myself and understand this is the best time to start building good habits :) Till next time!
