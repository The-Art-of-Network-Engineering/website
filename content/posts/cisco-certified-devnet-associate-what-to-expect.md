---
title: "Cisco Certified DevNet Associate, what to expect?"
slug: "cisco-certified-devnet-associate-what-to-expect"
publishedAt: "2020-08-03"
excerpt: "![]()In 2019 Cisco announced a whole new series of certifications, in parallel with updating their existing offering; this time is not a change, but something brand new, and everyone is very excited. Still, some of us..."
author: "Andy Lapteff"
---

![]()In 2019 Cisco announced a whole new series of certifications, in parallel with updating their existing offering; this time is not a change, but something brand new, and everyone is very excited. Still, some of us (old fashioned network engineers) did not fully understand what this new DevNet is all about. Buzzwords like "Automation," "DevOps," "Programmability, "APIs" and the list goes on. Should a Network Engineer spend time on this? The answer is definitely yes!

The goal of this blog post is to demystify and have a good expectation of this certification, to help you decide if you want to pursue this track or not. I strongly recommend it. As you may already know, or have heard, the work we do is evolving, and it’s happening right now.

I will begin setting some ground on an interesting use case called “Net DevOps”, followed by breaking down the major topics found on the [blueprint](http://cisco.com/c/dam/en_us/training-events/le31/le46/cln/marketing/exam-topics/200-901-DEVASC.pdf) and their lab resources. I will wrap it up with some recommendations of guides/courses that you can leverage if you want to follow a structured plan to get certified.

## 

## What makes a DevNet associate?

There are two major candidates to this certification, network engineers and software developers; Cisco wants to close the gap between these two to enter the world of "Net DevOps." I want to brief you on this topic or use case because it explains well how things will change in today’s networks, and may even interest you in learning more.

Imagine yourself working for a big corporation XYZ and the Network Architect decided to migrate from EIGRP to OSPF. You, as the network engineer, need to plan in detail all the commands and testing you will do, possibly on a Saturday night. You try your best to make sure nothing will break but human error is always a possibility. This is both very time consuming and risky, but it has to be done. Now, what if I tell you that you can dispatch your desired changes to an automated pipeline called “CI/CD”, this will run extensive tests to ensure that not only the syntax is right but it makes sense. Then, a virtualized environment is generated automatically, emulating your production network to test your changes and validate the impact. If everything goes well the system can update the production network in minutes, down from probably a window of 8 hours or more. You can learn this in more detail on this certification, I found it to be quite interesting and fun!

What I just described already happens in the world of Software Development as DevOps. We are taking all its advantages and excellent features to the Network, often called "Infrastructure as Code." What else can you learn as a DevNet associate candidate:

- Understand the different software development strategies and design models, a good introduction for the rest of the course.
- Understand the various data modeling formats (XML, JSON, and YAML), this is the standard language that devices use to transport their configuration or state in a standard format any program can consume.
- Learn about some of Cisco products APIs, this is how you can quickly configure, verify, or delete stuff from your network devices without manually interacting with their CLI.
- Implement those APIs requests in a fully automated scripts in Python.
- Learn the basics of Linux Bash shell and Git version control.
- Understand the foundation and building blocks of configuration management tools such as Ansible, Puppet, Chef, and many others. These are used to keep a state of your desired network/server configuration and run to make sure that the state is always enforced.
- Learn the foundation of Cloud, this includes their deployment models and types (Virtual machines, Bare-Metal, and containers)
- Learn the concepts of the "CI/CD" pipeline, what I previously described of the process that a network/software change takes to be deployed in production.
- Understand the concepts of network fundamentals and web security.

The exam blueprint describes this is in more detail, but I wanted to add a more human-readable description of the exam, here is the official exam topics if you want a deep-dive:

<https://learningnetwork.cisco.com/s/devnet-associate-exam-topics>

## Python, the elephant in the room.

Some people believe that they are required to be a Python developer to pass this certification. Well, it's not quite like that. Python knowledge is indeed a pre-requisite, but you will be only scripting. This means that you must learn the basics of Python well enough to use some of its libraries to consume various APIs and interact with the data they send or receive.

Remember that practice is vital, build the habit of doing Python scripts by yourself and from scratch. It doesn't cut it to just understand any given script, get your hands dirty! There are literally hundreds of courses online (Udemy, Pluralsight, YouTube, and more) to help you learn Python from zero to hero.

## How about Labs?

The good news for any DevNet associate candidate is that you have everything you need to practice extensively, all you need is a personal computer or laptop, with the following at the bare minimum:

- Python (Any 3.X version will do, version does not matter much for this exam)
- Postman, to practice building and testing API.
- GitBash if you have Windows, to practice Bash and Git.
- Internet Access to use all the free DevNet sandboxes available at developer.cisco.com.
- Docker, installation instructions at docker.com, this is to practice your container skills.

## Study Plans and guides.

Here is my list of the best resources to get certified, an excellent structure to become prepared in a reasonable timeline:

- Cisco Platinum Learning Library (CPLL) - this is probably the most expensive option. If you work for a Cisco partner you may already have access to it, and there are DevNet Associate courses that you can take to help you get certified.
- Nick Russo created an outstanding study guide, it requires a [Pluralsight subscription](https://www.pluralsight.com/pricing/skills), I used this to get certified so I can recommend it personally. <https://www.youtube.com/watch?v=AhPloufPDH8&list=PL5xIX61b_ikPISF_VMLOgKnRfRJApTqsP>
- CBTNuggets - I did not consume their course but I have seen a lot of people who were successful in the exam following this course. <https://www.cbtnuggets.com/certification-playlist/cisco/devnet-associate>

There may be other resources out there, but I consider these three the best in my opinion, and from personal experience. Cisco Press is soon to release a DevNet Associate Official Study guide that will make it a lot easier to get certified. It'll be released on or around September 22nd, 2020, but you can [pre-order it today](https://www.ciscopress.com/store/cisco-certified-devnet-associate-devasc-200-901-official-9780136642961).

## My take on this Exam

I started this journey as an old-fashioned network engineer (describing myself as such with pride), I learned a lot, quite a lot of new things. I didn't know the very basics of automation that I can apply now to my current job role. I also have the necessary skills to automate a given network or at least an extension of it.

I feel any employer will be happy to have someone making your Network smarter and more efficient. I highly recommend any Network Engineer to complement their career with this toolset. The future is here, we need to adapt and also forget about the good-old CLI (for configuration purposes) to welcome the era of programmability and automation.

As per the exam, I believe it is fair and challenging at the same time, don't take your studies lightly for this one. I was surprised to see the new "fill the blanks" type of questions which

makes you know some things by heart, there are around 100 questions on this exam which may be a bit overwhelming, it is important to be well-rested and sharp to manage your time wisely but at the same time analyze each item thoroughly. Whether you decide to go down this road or not, I wish only the best for you on what is to come.
