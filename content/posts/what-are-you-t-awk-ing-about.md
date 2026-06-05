---
title: "What are you t-awk-ing about?"
slug: "what-are-you-t-awk-ing-about"
publishedAt: "2021-07-26"
excerpt: "Today I'd like to talk to you a bit about studying in public, how I go about it and some of the benefits it has given me the last few years. Studying in public, which I've mostly done on Twitter until I started writing..."
author: "Andre Roberge"
---

Today I'd like to talk to you a bit about studying in public, how I go about it and some of the benefits it has given me the last few years. Studying in public, which I've mostly done on Twitter until I started writing for this blog is something I'd recommend everyone trying to learn something new do. In the following I'll give two examples of me 'studying in public' and then give insight along the way and conclude with it's benefits.

As weird as this may sound, my favorite thing to do lately as it relates to tech is parsing logs and pcaps. I've enjoyed getting introduced to tools like editcap, tcpdump, tshark, jq, cut, uniq, and sort and piping them all into each other to extract just the right information and display them in a pleasing way. The past few months I often see people on my timeline getting acquainted with python and if it has anything to do with reading in a file and doing some parsing then printing I'm often running through my mind 'how would I do that in bash...'

One tool I've yet to touch, which I feel may level up my log and pcap ninja slicing is awk. One coworker of mine, and now my current FOR572 instructor casually use this tool to do some amazing things. So perhaps it's time for me to dip my toe in the awk waters?!

