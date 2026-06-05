---
title: "Gitlab + Hugo = Website Magic Happy Time"
slug: "gitlab-hugo-website-magic-happy-time"
publishedAt: "2021-03-22"
excerpt: "I should let you know right off the top, this is not a 'how-to' from an expert. Instead, this is a how I was able to do something cool for the first time, article. The reason for this post is that I had to use multiple..."
author: "Andre Roberge"
---

I should let you know right off the top, this is not a 'how-to' from an expert. Instead, this is a how I was able to do something cool for the first time, article. The reason for this post is that I had to use multiple different how-to sites and was still left to troubleshoot multiple things. I'm writing this so a person in the same position as myself can hopefully get up and running in less time. So, with that in mind, if you are an expert in the tools used later on in this post I welcome some feedback on what I could have done better or what simply didn't matter as I made my way through creating my first website since the GeoCities days (a Chicago Bulls tribute fan page).

About six months ago I was talking with a friend on twitter and we were discussing creating a website, a blog and video tutorial site together at some point. Life, projects, kids, COVID and home ownership got in the way and we never really got around to tackling it. Then, about 3 weeks ago I saw a [post](https://twitter.com/PeteCCDE/status/1203790863085780993?s=20) on my timeline discussing [docs as code](https://www.writethedocs.org/guide/docs-as-code/). I read into it, and watched a conference video that really got me excited. [Watch this presentation](https://www.youtube.com/watch?v=EnB8GtPuauw)! Now that you are as excited as me, let's dive in!

The first thing I did was look to see if any of my mutuals that I talk to a little bit use GitHub to host their website and check in, see what they used or thought about their site. Tony E aka [shoipintbri](https://twitter.com/showipintbri) has [such a site](https://showipintbri.github.io/#), hosted on GitHub. I reached out and he said if he had to do it all over again he'd use: GitLabs, Hugo and RestructuredText.

**Step 1**: So, I created a [GitLabs account](https://gitlab.com/users/sign_in?__cf_chl_jschl_tk__=c2ea972ca06305ae0a52f0f5f0eb910a38b00e18-1616165100-0-AQraM7drUXPyzYX3jrP_F-8ZOFfd9aJtLwSM-erXjMKuDDknfTf0N5aX0vAWO5uPbCg-KTpNFlaE3rI8u6j_MVDNhXfODzNbYD6kFlOsKIPy0FQ1oD45rl1TFNOjLwEGUjnPFYblkQ1SpUkDoJNq-ByT4cOazP3mGKmmRXDDq91TVWLQzBtU6AvgqGZwu-Qqrc9X1o7Ei0G_2GS7HbF4tMyPSh2bZuJ1ZZYH8HEK7VwzkFPZSWSWF0hT2vk_ru7Dw36n2GZdJXM35ONNH8MXuqq9p8EHR4q50_4FEcjN83SxOC8ILD9tO1bfZ4jM95iYj_9JbZgl3jLpL2ZPmkIFabeiYoB4Kjis9mjPy9TSBt1kNAYMWMxOaBn_2gSkxNYzsELT9Ui9TkJZ5UbVitRRcIc)

After you create an account, it's time to check our git version and or install it. I was working on Ubuntu 18.04 and the following commands will correspond as such.

**Step 2**: Install/Upgrade Git, for me I just had to upgrade

```
sudo apt update
sudo apt upgrade git
git --version
```

The next step is installing Hugo. Most of the documentation just says install the latest version of Hugo, which I did. But, once you get to looking at Hugo themes most of the new ones will want you to have the 'extended version' installed. The first time I stepped through this and my theme wasn't working, it was because I didn't have the 'extended version' installed. So, to save you a possible step, let's just install the latest Hugo extended version straight away (I'm writing this to save the next person starting from scratch a little time). You won't get the latest version using your package manager so we'll pull it down with wget.

**Step 3**: Install the latest Hugo extended version (make sure you are downloading the version associated with your architecture/operating system)

```
wget https://github.com/gohugoio/hugo/releases/download/v0.81.0/hugo_extended_0.81.0_Linux-64bit.deb
sudo dpkg -i hugo_extended_0.81.0_Linux-64bit.deb
Hugo version # verify your version/install
rm hugo_extended_0.81.0_Linux-64bit.deb
```

At this point you have everything you need except for your Hugo theme, but we will get there. At this point move into a working directory you'll want to use for your project. This is not necessarily needed but I like it.

**Step 4**: Make a working directory for your project and move into it

```
mkdir ~/Desktop/hugofthunder
cd ~/Desktop/hugofthunder
```

At this point, I set up git on my local machine to talk to the master of my newly created GitLabs account using SSH authentication.

**Step 5**: Create a public/private key pair

```
cd ~/.ssh/
ssh-keygen -t rsa -b 2048
cat id_rsa.pub
ssh -T git@gitlab.com/<your_username>
cd ~/<your_project_working_directory>
```

When you are logged into GitLabs you can paste the .pub you echoed above under your profile -> preferences -> ssh keys. The next thing to do before we start setting up Hugo is to set some global git configurations that correspond to your GitLab account.

**Step 6**: configure git

```
git config --global user.name "<your_username>"
git config --global user.email "<your_email_with_GitLab>"
git config --global --list # verify settings
```

If we are in the root of our working directory, it should literally be empty if you do an ls command, we can now do a git init command.

**Step 7**: git init

```
git init
```

If you've made it this far, it's time to do our first Hugo command. Congratulations, you are almost to website creation time! The first command you run will name your project and create a new directory with that projects name.

**Step 8**: Time to fire up Hugo! Name it whatever you want, you don't have to go with hello-world :) After you run your Hugo new site command move into the newly created directory.

```
hugo new site hello-world
cd hello-world
```

If you ll or ls in your newly created directory you'll see you have some basic files that associated with the barest of bare bones needed for your upcoming site.

This is a very exciting point in the project and this post. Here is where you will decide on what [Hugo theme](https://themes.gohugo.io) you want to run on your site. This is a configuration that will give a certain look/layout/feel to your website. Each theme has varying degrees of associated documentation but installing them all is pretty much the same. You either git clone or git submodule the theme as follows, and for demonstration purposes, I went with the [codex theme](https://themes.gohugo.io/hugo-theme-codex/).

**Step 9**: Install your Hugo theme

```
git submodule add https://github.com/jakewies/hugo-theme-codex.git themes/hugo-theme-codex
```

Alright, at this point you will have a pretty basic page with placeholder text. This is still pretty cool right? How do you get this up on your GitLabs for everyone to see?! You are about to find out!

The first thing we will need to do is decide on a project name as it will appear on GitLabs. For my website I chose the name 'jobapp' and used the following command to create it.

**Step 10**: Your first git push

```
# this will be down from the <working directory>/<your project> directory (the root of your project)
git add .
git remote add origin git@gitlab.com:<gitlabs_group_name/project_name>
git commit -m "init commit for project"
git push -u origin master
```

In about 30 - 90 seconds you should be able to refresh your GitLabs account and see your newly created project created along with the files and directories that were in the root of your project locally. The next thing to do is to talk about the files associated with getting this website up and running. There are two main files, the first I will discuss is called 'config.toml' and should be seen in the root of your project if you do an ls. If you go back to your themes documentation, which in my case was the [Codex theme](https://themes.gohugo.io/hugo-theme-codex/) they will usually have a .toml config file to copy and paste into your .toml

I found my [sample toml](https://github.com/jakewies/hugo-theme-codex/blob/master/exampleSite/config.toml) on the [codex theme's GitHub](https://github.com/jakewies/hugo-theme-codex). I simply cut and paste their sample file same into my own .toml.

**Step 11**: Edit your .toml config file

```
# DO NOT REMOVE THIS
theme = "hugo-theme-codex" 

# Override these settings with your own
title = "codex"
languageCode = "en-us"
baseURL = "https://githugs.gitlab.io/jobapp"
copyright = "© {year}"
```

In the .toml the only other thing you **HAVE** to change is the 'baseURL' to match what will be your URL on GitLabs. This will be the 'root' level so to speak of your website and all the sub directories will fall off this base. If this isn't set correctly your website will not render correctly on GitLabs. I'll show you in a few steps where to find this address.

The second configuration file is what GitLabs uses to create your site. You create this file on the root of your project locally as well, same place the .toml is located and name it '.gitlab-ci.yml' I used vim for this task but you can use any other txt editing application without any judgment (from me anyway).

**Step 12**: Create a .gitlab-ci.yml file

```
vim .gitlab-ci.yml
```

Let me show you what's in [my gitlab-ci.yml file](https://gitlab.com/githugs/jobapp/-/blob/master/.gitlab-ci.yml) and explain the most important part.

```
image: registry.gitlab.com/pages/hugo/hugo_extended:latest

variables:
  GIT_SUBMODULE_STRATEGY: recursive

test:
  script:
  - hugo
  except:
  - master

pages:
  script:
  - hugo
  artifacts:
    paths:
    - public
  only:
  - master
```

For just about every theme I tested out, as mentioned earlier, uses a Hugo extended version. Most of the how-to documentation for setting up your first site doesn't have you install the extended version locally or call an extended version in your .yml file on GitLabs. Instead, they simply have you call the latest version of Hugo. This didn't work for me, so to save you an hour of troubleshooting you can either navigate to the exact version of Hugo you want to spin up on GitLabs or simply cut and paste 'image: registry.gitlab.com/pages/hugo/hugo\_extended:latest' and make sure you are using the extended version.

What GitLabs does, to my understanding, is run a script that spins up a Hugo image and runs a script to create and render your website whenever there is a change. Alternatively, you can run Hugo locally to create your .html files and upload those to GitLab but I won't be covering that here.

At this point, we can do another git commit to add our edited .toml and newly created .yml to our GitLabs project. This .yml is what GitLabs will use to create your page so after this commit we will be able to verify what our URL is and verify we have the correct address in your .toml config file under baseURL.

**Step 13**: Let's commit our local changes to GitLab

```
git add .
git commit -m "adding .yml // edit .toml"
git push -u origin master
```

Now it is time to go to your GitLab project. On the left side you can scroll down to Settings -> Pages. It is in this location you can verify your baseURL. You can also go to this url to see how your site is currently looking. If you need to change your baseURL in your .toml file you simply make your changes and then push them to GitLabs.

From this point you should have a working site on GitLabs. You'll need to read your themes documentation on how to create additional posts and how to further edit and personalize your site. Each theme may do things a little different so it is of no use to continue down that train as the documentation for the theme is what you should follow.

I ended up creating <https://githugs.gitlab.io/jobapp/> in which I have a simple homepage and then two blog posts. This took me about 8 hours but if I was to follow what I just wrote I could probably accomplish the same thing in 30-45 minutes.

---

If you made it this far, thanks for reading and I hope you got something out of it. The following is a quick aside as to why I created a site in the first place :)

As you can see from the website I created I was trying to get Pete Lumbis' (who works at Cumulus/NVIDA networking) attention in hopes to start a conversation for a job ask [he posted publicly](https://twitter.com/PeteCCDE/status/1369789734495653888?s=20). I've been a fan of Cumulus Linux since I first started learning about networking. Most of all, I like that they have their VMs and vagrant boxes publicly available. You don't have to have a previous relationship with a sales rep to get access or worry about a 30 day license or something. Secondly, their VM can run on less on GB of RAM. This is huge, you can have a little lab going with 6 devices easily with a regular old laptop. No expensive hardware needed. Lastly, both layer 2 and layer 3 work great. With Junos you have to have two VMs up with an internal bridge to do what Cumulus Linux does right out of the box. Cisco VMs are hard to come by and want all of the resources. Thus, Cumulus Linux is great for those that want to spin something up fast and have all the features you are looking for to learn networking fundamentals. If you are up for learning Cumulus check out my friend [Aninda Chatterjee](https://twitter.com/aninchat)'s new PluralSight course: [Cumulus - The Big Picture](https://www.pluralsight.com/courses/cumulus-big-picture).

---

If you'd like to simply clone my site, you can do so here: <https://gitlab.com/githugs/jobapp>
