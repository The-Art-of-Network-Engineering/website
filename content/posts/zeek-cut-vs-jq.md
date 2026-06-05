---
title: "zeek-cut vs jq"
slug: "zeek-cut-vs-jq"
publishedAt: "2021-04-19"
excerpt: "Last week I wrote a quick little tutorial so that one could get started using tshark. In this post I want to look at different ways of viewing the same data using a tool called zeek. Zeek is often referred to as a..."
author: "Andy Lapteff"
---

Last week I wrote a [quick little tutorial](/blog/tshark-the-best) so that one could get started using tshark. In this post I want to look at different ways of viewing the same data using a tool called zeek. Zeek is often referred to as a packet examination 'framework' as it allows you to see what is happening, the whos, wheres and whats within the traffic. [Zeek](https://zeek.org/) is often deployed along side other tools like snort, suricata and/or moloch.

Since we will be examining pcaps, not live traffic we will again be going with the '-r' option as we did with previous posts covering tcpdump and tshark.

```
$ ls
ctf-dump-v2.pcapng  ctf.pcap  zeek.script
$ zeek -Cr ctf.pcap
$ ls
conn.log            dns.log    ftp.log    ntp.log            smtp.log  ssl.log    zeek.script
ctf-dump-v2.pcapng  dpd.log    http.log   packet_filter.log  snmp.log  weird.log
ctf.pcap            files.log  mysql.log  sip.log            ssh.log   x509.log
```

You can see, after we read in our pcap with zeek a bunch of \*.log files were created. You can guess what kind of information is in each log based on it's name. To view logs nativly, zeek has a tool called 'zeek-cut' that allows you to format and view what you'd like. If you use just zeek-cut you will get the default columns:

```
$ head dns.log | zeek-cut
1613159462.737544	Ci2kw63INthRjNjuae	157.230.15.223	57199	67.207.67.3	53	udp	6601	-	223.15.230.157.in-addr.arpa	1C_INTERNET	12	PTR	3	NXDOMAIN	F	F	T	F	0	-	-	F
```

What are these columns you ask?! Good question. We can see what are all our options are as far as data within this log by simply looking at the very beginning of the file:

```
$ head dns.log
#separator \x09
#set_separator	,
#empty_field	(empty)
#unset_field	-
#path	dns
#open	2021-04-16-17-46-03
#fields	ts	uid	id.orig_h	id.orig_p	id.resp_h	id.resp_p	proto	trans_id	rtt	query	qclass	qclass_name	qtype	qtype_name	rcode	rcode_name	AA	TC	RD	RA	Z	answers	TTLs	rejected
#types	time	string	addr	port	addr	port	enum	count	interval	string	count	string	count	string	count	string	bool	bool	bool	bool	count	vector[string]	vector[interval]	bool
```

Fields we can extract/view from this log are listed after the #fields above.

An aside: A bit about source/destination vs originator/responder. In zeek the one who initiates a request, whether by a syn or what have you, is the originator and the one responding, ie, a syn-ack is the responder. They do not use the lexicon of source and destination. Which, I think, is kind of cool as one of the things you do with tcpdump a lot is filter by syns or syn-acks and here that work is already done for you.

Back to parsing this log file. Using zeek-cut, let's pull out the id.orig\_h, resp\_p and the query. I only pipe it to head for brevity.

```
$ cat dns.log | zeek-cut id.orig_h id.resp_p query | sort | uniq | head
10.10.10.101	53	assets.msn.com
10.10.10.101	53	cdn.content.prod.cms.msn.com
10.10.10.101	53	debug.opendns.com
10.10.10.101	53	portal.mango.local
10.10.10.101	53	sw-ec.mango.local
10.10.10.101	53	sync.hydra.opendns.com
10.10.10.101	53	www.gstatic.com
10.10.10.101	53	www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com
127.0.0.1	53	1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.d.0.0.0.0.4.0.0.8.8.a.4.0.6.2.ip6.arpa
127.0.0.1	53	1.0.0.0.5.7.e.1.0.0.0.0.0.0.0.0.0.d.0.0.0.0.4.0.0.8.8.a.4.0.6.2.ip6.arpa
```

This information is exactly the same information we pulled out of the file last week with tshark. Zeek is an awesome tool because the logs, once extracted from live capture or a pcap can be held onto for a long time because in relation to the hard-drive space needed for a pcap, Zeek logs take up very little space. You can refer to these artifacts later and retain for much longer/easier than trying to retain pcaps.

Another pro for zeek is that parsing through a log file is computationally super fast when compared to tshark or even tcpdump trying to look through an entire pcap every time you do a filter. So getting information out of your data, once read through zeek is FAST!

So to briefly recap, to get started with zeek-cut looking at your logs, head a log you are interested in, see the possible columns and then use zeek-cut to parse out what you are interested in. Another thing I demonstrated last week in my tshark post was pulling out all the usernames used to login with mysql. Can we quickly do the thing with zeek?

```
$ ls *.log
conn.log  dpd.log    ftp.log   mysql.log  packet_filter.log  smtp.log  ssh.log  weird.log
dns.log   files.log  http.log  ntp.log    sip.log            snmp.log  ssl.log  x509.log
```

We see we have a mysql.log and the next step is to head it and see the columns.

```
$ head mysql.log 
#separator \x09
#set_separator	,
#empty_field	(empty)
#unset_field	-
#path	mysql
#open	2021-04-16-17-46-03
#fields	ts	uid	id.orig_h	id.orig_p	id.resp_h	id.resp_p	cmd	arg	success	rows	response
#types	time	string	addr	port	addr	port	string	string	bool	count	string
```

The three columns that stand out as possibilities that could help us reach our goal of getting all the username's/passwords to log in would be cmd, arg, success, rows and response. One of the cmd is 'login' so if we grep for login and show associated arg we are able to see all the usernames:

```
$ cat mysql.log | zeek-cut cmd arg | grep login | sort | uniq -c
      2 login	8TmveSod
     12 login	admin
      4 login	admin@example.com
      1 login	flag
      4 login	jamfsoftware
     12 login	mysql
    140 login	root
      4 login	superdba
     12 login	test
     12 login	user
      4 login	username
      2 login	wdxhpxxK
```

To briefly look back, here was us last week doing the same thing with tshark:

```
$ tshark -r ctf.pcap -Y 'mysql' -T fields -e mysql.user | sort | uniq -c
    963 
      2 8TmveSod
     12 admin
      4 admin@example.com
      1 flag
      4 jamfsoftware
     12 mysql
    140 root
      4 superdba
     12 test
     12 user
      4 username
      2 wdxhpxxK
```

One more really cool thing to mention about Zeek before we shift over into looking at the same data in JSON format using jq is that of the uid. Let's say for whatever reason, you are super interested in someone logging in with the username flag. In zeek, every single log has a UID, which is a unique identifier of traffic consisting of the same 5-tuple or source IP address/port number, destination IP address/port number and the protocol in use. So if we include the UID in the login associated with flag we could then grep all of our logs for that UID to see all the associated traffic.

```
$ cat mysql.log | zeek-cut cmd arg uid | grep flag 
login	flag	C4nJ2N3ksR7OfGiU9k
$ grep C4nJ2N3ksR7OfGiU9k *.log
conn.log:1613168140.809131	C4nJ2N3ksR7OfGiU9k	157.230.15.223	45330	172.17.0.2	3306	tcp	-	0.011629	443	1438	SF	-	-	0	ShAdtDTaFf	48	3446	38	4868	-
dpd.log:1613168140.809956	C4nJ2N3ksR7OfGiU9k	157.230.15.223	45330	172.17.0.2	3306	tcp	MYSQL	Binpac exception: binpac exception: out_of_bound: LengthEncodedIntegerLookahead:i4: 8 > 6
mysql.log:1613168140.809676	C4nJ2N3ksR7OfGiU9k	157.230.15.223	45330	172.17.0.2	3306	login	flag	-	-	-
mysql.log:1613168140.809750	C4nJ2N3ksR7OfGiU9k	157.230.15.223	45330	172.17.0.2	3306	unknown-167	\xb3\x12\xd815'\x07%\x814\xfeP\x9b\x1a\xfd\xae\xc85\xee	-	-	-
mysql.log:1613168140.809838	C4nJ2N3ksR7OfGiU9k	157.230.15.223	45330	172.17.0.2	3306	query	\x00\x01select @@version_comment limit 1--	-
```

We have easily located associated traffic with the mysql traffic with the login name of 'flag' very quickly.

Another very quick aside. A tool that's like uid, but even more useful is called [community-id](https://github.com/corelight/community-id-spec). This is the same sort of idea as uid except you can take this 'community-id' and pivot to entirely different tools. Say we found something with traffic in zeek that was super interesting but wanted to look at the pcap. If we were using community-id we could copy it from our zeek log like we did with uid but this time search for this community-id within a tool like moloch (view flows and download pcap) and get greater context/viability.

Alright. So many quick asides today. [Back to the lesson at hand](https://www.youtube.com/watch?v=0F0CAEoF4XM). Zeek data can also be output in JSON format as opposed to simple text logs as outlined above. This is how zeek is configured at my work and is done so it can be easily ingested into our SIEM. Today we are just going to read in the same pcap and play around a bit with a tool called jq to parse our logs. Here is how we switch to a JSON format:

```
$ zeek -Cr ctf.pcap -e 'redef LogAscii::use_json=T;'
```

If we head our dns.log, like we did above to search for quries our data will look much different. So much so that zeek-cut no longer works with this format :)

```
$ head dns.log 
{"ts":1613159462.737544,"uid":"CyZQzA1XgYbK1dLIah","id.orig_h":"157.230.15.223","id.orig_p":57199,"id.resp_h":"67.207.67.3","id.resp_p":53,"proto":"udp","trans_id":6601,"query":"223.15.230.157.in-addr.arpa","qclass":1,"qclass_name":"C_INTERNET","qtype":12,"qtype_name":"PTR","rcode":3,"rcode_name":"NXDOMAIN","AA":false,"TC":false,"RD":true,"RA":false,"Z":0,"rejected":false}
{"ts":1613159462.737492,"uid":"C1n5WP2f5tNp0iBXa2","id.orig_h":"157.230.15.223","id.orig_p":56994,"id.resp_h":"67.207.67.2","id.resp_p":53,"proto":"udp","trans_id":505,"query":"223.15.230.157.in-addr.arpa","qclass":1,"qclass_name":"C_INTERNET","qtype":12,"qtype_name":"PTR","rcode":3,"rcode_name":"NXDOMAIN","AA":false,"TC":false,"RD":true,"RA":false,"Z":0,"rejected":false}
```

We now have a whole bunch of key:value pairs. Which means our log files will be slightly bigger than the plain txt ones but otherwise all the pros mentioned above still hold true here. Instead of piping to zeek-cut we are going to use jq to parse our data. To look at the first log, we will use the -s '.[0]' option (which simply picks out the first thing in the index, ie the first log):

```
$ cat dns.log | jq -s '.[0]'
{
  "ts": 1613159462.737544,
  "uid": "CEDtgA2onmkOdbRSp",
  "id.orig_h": "157.230.15.223",
  "id.orig_p": 57199,
  "id.resp_h": "67.207.67.3",
  "id.resp_p": 53,
  "proto": "udp",
  "trans_id": 6601,
  "query": "223.15.230.157.in-addr.arpa",
  "qclass": 1,
  "qclass_name": "C_INTERNET",
  "qtype": 12,
  "qtype_name": "PTR",
  "rcode": 3,
  "rcode_name": "NXDOMAIN",
  "AA": false,
  "TC": false,
  "RD": true,
  "RA": false,
  "Z": 0,
  "rejected": false
}
```

I always find myself heading a log or looking at the first log before I really dive in. This is because I never remember what the key value is or the specific name of the interesting thing I'm looking for. This gives me a chance to look at an entire log and make out what each thing is referencing and I can make a better guess on what search term to use or how it should be formatted. Doing this first saves you a bit of time later in my opinion.

Every key, if you can remember back to the beginning of this post will correspond to a column header when we were using zeek-cut. With zeek-cut we used id.orig\_h, id.resp\_p and query. To do this we will use the -j (join option) with jq which will put the following things we select on the same line. We have to put 'id.orig\_h' and 'id.resp\_p' in brackets because their key value begins with a '.' already and in order for jq to read them the syntax with the square brackets is needed. Since query doesn't begin with a '.' no brackets needed. "\n" simply means new line. Below we have a csv formatted version of what we did with zeek-cut above.

```
$ cat dns.log | jq -j '.["id.orig_h"], ", ", .["id.resp_p"], ", ", .query, "\n"' | sort | uniq |head
10.10.10.101, 53, assets.msn.com
10.10.10.101, 53, cdn.content.prod.cms.msn.com
10.10.10.101, 53, debug.opendns.com
10.10.10.101, 53, portal.mango.local
10.10.10.101, 53, sw-ec.mango.local
10.10.10.101, 53, sync.hydra.opendns.com
10.10.10.101, 53, www.gstatic.com
10.10.10.101, 53, www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com
127.0.0.1, 53, 1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.d.0.0.0.0.4.0.0.8.8.a.4.0.6.2.ip6.arpa
127.0.0.1, 53, 1.0.0.0.5.7.e.1.0.0.0.0.0.0.0.0.0.d.0.0.0.0.4.0.0.8.8.a.4.0.6.2.ip6.arpa
```

If you forgot what we did with zeek-cut above i'll spare you the work of having to scroll up:

```
$ cat dns.log | zeek-cut id.orig_h id.resp_p query | sort | uniq | head
10.10.10.101	53	assets.msn.com
10.10.10.101	53	cdn.content.prod.cms.msn.com
10.10.10.101	53	debug.opendns.com
10.10.10.101	53	portal.mango.local
10.10.10.101	53	sw-ec.mango.local
10.10.10.101	53	sync.hydra.opendns.com
10.10.10.101	53	www.gstatic.com
10.10.10.101	53	www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com
127.0.0.1	53	1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.d.0.0.0.0.4.0.0.8.8.a.4.0.6.2.ip6.arpa
127.0.0.1	53	1.0.0.0.5.7.e.1.0.0.0.0.0.0.0.0.0.d.0.0.0.0.4.0.0.8.8.a.4.0.6.2.ip6.arpa
```

If we look at the mysql log I'm sure you can already make out how we could search for usernames used to login like we did with zeek-cut using jq:

```
$ cat mysql.log | jq -s '.[0]'
{
  "ts": 1613164528.211387,
  "uid": "CCk4OU1exd8KJARVSg",
  "id.orig_h": "45.55.46.240",
  "id.orig_p": 38550,
  "id.resp_h": "157.230.15.223",
  "id.resp_p": 3306,
  "cmd": "login",
  "arg": "8TmveSod"
}
```

```
$ cat mysql.log | jq -j '.cmd, ", ", .arg, "\n"' | grep login | sort | uniq -c
      2 login, 8TmveSod
     12 login, admin
      4 login, admin@example.com
      1 login, flag
      4 login, jamfsoftware
     12 login, mysql
    140 login, root
      4 login, superdba
     12 login, test
     12 login, user
      4 login, username
      2 login, wdxhpxxK
```

Above I used grep to do the same sort of search that we did with zeek-cut. But, we don't have to use grep as jq has some very cool functions built in that allow us to do comparison searching within the tool itself. This is where I think jq really shines. You can use '<' '>' or '==' to filter your search how ever you need. Here we just want to get all the 'cmd' that equal login.

```
$ cat mysql.log | jq 'select(.cmd == "login")' | jq -j '.cmd, " ", .arg, "\n"' | sort | uniq -c
      2 login 8TmveSod
     12 login admin
      4 login admin@example.com
      1 login flag
      4 login jamfsoftware
     12 login mysql
    140 login root
      4 login superdba
     12 login test
     12 login user
      4 login username
      2 login wdxhpxxK
```

With zeek-cut we zeroed in on the flag login and searched all our logs for the uid to find all relevant traffic with the associated tuple. We can do the same thing with jq no problem.

```
$ cat mysql.log | jq 'select(.cmd == "login" and .arg == "flag")' | jq -j '.uid, " ",.cmd, " ", .arg, "\n"' | sort | uniq -c
      1 CmBHdR2a0DMQ9kfam login flag
$ cat *.log | jq 'select(.uid == "CmBHdR2a0DMQ9kfam")'
{
  "ts": 1613168140.809131,
  "uid": "CmBHdR2a0DMQ9kfam",
  "id.orig_h": "157.230.15.223",
  "id.orig_p": 45330,
  "id.resp_h": "172.17.0.2",
  "id.resp_p": 3306,
  "proto": "tcp",
  "duration": 0.011629104614257812,
  "orig_bytes": 443,
  "resp_bytes": 1438,
  "conn_state": "SF",
  "missed_bytes": 0,
  "history": "ShAdtDTaFf",
  "orig_pkts": 48,
  "orig_ip_bytes": 3446,
  "resp_pkts": 38,
  "resp_ip_bytes": 4868
}
{
  "ts": 1613168140.809956,
  "uid": "CmBHdR2a0DMQ9kfam",
  "id.orig_h": "157.230.15.223",
  "id.orig_p": 45330,
  "id.resp_h": "172.17.0.2",
  "id.resp_p": 3306,
  "proto": "tcp",
  "analyzer": "MYSQL",
  "failure_reason": "Binpac exception: binpac exception: out_of_bound: LengthEncodedIntegerLookahead:i4: 8 > 6"
}
{
  "ts": 1613168140.809676,
  "uid": "CmBHdR2a0DMQ9kfam",
  "id.orig_h": "157.230.15.223",
  "id.orig_p": 45330,
  "id.resp_h": "172.17.0.2",
  "id.resp_p": 3306,
  "cmd": "login",
  "arg": "flag"
}
{
  "ts": 1613168140.80975,
  "uid": "CmBHdR2a0DMQ9kfam",
  "id.orig_h": "157.230.15.223",
  "id.orig_p": 45330,
  "id.resp_h": "172.17.0.2",
  "id.resp_p": 3306,
  "cmd": "unknown-167",
  "arg": "\\xb3\\x12\\xd815'\\x07%\\x814\\xfeP\\x9b\\x1a\\xfd\\xae\\xc85\\xee"
}
{
  "ts": 1613168140.809838,
  "uid": "CmBHdR2a0DMQ9kfam",
  "id.orig_h": "157.230.15.223",
  "id.orig_p": 45330,
  "id.resp_h": "172.17.0.2",
  "id.resp_p": 3306,
  "cmd": "query",
  "arg": "\\x00\\x01select @@version_comment limit 1"
}
```

I might have not shown the most 'useful' parsing within jq but I hope by showing you a few examples of how you can select based on the values of certain fields you can see how easy it is to zero in on what you are looking for. You can, for example, only display only logs that have a ip.orig\_p less than 1000 in your conn.log with ease. Or, display on logs with a packet bigger than a certain size. The possibilities are endless and being able to use comparison operators in your search, I think, is just awesome.

Also, you can format your output based on whatever values in any order and to csv very easily if that's a useful avenue for you. There is even more stuff you can do with jq, such as sorting. But I think we've went long enough :)

That's all for today as I think I've rambled on long enough, with far to many asides. But i digress. Next time I'm thinking of trying to write my first zeek script. Till next time!
