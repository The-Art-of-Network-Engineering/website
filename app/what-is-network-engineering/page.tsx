import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'What Is Network Engineering?',
  description:
    'Network engineering is the practice of designing, building, and operating the networks that move data between computers. A network engineer is the practitioner responsible for that infrastructure: the routers, switches, firewalls, wireless systems, and cloud services that keep the internet, enterprises, and applications connected.',
  alternates: { canonical: '/what-is-network-engineering' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is network engineering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Network engineering is the practice of designing, building, and operating the computer networks that move data between systems. It covers the physical and logical components of a network: routers, switches, firewalls, wireless access points, load balancers, cloud network services, and the protocols that connect them.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does a network engineer do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A network engineer designs network architectures, configures and maintains network devices, troubleshoots outages and performance problems, secures the network against threats, automates repetitive operations, and plans capacity for future growth. In modern environments they also work across cloud, on-premises, and hybrid infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is a network engineer different from a system administrator or DevOps engineer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A system administrator focuses on servers, operating systems, and application services. A DevOps or platform engineer focuses on the pipelines, tooling, and infrastructure that allow software teams to ship code. A network engineer specifically owns the connectivity between all of those things: the wired and wireless transport, the routing and switching, the firewall and load-balancer policy, and increasingly the cloud network constructs (VPCs, transit gateways, peering, SD-WAN). The roles overlap, but the network engineer is the specialist for the network plane.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you become a network engineer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most network engineers start in an adjacent IT role: help desk, network operations center (NOC), field tech, or sysadmin. From there they build hands-on experience with routers and switches, often pair that with certifications such as the Cisco CCNA or comparable vendor or vendor-neutral credentials, and progress into network engineer titles. There is no single required degree. A four-year computer science or IT degree helps, but many practicing network engineers come from non-traditional paths including the military, trades, self-taught study, and career switches.',
      },
    },
    {
      '@type': 'Question',
      name: 'What skills does a network engineer need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Core skills include IP addressing and subnetting, routing protocols (OSPF, BGP), switching and VLANs, wireless fundamentals, firewall and ACL policy, network troubleshooting, and packet analysis. Modern network engineers also need scripting and automation (commonly Python), API and YAML/JSON literacy, cloud networking concepts (VPC, peering, transit), and a working understanding of how applications consume the network.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certifications do network engineers get?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common network engineering certifications are the Cisco track (CCNA, CCNP, CCIE), Juniper (JNCIA, JNCIS, JNCIP, JNCIE), Aruba and Arista vendor tracks, and vendor-neutral certifications like CompTIA Network+ and the Network Engineering Foundation. Cloud-network certifications from AWS, Azure, and Google Cloud are increasingly valuable. Certifications are not required to do the work but they help with interviews, raises, and giving structure to self-study.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is network engineering a good career?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Network engineering is a durable career. Every business, application, and AI workload runs on a network, and someone has to design, run, and secure that network. Salaries are competitive, the work is intellectually rewarding, and the skill set transfers across cloud, security, automation, and architecture roles. The field is evolving rapidly with cloud and automation, which means continuous learning is part of the job.',
      },
    },
  ],
};

type RelatedEp = { slug: string; title: string };
const related: RelatedEp[] = [
  { slug: 'tech-careers-are-built-on-relationships-not-resumes', title: 'Tech Careers Are Built on Relationships, Not Resumes' },
  { slug: 'grow-your-career-in-2026', title: 'Grow Your Career in 2026' },
  { slug: 'career-paths-beyond-network-engineering-what-s-next', title: 'Career Paths Beyond Network Engineering: What’s Next?' },
  { slug: 'is-network-automation-worth-the-struggle', title: 'Is Network Automation Worth the Struggle?' },
  { slug: 'cloud-transition-and-networking-future-trends-with-craig-johnson', title: 'Cloud Transition and Networking Future Trends' },
  { slug: 'ep-129-exploring-tech-certification-challenges-with-brent-morris', title: 'Exploring Tech Certification Challenges' },
  { slug: 'what-does-a-consulting-engineer-do-salary-skills-and-career-path-explained', title: 'What Does a Consulting Engineer Do?' },
  { slug: 'insights-into-advanced-wireless-network-planning', title: 'Insights into Advanced Wireless Network Planning' },
];

