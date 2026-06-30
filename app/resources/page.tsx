import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'A curated list of free resources for network engineers: certifications, courses, lab software, standards, communities, podcasts, automation tools, diagramming, internet measurement, books, and career data.',
};

type Link = { name: string; href: string; note: string };

const certifications: Link[] = [
  { name: 'Cisco Learning Network (CCNA → CCIE)', href: 'https://learningnetwork.cisco.com/', note: 'Official Cisco study community, exam guides, and certification roadmaps.' },
  { name: 'Juniper Open Learning', href: 'https://learningportal.juniper.net/juniper/user_activity_info.aspx?ctx=catalog&from=catalog', note: 'Free associate-level training and certifications (JNCIA tracks).' },
  { name: 'Arista Academy (ACE)', href: 'https://www.training.arista.com/', note: 'Arista\'s certification program (ACE) covering EOS, data center, campus, WAN, and automation. Self-paced training is paid (per-track or All-Access Pass). The free piece is Arista Academy Channels — listed under Free courses.' },
  { name: 'Nokia Service Routing Certification', href: 'https://www.nokia.com/networks/training/src/', note: 'Tracks for IP/MPLS service provider and data center networking.' },
  { name: 'CompTIA Network+', href: 'https://www.comptia.org/certifications/network', note: 'Vendor-neutral entry-level certification, widely accepted as a foundation.' },
  { name: 'AWS Certified Advanced Networking', href: 'https://aws.amazon.com/certification/certified-advanced-networking-specialty/', note: 'Advanced cert for designing AWS networks and hybrid architectures.' },
  { name: 'AWS Certified Solutions Architect — Associate', href: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', note: 'Not networking-specific, but the cloud architecture cert that overlaps most with hybrid networking work and shows up on the most job listings.' },
  { name: 'Azure Network Engineer Associate', href: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-network-engineer-associate/', note: 'Microsoft\'s networking-focused Azure credential.' },
  { name: 'Google Cloud Network Engineer', href: 'https://cloud.google.com/learn/certification/cloud-network-engineer', note: 'GCP networking certification focused on VPCs, hybrid connectivity, and security.' },
  { name: 'Wireshark Certified Network Analyst (WCNA)', href: 'https://www.wiresharktraining.com/certification.html', note: 'The recognized credential for packet analysis. If you live in pcaps, this one carries weight.' },
];

const courses: Link[] = [
  { name: 'Kirk Byers — Python for Network Engineers', href: 'https://pynet.twb-tech.com/', note: 'Free 8-week email course. The single most recommended Python on-ramp for network engineers.' },
  { name: 'Cisco DevNet Sandbox', href: 'https://developer.cisco.com/site/sandbox/', note: 'Free always-on labs for IOS XE, Nexus, Meraki, Webex, and more.' },
  { name: 'Juniper vLabs', href: 'https://jlabs.juniper.net/vlabs/', note: 'Free reservation-based virtual labs for hands-on Junos practice.' },
  { name: 'David Bombal (YouTube)', href: 'https://www.youtube.com/@davidbombal', note: 'Deep technical videos on networking, certifications, and network automation.' },
  { name: 'Free CCNA — Jeremy\'s IT Lab', href: 'https://www.youtube.com/@JeremysITLab', note: 'A full free CCNA course on YouTube with practice questions.' },
  { name: 'Nokia Network Developer Portal', href: 'https://network.developer.nokia.com/', note: 'The free Nokia learning hub: SR OS material, hands-on SR Linux tutorials (the modern Nokia DC NOS), pySROS automation docs, and intro lab content. The closest equivalent to Cisco DevNet for Nokia gear.' },
  { name: 'Arista Academy Channels', href: 'https://academy.training.arista.com/pages/95/arista-academy-channels', note: 'Arista\'s free video deep-dives behind a no-cost registration. Most Arista Academy content is paid; this is the public corner you can actually use without a subscription.' },
  { name: 'Stanford CS244 — Advanced Topics in Networking', href: 'https://web.stanford.edu/class/cs244/', note: 'Graduate-level networking course with public materials. Datacenter networks, congestion control, SDN. For when you want to go beyond practitioner depth.' },
  { name: 'MIT 6.829 — Computer Networks (OCW)', href: 'https://ocw.mit.edu/courses/6-829-computer-networks-fall-2002/', note: 'Older but foundational graduate networking course. The protocol design and queuing-theory chapters still pay dividends.' },
];

const serviceProvider: Link[] = [
  { name: 'APNIC Academy', href: 'https://academy.apnic.net/', note: 'The Asia-Pacific registry\'s free academy: self-paced routing, BGP, multihoming, and RPKI courses with hands-on labs. Operator-grade material behind a free account.' },
  { name: 'RIPE NCC Academy', href: 'https://academy.ripe.net/', note: 'Free, vendor-neutral e-learning from the European registry. IPv6, routing security, and BGP taught the way operators run them in production.' },
  { name: 'NANOG Tutorials & Archive', href: 'https://www.nanog.org/resources/tutorials/', note: 'Decades of operator tutorials and meeting decks on BGP-at-scale, MPLS, segment routing, and peering, straight from the people running the networks. Deep archive at archive.nanog.org.' },
  { name: 'segment-routing.net', href: 'https://www.segment-routing.net/', note: 'The Cisco-maintained community hub for SR-MPLS and SRv6: tutorials, demos, IETF drafts, and reference papers in one place, no paywall.' },
];

const labs: Link[] = [
  { name: 'Containerlab', href: 'https://containerlab.dev/', note: 'Container-based network labs defined in YAML. Spin up multi-vendor topologies in seconds. Where the modern lab community has been moving.' },
  { name: 'GNS3', href: 'https://www.gns3.com/', note: 'The long-standing favorite for emulating Cisco / Juniper / Arista images. Heavier than Containerlab but battle-tested.' },
  { name: 'EVE-NG', href: 'https://www.eve-ng.net/', note: 'Browser-accessible network emulator. Popular in study groups, supports a wide range of vendor images.' },
  { name: 'Cisco Modeling Labs (CML) Free', href: 'https://www.cisco.com/c/en/us/products/cloud-systems-management/modeling-labs/index.html', note: 'Cisco\'s official simulator. The free tier is enough to practice most CCNA / CCNP scenarios on real IOS XE / NX-OS images.' },
  { name: 'Cisco Packet Tracer', href: 'https://www.netacad.com/cisco-packet-tracer', note: 'Lightweight Cisco simulator from Networking Academy. Great for first labs and quick what-ifs; not a substitute for CML when topology fidelity matters.' },
];

const rfcs: Link[] = [
  { name: 'RFC 791 — Internet Protocol (IPv4)', href: 'https://datatracker.ietf.org/doc/html/rfc791', note: 'The original IP specification, 1981.' },
  { name: 'RFC 8200 — Internet Protocol, Version 6 (IPv6)', href: 'https://datatracker.ietf.org/doc/html/rfc8200', note: 'Current IPv6 specification.' },
  { name: 'RFC 9293 — Transmission Control Protocol (TCP)', href: 'https://datatracker.ietf.org/doc/html/rfc9293', note: 'Modern consolidated TCP specification, supersedes RFC 793.' },
  { name: 'RFC 768 — User Datagram Protocol (UDP)', href: 'https://datatracker.ietf.org/doc/html/rfc768', note: 'UDP, three pages, still in force after 45 years.' },
  { name: 'RFC 4271 — Border Gateway Protocol 4 (BGP-4)', href: 'https://datatracker.ietf.org/doc/html/rfc4271', note: 'The protocol that holds the internet together.' },
  { name: 'RFC 2328 — OSPF Version 2', href: 'https://datatracker.ietf.org/doc/html/rfc2328', note: 'OSPFv2, the most common interior gateway protocol in enterprise networks.' },
  { name: 'RFC 1918 — Address Allocation for Private Internets', href: 'https://datatracker.ietf.org/doc/html/rfc1918', note: 'Where 10/8, 172.16/12, and 192.168/16 come from.' },
  { name: 'RFC 5424 — The Syslog Protocol', href: 'https://datatracker.ietf.org/doc/html/rfc5424', note: 'Standard for transmitting log messages across networks.' },
  { name: 'RFC 1034 / 1035 — Domain Names', href: 'https://datatracker.ietf.org/doc/html/rfc1035', note: 'Foundational DNS specification.' },
  { name: 'RFC 8446 — Transport Layer Security (TLS) 1.3', href: 'https://datatracker.ietf.org/doc/html/rfc8446', note: 'The current TLS specification. If you touch HTTPS, certificates, or load balancers, you should know what changed from 1.2.' },
  { name: 'RFC 9113 — HTTP/2', href: 'https://datatracker.ietf.org/doc/html/rfc9113', note: 'Consolidated HTTP/2 specification.' },
  { name: 'RFC 9114 — HTTP/3', href: 'https://datatracker.ietf.org/doc/html/rfc9114', note: 'HTTP over QUIC. The shape of the modern web from the network engineer\'s side.' },
  { name: 'RFC 1925 — The Twelve Networking Truths', href: 'https://datatracker.ietf.org/doc/html/rfc1925', note: 'Two pages, deeply funny, eerily true. Required reading at least once a year.' },
];

const blogs: Link[] = [
  { name: 'Cloudflare Blog', href: 'https://blog.cloudflare.com/', note: 'Deep technical write-ups on how Cloudflare runs its network. The best ongoing public source on operating at internet scale.' },
  { name: 'APNIC Blog', href: 'https://blog.apnic.net/', note: 'The Asia-Pacific NIC\'s blog. Geoff Huston\'s ISP Column lives here and is the single most cited deep-dive series on routing and the state of the internet.' },
  { name: 'Juniper Engineering', href: 'https://blogs.juniper.net/', note: 'Juniper\'s engineering and product blog. Strong on data center, service provider, and Junos automation.' },
  { name: 'Arista EOS Central', href: 'https://eos.arista.com/', note: 'Arista\'s technical community and blog hub for EOS, EVPN, leaf-spine designs, and CloudVision.' },
  { name: 'Datadog Network Performance Monitoring blog', href: 'https://www.datadoghq.com/blog/network-performance-monitoring/', note: 'Datadog\'s ongoing write-ups on NPM, cloud network observability, and debugging across hybrid environments.' },
  { name: 'Kentik Blog', href: 'https://www.kentik.com/blog/', note: 'Network observability and analysis perspectives from a company that lives in flow data and BGP.' },
];

const measurement: Link[] = [
  { name: 'Cloudflare Radar', href: 'https://radar.cloudflare.com/', note: 'Live dashboard of internet traffic, outages, attacks, BGP changes, and protocol adoption, sourced from Cloudflare\'s network.' },
  { name: 'RIPEstat', href: 'https://stat.ripe.net/', note: 'RIPE\'s public data portal: per-prefix routing history, RPKI status, ASN information, and reverse DNS lookups in one place.' },
  { name: 'Hurricane Electric BGP toolkit', href: 'https://bgp.he.net/', note: 'The default browser bookmark for quick "who announces this prefix" and "what does this AS peer with" lookups.' },
  { name: 'BGPView', href: 'https://bgpview.io/', note: 'Cleaner alternative interface for BGP, ASN, prefix, and peering lookups, with a public API.' },
  { name: 'ThousandEyes Outages', href: 'https://www.thousandeyes.com/outages', note: 'Public outage dashboard. The fastest place to confirm "is it me or is the internet on fire" before opening a ticket.' },
  { name: 'CAIDA', href: 'https://www.caida.org/', note: 'Academic research and datasets on internet topology, routing, and measurement. Where the long-tail network research lives.' },
];

const communities: Link[] = [
  { name: 'AONE Discord', href: 'https://artofnetworkengineering.com/iaatj', note: '3,500+ network engineers, infrastructure pros, and career-switchers. Active daily.' },
  { name: 'USNUA — US Networking User Association', href: 'https://usnua.com/', note: 'Community-run networking association for practitioners across the US.' },
  { name: 'r/networking', href: 'https://www.reddit.com/r/networking/', note: 'The largest general networking subreddit. Career questions, troubleshooting, vendor discussion.' },
  { name: 'r/ccna', href: 'https://www.reddit.com/r/ccna/', note: 'Study group, exam tips, and lab questions for Cisco\'s flagship certification.' },
  { name: 'r/Cisco', href: 'https://www.reddit.com/r/Cisco/', note: 'Cisco-specific technical discussions, IOS questions, and product news.' },
  { name: 'Tech Field Day', href: 'https://techfieldday.com/', note: 'Independent IT influencer events. The Networking Field Day series features deep technical briefings from vendors.' },
  { name: 'NANOG — North American Network Operators Group', href: 'https://nanog.org/', note: 'The professional association for ISP and large-scale network operators.' },
  { name: 'APNIC', href: 'https://www.apnic.net/community/', note: 'Asia-Pacific Network Information Centre community: meetings, mailing lists, training, and policy work for the region\'s network operators.' },
  { name: 'RIPE NCC', href: 'https://www.ripe.net/community/', note: 'The European RIR\'s community: RIPE meetings, working groups, and member services for operators across Europe, the Middle East, and Central Asia.' },
  { name: 'AutoCon (Network Automation Forum)', href: 'https://networkautomation.forum/', note: 'The premier conference for network automation practitioners.' },
  { name: 'Cisco Insider Champions', href: 'https://learningnetwork.cisco.com/s/cisco-insider-champions', note: 'Cisco\'s recognition program for active community contributors. Free access to the program once you\'re in.' },
];

const listening: Link[] = [
  { name: 'Heavy Networking (Packet Pushers)', href: 'https://packetpushers.net/series/heavy-networking/', note: 'The flagship technical networking podcast. Long-form vendor and topic deep dives, weekly.' },
  { name: 'Day Two Cloud (Packet Pushers)', href: 'https://packetpushers.net/series/day-two-cloud/', note: 'The "what happens after the cloud architecture diagram is approved" show. Operations, ops culture, and hybrid-cloud reality.' },
  { name: 'Network Collective', href: 'https://networkcollective.com/', note: 'Conversational networking podcast hosted by Russ White and friends. Strong on design philosophy and the why behind protocols.' },
  { name: 'Packet Pushers Newsletter', href: 'https://packetpushers.net/newsletter/', note: 'Daily and weekly digests of networking news, vendor moves, and community links. Easy way to stay current without doomscrolling.' },
];

const aiResources: Link[] = [
  { name: 'Anthropic Academy', href: 'https://www.anthropic.com/learn', note: 'Free guides on Claude, prompt engineering, and building AI workflows.' },
  { name: 'Claude.ai', href: 'https://claude.ai/', note: 'Anthropic\'s consumer chat product. The fastest way to start using Claude for daily engineering work: config review, log analysis, doc summarization, scripting.' },
  { name: 'Model Context Protocol (MCP)', href: 'https://modelcontextprotocol.io/', note: 'Open standard that lets LLMs connect to real systems (networks, databases, APIs). The path from chat to action.' },
  { name: 'LangChain', href: 'https://www.langchain.com/', note: 'The most widely used framework for building LLM-powered applications. Useful when you want to wire an LLM into automation pipelines instead of just chatting with it.' },
  { name: 'n8n', href: 'https://n8n.io/', note: 'Open-source workflow automation with strong LLM and webhook support. A practical on-ramp to automated AI workflows without writing a full app.' },
  { name: 'Cisco AI Solutions', href: 'https://www.cisco.com/site/us/en/solutions/ai/index.html', note: 'Vendor view on AI in networking infrastructure and operations.' },
];

const specDriven: Link[] = [
  { name: 'GitHub Spec Kit', href: 'https://github.com/github/spec-kit', note: 'The reference open-source toolkit. Spec → Plan → Tasks → Implement, with each phase producing a Markdown artifact that feeds the next. Works with Copilot, Claude, Gemini, Codex, and others.' },
  { name: 'GitHub Blog — Spec-driven development with AI', href: 'https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/', note: 'The clearest starting-point essay: why writing a spec first beats "vibe coding" once the work is real.' },
  { name: 'DeepLearning.AI — Spec-Driven Development with Coding Agents', href: 'https://www.deeplearning.ai/courses/spec-driven-development-with-coding-agents', note: 'Free short course from Andrew Ng\'s platform, built with JetBrains. Practical, opinionated, and hands-on.' },
  { name: 'Microsoft Learn — Spec-Driven Development with GitHub Spec Kit', href: 'https://learn.microsoft.com/en-us/training/modules/spec-driven-development-github-spec-kit-enterprise-developers/', note: 'Free training module aimed at enterprise developers. Good if you learn best by following a structured walk-through.' },
  { name: 'Kiro (AWS)', href: 'https://kiro.dev/', note: 'AWS\'s agentic IDE built around spec-first workflows. Useful to see what the methodology looks like when it\'s baked into the editor instead of bolted on.' },
  { name: 'From Vibe Coding to Spec-Driven Development', href: 'https://towardsdatascience.com/from-vibe-coding-to-spec-driven-development/', note: 'A readable intro to the shift, with concrete before/after examples. Good first read if the term is new.' },
];

const automation: Link[] = [
  { name: 'NetBox', href: 'https://netbox.dev/', note: 'The de facto open-source source of truth for IP addressing (IPAM) and infrastructure (DCIM). If you\'re building automation, this is usually the data layer underneath it.' },
  { name: 'Nautobot', href: 'https://www.nautobot.com/', note: 'Network Source of Truth fork of NetBox with apps, jobs, and a stronger extensibility model. Worth comparing if you\'re standing up a new instance today.' },
  { name: 'Ansible network collections', href: 'https://docs.ansible.com/ansible/latest/network/index.html', note: 'The most widely deployed config-management tool for network gear. Mature, vendor-broad, and the default for "I need to push a change to 200 devices safely."' },
  { name: 'Nornir', href: 'https://nornir.readthedocs.io/', note: 'Pure-Python automation framework. Faster and more flexible than Ansible when you\'re comfortable in code; pairs well with NAPALM and Netmiko.' },
  { name: 'Batfish', href: 'https://www.batfish.org/', note: 'Static analysis for network configurations. Models what your network will do before you push the change. The closest thing the network world has to a type checker.' },
  { name: 'LibreNMS', href: 'https://www.librenms.org/', note: 'Free, community-driven network monitoring system. SNMP-based, broad vendor support, fast to stand up for a homelab or a small shop.' },
];

const gitGithub: Link[] = [
  { name: 'GitHub Skills', href: 'https://github.com/skills', note: 'Free interactive courses that run inside real repos with automated feedback. The fastest way to learn the GitHub workflow by doing instead of reading.' },
  { name: 'Introduction to GitHub', href: 'https://github.com/skills/introduction-to-github', note: 'The under-an-hour starter exercise: repos, branches, commits, and pull requests. The right first stop if you have only ever lived in config backups.' },
  { name: 'GitHub Docs: Get Started', href: 'https://docs.github.com/en/get-started', note: 'The official, always-current reference for everything from your first commit to SSH keys and pull requests.' },
  { name: 'GitHub Foundations (Microsoft Learn)', href: 'https://learn.microsoft.com/en-us/training/paths/github-foundations/', note: 'A free two-part learning path that maps to the GitHub Foundations certification. Structured enough to give an automation newcomer a real syllabus.' },
  { name: 'Pro Git (2nd ed.)', href: 'https://git-scm.com/book/en/v2', note: 'The canonical Git book, free online under Creative Commons. The reference you come back to when "git is hard" really means "I don\'t understand the object model yet."' },
];

const diagramming: Link[] = [
  { name: 'diagrams.net (draw.io)', href: 'https://www.diagrams.net/', note: 'Free, browser-based diagram editor with strong networking shape libraries. The default for ad-hoc topology diagrams.' },
  { name: 'Excalidraw', href: 'https://excalidraw.com/', note: 'Hand-drawn-style diagrams that make whiteboard sketches presentable. Great for design conversations and slides.' },
  { name: 'Cisco network topology icons', href: 'https://www.cisco.com/c/en/us/about/brand-center/network-topology-icons.html', note: 'The official Cisco icon set. Drop them into any diagramming tool and your slides start looking like a Cisco Live deck.' },
  { name: 'AWS Architecture Icons', href: 'https://aws.amazon.com/architecture/icons/', note: 'Official AWS icon and resource library. Required if you draw anything with VPCs, Transit Gateways, or Direct Connects in it.' },
  { name: 'Azure architecture icons', href: 'https://learn.microsoft.com/en-us/azure/architecture/icons/', note: 'Microsoft\'s official Azure architecture icon set, including the networking subset.' },
];

const vendorRoles: Link[] = [
  { name: 'Systems Engineer (SE) / Pre-Sales Engineer', href: 'https://www.youtube.com/watch?v=QGIi2c3URZU', note: "Owns the technical side of the sales motion: discovery, design, demos, proofs of concept, and RFP responses. The engineer in customer meetings alongside the account exec. Watch: Taylor Harris on jumping from post-sales to pre-sales architect." },
  { name: 'Solutions Architect', href: 'https://www.youtube.com/watch?v=l--6WkrRjho', note: "Senior technical lead on big designs and complex deployments, often spanning the full product portfolio. Less call volume than an SE, more architecture depth. Watch: David Alicea, from student help-desk worker to Solutions Architect." },
  { name: 'Consulting Engineer', href: 'https://www.youtube.com/watch?v=rxhipwQhkdI', note: "Project-based delivery role inside a vendor or partner: migrations, redesigns, high-stakes implementations. The hands-on counterpart to the architect. Watch: a walk-through of the role, salary range, skills, and career path." },
  { name: 'Technical Marketing Engineer (TME)', href: 'https://www.youtube.com/watch?v=lHoNwuCGtpk', note: "Builds the deep technical artifacts everyone else uses: reference architectures, validated designs, conference talks, hands-on demos. Half engineer, half storyteller. Watch: a panel of working TMEs on what the job actually looks like." },
  { name: 'Product Marketing Manager (PMM)', href: 'https://www.youtube.com/watch?v=iFeuGTa5zu8', note: "Owns the messaging: who the product is for, what pain it solves, how to talk about it. Writes launch narratives, sales decks, web copy, and analyst briefings. The bridge between what engineering builds and what customers actually understand. Watch: Patrick McCabe on the move from network engineering to product marketing." },
  { name: 'Technical Advocate / Developer Relations', href: 'https://www.youtube.com/watch?v=XRPYRdRjGjk', note: "Bridge between the vendor and the practitioner community. Writes, speaks, runs labs, sits in forums and Discord answering questions. Measured by community trust, not pipeline. Watch: Cisco Sr. Technical Advocates Quinn Snyder and Jason Belk." },
  { name: 'TAC Engineer (Technical Assistance Center)', href: 'https://www.youtube.com/watch?v=CpUgXHuIBkw', note: "The deep technical support engineer on the other end of an enterprise support case. Heavy troubleshooting muscle, internal escalation paths, and high exposure to edge cases. A great place to grow vendor-deep expertise. Watch: a look inside Cisco TAC." },
  { name: 'Industry Analyst / Researcher', href: 'https://www.youtube.com/watch?v=a-OXn9dqWjw', note: "Studies the internet itself: outages, routing anomalies, vendor performance, and publishes. Niche but real path for engineers who like data analysis and writing more than configuration. Watch: Doug Madory's journey from military network engineer to internet analyst." },
];

const careerData: Link[] = [
  { name: 'BLS Occupational Outlook — Computer Network Architects', href: 'https://www.bls.gov/ooh/computer-and-information-technology/computer-network-architects.htm', note: 'Federal employment data, salary medians, and job outlook for network architects.' },
  { name: 'BLS — Network & Computer Systems Administrators', href: 'https://www.bls.gov/ooh/computer-and-information-technology/network-and-computer-systems-administrators.htm', note: 'BLS data for the adjacent admin/operations track.' },
  { name: 'Levels.fyi', href: 'https://www.levels.fyi/', note: 'Crowdsourced compensation data, useful for benchmarking offers at large tech employers.' },
  { name: 'Robert Half — Technology Salary Guide', href: 'https://www.roberthalf.com/us/en/insights/salary-guide/technology', note: 'Annual salary benchmarks across IT and networking roles, by region and experience level.' },
  { name: 'Glassdoor — Network Engineer salaries', href: 'https://www.glassdoor.com/Salaries/network-engineer-salary-SRCH_KO0,16.htm', note: 'Crowdsourced salary data filtered to network engineer roles. Useful as a second data point when negotiating.' },
  { name: 'ZipRecruiter — Network Engineer jobs', href: 'https://www.ziprecruiter.com/Jobs/Network-Engineer', note: 'High-volume job feed for network engineer postings. Good for seeing what employers are actually asking for right now.' },
];

const books: Link[] = [
  { name: 'Network Warrior, 2nd ed — Gary A. Donahue', href: 'https://www.amazon.com/Network-Warrior-Everything-Really-Need/dp/1449387861', note: 'The book most senior network engineers wish they\'d read on day one.' },
  { name: 'Routing TCP/IP, Volume I — Jeff Doyle & Jennifer Carroll', href: 'https://www.ciscopress.com/store/routing-tcp-ip-volume-i-9781587052026', note: 'The canonical reference for IP routing protocols. Volume II covers BGP and multicast in depth.' },
  { name: 'TCP/IP Illustrated, Volume 1 — Kevin R. Fall & W. Richard Stevens', href: 'https://www.informit.com/store/tcp-ip-illustrated-volume-1-the-protocols-9780321336316', note: 'Bottom-up protocol-by-protocol walkthrough. Dense, definitive.' },
  { name: 'Computer Networking: A Top-Down Approach — Kurose & Ross', href: 'https://www.amazon.com/Computer-Networking-Top-Down-Approach-8th/dp/0136681557', note: 'The canonical undergraduate networking textbook. Starts at the application layer and works down, which matches how most engineers actually encounter the stack.' },
  { name: 'Network Programmability and Automation — Edelman, Lowe & Oswalt', href: 'https://www.oreilly.com/library/view/network-programmability-and/9781098110826/', note: 'The practical book on bringing software engineering tools and habits to network operations. Python, APIs, source of truth, CI/CD for networks.' },
  { name: 'BGP Design and Implementation — Zhang & Bartell', href: 'https://www.amazon.com/BGP-Design-Implementation-Randy-Zhang/dp/1587051095', note: 'A working engineer\'s book on real BGP designs. Older, but the design patterns still apply when you sit in front of a route reflector.' },
  { name: 'The Pragmatic Programmer — Hunt & Thomas', href: 'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052', note: 'The book on engineering hygiene. Not networking-specific, but every habit in it translates directly to network automation and operations work.' },
  { name: 'The Phoenix Project — Gene Kim et al.', href: 'https://itrevolution.com/product/the-phoenix-project/', note: 'A novel about an IT department under fire. Required reading for anyone working at the application/infra boundary.' },
];

const biases: Link[] = [
  { name: 'List of cognitive biases (Wikipedia)', href: 'https://en.wikipedia.org/wiki/List_of_cognitive_biases', note: 'The canonical reference. Browse the list once, and you\'ll start spotting them in design reviews and postmortems.' },
  { name: 'The Decision Lab — biases reference', href: 'https://thedecisionlab.com/biases', note: 'Plain-English entries for each bias with concrete examples. Better starting point than Wikipedia if the academic tone is rough.' },
  { name: 'Thinking, Fast and Slow — Daniel Kahneman', href: 'https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555', note: 'The foundational book on System 1 / System 2 thinking. Heavy but worth it. Most other books in this category reference it.' },
  { name: 'The Art of Thinking Clearly — Rolf Dobelli', href: 'https://www.amazon.com/Art-Thinking-Clearly-Rolf-Dobelli/dp/0062219693', note: '99 short chapters, one bias per chapter. The least intimidating on-ramp.' },
  { name: 'Predictably Irrational — Dan Ariely', href: 'https://www.amazon.com/Predictably-Irrational-Revised-Expanded-Decisions/dp/0061353248', note: 'Behavioral economics through the lens of everyday decisions. Highly readable.' },
  { name: 'Influence: The Psychology of Persuasion — Robert Cialdini', href: 'https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/006124189X', note: 'Six principles of persuasion. Reads as much like a defensive playbook (against vendor pitches and bad architecture decisions) as a sales manual.' },
  { name: 'Decisive — Chip & Dan Heath', href: 'https://www.amazon.com/Decisive-Make-Better-Choices-Life/dp/0307956393', note: 'A practical four-step framework for making better decisions under uncertainty. Useful for technical and career calls alike.' },
  { name: 'Atomic Habits — James Clear', href: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299', note: 'The most practical modern book on habit formation. Pairs naturally with the biases material: knowing the trap is half the work; building the habit that routes around it is the other half.' },
  { name: 'Antifragile — Nassim Nicholas Taleb', href: 'https://www.amazon.com/Antifragile-Things-That-Disorder-Incerto/dp/0812979680', note: 'On systems that get stronger under stress. Useful framing for any engineer who builds, operates, or designs anything that has to survive surprises.' },
];

function LinkSection({
  id,
  label,
  heading,
  intro,
  links,
}: {
  id: string;
  label: string;
  heading: string;
  intro: string;
  links: Link[];
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-3 font-display text-2xl md:text-3xl">{heading}</h2>
      <p className="mt-3 max-w-3xl text-text-muted">{intro}</p>
      <ul className="mt-6 space-y-4">
        {links.map((l) => (
          <li key={l.href} className="border border-border bg-surface p-5 rounded-sm">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text font-semibold hover:text-accent-green"
            >
              {l.name}
            </a>
            <p className="mt-1 text-sm text-text-muted">{l.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const navSections: { id: string; label: string }[] = [
  { id: 'certifications', label: 'Certifications' },
  { id: 'free-courses', label: 'Free courses' },
  { id: 'service-provider', label: 'Service provider' },
  { id: 'lab-software', label: 'Lab software' },
  { id: 'standards', label: 'Standards' },
  { id: 'engineering-blogs', label: 'Blogs' },
  { id: 'measurement', label: 'Measurement' },
  { id: 'communities', label: 'Communities' },
  { id: 'listening', label: 'Listening' },
  { id: 'ai-for-nes', label: 'AI for NEs' },
  { id: 'spec-driven', label: 'Spec-driven dev' },
  { id: 'git-github', label: 'Git & GitHub' },
  { id: 'automation', label: 'Automation' },
  { id: 'diagramming', label: 'Diagramming' },
  { id: 'vendor-roles', label: 'Vendor roles' },
  { id: 'career-data', label: 'Career data' },
  { id: 'books', label: 'Books' },
  { id: 'biases', label: 'Biases' },
];

function JumpNav() {
  return (
    <nav
      aria-label="Jump to section"
      className="sticky top-0 z-20 -mx-6 mt-10 mb-8 px-6 py-3 bg-bg/90 backdrop-blur-sm border-b border-border"
    >
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono uppercase tracking-label">
        {navSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-accent-green hover:text-text transition-colors"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Resources</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
        Free resources for network engineers.
      </h1>
      <p className="mt-6 max-w-3xl text-text-muted text-lg">
        A curated list of the certifications, courses, labs, standards, blogs, communities,
        podcasts, automation tools, diagramming references, and books we point listeners to
        most often. Every link here is free or freely accessible. Vendor neutral by default.
        Last reviewed June 2026.
      </p>

      <JumpNav />

      <LinkSection
        id="certifications"
        label="Certifications"
        heading="Learning paths and certifications"
        intro="The certifications that move resumes and pay bands. Mix vendor and vendor-neutral. Pick one track, finish it, then expand."
        links={certifications}
      />

      <LinkSection
        id="free-courses"
        label="Free courses"
        heading="Free courses and labs"
        intro="Practical, hands-on, free. Start with Kirk Byers if you've never written a line of Python."
        links={courses}
      />

      <LinkSection
        id="service-provider"
        label="Service provider"
        heading="Service provider and operator training"
        intro="Free training for the carrier, ISP, and large-scale operator world: routing at scale, MPLS, segment routing, and the regional registry academies. This is where the internet's backbone is run."
        links={serviceProvider}
      />

      <LinkSection
        id="lab-software"
        label="Lab software"
        heading="Lab software and simulators"
        intro="The platforms working engineers and students use to build realistic topologies on a laptop. Start with whichever you have local images for; the differences become preferences over time."
        links={labs}
      />

      <LinkSection
        id="standards"
        label="Standards"
        heading="Foundational RFCs and standards"
        intro="The Request for Comments (RFC) series is how the internet is specified. Every major protocol you touch has an RFC behind it. These are the ones every network engineer should be able to point to."
        links={rfcs}
      />

      <LinkSection
        id="engineering-blogs"
        label="Blogs"
        heading="Engineering and vendor blogs"
        intro="Where new ideas actually drop before they hit a conference stage. Subscribe to a couple of these and you'll be ahead of most of the room on what's changing in the field."
        links={blogs}
      />

      <LinkSection
        id="measurement"
        label="Measurement"
        heading="Internet measurement and visibility"
        intro="Public data and dashboards for figuring out what the internet is actually doing right now. Confirming an outage, investigating a routing anomaly, or just satisfying curiosity about traffic and protocol adoption."
        links={measurement}
      />

      <LinkSection
        id="communities"
        label="Communities"
        heading="Where network engineers hang out"
        intro="Network engineering is a small world. The people in these communities are how most working engineers stay current and how most opportunities surface."
        links={communities}
      />

      <LinkSection
        id="listening"
        label="Listening"
        heading="Other podcasts and newsletters"
        intro="The shows and newsletters we recommend alongside our own. Different styles, different angles, all worth your time."
        links={listening}
      />

      <LinkSection
        id="ai-for-nes"
        label="AI for NEs"
        heading="AI and LLMs for network engineers"
        intro="Knowing how to use LLMs effectively is now a baseline skill for network engineers. Not because AI replaces you, but because AI-augmented engineers are dramatically faster at automation, troubleshooting, documentation, and learning new technologies. Start with the basics, then bring them to your daily work."
        links={aiResources}
      />

      <LinkSection
        id="spec-driven"
        label="Spec-driven dev"
        heading="Spec-driven development with AI coding agents"
        intro="The disciplined alternative to 'vibe coding.' Write a clear spec of what you want the agent to build, refine it through structured phases, and let the agent implement against it. Especially useful for network automation work, where ambiguity in the prompt leads to subtly wrong code that passes review and breaks in production."
        links={specDriven}
      />

      <LinkSection
        id="git-github"
        label="Git & GitHub"
        heading="Git and GitHub"
        intro="Version control is the on-ramp to network automation. Before you push configs from code, get comfortable with Git and the GitHub workflow. Start with GitHub Skills and keep Pro Git nearby."
        links={gitGithub}
      />

      <LinkSection
        id="automation"
        label="Automation"
        heading="Network automation and operations tools"
        intro="The open-source stack working engineers reach for when they're moving past CLI-and-spreadsheet operations. Source of truth, config management, observability, validation."
        links={automation}
      />

      <LinkSection
        id="diagramming"
        label="Diagramming"
        heading="Diagramming and topology icons"
        intro="The editors and icon libraries that make network diagrams look like network diagrams. Useful whether you're sketching a design, writing a runbook, or building slides."
        links={diagramming}
      />

      <section id="vendor-roles" className="mt-16 scroll-mt-24">
        <SectionLabel>Vendor roles</SectionLabel>
        <h2 className="mt-3 font-display text-2xl md:text-3xl">
          Vendor Roles For Network Engineers
        </h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          Most engineers know the path from NOC → ops → architecture. Far fewer hear about the
          vendor roles that let you stay technical, influence products, and step off the on-call
          rotation. Below is a quick map of what those roles actually look like, each linked to
          the AONE episode where someone in the seat walks you through the job. The full
          collection lives in our{' '}
          <a
            href="https://youtube.com/playlist?list=PLH4sfHyLzNQ8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vendor Roles playlist on YouTube
          </a>
          .
        </p>
        <ul className="mt-6 space-y-4">
          {vendorRoles.map((l) => (
            <li key={l.href} className="border border-border bg-surface p-5 rounded-sm">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text font-semibold hover:text-accent-green"
              >
                {l.name}
              </a>
              <p className="mt-1 text-sm text-text-muted">{l.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <LinkSection
        id="career-data"
        label="Career data"
        heading="Industry and career data"
        intro="Salary and employment data from authoritative sources. Useful for negotiating, planning a career move, or just understanding where the field is going."
        links={careerData}
      />

      <LinkSection
        id="books"
        label="Books"
        heading="Books that hold up"
        intro="The network engineering books that are still worth your time after years of cloud, automation, and AI reshaping the field, plus a couple of adjacent ones that translate directly to the job."
        links={books}
      />

      <LinkSection
        id="biases"
        label="Cognitive biases"
        heading="Cognitive biases and decision-making"
        intro="Most engineering mistakes are not technical, they are cognitive. The traps that derail design reviews, troubleshooting calls, and career decisions are the same traps psychologists have been documenting for decades. Reading on this stuff is one of the highest-leverage habits a working engineer can build."
        links={biases}
      />

      <section className="mt-16 border-t border-border pt-12 space-y-4">
        <SectionLabel>Help improve this site</SectionLabel>
        <p className="text-text-muted">
          This website is open source. If you spot a broken link, a typo, or a
          resource we should add, the fastest way to fix it is on GitHub:{' '}
          <a
            href="https://github.com/The-Art-of-Network-Engineering/website"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/The-Art-of-Network-Engineering/website
          </a>
          .
        </p>
        <ul className="text-text-muted text-sm space-y-2 list-disc pl-5 marker:text-accent-green">
          <li>
            <a
              href="https://github.com/The-Art-of-Network-Engineering/website/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open an issue
            </a>{' '}
            to report a bug or suggest a change. No coding required, just describe
            what you saw and what you expected.
          </li>
          <li>
            <a
              href="https://github.com/The-Art-of-Network-Engineering/website/pulls"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send a pull request
            </a>{' '}
            if you want to propose the change directly in code.
          </li>
        </ul>
        <p className="text-text-muted text-sm">
          Prefer email? Reach Andy at{' '}
          <a href="mailto:andy@artofnetworkengineering.com">andy@artofnetworkengineering.com</a>.
        </p>
      </section>
    </div>
  );
}
