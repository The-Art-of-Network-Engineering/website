---
title: "The Network Effect: Why the Thing Everyone Uses Keeps Winning"
slug: "the-network-effect"
publishedAt: "2026-07-16"
excerpt: "Why does the thing everyone already uses keep winning, even when it isn't the best built? A conversation with William Collins on network effects, moats, the cold start problem, and why you can copy a product but never the crowd that believes in it."
author: "Andy Lapteff"
coverImage: "/blog-images/the-network-effect.jpg"
episodeSlug: "the-biggest-myth-about-open-source"
---

Picture two group chats.

One has three people in it. The other has everyone you know. Same app, same features, same buttons. Which one do you open?

You already know the answer, and you didn't have to think about it. You go where the people are. Not because that chat is better designed, but because the value of the thing is the people already inside it.

That's the network effect. And once you see it, you start seeing it everywhere.

## The simplest version of the idea

A network effect is when a product gets more valuable as more people use it.

The first fax machine was a paperweight. Who were you going to fax? The second fax machine made the first one useful. A million fax machines made every fax machine close to essential. The machine didn't change. The network around it did.

Phones, email, marketplaces, social platforms, payment apps. The pattern repeats. The product is a container. The value is who else showed up.

Here's the part that trips people up. We're trained to believe the best product wins. Cleaner code, more features, a nicer interface. Sometimes that's true. But when a network effect is in play, "best" stops being the deciding factor. The winner is often the one that got enough people first, because the people are the feature.

## Why this matters if you're building something

[William Collins](/episodes/the-biggest-myth-about-open-source) said the word "network effect" a lot when we recorded in Munich, and it took me a minute to catch why he kept circling back to it.

We were talking about moats. Everybody in startup circles talks about moats, and most people get it wrong. They point at their code, or their feature, or their clever architecture and call that the moat. William's whole point was that the moat is almost never the code.

Look at Terraform. If the code was the moat, someone could have forked it, cleaned it up, and walked away with the prize. Plenty of people had the skill. Nobody won that way. Why?

Because HashiCorp didn't build a moat out of Terraform the tool. They built one out of everything that grew around it. They rallied a community. People started writing modules. A registry showed up that made the tool easier to use, which was free marketing and free engineering at the same time. Then the vendors noticed. Their customers were already using Terraform, so they built providers to meet them there. Community pulled in vendors, vendors pulled in more community, and the wheel started spinning on its own.

That's the moat. Not the source file. The separation between your idea and everyone trying to copy it, measured in how many people have wrapped their work around yours.

You can fork code in an afternoon. You cannot fork a community.

## The cold start problem, which is the whole game

There's a catch buried in all of this, and it's the reason network effects are hard instead of magic.

If your product is only valuable once a lot of people use it, then early on, when nobody is using it, it isn't valuable. That's the cold start. The empty group chat. The marketplace with sellers and no buyers, or buyers and no sellers. The chicken staring at the egg.

Every product that ever rode a network effect had to survive this stage first. And the ones that made it usually did the same thing: they made the product worth using for one person, before the network existed.

Think about it. A note-taking app is useful to you alone, even if nobody else ever joins. A photo filter is fun before it's social. A design tool helps you make one poster before anyone shares it. The network effect is the second act. The first act is being genuinely useful to a single human sitting by themselves.

If your thing is worthless until the crowd arrives, the crowd never arrives. If your thing is useful on day one for one person, you buy yourself the time to grow the network.

## Practical ways to put the network effect to work

None of this helps if it stays a concept. So here's how you put it to work, whether you're building software, running a podcast, writing a newsletter, or growing anything that gets better with more people.

**Solve the single-player problem first.** Before you count on the crowd, make sure the product earns its keep for one user in isolation. This is your bridge across the cold start. If someone would use it alone and be happy, you have a foundation. If not, no amount of growth tactics will save you.

**Take the friction out of the first try.** This is why so many tools offer a free tier, even when it costs the company money. They're not being generous. They know that five clicks and a working demo in your own sandbox is worth more than any pitch. Let people feel the value before you ask for anything. The goal of the first experience isn't to sell. It's to remove every reason to leave.

**Let your users add value for you.** The Terraform registry is the model here. HashiCorp didn't write every module. They built a place where users could, and every module a stranger contributed made the tool more useful for the next person. Ask yourself: what can my users create that makes this better for everyone else? Templates, plugins, reviews, playlists, answers, guides. When your users build, your product grows while you sleep.

**Make sharing a natural side effect, not a chore.** The strongest networks grow because using the product invites someone else in. A shared doc needs a second person. A referral gives both sides something real. You're not begging for growth. You're designing the product so that normal use pulls the next person through the door.

**Get the ecosystem to show up.** Once you have real users, the people who sell to those users will follow. Vendors built Terraform providers because that's where the customers were. If your platform has an audience, partners and integrations become a reason for that audience to stay, which becomes a reason for more partners to build. Community pulls vendors. Vendors deepen the community.

**Remember the moat is the people, so treat them like it.** The most defensible thing you own is not your feature list. It's the practices, the relationships, and the trust you've built with the people around your work. That's slow to build and slow to steal. Protect it. Show up for it. It's the part nobody can fork.

## Where this leaves you

I spent most of my career believing the best-built thing wins. Learn the deepest, know the most, and the market rewards you for it. Then I watched tools with worse code and simpler ideas run away with entire categories, and I couldn't square it until conversations like this one.

The lesson isn't that quality doesn't matter. It's that quality alone was never the moat. The moat was the avalanche of people who chose to build their work on top of yours.

You can copy a product in a weekend. You can't copy the crowd that already believes in it.

So build something one person loves. Then make it easy for that person to bring the next one.

The rest is just the wheel, spinning.

If this clicked, the same Munich conversation with William led to a companion piece on why your code was never your competitive advantage: [The Biggest Myth About Open Source](/blog/the-biggest-myth-about-open-source).

---

Inspired by a conversation with William Collins, host of the [Cloud Gambit podcast](https://www.thecloudgambit.com/), recorded in Munich ahead of AutoCon 5. Find all things Art of Network Engineering at [artofnetworkengineering.com](https://artofnetworkengineering.com), [join the Discord](https://artofnetworkengineering.com/iaatj), and [sign up for the newsletter](https://artofnetworkengineering.com/newsletter) dropping soon.
