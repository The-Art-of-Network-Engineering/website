---
title: "The Importance of TAC along with some SSO Info"
slug: "the-importance-of-tac-along-with-some-sso-info"
publishedAt: "2020-09-04"
excerpt: "This article is by Andy West and first appeared on his blog, blueboxredbox.com."
author: "opethpa"
---

*This article is by Andy West and first appeared on his blog, [blueboxredbox.com](https://blueboxredbox.com/2019/05/15/the-importance-of-tac-along-with-some-sso-info/).*

*For those that have worked with me this formatting approach is either going to make you smile or make you cringe with memories of overly complex email updates.*

## OPENING

Someone once asked me why I seem to enjoy dealing with TAC, Tech Support, Support, insert some other title here as much as I do and the answer was simple: *every time I deal with TAC I come away with some new piece of knowledge.*

Yes I know we all have played TAC roulette where maybe the person you get handling your case doesn’t seem to have that much knowledge of what you are calling about. Maybe they are just starting down their career path and it’s their first day. Maybe English isn’t their first language. In the end though , for me, calling TAC isn’t just about solving a problem but rather learning something new each time I end a given case. That doesn’t have to be something technical because like many things in life , the results of an action are only as good as the effort you put into that action.

As a reference point I’ll talk about a recent case I worked through around getting SAML based SSO, IDP = Okta, to work with Cisco Collab. After burning on this for a few days with two internal engineers we then engaged both Cisco and Okta TAC. Having worked with the Cisco engineer we got before we knew we were in a great spot. The Okta engineer was new to us though. The first Webex we did with all of us didn’t go great, no real progress seemed to be made and the Okta TAC had to drop earlier. It would have been easy to just write that engineer off as not caring as much as the Cisco TAC did or maybe he didn’t know what he was talking about but he asked us to reschedule for later in the afternoon.  So we waited and within about 30 minutes of that second call starting the Okta Engineer and resolved both issues. Maybe they were able to clear their head , maybe they spoke to someone else , maybe they didn’t do anything at all related to our case and just found the right logs to look at when we all got back together.

The point being that TAC is there to solve problems for their customers , among other things, and this engineer did just that which is why we all pay for such support. So great, what new things did I get from that case that made this another enjoyable scenario:

## **NON-TECHNICAL**

This was the first time I had gone through dealing with Okta support so I got to learn what that process is and what mechanisms they use to interface with their customers.

## **TECHNICAL**

I picked up this CUCM CLI driven command:

```
set samltrace level
```

TAC also pointed us to these two documents which really seemed to help explain and troubleshoot SSO.

[Troubleshoot SSO in Cisco Unified Communications Manager](https://www.cisco.com/c/en/us/support/docs/unified-communications/unified-communications-manager-callmanager/213293-troubleshoot-sso-in-cucm.html)

[SAML SSO Okta Identity Provider](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cucm/SAML_SSO_deployment_guide/okta/12_0_1/cucm_b_saml-sso-okta-identity-provider.html)

## CLOSING

Not every TAC engineer is going to be the all star you hope for but remember the following: life is a two way street. You as a customer have the responsibility to be a good customer on that call. You have a responsibility to do your part to try and make it easier for TAC to do their part and for me that comes down to always trying to learn something new. =)
