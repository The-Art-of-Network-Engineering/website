import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'A curated list of free resources for network engineers: certifications, courses, foundational standards, communities, AI learning, career data, and the best books in the field.',
};

type Link = { name: string; href: string; note: string };

const certifications: Link[] = [
  { name: 'Cisco Learning Network (CCNA → CCIE)', href: 'https://learningnetwork.cisco.com/', note: 'Official Cisco study community, exam guides, and certification roadmaps.' },
  { name: 'Juniper Open Learning', href: 'https://learningportal.juniper.net/juniper/user_activity_info.aspx?ctx=catalog&from=catalog', note: 'Free associate-level training and certifications (JNCIA tracks).' },
  { name: 'Arista Academy', href: 'https://www.training.arista.com/', note: 'Arista\'s self-paced training and ACE certification program covering EOS, data center, campus, WAN, and automation tracks.' },
  { name: 'Nokia Service Routing Certification', href: 'https://www.nokia.com/networks/training/src/', note: 'Tracks for IP/MPLS service provider and data center networking.' },
  { name: 'CompTIA Network+', href: 'https://www.comptia.org/certifications/network', note: 'Vendor-neutral entry-level certification, widely accepted as a foundation.' },
  { name: 'AWS Certified Advanced Networking', href: 'https://aws.amazon.com/certification/certified-advanced-networking-specialty/', note: 'Advanced cert for designing AWS networks and hybrid architectures.' },
  { name: 'Azure Network Engineer Associate', href: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-network-engineer-associate/', note: 'Microsoft\'s networking-focused Azure credential.' },
  { name: 'Google Cloud Network Engineer', href: 'https://cloud.google.com/learn/certification/cloud-network-engineer', note: 'GCP networking certification focused on VPCs, hybrid connectivity, and security.' },
];

const courses: Link[] = [
  { name: 'Kirk Byers — Python for Network Engineers', href: 'https://pynet.twb-tech.com/', note: 'Free 8-week email course. The single most recommended Python on-ramp for network engineers.' },
  { name: 'Cisco DevNet Sandbox', href: 'https://developer.cisco.com/site/sandbox/', note: 'Free always-on labs for IOS XE, Nexus, Meraki, Webex, and more.' },
  { name: 'Juniper vLabs', href: 'https://jlabs.juniper.net/vlabs/', note: 'Free reservation-based virtual labs for hands-on Junos practice.' },
  { name: 'David Bombal (YouTube)', href: 'https://www.youtube.com/@davidbombal', note: 'Deep technical videos on networking, certifications, and network automation.' },
  { name: 'Free CCNA — Jeremy\'s IT Lab', href: 'https://www.youtube.com/@JeremysITLab', note: 'A full free CCNA course on YouTube with practice questions.' },
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
];

const communities: Link[] = [
  { name: 'AONE Discord', href: 'https://artofnetworkengineering.com/iaatj', note: '3,500+ network engineers, infrastructure pros, and career-switchers. Active daily.' },
  { name: 'USNUA — US Networking User Association', href: 'https://usnua.com/', note: 'Community-run networking association for practitioners across the US.' },
  { name: 'r/networking', href: 'https://www.reddit.com/r/networking/', note: 'The largest general networking subreddit. Career questions, troubleshooting, vendor discussion.' },
  { name: 'r/ccna', href: 'https://www.reddit.com/r/ccna/', note: 'Study group, exam tips, and lab questions for Cisco\'s flagship certification.' },
  { name: 'r/Cisco', href: 'https://www.reddit.com/r/Cisco/', note: 'Cisco-specific technical discussions, IOS questions, and product news.' },
  { name: 'Tech Field Day', href: 'https://techfieldday.com/', note: 'Independent IT influencer events. The Networking Field Day series features deep technical briefings from vendors.' },
  { name: 'NANOG — North American Network Operators Group', href: 'https://nanog.org/', note: 'The professional association for ISP and large-scale network operators.' },
  { name: 'AutoCon (Network Automation Forum)', href: 'https://networkautomation.forum/', note: 'The premier conference for network automation practitioners.' },
];

