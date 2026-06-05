---
title: "NFD30 - Gaining Intelligent Observability w/ Selector AI"
slug: "nfd30-gaining-intelligent-observability-w-selector-ai"
publishedAt: "2023-01-23"
excerpt: "Troubleshooting networks can be a very difficult, manual process. Businesses run disaggregated systems and operators often need to jump from one to another when trying to find and fix problems. A large amount of..."
author: "Andy Lapteff"
coverImage: "/blog-images/nfd30-gaining-intelligent-observability-w-selector-ai.jpg"
---

Troubleshooting networks can be a very difficult, manual process. Businesses run disaggregated systems and operators often need to jump from one to another when trying to find and fix problems. A large amount of valuable time can be spent investigating different systems and infrastructure while trying to gather data, to then go through a manual correlation process to find what specifically needs to be fixed or adjusted to resolve an issue. What if there was a solution that aggregated all of this "go-to" information, correlated it for us, and then sent us a message pointing us in the right troubleshooting direction? That is the solution that [Selector AI](https://www.selector.ai/) is proposing. From their first ever Networking Field Day event ([NFD30](https://techfieldday.com/event/nfd30/)), below is the problem that Selector AI believes enterprises are facing and what we covered in their presentation.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/the_problem.png?w=800)

**Introduction to the platform.**  
Specifically, the Selector AI platform is pulling in and aggregating different types of network infrastructure state information. This could be information such as logs, metrics, and events from network devices. Telemetry from the infrastructure can be streamed directly to the Selector platform, or Selector can pull from an existing aggregated source, such as [Kafka](https://kafka.apache.org/). The Selector platform can run on-premises or in the cloud. The images below show Selector's target customers and environments, then some of the available source data types, protocols, and integrations they support today.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/outcomes.png?w=800)
![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/integrations.png?w=800)

**So, Selector has the data, now what?**  
It was mentioned earlier that a challenge that network operators have is manually correlating events from different systems to find just what might be the problem. A core competency of the Selector platform is doing just that. Selector AI treats the process of collecting, correlating, and delivery actionable information as a data pipleline.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/data_pipeline.png?w=800)

Once raw data is collected, the platform tags different data types to pull in meaningful information, which makes the platform able to compare and correlate that information to different types of data, for instance, logs and metrics. To put it one way, this is how they compare apples to oranges when it comes to data.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/log_mining.png?w=800)
![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/event_correlation.png?w=800)

Do Selector AI customers need to go in and set up thresholds for all of these different data types so the platform knows what specifically is good and bad to alert accordingly? Absolutely not, the Selector platform leverages a baselining method to analyze data and automatically determine what *is*, and is *not* a problem. The baselining method turns numbers into events and displays what events are good and bad, or more specifically, normal and abnormal.

![](https://artofnetworkengineering.com/wp-content/uploads/2023/01/conversion.png?w=800)

**Event Correlation Result**  
Alright, so the Selector platform is ingesting data, performing baselines, doing the data conversion, and event correlation; now what? In the demo, they showed us how they integrate with platforms such as [Slack](https://slack.com/) to be able to deliver meaningful, actionable information to individuals and teams so they are made aware of an issue and immediately pointed in the right direction to go solve it. Users of the Selector platform can even interact with the Slack messages to query the platform to get more information about the specific alert. As part of the event correlation process, multiple events are combined into a single, correlated alert. This way, teams are not inundated with a large number of alerts and can more easily focus on solving the problem in front of them.

---

In my opinion, Selector AI really seems to have a special product here that can provide a lot of value to large companies. The target audiences that were listed in one of the above images make sense as far as who would benefit from this platform. Having aggregated and correlated intelligence that is automatically delivered to not only alert you about an issue, but to also essentially point you in the right direction for next steps is extremely valuable. As mentioned earler, this was Selector's first Networking Field Day presentation, but you would *not* have been able to tell. The team is clearly passionate and excited about their product and where they are going in the future. Click [here](https://techfieldday.com/appearance/selector-ai-presents-at-networking-field-day-30/) to watch Selector's NFD30 presentation so you can see exactly what the delegates saw from them.