As I'm writing this very sentence, I've still not used awk, I'm literally going to try it out right here for the first time. What we need though, is a task, so let's look at Kirk Byers [first set of exercises](https://github.com/ktbyers/pynet/tree/master/learning_python/lesson1) for his [free Python for Network Engineers course](https://pynet.twb-tech.com/email-signup.html). To be clear, I'm not saying you shouldn't learn python or that doing everything from bash is 'better' but I think it's fun to learn how to do things using multiple tools, and also, you may find yourself on a Linux server that isn't connected to the internet, may not have a certain version of python installed or you are missing the python packages to get your script to run but chances are you will have common bash tools at your disposal. We move.

The first exercise in [lesson one](https://github.com/ktbyers/pynet/blob/master/learning_python/lesson1/exercise1.py) asks us to:

```
Create a Python script that has three variables: ip_addr1, ip_addr2, ip_addr3 (representing three corresponding IP addresses). Print these three variables to standard output using a single print statement.
```

Well we won't be using python to do this, let's try this with awk in bash. [15 min passes while I went to the google and tried a few things out]. I'm back and we do have ourselves a bash one-liner that will solve the first prompt:

```
$ echo | awk -v ip_addr1='192.168.16.1' -v ip_addr2='10.10.1.1' -v ip_addr3='172.16.31.17' '{print ip_addr1, ip_addr2, ip_addr3}'
192.168.16.1 10.10.1.1 172.16.31.17
```

What did I learn doing this first exercise? Well, first off, to set a variable with awk you use the '-v' option. Furthermore, their is no syntax I could find to do multiple variables with one '-v' option, instead, as shown above you have to do a '-v' for each variable. With print we are able to print all three of our variables separated by a ',' within brackets and a quotation. I am left with one question though:

https://twitter.com/HugOfThunder/status/1418608436065964041?s=20

I don't understand why the command works with echo and doesn't run the same way without it...what magic is echo doing here is the real question OR what is possibly missing syntax wise without echo. One cool thing about twitter is that people much smarter than me are willing to offer their time and provide insight, as Roddie and Quinn do here. I'm very thankful for having so many people out there helping me along :)

https://twitter.com/qsnyder/status/1418623733837623296?s=20

A quick aside, I often do learning in public, that was this blog post is and I think it's helping me grow more than anything else. By posting what I'm doing, even if it's the most trivial newbie thing it starts a lot of conversations. From other people learning at the same level as me or from more senior people showing best practices or alternative or faster ways to accomplish a task. I definitely recommend sharing what you are learning in some capacity on a platform where others can interject. You'll learn a lot and make a few good connections along the way!

If you were curious how Kirk solved his prompt with python:

```
from __future__ import print_function

ip_addr1 = "192.168.16.1"
ip_addr2 = "10.10.1.1"
ip_addr3 = "172.16.31.17"

print(ip_addr1, ip_addr2, ip_addr3)
```

Another person who's quick to help anyone learning is Kirk himself. This is yet another example of how studying in public can help open your eyes and give insight you'd otherwise be left in the dark about. For me, I've been doing a bit of tech stuff since the early 2000s. When I first started there wasn't an online forum with people interacting. I thought I was doing ok, as compared to people in my office and those I interacted with, but today, with a bunch of people on line, I'm continually pushing myself and my boundaries of knowledge with people way smarter than me. So, even if I'm not being pushed were I'm at I have a whole world to help guide and help me grow now.

Looking a bit into awk it looks like I got a lot to learn, and once I get back into my bigger data sets at work I'll dive deeper into it's search and printing functionalities. I'll also reference 'Effective awk Programming' Arnold Robbins on Oreilly Books. Did we learn a lot from this one example? Maybe not, but sometimes the first step is the hardest and I hadn't written a post here on the Art of Network Engineering recently and I wanted to try and get back on the horse so to speak. If I'm able to break through in the next few months on the awk train, be sure to check back in for a more extensive awk walkthrough.

This was just one example of 'learning in public' and I found myself writing a script later the same night. Another thing I'm trying to navigate and get better at. I got help again when I was stuck and ended up finding out I could do my whole script in one line. I found out all these things in a matter of minutes and a good nights rest. If I wasn't learning in public who knows how long it would of taken me to gain these insights.

If you are interested in the script you can follow [this thread](https://twitter.com/HugOfThunder/status/1418793998420824065?s=20), or see the final version below:

```
for i in {0..599}; do
    echo -n "Status Code ${i} seen: " >> ./statuscode.txt
    tshark -n -r lab-1.2_capture.pcap -Y "http.response.code == ${i}" | wc -l >> ./statuscode.txt
done

sed -i '/seen: 0/d' ./statuscode.txt
```

This will give you the output:

```
$ cat statuscode.txt 
Status Code 200 seen: 1138
Status Code 204 seen: 28
Status Code 301 seen: 2
Status Code 302 seen: 44
Status Code 304 seen: 21
Status Code 307 seen: 1
Status Code 403 seen: 1
Status Code 408 seen: 6
```

But, after a good night's sleep I realized you can get this all done in one line much more efficiently:

```
$ tshark -n -r lab-1.2_capture.pcap -Y 'http.response.code' -T fields -e http.response.code | sort | uniq -c
   1138 200
     28 204
      2 301
     44 302
     21 304
      1 307
      1 403
      6 408
```

So while I didn't dive all the way in and provide a step by step tutorial I hope I was able to give you insight to another aspect of my learning style and perhaps it can help you when you are starting out on a new learning venture. I remember at first being a little nervous of putting myself out there or 'sounding dumb' and I soon realized everyone is out here beginning or everyone has at one time been a beginner. Will, that's all today, happy learning!

**Bert's Brief** (by [@TimBertino](https://twitter.com/timbertino?lang=en))

Andre was gracious enough to let me give my thoughts on the "learning in public" concept. I share the same sentiment about getting started with writing publicly as you are learning something knew. I had the thoughts like:

- If I'm new to this, what's the point of writing a blog post? Nobody is going to get anything out of this this, right?
- Do I really want to show the world that I'm a beginner in *X, Y,* or *Z*?

I've learned to throw those thoughts to side and I agree 100% with Andre. There are great benefits to learning in public, such as:

- Writing a blog post about something you are learning forces you to explain what you learned. You become a teacher, if you will. This can really help you better understand concepts. You do NOT have to wait until you are an "expert" in something to write a post or teach it to someone else. This was a hurdle that I had to get over.
- As far a blogs go as a method of learning in public; writing is a skill. Writing about what you are learning about allows you to practice the art and find your own style.
- You never know when you might bring inspiration to others. You could be greatly helping other people who are at similar points in their journeys.
- As Andre mentioned, just by posting a question on a social media platform like Twitter, you can make some awesome connections.

So, I encourage you; write that post, ask that question, practice your craft, and help others along the way. And if you need a platform to write blogs, connect with us here at the Art of Network Engineering!
