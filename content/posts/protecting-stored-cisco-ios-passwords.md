---
title: "Protecting stored Cisco IOS passwords"
slug: "protecting-stored-cisco-ios-passwords"
publishedAt: "2021-01-18"
excerpt: "This article first appeared on Andrew's blog - andrewroderos.com"
author: "Andrew Roderos"
---

*This article first appeared on* *Andrew's blog - [andrewroderos.com](https://andrewroderos.com/securing-cisco-ios-passwords/)*

As many network professionals know, Type 0 (cleartext) passwords are a **big no-no**. With that said, Cisco introduced Type 7 and 5 passwords in the early 90s to protect stored passwords.

However, after more than 25 years, the Type 7 password type no longer serves its original purpose of keeping the password secret. That said, it is best practice to avoid it as much as possible.

Nowadays, the majority of network professionals know and use Type 5 passwords. While Type 5 is still sufficient with a strong password, did you know that it seems Cisco has deprecated it in favor of the new hashing algorithms?

Find out more about the new hashing algorithm [**here**](https://andrewroderos.com/securing-cisco-ios-passwords/). In this article, I also demonstrated how to launch a dictionary attack on the hashing algorithm.