export default function WhatIsNetworkEngineeringPage() {
  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SectionLabel>Network engineering, explained</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
        What Is Network Engineering?
      </h1>

      <p className="mt-8 text-text text-xl leading-snug max-w-3xl">
        Network engineering is the practice of designing, building, and operating the computer
        networks that move data between systems. A network engineer is the practitioner
        responsible for that infrastructure: the routers, switches, firewalls, wireless systems,
        and cloud services that keep the internet, enterprises, and applications connected.
      </p>

      <div className="mt-12 grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-10 text-text">
          <section>
            <h2 className="text-2xl font-bold">A working definition</h2>
            <p className="mt-3">
              A network is what lets two computers talk to each other. Network engineering is
              the discipline of making that conversation possible at every scale: between two
              devices on a desk, between buildings on a campus, between a data center and the
              cloud, and between billions of devices across the global internet. Network
              engineers own the design choices, the configuration, the security, the
              performance, and the day-to-day operation of those networks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">What a network engineer does</h2>
            <p className="mt-3">
              The work is broader than the title implies. On any given week a network engineer
              might be doing several of the following:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-accent-green">
              <li>Designing a new network for a site, data center, or cloud region.</li>
              <li>Configuring routers, switches, firewalls, load balancers, and wireless controllers.</li>
              <li>Troubleshooting an outage or performance complaint, often with packet captures and logs.</li>
              <li>Writing automation scripts (commonly Python) to apply changes across hundreds of devices.</li>
              <li>Hardening the network against threats: ACLs, segmentation, zero trust controls.</li>
              <li>Planning capacity, refreshing hardware, and budgeting for the next fiscal year.</li>
              <li>Working with cloud, security, and application teams whose work depends on the network.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">How it differs from related fields</h2>
            <p className="mt-3">
              The IT world has many specializations, and the lines between them have blurred.
              Here is how network engineering relates to the most common ones:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-accent-green">
              <li>
                <span className="font-semibold">System administrator</span>: focuses on servers,
                operating systems, and application services. A sysadmin keeps the workload running.
                A network engineer makes sure the workload can talk to anything else.
              </li>
              <li>
                <span className="font-semibold">DevOps / platform engineer</span>: builds the
                pipelines, tooling, and infrastructure that let software teams ship code. Network
                engineers increasingly partner with these teams to expose the network as code.
              </li>
              <li>
                <span className="font-semibold">Site reliability engineer (SRE)</span>: owns the
                reliability of a service end to end. SREs often lean on network engineers when an
                incident lives below the application layer.
              </li>
              <li>
                <span className="font-semibold">Cloud engineer</span>: designs and runs workloads
                on AWS, Azure, or Google Cloud. The cloud has its own networking layer (VPC,
                subnets, peering, transit, route tables) that network engineers are often called
                in to design.
              </li>
              <li>
                <span className="font-semibold">Security engineer</span>: builds and operates
                security controls. Many of those controls live in the network: firewalls,
                segmentation, intrusion detection, secure access. The two roles overlap heavily.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">The skills network engineers need</h2>
            <p className="mt-3">
              The core of the job has not changed much in twenty years: IP addressing,
              subnetting, routing, switching, wireless, firewalls, and the protocols underneath.
              What has changed is what surrounds the core.
            </p>
            <p className="mt-3">
              A network engineer in 2026 needs to be comfortable with at least the basics of:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-accent-green">
              <li>Scripting and automation. Python is the dominant language. Ansible is common for declarative changes.</li>
              <li>APIs, JSON, and YAML. Modern network platforms are configured through these as often as the CLI.</li>
              <li>Cloud networking. VPC and equivalent constructs in AWS, Azure, and GCP.</li>
              <li>Observability. Telemetry, streaming metrics, flow data, log aggregation.</li>
              <li>Source control. Git, pull requests, code review for network configuration.</li>
              <li>The application layer. Understanding what the application is doing makes you a far better engineer.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Career paths and how to break in</h2>
            <p className="mt-3">
              Most network engineers do not start as network engineers. The common entry points
              are the help desk, a NOC (network operations center), a field technician role, or
              a junior sysadmin position. From there, engineers move into a junior network
              engineer title, then network engineer, then senior network engineer or
              specialization paths: wireless, security, automation, cloud, design, architecture.
            </p>
            <p className="mt-3">
              There is no required degree. A four-year computer science or IT degree helps, but
              the field is full of people who came in through the military, the trades, retail
              tech jobs, self-taught study, and full career switches in their thirties and
              forties. What matters more than credentials is curiosity, hands-on practice, and
              showing up.
            </p>
            <p className="mt-3">
              The most reliable acceleration is community. People hire the people they know.
              Conferences, user groups (PANUG, USNUA, local Cisco user groups), Discord servers,
              and podcasts are how most working network engineers stay current and how most
              opportunities surface.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Certifications</h2>
            <p className="mt-3">
              Certifications are not required to do the work. They are useful for three reasons:
              they give self-study a structure, they help your resume clear automated filters,
              and they are a clear signal to interviewers that you have invested time in the
              fundamentals. The most common tracks:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-accent-green">
              <li>Cisco: CCNA, CCNP, CCIE. Still the most widely recognized.</li>
              <li>Juniper: JNCIA, JNCIS, JNCIP, JNCIE.</li>
              <li>Vendor-neutral: CompTIA Network+, Network Engineering Foundation.</li>
              <li>Vendor cloud: AWS Advanced Networking, Azure Network Engineer, Google Professional Cloud Network Engineer.</li>
              <li>Aruba, Arista, Palo Alto, Fortinet for specialized work.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Where the field is going</h2>
            <p className="mt-3">
              Three forces are reshaping network engineering at once. Cloud has moved a large
              fraction of new workloads off of traditional on-premises networks and onto
              software-defined cloud constructs, which network engineers are now expected to
              design and operate. Automation has moved the day-to-day from box-by-box CLI to
              code, pipelines, and infrastructure-as-code repositories. AI is starting to change
              both how networks are operated (assistive troubleshooting, anomaly detection,
              natural-language network queries) and what networks have to carry (the bandwidth
              and latency demands of training and inference workloads).
            </p>
            <p className="mt-3">
              None of this has reduced demand for network engineers. It has raised the bar on
              what the role looks like.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Where to go from here</h2>
            <p className="mt-3">
              The Art of Network Engineering has published 200+ episodes with practicing
              network engineers, architects, vendors, educators, and career-changers. A handful
              of episodes that pair well with this page:
            </p>
            <ul className="mt-4 space-y-2">
              {related.map((ep) => (
                <li key={ep.slug}>
                  <Link href={`/episodes/${ep.slug}`} className="text-accent-blue hover:text-accent-green">
                    {ep.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-text-muted">
              Or browse the full catalog of{' '}
              <Link href="/episodes" className="text-accent-blue hover:text-accent-green">
                AONE episodes
              </Link>
              .
            </p>
          </section>
        </div>

        <aside>
          <div className="border border-border bg-surface p-6 rounded-sm">
            <SectionLabel>The short answer</SectionLabel>
            <p className="mt-4 text-sm text-text">
              Network engineers design, build, and run the networks that move data between
              systems. They own the routers, switches, firewalls, wireless, and cloud network
              constructs that keep applications, enterprises, and the internet connected.
            </p>
          </div>
          <div className="mt-6 border border-border bg-surface p-6 rounded-sm">
            <SectionLabel>About AONE</SectionLabel>
            <p className="mt-4 text-sm text-text">
              The Art of Network Engineering is an independent podcast for network engineers
              and infrastructure professionals, with 200+ episodes, a 3,500-member Discord, and
              a newsletter launching summer 2026.
            </p>
            <Link href="/about" className="mt-4 inline-block text-sm text-accent-blue">
              Learn more about AONE
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
