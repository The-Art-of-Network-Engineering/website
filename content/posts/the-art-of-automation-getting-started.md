---
title: "The Art of Automation - Getting Started"
slug: "the-art-of-automation-getting-started"
publishedAt: "2020-11-30"
excerpt: "I imagine if you're here you just got done with a hellacious week of updating 100's of switches, 1000's of config directives, or your fingers are bleeding from hammering away all week. However, you may just very well be..."
author: "dylanautomates"
---

I imagine if you're here you just got done with a hellacious week of updating 100's of switches, 1000's of config directives, or your fingers are bleeding from hammering away all week. However, you may just very well be more proactive than I was. Automation for me was born out of necessity. Without automation, I think I would have burned out. It's simple, automation makes my job easier, more rewarding, and manageable. If you've decided automation is something you want to learn then this article is for you. I wish this article was the first one I read when I started my journey into DevOps, and subsequently NetDevOps.

## First Steps

The first thing I would be deciding on is what is the problem to solve? Next, you need to decide on, what outcome you'd like. For me, it was helping to manage a VMware environment and the array of VM's within it. It could be as simple as you want to set up a web server in your home lab and that's alright. Once you start understanding the concepts of automation you'll see 100's opportunities to use it.

![](https://artofnetworkengineering.com/wp-content/uploads/2020/11/pexels-andrea-piacquadio-842554.jpg?w=1024)

Now it's time for you to sink your teeth into the tech, my favorite part. The first three things I would focus on is YAML( YAML Ain't Markup Language ), Jinja, and Ansible. The first two are large components of Ansible. Therefore will be needed in almost any Ansible Project. YAML is what you'll use to tell Ansible what to do. However, don't fear this does not require any software development experience. Here is a brief example of YAML in an ansible-playbook.

```
- name: Install the latest version of Apache
  yum:
    name: httpd
    state: latest
```

As you can figure out from the name, this will install the latest version of Apache. It really is that simple, you're now automating.

Now continuing the example of installing Apache, the next step is configuration. Similarly, we have another tool that can help, Jinja2. With Jinja2 we have a powerful templating engine. In addition here is an example of Jinja for configuring the Apache configuration.

```
NameVirtualHost *:80
{% for vhost in apache_vhost %}
<VirtualHost *:80>
ServerName {{ vhost.servername }}
DocumentRoot {{ vhost.documentroot }}
{% if vhost.serveradmin is defined %}
ServerAdmin {{ vhost.serveradmin }}
{% endif %}
<Directory "{{ vhost.documentroot }}">
AllowOverride All
Order allow,deny
Allow from all
</Directory>
</VirtualHost>
{% endfor %}
```

Contained within the double curly brackets {{ }} is the name of a variable. Ansible passes these variables to the Jinja engine and then spits out our completed configuration file for us. As you can see this is not software development and something you can learn.

To help you grasp these concepts I recommend you setup a small lab. I found having an ansible host and 2 nodes under its control was useful. You can create these on Centos 7 hosts using your preferred virtualization platform. In my case, I set up a load balancer with 2 web servers behind it using Ansible only.

## Running with it

Once you're comfortable with the basics you could start implementing this at work. If you're a network engineer you can start with small things such as updating NTP, DNS, even changing a VLAN on a switchport. Eventually, you can move up to more advanced configurations, generating BGP and OSPF configuration with Jinga and using [Netbox](https://netbox.readthedocs.io/en/stable/) as your source of truth for configuration data.

A hurdle you may face when bringing these new found skills to work is buy-in from co-workers/managers. Take these situations in stride. I recommend showing them the small things you've automated. In addition, show them the time it's saved. Explain to them how you learned to do it, and why you think they should.

After tackling some of the simpler things in your network it's time to move on to some more advanced projects. A task I was highly motivated to automate was the provisioning of resources, in my case VMs, and assigning network resources to it ( vlans, addresses, hostname). This required a bit more than Ansible, enter Terraform. However that is beyond the scope of this article, I did create a Git repo showing a simple version of this you can [check out](https://github.com/dkraklan/terraform_vmware_vm). You may also find you like the concepts of NetDevOps so much that you'll want to implement IaC ( infrastructure as code) to manage your entire network. This offers many benefits beyond simply automation. It allows you to implement development and QA environments for testing changes.

## Final Thoughts

I'd like to leave you with some of the final tips, tools, and general advice I've gained. Here is a very non-comprehensive list of tools and resources I've found that I use quite often if not daily.

- [Validyaml](https://github.com/martinlindhe/validyaml) - A CLI tool for validating your YAML files
- [Jinja2-CLI](https://github.com/mattrobenolt/jinja2-cli) - A CLI tool for validating your Jinja templates and checking the outcome is as expected.
- [Ansible Template Tester](https://ansible.sivel.net/test/) - Similar to Jinja2-CLI, just in the browser, sometimes easier to see formatting errors on output.
- [Ansible Docs](https://docs.ansible.com/ansible/latest/index.html) - Self-explanatory, but this tab is almost always open in my browser.

One of the most important tips I can provide is to find a good community to ask questions. Getting feedback from how others are doing things is important especially with tools such as Ansible. It is a community-driven project that means there are some really smart people willing to help. Most importantly is enjoy the journey, it takes time, it will be frustrating, but you'll get there. Enjoy the benefits when you do!
