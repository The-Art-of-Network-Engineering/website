---
title: "Enterprise Network Automation with Itential"
slug: "enterprise-network-automation-with-itential"
publishedAt: "2022-02-16"
excerpt: "In this day and age, saying that enterprise networks are critical would be an understatement. Networks have essentially become a utility similar to electricity, gas, and water. When you turn that proverbial knob, those..."
author: "Andy Lapteff"
---

In this day and age, saying that enterprise networks are critical would be an understatement. Networks have essentially become a utility similar to electricity, gas, and water. When you turn that proverbial knob, those packets had better flow; and quickly! Except, the knob is stuck in the on position and never gets turned off. If it does get turned off, somebody is in trouble. As businesses grow, so does their digital footprint, which means the network must grow as well. Not alongside the business, but faster than the business. The network has to be ‘one step ahead’, always ready for what the business has next to throw at it next. Oftentimes, as the network grows, the complexity of the network grows as well. With this growth and complexity come challenges. The network must be built onto, changed, and maintained. These challenges include:

- Manual, static configurations across many devices.
- Configuration drift and compliance issues.
- Multi-vendor environments.
- Change management processes that are multi-step, manual, and disaggregated.

The challenges listed above can cause the management of enterprise networks to quickly and easily get out of control.  Modern networks require a management strategy that provides value.  They need a strategy that can provide the solutions of centralized configuration management, backup, and compliance that can scale with the organization.

**Itential**

Itential is a company that addresses the challenges mentioned above by providing network automation, configuration, and compliance solutions for enterprise networks.  Itential believes that modern networks need to “support and enable digital transformation”.  Itential was founded in 2014 and since then, through their products they have supported the automation of over one billion processes.  The automation platform supports both on-premises network and cloud environments.  The platform itself can be delivered either as an on-prem solution or as a cloud native software as a service (SaaS) solution.  The main features that will be covered throughout the rest of this article include Configuration Manager, Automation Studio, and Automation Gateway.

**Configuration Manager**

A major challenge in medium to large sized modern networks is managing consistent configurations across devices without making the process entirely too complicated.  You want to maintain consistency to reduce the risk of ‘one-off’ issues, but you may also have compliance and regulatory requirements that you have to follow.  Configurations not only need to remain consistent, but it may also need to be proven that they stay consistent throughout the phases of a device’s life cycle.  The configuration phases can be described as such:

- Day 0 - On-boarding. This phase entails getting enough configuration to the device so that it can be reachable and managed on the network
- Day 1 - Initial configuration.  This phase includes deploying a common baseline configuration to get the device itself actually operational in the network infrastructure.  This type of configuration can include but is not limited to:
  - NTP servers
  - Syslog
  - SNMP
- Day 2 to Day N - Production ready.  This is the ‘up and running’ phase and includes applying the proper configuration to the network devices so that they are operational for production traffic.

![](/blog-images/enterprise-network-automation-with-itential/jVyey_EQM4U5o1pA3AZ1K5Qfdvjc5Tx7hoG2KG0j16ZheLPU1dfVeFC27cltw8-hMpEzIgd-E80qpnXb.jpg)

Itential believes that a configuration management solution should include:

- Having a full view of the device inventory and the ability to categorize that inventory into groups.
- A method to easily define, update and view golden configurations.
- The ability to remediate, with automation whenever possible, when config drift happens.
  - Having documentation of the configuration drift and remediation.
- Support for non-CLI accessible devices/cloud (API integration).

Itential’s Configuration Manager provides customers with the ability to set configuration standards and detects non-compliant assets that need remediation.  The Golden Configuration Editor is utilized to create standardized configurations.  Those golden configurations are then applied against a customizable tree structure of inventoried devices.  On the proactive side within Configuration Manager, compliance checks can be run against proposed changes to see if they will cause a device to be out of compliance.  Configuration Manager can manage infrastructure via CLI and API integration.  While managing configurations, the platform also supports pulling real-time backups of network devices as changes are made in the environment.

![](/blog-images/enterprise-network-automation-with-itential/xjgNb91761kYti_6sXZiKsFl1nri74J5jyc-7gzZYaLwmUyYpbPdbtgFKSCSpvWSvIbWRmAGM8hSFeTn.jpg)

To better simplify cloud network deployments, the Itential Configuration Manager platform can treat cloud infrastructure as if it were traditional network infrastructure and translate complex configurations into more simple, JSON objects.  Finally, Itential understands there is oftentimes no single source of truth in an organization.  Many systems have their own source of truth and we often need information out of multiple sources of truth to make a single change.  That is why Itential, through APIs,  can aggregate necessary information from separate, disjointed sources of truth so all of that information is available when it comes time to make configuration changes.

**Automation Studio**

Although it can be easily overlooked, even the smallest configuration changes that need to be made to the network can quickly and easily become complicated.  Many times, the change itself is quick and simple, but the additional pre and post work can be cumbersome and lengthy.

![](/blog-images/enterprise-network-automation-with-itential/8F3_VTYWkXu5NDW7G93W06AeHAQNoZn5pXeOROmZ16THssMy0ZnfdT_TIWD34y7lTVY5jcVicI9sURXc.jpg)

Itential’s goal is to greatly lessen this burden on practitioners with their Automation Studio platform.  This platform provides low code, drag and drop automation workflows that can include third party solutions.  Automation Studio provides end-to-end change automation.  This means that it is able to automate pre and post change tasks as well, such as:

- The change request process.
- Performing prerequisite validation.
- Pulling pre-change backups.
- Temporarily suspending monitoring.
- Post change validation.
- Reactivation of monitoring.
- The updating of documentation.
- The closing of change requests.

Automation Studio allows practitioners to create centralized workflows of all change related tasks so they can focus on the change itself rather than making sure they remember all of the additional before and after steps that have to take place as well.

**Automation Gateway**

Before adopting an automation suite like Itential’s platform, many individuals and organizations may have already built their scripts and workflows to efficiently complete tasks using tools like Python, Ansible, Terraform, NetMiko, and Nornir.  Itential’s Automation Gateway gives you the ability to onboard your different scripts and modules, or connect to existing tools via API, so that they can be orchestrated centrally by the entire team from the Itential platform.  This provides customers the ability to continue to use the results of the tools and work they have already invested in, while adding in the value of bringing those different tools together with Itential.

![](/blog-images/enterprise-network-automation-with-itential/QtZXC0m7vx4HJwKqQeTIUQnd3JY5FPy5MIGtzpiV7duermyojVAoG8Qwn425H-b_GXhC0lb7prMZeLNV.jpg)

**Bringing it all Together**

To support digital transformation, IT Infrastructure teams need to be able to keep up with the business in order to provide value. To ‘keep up’ means to have the ability to grow and modify the network quickly and efficiently.  With the size, complexity, and sophistication of modern networks, it just isn’t possible to do so manually.  Infrastructure teams need a network management solution that can provide end-to-end change and compliance automation.  Itential can provide this value to network infrastructure teams with their automation platforms. To learn more, visit [itential.com](https://www.itential.com/) or check out their YouTube [channel](https://www.youtube.com/c/Itential).  Itential also recently presented at Networking Field Day 27, and the full list of videos can be found [here](https://www.itential.com/networking-field-day/).