const aiResources: Link[] = [
  { name: 'Anthropic Academy', href: 'https://www.anthropic.com/learn', note: 'Free guides on Claude, prompt engineering, and building AI workflows.' },
  { name: 'Model Context Protocol (MCP)', href: 'https://modelcontextprotocol.io/', note: 'Open standard that lets LLMs connect to real systems (networks, databases, APIs). The path from chat to action.' },
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

const careerData: Link[] = [
  { name: 'BLS Occupational Outlook — Computer Network Architects', href: 'https://www.bls.gov/ooh/computer-and-information-technology/computer-network-architects.htm', note: 'Federal employment data, salary medians, and job outlook for network architects.' },
  { name: 'BLS — Network & Computer Systems Administrators', href: 'https://www.bls.gov/ooh/computer-and-information-technology/network-and-computer-systems-administrators.htm', note: 'BLS data for the adjacent admin/operations track.' },
  { name: 'Levels.fyi', href: 'https://www.levels.fyi/', note: 'Crowdsourced compensation data, useful for benchmarking offers at large tech employers.' },
  { name: 'Robert Half — Technology Salary Guide', href: 'https://www.roberthalf.com/us/en/insights/salary-guide/technology', note: 'Annual salary benchmarks across IT and networking roles, by region and experience level.' },
];

const biases: Link[] = [
  { name: 'List of cognitive biases (Wikipedia)', href: 'https://en.wikipedia.org/wiki/List_of_cognitive_biases', note: 'The canonical reference. Browse the list once, and you\'ll start spotting them in design reviews and postmortems.' },
  { name: 'The Decision Lab — biases reference', href: 'https://thedecisionlab.com/biases', note: 'Plain-English entries for each bias with concrete examples. Better starting point than Wikipedia if the academic tone is rough.' },
  { name: 'Thinking, Fast and Slow — Daniel Kahneman', href: 'https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555', note: 'The foundational book on System 1 / System 2 thinking. Heavy but worth it. Most other books in this category reference it.' },
  { name: 'The Art of Thinking Clearly — Rolf Dobelli', href: 'https://www.amazon.com/Art-Thinking-Clearly-Rolf-Dobelli/dp/0062219693', note: '99 short chapters, one bias per chapter. The least intimidating on-ramp.' },
  { name: 'Predictably Irrational — Dan Ariely', href: 'https://www.amazon.com/Predictably-Irrational-Revised-Expanded-Decisions/dp/0061353248', note: 'Behavioral economics through the lens of everyday decisions. Highly readable.' },
  { name: 'Influence: The Psychology of Persuasion — Robert Cialdini', href: 'https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/006124189X', note: 'Six principles of persuasion. Reads as much like a defensive playbook (against vendor pitches and bad architecture decisions) as a sales manual.' },
  { name: 'Decisive — Chip & Dan Heath', href: 'https://www.amazon.com/Decisive-Make-Better-Choices-Life/dp/0307956393', note: 'A practical four-step framework for making better decisions under uncertainty. Useful for technical and career calls alike.' },
];

const books: Link[] = [
  { name: 'Network Warrior, 2nd ed — Gary A. Donahue', href: 'https://www.amazon.com/Network-Warrior-Everything-Really-Need/dp/1449387861', note: 'The book most senior network engineers wish they\'d read on day one.' },
  { name: 'Routing TCP/IP, Volume I — Jeff Doyle & Jennifer Carroll', href: 'https://www.ciscopress.com/store/routing-tcp-ip-volume-i-9781587052026', note: 'The canonical reference for IP routing protocols. Volume II covers BGP and multicast in depth.' },
  { name: 'TCP/IP Illustrated, Volume 1 — Kevin R. Fall & W. Richard Stevens', href: 'https://www.informit.com/store/tcp-ip-illustrated-volume-1-the-protocols-9780321336316', note: 'Bottom-up protocol-by-protocol walkthrough. Dense, definitive.' },
  { name: 'The Phoenix Project — Gene Kim et al.', href: 'https://itrevolution.com/product/the-phoenix-project/', note: 'A novel about an IT department under fire. Required reading for anyone working at the application/infra boundary.' },
];

function LinkSection({
  label,
  heading,
  intro,
  links,
}: {
  label: string;
  heading: string;
  intro: string;
  links: Link[];
}) {
  return (
    <section className="mt-16">
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

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Resources</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
        Free resources for network engineers.
      </h1>
      <p className="mt-6 max-w-3xl text-text-muted text-lg">
        A curated list of the certifications, courses, standards, communities, books, and career
        data we point listeners to most often. Every link here is free or freely accessible.
        Vendor neutral by default. Last reviewed June 2026.
      </p>

      <LinkSection
        label="Certifications"
        heading="Learning paths and certifications"
        intro="The certifications that move resumes and pay bands. Mix vendor and vendor-neutral. Pick one track, finish it, then expand."
        links={certifications}
      />

      <LinkSection
        label="Free courses"
        heading="Free courses and labs"
        intro="Practical, hands-on, free. Start with Kirk Byers if you've never written a line of Python."
        links={courses}
      />

      <LinkSection
        label="Standards"
        heading="Foundational RFCs and standards"
        intro="The Request for Comments (RFC) series is how the internet is specified. Every major protocol you touch has an RFC behind it. These are the ones every network engineer should be able to point to."
        links={rfcs}
      />

      <LinkSection
        label="Communities"
        heading="Where network engineers hang out"
        intro="Network engineering is a small world. The people in these communities are how most working engineers stay current and how most opportunities surface."
        links={communities}
      />

      <LinkSection
        label="AI for NEs"
        heading="AI and LLMs for network engineers"
        intro="Knowing how to use LLMs effectively is now a baseline skill for network engineers. Not because AI replaces you, but because AI-augmented engineers are dramatically faster at automation, troubleshooting, documentation, and learning new technologies. Start with the basics, then bring them to your daily work."
        links={aiResources}
      />

      <LinkSection
        label="Spec-driven dev"
        heading="Spec-driven development with AI coding agents"
        intro="The disciplined alternative to 'vibe coding.' Write a clear spec of what you want the agent to build, refine it through structured phases, and let the agent implement against it. Especially useful for network automation work, where ambiguity in the prompt leads to subtly wrong code that passes review and breaks in production."
        links={specDriven}
      />

      <LinkSection
        label="Career data"
        heading="Industry and career data"
        intro="Salary and employment data from authoritative sources. Useful for negotiating, planning a career move, or just understanding where the field is going."
        links={careerData}
      />

      <LinkSection
        label="Books"
        heading="Books that hold up"
        intro="The handful of network engineering books that are still worth your time after years of cloud, automation, and AI reshaping the field."
        links={books}
      />

      <LinkSection
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
            to report a bug or suggest a change. No coding required — just describe
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
