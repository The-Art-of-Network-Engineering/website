---
title: "Hacking Passwords, a GIAC Network Forensics Exam and an Interview"
slug: "hacking-passwords-a-giac-network-forensics-exam-and-an-interview"
publishedAt: "2021-11-29"
excerpt: "![](https://artofnetworkengineering.com/wp-content/uploads/2021/11/e_f4rahvuaykjlk.jpeg?w=800)"
author: "Andy Lapteff"
---

![](https://artofnetworkengineering.com/wp-content/uploads/2021/11/e_f4rahvuaykjlk.jpeg?w=800)

"Good Morning"

It's been a few months since I last checked in blog wise. It's been a long stretch for me personally, maybe it's been the first time I've been feeling Covid fatigue, work burnout or maybe interviewing for a job just introduces a lot of anxiety into my bloodstream. In any case, blogging here was the first to go as far as where I've spent my time. That doesn't mean I haven't been doing anything and I'm writing today to catch up a bit!

## Hacking Passwords

One of my work projects recently had me figuring out how to use [hashcat](https://hashcat.net/wiki/doku.php?id=hashcat) with a list in an attempt to crack Linux hashes of our users. The best little [cheat sheet](https://www.blackhillsinfosec.com/wp-content/uploads/2020/09/HashcatCheatSheet.v2018.1b.pdf) that has helped me along the way came courtesy of [Black Hills](https://www.blackhillsinfosec.com/). Embarrassingly, it took me a week and a half to get a command together that would actually start cracking hashes. The worst of it was simply figuring out that I needed the hashes by themselves for processing to begin. I was initially trying to process usernames:hash thinking hashcat would simply find the hashes in my document but instead just threw an error. There are a lot of tutorials out there on using hashcat for the first time, so I won't do that here. Instead, I'll highlight a little 'automation' I did once I had my hashcat output file. Here is a representation of what my original file looked like when I pulled down every users hash:

```
$ cat hashes.txt 
birda:$6$aaaabbbbcccc
poopd:$6$aaabbbbccccd
poodf:$6$aabbbbccccdd
alexm:$6$abbbccccdddd
alit:$6$bbbcccddddee
```

My list was a lot longer, and had actual hashes but for demonstration purposes this should suffice. I simply need to use the cut command from here to get the hashes by themselves and then run that file through hashcat...

```
$ cat hashes.txt | cut -d : -f 2
$6$aaaabbbbcccc
$6$aaabbbbccccd
$6$aabbbbccccdd
$6$abbbccccdddd
$6$bbbcccddddee
```

If you redirect that to a file, call it hashcat.txt, you'd be ready to run hashcat. And using Black Hills cheatsheet, you can specify with the -m what hashes you are running, which in my case I was doing SHA512 unix hashes. By the time I got this going, it was exciting to check my output file and see it filling up. We were really cracking some hashes. This was exciting. The next part of the journey was marrying up the password of the cracked hash with the user name. This is because the output of the cracked.txt (output file from hashcat) is hash:password like so:

```
$ cat cracked.txt 
$6$aaabbbbccccd:1qaz2wsx!QAZ@WSX
$6$aabbbbccccdd:1q2w3e4r!Q@W#E$R

# this is a cool file and all, but what username does this 
# belong to???
```

To begin, I was manually using grep and going back to my original file that had the usernames:hash, but who wants to do everything manual forever? Also, my list was pretty long so figuring out how to do this more efficiently was worth the investment. So I came up with a quick little bash script that allowed me to grep each hash from my cracked.txt from my original list (hashes.txt):

```
$ cat script
cat cracked.txt | cut -d : -f 1 | while read -r line; do
    grep $line hashes.txt >> grep.txt
done

# running the script
$ bash script 

# checking out the file created from script
$ cat grep.txt 
poopd:$6$aaabbbbccccd
poodf:$6$aabbbbccccdd
```

At this point I was half way there. I had each username that I cracked a password of, now I just needed to get the password. To finish the job, I used the cut command one more time to isolate just the passwords and then used the paste command to put everything together:

```
$ cat cracked.txt | cut -d : -f 2 > passwords.txt

$ cat passwords.txt 
1qaz2wsx!QAZ@WSX
1q2w3e4r!Q@W#E$R

$ paste grep.txt passwords.txt > CRACKED.txt

$ cat CRACKED.txt 
poopd:$6$aaabbbbccccd	1qaz2wsx!QAZ@WSX
poodf:$6$aabbbbccccdd	1q2w3e4r!Q@W#E$R
```

I eventually added this all up in one bash script and I was set to get a file with usernames and passwords. There are probably 18 more ways to do this and I may have done the least effective way of them all but I just wanted to share the little journey I went on cracking my first hashes. Most exciting of all I got to play with a new command, I'd never used the paste command and it works perfectly here.

## GIAC Network Forensic Analyst

I was lucky enough to take [SANS FOR572](https://www.sans.org/cyber-security-courses/advanced-network-forensics-threat-hunting-incident-response/), advanced network forensics course which maps to the [GNFA exam](https://www.giac.org/certifications/network-forensic-analyst-gnfa/). This was my second SANS course and GIAC exam. The first being [SEC503 and the GCIA](/blog/starting-the-giac-certification-process). I've got to say, the order in which I took these courses was great for me. SEC503 and FOR572 use a lot of the same tools: Zeek, nfdump, tcpdump, tshark. Both courses even go over some of the same protocols, like DNS and HTTP(S). But, in my opinion SEC503 stands to be a great intro to these topics if you are not fully immersed already, and FOR572 takes these topics and applies them to 'real world' type data and scenarios over and over again. I'd recommend taking a course from Phil Hagen, the gentlemen behind my instruction, any day of the week.

https://twitter.com/HugOfThunder/status/1460685408358961155?s=20

Exam wise, I found the GNFA to be a solid 5x to 10x harder than the GCIA although the GCIA was pretty cool in that you had to interact with data on a VM for a few questions and the GNFA, at least today, is all multiple choice. But the questions for the GNFA were very applied compared to the GCIA. Instead of just knowing the proper switch for a command, you were looking at some output and had to interpret something 2-3 levels deeper than what's simply displayed. This was very challenging and rewarding. The closest to 'real world experience' I've ever felt while prepping for an exam.

As I look at SANS catalogue and contemplate what comes next, it's hard to choose. Thinking of shooting for [FOR508](https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-training/), and even if there is overlap with courses I've already taken I think getting insight and another instructors perspective is always useful.

## Interview

Now it's time to delve into somethings that didn't come out as an immediate success. I got to interview, 4 in total, for a position in which I was really excited about. A possibly life changing opportunity. The job was remote, working on SIEM of sorts for a networking vendor as a technical writer.

I hadn't interviewed for positions since the 2016-18 time frame. But I enjoyed these interviews and come to find out I really like doing interviews in a video chat over in person. Felt way more comfortable. Looking back, I was always a way more nervous wreck checking in with the receptionist and being in the fancy corporate building than I was during this iteration of interviews. In the comfort of my own home, wearing more comfortable clothes and sipping a coffee from my home espresso set up was something I'd sign up to do again if I have the choice.

After interviews I waited about 3 weeks before I heard that I wasn't going to be extended an offer. Which hurt, as my mind couldn't help but daydream about possibilities during the wait. In truth, the interview process and having a shot for something like this consumed me, I was useless as far as studying for the exam above, another exam, the Cisco SCOR exam, I failed during this time. Trying to do any sort of studying or focus on anything was very difficult for me. I ended up pushing my GNFA exam out as far as possible, and got closure that I wasn't selected before I sat for that exam, which I think helped. It was exciting to go through the process and be considered but the process of waiting to see if I was going to be selected was excruciating for me.

I didn't get picked up for the position but I did get practice telling my story and I think I made a good pitch for myself irregardless of the outcome, in any case, I'm improving in that area. I've never been that great at pumping my own tires but I'm getting more and more confident as my cyber belonging goes. As long as I keep my head to the ground I'm confident an opportunity I'm excited about will present itself when the time is right.
