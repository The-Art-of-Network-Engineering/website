---
title: "TAC Connect Bot - Devvie Has a Sibling!"
slug: "tac-connect-bot"
publishedAt: "2020-08-31"
excerpt: "This article is written by Ben Story and originally appeared on his blog packitforwarding.com"
author: "Andy Lapteff"
---

*This article is written by Ben Story and originally appeared on his blog [packitforwarding.com](https://packitforwarding.com/index.php/2020/08/12/tac-connect-bot/)*

Recently I opened a TAC case through my Cisco Partner. In the initial automated response from Cisco TAC, I noticed something new. There was a link ([https://tacconnect.cisco.com](https://tacconnect.cisco.com/)) that I had not seen before. Since it mentioned a bot, I figured why not let's see what it's all about.

![Screenshot of the TAC Connect website showing the options of using TAC Bot through Webex Teams or through a web interface.](/blog-images/tac-connect-bot/chrome_QdbB47kSBB.jpg?resize=1024%2C694&ssl=1)

TAC Connect Website

## Using the TAC Connect Bot

After signing into the TAC Connect website, I was presented with the choice to use the bot through Webex Teams or through a web interface. As I already had Webex Teams I went that route. TAC Connect quickly sent me an introductory message in Webex Teams. This message gave me a list of ways to interact with the bot.

![Hello! I can help you get case, bug and RMA details and connect with Cisco TAC. You can make the following requests in English language:

my cases
what is the status of (case number or bug number or rma number)
connect with engineer (case number)
create a virtual space (case number)
request an update for (case number)
update the case (case number)
escalate (case number)
raise severity (case number)
requeue (case number)
close the case (case number)

I can help you manage cases that are opened from Cisco.com Support Case Manager. Currently, I can't open new cases, reopen closed cases or answer technical questions. Type "/list commands" to get a list of command requests and find details of supported features using the documentation and demo videos.](/blog-images/tac-connect-bot/CiscoCollabHost_YZ10s91bwc.jpg?resize=632%2C449&ssl=1)

Instructions for using the TAC Connect Bot

My first step was to issue the command “create a virtual space” followed by my case number. This created a new space with the service request number as the name and automatically invited me, the TAC engineer, and the partner’s engineer. At this point, my engineer engaged us and we were able to quickly work through troubleshooting my issue. For this particular case I didn’t end up using any of the other commands, but I can definitely see them as being useful as well. No more calling to requeue the case or to escalate. It also gives great tools to get the status of cases without having to log in to the support case manager. This makes it very easy to get updates from your mobile device.

## API for TAC?

Beyond the natural text commands, there are additional bot commands that form a quasi API for TAC. I’m sure that some of our DevOps fans will see ways to use this with their tools.

- **/action-plan**: Sends the last note containing action plan
- **/bug**: Get list of Bugs associated with TAC case
- **/case-feedback**: Give multi-line feedback about the case in a single message
- **/clear** or **/reset**: Reset the conversation dialog
- **/close-case**: Request engineer to close case
- **/connect**: Connect to case owner of a case
- **/create-space**: Create a Webex Teams virtual space for a case
- **/customer**: Get customer information associated with TAC Case
- **/description**: Get problem description for the TAC case
- **/escalate**: Escalate a case
- **/feedback**: Give multi-line feedback about the bot in a single message
- **/last-note**: Get the last note from the TAC case
- **/link**: Get link to the case in Support Case Manager
- **/list cases**: View the prioritized list of your cases
- **/owner**: Get case owner (TAC CSE) for TAC case
- **/raise-severity**: Raise the severity of a case
- **/reopen**: Re-open a case
- **/request-update**: Request engineer to provide the latest case update
- **/requeue**: Requeue a case
- **/rma**: Get list of RMAs associated with TAC case
- **/status**: Get status of a case, bug or RMA
- **/update**: Add a note to the TAC case
- **/updated**: Get the date on which the TAC case was last updated, and calculate the time since last update

## My Final Thoughts

TAC Connect bot is a great new tool for Cisco customers. I look forward to seeing it evolve. I would really like to see TAC push more use of it and other tools like the [Cisco CLI Analyzer](https://cway.cisco.com/cli/), but that’s another post.
